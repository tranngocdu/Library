var View = require('./view');
var template = require('./templates/addBook');

module.exports = View.extend({
	id: 'addbook-view',
	template: template,
	events: {
		"dataLoaded":"append",
		'click #done':'addBook',
		'click #quantity':'quantitySelector',
		'click #scanner': 'scanner',

	},

	initialize: function() {

	},

	render: function() {
		this.$el.html(this.template());
		//this.username = window.localStorage.setItem("userId", userId);
		
	
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

	done: function() {
		var ISBN = $('#ISBN').val();
		var quantity = $('#studentName').val();
		var username = this.username;

		if( ISBN && studentName)
		{
			$.ajax({
				data: {
					"username":username,
					"ISBN":ISBN,
					"quantity":quantity,
				},
				url: Application.serverURL+"register",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				success: function (data) {
					navigator.notification.alert(
						'Book Added',  // message
						function alertDismissed() {}, // callback
						'Success',            // title
						'OK'                  // buttonName
					);
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
					{
						navigator.notification.alert(
							'Unable to add book at this time.',  // message
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
				'Please scan book and select quantity',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
	}

});
