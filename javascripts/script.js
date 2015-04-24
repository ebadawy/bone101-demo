window.onload = function() {
	$('.single-item').slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		arrows: false
	});
 	
 	var image;
 	$('#inputFileToLoad').change(function() {
		var filesSelected = document.getElementById("inputFileToLoad").files;
		if (filesSelected.length > 0) {
			var fileToLoad = filesSelected[0];
			var fileReader = new FileReader();
			fileReader.onload = function(fileLoadedEvent) {
				image = fileLoadedEvent.target.result;
				console.log(image);
			};
		}
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