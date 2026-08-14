jQuery(document).ready(function () {

	REL.E.wrapper = jQuery(".wp-block-getwid-custom-post-type__wrapper");
	REL.E.posts = REL.E.wrapper.find(".wp-block-getwid-custom-post-type__post");
	REL.E.menuItems = jQuery('.site-footer .menu-item-has-children .footer-menu-title');
	REL.E.operatorSearchBtn = jQuery('#operator_search_btn');
	REL.E.operatorCategorySelect = jQuery('#operator_category_select');
	REL.E.operatorRegionSelect = jQuery('#operator_region_select');
	REL.E.operatorList = jQuery('.Operator_List');
	REL.E.operatorResults = jQuery('#operator_results');

	REL.init();
});

var REL = {};
REL.E = {};

REL.init = function () {
	jQuery(window).on("scroll", REL.handleScroll);
	REL.initMenuToggle();
	REL.E.operatorSearchBtn.on('click', REL.handleSearchClick);
	REL.initDropdowns();
	REL.fancyBox();
	REL.getwidGallery();
};

REL.handleScroll = function () {
	REL.E.posts.each(function (index) {
			const $post = jQuery(this);
			const offsetTop = $post.offset().top;
			const scrollTop = jQuery(window).scrollTop();
			const windowHeight = jQuery(window).height();
			console.log(offsetTop);

			if (scrollTop + windowHeight > offsetTop && scrollTop < offsetTop + $post.outerHeight()) {
				setTimeout(function () {
						$post.addClass("spin-background");
				}, 1000);
			} else {
				setTimeout(function () {
					$post.removeClass("spin-background");
			}, 1000);
			}
	});
};

REL.initMenuToggle = function () {
	
	const isMobile = () => window.innerWidth <= 768;

	const handleMenuToggle = function () {
			if (!isMobile()) return; 

			const parent = jQuery(this).parent(); 
			const submenu = parent.find("ul"); 

			if (parent.hasClass("open")) {
					parent.removeClass("open");
					submenu.css("max-height", "0");
			} else {
					REL.E.menuItems.parent().removeClass("open").find("ul").css("max-height", "0");

					parent.addClass("open");
					const submenuHeight = submenu.prop("scrollHeight");
					submenu.css("max-height", submenuHeight + "px");
			}
	};

	REL.E.menuItems.off("click").on("click", handleMenuToggle);

	jQuery(window).on("resize", function () {
			if (!isMobile()) {
					REL.E.menuItems.parent().removeClass("open").find("ul").css("max-height", "");
			}
	});
};

REL.handleSearchClick = function (triggerUrlUpdate = true) {
	const category = REL.E.operatorCategorySelect.val() || '';
	const region = REL.E.operatorRegionSelect.val() || '';
	const resetBtn = jQuery('#operator_reset_btn');

	if (triggerUrlUpdate && window.history && window.history.pushState) {
		const url = new URL(window.location.href);
		if (category) {
			url.searchParams.set('category', category);
		} else {
			url.searchParams.delete('category');
		}
		if (region) {
			url.searchParams.set('region', region);
		} else {
			url.searchParams.delete('region');
		}
		window.history.pushState({}, '', url.toString());
	}

	if (category === '' && region === '') {
		resetBtn.hide();
		REL.E.operatorResults.removeClass('fade-in').addClass('fade-out').empty().hide();
		REL.E.operatorList.removeClass('fade-out').addClass('fade-in').show();
		return;
	}

	resetBtn.show();
	REL.E.operatorList.hide();
	REL.E.operatorResults.html('<div class="operator-loading"><p>Loading operators...</p></div>').show();

	jQuery.ajax({
		url: adminAjaxUrl || '/wp-admin/admin-ajax.php',
		method: 'POST',
		data: {
			action: 'filter_operators',
			operator_cat: category,
			operator_region: region
		},
		success: function(data) {
			REL.E.operatorResults.html(data).show().removeClass('fade-out').addClass('fade-in');
		},
		error: function(error) {
			console.error('Error fetching operators:', error);
			REL.E.operatorResults.html('<div class="operator-empty-state"><p>Unable to load operators. Please try again.</p></div>');
		}
	});
};

