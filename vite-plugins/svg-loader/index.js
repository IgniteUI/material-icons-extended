import fs, { promises } from 'node:fs';
import { DOMParser, DOMImplementation, XMLSerializer } from '@xmldom/xmldom';
import yaml from 'yaml';
import { optimize } from 'svgo';

const DOM = new DOMImplementation().createDocument(null, null, null);
const parser = new DOMParser();
const Serializer = new XMLSerializer();

async function processSVG(svgString, name, a11y) {
  const document = parser.parseFromString(svgString, 'image/svg+xml');
  const documentElement = document.documentElement;
  let title = documentElement.getElementsByTagName('title');
  let desc = document.getElementsByTagName('desc');
  const title_id = `${name}-title`;
  const desc_id = `${name}-desc`;
  const a11y_meta = a11y[name];

  if (title[0]) {
    documentElement.removeChild(title[0]);
  }

  if (desc[0]) {
    documentElement.removeChild(desc[0]);
  }

  documentElement.removeAttribute('aria-labelledby');

  if (a11y_meta) {
    title = DOM.createElement('title');
    desc = DOM.createElement('desc');

    title.setAttribute('id', title_id);
    title.textContent = a11y_meta.title;

    desc.setAttribute('id', desc_id);
    desc.textContent = a11y_meta.description;

    documentElement.insertBefore(desc, documentElement.firstChild);
    documentElement.insertBefore(title, documentElement.firstChild);
    documentElement.setAttribute('aria-labelledby', `${title_id} ${desc_id}`);
  }

  return Serializer.serializeToString(documentElement);
}

export default function (options = {}) {
  const { a11yMetaPath, svgoConfig, svgo } = options;
  const svgRegex = /\.svg(\?(raw|component|skipsvgo))?$/;
  const fileNameRegex = /([^/]+)\.svg$/;
  const meta = fs.readFileSync(a11yMetaPath, 'utf-8');
  const a11y = yaml.parse(meta);
  const svgs = [];

  return {
    name: 'svg-loader',
    enforce: 'pre',

    async load(id) {
      if (!id.match(svgRegex)) {
        return;
      }

      const [path, query] = id.split('?', 2);

      if (query === 'url') {
        return;
      }

      let svg;

      try {
        svg = await promises.readFile(path, 'utf-8');
        const match = path.match(fileNameRegex);
        const fileName = match[1];
        svg = await processSVG(svg, fileName, a11y);

        if (svgo !== false && query !== 'skipsvgo') {
          svg = optimize(svg, {
            ...svgoConfig,
            path,
          }).data;
        }

        svgs.push({
          fileName,
          source: svg,
        });
      } catch (error) {
        console.warn(
          '\n',
          `${id} cound't be loaded by svg-loader, falling  back to the default loader.`
        );
      }

      return `export default ${JSON.stringify(svg)}`;
    },
    async generateBundle(_, bundle) {
      if (svgs.length > 0) {
        for (const { fileName, source } of svgs) {
          bundle[fileName] = {
            needsCodeReference: false,
            name: `assets/svgs/${fileName}.svg`,
            source: source,
            type: 'asset',
            fileName: `assets/svgs/${fileName}.svg`,
          };
        }
      }
    },
  };
}
