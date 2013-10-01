var View = require('./view');
var template = require('./templates/bookList');
var Library = require('../models/library');

module.exports = View.extend({
	id: 'booklist-view',
	template: template,
	events: {
		"dataLoaded":"append"
	},

	initialize: function() {

	},

	render: function() {
		this.bookList = new Library();
		this.bookList.libraryJSON ={};
		this.$el.html(this.template(this.bookList.libraryJSON));
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
	}

});
