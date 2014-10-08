
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("studentCheckOut", function(request, response) {
	this.isbn = request.params.ISBN;
	this.title = request.params.title;
	var query = new Parse.Query("Student");
	query.equalTo("objectId", request.params.studentId);
	query.first({
		success: function(student) {
			var that = this;
			that.student = student;
			var bookObj = {
				"ISBN": this.isbn,
				"title": this.title
			};
			that.bookObj = bookObj;
			console.log(student.attributes.currentBooks);
			if(student.attributes.currentBooks == 'undefined') {
				student.attributes.set('currentBooks','[]');
				student.attributes.save(null, {
					success: function() {
						that.student.attributes.currentBooks.push(that.bookObj);
						that.student.save();
					}
				});
			}else {
				student.attributes.currentBooks.push(bookObj);
				student.save();
			}
			
		},
		error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    }
	});
});

Parse.Cloud.define("studentCheckIn", function(request, response) {
	this.isbn = request.params.ISBN;
	this.title = request.params.title;
	var query = new Parse.Query("Student");
	query.equalTo("objectId", request.params.studentId);
	query.first({
		success: function(student) {
			var that = this;
			that.student = student;
			var bookObj = {
				"ISBN": this.isbn,
				"title": this.title
			};
			that.bookObj = bookObj;
			if(student.attributes.pastBooks == "undefined") {
				student.attributes.set('currentBooks','[]');
				student.attributes.save(null, {
					success: function() {
						var index = that.student.attributes.currentBooks.indexOf(bookObj);
						that.student.attributes.currentBooks.splice(index,1);
						that.student.attributes.pastBooks.push(that.bookObj);
						that.student.save();
					}
				});
			}else {
				var index = student.attributes.currentBooks.indexOf(bookObj);
				student.attributes.currentBooks.splice(index,1);
				student.attributes.pastBooks.push(bookObj);
				student.save();
			}
			
		},
		error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    }
	});
});
