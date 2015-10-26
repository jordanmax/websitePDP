var currencySelect = {
    init: function () {
        var $currencyChange = $('.currency-select'),
            $dropDown = $('.currency-dropdown'),
            $currencySelect = $("#currency-select"),
            that = this,
            $document = $(document);

        $currencyChange.on('click', function (event) {
            event.stopPropagation();
            $dropDown.fadeToggle();
            $currencySelect.selectmenu({
                appendTo: ".currency-dropdown"
            });
        });

        $document.on('click', function() {
            $dropDown.fadeOut();
        });

        $dropDown.on('click', function(event) {
            event.stopPropagation();
        })
    }
};

var initProductSlider = {
    init: function() {
        var $products = $('.products-slider');
        $products.each(function() {
            var $this = $(this),
                productsCount = $this.find('.products__item').length;
            if(productsCount > 4) {
                $this.removeClass('disabled-slider');
                $this.bxSlider({
                    minSlides: 3,
                    maxSlides: 4,
                    slideWidth: 220,
                    slideMargin: 20,
                    pager: false,
                    easing: 'ease-in-out'
                });
            }
            else {
                $this.addClass('disabled-slider')
            }
        });
    }
};

var locatorInput = {
    init: function() {
        var $locatorInput = $('.find-address__input'),
            $placeHolder = $('.find-address__placeholder');

        $locatorInput.on('keyup', function() {
            if($locatorInput.val().length > 0) {
                $placeHolder.addClass('find-address__placeholder--hidden')
            }
            else {
                $placeHolder.removeClass('find-address__placeholder--hidden')
            }
        })
    }
};

$(function() {
    //currencySelect.init();
    initProductSlider.init();
    locatorInput.init();

    $('select.form-select').selectmenu();

    $('.find-store__radius__select').selectmenu({
        appendTo: '.find-store__radius'
    });

    $('.main-slider').bxSlider({
        pager: false,
        onSliderLoad: function() {
            this.getCurrentSlideElement().addClass('main-slider__item--active');
        },
        onSlideBefore: function($slideElement) {
            $slideElement.addClass('main-slider__item--active');
            $slideElement.siblings().removeClass('main-slider__item--active')
        }
    });

    var  $currencySelect = $('.currency__select-value-text');
    $('.change-currency__select').selectmenu({
        appendTo:'.currency__drop-down',
        width: 191,
        change: function( event, ui ) {
            $currencySelect.text(ui.item.value)
        }
    });
    $('.currency__drop-down').addClass('currency__drop-down--hidden')
});