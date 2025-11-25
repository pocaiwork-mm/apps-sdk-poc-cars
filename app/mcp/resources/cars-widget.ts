import { Widget } from "@/app/mcp/utility/types";

export type ResourceOptions = {
  title: string;
  description: string;
  mimeType: string;
  _meta: {
    "openai/widgetDescription": string;
    "openai/widgetPrefersBorder": boolean;
  };
};

export type ResourceContent = {
  uri: string;
  mimeType: string;
  text: string;
  _meta: {
    "openai/widgetDescription": string;
    "openai/widgetPrefersBorder": boolean;
    "openai/widgetDomain": string;
  };
};

export const createCarsWidgetResource = (widget: Widget, htmlContent: string) => {
  return {
    options: {
      title: widget.title,
      description: widget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": widget.description,
        "openai/widgetPrefersBorder": true,
      },
    } as ResourceOptions,

    handler: async (uri: { href: string }) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${htmlContent}</html>`,
          _meta: {
            "openai/widgetDescription": widget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": widget.widgetDomain,
          },
        },
      ],
    }) as Promise<{ contents: ResourceContent[] }>,
  };
};
