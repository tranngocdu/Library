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
		this.bookDetail = new Book();
		this.bookDetail.bookJSON ={};
		this.$el.html(this.template(Application.bookDetailView.bookInfo));

		return this;
	},

	append: function(){
		this.bookDetail.bookJSON = this.bookDetail.handle();
		this.$el.html(this.template(this.bookDetail.bookJSON));
	}

});
