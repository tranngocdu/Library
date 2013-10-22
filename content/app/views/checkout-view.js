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
		var data = Application.checkOutView.bookInfo;
		this.bookData = data;
		this.$el.html(this.template(data));
		var currentUser = Parse.User.current();
		console.log(currentUser);
		var currentUserId = currentUser.id;
		var query = new Parse.Query("Student");
		query.equalTo("UserId", currentUserId);
		query.find({
			success: function(students) {
				var studentArray = JSON.stringify(students);
				var studentArray = JSON.parse(studentArray);
				that.$el.html(that.template(studentArray));
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		return this;
	}

});
