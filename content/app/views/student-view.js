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
		query.equalTo("UserId", currentUserId);
		query.ascending("Name");
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

	deleteStudent: function(e) {
		var studentId = $(e.currentTarget).data('id');
		var Student = Parse.Object.extend("Student");
		var query = new Parse.Query(Student);
		query.get(studentId, {
		  success: function(myObj) {
		    // The object was retrieved successfully.
		    myObj.destroy({});
			$("#"+studentId).remove();
		
		  },
		  error: function(object, error) {
		    alert("This was not retreived correctly.");
		  }
		});
	}

});
