var View = require('./view');
var template = require('./templates/studentList');
var Library = require('../models/library');

module.exports = View.extend({
	id: 'studentlist-view',
	template: template,
	events: {
		'click #add':'addStudent',
		'click #delete':'deleteStudent'
	},

	initialize: function() {

	},

	render: function() {

		this.$el.html(this.template());
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("Student");
		query.equalTo("UserId", currentUserId);
		query.find({
			success: function(students) {
				console.log(students);
				// userPosts contains all of the posts by the current user.

			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		return this;
	},

	append: function(){

	},

	addStudent: function () {
		Application.router.navigate("#addStudent", {trigger:true});
	},

	deleteStudent: function() {

	}

});
