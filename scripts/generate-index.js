import fs from "fs/promises";
import path from "path";

const root = process.cwd();
const candidateDirs = [
  path.join(root, ".vercel", "output", "static"),
  path.join(root, ".output", "public"),
];

async function findExistingOutDir() {
  for (const dir of candidateDirs) {
    try {
      const stat = await fs.stat(dir);
      if (stat.isDirectory()) {
        return dir;
      }
    } catch {
      // ignore
    }
  }
  throw new Error(`Could not find output directory. Tried: ${candidateDirs.join(", ")}`);
}

async function findAsset(outDir, pattern) {
  const assetsDir = path.join(outDir, "assets");
  const files = await fs.readdir(assetsDir);
  return files.find((file) => pattern.test(file));
}

async function main() {
  const outDir = await findExistingOutDir();
  const assetsDir = path.join(outDir, "assets");
  const indexJs = await findAsset(outDir, /^index-[^.]+\.js$/);
  const stylesCss = await findAsset(outDir, /^styles-[^.]+\.css$/);

  if (!indexJs) {
    throw new Error(`Could not find built index JS asset in ${assetsDir}`);
  }
  if (!stylesCss) {
    throw new Error(`Could not find built styles CSS asset in ${assetsDir}`);
  }

  const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Discover AI — Rastrea a cualquier persona en línea por su nombre</title>
    <meta
      name="description"
      content="Discover AI: descubre apps de citas, cuentas falsas y la última actividad en línea de alguien solo con su nombre, nacionalidad y ciudad."
    />
    <meta name="author" content="Discover AI" />
    <meta property="og:title" content="Discover AI — Rastrea a cualquier persona en línea por su nombre" />
    <meta property="og:description" content="Discover AI: descubre apps de citas, cuentas falsas y la última actividad en línea de alguien solo con su nombre, nacionalidad y ciudad." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Lovable" />
    <meta name="twitter:title" content="Discover AI — Rastrea a cualquier persona en línea por su nombre" />
    <meta name="twitter:description" content="Discover AI: descubre apps de citas, cuentas falsas y la última actividad en línea de alguien solo con su nombre, nacionalidad y ciudad." />
    <meta property="og:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/25874985-cb32-4ee6-95d2-8779c1236020/id-preview-019f0eb0--51fb8a54-3c74-46e8-b699-ab767b647833.lovable.app-1783623675736.png" />
    <meta name="twitter:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/25874985-cb32-4ee6-95d2-8779c1236020/id-preview-019f0eb0--51fb8a54-3c74-46e8-b699-ab767b647833.lovable.app-1783623675736.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@300;400;500;600;700&display=swap" />
    <link rel="stylesheet" href="/assets/${stylesCss}" />
  </head>
  <body style="margin:0; min-height:100vh; background:#0f1420; color:#f2f4f7;">
    <div id="root"></div>
    <script type="module" src="/assets/${indexJs}"></script>
  </body>
</html>
`;

  await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
  console.log(`Generated ${path.relative(root, path.join(outDir, "index.html"))} referencing /assets/${indexJs}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
