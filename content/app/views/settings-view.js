var View = require('./view');
var template = require('./templates/settings');

module.exports = View.extend({
	id: 'settings-view',
	template: template,
	events: {
		'click #edit': 'edit',
		'click #change-pass': 'changePass',
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

	edit: function () {
		$('#edit').toggle(function (){
		            $(this).text("Save").addClass("save");
		            $('input.hide-hard').addClass("block");
		        }, function(){
		            $(this).text("Edit").removeClass("save");
		            $('input.hide-hard').removeClass("block");
		        });
	},

	// changePass: function () {
	// $('input.hide-hard').addClass("block");
	// },

	done: function () {
		Application.router.navigate("#home", {
			trigger: true
		});
	},

	logout: function () {
		window.localStorage.removeItem("userId");
		Parse.User.logOut();
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