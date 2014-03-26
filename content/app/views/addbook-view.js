var View = require('./view');
var template = require('./templates/addBook');

module.exports = View.extend({
	id: 'addbook-view',
	template: template,
	events: {
		"dataLoaded":"append",
		'click #done':'addBook',
		'click #edit-quantity':'quantity',
		'click #add-book':'addBook',
		'click #addPhoto': 'addPhoto',
	},

	initialize: function() {

	},

	render: function() {
		var that = this;
		that.canSave = false;
		var data = Application.addBookView.bookData;
		var passData = data;
		console.log(JSON.stringify(passData));
		var dataString = JSON.stringify(data);
		var combinedString = dataString.substring(0,6) + dataString.substring(20);
		var data=JSON.parse(combinedString);
		that.totalAmount = 1;
		this.bookData = data;
		this.data = data;

		if (typeof this.bookData.ISBN.cover!='undefined') {

			$.ajax({
				data: {
					url: Application.addBookView.bookData.ISBN.cover.medium
				},
				url: "https://www.filepicker.io/api/store/S3?key=A8GpOnfHhQxiznYCtXZ9Uz",
				type: "POST",
				success: function (data) {
					that.imageUrl = data.url;
					that.data['image-url'] = that.imageUrl;
					that.canSave = true;
					that.$el.html(that.template(that.data));
				},
				error: function (jqXHR,textStatus,errorThrown) {
				}
			});
		} else {
			if(typeof Application.addBookView.bookData.ISBN.identifiers.isbn_13 != 'undefined') {
				that.imageUrl = "http://covers.openlibrary.org/b/isbn/"+Application.addBookView.bookData.ISBN.identifiers.isbn_13[0]+"-L.jpg";
				that.canSave = true;
				$.ajax({
					data: {
						url: that.imageUrl
					},
					url: "https://www.filepicker.io/api/store/S3?key=A8GpOnfHhQxiznYCtXZ9Uz",
					type: "POST",
					success: function (data) {
						that.imageUrl = data.url;
						that.data['image-url'] = that.imageUrl;
						that.canSave = true;
						that.$el.html(that.template(that.data));
					},
					error: function (jqXHR,textStatus,errorThrown) {
					}
				});
			}else {
				that.imageUrl = undefined;
				that.canSave = true;
				this.$el.html(this.template(that.data));
			}
		}

		// $("p#numberAvailable").html("Number Available: "+that.totalAmount+"");

		return this;
	},

	addBook: function() {
		var that = this;

		if (that.canSave == true) {
			var that = this;
			var currentUser = Parse.User.current();
			var currentUserId = currentUser.id;
			var NewBook=Parse.Object.extend("NewBook");
			var newBook=new NewBook();
			newBook.set("title", this.bookData.ISBN.title);
			if (typeof this.bookData.ISBN.authors!='undefined'){

				var lengthAuthors = this.bookData.ISBN.authors.length;
				var i = 0;
				var authorArray = new Array ();
				while (i < lengthAuthors) {
					authorArray.push(this.bookData.ISBN.authors[i].name);
					i++;
				}
				authorArray = authorArray.toString();
				newBook.set("author", authorArray);
			}
			if (typeof that.imageUrl != 'undefined'){
				newBook.set("cover_image", that.imageUrl);
			}
			console.log(this.bookData);
			newBook.set("quantity_total", that.totalAmount);
			newBook.set("quantity_out", 0);
			newBook.set("quantity_available", that.totalAmount);
			newBook.set("User", currentUserId);
			newBook.set("studentList",[{}]);
			newBook.set("ISBN", that.ISBN);
			if(that.totalAmount){
				newBook.save(null, {
					success: function(newBook) {
						Application.router.navigate("#bookList" , {trigger: true});
					},
					error: function(newBook, error) {
						alert('Back to the drawing board');
						console.log(error);
					}
				});
			}else {
				var quantityPrompt = {
					state1: { 
						title: "But how many?",
						html: "Please add quantity of books first.",
						buttons: { "Ok": true },
						submit: function(e,v,m,f){
							Application.router.navigate("#bookList" , {trigger: true});

						},
						cancel: function(){
						}
					}
				};
				$.prompt(quantityPrompt);
			};
		}
		else {
			navigator.notification.alert(
				'Please try again in one second, the photo is still uploading.',  // message
				function alertDismissed() {}, // callback
				'Try Again',            // title
				'OK'                  // buttonName
			);
		}
	},

	quantity: function() {
		var that = this;
		var data = Application.addBookView.bookData;
		var quantityPrompt = {
			state0: { 
				title: "Edit Quantity",
				buttons: { "Cancel": false, "Submit": true },
				html:'<select id="qty-input" name="amount"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>',
				submit: function(e,v,m,f){
					console.log(f.amount);
					that.totalAmount=f.amount;
					$("#numberAvailable").html("Number Available: "+that.totalAmount+"");
					that.totalAmount = parseInt(that.totalAmount);

				}
			}
		};
		$.prompt(quantityPrompt);
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
				that.imageUrl = that.thumbnail_url;
				$(".no-icon").hide();
				$("#addPhoto").hide();
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

	},

});
