var View = require('./view');
var template = require('./templates/checkOut');

module.exports = View.extend({
	id: 'checkout-view',
	template: template,
	events: {
		'click #checkOutButton':'checkOut',
	},

	initialize: function() {
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},
	
	checkOut:function () {
		var ISBN = $('#ISBN').val();
		var studentName = $('#studentName').val();

		if( ISBN && studentName)
		{
			$.ajax({
				data: {
					"studentName":studentName,
					"ISBN":ISBN,
				},
				url: Application.serverURL+"register",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				success: function (data) {
					navigator.notification.alert(
						'Enjoy Your Book!',  // message
						function alertDismissed() {}, // callback
						'Success',            // title
						'OK'                  // buttonName
					);
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
					{
						navigator.notification.alert(
							'Unable to checkout book at this time.',  // message
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
				'Please scan book and select name',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
	}

});
