var View = require('./view');
var template = require('./templates/bookList');
var Library = require('../models/library');
var Book = require('../models/book');



module.exports = View.extend({
	id: 'booklist-view',
	template: template,
	events: {
		'click #bookList':'bookList',
		'click #studentList':'studentList',
		'click #home':'home',
		"dataLoaded":"append"
	},

	initialize: function() {

	},

	render: function() {
		this.bookList = new Library();
		this.bookList.libraryJSON ={};
		this.$el.html(this.template(this.bookList.libraryJSON));



		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("User", currentUserId);
		query.find({
			success: function(usersBooks) {
				console.log(usersBooks);
				// userPosts contains all of the posts by the current user.
				var length = usersBooks.length;
				var i = 0;
				while (i<length){
					console.log(usersBooks[i].attributes.title);
					title = usersBooks[i].attributes.title;
					image = usersBooks[i].attributes.cover_image;
					$('#bookList').append('<center><table width="85%"><tr><td><div id="book'+i+'"><p>Title:'+title+'.</br></p></div></td><td align="right"><div id="bookImage'+i+'"><img src="'+image+'"></div></td></tr></table></center>');
					i++;
				}
			}
		});

		/*this.bookDetail.fetch({
		processData:true,
		xhrFields: {withCredentials: true},
		add:true,
		data: {"teacherId":Application.bookDetailView.teacherId},
		success: function(data){
		Application.bookListView.$el.trigger("dataLoaded");
		}
		}); */

		return this;
	},

	append: function(){
		this.bookList.libraryJSON = this.bookList.handle();
		this.$el.html(this.template(this.bookList.libraryJSON));
	},

	bookList: function () {
		Application.router.navigate("#bookList", {trigger:true});
	},

	studentList: function () {
		Application.router.navigate("#studentList", {trigger:true});
	},

	home: function () {
		Application.router.navigate('', {trigger:true});
	},




});


