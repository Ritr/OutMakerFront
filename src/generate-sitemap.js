import { generateSitemap } from 'vite-plugin-sitemap';
import routes from './src/routes'; // Adjust the path based on your project structure

generateSitemap({
  base: 'https://theoutmaker.com.au',
  outDir: 'public',
  routes,
});