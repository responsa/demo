var opConfigurator = function () {
    $ = jQuery.noConflict();
    var prevPage = $(".configurator .prev"),
        listLink = $(".license-list a");

    listLink.on("click", function (e) {
        e.preventDefault();
        $(this).closest(".step").removeClass("current").next().addClass("current");
    });
    prevPage.on("click", function (e) {
        e.preventDefault();
        $(this).closest(".step").removeClass("current").prev().addClass("current");
    });

};