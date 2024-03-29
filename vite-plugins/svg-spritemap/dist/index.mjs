// src/plugins/build.ts
import { join as join2 } from "path";

// src/helpers/filename.ts
import hash_sum from "hash-sum";
var getFileName = (fileName, name, content, ext) => {
  const hash = hash_sum(content);
  fileName = fileName.replace(/\[hash\]/g, hash);
  fileName = fileName.replace(/\[ext\]/g, ext);
  fileName = fileName.replace(/\[extname\]/g, "." + ext);
  fileName = fileName.replace(/\[name\]/g, name);
  return fileName;
};

// src/svgManager.ts
import { promises as fs } from "fs";
import { basename } from "path";
import fg from "fast-glob";
import { optimize } from "svgo";
import { DOMParser, DOMImplementation, XMLSerializer } from "@xmldom/xmldom";
import hash_sum2 from "hash-sum";

// src/styles/styles.ts
import { fileURLToPath } from "url";
import { readFile } from "fs";
import { promisify } from "util";
import path, { join } from "path";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var Styles = class {
  _svgs;
  _options;
  constructor(svgs, options) {
    this._svgs = /* @__PURE__ */ new Map();
    this._options = options;
    svgs.forEach((svg, name) => {
      this._svgs.set(name, {
        width: svg.width,
        height: svg.height,
        viewbox: svg.viewBox,
        source: svg.source
      });
    });
  }
  createSpriteMap(generator) {
    let spriteMap = "";
    let index = 1;
    this._svgs.forEach((svg, name) => {
      spriteMap += `${generator(name, svg, index === this._svgs.size)}
`;
      index++;
    });
    return spriteMap;
  }
  async insert(insert, lang) {
    if (!this._options.styles)
      return "";
    const template = await promisify(readFile)(
      join(__dirname, `/template.${lang}`),
      "utf8"
    );
    const doNotEditThisFile = "/* Generated by svg-spritemap */\n";
    return doNotEditThisFile + insert + "\n" + template;
  }
  // SCSS generation
  _generate_scss() {
    let insert = `@use 'sass:map';
$sprites-prefix: '${this._options.prefix}';
`;
    insert += "$sprites: (\n";
    insert += this.createSpriteMap((name, svg, isLast) => {
      let sprites = "";
      sprites = `	'${name}': (`;
      sprites += `
		uri: 'data:image/svg+xml;utf8,${svg.source}',`;
      sprites += `
		width: ${svg.width}px,`;
      sprites += `
		height: ${svg.height}px`;
      sprites += `
	${!isLast ? ")," : ")"}`;
      return sprites;
    });
    insert += ");\n";
    return insert;
  }
  // Styl generation
  _generate_styl() {
    let insert = `$sprites-prefix = '${this._options.prefix}'
`;
    insert += "$sprites = {\n";
    insert += this.createSpriteMap((name, svg, isLast) => {
      let sprites = "";
      sprites = `	'${name}': {`;
      sprites += `
		uri: 'data:image/svg+xml;utf8,${svg.source}',`;
      sprites += `
		width: ${svg.width}px,`;
      sprites += `
		height: ${svg.height}px`;
      sprites += `
	${!isLast ? "}," : "}"}`;
      return sprites;
    });
    insert += "}\n";
    return insert;
  }
  // Less generation
  _generate_less() {
    let insert = `@sprites-prefix: '${this._options.prefix}';
`;
    insert += "@sprites: {\n";
    insert += this.createSpriteMap((name, svg) => {
      let sprites = "";
      sprites = `	@${name}: {`;
      sprites += `
		uri: 'data:image/svg+xml;utf8,${svg.source}';`;
      sprites += `
		width: ${svg.width}px;`;
      sprites += `
		height: ${svg.height}px;`;
      sprites += `
	};`;
      return sprites;
    });
    insert += "}\n";
    return insert;
  }
  // CSS generation
  _generate_css() {
    let insert = this.createSpriteMap((name, svg) => {
      let sprites = "";
      sprites = `.${this._options.prefix + name} {`;
      sprites += `
	--icon: url('data:image/svg+xml;utf8,${svg.source}');`;
      sprites += `
}`;
      return sprites;
    });
    if (this._options.output && this._options.output.view) {
      insert += this.createSpriteMap((name) => {
        let sprites = "";
        sprites = `.${this._options.prefix + name}-frag {`;
        sprites += `
	mask-image: url('/__spritemap#${this._options.prefix + name}-view') center no-repeat;`;
        sprites += `
}`;
        return sprites;
      });
    }
    return insert;
  }
  generate() {
    const result = /* @__PURE__ */ new Map();
    if (!this._options.styles)
      return result;
    this._options.styles.forEach((entry) => {
      let insert;
      switch (entry.lang) {
        case "scss":
          insert = this._generate_scss();
          break;
        case "styl":
          insert = this._generate_styl();
          break;
        case "less":
          insert = this._generate_less();
          break;
        case "css":
        default:
          insert = this._generate_css();
      }
      result.set(entry.filename, this.insert(insert, entry.lang));
    });
    return result;
  }
};

