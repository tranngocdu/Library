var View = require('./view');
var template = require('./templates/studentList');

module.exports = View.extend({
	id: 'studentlist-view',
	template: template,
	events: {
		'click #add':'addStudent',
		'click .delete-name':'deleteStudent',
		'click .first-name':'studentPage'
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
		query.limit(1000);
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
	
	studentPage:function(e) {
		var studentId = $(e.currentTarget).data('id');
		Application.router.navigate("#student", {trigger:true});
	},

	deleteStudent: function(e) {
		
		navigator.notification.confirm(
			'Are you sure you want to delete this student?',  // message
			function(buttonIndex){
				if (buttonIndex == 2)
				{
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
			},         // callback
			'Delete',            // title
			'Cancel, OK'                  // buttonName
		);
		//send call to delete student
	}

});
