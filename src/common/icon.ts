export enum IconCategoryEnum {
  'finance',
  'health',
  'logos',
  'programming',
  'social media',
  'content',
  'editor',
}

export type IconCategory = keyof typeof IconCategoryEnum;

export namespace IconCategory {
  export function values() {
    return Object.keys(IconCategoryEnum);
  }
}

export interface IMXIcon {
  name: string;
  value: string;
  categories: IconCategory[];
  fontSet?: string;
  keywords?: string[];
}

