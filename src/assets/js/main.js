$(document)
  .ready(function () {

    /**
     * Get size of sidebar and apply sidebar size to body paddingLeft.
     */
    function sidebarResize() {
        const SIDEBAR_WIDTH = $("#sidebar").width();
        $("body").css({"paddingLeft": 0});
        $("body").css({"paddingLeft": SIDEBAR_WIDTH});
    }

    // init
    sidebarResize();

    // event handler for sidebar resize event
    $(window).resize(function (e) {
        sidebarResize()
    });

    // // chat jquery custom scrollbar
    // $('#action_menu_btn').click(function(){
    //     $('.action_menu').toggle();
    // });

});