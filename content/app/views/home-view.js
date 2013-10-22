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
				Application.loginView.ISBN = result.text;
				Application.loginView.$el.trigger("bookInfoCheckin");

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

		$.ajax({
			data: {
				bibkeys: "ISBN:" + Application.homeView.ISBN,
				jscmd: "data",
				format: "json"
			},
			url: "http://openlibrary.org/api/books",
			type: "GET",
			success: function (data) {
				var dataString = JSON.stringify(data);
				var combinedString = dataString.substring(0,6) + dataString.substring(20);
				var data = JSON.parse(combinedString);
				alert(data);
				Application.checkOutView.bookInfo = data;
				console.log(Application.checkOutView.bookInfo);
				Application.router.navigate("#checkOut", {
					trigger: true
				});
			},
			error: function (jqXHR,textStatus,errorThrown) {
				alert("Error");
			}

		});

	},
	
	bookInfoCheckin: function () {

		$.ajax({
			data: {
				bibkeys: "ISBN:" + Application.loginView.ISBN,
				jscmd: "data",
				format: "json"
			},
			url: "http://openlibrary.org/api/books",
			type: "GET",
			success: function (data) {
				var dataString = JSON.stringify(data);
				var combinedString = dataString.substring(0,6) + dataString.substring(20);
				var data = JSON.parse(combinedString);
				alert(data);
				Application.checkInView.bookInfo = data;
				Application.router.navigate("#checkIn", {
					trigger: true
				});
			},
			error: function (jqXHR,textStatus,errorThrown) {
				alert("Error");
			}

		});

	}


});