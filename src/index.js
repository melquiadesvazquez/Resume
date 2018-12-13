if (module.hot) {
  module.hot.accept()
}

require('./css/reset.css');
require('./css/style.css');

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded", "page-index")
});