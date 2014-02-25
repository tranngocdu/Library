var View = require('./view');
var template = require('./templates/student');

module.exports = View.extend({
	id: 'student-view',
	template: template,
	events: {

	},

	initialize: function() {

	},

	render: function() {
		this.$el.html(this.template());
		var that = this;
		var currentUser = Parse.User.current();
		console.log(currentUser);
		var currentUserId = currentUser.id;
		var query = new Parse.Query("Student");

		return this;
	}

});
