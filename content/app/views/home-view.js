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
		'click #list':'list'


	},

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	scanner: function ()  {
	var scanner = cordova.require("cordova/plugin/BarcodeScanner");

   scanner.scan(
      function (result) {
      	Application.homeView.ISBN = result.text;
      	Application.homeView.$el.trigger("getbookinfo");

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
				Application.loginView.$el.trigger("checkInInfo");

			}, 
			function (error) {
				alert("Scanning failed: " + error);
			}
		);

	},




	bookinfo: function () {

		$.ajax({
			data: {
				bibkeys: "ISBN:" + Application.homeView.ISBN,
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

	

				var NewBook=Parse.Object.extend("NewBook");
				var newBook=new NewBook();
				
				newBook.set("title", data.ISBN.title);

				//newBook.set("author", data.ISBN.authors[i]);
				newBook.set("cover_image", data.ISBN.cover.medium);
				newBook.set("quantity_total", "2");
				newBook.set("quantity_out", "0");
				newBook.save(null, {
						success: function(newBook) {
							alert('It worked!');
						},
						error: function(newBook, error) {
							alert('Back to the drawing board');
						}
				});
				Application.bookDetailView.bookInfo = data;
				//Application.router.navigate("#checkIn", {
				//	trigger: true
				//});

			},
			error: function (jqXHR,textStatus,errorThrown) {
				alert("Error");
			}

		});

	},

	list: function () {
		Application.router.navigate("#bookList", {trigger:true});
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