jQuery(function($){
    $("a.nolink").on('click', function(e) {
        e.preventDefault();
    });

    $(".menu_about .below .below").removeClass('col-md-3');
    $(".menu_about .below .below").removeClass('col-xs-12');

    //modal_title = $(".alert h4").text();
    //$(".alert").dialog({
    //    height: 400,
    //    width: 800,
    //    modal: true,
    //    title: modal_title
    //});

    $("#restoreUserData").click(function() {
        //siae.app.spin(true);
        $('body').addClass("modal-open-iframe");
    });

    $('#recoverUserData').on('hidden.bs.modal', function(e) {
        $('body').removeClass("modal-open-iframe");
        $('body').css("padding-right","0");
    });

    $("#btn-to-reg").click(function() {
        $('body').addClass("modal-open-iframe");
    });

    $('#myRegistration').on('hidden.bs.modal', function(e) {
        $('body').removeClass("modal-open-iframe");
        $('body').css("padding-right","0");
    });

    $( ".il-mio-account" ).click(function( event ) {
      //  $(".pageLoader").show();
    });

    $( ".logout" ).click(function( event ) {
        $(".pageLoader").show();
    });
    $('#menu-services-logged').click(function () {
        if($(".menu_about").hasClass("opened")){
            $(".menu_about").click();
        }
    });

    // refresh del token se
    refreshToken();
    prepareNosolAccount();
});

function refreshToken(){
    var myPath = siaePath+"/services/users/refresh_session.json";
    jQuery.ajax({
        type: "GET",
        url: myPath,
        async: true
    });
}


function prepareNosolAccount(){
  jQuery('#nosol_modify_account').attr('href','#');
  jQuery('#nosol_modify_account').click(function( e ) {
    e.preventDefault();
    jQuery('#dvModalNosolAccount_frame').attr("src","/it/siae-auth-account");
    jQuery('#dvModalNosolAccount').modal({backdrop: 'static', keyboard: false}); 
    var thisHeight = jQuery(window).height();
    thisHeight = thisHeight/100*80;
    jQuery('#dvModalNosolAccount .modal-body').height(thisHeight);
    
    /*fix per serviz-online*/
    jQuery('header.fullMenu').css('z-index','').css('position','static'); 
  }); 
  jQuery('#dvModalNosolAccount .button-modal').click(function( e ) {
      run_waitMe('body');
    location.reload(); 
  });
}
 