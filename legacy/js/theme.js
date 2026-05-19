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

REL.handleSearchClick = function () {
	const category = REL.E.operatorCategorySelect.val();
	const region = REL.E.operatorRegionSelect.val();

	if (category === '' && region === '') {
		REL.E.operatorResults.removeClass('fade-in').addClass('fade-out');
		setTimeout(function () {
			REL.E.operatorResults.empty().hide();
		}, 200);

		setTimeout(function () {
			REL.E.operatorList.removeClass('fade-out').addClass('fade-in').show();
		}, 200);
		return;
	}

	if (REL.E.operatorList.is(':visible')) {
			REL.E.operatorList.addClass('fade-out');
			setTimeout(function () {
					REL.E.operatorList.hide();
			}, 200);
	}

	if (REL.E.operatorResults.is(':visible')) {
			REL.E.operatorResults.removeClass('fade-in').addClass('fade-out');
			setTimeout(function () {
					REL.E.operatorResults.empty().hide();
			}, 200);
	}

	setTimeout(function () {
			jQuery.ajax({
					url: adminAjaxUrl,
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
					}
			});
	}, 200);
};

REL.initDropdowns = function () {
	jQuery('.custom-dropdown').each(function () {
			const $dropdown = jQuery(this);
			const $header = $dropdown.find('.dropdown-header');
			const $options = $dropdown.find('.dropdown-options');
			const $selectedText = $dropdown.find('.dropdown-header span');

			$header.on('click', function () {
					$dropdown.toggleClass('open');
			});

			$options.find('.dropdown-option').on('click', function () {
					$selectedText.text(jQuery(this).text());
					const optionValue = jQuery(this).data('value');

					$dropdown.removeClass('open');

					if ($dropdown.attr('id') === 'operator_category_dropdown') {
							REL.E.operatorCategorySelect.val(optionValue);
					} else if ($dropdown.attr('id') === 'operator_region_dropdown') {
							REL.E.operatorRegionSelect.val(optionValue);
					}
			});
	});
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