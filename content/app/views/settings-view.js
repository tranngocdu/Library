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
		'click #help':'sendHelp',
		'focus #set-new-confirm': 'footer',
		'focus #set-new': 'footer',
		'focus #set-current': 'footer',
		'focus #set-email': 'footer',
		'blur #set-new-confirm': 'footer',
		'blur #set-new': 'footer',
		'blur #set-current': 'footer',
		'blur #set-email': 'footer'

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

	footer: function() {

		setTimeout(function(){
			if (($("#set-new-confirm").is(":focus")) || ($("#set-new").is(":focus")) || ($("#set-current").is(":focus")) || ($("#set-email").is(":focus"))){
				$("#footer").addClass("hidden");
				$("#footer").removeClass("visible");
				$("#wrapper").css("bottom", "0px");
			} else {
				$("#footer").removeClass("hidden");
				$("#footer").addClass("visible");
				$("#wrapper").css("bottom", "65px");
				
			}

			},200);
		},

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
			$("#footer").removeClass("visible");
			$("#footer").addClass("hidden");
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
					html:'</br>Email <input type="text" name="email" value="'+that.username+'" style="font-size:18px;width:100%;text-align:center;"></br></br>'+
					'Message <input type="text" name="message" value="" style="font-size:18px;width:100%;text-align:left;"></br>',
					submit: function(e,v,m,f){
						if(v){
							console.log(v);
							$.ajax({
								data: {
									body: f.message,
									replyto: f.email 
								},
								url: "http://bohemian.webscript.io/classLibraryContact",
								type: "POST",
							});
						}else {
							console.log(v);
						}
					}
				}
			};	
			$.prompt(helpPrompt);
		},

	});