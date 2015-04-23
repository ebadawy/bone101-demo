window.onload = function() {
	$('.single-item').slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		arrows: false
	});
 OAuth.initialize('5mlO7j_7djd5808nB18KWjkE_ok');

	$('.login').click(function() {
		OAuth.popup('github')
	    .done(function(result) {
	     	console.log(result.access_token);
	    })
	    .fail(function (err) {
	    	console.log(err);
		});
	});	
}