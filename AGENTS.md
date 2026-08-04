<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Media workflow

- Treat `media-source/` as the inbox for original, non-deployable masters. It is intentionally excluded from Git and must never be referenced by the website.
- Before wiring new media, inspect the matching project folder under `media-source/projects/<project-slug>/`.
- Generate or copy web-ready derivatives into `public/media/projects/<project-slug>/` for project media or `public/videos/covers/` for animated grid covers.
- Optimize still images with `npm run media:optimize -- <project-slug>`; use WebP by default and preserve the original masters.
- Prefer WebM plus MP4/H.264 for looping covers. If the supplied MP4 is already web-compatible and re-encoding would unnecessarily reduce FPS or quality, keep the MP4 unchanged and document that choice in the task handoff.
- Never delete or overwrite files in `media-source/` while preparing site assets.
