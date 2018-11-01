$(function(){
	$( ".role li[class^=p]" ).mouseover(function(){	
		var index = $(this).index();
		$( ".role li:last" ).attr( "class", "" );
		$( ".role li:last" ).addClass( "cur" + " " + "p" + (index+1) + "_" + (index+1) );
		$( ".role .cotpart" ).eq( index ).show().siblings( ".cotpart" ).hide();
		$( ".role li[class^=p]:gt(" + index + ")" ).each( function( i ){
			$(this).css( { "left" : 559 + (index+i) * 63 + "px" } );
		} );
		$( ".role li[class^=p]:lt(" + index + ")" ).each( function( i ){
			$(this).css( { "left" :  i * 63 + "px" } );
		} );
	});
});