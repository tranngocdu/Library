var View = require('./view');
var template = require('./templates/enterPassword');

module.exports = View.extend({
	id: 'enterPassword-view',
	template: template,
	events: {
		'click #submitPassword':'submit',
	},

	initialize: function() {
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},
	
	submit:function () {
		var password = $('#password').val();
		var teacherId = //get from local storage;

		if( password && teacherId)
		{
			$.ajax({
				data: {
					"password":password,
					"teacherId":teacherId,
				},
				url: Application.serverURL+"register",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				success: function (data) {
					Application.router.navigate("#settings", {
						trigger: true
					});
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
					{
						navigator.notification.alert(
							'Incorrect Password.',  // message
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
				'Please enter password',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
	}

});
