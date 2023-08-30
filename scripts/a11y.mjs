import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";
import util from "node:util";
import { DOMParser, DOMImplementation, XMLSerializer } from "@xmldom/xmldom";
import yaml from "yaml";
import report from "./report.js";
import { optimize } from "svgo";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const SRC_DIR = path.resolve(__dirname, "../src/svgs/");
const DEST_DIR = path.resolve(__dirname, "../.tmp/svgs/");
const A11Y_META = path.resolve(__dirname, "../src/a11y-meta.yml");

const DOM = new DOMImplementation().createDocument(null, null, null);
const parser = new DOMParser();
const Serializer = new XMLSerializer();

async function processFile(path, name, a11y) {
  let svg = await readFile(path, "utf8");
  const document = parser.parseFromString(svg, "image/svg+xml");
  const documentElement = document.documentElement;
  let title = documentElement.getElementsByTagName("title");
  let desc = document.getElementsByTagName("desc");
  const a11y_meta = a11y[name];

  if (!a11y_meta) {
    report.warn(`Missing a11y metadata for ${name}.svg`);
  }

  if (title[0]) {
    documentElement.removeChild(title[0]);
  }

  if (desc[0]) {
    documentElement.removeChild(desc[0]);
  }

  documentElement.removeAttribute("aria-labelledby");

  if (a11y_meta) {
    title = DOM.createElement("title");
    desc = DOM.createElement("desc");

    title.textContent = a11y_meta.title;

    desc.textContent = a11y_meta.description;

    documentElement.insertBefore(desc, documentElement.firstChild);
    documentElement.insertBefore(title, documentElement.firstChild);
  }

  return Serializer.serializeToString(documentElement);
}

(async () => {
  const files = await readdir(SRC_DIR);
  const meta = await readFile(A11Y_META, "utf8");
  const a11y = yaml.parse(meta);

  for (const file of files) {
    let svg = await processFile(
      path.join(SRC_DIR, file),
      file.split(".")[0],
      a11y
    );
    const outFile = `${path.join(DEST_DIR, file)}`;
    svg = optimize(svg, {
      plugins: ["removeDimensions"],
      path,
    }).data;

    try {
      if (!fs.existsSync(DEST_DIR)) {
        fs.mkdirSync(DEST_DIR, { recursive: true });
      }

      await writeFile(outFile, svg, "utf8");
    } catch (e) {
      report.error(e);
      process.exit(-1);
    }
  }

  report.success("SVGs a11y metadata injection finished");
})();
