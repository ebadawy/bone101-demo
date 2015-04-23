window.onload = function() {
	$('.single-item').slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		arrows: false
	});
 OAuth.initialize('qo-7OvDrW7SRNV0p6F1yoXfq33Q');

	$('.login').click(function() {
		OAuth.popup('github')
	    .done(function(result) {
	     	console.log(result);
	     	console.log(result.access_token);
	    })
	    .fail(function (err) {
	    	console.log(err);
		});	
	});	

}