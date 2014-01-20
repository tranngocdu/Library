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
		query.limit(1000);
		query.equalTo("User", currentUserId);
		query.ascending("title");
		query.find({
			success: function(usersBooks) {
				var bookArray = JSON.stringify(usersBooks);
				var bookArray = JSON.parse(bookArray);
				that.bookArray = bookArray;	
				console.log(JSON.stringify(bookArray));
				$('.booklist-wrap').html(that.templateBooks(bookArray));				
				$("img.lazy").lazyload({
					container: $("#wrapper")
				});
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
		query.ascending("title");
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
		query.ascending("title");
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
		query.ascending("title");
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

		navigator.notification.confirm(
			'', // message
			onConfirm,            // callback to invoke with index of button pressed
			'Add Book',           // title
			'Scan,Manual, Cancel'         // buttonLabels
		);

		function onConfirm(buttonIndex) {
			if (buttonIndex == 1) {
				var scanner = cordova.require("cordova/plugin/BarcodeScanner");

				scanner.scan(
					function (result) {
						if(result.text){
							Application.bookListView.ISBN = result.text;
							Application.addBookView.ISBN = result.text;
							Application.bookListView.$el.trigger("getbookinfo");
						}
					}, 
					function (error) {
						alert("Scanning failed: " + error);
					}
				);
			}
			else if (buttonIndex ==2) {
				Application.router.navigate("#addBookManually", {trigger:true});

			}
		}		        

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
				
				Application.bookListView.damnyou = data;
				var dataString = JSON.stringify(data);
				var combinedString = dataString.substring(0,6) + dataString.substring(20);
				var dataHere=JSON.parse(combinedString);

				if(typeof dataHere.ISBN === typeof undefined) {
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


