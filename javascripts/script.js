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
	var request_url = 'https://api.github.com/repos/ehab93/bone101-demo/contents/img.txt';

 	$('#inputFileToLoad').change(function() {
		var filesSelected = document.getElementById("inputFileToLoad").files;
		if (filesSelected.length > 0) {
			var fileToLoad = filesSelected[0];
			var fileReader = new FileReader();
			fileReader.onload = function(fileLoadedEvent) {
				image = fileLoadedEvent.target.result;
				console.log(image);
			};
			fileReader.readAsDataURL(fileToLoad);
		}
	});

 	OAuth.initialize('5mlO7j_7djd5808nB18KWjkE_ok');
	$('.upload').click(function() {
		OAuth.popup('github', function(err, rslt) {
		    var access_token = rslt.access_token;
		    rslt.me().done(function(me) {
		        user = me.name;                
		        username = me.alias; 
		        email = me.email;
		        $.ajax({
		        	type: 'GET',
		        	url: request_url,
		        	success: function(data) {
		        		console.log("SHA: " + data.sha);
		        	}
		        });
		    })
		});
	});
}