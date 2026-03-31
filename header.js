/// header.js
(function () {
	function onReady(fn){ if(document.readyState!=="loading"){fn()} else {document.addEventListener("DOMContentLoaded",fn)} }

	onReady(function(){
		// Mobile menu toggle
		var menuBtn = document.getElementById('menu-btn');
		var mobileNav = document.getElementById('mobile-nav');
		if (menuBtn && mobileNav) {
			menuBtn.addEventListener('click', function(){
				mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
			});
		}

		// Center hamburger between title right edge & screen right edge
		function positionMenuBtn(){
			var btn = document.getElementById('menu-btn');
			var title = document.getElementById('site-title');
			if(!btn || !title){ return; }
			if(window.innerWidth <= 1100){
				var titleRight = title.getBoundingClientRect().right;
				var screenRight = window.innerWidth;
				var midpoint = (titleRight + screenRight) / 2;
				btn.style.left = midpoint + "px";
				btn.style.transform = "translateX(-50%) translateY(-50%)";
			} else {
				btn.style.left = "";
				btn.style.transform = "translateY(-50%)";
				// Reset mobile nav when back to desktop
				if (mobileNav) mobileNav.style.display = "";
			}
		}
		window.addEventListener('resize', positionMenuBtn);
		window.addEventListener('load', positionMenuBtn);
		positionMenuBtn();
	});
})();
