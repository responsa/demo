(function($){
    $(document).ready(function() {
        var searchInput = $('#edit-search-keys');
        var searchForm = $('#google-appliance-block-form');
        var formResults = $('#google-appliance-search-form');

        searchInput.on('keyup', function (event ) {
            if(event.keyCode === 13) {
                if(searchForm.length > 0){
                    searchForm.submit();
                }
                if(formResults.length > 0){
                    formResults.submit();
                }
            }
        });
        $(document).on('ajaxStart', function () {
            searchInput.css('cursor', 'wait');
        }).on('ajaxComplete', function () {
            searchInput.css('cursor', 'auto');
        });
        if(searchForm.length > 0){
            searchForm.on('click', 'div.dropdown li', function () {
                searchForm.submit();
            });
        }
        if(formResults.length > 0 || searchForm.length > 0) {
            /**
             * Fills the suggestion popup with any matches received.
             */
            Drupal.jsAC.prototype.found = function (matches) {
                // If no value in the textfield, do not show the popup.
                if (!this.input.value.length) {
                    return false;
                } else {
                    var ParentFormToSubmit = $(this.input).closest('form');
                }

                // Prepare matches.
                var ul = $('<ul></ul>');
                var ac = this;
                for (key in matches) {
                    $('<li style="cursor: pointer;"></li>')
                        .html($('<div></div>').html(matches[key]))
                        .mousedown(function () { ac.hidePopup(this); })
                        .mouseover(function () { ac.highlight(this); })
                        .mouseout(function () { ac.unhighlight(this); })
                        .click(function () {
                            ParentFormToSubmit.submit();
                        })
                        .data('autocompleteValue', key)
                        .appendTo(ul);
                }

                // Show popup with matches, if any.
                if (this.popup) {
                    if (ul.children().length) {
                        $(this.popup).empty().append(ul).show();
                        $(this.ariaLive).html(Drupal.t('Autocomplete popup'));
                    }
                    else {
                        $(this.popup).css({ visibility: 'hidden' });
                        this.hidePopup();
                    }
                }
            };
        }

    });
}) (jQuery);


