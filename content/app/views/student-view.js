var View = require('./view');
var template = require('./templates/student');
var templateBooks = require('./templates/bookListBooks');

module.exports = View.extend({
	id: 'student-view',
	template: template,
	templateBooks:templateBooks,
	events: {
		'click #filt-current':'currentBooks',
		'click #filt-past':'pastBooks',
	},

	initialize: function() {

	},

	render: function() {
		var that = this;
		that.currentBookArray = {};
		that.pastBookArray = {};
		this.$el.html(this.template());
		var currentUser = Parse.User.current();
		console.log(currentUser);
		var currentUserId = currentUser.id;
		var query = new Parse.Query("Student");
		query.equalTo("objectId", this.id);
		query.first({
			success:function(student) {
				var bookArray = JSON.stringify(student);
				var bookArray = JSON.parse(bookArray);
				that.bookArray = bookArray;	
				that.currentBookArray = that.bookArray.currentBooks;
				that.pastBookArray = that.bookArray.pastBooks;
				$('#wrapper').html(that.templateBooks(that.currentBooksArray));
			}
		})

		return this;
	},
	
	currentBooks: function() {
		var that = this;
		$('#filt-current').addClass("selected");
		$('#filt-past').removeClass("selected");
		$('#wrapper').html(that.templateBooks(that.currentBookArray));
	},
	
	pastBooks: function() {
		var that = this;
		$('#filt-current').removeClass("selected");
		$('#filt-past').addClass("selected");
		$('#wrapper').html(that.templateBooks(that.pastBookArray));
	}

});
