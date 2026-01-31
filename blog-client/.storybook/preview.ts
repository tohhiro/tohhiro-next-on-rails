import addonA11y from "@storybook/addon-a11y";
import { definePreview } from "@storybook/nextjs-vite";
import "../app/globals.css";

export default definePreview({
  addons: [addonA11y()],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
});
