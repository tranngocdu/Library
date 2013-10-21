var View = require('./view');
var template = require('./templates/addBook');

module.exports = View.extend({
	id: 'addbook-view',
	template: template,
	events: {
		"dataLoaded":"append",
		'click #done':'addBook',
		'click #quantity':'quantitySelector',
		'click #add-book':'addBook'
	},

	initialize: function() {

	},

	render: function() {
		var data = Application.addBookView.bookData;
		var dataString = JSON.stringify(data);
		var combinedString = dataString.substring(0,6) + dataString.substring(20);
		var data=JSON.parse(combinedString);
		this.bookData = data;
		this.$el.html(this.template(data));
		
		return this;
	},
	
	addBook: function() {
		var username = window.localStorage.getItem("username")
		var NewBook=Parse.Object.extend("NewBook");
		var newBook=new NewBook();
		var that = this;

		newBook.set("title", that.bookData.ISBN.title);
		newBook.set("userId", username);
		var lengthAuthors = that.bookData.ISBN.authors.length;
		var i = 0;
		var authorArray = new Array ();
		while (i < lengthAuthors) {
				authorArray.push(that.bookData.ISBN.authors[i].name);
				i++;
			}
			alert(authorArray);
			newBook.set("author", authorArray);
			newBook.set("cover_image", this.bookData.ISBN.cover.medium);
			newBook.set("quantity_total", "2");
			newBook.set("quantity_out", "0");
			newBook.save(null, {
				success: function(newBook) {
					alert('It worked!');
				},
				error: function(newBook, error) {
					alert('Back to the drawing board');
					console.log(error);
				}
			});
	}

});
