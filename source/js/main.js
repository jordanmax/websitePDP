var ShopChop = ShopChop || {};

(function($, window){

    // USE STRICT
    "use strict";

    ShopChop.initialize = {
        init: function () {
            $('.find-store__radius__select').selectmenu({
                appendTo: '.find-store__radius'
            });
        },
        searchBox: function() {
            $('.mobile-search-input-trigger').on('click', function() {
                $(this).closest('.search-box-inputs').addClass('search-box-inputs--active');
            });
            $('html').on('click', function(e) {
                $('.search-box-inputs').removeClass('search-box-inputs--active');
            });
            $('.search-box-inputs').on('click', function(e) {
                e.stopPropagation();
            });
        },
        currencySelect: function() {
            var  $currencySelect = $('.currency__select-value-text');
            $('.change-currency__select').selectmenu({
                appendTo:'.currency__drop-down',
                width: 191,
                change: function( event, ui ) {
                    $currencySelect.text(ui.item.value);
                }
            });
            $('.currency__drop-down').addClass('currency__drop-down--hidden');
        },
        mainSlider: function() {
            $('.main-slider').bxSlider({
                pager: false,
                hideControlOnEnd: true,
                infiniteLoop: false,
                onSliderLoad: function() {
                    this.getCurrentSlideElement().addClass('main-slider__item--active');
                },
                onSlideAfter: function($slideElement) {
                    $slideElement.siblings().removeClass('main-slider__item--active');
                },
                onSlideBefore: function($slideElement) {
                    $slideElement.addClass('main-slider__item--active');
                }
            });
        },
        locatorInput: function() {
            var $locatorInput = $('.find-address__input'),
                $placeHolder = $('.find-address__placeholder');

            $locatorInput.on('keyup', function() {
                if($locatorInput.val().length > 0) {
                    $placeHolder.addClass('find-address__placeholder--hidden');
                }
                else {
                    $placeHolder.removeClass('find-address__placeholder--hidden');
                }
            });
        },
        currencySelect2: function() {
            var $currencyChange = $('.currency-select'),
                $dropDown = $('.currency-dropdown'),
                $currencySelect = $("#currency-select"),
                $document = $('document');

            $currencyChange.on('click', function (event) {
                event.stopPropagation();
                $dropDown.fadeToggle();
                $currencySelect.selectmenu({
                    appendTo: ".currency-dropdown"
                });
            });

            $document.on('click', function () {
                $dropDown.fadeOut();
            });

            $dropDown.on('click', function (event) {
                event.stopPropagation();
            });
        },
        customSelects: function() {
            var customSelects = $('select.form-select'),
                selectMenu;
            function refreshCustomSelects() {
                customSelects.selectmenu('refresh');
            }
            customSelects.selectmenu();
            selectMenu = _.debounce(refreshCustomSelects, 300);

            $(window).resize(selectMenu);
        },
        productSlider: {
            defaults: {
                $products: null,
                sliders: [],
                matchMedia: 'screen and (max-width: 690px)'
            },
            init: function () {
                var that = this,
                    mql = window.matchMedia(that.defaults.matchMedia);

                that.defaults.$products = $('.products-slider');

                if (!mql.matches) {
                    that.createSliders();
                }

                var checkForSlider = _.debounce(that.checkForSlider, 300);
                $(window).resize(checkForSlider);

            },
            checkForSlider: function () {
                var productSlider = ShopChop.initialize.productSlider,
                    mql = window.matchMedia(productSlider.defaults.matchMedia);
                if (mql.matches) {
                    _.map(productSlider.defaults.sliders, function (slider) {
                        return slider.destroySlider();
                    });
                    productSlider.defaults.sliders = [];
                }
                else if (productSlider.defaults.sliders.length === 0) {
                    productSlider.createSliders();
                }
            },
            createSliders: function () {
                var that = this;

                this.defaults.$products.each(function () {
                    var $this = $(this),
                        productsCount = $this.find('.products__item').length;

                    if (productsCount > 4) {

                        $this.removeClass('disabled-slider');
                        that.defaults.sliders.push(
                            $this.bxSlider({
                                minSlides: 4,
                                maxSlides: 4,
                                slideWidth: 220,
                                slideMargin: 20,
                                pager: false,
                                easing: 'ease-in-out'
                            })
                        );
                    }
                    else {
                        $this.addClass('disabled-slider');
                    }
                });
            }
        },
        megaNav: {
            default: {
                $mainNavbar: null,
                $megaNavTrigger: null,
                $megaMenuWrapper: null,
                $megaNavCategory: null,
                matchMedia: 'screen and (max-width: 690px)'
            },
            init: function() {
                var that = this;

                this.default.$mainNavbar = $('.main-navbar');
                this.default.$megaNavTrigger = $('.mega-menu');
                this.default.$megaMenuWrapper = $('.mega-menu__wrapper');
                this.default.$megaNavCategory = $('.mega-menu__category');
                that.openMenu();
                that.deviceToggleMenu();

                var mobileMenu = _.debounce(that.openMenu, 300);
                $(window).resize(mobileMenu);

            },
            openMenu: function() {
                var that = ShopChop.initialize.megaNav,
                    mql = window.matchMedia(that.default.matchMedia);

                if(mql.matches) {
                    that.default.$mainNavbar.removeClass('main-navbar--active');
                    that.default.$megaNavTrigger.unbind('mouseenter mouseleave');
                    that.default.$megaMenuWrapper.show();
                    that.default.$megaNavCategory.removeClass('mega-menu__category--active');
                    that.default.$megaNavTrigger.removeClass('mega-menu--active');
                }
                else {
                    that.default.$megaMenuWrapper.hide();
                    that.default.$megaNavCategory.removeClass('mega-menu__category--active');
                    that.default.$megaNavTrigger.removeClass('mega-menu--active')
                        .hover( that.linkHover, that.linkHoverOut );
                }
            },
            deviceToggleMenu: function() {
                var $html = $('html'),
                    $menu = $('.main-navbar'),
                    $navToggle = $('.main-navbar__toggle');

                $navToggle.on('click', function(e) {
                    e.stopPropagation();
                    $menu.toggleClass('main-navbar--active');
                });
                $html.on('click', function(e) {
                    $menu.removeClass('main-navbar--active');
                });
                $menu.on('click', function(e) {
                    e.stopPropagation();
                });
                this.default.$megaNavTrigger.on('click', function(e) {
                    e.preventDefault();
                    $(this).toggleClass('mega-menu--active');
                });
                this.default.$megaNavCategory.on('click', function(e) {
                    e.stopPropagation();
                    $(this).toggleClass('mega-menu__category--active');
                });
            },
            linkHover: function() {
                $(this).addClass('mega-menu--active').find('.mega-menu__wrapper').stop(true,true).fadeIn();
            },
            linkHoverOut: function() {
                $(this).removeClass('mega-menu--active').find('.mega-menu__wrapper').stop(true,true).fadeOut();
            }
        }
    };

    ShopChop.documentOnReady = {
        init: function() {
            ShopChop.initialize.init();
            ShopChop.initialize.locatorInput();
            ShopChop.initialize.mainSlider();
            ShopChop.initialize.currencySelect();
            ShopChop.initialize.searchBox();
            ShopChop.initialize.customSelects();
            ShopChop.initialize.productSlider.init();
            ShopChop.initialize.megaNav.init();
        }
    };

    $(document).ready( ShopChop.documentOnReady.init );

})(jQuery, window);
