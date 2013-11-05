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
		var data = Application.addBookView.bookData;
		var passData = data;
		console.log(passData);
		var dataString = JSON.stringify(data);
		var combinedString = dataString.substring(0,6) + dataString.substring(20);
		var data=JSON.parse(combinedString);
		this.bookData = data;
		this.$el.html(this.template(data));

		return this;
	},

	addBook: function() {
		var that = this;
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var NewBook=Parse.Object.extend("NewBook");
		var newBook=new NewBook();
		newBook.set("title", this.bookData.ISBN.title);
		//newBook.set("User", currentUserId);
		console.log(currentUser);
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
			newBook.set("cover_image", this.bookData.ISBN.cover.medium);
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
		}else {alert("You need to add a quantity")};
	},

	quantity: function() {
		var that = this;
		var data = Application.addBookView.bookData;
		var quantityPrompt = {
			state0: { 
				title: "Edit Quantity",
				buttons: { "Cancel": false, "Submit": true },
				html:'<input type="number" name="amount" value="" style="font-size:18px;width:100%;text-align:center;">',
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
