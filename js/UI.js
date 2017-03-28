$(document).ready(function(){
	$('.menu-main .trigger nav div ul li').click(function(e){
			if ($('ul', this).hasClass('show')==true){
				$('ul', this).removeClass('show');
				}else if ($('ul', this).hasClass('show')==false) {
					$('ul', this).addClass('show');
			};
			e.stopPropagation();
	});
	$(function() {
		//$( ".trigger" ).sortable().disabled;
		$( "#sortable" ).sortable();

	});
});