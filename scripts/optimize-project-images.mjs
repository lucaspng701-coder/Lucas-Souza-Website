import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectId = process.argv[2];

if (!projectId) {
  throw new Error(
    "Provide a project slug, for example: npm run media:optimize -- noro-watch",
  );
}

const root = process.cwd();
const sourceDirectory = path.join(
  root,
  "media-source",
  "projects",
  projectId,
  "images",
);
const outputDirectory = path.join(
  root,
  "public",
  "media",
  "projects",
  projectId,
  "images",
);
const supportedExtensions = new Set([
  ".avif",
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);

const files = (await readdir(sourceDirectory, { withFileTypes: true }))
  .filter(
    (entry) =>
      entry.isFile() &&
      supportedExtensions.has(path.extname(entry.name).toLowerCase()),
  )
  .sort((a, b) => a.name.localeCompare(b.name));

await mkdir(outputDirectory, { recursive: true });

for (const file of files) {
  const sourcePath = path.join(sourceDirectory, file.name);
  const image = sharp(sourcePath).rotate();
  const metadata = await image.metadata();
  const aspectRatio = (metadata.width ?? 1) / (metadata.height ?? 1);
  const maxWidth = aspectRatio >= 1.35 ? 3200 : 2400;
  const outputName = `${path
    .parse(file.name)
    .name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}.webp`;
  const outputPath = path.join(outputDirectory, outputName);

  await image
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({
      quality: 86,
      effort: 5,
      smartSubsample: true,
    })
    .toFile(outputPath);

  console.log(`${file.name} -> ${outputName}`);
}

console.log(`Optimized ${files.length} images for ${projectId}.`);
