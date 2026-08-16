/**
 * Video Popup Block — Front-end Interactive Controller
 *
 * Handles dynamic media embed injection, zero-audio-leak teardown,
 * WCAG 2.1 AA modal focus trapping, and keyboard/backdrop dismissal.
 */
(function() {
	'use strict';

	/**
	 * Extract embed metadata from various video provider URLs.
	 * @param {string} rawUrl
	 * @param {boolean} autoplay
	 * @returns {{ type: 'youtube'|'vimeo'|'direct'|'iframe', src: string }|null}
	 */
	function parseVideoUrl(rawUrl, autoplay) {
		if (!rawUrl || typeof rawUrl !== 'string') {
			return null;
		}

		const url = rawUrl.trim();
		if (!url) {
			return null;
		}

		// YouTube regex patterns
		const ytMatch = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
		if (ytMatch && ytMatch[1]) {
			const videoId = ytMatch[1];
			const apParam = autoplay ? '1' : '0';
			return {
				type: 'youtube',
				src: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${apParam}&enablejsapi=1&rel=0&modestbranding=1&playsinline=1`
			};
		}

		// Vimeo regex patterns
		const vimeoMatch = url.match(/(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/(?:\d+\/)?video\/|video\/|))(\d+)/i);
		if (vimeoMatch && vimeoMatch[1]) {
			const videoId = vimeoMatch[1];
			const apParam = autoplay ? '1' : '0';
			return {
				type: 'vimeo',
				src: `https://player.vimeo.com/video/${videoId}?autoplay=${apParam}&autopause=0&playsinline=1`
			};
		}

		// Direct video file (mp4, webm, ogg, mov)
		if (/\.(mp4|webm|ogg|ogv|mov)(\?.*)?$/i.test(url)) {
			return {
				type: 'direct',
				src: url
			};
		}

		// Generic fallback iframe
		return {
			type: 'iframe',
			src: url
		};
	}

	/**
	 * Focusable selectors for keyboard focus trap.
	 */
	const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video, iframe';

	/**
	 * Initialize all video popup blocks on the page.
	 */
	function initVideoPopups() {
		const triggerButtons = document.querySelectorAll('.video-popup-play-btn');

		triggerButtons.forEach(function(btn) {
			if (btn.__videoPopupInitialized) {
				return;
			}
			btn.__videoPopupInitialized = true;

			const dialogId = btn.getAttribute('data-dialog-id');
			const dialog = dialogId ? document.getElementById(dialogId) : null;
			if (!dialog) {
				return;
			}

			const embedTarget = dialog.querySelector('.video-popup-embed-target');
			const closeBtn = dialog.querySelector('.video-popup-modal-close');
			let activeTrigger = null;

			/**
			 * Close the dialog and cleanly destroy all media to eliminate audio leakage.
			 */
			function closeModal() {
				// 1. Teardown HTML5 video element if present
				if (embedTarget) {
					const directVideos = embedTarget.querySelectorAll('video');
					directVideos.forEach(function(v) {
						try {
							v.pause();
							v.removeAttribute('src');
							v.load();
						} catch (e) {
							// Ignored
						}
					});

					// 2. Clear embed container immediately to stop iframe playback
					embedTarget.innerHTML = '';
				}

				// 3. Close the dialog
				if (typeof dialog.close === 'function' && dialog.open) {
					dialog.close();
				} else {
					dialog.removeAttribute('open');
				}

				document.body.classList.remove('video-modal-open');

				// 4. Restore focus to the initiating play button (WCAG 2.1 AA)
				if (activeTrigger && typeof activeTrigger.focus === 'function') {
					activeTrigger.focus();
				}
				activeTrigger = null;
			}

			/**
			 * Open the dialog, construct and inject the media embed, and trap focus.
			 */
			function openModal() {
				activeTrigger = btn;
				const videoUrl = btn.getAttribute('data-video-url') || (embedTarget ? embedTarget.getAttribute('data-video-url') : '');
				const autoplay = btn.getAttribute('data-autoplay') !== '0';

				const embedInfo = parseVideoUrl(videoUrl, autoplay);

				if (embedTarget) {
					embedTarget.innerHTML = '';

					if (embedInfo) {
						if (embedInfo.type === 'direct') {
							const videoEl = document.createElement('video');
							videoEl.className = 'video-popup-media-element';
							videoEl.setAttribute('controls', '');
							videoEl.setAttribute('playsinline', '');
							if (autoplay) {
								videoEl.setAttribute('autoplay', '');
							}
							videoEl.src = embedInfo.src;
							embedTarget.appendChild(videoEl);
						} else {
							const iframeEl = document.createElement('iframe');
							iframeEl.className = 'video-popup-media-element';
							iframeEl.setAttribute('src', embedInfo.src);
							iframeEl.setAttribute('title', dialog.getAttribute('aria-label') || 'Video Player');
							iframeEl.setAttribute('frameborder', '0');
							iframeEl.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
							iframeEl.setAttribute('allowfullscreen', 'true');
							embedTarget.appendChild(iframeEl);
						}
					} else {
						const msg = document.createElement('p');
						msg.className = 'video-popup-no-url';
						msg.textContent = 'No valid video URL configured.';
						embedTarget.appendChild(msg);
					}
				}

				// Open modal
				if (typeof dialog.showModal === 'function') {
					dialog.showModal();
				} else {
					dialog.setAttribute('open', '');
				}

				document.body.classList.add('video-modal-open');

				// Move focus to close button
				if (closeBtn) {
					closeBtn.focus();
				} else {
					dialog.focus();
				}
			}

			// Trigger button click
			btn.addEventListener('click', function(e) {
				e.preventDefault();
				openModal();
			});

			// Close button click
			if (closeBtn) {
				closeBtn.addEventListener('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					closeModal();
				});
			}

			// Backdrop click on native <dialog>
			dialog.addEventListener('click', function(e) {
				// In native <dialog>, clicking the backdrop target is the dialog element itself
				if (e.target === dialog) {
					closeModal();
				}
			});

			// Native HTML5 cancel event (fired when Escape is pressed)
			dialog.addEventListener('cancel', function(e) {
				e.preventDefault();
				closeModal();
			});

			// Keyboard Trap inside Modal (WCAG 2.1 AA)
			dialog.addEventListener('keydown', function(e) {
				if (e.key === 'Escape') {
					e.preventDefault();
					closeModal();
					return;
				}

				if (e.key !== 'Tab') {
					return;
				}

				const focusableElements = dialog.querySelectorAll(FOCUSABLE_SELECTOR);
				if (focusableElements.length === 0) {
					e.preventDefault();
					return;
				}

				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				if (e.shiftKey) {
					// Shift + Tab: if on first element, cycle to last
					if (document.activeElement === firstElement || document.activeElement === dialog) {
						e.preventDefault();
						lastElement.focus();
					}
				} else {
					// Tab: if on last element, cycle to first
					if (document.activeElement === lastElement) {
						e.preventDefault();
						firstElement.focus();
					}
				}
			});
		});
	}

	// Run on DOMContentLoaded or immediately if already loaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initVideoPopups);
	} else {
		initVideoPopups();
	}

	// Expose globally for dynamic AJAX/block-inserter refreshes
	window.initVideoPopups = initVideoPopups;
})();
