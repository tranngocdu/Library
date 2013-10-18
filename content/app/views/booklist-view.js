var View = require('./view');
var template = require('./templates/bookList');
var Library = require('../models/library');
var Book = require('../models/book');



module.exports = View.extend({
	id: 'booklist-view',
	template: template,
	events: {
		'click #filt-all':'allSelected',
		'click #filt-available':'available',
		'click #filt-checked':'checkedOut',
		'click #add':'addBook',
		"getbookinfo":"getBookInfo"
	},

	initialize: function() {

	},

	render: function() {
		this.bookList = new Library();
		var that = this;
		this.bookList.libraryJSON ={};
		this.$el.html(this.template(this.bookList.libraryJSON));
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("User", currentUserId);
		query.find({
			success: function(usersBooks) {
				console.log(usersBooks);
				var bookArray = JSON.stringify(usersBooks);
				var bookArray = JSON.parse(bookArray);
				that.bookArray = bookArray;				
				that.$el.html(that.template(bookArray));
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
	},

	available: function() {
		$('#filt-all').removeClass("selected");
		$('#filt-available').addClass("selected");
		$('#filt-checked').removeClass("selected");
	},

	checkedOut: function() {
		$('#filt-all').removeClass("selected");
		$('#filt-available').removeClass("selected");
		$('#filt-checked').addClass("selected");

	},

	addBook: function() {
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
				alert(Application.bookListView.ISBN);
				Application.addBookView.bookData = data;
				Application.router.navigate("#addBook", {
					trigger: true
				});

			},
			error: function (jqXHR,textStatus,errorThrown) {
				alert("Error");
			}

		});
	}

});


