var View = require('./view');
var template = require('./templates/signup');

module.exports = View.extend({
	id: 'signup-view',
	template: template,
	events: {
		"dataLoaded":"append",
		'click #signup':'signUp',
	},

	initialize: function() {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	signUp: function () {
		Application.router.navigate("#signUp", {
			trigger: true
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
			navigator.notification.alert(
				'Please enter all fields',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
	},

});
