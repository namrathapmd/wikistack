const html = require("html-template-tag");
const layout = require("./layout");

function displayPages (page) {
  return html `<li><a href="/wiki/${page.slug}">${page.title}</a></li>`
}

module.exports = (pages) => layout(html`
  <h3> this is added as below line is getting hidden under nav bar </h3>
  <h3>Pages</h3>
  <hr>
  <form method="GET" action="/wiki/search">
    <input type="text" name="search" />
    <button type="submit">Search</button>
  </form>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.map(page => displayPages(page))}
    </ul>
  </ul>`);