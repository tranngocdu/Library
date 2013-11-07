var View = require('./view');
var template = require('./templates/home');

module.exports = View.extend({
	id: 'home-view',
	template: template,
	events: {
		'click #checkIn': 'checkIn',
		'click #checkOut': 'checkOut',
		'click #library': 'library',
		'getbookinfo':'bookinfo',
		'checkOutInfo':'checkOutBook',
		'click #scanner':'scanner',
		"dataLoaded":"append",
		'click #bookList':'bookList',
		'click #studentList':'studentList',
		'bookInfoCheckin':'bookInfoCheckin',
		'bookInfoCheckout':'bookInfoCheckout'

	},

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template());
		if (Application.homeView.checkedOut == true) {
			$('body').append('<div id="checkedPrompt">Happy reading!</div>');
			$('#checkedPrompt').fadeIn(400);
			Application.homeView.checkedOut = false;
			setTimeout(function(){
				$('#checkedPrompt').fadeOut(400, function() { $(this).remove(); });
			}, 3000);
		}
		
		if (Application.homeView.checkedIn == true) {
			$('body').append('<div id="checkedPrompt">Back on the shelf!</div>');
			$('#checkedPrompt').fadeIn(400);
			Application.homeView.checkedIn = false;
			setTimeout(function(){
				$('#checkedPrompt').fadeOut(400, function() { $(this).remove(); });
			}, 3000);
		}
		
		var current = Parse.User.current();
		if(current===null){
			$("#footer").addClass("hidden");
		}else if(current!=null){
			$("#footer").removeClass("hidden");
			$("#footer").addClass("visible");
		};
		return this;
	},

	checkOut: function ()  {
		var quantityPrompt = {
			state0: { 
				title: "Check Out",
				buttons: { "Scan": "scan", "List": true, "Cancel": false },
				submit: function(e,v,m,f){
					if (v == true) {
						Application.router.navigate("#bookList", {trigger:true});
					}
					else if (v === "scan"){
						var scanner = cordova.require("cordova/plugin/BarcodeScanner");

						scanner.scan(
							function (result) {
								if (result.text){
								Application.homeView.ISBN = result.text;
								Application.homeView.$el.trigger("bookInfoCheckout");
								}
							}, 
							function (error) {
								alert("Scanning failed: " + error);
							}
						);
					}

				},
				cancel: function(){
				}
			}
		};
		$.prompt(quantityPrompt);
	},

	checkIn: function () {

		var quantityPrompt = {
			state0: { 
				title: "Check In",
				buttons: { "Scan": "scan", "List": true, "Cancel": false },
				submit: function(e,v,m,f){
					if (v == true) {
						Application.router.navigate("#bookList", {trigger:true});
					}
					else if (v === "scan"){
						var scanner = cordova.require("cordova/plugin/BarcodeScanner");

						scanner.scan(
							function (result) {
								if (result.text){
								Application.homeView.ISBN = result.text;
								Application.homeView.$el.trigger("bookInfoCheckin");
								}
							}, 
							function (error) {
								alert("Scanning failed: " + error);
							}
						);
					}

				},
				cancel: function(){
				}
			}
		};
		$.prompt(quantityPrompt);

	},

	bookInfoCheckout: function () {

		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("ISBN", Application.homeView.ISBN);
		query.equalTo("User", currentUserId);
		query.find({

			success: function(bookdetail) {

				if (bookdetail == '') {
					navigator.notification.alert(
						'You need to add this book to your library first.',  // message
						function alertDismissed() {}, // callback
						'Not so quick...',            // title
						'OK'                  // buttonName
					);
				// 	var quantityPrompt = {
				// 		state1: { 
				// 			title: "Not so quick...",
				// 			html: "You need to add this book to your library first.",
				// 			buttons: { "Ok": true },
				// 			submit: function(e,v,m,f){
				// 				Application.router.navigate("#bookList" , {trigger: true});

				// 			},
				// 			cancel: function(){
				// 			}
				// 		}
				// 	};
				// $.prompt(quantityPrompt);
				} else {
				var bookdetailArray = JSON.stringify(bookdetail);
				bookdetailArray = JSON.parse(bookdetailArray);
				Application.checkOutView.bookInfo = bookdetailArray;
				Application.router.navigate("#checkOut", {
					trigger: true
				});
				}
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

	},

	bookInfoCheckin: function () {

		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("ISBN", Application.homeView.ISBN);
		query.equalTo("User", currentUserId);
		query.find({

			success: function(bookdetail) {
				if (bookdetail == '') {
					navigator.notification.alert(
											'You need to add this book to your library first.',  // message
											function alertDismissed() {}, // callback
											'Not so quick...',            // title
											'OK'                  // buttonName
										);
				} else {
				var bookdetailArray = JSON.stringify(bookdetail);
				bookdetailArray = JSON.parse(bookdetailArray);
				Application.checkInView.bookInfo = bookdetailArray;
				Application.router.navigate("#checkIn", {
					trigger: true
				});
				}
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

	}


});