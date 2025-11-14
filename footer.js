/// footer.js
(function () {
  function onReady(fn){ if(document.readyState!=="loading"){fn()} else {document.addEventListener("DOMContentLoaded",fn)} }
  onReady(function(){
    // Footer-specific hooks can go here later.
    // Example: dynamically set current year
    var footer = document.querySelector('footer .container');
    if (footer) {
      // Replace © 2025 with the current year automatically if present
      var y = new Date().getFullYear();
      footer.innerHTML = footer.innerHTML.replace(/©\s*\d{4}/, "© " + y);
    }
  });
})();
