import { Bookmark } from '@/lib/types'
import BookmarkItem from './BookmarkItem'

type Props = {
  bookmarks: Bookmark[]
}

export default function BookmarkList({ bookmarks }: Props) {
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No bookmarks yet. Add your first one above!
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  )
}