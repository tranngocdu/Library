var View = require('./view');
var template = require('./templates/addStudent');

module.exports = View.extend({
	id: 'addstudent-view',
	template: template,
	events: {
		'click #add-student': 'addStudent'
	},

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	addStudent: function () {
		var name = $('#add-first').val();
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var NewStudent=Parse.Object.extend("Student");
		var newStudent=new NewStudent();

		newStudent.set("Name", name);
		newStudent.set("UserId", currentUserId);

		newStudent.save(null, {
			success: function(newStudent) {
				$('#add-first').val("");
				alert('It worked!');
			},
			error: function(newBook, error) {
				alert('Back to the drawing board');
			}
		});

	}

});