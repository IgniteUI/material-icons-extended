## Material Icons Extended by Infragistics

This is an unofficial subset of icons that extends the official [Material Design Icon set](https://github.com/google/material-design-icons) provided by Google.

### Purpose

We felt the Material Design Icon set is too limited and we wanted to extend it by designing additional icons that will fit well within the Material Design language.

### Scope

Initially we launch 230 icons distributed in 5 categories:

- Finance
- Health
- Logos
- Programming
- Social Media

We will be adding more icons and we will try to make the icon set available to as many platforms as possible. Right now we only provide SVG files/sprites so you can use them as you see fit. In addition to the SVG files, we've exported the icons as JavaScript objects so you can import and use them in your Angular/React/Vue app.

The initial target for this set is to work with our [Ignite UI for Angular](https://github.com/IgniteUI/igniteui-angular) UI framework by utilizing the `igx-icon` component and the Ignite UI for Angular Icon Service.

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
    this.iconService.addSvgIcon(github.name, github.value, "imx-icons");
  }
}
```

In yout component template:

```html
<igx-icon fontSet="imx-icons" name="github"></igx-icon>
```

#### In a React App

```javascript
import { github } from "@igniteui/material-icons-extended";

const App = () => <img src={github.module} alt="github logo" />;
```

#### With SVG sprites

The package includes an SVG sprite that bundles all icons into a single file. Alongside this sprite, we include CSS, Sass, and Less files that associate each icon in the sprite with a CSS class. To consume the icons in this way, you must include one of the aforementioned style files in your project.

For instance, with Sass, in your main Sass file import:

```scss
@import "~@igniteui/material-icons-extended/build/styles/sprite";
```

Then in your HTML file:

```html
<i class="imx-social-media__github"></i>
```

### Requests

Feel free to use the issue tracker to request new icons.

### Where is the web font?

After some internal discussions and research, we've decided not to include a web font.
There are various reasons for this decision, the main one being accesibility. SVG should be well supported across all modern browsers.
