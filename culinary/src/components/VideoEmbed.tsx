import { Play } from './Icons'

// Just an iframe — nothing is hosted. Accepts YouTube or TikTok URLs in
// a few common shapes and normalises them to an embeddable src.
function toEmbedSrc(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')

    // YouTube
    if (host === 'youtu.be') return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
    if (host.endsWith('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) return url
      const v = u.searchParams.get('v')
      if (v) return `https://www.youtube.com/embed/${v}`
      if (u.pathname.startsWith('/shorts/'))
        return `https://www.youtube.com/embed/${u.pathname.split('/')[2]}`
    }

    // TikTok — /@user/video/<id>
    if (host.endsWith('tiktok.com')) {
      const m = u.pathname.match(/video\/(\d+)/)
      if (m) return `https://www.tiktok.com/embed/v2/${m[1]}`
    }
    return url
  } catch {
    return null
  }
}

export default function VideoEmbed({ url, title }: { url?: string; title: string }) {
  const src = url ? toEmbedSrc(url) : null

  if (!src) {
    // intentional empty state, not a broken box
    return (
      <div className="frame grid aspect-video place-items-center rounded-sm">
        <div className="flex flex-col items-center gap-3 text-muted">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-smoke">
            <Play className="h-6 w-6 text-ember" />
          </span>
          <span className="text-sm">Video coming soon</span>
        </div>
      </div>
    )
  }

  return (
    <div className="frame aspect-video overflow-hidden rounded-sm">
      <iframe
        src={src}
        title={`${title} — video`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
