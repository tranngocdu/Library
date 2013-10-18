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
		var data = Application.checkOutView.bookData;
		this.bookData = data;
		this.$el.html(this.template(data));
		return this;
	}

});
