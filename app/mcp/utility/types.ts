// Widget type definition
export type Widget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  html?: string;
  description: string;
  widgetDomain: string;
};

// Widget metadata for OpenAI integration
export type WidgetMetadata = {
  "openai/outputTemplate": string;
  "openai/toolInvocation/invoking": string;
  "openai/toolInvocation/invoked": string;
  "openai/widgetAccessible": boolean;
  "openai/resultCanProduceWidget": boolean;
};
