window.onload = function() {
 	var image;
 	var img_name;
	var request_url = 'https://api.github.com/repos/ehab93/bone101-demo/contents/img.txt';
    var access_token;
    var gists = [];

 	$('#inputFileToLoad').change(function() {
		var filesSelected = document.getElementById("inputFileToLoad").files;
		if (filesSelected.length > 0) {
			var fileToLoad = filesSelected[0];
			var fileReader = new FileReader();
			fileReader.onload = function(fileLoadedEvent) {
				image = fileLoadedEvent.target.result;
				img_name = filesSelected[0].name;
			};
			fileReader.readAsDataURL(fileToLoad);
		}
	});

 	//if the user didn't login hide upload&refresh buttons
	if(!access_token) {
		$('.upload').hide();
		$('.refresh').hide();
	}

 	OAuth.initialize('5mlO7j_7djd5808nB18KWjkE_ok');
	$('.login').click(function() {
		OAuth.popup('github', function(err, rslt) {
		    $('.status').html('Please wait...');
		    access_token = rslt.access_token;
		    rslt.me().done(function(me) {    
		    	$('.status').html('');
    		    user = me.name;                
		        username = me.alias; 
		        email = me.email;
		        $('.login').hide();
		        $('.upload').show();
				$('.refresh').show();
		    })
		});
	});

	$('.upload').click(function() {
		if(img_name) {
			$('.status').html('Uploading...');
			file_name = 'encoded_' + img_name + '.txt';
			var gist_params = {
				description: 'upload '+ img_name + ' through bone101-demo',
				public: true

			}
			gist_params['files']= {};
			gist_params['files']['encoded_' + img_name + '.txt'] = {};
			gist_params['files']['encoded_' + img_name + '.txt']['content'] = image;
			var create_gist_request = {
				type: 'POST',
				url: 'https://api.github.com/gists',
				data: JSON.stringify(gist_params),
			}

			create_gist_request.headers = {
				"Authorization": 'token ' + access_token
			}

			create_gist_request.success = function(data) {
				$('.status').html('Done!');
				console.log('Uploaded!');
			};
			create_gist_request.error = function(err) {
				$('.status').html('something went wrog! please check the console log.');
				console.log(err);
			}

			$.ajax(create_gist_request);
		} else
			$('.status').html('please select a file.');
	});

	$('.refresh').click(function() {
		    $('.status').html('Loading...');
			$('.gists').empty();	

			$.ajax({
			type: 'GET',
			url: 'https://api.github.com/users/' + username +'/gists',
			success: function(data) {
				var i = 0
				gists = [];
				$.each(data, function(index, val) {
					if(Object.keys(val.files)[0].indexOf('encoded_') > -1)
						gists.push(val);
				});
				if(gists.length != 0) {
					$.each(gists, function(index, gist) {
						$.ajax({
							type: 'GET',
							url: 'https://api.github.com/gists/' + gist.id,
							success: function(response) {
								current_file_name = Object.keys(gist.files)[0];
								$('.gists').append('<img src="' + response.files[current_file_name].content+'">');
							},
							error: function(error) {
								console.log(error);
	    						$('.status').html('something went wrog! please check the console log.');
							}
						});
					});
			    $('.status').html('Done!');

				} else
					$('.status').html('No image found, Please upload something first.');

			},
			error: function(err) {
				console.log(err);
    			$('.status').html('something went wrog! please check the console log.');
			}
		});
	});
}