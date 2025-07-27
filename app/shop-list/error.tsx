"use client"

import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <h2>發生錯誤</h2>
      <p>抱歉，發生了一些錯誤。請稍後再試。</p>
      {process.env.NODE_ENV === 'development' && (
        <p className="text-red-500">{error.message}</p>
      )}
    </div>
  )
}