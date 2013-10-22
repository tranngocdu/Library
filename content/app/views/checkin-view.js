var View = require('./view');
var template = require('./templates/checkIn');
var templateStudents = require('./templates/studentListCheck');

module.exports = View.extend({
	id: 'checkin-view',
	template: template,
	templateStudents:templateStudents,
	events: {
		'click #checkIn':'checkIn'
	},

	initialize: function() {
	},

	render: function() {
		var data = Application.checkInView.bookInfo;
		this.$el.html(this.template(data));
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("Student");
		query.equalTo("UserId", currentUserId);
		//GARRETT!!!
		//See if we can find only students who have the book checked out?
		query.find({
			success: function(students) {
				var studentArray = JSON.stringify(students);
				var studentArray = JSON.parse(studentArray);
				$('#wrapper').html(that.templateStudents(studentArray));
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		return this;
	},
	
	checkIn: function() {
		
	}

});
