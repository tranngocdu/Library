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
						navigator.notification.alert(
							'The password you entered was incorrect.',  // message
							function alertDismissed() {}, // callback
							'Check Password',            // title
							'OK'                  // buttonName
						);
						var oldPassword = $('#set-current').val("");
						var password =  $('#set-new').val("");
						var confirmPassword =  $('#set-new-confirm').val("");
					}
				});
			}
			else {
				navigator.notification.alert(
						'The passwords did not match.',  // message
						function alertDismissed() {}, // callback
						'Try again',            // title
						'OK'                  // buttonName
					);
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
				state2: { 
					title: "Help Me",
					buttons: { "Cancel": false, "Submit": true },
					html:'<input id="help-input" type="text" name="email" placeholder="Your Email" value="'+that.username+'"/>'+'<textarea id="help-textarea" name="message" value="" placeholder="Your Message"></textarea>',
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