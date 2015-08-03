// global variables




// once the document loads...
$(document).ready(function() {

    buildHeader();
    buildMain();

}); // end $(document).ready()






// _____ helper functions _______


function buildHeader() {
    var $container = $('#container');

    var $header = $('<div class=\"header navbar\">');
    $header.prependTo($container);
}

function buildMain() {
	    var $container = $('#container');

    var $mainContent = $('<div class=\"main\">');
    $mainContent.text("I am an earthquake!")
    $mainContent.appendTo($container);
}
