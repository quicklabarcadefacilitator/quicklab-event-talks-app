const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Ensure the dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Read the source files
const htmlTemplate = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf-8');
const cssContent = fs.readFileSync(path.join(srcDir, 'style.css'), 'utf-8');
const jsContent = fs.readFileSync(path.join(srcDir, 'app.js'), 'utf-8');

// Inject CSS and JS into the HTML template
let finalHtml = htmlTemplate.replace('<!-- CSS_PLACEHOLDER -->', `<style>${cssContent}</style>`);
finalHtml = finalHtml.replace('<!-- JS_PLACEHOLDER -->', `<script>${jsContent}</script>`);

// Write the final combined HTML file
fs.writeFileSync(path.join(distDir, 'index.html'), finalHtml);

console.log('Build successful! Your website is ready in the "dist" directory.');