// src/helpers/calculateY.ts
var calculateY = (heights = [], gutter = 0) => {
  return heights.reduce((a, b) => a + b, 0) + heights.length * gutter;
};

// src/helpers/cleanAttributes.ts
import svgElementAttributes from "svg-element-attributes" assert { type: "json" };
var cleanAttributes = (attributes, tag) => {
  const cleanAttributes2 = ["viewbox", "width", "height", "id", "xmlns"];
  const validAttributes = [
    ...svgElementAttributes["*"],
    ...svgElementAttributes.svg.filter(
      (attr) => svgElementAttributes[tag].includes(attr)
    )
  ];
  return Array.from(attributes).filter(
    (attr) => !cleanAttributes2.includes(attr.name.toLocaleLowerCase()) && validAttributes.includes(attr.name)
  );
};

// src/svgManager.ts
var SVGManager = class {
  _options;
  _parser;
  _svgs;
  _iconsPattern;
  hash = null;
  constructor(iconsPattern, options) {
    this._parser = new DOMParser();
    this._options = options;
    this._svgs = /* @__PURE__ */ new Map();
    this._iconsPattern = iconsPattern;
  }
  async update(filePath, loop = false) {
    const name = basename(filePath, ".svg");
    if (!name)
      return false;
    let svg = await fs.readFile(filePath, "utf8");
    const document = this._parser.parseFromString(svg, "image/svg+xml");
    const documentElement = document.documentElement;
    let viewBox = (documentElement.getAttribute("viewBox") || documentElement.getAttribute("viewbox"))?.split(" ").map((a) => parseFloat(a));
    const widthAttr = documentElement.getAttribute("width");
    const heightAttr = documentElement.getAttribute("height");
    let width = widthAttr ? parseFloat(widthAttr) : void 0;
    let height = heightAttr ? parseFloat(heightAttr) : void 0;
    if (viewBox && viewBox.length !== 4 && (!width || !height)) {
      console.warn(
        `Sprite '${filePath}' is invalid, it's lacking both a viewBox and width/height attributes.`
      );
      return;
    }
    if (viewBox && viewBox.length !== 4 && width && height) {
      viewBox = [0, 0, width, height];
    }
    if (!width && viewBox) {
      width = viewBox[2];
    }
    if (!height && viewBox) {
      height = viewBox[3];
    }
    if (!width || !height || !viewBox) {
      return;
    }
    if (typeof this._options.svgo === "object") {
      const optimizedSvg = optimize(svg, this._options.svgo);
      if ("data" in optimizedSvg) {
        svg = optimizedSvg.data;
      }
    }
    this._svgs.set(name, {
      width,
      height,
      viewBox,
      source: svg
    });
    if (!loop) {
      this.hash = hash_sum2(this.spritemap);
      await this.createFileStyle();
    }
  }
  async updateAll() {
    const iconsPath = await fg(this._iconsPattern);
    for (let index = 0; index < iconsPath.length; index++) {
      const iconPath = iconsPath[index];
      await this.update(iconPath, true);
    }
    this.hash = hash_sum2(this.spritemap);
  }
  get spritemap() {
    const DOM = new DOMImplementation().createDocument(null, null, null);
    const Serializer = new XMLSerializer();
    const spritemap = DOM.createElement("svg");
    spritemap.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    if (this._options.output && this._options.output.use) {
      spritemap.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    }
    if (!this._svgs.size)
      return Serializer.serializeToString(spritemap);
    const sizes = {
      width: [],
      height: []
    };
    const parser = new DOMParser();
    this._svgs.forEach((svg, name) => {
      const symbol = DOM.createElement("symbol");
      const document = parser.parseFromString(svg.source, "image/svg+xml");
      const documentElement = document.documentElement;
      let attributes = cleanAttributes(
        Array.from(documentElement.attributes),
        "symbol"
      );
      attributes.forEach((attr) => {
        if (attr.name.toLowerCase().startsWith("xmlns:")) {
          spritemap.setAttribute(attr.name, attr.value);
        }
      });
      attributes.forEach((attr) => {
        symbol.setAttribute(attr.name, attr.value);
      });
      symbol.setAttribute("id", this._options.prefix + name);
      symbol.setAttribute("viewBox", svg.viewBox.join(" "));
      Array.from(documentElement.childNodes).forEach((child) => {
        symbol.appendChild(child);
      });
      spritemap.appendChild(symbol);
      const y = calculateY(sizes.height);
      if (this._options.output && this._options.output.use) {
        const use = DOM.createElement("use");
        use.setAttribute("xlink:href", `#${this._options.prefix}${name}`);
        use.setAttribute("width", svg.width.toString());
        use.setAttribute("height", svg.height.toString());
        use.setAttribute("y", y.toString());
        spritemap.appendChild(use);
      }
      if (this._options.output && this._options.output.view) {
        const view = DOM.createElement("view");
        attributes = cleanAttributes(
          Array.from(documentElement.attributes),
          "view"
        );
        attributes.forEach((attr) => {
          view.setAttribute(attr.name, attr.value);
        });
        view.setAttribute("id", this._options.prefix + name + "-view");
        view.setAttribute(
          "viewBox",
          `0 ${Math.max(0, y)} ${svg.width} ${svg.height}`
        );
        spritemap.appendChild(view);
      }
      sizes.width.push(svg.width);
      sizes.height.push(svg.height);
    });
    return Serializer.serializeToString(spritemap);
  }
  async createFileStyle() {
    if (!Array.isArray(this._options.styles))
      return;
    const styleGen = new Styles(this._svgs, this._options);
    const styles = styleGen.generate();
    const stylesheets = /* @__PURE__ */ new Map();
    this._options.styles.forEach(async (entry) => {
      const content = await styles.get(entry.filename);
      stylesheets.set(entry.filename, content);
    });
    return stylesheets;
  }
};

