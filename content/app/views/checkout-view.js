var View = require('./view');
var template = require('./templates/checkOut');
var templateStudents = require('./templates/studentListCheck');


module.exports = View.extend({
	id: 'checkout-view',
	template: template,
	templateStudents:templateStudents,
	events: {

		'click .studentCheck':'pickName'

	},

	initialize: function() {
	},

	render: function() {
		var that=this;
		var data = Application.checkOutView.bookInfo;
		this.$el.html(this.template(data));
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("Student");
		query.equalTo("UserId", currentUserId);
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
	
	pickName: function(e) {
		var studentName = $(e.currentTarget).data('name');
		var studentId = $(e.currentTarget).data('id');
		console.log(studentId);
		console.log(studentName);
		$(e.currentTarget).addClass("selected");
		$("#checkOut").removeClass("disabled");
		$("#checkOut").addClass("primary-fill");

	},

	checkOut: function() {
		
	}

});
