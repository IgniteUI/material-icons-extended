import { IMXIcon } from "./common/icon";
import addChildIcon from "./svgs/add-child.svg";
import addFilterIcon from "./svgs/add-filter.svg";
import addRowIcon from "./svgs/add-row.svg";
import arrowDownLeftIcon from "./svgs/arrow-down-left.svg";
import arrowDownRightIcon from "./svgs/arrow-down-right.svg";
import arrowUpLeftIcon from "./svgs/arrow-up-left.svg";
import arrowUpRightIcon from "./svgs/arrow-up-right.svg";
import jumpDownIcon from "./svgs/jump-down.svg";
import jumpUpIcon from "./svgs/jump-up.svg";
import pinLeftIcon from "./svgs/pin-left.svg";
import pinRightIcon from "./svgs/pin-right.svg";
import unpinLeftIcon from "./svgs/unpin-left.svg";
import unpinRightIcon from "./svgs/unpin-right.svg";

export const addChild: IMXIcon = {
  name: "add-child",
  value: addChildIcon,
  categories: ["content"],
  keywords: ["add", "insert", "row", "child", "new", "below", "under"],
};

export const addFilter: IMXIcon = {
  name: "add-filter",
  value: addFilterIcon,
  categories: ["content"],
  keywords: ["add", "filter", "funnel", "leads", "new"],
};

export const addRow: IMXIcon = {
  name: "add-row",
  value: addRowIcon,
  categories: ["content"],
  keywords: ["add", "insert", "row", "new"],
};

export const arrowDownLeft: IMXIcon = {
  name: "arrow-down-left",
  value: arrowDownLeftIcon,
  categories: ["content"],
  keywords: ["arrow", "down", "left", "dimension"],
};

export const arrowDownRight: IMXIcon = {
  name: "arrow-down-right",
  value: arrowDownRightIcon,
  categories: ["content"],
  keywords: ["arrow", "down", "right"],
};

export const arrowUpLeft: IMXIcon = {
  name: "arrow-up-left",
  value: arrowUpLeftIcon,
  categories: ["content"],
  keywords: ["arrow", "up", "left"],
};

export const arrowUpRight: IMXIcon = {
  name: "arrow-up-right",
  value: arrowUpRightIcon,
  categories: ["content"],
  keywords: ["arrow", "up", "right", "axis", "coordinate", "system"],
};

export const jumpDown: IMXIcon = {
  name: "jump-down",
  value: jumpDownIcon,
  categories: ["content"],
  keywords: ["jump", "down", "arrow", "below", "under"],
};

export const jumpUp: IMXIcon = {
  name: "jump-up",
  value: jumpUpIcon,
  categories: ["content"],
  keywords: ["jump", "up", "arrow", "above"],
};

export const pinLeft: IMXIcon = {
  name: "pin-left",
  value: pinLeftIcon,
  categories: ["content"],
  keywords: [
    "pin",
    "freeze",
    "left",
    "pushpin",
    "nail",
    "marker",
    "attach",
    "tack",
    "thumbtack",
  ],
};

export const pinRight: IMXIcon = {
  name: "pin-right",
  value: pinRightIcon,
  categories: ["content"],
  keywords: [
    "pin",
    "freeze",
    "right",
    "pushpin",
    "nail",
    "marker",
    "attach",
    "tack",
    "thumbtack",
  ],
};

export const unpinLeft: IMXIcon = {
  name: "unpin-left",
  value: unpinLeftIcon,
  categories: ["content"],
  keywords: [
    "unpin",
    "unfreeze",
    "left",
    "pushpin",
    "nail",
    "marker",
    "detach",
    "tack",
    "thumbtack",
  ],
};

export const unpinRight: IMXIcon = {
  name: "unpin-right",
  value: unpinRightIcon,
  categories: ["content"],
  keywords: [
    "unpin",
    "unfreeze",
    "right",
    "pushpin",
    "nail",
    "marker",
    "detach",
    "tack",
    "thumbtack",
  ],
};

export const content = [
  addChild,
  addFilter,
  addRow,
  arrowDownLeft,
  arrowDownRight,
  arrowUpLeft,
  arrowUpRight,
  jumpDown,
  jumpUp,
  pinLeft,
  pinRight,
  unpinLeft,
  unpinRight,
];
