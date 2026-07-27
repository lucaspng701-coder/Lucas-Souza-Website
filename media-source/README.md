# Media source inbox

This folder is the drop zone for original, unoptimized media. Files inside
`media-source/projects` and `media-source/site` are intentionally excluded from
Git and deployments.

## Where to place files

```text
media-source/
├── projects/
│   └── project-slug/
│       ├── images/   Original PNG, JPEG, TIFF, PSD or exported frames
│       └── videos/   Original MOV, MP4, GIF or image sequences
└── site/
    └── homepage/
        ├── images/   Portraits and homepage-only artwork
        └── videos/   Homepage-only video sources
```

Project folder names match the URL slug, for example:

```text
media-source/projects/noro-watch/images/
media-source/projects/teachable-payments/images/
media-source/projects/ui-motion-atomsix/videos/
```

Keep descriptive filenames and ordering:

```text
cover.png
gallery-01-product.png
gallery-02-interface.png
process-01-storyboard.jpg
```

Do not manually resize or compress masters before placing them here. Web-ready
files will be generated in the matching folder under `public/media`.

To generate WebP copies for one project:

```text
npm run media:optimize -- noro-watch
```

Replace `noro-watch` with the matching project folder name.
