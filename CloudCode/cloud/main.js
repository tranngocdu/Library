
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("studentCheckOut", function(request, response) {
	var query = new Parse.Query("Student");
	query.equalTo("objectId", request.params.studentId);
	query.first({
		success: function(student) {
			var bookObj = {
				"ISBN": request.params.ISBN,
				"title": request.params.title
			};
			student.get("currentBooks").push(bookObj);
			return student.save();
		},
		error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
      response.error('ERROR')
    }
	});
});

Parse.Cloud.define("studentCheckIn", function(request, response) {
	var query = new Parse.Query("Student");
	query.equalTo("objectId", request.params.studentId);
	query.first({
		success: function(student) {
			var bookObj = {
				"ISBN": request.params.ISBN,
				"title": request.params.title
			};
			var index = student.get("currentBooks").indexOf(bookObj);
			student.get("currentBooks").splice(index,1);
			student.get("pastBooks").push(bookObj);
			return student.save();
		},
		error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
      response.error('ERROR');
    }
	});
});


Parse.Cloud.job("checkISBN", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var counter = 0;
  // Query for all books
  var query = new Parse.Query("NewBook");
  query.each(function(book) {
      // Update to plan value passed in
      if (book.get("ISBN") == "") {
      	var oldId = book.id;
      	while(oldId.length < 13) {
	      	oldId += "0";
	      }
	      console.log(oldId);
	      book.set("ISBN", oldId) 
	      return book.save();
      }
  }).then(function() {
    // Set the job's success status
    console.log(counter);
    status.success("Books counted!");
  }, function(error) {
    // Set the job's error status
    console.log(error);
    status.error("Uh oh, something went wrong.");
  });
});

Parse.Cloud.job("createBlankArray", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var counter = 0;
  // Query for all books
  var query = new Parse.Query("Student");
  query.each(function(student) {
      // Update to plan value passed in
      if (student.get("currentBooks") == undefined) {
      	student.set("currentBooks", new Array())
      	return student.save();
      }
      if (student.get("pastBooks") == undefined) {
      	student.set("pastBooks", new Array())
      	return student.save();
      }
  }).then(function() {
    // Set the job's success status
    console.log(counter);
    status.success("Students Found!");
  }, function(error) {
    // Set the job's error status
    console.log(error);
    status.error("Uh oh, something went wrong.");
  });
});