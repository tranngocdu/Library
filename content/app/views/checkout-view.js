var View = require('./view');
var template = require('./templates/checkOut');
var templateStudents = require('./templates/studentListCheck');
var studentName = null;
var studentId = null;
var data =null;


module.exports = View.extend({
	id: 'checkout-view',
	template: template,
	templateStudents:templateStudents,
	events: {

		'click .studentCheck':'pickName',
		'click #checkOut':'checkOut'

	},

	initialize: function() {
	},

	render: function() {
		var that=this;
		data = Application.checkOutView.bookInfo;
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
		studentName = $(e.currentTarget).data('name');
		studentId = $(e.currentTarget).data('id');
		console.log(studentId);
		console.log(studentName);
	
	
		//Checks if the tap was on a previously selected name, if so removes the selection from tapped name
		if($(e.currentTarget).hasClass("selected")){
				$(e.currentTarget).removeClass("selected");
				$(e.currentTarget).addClass("deselected");
		}
		//Here because without this the names cannot be reselected
		else if($(e.currentTarget).hasClass("deselected")){
				$(".studentCheck").removeClass("deselected");
				$(".studentCheck").removeClass("selected");
				$(".studentCheck").addClass("deselected");
				$(e.currentTarget).removeClass("deselected");				
				$(e.currentTarget).addClass("selected");

				$("#checkOut").removeClass("disabled");
				$("#checkOut").addClass("primary-fill");
		}
		//Just highlite the damn thing already
		else {
		$(".studentCheck").removeClass("deselected");
		$(".studentCheck").removeClass("selected");
		$(".studentCheck").addClass("deselected");
		$(e.currentTarget).removeClass("deselected");
		$(e.currentTarget).addClass("selected");
		$("#checkOut").removeClass("disabled");
		$("#checkOut").addClass("primary-fill");
		};
		//If a name isn't selected make sure the Check Out button isn't highlited
		if (!$(".studentCheck").hasClass("selected")){
				$("#checkOut").addClass("disabled");
				$("#checkOut").removeClass("primary-fill");
		};
		

	},

	checkOut: function(e) {
		//Create the Array
		var array =[];
		array.push({name:studentName,id:studentId});
		console.log(array);
		//Push it to Parse
		
		console.log(data.ISBN.title);
		

  },



});
