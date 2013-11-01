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
		var that = this;
		var bookData = Application.checkInView.bookInfo;
		this.$el.html(this.template(bookData));
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("User", currentUserId);
		query.equalTo("ISBN", Application.checkInView.bookInfo.ISBN.identifiers.isbn_13[0]);
		alert(currentUserId);
		alert(Application.checkInView.bookInfo.ISBN.title);

		query.first({
			success: function(bookData) {
				console.log(bookData);
				var studentBookList = bookData.attributes.studentList;
				console.log(studentBookList);
				$('.students').html(that.templateStudents(studentBookList));
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		return this;
	},
	
	checkIn: function() {
		//Get the Array
		var that = this;
		that.studentArray = null;
		var query = new Parse.Query("NewBook");
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		query.equalTo("User", currentUserId);
		query.equalTo("title", data.ISBN.title);
		query.first({
			success: function(usersBooks) {

				that.studentArray = usersBooks.attributes.studentList;
				that.studentArray.push({name:that.studentName,id:that.studentId});
				var length = that.studentArray.length;
				var cutItem = undefined;
				var i;
				for (i = 0; i < length; i++) {
				var element = that.studentArray[i];
				var id = element.id;
				if (id == "") {
				cutItem = i;
				}
				}
				that.studentArray.splice(cutItem,1);
				console.log(that.studentArray);

				usersBooks.set("studentList",that.studentArray);
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
