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
		var current = Parse.User.current();
		if(current===null){
			$("#footer").addClass("hidden");
		}else if(current!=null){
			$("#footer").removeClass("hidden");
			$("#footer").addClass("visible");
		};
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
					navigator.notification.alert(
						'Check your username or password.',  // message
						function alertDismissed() {}, // callback
						'Incorrect Login',            // title
						'OK'                  // buttonName
			);
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
			navigator.notification.alert(
				'First enter above the you used for Class Library.',   // message
				function alertDismissed() {}, // callback
				'Enter your email',            // title
				'OK'                  // buttonName
				);
			  }
			});
		} else {
			navigator.notification.alert(
				'Enter Email.',  // message
				function alertDismissed() {}, // callback
				'Enter the email used for Class Library and tap "Forgot your password?".',            // title
				'OK'                  // buttonName
				);
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
