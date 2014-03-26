var View = require('./view');
var template = require('./templates/addBookManually');

module.exports = View.extend({
	id: 'addBookManually-view',
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

	render: function(data) {
		var that = this;
		this.data = {};
		this.data['book-isbn'] = Application.addBookManuallyView.ISBN;
		this.$el.html(this.template(this.data));
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
			var title = $("#title").val();
			var author = $("#author").val();
			var isbn = $("#isbn").val();
			var numberAvailable = $("#numberAvailable").val();
			
			if (title && author && numberAvailable) {
			
			numberAvailable = parseInt(numberAvailable);
			var currentUser = Parse.User.current();
			var currentUserId = currentUser.id;
			var date = new Date();
			date = date.getTime();

			var NewBook=Parse.Object.extend("NewBook");
			var newBook=new NewBook();
			newBook.set("title", title);
			newBook.set("author", author);
			if (that.thumbnail_url) {
				newBook.set("cover_image", that.thumbnail_url);
			}
			newBook.set("quantity_total", numberAvailable);
			newBook.set("quantity_out", 0);
			newBook.set("quantity_available", numberAvailable);
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
		else {
			navigator.notification.alert(
				'Please add a title, author, and quantity.',  // message
				function alertDismissed() {}, // callback
				'Try Again',            // title
				'OK'                  // buttonName
			);
		}

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
					$("#custom-art").show();
					$("#custom-art").html('<img src='+that.thumbnail_url+'></img>')

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
