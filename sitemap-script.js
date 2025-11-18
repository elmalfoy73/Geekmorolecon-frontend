const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const BASE_URL = 'https://geekmorolekon.ru';

const routes = [
  '/',
];

async function generateSitemap() {
  const sitemapPath = path.join(__dirname, 'build', 'sitemap.xml');

  const stream = new SitemapStream({ hostname: BASE_URL });
  const writeStream = createWriteStream(sitemapPath);

  stream.pipe(writeStream);

  routes.forEach(route => {
    stream.write({
      url: route,
      changefreq: 'weekly',
      priority: 0.8,
    });
  });

  stream.end();

}

generateSitemap().catch(console.error);
