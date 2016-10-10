$(document).ready(function(){

	// init Masonry
	var $grid = $('.grid').masonry({
	  itemSelector: '.grid-item',
	  percentPosition: true,
	  columnWidth: '.grid-sizer'
	});
	// layout Isotope after each images loads
	$grid.imagesLoaded().progress( function() {
	  $grid.masonry();
	});  


	$(".nav").on('click','li',function(event){
		var index = $(this).index();
		$(".grid").addClass('hidden');
		$($(".grid")[index]).removeClass('hidden');
		
		$grid.imagesLoaded().progress( function() {
		  $grid.masonry();
		}); 

	});


});
