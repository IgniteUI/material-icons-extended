import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

const version = "2.3.0";

export default function (): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      `Applying migration for IgniteUI Material Icons Extended to version ${version}`
    );
    return tree;
  };
}
