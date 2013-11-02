var View = require('./view');
var template = require('./templates/checkOut');
var templateStudents = require('./templates/studentListCheck');
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
		that.ISBN = Application.checkOutView.bookInfo[0].ISBN;
		console.log(Application.checkOutView.bookInfo);		
		this.$el.html(this.template(data));
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("Student");
		query.equalTo("UserId", currentUserId);
		query.find({
			success: function(students) {
				var studentArray = JSON.stringify(students);
				var studentArray = JSON.parse(studentArray);
				$('.students').html(that.templateStudents(studentArray));
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		return this;
	},


	pickName: function(e) {
		this.studentName = $(e.currentTarget).data('name');
		this.studentId = $(e.currentTarget).data('id');

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
		//Get the Array
		var that = this;
		var query = new Parse.Query("NewBook");
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		query.equalTo("User", currentUserId);
		query.equalTo("ISBN", that.ISBN);
		query.first({
			success: function(usersBooks) {
				console.log(usersBooks);
				var studentsCheck = usersBooks.attributes.studentList;
				var quantityAvailable = usersBooks.attributes.quantity_available;
				quantityAvailable = quantityAvailable - 1;
				studentsCheck.push({"Name":that.studentName,"objectId":that.studentId});
				var length = studentsCheck.length;
				var cutItem = undefined;
				var i;
				for (i = 0; i < length; i++) {
					var element = studentsCheck[i];
					var id = element.id;
					if (id == undefined) {
						cutItem = i;
					}
				}
				if (cutItem != undefined){
					studentsCheck.splice(cutItem,1);
				}

				usersBooks.set("studentList",studentsCheck);
				usersBooks.set("quantity_available",quantityAvailable);
				
				usersBooks.save(null, {
					success: function(newBook) {
						Application.router.navigate("#home" , {trigger: true});
					},
					error: function(newBook, error) {
						alert('Back to the drawing board');
						console.log(error);
					}
				});
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			},
		});

	}



});
