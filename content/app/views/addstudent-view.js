var View = require('./view');
var template = require('./templates/addStudent');

module.exports = View.extend({
	id: 'addstudent-view',
	template: template,
	events: {
		'click #done': 'done',
		'click #logout': 'logout',
		'click #addBook': 'addBook',
		'click #changeQuantity': 'changeQuantity'
	},

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	done: function () {
		Application.router.navigate("#home", {
			trigger: true
		});
	},

	logout: function () {
		window.localStorage.removeItem("userId");
		Application.router.navigate("#login", {
			trigger: true
		});
	},

	addBook: function() {
		Application.router.navigate("#addBook", {
			trigger: true
		});
	},
	
	changeQuantity: function() {
		Application.router.navigate("#addBook", {
			trigger: true
		});
	}

});