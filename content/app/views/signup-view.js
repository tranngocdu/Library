var View = require('./view');
var template = require('./templates/signup');

module.exports = View.extend({
	id: 'signup-view',
	template: template,
	events: {
		'click #create-account':'signUp',
		'click #have-account':'haveAccount'
	},

	initialize: function() {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	signUp: function () {
		var user = new Parse.User();
		var username = $('#sign-email').val();
		var password =  $('#sign-pass').val();
		user.set("username", username);
		user.set("password", password);
		user.set("email", username);

		user.signUp(null, {
			success: function(user) {
				//alert("Welcome to Class Library!");
		var quantityPrompt = {
			state0: { 
				title: "Success!",
				buttons: { "Continue": true, },
				position: { container: '', width: 270},
				submit: function(e,v,m,f){
					if (v == true) {
						Application.router.navigate("#home", {trigger: true});					
					}
				}	
					

			},
		};
		$.prompt(quantityPrompt);
				
			},
			error: function(user, error) {
				// Show the error message somewhere and let the user try again.
				// alert("Error: " + error.code + " " + error.message);
					navigator.notification.alert(
						'Please fill out all fields.',  // message
						function alertDismissed() {}, // callback
						'All Fields Required',            // title
						'OK'                  // buttonName
					);
				}	
		});


	},

	haveAccount: function() {
		Application.router.navigate("#login", {
			trigger:true
		});
	},

	signIn: function () {
		//do some signin magic
		var username = $('#email').val();
		var password =  $('#password').val();
		var name = $('#name').val();

		if( username && password && name)
		{
			$.ajax({
				data: {
					"username":username,
					"password":password,
					"name":name					
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
			navigator.notification.alert (
				'Please fill out all fields.',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
	},

});
