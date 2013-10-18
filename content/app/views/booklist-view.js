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
		"dataLoaded":"append",
		'click #filt-all':'allSelected',
		'click #filt-available':'available',
		'click #filt-checked':'checkedOut'
	},

	initialize: function() {

	},

	render: function() {
		this.bookList = new Library();
		var that = this;
		this.bookList.libraryJSON ={};
		this.$el.html(this.template(this.bookList.libraryJSON));
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("User", currentUserId);
		query.find({
			success: function(usersBooks) {
				console.log(usersBooks);
				var bookArray = JSON.stringify(usersBooks);
				var bookArray = JSON.parse(bookArray);
				that.bookArray = bookArray;				
				that.$el.html(that.template(bookArray));
				// userPosts contains all of the posts by the current user.
				//var length = usersBooks.length;
				//var i = 0;
				//while (i<length){
				//	console.log(usersBooks[i].attributes.title);
				//	title = usersBooks[i].attributes.title;
				//	image = usersBooks[i].attributes.cover_image;
					
				//	i++;
				//}
			},
			error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});

		return this;
	},

	append: function(){
		this.bookList.libraryJSON = this.bookList.handle();
		this.$el.html(this.template(this.bookList.libraryJSON));
	},
	
	allSelected: function() {
		$('#filt-all').addClass("selected");
		$('#filt-available').removeClass("selected");
		$('#filt-checked').removeClass("selected");
	},
	
	available: function() {
		$('#filt-all').removeClass("selected");
		$('#filt-available').addClass("selected");
		$('#filt-checked').removeClass("selected");
	},
	
	checkedOut: function() {
		$('#filt-all').removeClass("selected");
		$('#filt-available').removeClass("selected");
		$('#filt-checked').addClass("selected");
		
	}

});


