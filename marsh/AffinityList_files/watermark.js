(function ($) {
    $.fn.WaterMark = function (options) {
        var defaults = {
            WaterMarkTextColor: '#afafaf',
            DateValidator: '__/__/____',
            CFValidator: '________________',
            CAPValidar: '_____'
        };
        var options = $.extend(defaults, options);
        return this.each(function () {
            var textBox = $(this);
            if (textBox.length == 0)
                return;
            var watermarkText = textBox.attr("title");
            textBox.removeAttr("title");
            var dummy;
            if (textBox.attr("type") != "password") {
                dummy = textBox.clone(true);
                dummy.removeAttr("Id").removeAttr("name")
            }
            else {
                dummy = $("<input type = 'text' />");
                dummy[0].className = textBox[0].className;
                dummy[0].style.cssText = textBox[0].style.cssText
            }

            dummy.attr("readonly", "readonly");
            dummy.css({ color: options.WaterMarkTextColor });
            dummy.val(watermarkText);
            textBox.after(dummy);

            if (textBox[0].offsetWidth != dummy[0].offsetWidth) {
                dummy.css({ 'font-family': "'ABeeZee', sans-serif" });
                textBox.css({ 'font-family': "'ABeeZee', sans-serif" })
            }

            //se la textbox è popolata --> mostro la textbox reale e non la dummy
            if (jQuery.trim(textBox[0].value) != "") {
                dummy.hide();
                textBox.show();
            }
            else
                textBox.hide();

            dummy.focus(function () {
                dummy.hide();
                textBox.show();
                textBox.focus();
            });


            textBox.bind("blur", function () {
                var textBoxVal = jQuery.trim($(this)[0].value);
                //quando lascio la textbox --> se è popolata visualizzo lei altrimenti la dummy
                //le textbox con i validatori non hanno il value a "" ; 
                //devo controllare anche i loro valori  per capire se sono popolati o meno
                //ad esempio la textbox della data NON popolata ha cmq il value : "__/__/____"
                if (textBoxVal == "" || textBoxVal == options.DateValidator
                    || textBoxVal == options.CFValidator
                    || textBoxVal == options.CAPValidator)
                {
                    textBox.hide();
                    dummy.show();
                }
            });
        });
    }
})(jQuery);