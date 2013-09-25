var View = require('./view');
var template = require('./templates/home');

module.exports = View.extend({
	id: 'home-view',
	template: template,
	events: {
		'click #checkIn': 'checkIn',
		'click #checkOut': 'checkOut',
		'click #library': 'library',
		'checkInInfo':'checkInBook',
		'checkOutInfo':'checkOutBook'

	},

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	checkIn: function () {
		var scanner = cordova.require("cordova/plugin/BarcodeScanner");

		scanner.scan(
			function (result) {
				Application.loginView.ISBN = result.text;
				Application.loginView.$el.trigger("checkInInfo");

			}, 
			function (error) {
				alert("Scanning failed: " + error);
			}
		);

	},

	checkInBook: function () {

		$.ajax({
			data: {
				bibkeys: "ISBN:" + Application.loginView.ISBN,
				jscmd: "data",
				format: "json"
			},
			url: "http://openlibrary.org/api/books",
			type: "GET",
			success: function (data) {
				alert("Success");
				var dataString = JSON.stringify(data);
				//dataString.replace(/d{13}/g, '');
				var combinedString = dataString.substring(0,6) + dataString.substring(20);
				var data=JSON.parse(combinedString);
				alert(data);
				Application.bookDetailView.bookInfo = data;
				Application.router.navigate("#checkIn", {
					trigger: true
				});
			},
			error: function (jqXHR,textStatus,errorThrown) {
				alert("Error");
			}

		});

	},

	checkOutBook: function () {

		$.ajax({
			data: {
				bibkeys: "ISBN:" + Application.loginView.ISBN,
				jscmd: "data",
				format: "json"
			},
			url: "http://openlibrary.org/api/books",
			type: "GET",
			success: function (data) {
				alert("Success");
				var dataString = JSON.stringify(data);
				//dataString.replace(/d{13}/g, '');
				var combinedString = dataString.substring(0,6) + dataString.substring(20);
				var data=JSON.parse(combinedString);
				alert(data);
				Application.bookDetailView.bookInfo = data;
				Application.router.navigate("#checkOut", {
					trigger: true
				});
			},
			error: function (jqXHR,textStatus,errorThrown) {
				alert("Error");
			}

		});

	},


	checkOut: function () {
		var scanner = cordova.require("cordova/plugin/BarcodeScanner");

		scanner.scan(
			function (result) {
				Application.loginView.ISBN = result.text;
				Application.loginView.$el.trigger("checkOutInfo");

			}, 
			function (error) {
				alert("Scanning failed: " + error);
			}
		);

	},

	library: function() {
		Application.router.navigate("#library", {
			trigger: true
		});
	}


});