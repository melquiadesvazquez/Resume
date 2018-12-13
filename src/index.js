if (module.hot) {
  module.hot.accept()
}

require('./css/reset.css');
require('./css/style.css');
require('offline-plugin/runtime').install();

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded", "page-index")
});