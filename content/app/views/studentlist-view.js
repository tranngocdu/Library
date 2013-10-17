var View = require('./view');
var template = require('./templates/studentList');
var Library = require('../models/library');

module.exports = View.extend({
	id: 'studentlist-view',
	template: template,
	events: {
		'click #bookList':'bookList',
		'click #studentList':'studentList',
		'click #home':'home'
	},

	initialize: function() {

	},

	render: function() {

		this.$el.html(this.template());
		return this;

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
