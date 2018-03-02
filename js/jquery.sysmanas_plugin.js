(function($){
	$.fn.extend({ 
	    setBackground: function() {        	
	        $(this).each(function() {        	    	           
	            $(this).css({
				    'background' : 'url("img/cartelSysmana2015.jpg") no-repeat',
				    'background-size' : '100% 100%',
				});         
	        });  
	    }  
	});
})(jQuery);