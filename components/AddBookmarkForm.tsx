'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AddBookmarkForm() {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { error } = await supabase.from('bookmarks').insert({
        user_id: user.id,
        url,
        title
      })

      if (!error) {
        setUrl('')
        setTitle('')
        // Force a custom event to trigger refetch
        window.dispatchEvent(new Event('bookmark-added'))
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl text-gray-600 font-semibold">Add Bookmark</h2>
      
      <input
        type="url"
        placeholder="URL (https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full px-4 py-2 text-gray-600  border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-4 py-2 text-gray-600  border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Adding...' : 'Add Bookmark'}
      </button>
    </form>
  )
}