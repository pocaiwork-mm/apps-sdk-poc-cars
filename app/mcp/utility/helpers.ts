import { Widget, WidgetMetadata } from "./types";

// Fetch HTML from a given path
export const getAppsSdkCompatibleHtml = async (
  baseUrl: string,
  path: string
): Promise<string> => {
  const result = await fetch(`${baseUrl}${path}`);
  return await result.text();
};

// Generate widget metadata for OpenAI SDK
export const widgetMeta = (widget: Widget): WidgetMetadata => {
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
    "openai/widgetAccessible": false,
    "openai/resultCanProduceWidget": true,
  };
};
