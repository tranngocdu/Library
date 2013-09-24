var View = require('./view');
var template = require('./templates/login');




module.exports = View.extend({
	id: 'login-view',
	template: template,
	events: {
		"dataLoaded":"append",
		'click #signup':'signUp',
		'click #signin':'signIn',
		'click #scanner':'scanner', 
		'getbookinfo':'bookinfo'

	},

	initialize: function() {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	scanner: function ()  {
	var scanner = cordova.require("cordova/plugin/BarcodeScanner");

   scanner.scan(
      function (result) {
      	Application.loginView.ISBN = result.text;
      	Application.loginView.$el.trigger("getbookinfo");

      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
 },

 	bookinfo: function () {

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
 						Application.router.navigate("#bookDetail", {
 								trigger: true 
 						});		
 				},
				error: function (jqXHR,textStatus,errorThrown) {
 						alert("Error");
 				}

 		});

 	},

	signUp: function () {
		Application.router.navigate("#signUp", {
			trigger: true
		});

	},

	signIn: function () {
		//do some signin magic
		var username = $('#username').val();
		var password =  $('#password').val();

		if( username && password)
		{
			$.ajax({
				data: {
					"username":username,
					"password":password,
				},
				url: Application.serverURL+"register",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				success: function (data) {
					window.localStorage.setItem("userId", userId);
					Application.router.navigate("#home", {
						trigger: true
					});

				},
				error: function (jqXHR, textStatus, errorThrown) {
					{
						navigator.notification.alert(
							'Please try again.',  // message
							function alertDismissed() {}, // callback
							'Error',            // title
							'OK'                  // buttonName
						);
					}
				}
			});
		}
		else{
			navigator.notification.alert(
				'Please enter username and password',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
	},

});
