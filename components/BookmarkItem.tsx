'use client'

import { createClient } from '@/lib/supabase/client'
import { Bookmark } from '@/lib/types'

type Props = {
  bookmark: Bookmark
}

export default function BookmarkItem({ bookmark }: Props) {
  const supabase = createClient()

  const handleDelete = async () => {
    await supabase.from('bookmarks').delete().eq('id', bookmark.id)
    window.dispatchEvent(new Event('bookmark-deleted'))
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white border rounded hover:shadow-md transition">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-w-0 mr-4"
      >
        <h3 className="font-semibold text-lg text-blue-600 hover:underline truncate">
          {bookmark.title}
        </h3>
        <p className="text-sm text-gray-500 truncate">{bookmark.url}</p>
      </a>
      
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shrink-0"
      >
        Delete
      </button>
    </div>
  )
}