import { memo } from 'react'

export const Embed = memo(function Embed({ embedUri, className }: { embedUri: string; className?: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: embedUri,
      }}
      className={className}
    />
  )
})
