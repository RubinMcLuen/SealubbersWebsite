/// footer.js
(function () {
  function onReady(fn){ if(document.readyState!=="loading"){fn()} else {document.addEventListener("DOMContentLoaded",fn)} }
  onReady(function(){
    var el = document.querySelector('.copyright');
    if (el){ el.innerHTML = el.innerHTML.replace(/©\s*\d{4}/, "© " + new Date().getFullYear()); }
  });
})();
