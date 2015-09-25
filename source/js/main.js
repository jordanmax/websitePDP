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

$(function() {
    //currencySelect.init();
    var  $currencySelect = $('.currency__select-value-text');
    $('.change-currency__select').selectmenu({
        appendTo: ".currency__drop-down",
        width: 191,
        change: function( event, ui ) {
            $currencySelect.text(ui.item.value)
        }
    });
    $('.currency__drop-down').addClass('currency__drop-down--hidden')
});