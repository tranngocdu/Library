var View = require('./view');
var template = require('./templates/addBook');

module.exports = View.extend({
	id: 'addbook-view',
	template: template,
	events: {
		"dataLoaded":"append",
		'click #done':'addBook',
		'click #edit-quantity':'quantity',
		'click #add-book':'addBook'
	},

	initialize: function() {

	},

	render: function() {
		var that = this;
		var data = Application.addBookView.bookData;
		var passData = data;
		console.log(passData);
		var dataString = JSON.stringify(data);
		var combinedString = dataString.substring(0,6) + dataString.substring(20);
		var data=JSON.parse(combinedString);
		that.totalAmount = 1;
		this.bookData = data;

		if (Application.addBookView.bookData.ISBN.cover.medium) {

			$.ajax({
				data: {
					url: Application.addBookView.bookData.ISBN.cover.medium
				},
				url: "https://www.filepicker.io/api/store/S3?key=A8GpOnfHhQxiznYCtXZ9Uz",
				type: "POST",
				success: function (data) {
					that.imageUrl = data.url;
				},
				error: function (jqXHR,textStatus,errorThrown) {
				}
			});
		}

		this.$el.html(this.template(data));

		// $("p#numberAvailable").html("Number Available: "+that.totalAmount+"");

		return this;
	},

	addBook: function() {
		var that = this;
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var NewBook=Parse.Object.extend("NewBook");
		var newBook=new NewBook();
		newBook.set("title", this.bookData.ISBN.title);
		var lengthAuthors = this.bookData.ISBN.authors.length;
		var i = 0;
		var authorArray = new Array ();
		while (i < lengthAuthors) {
			authorArray.push(this.bookData.ISBN.authors[i].name);
			i++;
		}
		authorArray = authorArray.toString();
		newBook.set("author", authorArray);
		if (typeof this.bookData.ISBN.cover!='undefined'){
			newBook.set("cover_image", that.imageUrl);
		};
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
					html: "You need to add quantity of books first.",
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
	},

	quantity: function() {
		var that = this;
		var data = Application.addBookView.bookData;
		var quantityPrompt = {
			state0: { 
				title: "Edit Quantity",
				buttons: { "Submit": true, "Cancel": false },
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

});