// src/plugins/build.ts
function BuildPlugin(iconsPattern, options) {
  let config;
  let fileName;
  let filePath;
  let svgManager;
  let stylesheets;
  return {
    name: "vite-plugin-svg-spritemap:build",
    apply: "build",
    configResolved(_config) {
      config = _config;
      svgManager = new SVGManager(iconsPattern, options);
    },
    async buildStart() {
      await svgManager.updateAll();
      stylesheets = await svgManager.createFileStyle();
      if (typeof options.output === "object") {
        fileName = getFileName(
          options.output.filename,
          "spritemap",
          svgManager.spritemap,
          "svg"
        );
        filePath = join2(config.build.assetsDir, fileName);
      }
    },
    transform(code) {
      return code.replace(/__spritemap/g, filePath);
    },
    generateBundle(_, bundle) {
      if (typeof options.output === "object") {
        bundle[fileName] = {
          needsCodeReference: false,
          name: fileName,
          source: svgManager.spritemap,
          type: "asset",
          fileName: filePath
        };
      }
      if (stylesheets) {
        for (const [filename, content] of stylesheets) {
          bundle[filename] = {
            needsCodeReference: false,
            name: filename,
            source: content,
            type: "asset",
            fileName: filename
          };
        }
      }
    }
  };
}

