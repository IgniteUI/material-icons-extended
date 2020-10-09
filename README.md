## Material Icons Extended by Infragistics  
[![npm version](https://badge.fury.io/js/%40igniteui%2Fmaterial-icons-extended.svg)](https://badge.fury.io/js/%40igniteui%2Fmaterial-icons-extended)

This is an unofficial subset of icons that extends the official [Material Design Icon set](https://github.com/google/material-design-icons) provided by Google.

### Purpose

We felt the Material Design Icon set is too limited and we wanted to extend it by designing additional icons that will fit well within the Material Design language.

### Scope

This package includes 260+ icons distributed in 7 categories:

- Content
- Editor
- Finance
- Health
- Logos
- Programming
- Social Media

We will be adding more icons and we will try to make the icon set available to as many platforms as possible. Right now we only provide SVG files/sprites so you can use them as you see fit. In addition to the SVG files, we've exported the icons as JavaScript objects so you can import and use them in your Angular/React/Vue app.

The initial target for this set is to work with our [Ignite UI for Angular](https://www.infragistics.com/products/ignite-ui-angular?utm_source=GitHub%2C%20npm&utm_medium=readme&utm_campaign=backlink) UI framework by utilizing the `igx-icon` component and the Ignite UI for Angular Icon Service.

### Installation

```sh
npm install @igniteui/material-icons-extended
```

### Usage

#### With Ignite UI for Angular

In your component:

```typescript
import { Component, OnInit } from "@angular/core";
import { IgxIconService } from "igniteui-angular";
import { github } from "@igniteui/material-icons-extended";
// ...
export class SampleComponent implements OnInit {
  constructor(private iconService: IgxIconService) {}

  ngOnInit(): void {
    // Register a single icon
    this.iconService.addSvgIconFromText(github.name, github.value, "imx-icons");
  }
}
```

Or to register multiple icons/categories:

```typescript
//...
import { github, health, programming } from "@igniteui/material-icons-extended";

export class SampleComponent implements OnInit {
  //...
  addIcons() {
    for (let icon of [...health, ...programming, github]) {
      this.iconService.addSvgIconFromText(icon.name, icon.value, "imx-icons");
    }
  }

  ngOnInit(): void {
    this.addIcons();
  }
}
```

In yout component template:

```html
<igx-icon fontSet="imx-icons" name="github"></igx-icon>
```

#### In a React App

First, make sure there's a way to use inline SVGs in your application. One package that does the job is [svg-inline-react](https://github.com/sairion/svg-inline-react).

```sh
npm install svg-inline-react
```

```javascript
import InlineSVG from "svg-inline-react";
import { github } from "@igniteui/material-icons-extended";

const App = () => (
  <InlineSVG src={github.value} style={{ width: "24px", height: "24px" }} />
);
```

#### With SVG sprites

##### CSS Sprite Map

The package includes an SVG sprite that bundles all icons into a single file. Alongside this sprite, we include CSS, Sass, and Less files that associate each icon in the sprite with a CSS class. To consume the icons in this way, you must include one of the aforementioned style files in your project.

For instance, with Sass, in your main Sass file import:

```scss
@import "~@igniteui/material-icons-extended/sprites/styles/sprite";

.imx-icon {
  width: 24px;
  height: 24px;
  background-size: auto 100%;
}
```

Then in your HTML file:

```html
<i class="imx-icon imx-github"></i>
```

We also include a Less and Sass mixin called `igx-icon`. This mixins includes the `background-image` and `background-position`.

##### Symbols

The package also includes an SVG sprite with all icons listed as `<symbol>` elements. This sprite can be imported from `@igniteui/material-icons-extended/sprites/symbol/svg/sprite.symbol.svg`;
Once you add the image to your application, you can use the encapsulated symbols like this:

In your HTML:

```html
<svg class="imx-github">
  <use xlink:href="svg/sprite.symbol.svg#github"></use>
</svg>
```

In your CSS:

```css
.imx-github {
  width: 24px;
  height: 24px;
  fill: royalblue;
}
```

#### Standalone SVG images:

All SVG icons can be found in `@igniteui/material-icons-extended/src/svgs`;

### Requests

Feel free to use the issue tracker to request new icons.

### Where is the web font?

After some internal discussions and research, we've decided not to include a web font.
There are various reasons for this decision, the main one being accesibility. SVG should be well supported across all modern browsers.
