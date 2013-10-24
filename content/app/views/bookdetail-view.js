var View = require('./view');
var template = require('./templates/bookDetail');
var Book = require('../models/book');

module.exports = View.extend({
	id: 'bookdetail-view',
	template: template,
	events: {
		"dataLoaded":"append"
	},

	initialize: function() {

	},

	render: function() {
		var that=this;
		var query = new Parse.Query("NewBook");
		query.equalTo("objectId", Application.bookDetailView.bookId);
		query.find({
			
			success: function(bookdetail) {

				var bookdetailArray = JSON.stringify(bookdetail);
				var bookdetailArray = JSON.parse(bookdetailArray);

				console.log(bookdetailArray);				
				that.$el.html(that.template(bookdetailArray));
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});


		
		return this;
	}

});
