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
		        	url: request_url + '?ref=gh-pages',
		        	success: function(data) {
		        		console.log('uploading...');
		        		$('.status').html('uploading...');
		        		params = {
							message: "Update the image through github API",
							committer: {
								name: me.name,
								email: me.email
							},
							content: btoa(image),
							branch: 'gh-pages',
							sha: data.sha
						};

						upload_file_request = {
							url: request_url,
							type: "PUT",
							data: JSON.stringify(params)
						}
						upload_file_request.headers = {
							"Authorization": 'token ' + access_token
						}
						upload_file_request.success = function(data) {
		        			$('.status').html('The img is now uploaded.');
							console.log('Uploaded!');
						};
						upload_file_request.error = function(err) {
		        			$('.status').html('something went wrog! please check the console log.');
							console.log(err);
						}
						$.ajax(upload_file_request);
		        	}
		        });
		    })
		});
	});

	$('.refresh').click(function() {
		    $('.status').html('Loading...');
			$.ajax({
			type: 'GET',
			url: request_url + '?ref=gh-pages',
			success: function(data) {
				$('.img-tag').attr('src', atob(data.content));	
		    	$('.status').html('Done!');
			},
			error: function(err) {
				console.log(err);
    			$('.status').html('something went wrog! please check the console log.');
			}
		});
		
	});
}