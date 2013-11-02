var View = require('./view');
var template = require('./templates/bookDetail');
var Book = require('../models/book');

module.exports = View.extend({
	id: 'bookdetail-view',
	template: template,
	events: {
		"dataLoaded":"append",
		"click #checkout-book":"checkoutBook",
		"click #remove-book":"removeBook"
	},

	initialize: function() {

	},

	render: function() {
		var that=this;
		var query = new Parse.Query("NewBook");
		query.equalTo("objectId", Application.bookDetailView.bookId);
		query.find({

			success: function(bookdetail) {

				var bookdetailArray = JSON.stringify(bookdetail);
				bookdetailArray = JSON.parse(bookdetailArray);
				that.ISBN = bookdetailArray[0].ISBN;
				console.log(bookdetailArray);			
				that.$el.html(that.template(bookdetailArray));
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		return this;
	},

	checkoutBook: function() {
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("ISBN", Application.bookDetailView.ISBN);
		query.equalTo("User", currentUserId);
		query.find({

			success: function(bookdetail) {
				var bookdetailArray = JSON.stringify(bookdetail);
				bookdetailArray = JSON.parse(bookdetailArray);
				Application.checkOutView.bookInfo = bookdetailArray;
				Application.router.navigate("#checkOut", {
					trigger: true
				});
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	},

	removeBook: function() {
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("ISBN", Application.bookDetailView.ISBN);
		query.equalTo("User", currentUserId);
		query.find({

			success: function(bookdetail) {
			//then remove book
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}

});
