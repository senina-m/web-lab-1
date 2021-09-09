$(document).ready(function() {
    $('#x :button').click(function () {
        $("input[type='button']").removeClass("active");
        $(this).addClass("active");
        console.log("HEEEEEEEEEEEEEEY")
    });
})
