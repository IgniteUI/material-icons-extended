import { IMXIcon } from "./common/icon";

export const addChild: IMXIcon = {
  name: "add-child",
  value: require("./svgs/add-child.svg"),
  categories: ["content"],
  keywords: ["add", "insert", "row", "child", "new", "below", "under"],
};

export const addFilter: IMXIcon = {
  name: "add-filter",
  value: require("./svgs/add-filter.svg"),
  categories: ["content"],
  keywords: ["add", "filter", "funnel", "leads", "new"],
};

export const addRow: IMXIcon = {
  name: "add-row",
  value: require("./svgs/add-row.svg"),
  categories: ["content"],
  keywords: ["add", "insert", "row", "new"],
};

export const jumpDown: IMXIcon = {
  name: "jump-down",
  value: require("./svgs/jump-down.svg"),
  categories: ["content"],
  keywords: ["jump", "down", "arrow", "below", "under"],
};

export const jumpUp: IMXIcon = {
  name: "jump-up",
  value: require("./svgs/jump-up.svg"),
  categories: ["content"],
  keywords: ["jump", "up", "arrow", "above"],
};

export const pinLeft: IMXIcon = {
  name: "pin-left",
  value: require("./svgs/pin-left.svg"),
  categories: ["content"],
  keywords: ["pin", "freeze", "left", "pushpin", "nail", "marker", "attach", "tack", "thumbtack"],
};

export const pinRight: IMXIcon = {
  name: "pin-right",
  value: require("./svgs/pin-right.svg"),
  categories: ["content"],
  keywords: ["pin", "freeze", "right", "pushpin", "nail", "marker", "attach", "tack", "thumbtack"],
};

export const unpinLeft: IMXIcon = {
  name: "unpin-left",
  value: require("./svgs/unpin-left.svg"),
  categories: ["content"],
  keywords: ["unpin", "unfreeze", "left", "pushpin", "nail", "marker", "detach", "tack", "thumbtack"],
};

export const unpinRight: IMXIcon = {
  name: "unpin-right",
  value: require("./svgs/unpin-right.svg"),
  categories: ["content"],
  keywords: ["unpin", "unfreeze", "right", "pushpin", "nail", "marker", "detach", "tack", "thumbtack"],
};

export const content = [
  addChild,
  addRow,
  jumpDown,
  jumpUp,
  pinLeft,
  pinRight,
  unpinLeft,
  unpinRight,
];
