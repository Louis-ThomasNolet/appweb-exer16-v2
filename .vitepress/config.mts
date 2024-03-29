import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/appweb-exer16-v2/",
  title: "Exercice 16",
  description: "Revue de code documentee",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Alexis Champoux', link: '/alexis-champoux' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Alexis Champoux', link: '/alexis-champoux' },
          { text: 'Louis-Thomas Nolet', link: '/louis-thomas-nolet' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
