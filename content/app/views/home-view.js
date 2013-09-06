var View = require('./view');
var template = require('./templates/home');

module.exports = View.extend({
	id: 'home-view',
	template: template,
	events: {
		'click #checkIn': 'checkIn',
		'click #checkOut': 'checkOut',
		'click #library': 'library'
	},

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	checkIn: function () {
		Application.router.navigate("#checkIn", {
			trigger: true
		});

	},

	checkOut: function () {
		Application.router.navigate("#checkOut", {
			trigger: true
		});
	},

	library: function() {
		Application.router.navigate("#library", {
			trigger: true
		});
	}


});