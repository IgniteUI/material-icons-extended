export enum IconCategoryEnum {
  "construction",
  "content",
  "editor",
  "election",
  "finance",
  "health",
  "logos",
  "programming",
  "social media",
}

export type IconCategory = keyof typeof IconCategoryEnum;

export namespace IconCategory {
  function isIndex(key: string | number): boolean {
    const n = ~~Number(key);
    return String(n) === key && n >= 0;
  }

  export function values() {
    return Object.keys(IconCategoryEnum).filter((key) => !isIndex(key));
  }
}

export interface IMXIcon {
  name: string;
  value: string;
  categories: IconCategory[];
  fontSet?: string;
  keywords?: string[];
}
