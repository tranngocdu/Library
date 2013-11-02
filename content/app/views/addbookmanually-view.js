var View = require('./view');
var template = require('./templates/addBookManually');

module.exports = View.extend({
	id: 'addBookManually-view',
	template: template,
	events: {
		'click #addBook':'addBook',
	},

	initialize: function() {
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	addBook:function () {
		
		var title = $("#title").val();
		var author = $("#author").val();
		var numberAvailable = $("#numberAvailable").val();
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var date = new Date();
		date = date.getTime();

		var NewBook=Parse.Object.extend("NewBook");
		var newBook=new NewBook();
		newBook.set("title", title);
		newBook.set("author", author);
		//newBook.set("cover_image", "http://google.com");
		newBook.set("quantity_total", numberAvailable);
		newBook.set("quantity_out", 0);
		newBook.set("quantity_available", numberAvailable);
		newBook.set("User", currentUserId);
		newBook.set("studentList",[{}]);
		newBook.set("ISBN", currentUserId+date);
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

});
