var View = require('./view');
var template = require('./templates/bookList');
var templateBooks = require('./templates/bookListBooks');
var Library = require('../models/library');
var Book = require('../models/book');



module.exports = View.extend({
	id: 'booklist-view',
	template: template,
	templateBooks:templateBooks,
	events: {
		'click #filt-all':'allSelected',
		'click #filt-available':'available',
		'click #filt-checked':'checkedOut',
		'click #add':'addBook',
		"getbookinfo":"getBookInfo",
		'click .bookItem':'bookDetail'
	},

	initialize: function() {

	},

	render: function() {
		var that = this;
		that.$el.html(that.template());
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("User", currentUserId);
		query.find({
			success: function(usersBooks) {
				var bookArray = JSON.stringify(usersBooks);
				var bookArray = JSON.parse(bookArray);
				that.bookArray = bookArray;	
				$('.booklist-wrap').html(that.templateBooks(bookArray));				
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		return this;
	},

	allSelected: function() {
		$('#filt-all').addClass("selected");
		$('#filt-available').removeClass("selected");
		$('#filt-checked').removeClass("selected");
		var that = this;
		this.$el.html(this.template());
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("User", currentUserId);
		query.find({
			success: function(usersBooks) {
				var bookArray = JSON.stringify(usersBooks);
				var bookArray = JSON.parse(bookArray);
				that.bookArray = bookArray;				
				$('#wrapper').html(that.templateBooks(bookArray));
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

	},

	available: function() {
		$('#filt-all').removeClass("selected");
		$('#filt-available').addClass("selected");
		$('#filt-checked').removeClass("selected");
		var that = this;
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("User", currentUserId);
		query.notEqualTo("quantity_available", 0);
		query.find({
			success: function(usersBooks) {

				var bookArray = JSON.stringify(usersBooks);
				var bookArray = JSON.parse(bookArray);
				that.bookArray = bookArray;				
				$('#wrapper').html(that.templateBooks(bookArray));
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

	},

	checkedOut: function() {
		$('#filt-all').removeClass("selected");
		$('#filt-available').removeClass("selected");
		$('#filt-checked').addClass("selected");

		var that = this;
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("User", currentUserId);
		query.notEqualTo("quantity_out", 0);
		query.find({
			success: function(usersBooks) {

				var bookArray = JSON.stringify(usersBooks);
				var bookArray = JSON.parse(bookArray);
				that.bookArray = bookArray;				
				$('#wrapper').html(that.templateBooks(bookArray));
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

	},

	addBook: function() {

		var quantityPrompt = {
			state0: { 
				title: "CheckOut",
				buttons: { "Scan": false, "List": true },
				submit: function(e,v,m,f){
					if (v == true) {
						Application.router.navigate("#bookList", {trigger:true});
					}
					else {
						var scanner = cordova.require("cordova/plugin/BarcodeScanner");

						scanner.scan(
							function (result) {
								Application.bookListView.ISBN = result.text;
								Application.bookListView.$el.trigger("getbookinfo");

							}, 
							function (error) {
								alert("Scanning failed: " + error);
							}
						);
					}

				},
				cancel: function(){
					alert("cancel");
				}
			}
		};
		$.prompt(quantityPrompt);
	},

	bookDetail: function(e) {
		Application.bookDetailView.bookId = $(e.currentTarget).data('id');
		Application.router.navigate("#bookDetail", {trigger:true});

	},

	getBookInfo: function() {
		$.ajax({
			data: {
				bibkeys: "ISBN:" + Application.bookListView.ISBN,
				jscmd: "data",
				format: "json"
			},
			url: "http://openlibrary.org/api/books",
			type: "GET",
			success: function (data) {
				//Catch if data is blank, ISBN is not found
				if(data == "") {
					Application.router.navigate("#addBookManually", {
						trigger: true
					});
				}
				else {
					Application.addBookView.bookData = data;
					Application.router.navigate("#addBook", {
						trigger: true
					});
				}
			},
			error: function (jqXHR,textStatus,errorThrown) {
				alert("Error");
			}

		});
	}

});


