var View = require('./view');
var template = require('./templates/settings');

module.exports = View.extend({
	id: 'settings-view',
	template: template,
	events: {
		'click #done': 'done',
		'click #logout': 'logout',
		'click #save': 'save',
		'click #addBook': 'addBook',
		'click #changeQuantity': 'changeQuantity',
		'click #help':'sendHelp'
	},

	initialize: function () {

	},

	render: function () {
		var that = this;
		//this.$el.html(this.template());
		var query = new Parse.Query("User");
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		that.username = $('#set-email').val();
		query.equalTo("objectId", currentUserId);
		query.first({
			success: function(userData) {
				var userInfo = JSON.stringify(userData);
				var userArray = JSON.parse(userInfo);
				console.log(userArray);
				that.$el.html(that.template(userArray));
				that.username = $('#set-email').val();
			},
			error: function(newBook, error) {
				alert('Back to the drawing board');
				console.log(error);
			}
		});
	},

	// changePass: function () {
		// $('input.hide-hard').addClass("block");
		// },

		save: function() {
			var that = this;
			var username = $('#set-email').val();
			var oldPassword = $('#set-current').val();
			var password =  $('#set-new').val();
			var confirmPassword =  $('#set-new-confirm').val();

			if (password == confirmPassword) {
				var user = Parse.User.logIn(that.username, oldPassword, {
					success: function(user) {
						user.set("username", username);  // attempt to change username
						user.set("password", password);
						user.save(null, {
							success: function(user) {
								alert("Settings have been changed");
								Application.router.navigate("#home", {
									trigger: true
								});

							},
							error: function(error) {
								alert("Unable to change info right now");
							}
						});
					},
					error: function(error) {
						alert("Incorrect password");
						var oldPassword = $('#set-current').val("");
						var password =  $('#set-new').val("");
						var confirmPassword =  $('#set-new-confirm').val("");
					}
				});
			}
			else {
				alert("Passwords need to match");
			}

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
		},

		sendHelp: function() {
			var that = this;
			var helpPrompt = {
				state0: { 
					title: "Help Me",
					buttons: { "Cancel": false, "Submit": true },
					html:'</br>Email <input type="text" name="help" value="'+that.username+'" style="font-size:18px;width:100%;text-align:center;"></br></br>'+
							 'Message <input type="text" name="help" value="" style="font-size:18px;width:100%;text-align:left;"></br>',
					submit: function(e,v,m,f){

					}
				}
			};	
			$.prompt(helpPrompt);
		},

	});