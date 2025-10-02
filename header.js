(() => {
	const placeholder = document.getElementById('header-placeholder');
	if (!placeholder) {
		return;
	}
	fetch('header.html')
		.then(response => {
			if (!response.ok) {
				throw new Error(`Failed to load header: ${response.status}`);
			}
			return response.text();
		})
		.then(html => {
			placeholder.innerHTML = html;
			initHeaderInteractions();
		})
		.catch(error => console.error(error));

	function initHeaderInteractions() {
		const menuBtn = document.getElementById('menu-btn');
		const mobileNav = document.getElementById('mobile-nav');
		if (menuBtn && mobileNav) {
			menuBtn.addEventListener('click', () => {
				mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
			});
		}

		function positionMenuBtn() {
			const btn = document.getElementById('menu-btn');
			const title = document.getElementById('site-title');
			const nav = document.getElementById('mobile-nav');
			if (!btn || !title || !nav) {
				return;
			}
			if (window.innerWidth <= 1100) {
				const titleRight = title.getBoundingClientRect().right;
				const screenRight = window.innerWidth;
				const midpoint = (titleRight + screenRight) / 2;
				btn.style.left = `${midpoint}px`;
				btn.style.transform = 'translateX(-50%) translateY(-50%)';
			} else {
				btn.style.left = '';
				btn.style.transform = 'translateY(-50%)';
				nav.style.display = '';
			}
		}

		window.addEventListener('resize', positionMenuBtn);
		window.addEventListener('load', positionMenuBtn);
		positionMenuBtn();

		const popup = document.getElementById('popup');
		const popupClose = document.getElementById('popup-close');
		const comingSoonLinks = document.querySelectorAll('.coming-soon-link');
		if (popup && popupClose && comingSoonLinks.length) {
			comingSoonLinks.forEach(link => {
				link.addEventListener('click', event => {
					event.preventDefault();
					popup.classList.add('active');
				});
			});
			popupClose.addEventListener('click', () => {
				popup.classList.remove('active');
			});
			popup.addEventListener('click', event => {
				if (event.target === popup) {
					popup.classList.remove('active');
				}
			});
		}
	}
})();

