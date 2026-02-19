/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://techcultureclub.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/studio/*', '/(site)/call-back'],
  transform: async (config, path) => {
    // Custom priorities
    if (path === '/') return { priority: 1.0, changefreq: 'daily' }
    if (path === '/subscribe') return { priority: 0.9, changefreq: 'weekly' }
    if (path === '/about') return { priority: 0.6, changefreq: 'monthly' }
    if (path.startsWith('/posts/')) return { priority: 0.8, changefreq: 'weekly' }
    return { priority: 0.5, changefreq: 'weekly' }
  },
}
