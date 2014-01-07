var View = require('./view');
var template = require('./templates/editBook');

module.exports = View.extend({
	id: 'editBook-view',
	template: template,
	events: {
		'click #addBook':'addBook',
		'click #addPhoto':'addPhoto',
		'focus #title': 'footer',
		'focus #author': 'footer',
		'focus #numberAvailable': 'footer',
		'blur #title': 'footer',
		'blur #author': 'footer',
		'blur #numberAvailable': 'footer',
	},

	initialize: function() {
	},

	render: function() {
		var that = this;
		that.bookData = Application.editBookView.bookInfo;
		this.$el.html(this.template(that.bookData));
		console.log($(that.bookData));
		setTimeout(function(){$('select option[value="'+parseInt(Application.editBookView.bookData[0].quantity_total)+'"]').attr("selected",true);},300);
		return this;		
	},

	footer: function() {

		setTimeout(function(){
			if (($("#title").is(":focus")) || ($("#author").is(":focus")) || ($("#numberAvailable").is(":focus"))){
				$("#footer").addClass("hidden");
				$("#footer").removeClass("visible");
				$("#wrapper").css("bottom", "0px");
			} else {
				$("#footer").removeClass("hidden");
				$("#footer").addClass("visible");
				$("#wrapper").css("bottom", "65px");
			}
			},200);
		},

		addBook:function () {
		var that = this;
		var query = new Parse.Query("NewBook");
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		query.equalTo("User", currentUserId);
		query.equalTo("ISBN", Application.editBookView.bookData[0].ISBN);
		console.log(Application.editBookView.bookData[0].ISBN)
		query.first({
			success: function(newBook) {
				var that = this;
				var title = "";
				if($("#title").val().length>0){
					title = $("#title").val();
				}else{
					title = $("#title").attr("placeholder");
				}
				var author = "";
				if($("#author").val().length>0){
					author = $("#author").val();}
				else{
					author = $("#author").attr("placeholder");
				}
				var isbn = "";
				if($("#isbn").val().length>0){
					isbn = $("#isbn").val();}
				else{
					isbn = $("#isbn").attr("placeholder");
				}
				var numberAvailable = $("#numberAvailable").val();
				
				if(isbn.length!=13){
					navigator.notification.alert(
					"Please make sure you're using the 13 digit ISBN ",  // message
					function alertDismissed() {}, // callback
					'Try Again',            // title
					'OK'                  // buttonName
				);
				}else{
				
				numberAvailable = parseInt(numberAvailable);
				var currentUser = Parse.User.current();
				var currentUserId = currentUser.id;
				var date = new Date();
				date = date.getTime();
				newBook.set("title", title);
				newBook.set("author", author);
				if ($(".custom-art").children('img').attr("src").length>0) {
					newBook.set("cover_image", $(".custom-art").children('img').attr("src"));
				}
				newBook.set("quantity_total", numberAvailable);
				newBook.set("User", currentUserId);
				newBook.set("studentList",[{}]);
				newBook.set("ISBN", isbn);
				newBook.save(null, {
					success: function(newBook) {
						Application.router.navigate("#bookList" , {trigger: true});
					},
					error: function(newBook, error) {
						alert('Back to the drawing board');
						console.log(error);
					}
				});
				}
			//end save book
			}
})
		},

		addPhoto: function() {
			var that = this;
			if (!window.plugins.filepicker) {
				alert("clicked");

				return;
			}

			var uploadSuccess = function(args) {
				if (args.result == 'didFinishPickingMediaWithInfo') {
					that.thumbnail_url = args.FPPickerControllerRemoteURL + '/convert?w=150';
					$(".no-icon").hide();
					$(".custom-art").show();
					$(".custom-art").html('<img src="'+that.thumbnail_url+'""></img>')

					//$('#picker').removeClass('background-image');
					//$('#picker').css('background-image', 'url(' + that.thumbnail_url + ')');
				}
			};

			var uploadError = function(args) {
				console.log('Error during Filepicker upload');
			};

			window.plugins.filepicker.pick(
				{
					dataTypes: ['image/*'],
					sourceNames: ['FPSourceCamera', 'FPSourceCameraRoll', 'FPSourceDropbox', 'FPSourceGoogleDrive', 'FPSourceGmail', 'FPSourceFacebook', 'FPSourceInstagram', 'FPSourceImagesearch']
				},
				uploadSuccess,
				uploadError
			);
		}

	});