REL.initDropdowns = function () {
	jQuery('.custom-dropdown').each(function () {
		const $dropdown = jQuery(this);
		const $header = $dropdown.find('.dropdown-header');
		const $options = $dropdown.find('.dropdown-options');
		const $selectedText = $dropdown.find('.dropdown-header .selected-label, .dropdown-header span');

		$header.on('click', function (e) {
			e.stopPropagation();
			jQuery('.custom-dropdown').not($dropdown).removeClass('open').attr('aria-expanded', 'false');
			const isOpen = $dropdown.toggleClass('open').hasClass('open');
			$dropdown.attr('aria-expanded', isOpen);
		});

		$options.find('.dropdown-option').on('click', function () {
			const optionValue = jQuery(this).data('value');
			$selectedText.text(jQuery(this).text().split('(')[0].trim());
			$options.find('.dropdown-option').removeClass('is-selected');
			jQuery(this).addClass('is-selected');
			$dropdown.removeClass('open').attr('aria-expanded', 'false');

			if ($dropdown.attr('id') === 'operator_category_dropdown') {
				REL.E.operatorCategorySelect.val(optionValue);
			} else if ($dropdown.attr('id') === 'operator_region_dropdown') {
				REL.E.operatorRegionSelect.val(optionValue);
			}

			REL.handleSearchClick(true);
		});
	});

	// Close dropdown when clicking outside
	jQuery(document).on('click', function () {
		jQuery('.custom-dropdown').removeClass('open').attr('aria-expanded', 'false');
	});

	// Reset button handler
	jQuery(document).on('click', '#operator_reset_btn, .operator-reset-btn', function (e) {
		e.preventDefault();
		REL.E.operatorCategorySelect.val('');
		REL.E.operatorRegionSelect.val('');
		jQuery('#selected_category').text('All Categories');
		jQuery('#selected_region').text('All Regions');
		jQuery('.custom-dropdown .dropdown-option').removeClass('is-selected');
		jQuery('.custom-dropdown .dropdown-option[data-value=""]').addClass('is-selected');
		REL.handleSearchClick(true);
	});

	// Check URL params on initial load
	if (window.location.search) {
		const params = new URLSearchParams(window.location.search);
		const catParam = params.get('category');
		const regParam = params.get('region');

		if (catParam || regParam) {
			if (catParam) {
				REL.E.operatorCategorySelect.val(catParam);
				const catOption = jQuery('#operator_category_dropdown .dropdown-option[data-value="' + catParam + '"], #operator_category_dropdown .dropdown-option[data-slug="' + catParam + '"]');
				if (catOption.length) {
					jQuery('#selected_category').text(catOption.first().text().split('(')[0].trim());
				}
			}
			if (regParam) {
				REL.E.operatorRegionSelect.val(regParam);
				const regOption = jQuery('#operator_region_dropdown .dropdown-option[data-value="' + regParam + '"], #operator_region_dropdown .dropdown-option[data-slug="' + regParam + '"]');
				if (regOption.length) {
					jQuery('#selected_region').text(regOption.first().text().split('(')[0].trim());
				}
			}
			REL.handleSearchClick(false);
		}
	}
};

REL.fancyBox = function () {
	Fancybox.bind('[data-fancybox="gallery"]', {
		Toolbar: true,
		closeButton: "top",
		Thumbs: {
				autoStart: true,
		},
	});
}

REL.getwidGallery = function () {
	if(jQuery('.wp-block-getwid-images-stack').length>0) {
		jQuery('.wp-block-getwid-images-stack__media-inner-wrapper').each(function(){
			var alt = jQuery(this).find('img').attr("alt");
			jQuery(this).append("<div class='caption'>"+ alt +"</div>");
		});
	}
}