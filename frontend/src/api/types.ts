export type TemplateType = "cv" | "flyer" | "trifold";

export type GenerateRequest = {
  template: TemplateType;
  language: "es" | "en";
  userInfo: string;
  // Optional: allow later additions like theme/style
  style?: "clean" | "modern" | "bold";
};

export type GenerateResponse = {
  html: string;
};