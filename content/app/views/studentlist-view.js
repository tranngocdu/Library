var View = require('./view');
var template = require('./templates/studentList');

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
		var that = this;
		var currentUser = Parse.User.current();
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
	},

	append: function(){

	},

	addStudent: function () {
		Application.router.navigate("#addStudent", {trigger:true});
	},

	deleteStudent: function() {

	}

});
