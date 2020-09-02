import { Rule, Tree } from "@angular-devkit/schematics";

export default function (): Rule {
  return (tree: Tree) => {
    return tree;
  };
}
