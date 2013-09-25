var View = require('./view');
var template = require('./templates/login');




module.exports = View.extend({
	id: 'login-view',
	template: template,
	events: {
		'click #signup':'signUp',
		'click #signin':'signIn'
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
