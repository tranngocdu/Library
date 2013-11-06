var View = require('./view');
var template = require('./templates/checkIn');
var templateStudents = require('./templates/studentListCheck');

module.exports = View.extend({
	id: 'checkin-view',
	template: template,
	templateStudents:templateStudents,
	events: {
		'click #checkIn':'checkIn',
		'click .studentCheck':'pickName',
	},

	initialize: function() {
	},

	render: function() {
		var that = this;
		var bookData = Application.checkInView.bookInfo;
		this.$el.html(this.template(bookData));
		that.ISBN = Application.checkInView.bookInfo[0].ISBN;
		var studentBookList = Application.checkInView.bookInfo[0].studentList;
		setTimeout(function(){$('.students').html(that.templateStudents(studentBookList));},500)

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

			$("#checkIn").removeClass("disabled");
			$("#checkIn").addClass("secondary");
		}
		//Just highlite the damn thing already
		else {
			$(".studentCheck").removeClass("deselected");
			$(".studentCheck").removeClass("selected");
			$(".studentCheck").addClass("deselected");
			$(e.currentTarget).removeClass("deselected");
			$(e.currentTarget).addClass("selected");
			$("#checkIn").removeClass("disabled");
			$("#checkIn").addClass("secondary");
		};
		//If a name isn't selected make sure the Check Out button isn't highlited
		if (!$(".studentCheck").hasClass("selected")){
			$("#checkIn").addClass("disabled");
			$("#checkIn").removeClass("secondary");
		};


	},

	checkIn: function(e) {
		//Get the Array
		var that = this;
		that.studentArray = null;
		var query = new Parse.Query("NewBook");
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		query.equalTo("User", currentUserId);
		query.equalTo("ISBN", that.ISBN);
		query.first({
			success: function(usersBooks) {

				that.studentArray = usersBooks.attributes.studentList;
				var quantityAvailable = usersBooks.attributes.quantity_available;
				var quantityTotal = usersBooks.attributes.quantity_total;
				
				//Modifications to numbers
				quantityAvailable = quantityAvailable + 1;
				var quantityOut = quantityTotal - quantityAvailable;
				
				var length = that.studentArray.length;
				var cutItem = undefined;
				var i;
				for (i = 0; i < length; i++) {
					var element = that.studentArray[i];
					var id = element.objectId;
					if (id == that.studentId) {
						cutItem = i;
					}
				}
				if (cutItem != undefined) {
					that.studentArray.splice(cutItem,1);
					console.log(that.studentArray);
				}

				usersBooks.set("studentList",that.studentArray);
				usersBooks.set("quantity_available",quantityAvailable);
				usersBooks.set("quantity_out",quantityOut);
				
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
