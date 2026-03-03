import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Programação para Dispositivos Móveis",
  tagline: "prof. Dr. Andres Jessé Porfirio",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: "https://andresjesse.github.io", // URL base do seu GitHub Pages
  baseUrl: "/ebook-pdm/", // Nome exato do seu repositório

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "andresjesse", // Usually your GitHub org/user name.
  projectName: "ebook-pdm", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "pt-BR",
    locales: ["pt-BR"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "PDM",
      logo: {
        alt: "E-book Logo",
        src: "img/icon.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "E-book",
        },
        {
          href: "https://github.com/andresjesse",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Conteúdo",
          items: [
            {
              label: "Início do E-book",
              to: "/docs/intro",
            },
            {
              label: "GitHub",
              href: "https://github.com/andresjesse",
            },
            {
              label: "Moodle do Curso",
              href: "https://moodle.utfpr.edu.br/course/view.php?id=26720",
            },
          ],
        },
        {
          title: "Desenvolvedor",
          items: [
            {
              label: "Sobre Mim",
              href: "https://www.debug.app.br/about-me",
            },
            {
              label: "Currículo Lattes",
              href: "http://lattes.cnpq.br/9249097856759800",
            },
            {
              label: "YouTube",
              href: "https://www.youtube.com/channel/UCoEwclpRDeO1yshFqsXu9vg",
            },
          ],
        },
        {
          title: "Projetos & Mais",
          items: [
            {
              label: "Site debug.app.br",
              href: "https://www.debug.app.br/",
            },
            {
              label: "Contato",
              href: "https://www.debug.app.br/contact",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Andres Jessé Porfirio. `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
