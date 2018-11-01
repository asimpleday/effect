$(function(){
        $("ul li").mousemove(function( ev ){
                var curOffsetLeft = $(this).offset().left;
                var curOffsetTop = $(this).offset().top;
                $(this).find("p").show();
                var index = $(this).index();
                if ( index <= 3 ) {
                        $(this).find("p")
                        .css( { "left" : ev.pageX - curOffsetLeft + 50 + "px", "top" : ev.pageY - curOffsetTop - 30 + "px" } );
                }else {
                        $(this).find("p")
                        .css( { "left" : ev.pageX - curOffsetLeft - 5 * 107 + 50 + "px", "top" : ev.pageY - curOffsetTop - 30 + "px" } );
                }
        }).mouseout(function(){
                $(this).find( "p" ).hide();
        });
});
