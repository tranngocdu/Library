var View = require('./view');
var template = require('./templates/studentList');
var Library = require('../models/library');


module.exports = View.extend({
	id: 'studentlist-view',
	template: template,
	events: {
		'click #bookList':'bookList',
		'click #studentList':'studentList',
		'click #home':'home',
		'click #createStudent':'createStudent'
	},

	initialize: function() {

	},




	render: function() {
				this.studentList = new Library();
		this.studentList.libraryJSON ={};
		this.$el.html(this.template(this.studentList.libraryJSON));

			var currentUser = Parse.User.current();
var currentUserId = currentUser.id;
var query = new Parse.Query("Student");
    query.equalTo("UserId", currentUserId);
    query.find({
      success: function(results) {
      	console.log(results);
				var length = results.length;
        var i = 0;
        while (i<length){
        console.log(results[i].attributes.Name);
        var name = results[i].attributes.Name;
        $('#studentList').append('<center><table width="85%"><tr><td><div id="name'+i+'"><p>'+name+'</br></p></div></td></tr></table></center>');
        i++;
      	}
			}
      
    });


		return this;
	},

	append: function(){

	},


	createStudent: function(){
		var studentName;

},
 


	bookList: function () {
	Application.router.navigate("#bookList", {trigger:true});
},

	studentList: function () {
	Application.router.navigate("", {trigger:true});
},

	home: function () {
		Application.router.navigate('', {trigger:true});
	},

});
