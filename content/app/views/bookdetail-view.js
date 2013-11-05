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
		"click #remove-book":"removeBook",
		"click #edit-book":"editQuantity"
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
				that.$el.html(that.template(bookdetailArray));
				if (bookdetailArray[0].studentList.length == 1) {
					$("#checkout-list").hide();
				}		
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
	},

	editQuantity: function() {

		var data = Application.addBookView.bookData;
		var quantityPrompt = {
			state0: { 
				title: "Edit Quantity",
				buttons: { "Submit": true, "Cancel": false },
				html:'<select id="qty-input" name="amount"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>',
				submit: function(e,v,m,f){
					console.log(f.amount);
					var totalAmount=f.amount;
					
					//Update UI
					$("#totalBooks").html("<span>"+totalAmount+" Total</span>");
					
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
