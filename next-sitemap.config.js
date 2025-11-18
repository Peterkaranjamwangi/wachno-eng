/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://wachnoengineering.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    additionalSitemaps: [
      process.env.SITE_URL
        ? `${process.env.SITE_URL}/sitemap.xml`
        : 'https://wachnoengineering.com/sitemap.xml',
    ],
  },
  exclude: ['/admin', '/admin/*', '/api/*'],
}
