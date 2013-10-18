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

		var that = this;
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("Student");
		query.equalTo("UserId", currentUserId);
		query.find({
			success: function(students) {
				that.studentJSON = JSON.stringify(students);
				var array = ("{\"student\":"+that.studentJSON+"}");
				console.log(array);
				//array = JSON.stringify(array);
				//that.$el.html(that.template('{"student": [{"Name": "Steven"},{"Name": "Philip"}]}'));
				that.$el.html(that.template(array));

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
