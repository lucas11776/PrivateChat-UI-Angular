$(document)
  .ready(function () {


    // delele send message modal
    $(".msg_cotainer_send").dblclick(function (){
        console.info("Delete Text Modal");
        $("#modal-delete-text").modal("show");
    });

});