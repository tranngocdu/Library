var View = require('./view');
var template = require('./templates/login');


module.exports = View.extend({
	id: 'login-view',
	template: template,
	events: {
		'click #login':'signIn',
		'click #login-have-account':'signUp',
		'click #forgot':'forgotPassword'
	},

	initialize: function() {

	},

	render: function () {
		this.$el.html(this.template());
		return this;

	},

	signUp: function () {
		Application.router.navigate("#signup", {
			trigger: true
		});

	},

	signIn: function () {
		//do some signin magic
		var username = $('#login-email').val();
		var password =  $('#login-pass').val();


		if( username && password)
		{
			Parse.User.logIn(username,password, {
					success: function(user) {
						window.localStorage.setItem("username",username);
						Application.router.navigate("#home", {
								trigger: true
						});
					},
					error: function(user, error) {
							alert("Login Failed");
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

	forgotPassword: function() {
		if($("#login-email").text){
			Parse.User.requestPasswordReset($("#login-email").val(), {
			  success: function() {
			  	alert("A link was sent to "+$("#login-email").val()+" to reset your password.")
			  },
			  error: function(error) {
			    // Show the error message somewhere
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
		} else {
			alert("Please enter an email address and then tap 'Forgot your password'");
		}	
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

});
