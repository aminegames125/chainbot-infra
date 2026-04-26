import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>ChainBot Docs</span>,
  project: { link: "https://github.com/yourorg/chainbot" },
  docsRepositoryBase: "https://github.com/yourorg/chainbot/tree/main/apps/docs",
  footer: { text: "ChainBot · chainbot.animeos.dev · Chain ID 13371" },
  primaryHue: 252,
  useNextSeoProps() {
    return { titleTemplate: "%s — ChainBot Docs" };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="ChainBot Docs" />
    </>
  ),

};
export default config;
