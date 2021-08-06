import { content } from "./content";
import { construction } from "./construction";
import { editor } from "./editor";
import { elections } from "./election";
import { finance } from "./finance";
import { health } from "./health";
import { logos } from "./logos";
import { programming } from "./programming";
import { socialMedia } from "./socialMedia";
import { IMXIcon } from './common/icon';

export * from "./content";
export * from "./construction";
export * from "./editor";
export * from "./election";
export * from "./finance";
export * from "./health";
export * from "./logos";
export * from "./programming";
export * from "./socialMedia";

export { IMXIcon, IconCategory, IconCategoryEnum } from "./common/icon";

export const all: IMXIcon[] = [
  ...content,
  ...construction,
  ...editor,
  ...elections,
  ...finance,
  ...health,
  ...logos,
  ...programming,
  ...socialMedia,
];
