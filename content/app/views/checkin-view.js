var View = require('./view');
var template = require('./templates/checkIn');

module.exports = View.extend({
	id: 'checkin-view',
	template: template,
	events: {
		'click #checkInButton':'checkIn'
		
	},

	initialize: function() {
	},

	render: function() {
		var data = Application.checkInView.bookData;
		this.bookData = data;
		this.$el.html(this.template(data));
		return this;
	}

});
