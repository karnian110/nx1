'use client'
import { Button } from "@/components/ui/button"

export default function Error({ error, reset }) {
  console.log(error.message)
  return (
    <div>
      <h2 className="text-red-500">Something went wrong</h2>
      <p>{error.message}</p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  )
}
