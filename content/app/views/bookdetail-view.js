var View = require('./view');
var template = require('./templates/bookDetail');
var Book = require('../models/book');

module.exports = View.extend({
	id: 'bookdetail-view',
	template: template,
	events: {
		"dataLoaded":"append",
		"click #checkout-book":"checkoutBook",
		"click #checkin-book":"checkinBook",
		"click #remove-book-prompt":"removebookPrompt",
		"click #edit-book":"editQuantity",
		"removeBook":"removeBook"
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
	
	checkinBook: function() {
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("ISBN", Application.bookDetailView.ISBN);
		query.equalTo("User", currentUserId);
		query.find({

			success: function(bookdetail) {
				var bookdetailArray = JSON.stringify(bookdetail);
				bookdetailArray = JSON.parse(bookdetailArray);
				Application.checkInView.bookInfo = bookdetailArray;
				Application.router.navigate("#checkIn", {
					trigger: true
				});
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	},

	removebookPrompt: function(e){
		var bookTitle = $(e.currentTarget).data('title');
		var that = this;
		that.book_id = $(e.currentTarget).data('id');
			var removePrompt = {
				state0: { 
					title: "Confirmation",
					buttons: { "No": false, "Yes": true },
					html:'</br>Are you sure you wish to remove "'+bookTitle+'" from your collection?',
					submit: function(e,v,m,f){
						if(v){
							Application.bookDetailView.$el.trigger("removeBook");
						}
					}
				}
			};
		$.prompt(removePrompt);
	},

	removeBook: function(e) {
		var that = this;
		var book_id = that.book_id;
		var book = Parse.Object.extend("NewBook");
		var query = new Parse.Query(book);
		query.get(book_id, {
		  success: function(myObj) {
		    // The object was retrieved successfully.
		    myObj.destroy({});
			$(book_id).remove();
			Application.router.navigate("#bookList", {
					trigger: true
				});
		  },
		  error: function(object, error) {
		    alert("This was not retreived correctly.");
		  }
		});
		
	},

	editQuantity: function() {

		var data = Application.addBookView.bookData;
		var quantityPrompt = {
			state0: { 
				title: "Edit Quantity",
				buttons: { "Cancel": false, "Submit": true },
				html:'<input type="number" name="amount" value="" style="font-size:18px;width:100%;text-align:center;">',
				submit: function(e,v,m,f){
					console.log(f.amount);
					var totalAmount=f.amount;
					
					//Update UI
					$("#totalBooks").html("<p>"+totalAmount+" Total Books</p>");
					
					//Update Server
					totalAmount = parseInt(totalAmount);
					var currentUser = Parse.User.current();
					var currentUserId = currentUser.id;
					var query = new Parse.Query("NewBook");
					query.equalTo("ISBN", Application.bookDetailView.ISBN);
					query.equalTo("User", currentUserId);

					query.first({
						success: function(usersBooks) {
							console.log(usersBooks);
							var quantityAvailable = usersBooks.attributes.quantity_available;
							quantityAvailable = quantityAvailable + 1;
							
							usersBooks.set("quantity_available",quantityAvailable);
							usersBooks.set("quantity_total",totalAmount);

							usersBooks.save(null, {
								success: function(newBook) {
								},
								error: function(error) {
									alert("Error save: " + error.code + " " + error.message);
								}
							});
						},
						error: function(error) {
							alert("Error first: " + error.code + " " + error.message);
						},
					});


				}
			}
		};
		$.prompt(quantityPrompt);
	}

});
