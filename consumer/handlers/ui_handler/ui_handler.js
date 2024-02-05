const fs = require("fs");
const path = require("path");

const html_file_path = path.join(__dirname, "html_page.html");
const html_content = fs.readFileSync(html_file_path, "utf-8");

class HtmlCarrier {
  constructor() {}

  static html_cache = "";

  static cache_html() {
    console.log("Caching HTML for faster loading");
    HtmlCarrier.html_cache = fs.readFileSync(html_file_path, "utf-8");
  }

  static get_html() {
    if (!HtmlCarrier.html_cache) {
      HtmlCarrier.cache_html();
    }
    return HtmlCarrier.html_cache;
  }
}

HtmlCarrier.cache_html(); // Ensure that HTML is cached during startup

module.exports = (req, res, next) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(HtmlCarrier.get_html());
  next();
};
