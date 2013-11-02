var View = require('./view');
var template = require('./templates/home');

module.exports = View.extend({
	id: 'home-view',
	template: template,
	events: {
		'click #checkIn': 'checkIn',
		'click #checkOut': 'checkOut',
		'click #library': 'library',
		'getbookinfo':'bookinfo',
		'checkOutInfo':'checkOutBook',
		'click #scanner':'scanner',
		"dataLoaded":"append",
		'click #bookList':'bookList',
		'click #studentList':'studentList',
		'bookInfoCheckin':'bookInfoCheckin',
		'bookInfoCheckout':'bookInfoCheckout'

	},

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	checkOut: function ()  {
		var scanner = cordova.require("cordova/plugin/BarcodeScanner");

		scanner.scan(
			function (result) {
				Application.homeView.ISBN = result.text;
				Application.homeView.$el.trigger("bookInfoCheckout");

			}, 
			function (error) {
				alert("Scanning failed: " + error);
			}
		);
	},

	checkIn: function () {
		var scanner = cordova.require("cordova/plugin/BarcodeScanner");

		scanner.scan(
			function (result) {
				Application.homeView.ISBN = result.text;
				Application.homeView.$el.trigger("bookInfoCheckin");

			}, 
			function (error) {
				alert("Scanning failed: " + error);
			}
		);

	},

	bookList: function () {
		Application.router.navigate("#bookList", {trigger:true});
	},

	studentList: function () {
		Application.router.navigate("#studentList", {trigger:true});
	},

	bookInfoCheckout: function () {

		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("ISBN", Application.homeView.ISBN);
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

	bookInfoCheckin: function () {

			var currentUser = Parse.User.current();
			var currentUserId = currentUser.id;
			var query = new Parse.Query("NewBook");
			query.equalTo("ISBN", Application.homeView.ISBN);
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

	}


});