// src/plugins/dev.ts
import { createFilter } from "vite";
import fg2 from "fast-glob";
var event = "vite-plugin-svg-spritemap:update";
function DevPlugin(iconsPattern, options) {
  const filterSVG = createFilter(/\.svg$/);
  const filterCSS = createFilter(/\.(s?css|styl|less)$/);
  const virtualModuleId = "/@vite-plugin-svg-spritemap/client";
  let svgManager;
  return {
    name: "vite-plugin-svg-spritemap:dev",
    apply: "serve",
    configResolved() {
      svgManager = new SVGManager(iconsPattern, options);
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return id;
      }
    },
    load(id) {
      if (id === virtualModuleId) {
        return generateHMR();
      }
    },
    async buildStart() {
      await svgManager.updateAll();
      const icons = await fg2(iconsPattern);
      const directories = /* @__PURE__ */ new Set();
      icons.forEach((icon) => {
        const directory = icon.split("/").slice(0, -1).join("/");
        directories.add(directory);
      });
      directories.forEach((directory) => this.addWatchFile(directory));
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith("/__spritemap")) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "image/svg+xml");
          res.write(svgManager.spritemap, "utf-8");
          res.end();
        } else {
          next();
        }
      });
    },
    transformIndexHtml: {
      enforce: "pre",
      transform(html) {
        html = html.replace(
          /__spritemap-\d*|__spritemap/g,
          `__spritemap__${svgManager.hash}`
        );
        return html.replace(
          "</body>",
          `<script type="module" src="${virtualModuleId}"></script></body>`
        );
      }
    },
    async handleHotUpdate(ctx) {
      if (!filterSVG(ctx.file)) {
        return;
      }
      await svgManager.update(ctx.file);
      ctx.server.ws.send({
        type: "custom",
        event,
        data: {
          id: svgManager.hash
        }
      });
    },
    transform(code, id) {
      if (!filterCSS(id)) {
        return code;
      }
      return code.replace(
        /__spritemap-\d*|__spritemap/g,
        `__spritemap__${svgManager.hash}`
      );
    }
  };
}
function generateHMR() {
  return `if (import.meta.hot) {
  import.meta.hot.on('${event}', data => {
    console.log('[vite-plugin-svg-spritemap]', 'update')
    const elements = document.querySelectorAll(
      '[src^=__spritemap], [href^=__spritemap], [*|href^=__spritemap]'
    )

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i]
      const attributes = ['xlink:href', 'href', 'src']
      for (const attr of attributes) {
        if (!el.hasAttribute(attr)) continue
        const value = el.getAttribute(attr)
        if (!value) continue
        const newValue = value.replace(
          /__spritemap.*#/g,
          '__spritemap__' + data.id + '#'
        )
        el.setAttribute(attr, newValue)
      }
    }
  })
}`;
}

// src/helpers/options.ts
var createOptions = (options = {}) => {
  const prefix = options.prefix || "sprite-";
  let svgo = {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            removeEmptyAttrs: false,
            moveGroupAttrsToElems: false,
            collapseGroups: false,
            cleanupIds: {
              preservePrefixes: [prefix]
            }
          }
        }
      }
    ]
  };
  if (typeof options.svgo === "object" || options.svgo === false) {
    svgo = options.svgo;
  }
  const styles = [];
  const stylesLang = ["css", "scss", "less", "styl"];
  if (Array.isArray(options.styles)) {
    options.styles.forEach(({ filename, lang }) => {
      if (typeof filename === "string" && typeof lang === "string" && stylesLang.includes(lang)) {
        styles.push({
          filename,
          lang
        });
      }
    });
  }
  let output = {
    filename: "[name].[hash][extname]",
    use: true,
    view: true
  };
  if (options.output === false) {
    output = false;
  } else if (typeof options.output === "string") {
    output = {
      filename: options.output,
      use: true,
      view: true
    };
  } else if (typeof options.output === "object") {
    output = {
      filename: options.output.filename,
      use: typeof options.output.use !== "undefined" ? options.output.use : true,
      view: typeof options.output.view !== "undefined" ? options.output.view : true
    };
  }
  return {
    svgo,
    output,
    prefix,
    styles
  };
};

// src/index.ts
function VitePluginSvgSpritemap(iconsPattern, options) {
  const _options = createOptions(options);
  return [
    BuildPlugin(iconsPattern, _options),
    DevPlugin(iconsPattern, _options)
  ];
}
export {
  VitePluginSvgSpritemap as default
};
