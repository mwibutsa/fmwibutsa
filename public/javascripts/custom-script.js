$(document).ready(function(){
	$('#footer').css('margin-top',$(document).height()-$("#wrapper").height()+$('#footer').height() -227);
});

function customReady(){
	alert('test my custom ready');
}