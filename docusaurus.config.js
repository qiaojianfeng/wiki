// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */

const config = {
  title: 'FENG',
  tagline: 'Before you quit, Try',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://q-jf.cn',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'QiaoJianFeng', // Usually your GitHub org/user name.
  projectName: 'wiki', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  titleDelimiter: '🦖', // 默认为 `|`

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['en', 'zh-Hans'],
    path: 'i18n',
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/qiaojianfeng/wiki/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          
          editUrl:
            'https://github.com/qiaojianfeng/wiki/edit/main',
            feedOptions: {
              type: 'all',
              copyright: `Copyright © ${new Date().getFullYear()} QiaoJianFeng, Inc.`,
            },
            blogSidebarCount: 'ALL',
            blogSidebarTitle: '全部博文',
        },
        theme: {
          
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: { changefreq: "weekly", priority: 0.5, ignorePatterns: ["/tags/**"], filename: "sitemap.xml"}
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'announcementBar-2', // Increment on change
        content: `⭐️ If you like OH!Feng, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/qiaojianfeng">GitHub</a> `,
      },
      navbar: {
        title: 'OH!Feng',
        hideOnScroll: true,
        logo: {
          alt: 'OH!Feng',
          src: 'img/logo.svg',
        },
        
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '文档',
          },
          { to: '/blog', label: '博客', position: 'left' },
          { to: 'showcase', label: '分享', position: 'left' },
          { to: 'showcase', label: '关于我', position: 'left' },
          // right
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          {
            href: 'https://github.com/qiaojianfeng',
            className: 'header-github-link',
            position: 'right',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        // logo: {
        //   alt: 'Meta 开源图标',
        //   src: 'img/meta_oss_logo.png',
        //   width: 160,
        //   height: 51,
        // },
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.<br/><a href="https://beian.miit.gov.cn/" target="_blank">晋ICP备16005245号-5</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: 'SOLXZ74ZA8',
        apiKey: 'd9c9455462da1ae60e4862438246e29d',
        indexName: 'oh!feng',
        replaceSearchResultPathname: {
                from: /^\/docs\/next/g,
                to: '/docs',
              } 
      },
    }),
};

module.exports = config;


 
