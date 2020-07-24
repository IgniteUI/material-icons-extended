export const enum IconCategory {
  Finance = "finance",
  Health = "health",
  Logos = "logos",
  Programming = "programming",
  SocialMedia = "social-media",
}

export interface IMXIcon {
  name: String;
  value: String;
  category: IconCategory;
  fontSet?: String;
}

