export const enum IconCategory {
  Finance = "finance",
  Health = "health",
  Logos = "logos",
  Programming = "programming",
  SocialMedia = "social-media",
}

export interface IMXIcon {
  name: string;
  value: string;
  module: NodeModule;
  categories: IconCategory[];
  fontSet?: string;
  keywords?: string[];
}

