const toc = require('remark-toc');
module.exports = {
  title: 'Program Builder',
  tagline: 'A TypeScript library for building command-line interfaces',
  url: 'https://program-builder.netlify.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'wcauchois', // Usually your GitHub org/user name.
  projectName: 'program-builder', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Program Builder',
      links: [
        {to: 'docs/getting-started', label: 'Docs', position: 'left'},
        {to: 'docs/api/program-builder.programbuilder', label: 'API', position: 'left'},
        {to: 'docs/examples', label: 'Examples', position: 'left'},
        {
          href: 'https://github.com/wcauchois/program-builder',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Bill Cauchois. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/wcauchois/program-builder/edit/master/website/',
          remarkPlugins: [toc],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
