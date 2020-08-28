import { content } from "./content";
import { editor } from "./editor";
import { finance } from "./finance";
import { health } from "./health";
import { logos } from "./logos";
import { programming } from "./programming";
import { socialMedia } from "./socialMedia";
import { IMXIcon } from './common/icon';

export * from "./finance";
export * from "./health";
export * from "./logos";
export * from "./programming";
export * from "./socialMedia";
export * from "./content";
export * from "./editor";

export { IMXIcon, IconCategory, IconCategoryEnum } from "./common/icon";

export const all: IMXIcon[] = [
  ...content,
  ...editor,
  ...finance,
  ...health,
  ...logos,
  ...programming,
  ...socialMedia,
];
