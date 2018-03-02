$(document).ready(function(){
	$('#inicio').toggle().fadeIn();
	setTimeout(function () {
		$('#inicio').fadeOut();
	}, 1500);

	$("#sysmanas").on('click', function(){    
    	$('main').children().hide();
   		$('#AllSysmanas').show();
		$("#AllSysmanas").setBackground();
	});
});