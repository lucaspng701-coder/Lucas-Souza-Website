# Web-ready media

Only optimized assets used by the website belong here. The folder structure
mirrors `media-source`.

```text
public/media/
├── projects/
│   └── project-slug/
│       ├── images/
│       └── videos/
└── site/
    └── homepage/
        ├── images/
        └── videos/
```

## Delivery formats

- Still images: WebP by default; JPEG fallback when needed.
- Transparency: WebP or PNG when lossless transparency is essential.
- Logos and simple vector artwork: SVG.
- Looping video: WebM plus MP4/H.264 fallback.
- Avoid GIF for project covers; use looping video instead.

Recommended filenames:

```text
cover.webp
gallery-01.webp
gallery-02.webp
process-01.webp
cover-loop.webm
cover-loop.mp4
```

Large originals belong in `media-source`, never here. Existing assets keep
their current paths until their project page is migrated.

The project image optimizer keeps landscape images up to 3200 px wide and
square or portrait images up to 2400 px wide, without enlarging smaller files.
