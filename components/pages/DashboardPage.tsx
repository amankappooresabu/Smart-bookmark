'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { Bookmark } from '@/lib/types'
import BookmarkList from '@/components/BookmarkList'
import AddBookmarkForm from '@/components/AddBookmarkForm'

type Props = {
  user: User
}

export default function DashboardPage({ user }: Props) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    const fetchBookmarks = async () => {
      const { data } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (data) setBookmarks(data)
    }

    fetchBookmarks()

    // Custom events for same tab
    const handleBookmarkChange = () => fetchBookmarks()
    window.addEventListener('bookmark-added', handleBookmarkChange)
    window.addEventListener('bookmark-deleted', handleBookmarkChange)

    // Broadcast channel for INSERT (cross-tab)
    const broadcastChannel = supabase
      .channel('bookmark-sync')
      .on('broadcast', { event: 'new-bookmark' }, () => {
        console.log('Broadcast received - refetching bookmarks')
        fetchBookmarks()
      })
      .subscribe()

    // DB changes for DELETE (works fine)
    const dbChannel = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'bookmarks'
        },
        () => {
          console.log('DELETE event received')
          setTimeout(() => {
            fetchBookmarks()
          }, 100)
        }
      )
      .subscribe()

    return () => {
      window.removeEventListener('bookmark-added', handleBookmarkChange)
      window.removeEventListener('bookmark-deleted', handleBookmarkChange)
      supabase.removeChannel(broadcastChannel)
      supabase.removeChannel(dbChannel)
    }
  }, [supabase, user.id])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-600">My Bookmarks</h1>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-sm text-gray-600 truncate max-w-50">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 whitespace-nowrap"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <AddBookmarkForm />
        <BookmarkList bookmarks={bookmarks} />
      </main>
    </div>
  )
}