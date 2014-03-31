(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
// Application bootstrapper.
Application = {

	//## If using production and dev versions of server
	//useProductionEnv: true,

	initialize: function() {

		//For Parse
		Parse.initialize("hc7wyBlPLbosKj26FTiu8CvOcsECdeDVOGcEADZH", "eJGnhcwE48DQPdpq7MA9S8lYI7XgEi7vINje0TQZ");


		//## If setting something to happen on first launch of app
		//	if ( window.localStorage.getItem("launchCount") == null){
			//		window.localStorage.setItem("launchCount","1");
			//	}


			//	Set production and development servers
			//	this.serverURL = this.useProductionEnv ? 'http://productionurl.com' : 'http://devurl.com';

			//	Keeps app from jumping
			$.mobile.defaultHomeScroll = 0;

			// 	Setting view to location in views folder

			var Home = require('views/home-view');
			var AddBook = require('views/addbook-view');
			var AddStudent = require('views/addstudent-view');
			var BookDetail = require('views/bookdetail-view');
			var EditBook = require('views/editbook-view');
			var BookList = require('views/booklist-view');
			var CheckIn = require('views/checkin-view');
			var CheckOut = require('views/checkout-view');
			var AddBookManually = require('views/addbookmanually-view');
			var Login = require('views/login-view');
			var Settings = require('views/settings-view');
			var Signup = require('views/signup-view');
			var StudentList = require('views/studentlist-view');
			var Student = require('views/student-view');

			var Router = require('lib/router');

			this.homeView = new Home();
			this.addBookView = new AddBook();
			this.addStudentView = new AddStudent();
			this.bookDetailView = new BookDetail();
			this.editBookView = new EditBook();
			this.bookListView = new BookList();
			this.checkInView = new CheckIn();
			this.checkOutView = new CheckOut();
			this.addBookManuallyView = new AddBookManually();
			this.loginView = new Login();
			this.settingsView = new Settings();
			this.signupView = new Signup();
			this.studentListView = new StudentList();
			this.studentView = new Student();

			this.router = new Router();


			if (typeof Object.freeze === 'function') Object.freeze(this);
			// Initializing BackStack.StackNavigator for the #container div

			var homeTab = function() {
				if(window.tapReady){
					$('#icon-settings').removeClass('settings-active');
					$('#icon-home').addClass('home-active');
					$('#icon-books').removeClass('books-active');
					$('#icon-students').removeClass('students-active');
					$('.tab').removeClass('active');
					$('#home_tab').addClass('active');

					Application.router.navigate("#home" , {trigger: true});
				}
				//activateTabs();
			}

			var bookListTab = function() {
				if(window.tapReady){
					$('.tab').removeClass('active');
					$('#bookList_tab').addClass('active');
					$('#icon-settings').removeClass('settings-active');
					$('#icon-home').removeClass('home-active');
					$('#icon-books').addClass('books-active');
					$('#icon-students').removeClass('students-active');
					Application.router.navigate("#bookList" , {trigger: true});

				}
			}
			var studentListTab = function() {
				if(window.tapReady){
					$('.tab').removeClass('active');
					$('#studentList_tab').addClass('active');
					$('#icon-settings').removeClass('settings-active');
					$('#icon-home').removeClass('home-active');
					$('#icon-books').removeClass('books-active');
					$('#icon-students').addClass('students-active');
					Application.router.navigate("#studentList" , {trigger: true});

				}
			}
			var settingsTab =  function() {
				if(window.tapReady){
					$('.tab').removeClass('active');
					$('#settings_tab').addClass('active');
					$('#icon-settings').addClass('settings-active');
					$('#icon-home').removeClass('home-active');
					$('#icon-books').removeClass('books-active');
					$('#icon-students').removeClass('students-active');
					Application.router.navigate("#settings" , {trigger: true});


				}
			}

			$('#home_tab').bind('tap', homeTab);
			$('#backButton').bind('tap', homeTab);

			$('#bookList_tab').bind('click', bookListTab); 
			$('#studentList_tab').bind('tap', studentListTab); 
			$('#settings_tab').bind('tap', settingsTab);

		},

	}

	module.exports = Application;
});

;require.register("initialize", function(exports, require, module) {
var application = require('application');
window.tapReady = true; 
                               
$(function() {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;

    // Remove page from DOM when it's being replaced
    $(document).delegate('div[data-role="page"]', 'pagehide', function (event, ui) {
	    $(event.currentTarget).remove();
	});                                           
	
  application.initialize();
  Backbone.history.start();
});

});

;require.register("lib/router", function(exports, require, module) {
var application = require('application');

module.exports = Backbone.Router.extend({

	routes: {
		// If you want to save login state, send them to a prelogin function which checks for login state
		'':'preLogin',
		'home':'home',
		'addBook':'addBook',
		'addStudent':'addStudent',
		'editBook':'editBook',
		'bookDetail':'bookDetail',
		'bookList':'bookList',
		'checkIn':'checkIn',
		'checkOut':'checkOut',
		'addBookManually':'addBookManually',
		'login':'login',
		'settings':'settings',
		'signup':'signup',
		'studentList':'studentList',
		'student':'student'
		

	},

	initialize:function () {
		// Handle back button throughout the application or menu buttons
		
		$(document).on('vclick', '#backButton', function(e) {
			e.preventDefault();
			$.mobile.activePage.back = true;
			window.history.back();
		});
		
		$(document).on('vclick', '.back', function(e) {
			e.preventDefault();
			$.mobile.activePage.back = true;
			window.history.back();
		});

		// Loading spinner
		//$('body').append('<div id="theSpinner" class="spinnerModal" style="display:none"><div class="spinnerContainer"><div class="spinnerWrapper"><div class="spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div></div><div class="description">Pencils Ready!</div></div></div>');

		// First page logic
		this.firstPage = true;
		$('body').append('<div id="footer"><ul><li id="home_tab" class="active tab"><div id="icon-home" class="footer-icon home-active"></div>Home</li><li id="bookList_tab" class="tab"><div id="icon-books" class="footer-icon"></div>Books</li><li id="studentList_tab" class="tab"><div id="icon-students" class="footer-icon"></div>Students</li><li id="settings_tab" class="tab"><div id="icon-settings" class="footer-icon"></div>Settings</li></ul></div>');

		},


		preLogin:function() {
			var currentUser = Parse.User.current();
			var that = this;
			if (currentUser) {
				that.changePage(Application.homeView);						
			}
			else {
				that.changePage(Application.loginView);
			}
		},

		//Functions for changing pages
		home:function() {
			this.changePage(Application.homeView);
		},

		addBook:function() {
			this.changePage(Application.addBookView);
		},

		addStudent:function() {
			this.changePage(Application.addStudentView);
		},

		bookDetail:function() {
			this.changePage(Application.bookDetailView);
		},
		bookList:function() {
			this.changePage(Application.bookListView);
		},
		checkIn:function() {
			this.changePage(Application.checkInView);
		},
		checkOut:function() {
			this.changePage(Application.checkOutView);
		},
		addBookManually:function() {
			this.changePage(Application.addBookManuallyView);
		},
		editBook:function() {
			this.changePage(Application.editBookView);
		},
		login:function() {
			this.changePage(Application.loginView);
		},
		settings:function() {
			this.changePage(Application.settingsView);
		},
		signup:function() {
			this.changePage(Application.signupView);
		},
		studentList:function() {
			this.changePage(Application.studentListView);
		},
		student:function() {
			this.changePage(Application.studentView);
		},

		//Functions for page transitions
		changePage:function (page) {
			window.tapReady = false;
			$(page.el).attr('data-role', 'page');
			page.render();
			page.delegateEvents();
			$('body').append($(page.el));
			var transition = 'slide';
			var bPage = $.mobile.activePage.back;

			if (page.afterAppend) {
				page.afterAppend();
			}
			// We don't want to slide the first page
			if (this.firstPage) {
				transition = 'fade';
				this.firstPage = false;
			}

			$.mobile.changePage($(page.el), {changeHash:false, transition: bPage ? 'slide' : transition, reverse: bPage});

			$(document).delegate(page.el, 'pageshow', function () {
				window.tapReady = true;
			});
		}

	});

});

;require.register("lib/view_helper", function(exports, require, module) {
// Put your handlebars.js helpers here.

});

;require.register("models/book", function(exports, require, module) {
module.exports = Parse.Object.extend({
	className: "book",
	
	handle: function(){

		return {"descriptive_name": this.toJSON()};

	}

});
});

;require.register("models/collection", function(exports, require, module) {
// Base class for all collections.
module.exports = Parse.Collection.extend({
  
});

});

;require.register("models/library", function(exports, require, module) {
var Book = require('./book');

module.exports = Parse.Collection.extend({
	model: Book, 
		

	handle: function(){

		return {"DescriptiveName": this.toJSON()};

	}

});
});

;require.register("models/model", function(exports, require, module) {
// Base class for all models.
module.exports = Parse.Object.extend({
  
});

});

;require.register("models/student", function(exports, require, module) {
module.exports = Parse.Object.extend({
	className: "student",
	
	handle: function(){

		return {"descriptive_name": this.toJSON()};

	}

});
});

;require.register("views/addbook-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/addBook');

module.exports = View.extend({
	id: 'addbook-view',
	template: template,
	events: {
		"dataLoaded":"append",
		'click #done':'addBook',
		'click #edit-quantity':'quantity',
		'click #add-book':'addBook',
		'click #addPhoto': 'addPhoto',
	},

	initialize: function() {

	},

	render: function() {
		var that = this;
		that.canSave = false;
		var data = Application.addBookView.bookData;
		var passData = data;
		console.log(JSON.stringify(passData));
		var dataString = JSON.stringify(data);
		var combinedString = dataString.substring(0,6) + dataString.substring(20);
		var data=JSON.parse(combinedString);
		that.totalAmount = 1;
		this.bookData = data;
		this.data = data;

		if (typeof this.bookData.ISBN.cover!='undefined') {

			$.ajax({
				data: {
					url: Application.addBookView.bookData.ISBN.cover.medium
				},
				url: "https://www.filepicker.io/api/store/S3?key=A8GpOnfHhQxiznYCtXZ9Uz",
				type: "POST",
				success: function (data) {
					that.imageUrl = data.url;
					that.data['image-url'] = that.imageUrl;
					that.canSave = true;
					that.$el.html(that.template(that.data));
				},
				error: function (jqXHR,textStatus,errorThrown) {
				}
			});
		} else {
			if(typeof Application.addBookView.bookData.ISBN.identifiers.isbn_13 != 'undefined') {
				that.imageUrl = "http://covers.openlibrary.org/b/isbn/"+Application.addBookView.bookData.ISBN.identifiers.isbn_13[0]+"-L.jpg";
				that.canSave = true;
				$.ajax({
					data: {
						url: that.imageUrl
					},
					url: "https://www.filepicker.io/api/store/S3?key=A8GpOnfHhQxiznYCtXZ9Uz",
					type: "POST",
					success: function (data) {
						that.imageUrl = data.url;
						that.data['image-url'] = that.imageUrl;
						that.canSave = true;
						that.$el.html(that.template(that.data));
					},
					error: function (jqXHR,textStatus,errorThrown) {
					}
				});
			}else {
				that.imageUrl = undefined;
				that.canSave = true;
				this.$el.html(this.template(that.data));
			}
		}

		// $("p#numberAvailable").html("Number Available: "+that.totalAmount+"");

		return this;
	},

	addBook: function() {
		var that = this;

		if (that.canSave == true) {
			var that = this;
			var currentUser = Parse.User.current();
			var currentUserId = currentUser.id;
			var NewBook=Parse.Object.extend("NewBook");
			var newBook=new NewBook();
			newBook.set("title", this.bookData.ISBN.title);
			if (typeof this.bookData.ISBN.authors!='undefined'){

				var lengthAuthors = this.bookData.ISBN.authors.length;
				var i = 0;
				var authorArray = new Array ();
				while (i < lengthAuthors) {
					authorArray.push(this.bookData.ISBN.authors[i].name);
					i++;
				}
				authorArray = authorArray.toString();
				newBook.set("author", authorArray);
			}
			if (typeof that.imageUrl != 'undefined'){
				newBook.set("cover_image", that.imageUrl);
			}
			console.log(this.bookData);
			newBook.set("quantity_total", that.totalAmount);
			newBook.set("quantity_out", 0);
			newBook.set("quantity_available", that.totalAmount);
			newBook.set("User", currentUserId);
			newBook.set("studentList",[{}]);
			newBook.set("ISBN", that.ISBN);
			if(that.totalAmount){
				newBook.save(null, {
					success: function(newBook) {
						Application.router.navigate("#bookList" , {trigger: true});
					},
					error: function(newBook, error) {
						alert('Back to the drawing board');
						console.log(error);
					}
				});
			}else {
				var quantityPrompt = {
					state1: { 
						title: "But how many?",
						html: "Please add quantity of books first.",
						buttons: { "Ok": true },
						submit: function(e,v,m,f){
							Application.router.navigate("#bookList" , {trigger: true});

						},
						cancel: function(){
						}
					}
				};
				$.prompt(quantityPrompt);
			};
		}
		else {
			navigator.notification.alert(
				'Please try again in one second, the photo is still uploading.',  // message
				function alertDismissed() {}, // callback
				'Try Again',            // title
				'OK'                  // buttonName
			);
		}
	},

	quantity: function() {
		var that = this;
		var data = Application.addBookView.bookData;
		var quantityPrompt = {
			state0: { 
				title: "Edit Quantity",
				buttons: { "Cancel": false, "Submit": true },
				html:'<select id="qty-input" name="amount"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>',
				submit: function(e,v,m,f){
					console.log(f.amount);
					that.totalAmount=f.amount;
					$("#numberAvailable").html("Number Available: "+that.totalAmount+"");
					that.totalAmount = parseInt(that.totalAmount);

				}
			}
		};
		$.prompt(quantityPrompt);
	},

	addPhoto: function() {
		var that = this;
		if (!window.plugins.filepicker) {
			alert("clicked");

			return;
		}

		var uploadSuccess = function(args) {
			if (args.result == 'didFinishPickingMediaWithInfo') {
				that.thumbnail_url = args.FPPickerControllerRemoteURL + '/convert?w=150';
				that.imageUrl = that.thumbnail_url;
				$(".no-icon").hide();
				$("#addPhoto").hide();
				$("#custom-art").show();
				$("#custom-art").html('<img src='+that.thumbnail_url+'></img>')

				//$('#picker').removeClass('background-image');
				//$('#picker').css('background-image', 'url(' + that.thumbnail_url + ')');
			}
		};

		var uploadError = function(args) {
			console.log('Error during Filepicker upload');
		};

		window.plugins.filepicker.pick(
			{
				dataTypes: ['image/*'],
				sourceNames: ['FPSourceCamera', 'FPSourceCameraRoll', 'FPSourceDropbox', 'FPSourceGoogleDrive', 'FPSourceGmail', 'FPSourceFacebook', 'FPSourceInstagram', 'FPSourceImagesearch']
			},
			uploadSuccess,
			uploadError
		);

	},

});

});

;require.register("views/addbookmanually-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/addBookManually');

module.exports = View.extend({
	id: 'addBookManually-view',
	template: template,
	events: {
		'click #addBook':'addBook',
		'click #addPhoto':'addPhoto',
		'focus #title': 'footer',
		'focus #author': 'footer',
		'focus #numberAvailable': 'footer',
		'blur #title': 'footer',
		'blur #author': 'footer',
		'blur #numberAvailable': 'footer',
	},

	initialize: function() {
	},

	render: function(data) {
		var that = this;
		this.data = {};
		this.data['book-isbn'] = Application.addBookManuallyView.ISBN;
		this.$el.html(this.template(this.data));
		return this;
	},

	footer: function() {

		setTimeout(function(){
			if (($("#title").is(":focus")) || ($("#author").is(":focus")) || ($("#numberAvailable").is(":focus"))){
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

		addBook:function () {
			var that = this;
			var title = $("#title").val();
			var author = $("#author").val();
			var isbn = $("#isbn").val();
			var numberAvailable = $("#numberAvailable").val();
			
			if (title && author && numberAvailable) {
			
			numberAvailable = parseInt(numberAvailable);
			var currentUser = Parse.User.current();
			var currentUserId = currentUser.id;
			var date = new Date();
			date = date.getTime();

			var NewBook=Parse.Object.extend("NewBook");
			var newBook=new NewBook();
			newBook.set("title", title);
			newBook.set("author", author);
			if (that.thumbnail_url) {
				newBook.set("cover_image", that.thumbnail_url);
			}
			newBook.set("quantity_total", numberAvailable);
			newBook.set("quantity_out", 0);
			newBook.set("quantity_available", numberAvailable);
			newBook.set("User", currentUserId);
			newBook.set("studentList",[{}]);
			newBook.set("ISBN", isbn);
			newBook.save(null, {
				success: function(newBook) {
					Application.router.navigate("#bookList" , {trigger: true});
				},
				error: function(newBook, error) {
					alert('Back to the drawing board');
					console.log(error);
				}
			});
		}
		else {
			navigator.notification.alert(
				'Please add a title, author, and quantity.',  // message
				function alertDismissed() {}, // callback
				'Try Again',            // title
				'OK'                  // buttonName
			);
		}

		},

		addPhoto: function() {
			var that = this;
			if (!window.plugins.filepicker) {
				alert("clicked");

				return;
			}

			var uploadSuccess = function(args) {
				if (args.result == 'didFinishPickingMediaWithInfo') {
					that.thumbnail_url = args.FPPickerControllerRemoteURL + '/convert?w=150';
					$(".no-icon").hide();
					$("#custom-art").show();
					$("#custom-art").html('<img src='+that.thumbnail_url+'></img>')

					//$('#picker').removeClass('background-image');
					//$('#picker').css('background-image', 'url(' + that.thumbnail_url + ')');
				}
			};

			var uploadError = function(args) {
				console.log('Error during Filepicker upload');
			};

			window.plugins.filepicker.pick(
				{
					dataTypes: ['image/*'],
					sourceNames: ['FPSourceCamera', 'FPSourceCameraRoll', 'FPSourceDropbox', 'FPSourceGoogleDrive', 'FPSourceGmail', 'FPSourceFacebook', 'FPSourceInstagram', 'FPSourceImagesearch']
				},
				uploadSuccess,
				uploadError
			);

		}

	});

});

;require.register("views/addstudent-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/addStudent');

module.exports = View.extend({
	id: 'addstudent-view',
	template: template,
	events: {
		'click #add-student': 'addStudent'
	},

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	addStudent: function () {
		var name = $('#add-first').val();
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var NewStudent=Parse.Object.extend("Student");
		var newStudent=new NewStudent();

		newStudent.set("Name", name);
		newStudent.set("UserId", currentUserId);

		newStudent.save(null, {
			success: function(newStudent) {
				$('#add-first').val("");
			},
			error: function(newBook, error) {
				alert('Back to the drawing board');
			}
		});

	}

});
});

;require.register("views/bookdetail-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/bookDetail');
var Book = require('../models/book');

module.exports = View.extend({
	id: 'bookdetail-view',
	template: template,
	events: {
		"dataLoaded":"append",
		"click #checkout-book":"checkoutBook",
		"click #checkin-book":"checkinBook",
		"click #remove-book-prompt":"removebookPrompt",
		"click #edit-book":"editQuantity",
		"removeBook":"removeBook"
	},

	initialize: function() {

	},

	render: function() {
		var that=this;
		that.$el.html(that.template());
		var query = new Parse.Query("NewBook");
		query.equalTo("objectId", Application.bookDetailView.bookId);
		query.find({

			success: function(bookdetail) {
				var bookdetailArray = JSON.stringify(bookdetail);
				bookdetailArray = JSON.parse(bookdetailArray);
				this.bookdetailArray = bookdetailArray;
				that.bookinfoknow = bookdetailArray[0];
				that.ISBN = bookdetailArray[0].ISBN;
				that.$el.html(that.template(bookdetailArray));

				if ((bookdetailArray[0].studentList.length == 0) || (jQuery.isEmptyObject(bookdetailArray[0].studentList[0]) == true)) {
					$("#checkout-list").hide();
				}
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		return this;
	},

	checkoutBook: function() {
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("ISBN", Application.bookDetailView.ISBN);
		query.equalTo("User", currentUserId);
		query.find({

			success: function(bookdetail) {
				console.log(bookdetail);
				var bookdetailArray = JSON.stringify(bookdetail);
				bookdetailArray = JSON.parse(bookdetailArray);
				Application.checkOutView.bookInfo = bookdetailArray;
				Application.router.navigate("#checkOut", {
					trigger: true
				});
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	},

	checkinBook: function() {
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("ISBN", Application.bookDetailView.ISBN);
		query.equalTo("User", currentUserId);
		query.find({

			success: function(bookdetail) {
				var bookdetailArray = JSON.stringify(bookdetail);
				bookdetailArray = JSON.parse(bookdetailArray);
				Application.checkInView.bookInfo = bookdetailArray;
				Application.router.navigate("#checkIn", {
					trigger: true
				});
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	},

	removebookPrompt: function(e){
		var bookTitle = $(e.currentTarget).data('title');
		var that = this;
		that.book_id = $(e.currentTarget).data('id');
		var removePrompt = {
			state0: { 
				title: "Confirmation",
				buttons: { "No": false, "Yes": true },
				html:'Are you sure you wish to remove <strong><em>'+bookTitle+'</em></strong> from your collection?',
				submit: function(e,v,m,f){
					if(v){
						Application.bookDetailView.$el.trigger("removeBook");
					}
				}
			}
		};
		$.prompt(removePrompt);
	},

	removeBook: function(e) {
		var that = this;
		var book_id = that.book_id;
		var book = Parse.Object.extend("NewBook");
		var query = new Parse.Query(book);
		query.get(book_id, {
			success: function(myObj) {
				// The object was retrieved successfully.
				myObj.destroy({});
				$(book_id).remove();
				Application.router.navigate("#bookList", {
					trigger: true
				});
			},
			error: function(object, error) {
				alert("This was not retreived correctly.");
			}
		});

	},

	editQuantity: function() {
	var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("ISBN", Application.bookDetailView.ISBN);
		query.equalTo("User", currentUserId);
		query.find({

			success: function(bookdetail) {
				var bookdetailArray = JSON.stringify(bookdetail);
				bookdetailArray = JSON.parse(bookdetailArray);
				Application.editBookView.bookInfo = bookdetailArray;
				Application.router.navigate("#editBook", {
					trigger: true
				});
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
		/*
		var quantityPrompt = {
			state0: { 
				title: "Edit Quantity",
				buttons: { "Cancel": false, "Submit": true },
				html:'<select id="qty-input" name="amount"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>',
				submit: function(e,v,m,f){
					console.log(f.amount);
					var totalAmount=f.amount;

					//Update UI
					$("#totalBooks").html("<span>"+totalAmount+" Total</span>");

					//Update Server
					totalAmount = parseInt(totalAmount);
					var currentUser = Parse.User.current();
					var currentUserId = currentUser.id;
					var query = new Parse.Query("NewBook");
					query.equalTo("ISBN", Application.bookDetailView.ISBN);
					query.equalTo("User", currentUserId);

					query.first({
						success: function(usersBooks) {
							console.log(usersBooks);
							var quantityOut = usersBooks.attributes.quantity_out;	
							var quantityAvailable = totalAmount - quantityOut;
							$("#availableBooks").html("<span>"+quantityAvailable+" Available</span>");

							usersBooks.set("quantity_available",quantityAvailable);
							usersBooks.set("quantity_total",totalAmount);

							usersBooks.save(null, {
								success: function(newBook) {
								},
								error: function(error) {
									alert("Error save: " + error.code + " " + error.message);
								}
							});
						},
						error: function(error) {
							alert("Error first: " + error.code + " " + error.message);
						},
					});


				}
			}
		};
		$.prompt(quantityPrompt);
		*/
	}

});

});

;require.register("views/booklist-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/bookList');
var templateBooks = require('./templates/bookListBooks');
var Library = require('../models/library');
var Book = require('../models/book');



module.exports = View.extend({
	id: 'booklist-view',
	template: template,
	templateBooks:templateBooks,
	events: {
		'click #filt-all':'allSelected',
		'click #filt-available':'available',
		'click #filt-checked':'checkedOut',
		'click #add':'addBook',
		"getbookinfo":"getBookInfo",
		'click .bookItem':'bookDetail'
	},

	initialize: function() {

	},

	render: function() {
		var that = this;
		that.$el.html(that.template());
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.limit(1000);
		query.equalTo("User", currentUserId);
		query.ascending("title");
		query.find({
			success: function(usersBooks) {
				var bookArray = JSON.stringify(usersBooks);
				bookArray = JSON.parse(bookArray);
				that.bookArrayAll = bookArray; 
				console.log(JSON.stringify(that.bookArrayAll));
				$('.booklist-wrap').html(that.templateBooks(that.bookArrayAll));				
				setTimeout(function(){
					$("img.lazy").lazyload({
						container: $("#wrapper")
					});
				},800);
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});


		return this;
	},

	allSelected: function() {
		var that = this;
		$('#wrapper').html(that.templateBooks(that.bookArrayAll));
		$('#filt-all').addClass("selected");
		$('#filt-available').removeClass("selected");
		$('#filt-checked').removeClass("selected");
		$("img.lazy").lazyload({
					container: $("#wrapper")
				});

	},

	available: function() {
		$('#filt-all').removeClass("selected");
		$('#filt-available').addClass("selected");
		$('#filt-checked').removeClass("selected");
		var that = this;
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("User", currentUserId);
		query.notEqualTo("quantity_available", 0);
		query.ascending("title");
		query.find({
			success: function(usersBooks) {

				var bookArray = JSON.stringify(usersBooks);
				var bookArray = JSON.parse(bookArray);
				that.bookArray = bookArray;				
				$('#wrapper').html(that.templateBooks(bookArray));
				$("img.lazy").lazyload({
					container: $("#wrapper")
				});
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
		

	},

	checkedOut: function() {
		$('#filt-all').removeClass("selected");
		$('#filt-available').removeClass("selected");
		$('#filt-checked').addClass("selected");

		var that = this;
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("NewBook");
		query.equalTo("User", currentUserId);
		query.notEqualTo("quantity_out", 0);
		query.ascending("title");
		query.find({
			success: function(usersBooks) {

				var bookArray = JSON.stringify(usersBooks);
				var bookArray = JSON.parse(bookArray);
				that.bookArray = bookArray;				
				$('#wrapper').html(that.templateBooks(bookArray));
				$("img.lazy").lazyload({
					container: $("#wrapper")
				});
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

	},

	addBook: function() {

		navigator.notification.confirm(
			'', // message
			onConfirm,            // callback to invoke with index of button pressed
			'Add Book',           // title
			'Scan,Manual, Cancel'         // buttonLabels
		);

		function onConfirm(buttonIndex) {
			if (buttonIndex == 1) {
				var scanner = cordova.require("cordova/plugin/BarcodeScanner");

				scanner.scan(
					function (result) {
						if(result.text){
							console.log(result);
							Application.bookListView.ISBN = result.text;
							Application.addBookView.ISBN = result.text;
							Application.bookListView.$el.trigger("getbookinfo");
						}
					}, 
					function (error) {
						alert("Scanning failed: " + error);
					}
				);
			}
			else if (buttonIndex ==2) {
				Application.router.navigate("#addBookManually", {trigger:true});

			}
		}		        

	},

	bookDetail: function(e) {
		Application.bookDetailView.bookId = $(e.currentTarget).data('id');
		Application.router.navigate("#bookDetail", {trigger:true});

	},

	getBookInfo: function() {
		var that = this;
		this.ISBN = Application.bookListView.ISBN;
		$.ajax({
			data: {
				bibkeys: "ISBN:" + Application.bookListView.ISBN,
				jscmd: "data",
				format: "json"
			},
			url: "http://openlibrary.org/api/books",
			type: "GET",
			success: function (data) {
				Application.bookListView.damnyou = data;
				var dataString = JSON.stringify(data);
				var combinedString = dataString.substring(0,6) + dataString.substring(20);
				var dataHere=JSON.parse(combinedString);

				if(typeof dataHere.ISBN === typeof undefined) {
					Application.addBookManuallyView.ISBN = that.ISBN;
					Application.router.navigate("#addBookManually", {
						trigger: true
					});
				}
				else {
					Application.addBookView.bookData = data;
					Application.router.navigate("#addBook", {
						trigger: true
					});
				}
			},
			error: function (jqXHR,textStatus,errorThrown) {
				alert("Error");
			}

		});
	}

});



});

;require.register("views/checkin-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/checkIn');
var templateStudents = require('./templates/studentListCheck');

module.exports = View.extend({
	id: 'checkin-view',
	template: template,
	templateStudents:templateStudents,
	events: {
		'click #checkIn':'checkIn',
		'click .studentCheck':'pickName',
	},

	initialize: function() {
	},

	render: function() {
		var that = this;
		var bookData = Application.checkInView.bookInfo;
		this.$el.html(this.template(bookData));
		that.ISBN = Application.checkInView.bookInfo[0].ISBN;
		var studentBookList = Application.checkInView.bookInfo[0].studentList;
		if ((studentBookList.length == 0) || (jQuery.isEmptyObject(studentBookList[0]) == true)) {
			setTimeout(function(){
				$(".name-header").hide();
				$(".check-wrap").hide();
			},200);

		}
		setTimeout(function(){$('.students').html(that.templateStudents(studentBookList));},500);

		return this;
	},

	pickName: function(e) {
		this.studentName = $(e.currentTarget).data('name');
		this.studentId = $(e.currentTarget).data('id');

		//Checks if the tap was on a previously selected name, if so removes the selection from tapped name
		if($(e.currentTarget).hasClass("selected")){
			$(e.currentTarget).removeClass("selected");
			$(e.currentTarget).addClass("deselected");
		}
		//Here because without this the names cannot be reselected
		else if($(e.currentTarget).hasClass("deselected")){
			$(".studentCheck").removeClass("deselected");
			$(".studentCheck").removeClass("selected");
			$(".studentCheck").addClass("deselected");
			$(e.currentTarget).removeClass("deselected");				
			$(e.currentTarget).addClass("selected");

			$("#checkIn").removeClass("disabled");
			$("#checkIn").addClass("secondary");
		}
		//Just highlite the damn thing already
		else {
			$(".studentCheck").removeClass("deselected");
			$(".studentCheck").removeClass("selected");
			$(".studentCheck").addClass("deselected");
			$(e.currentTarget).removeClass("deselected");
			$(e.currentTarget).addClass("selected");
			$("#checkIn").removeClass("disabled");
			$("#checkIn").addClass("secondary");
		};
		//If a name isn't selected make sure the Check Out button isn't highlited
		if (!$(".studentCheck").hasClass("selected")){
			$("#checkIn").addClass("disabled");
			$("#checkIn").removeClass("secondary");
		};


	},

	checkIn: function(e) {
		//Get the Array
		var that = this;
		that.studentArray = null;
		var query = new Parse.Query("NewBook");
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		query.equalTo("User", currentUserId);
		query.equalTo("ISBN", that.ISBN);
		query.first({
			success: function(usersBooks) {

				that.studentArray = usersBooks.attributes.studentList;
				var quantityAvailable = usersBooks.attributes.quantity_available;
				var quantityTotal = usersBooks.attributes.quantity_total;
				var title = usersBooks.attributes.title;

				//Modifications to numbers
				quantityAvailable = quantityAvailable + 1;
				var quantityOut = quantityTotal - quantityAvailable;

				var length = that.studentArray.length;
				var cutItem = undefined;
				var i;
				for (i = 0; i < length; i++) {
					var element = that.studentArray[i];
					var id = element.objectId;
					if (id == that.studentId) {
						cutItem = i;
					}
				}
				if (cutItem != undefined) {
					that.studentArray.splice(cutItem,1);
					console.log(that.studentArray);
				}

				usersBooks.set("studentList",that.studentArray);
				usersBooks.set("quantity_available",quantityAvailable);
				usersBooks.set("quantity_out",quantityOut);

				usersBooks.save(null, {
					success: function(newBook) {
						var studentData = {"studentId":that.studentId, "ISBN":that.ISBN, "title":title};
						Parse.Cloud.run("studentCheckIn", studentData);
						Application.homeView.checkedIn = true;
						Application.router.navigate("#home" , {trigger: true});
					},
					error: function(newBook, error) {
						alert('Back to the drawing board');
						console.log(error);
					}
				});
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			},
		});


	}

});

});

;require.register("views/checkout-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/checkOut');
var templateStudents = require('./templates/studentListCheck');
var data =null;


module.exports = View.extend({
	id: 'checkout-view',
	template: template,
	templateStudents:templateStudents,
	events: {

		'click .studentCheck':'pickName',
		'click #checkOut':'checkOut'
	},

	initialize: function() {
	},

	render: function() {
		var that=this;
		data = Application.checkOutView.bookInfo;
		that.ISBN = Application.checkOutView.bookInfo[0].ISBN;
		this.$el.html(this.template(data));
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		var query = new Parse.Query("Student");
		query.equalTo("UserId", currentUserId);
		query.ascending("Name");
		query.find({
			success: function(students) {
				var studentArray = JSON.stringify(students);
				studentArray = JSON.parse(studentArray);
				$('.students').html(that.templateStudents(studentArray));
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		return this;
	},


	pickName: function(e) {
		this.studentName = $(e.currentTarget).data('name');
		this.studentId = $(e.currentTarget).data('id');

		//Checks if the tap was on a previously selected name, if so removes the selection from tapped name
		if($(e.currentTarget).hasClass("selected")){
			$(e.currentTarget).removeClass("selected");
			$(e.currentTarget).addClass("deselected");
		}
		//Here because without this the names cannot be reselected
		else if($(e.currentTarget).hasClass("deselected")){
			$(".studentCheck").removeClass("deselected");
			$(".studentCheck").removeClass("selected");
			$(".studentCheck").addClass("deselected");
			$(e.currentTarget).removeClass("deselected");				
			$(e.currentTarget).addClass("selected");

			$("#checkOut").removeClass("disabled");
			$("#checkOut").addClass("primary-fill");
		}
		//Just highlite the damn thing already
		else {
			$(".studentCheck").removeClass("deselected");
			$(".studentCheck").removeClass("selected");
			$(".studentCheck").addClass("deselected");
			$(e.currentTarget).removeClass("deselected");
			$(e.currentTarget).addClass("selected");
			$("#checkOut").removeClass("disabled");
			$("#checkOut").addClass("primary-fill");
		};
		//If a name isn't selected make sure the Check Out button isn't highlited
		if (!$(".studentCheck").hasClass("selected")){
			$("#checkOut").addClass("disabled");
			$("#checkOut").removeClass("primary-fill");
		};


	},

	checkOut: function(e) {
		//Get the Array
		var that = this;
		var query = new Parse.Query("NewBook");
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		query.equalTo("User", currentUserId);
		query.equalTo("ISBN", that.ISBN);
		query.first({
			success: function(usersBooks) {
				console.log(usersBooks);
				var studentsCheck = usersBooks.attributes.studentList;
				var quantityAvailable = usersBooks.attributes.quantity_available;
				var quantityTotal = usersBooks.attributes.quantity_total;
				var title = usersBooks.attributes.title;
				
				console.log(studentsCheck);
				//Modifications to numbers
				if ((quantityAvailable - 1)>=0){
				quantityAvailable = quantityAvailable - 1;
				var quantityOut = quantityTotal - quantityAvailable;
				studentsCheck.push({"Name":that.studentName,"objectId":that.studentId});
				console.log("thisshouldhave" + studentsCheck);
				console.log(studentsCheck);
				
				var length = studentsCheck.length;
				var cutItem = undefined;
				var i;
				for (i = 0; i < length; i++) {
					var element = studentsCheck[i];
					var id = element.objectId;
					if (id == undefined) {
						cutItem = i;
					}
				}
				if (cutItem != undefined){
					studentsCheck.splice(cutItem,1);
				}
				console.log(studentsCheck);
				
				usersBooks.set("studentList",studentsCheck);
				usersBooks.set("quantity_available",quantityAvailable);
				usersBooks.set("quantity_out",quantityOut);
				
				usersBooks.save(null, {
					success: function(newBook) {
						var studentData = {"studentId":that.studentId, "ISBN":that.ISBN, "title":title};
						Parse.Cloud.run("studentCheckOut", studentData);
						Application.homeView.checkedOut = true;
						Application.router.navigate("#home" , {trigger: true});
					},
					error: function(newBook, error) {
						alert('Back to the drawing board');
						console.log(error);
					}
				});
				} else {
					navigator.notification.alert(
									'All copies have been checked out!',  // message
									function alertDismissed() {}, // callback
									'Oops!',            // title
									'OK'                  // buttonName
								);
				};
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			},
		});

	}



});

});

;require.register("views/editbook-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/editBook');

module.exports = View.extend({
	id: 'editBook-view',
	template: template,
	events: {
		'click #addBook':'addBook',
		'click #addPhoto':'addPhoto',
		'focus #title': 'footer',
		'focus #author': 'footer',
		'focus #numberAvailable': 'footer',
		'blur #title': 'footer',
		'blur #author': 'footer',
		'blur #numberAvailable': 'footer',
	},

	initialize: function() {
	},

	render: function() {
		var that = this;
		that.bookData = Application.editBookView.bookInfo;
		this.$el.html(this.template(that.bookData));
		//console.log(JSON.stringify(that.bookData));
		setTimeout(function(){$('select option[value="'+parseInt(Application.editBookView.bookInfo[0].quantity_total)+'"]').attr("selected",true);},200);
		setTimeout(function(){$("#title").val(Application.editBookView.bookInfo[0].title);},200);
		setTimeout(function(){$("#author").val(Application.editBookView.bookInfo[0].author);},200);
		setTimeout(function(){$("#isbn").val(Application.editBookView.bookInfo[0].ISBN);},200);
		return this;		
	},

	footer: function() {

		setTimeout(function(){
			if (($("#title").is(":focus")) || ($("#author").is(":focus")) || ($("#numberAvailable").is(":focus"))){
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

		addBook:function () {
		var that = this;
		var query = new Parse.Query("NewBook");
		var currentUser = Parse.User.current();
		var currentUserId = currentUser.id;
		query.equalTo("User", currentUserId);
		query.equalTo("ISBN", Application.editBookView.bookData[0].ISBN);
		console.log(Application.editBookView.bookData[0].ISBN)
		query.first({
			success: function(newBook) {
				var quantityAvailable = newBook.attributes.quantity_available;
				var quantityOldTotal = newBook.attributes.quantity_total;
				
				var that = this;
				var title = "";
				if($("#title").val().length>0){
					title = $("#title").val();
				}else{
					title = $("#title").attr("placeholder");
				}
				var author = "";
				if($("#author").val().length>0){
					author = $("#author").val();}
				else{
					author = $("#author").attr("placeholder");
				}
				var isbn = "";
				if($("#isbn").val().length>0){
					isbn = $("#isbn").val();}
				else{
					isbn = $("#isbn").attr("placeholder");
				}
				var numberAvailable = $("#numberAvailable").val();
				
				if(isbn.length!=13){
					navigator.notification.alert(
					"Please make sure you're using the 13 digit ISBN ",  // message
					function alertDismissed() {}, // callback
					'Try Again',            // title
					'OK'                  // buttonName
				);
				}else{
				
				numberAvailable = parseInt(numberAvailable);
	//			var quantityAvailable = newBook.attributes.quantity_available;
	//			var quantityOldTotal = newBook.attributes.quantity_total;
				var quantityDiff = numberAvailable - quantityOldTotal;
				quantityAvailable = quantityAvailable + quantityDiff; 
				var currentUser = Parse.User.current();
				var currentUserId = currentUser.id;
				var date = new Date();
				date = date.getTime();
				newBook.set("title", title);
				newBook.set("author", author);
				if ($(".custom-art").children('img').attr("src").length>0) {
					newBook.set("cover_image", $(".custom-art").children('img').attr("src"));
				}
				newBook.set("quantity_total", numberAvailable);
				newBook.set("quantity_available", quantityAvailable);
				newBook.set("User", currentUserId);
				newBook.set("studentList",[{}]);
				newBook.set("ISBN", isbn);
				newBook.save(null, {
					success: function(newBook) {
						Application.router.navigate("#bookList" , {trigger: true});
					},
					error: function(newBook, error) {
						alert('Back to the drawing board');
						console.log(error);
					}
				});
				}
			//end save book
			}
})
		},

		addPhoto: function() {
			var that = this;
			if (!window.plugins.filepicker) {
				alert("clicked");

				return;
			}

			var uploadSuccess = function(args) {
				if (args.result == 'didFinishPickingMediaWithInfo') {
					that.thumbnail_url = args.FPPickerControllerRemoteURL + '/convert?w=150';
					$(".no-icon").hide();
					$(".custom-art").show();
					$(".custom-art").html('<img src="'+that.thumbnail_url+'""></img>')

					//$('#picker').removeClass('background-image');
					//$('#picker').css('background-image', 'url(' + that.thumbnail_url + ')');
				}
			};

			var uploadError = function(args) {
				console.log('Error during Filepicker upload');
			};

			window.plugins.filepicker.pick(
				{
					dataTypes: ['image/*'],
					sourceNames: ['FPSourceCamera', 'FPSourceCameraRoll', 'FPSourceDropbox', 'FPSourceGoogleDrive', 'FPSourceGmail', 'FPSourceFacebook', 'FPSourceInstagram', 'FPSourceImagesearch']
				},
				uploadSuccess,
				uploadError
			);
		}

	});

});

;require.register("views/home-view", function(exports, require, module) {
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
						"We couldn't find a book with that ISBN number. Please check the ISBN numbers and try again.",  // message
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
											"We couldn't find a book with that ISBN number. Please check the ISBN numbers and try again.",  // message
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
});

;require.register("views/login-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/login');


module.exports = View.extend({
	id: 'login-view',
	template: template,
	events: {
		'click #login':'signIn',
		'click #login-have-account':'signUp',
		'click #forgot':'forgotPassword'
	},

	initialize: function() {

	},

	render: function () {
		this.$el.html(this.template());
		var current = Parse.User.current();
		if(current===null){
			$("#footer").addClass("hidden");
		}else if(current!=null){
			$("#footer").removeClass("hidden");
			$("#footer").addClass("visible");
		};
		return this;

	},

	signUp: function () {
		Application.router.navigate("#signup", {
			trigger: true
		});

	},

	signIn: function () {
		//do some signin magic
		var username = $('#login-email').val();
		var password =  $('#login-pass').val();


		if( username && password)
		{
			Parse.User.logIn(username,password, {
					success: function(user) {
						window.localStorage.setItem("username",username);
						Application.router.navigate("#home", {
								trigger: true
						});
					},
					error: function(user, error) {
					navigator.notification.alert(
						'Check your username or password.',  // message
						function alertDismissed() {}, // callback
						'Incorrect Login',            // title
						'OK'                  // buttonName
			);
					}
			});
		}
		else{
			navigator.notification.alert(
				'Please enter username and password',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
	},

	forgotPassword: function() {
		if($("#login-email").text){
			Parse.User.requestPasswordReset($("#login-email").val(), {
			  success: function() {
			  	navigator.notification.alert(
						'An email has been sent to '+$("#login-email").val(),   // message
						function alertDismissed() {}, // callback
						'Reset Password',            // title
						'OK'                  // buttonName
					);
			  	alert("A link was sent to "+$("#login-email").val()+" to reset your password.")
			  },
			  error: function(error) {
			    // Show the error message somewhere
			navigator.notification.alert(
				'First enter above the you used for Class Library.',   // message
				function alertDismissed() {}, // callback
				'Enter your email',            // title
				'OK'                  // buttonName
				);
			  }
			});
		} else {
			navigator.notification.alert(
				'Enter Email.',  // message
				function alertDismissed() {}, // callback
				'Enter the email used for Class Library and tap "Forgot your password?".',            // title
				'OK'                  // buttonName
				);
		}	
	},

	scanner: function ()  {
		var scanner = cordova.require("cordova/plugin/BarcodeScanner");

		scanner.scan(
			function (result) {
				Application.loginView.ISBN = result.text;
				Application.loginView.$el.trigger("getbookinfo");

			}, 
			function (error) {
				alert("Scanning failed: " + error);
			}
		);
	},

});

});

;require.register("views/settings-view", function(exports, require, module) {
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
								navigator.notification.alert(
									'Settings have been changed.',  // message
									function alertDismissed() {}, // callback
									'Changed',            // title
									'OK'                  // buttonName
								);
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
			
			function onConfirm(buttonIndex) {
				if (buttonIndex == 1) {
					window.localStorage.removeItem("userId");
					Parse.User.logOut();
					$("#footer").removeClass("visible");
					$("#footer").addClass("hidden");
					Application.router.navigate("#login", {
						trigger: true
					});
				}
			}
			
			navigator.notification.confirm(
				'Are you sure you want to logout?',  // message
				onConfirm,                  // callback to invoke
				'Log Out',            // title
				'Ok,Cancel'             // buttonLabels
			);

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

			function onPrompt(results) {
				if (results.buttonIndex == 1) {
					$.ajax({
						data: {
							body: results.input1,
							replyto: that.username 
						},
						url: "http://bohemian.webscript.io/classLibraryContact",
						type: "POST",
					});
				}
			}

			navigator.notification.prompt(
				'Please enter your message',  // message
				onPrompt,                  // callback to invoke
				'Help me',            // title
				['Ok','Cancel'],             // buttonLabels
				'Hi Albert!'                 // defaultText
			);

		},


	});
});

;require.register("views/signup-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/signup');

module.exports = View.extend({
	id: 'signup-view',
	template: template,
	events: {
		'click #create-account':'signUp',
		'click #have-account':'haveAccount'
	},

	initialize: function() {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	signUp: function () {
		var user = new Parse.User();
		var username = $('#sign-email').val();
		var password =  $('#sign-pass').val();
		user.set("username", username);
		user.set("password", password);
		user.set("email", username);

		user.signUp(null, {
			success: function(user) {
				//alert("Welcome to Class Library!");
		var quantityPrompt = {
			state0: { 
				title: "Success!",
				buttons: { "Continue": true, },
				position: { container: '', width: 270},
				submit: function(e,v,m,f){
					if (v == true) {
						Application.router.navigate("#home", {trigger: true});					
					}
				}	
					

			},
		};
		$.prompt(quantityPrompt);
				
			},
			error: function(user, error) {
				console.log(error);
				console.log(JSON.stringify(error));
				// Show the error message somewhere and let the user try again.
				// alert("Error: " + error.code + " " + error.message);
					navigator.notification.alert(
						error.message,  // message
						function alertDismissed() {}, // callback
						'Error',            // title
						'OK'                  // buttonName
					);
				}	
		});


	},

	haveAccount: function() {
		Application.router.navigate("#login", {
			trigger:true
		});
	},

	signIn: function () {
		//do some signin magic
		var username = $('#email').val();
		var password =  $('#password').val();
		var name = $('#name').val();

		if( username && password && name)
		{
			$.ajax({
				data: {
					"username":username,
					"password":password,
					"name":name					
				},
				url: Application.serverURL+"register",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				success: function (data) {
					window.localStorage.setItem("userId", userId);
					Application.router.navigate("#home", {
						trigger: true
					});

				},
				error: function (jqXHR, textStatus, errorThrown) {
					{
						navigator.notification.alert(
							'Please try again.',  // message
							function alertDismissed() {}, // callback
							'Error',            // title
							'OK'                  // buttonName
						);
					}
				}
			});
		}
		else{
			navigator.notification.alert (
				'Please fill out all fields.',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
	},

});

});

;require.register("views/student-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/student');
var templateBooks = require('./templates/bookListBooks');

module.exports = View.extend({
	id: 'student-view',
	template: template,
	templateBooks:templateBooks,
	events: {
		'click #filt-current':'currentBooks',
		'click #filt-past':'pastBooks',
	},

	initialize: function() {

	},

	render: function() {
		var that = this;
		that.currentBookArray = {};
		that.pastBookArray = {};
		this.$el.html(this.template());
		var currentUser = Parse.User.current();
		console.log(currentUser);
		var currentUserId = currentUser.id;
		var query = new Parse.Query("Student");
		query.equalTo("objectId", this.id);
		query.first({
			success:function(student) {
				var bookArray = JSON.stringify(student);
				var bookArray = JSON.parse(bookArray);
				that.bookArray = bookArray;	
				that.currentBookArray = that.bookArray.currentBooks;
				that.pastBookArray = that.bookArray.pastBooks;
				$('#wrapper').html(that.templateBooks(that.currentBooksArray));
			}
		})

		return this;
	},
	
	currentBooks: function() {
		var that = this;
		$('#filt-current').addClass("selected");
		$('#filt-past').removeClass("selected");
		$('#wrapper').html(that.templateBooks(that.currentBookArray));
	},
	
	pastBooks: function() {
		var that = this;
		$('#filt-current').removeClass("selected");
		$('#filt-past').addClass("selected");
		$('#wrapper').html(that.templateBooks(that.pastBookArray));
	}

});

});

;require.register("views/studentlist-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/studentList');

module.exports = View.extend({
	id: 'studentlist-view',
	template: template,
	events: {
		'click #add':'addStudent',
		'click .delete-name':'deleteStudent',
		'click .first-name':'studentPage'
	},

	initialize: function() {

	},

	render: function() {
		this.$el.html(this.template());
		var that = this;
		var currentUser = Parse.User.current();
		console.log(currentUser);
		var currentUserId = currentUser.id;
		var query = new Parse.Query("Student");
		query.limit(1000);
		query.equalTo("UserId", currentUserId);
		query.ascending("Name");
		query.find({
			success: function(students) {
				var studentArray = JSON.stringify(students);
				var studentArray = JSON.parse(studentArray);
				that.$el.html(that.template(studentArray));
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		return this;
	},

	append: function(){

	},

	addStudent: function () {
		Application.router.navigate("#addStudent", {trigger:true});
	},
	
	studentPage:function(e) {
		var studentId = $(e.currentTarget).data('id');
		Application.studentView.id = studentId;
		Application.router.navigate("#student", {trigger:true});
	},

	deleteStudent: function(e) {
		
		navigator.notification.confirm(
			'Are you sure you want to delete this student?',  // message
			function(buttonIndex){
				if (buttonIndex == 2)
				{
					var studentId = $(e.currentTarget).data('id');
					var Student = Parse.Object.extend("Student");
					var query = new Parse.Query(Student);
					query.get(studentId, {
						success: function(myObj) {
							// The object was retrieved successfully.
							myObj.destroy({});
							$("#"+studentId).remove();
		
						},
						error: function(object, error) {
							alert("This was not retreived correctly.");
						}
					});

				}
			},         // callback
			'Delete',            // title
			'Cancel, OK'                  // buttonName
		);
		//send call to delete student
	}

});

});

;require.register("views/templates/addBook", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <img src=\"";
  if (stack1 = helpers['image-url']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['image-url']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n        <div class=\"no-icon\"></div>\n        <div id=\"addPhoto\" class=\"button sm-btn secondary\">Add Photo</div>\n      ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        ";
  return buffer;
  }

  buffer += "<div id=\"header\">\n  <div class=\"back\">Cancel</div>\n  <h1>Add Book</h1>\n</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\" class=\"add-book\">\n\n    <div class=\"title-art\">\n      <div id=\"custom-art\"><img src=\"\"></div>\n      ";
  stack1 = helpers['if'].call(depth0, depth0['image-url'], {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <h2>"
    + escapeExpression(((stack1 = ((stack1 = depth0.ISBN),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n      <h3>\n        ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.ISBN),stack1 == null || stack1 === false ? stack1 : stack1.authors), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </h3>\n      <p id=\"numberAvailable\">Number Available: 1</p>\n    </div>\n\n    <div id=\"add-book\" class=\"ab-btn button primary-fill\">Add Book</div>\n    <div id=\"edit-quantity\" class=\"ab-btn button primary\">Edit Quantity</div>\n    "
    + "\n\n  </div> "
    + "\n</div> "
    + "\n\n";
  return buffer;
  });
});

;require.register("views/templates/addBookManually", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"header\">\n	<div class=\"back\">Cancel</div>\n  <h1>Add Book</h1>\n</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\" class=\"container add-scroll long-page\">\n    <div id=\"custom-art\"><img src=\"\"></div>\n		<div class=\"no-icon\"></div>\n    <div id=\"addPhoto\" class=\"button sm-btn secondary\">Add Photo</div>\n\n    <input id=\"title\" class=\"first-input\" type=\"text\" placeholder=\"Book Title\" />\n    <input id=\"author\" type=\"text\" placeholder=\"Book Author\" />\n    <input id=\"isbn\" type=\"number\" placeholder=\"Book ISBN\" value=\"";
  if (stack1 = helpers['book-isbn']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['book-isbn']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n    <select id=\"numberAvailable\" name=\"amount\" data-role=\"none\">\n      <option value=\"1\">1</option>\n      <option value=\"2\">2</option>\n      <option value=\"3\">3</option>\n      <option value=\"4\">4</option>\n      <option value=\"5\">5</option>\n      <option value=\"6\">6</option>\n      <option value=\"7\">7</option>\n      <option value=\"8\">8</option>\n      <option value=\"9\">9</option>\n      <option value=\"10\">10</option>\n    </select>\n\n    <div id=\"addBook\" class=\"button primary-fill\">Add Book</div>\n\n  </div> "
    + "\n</div> "
    + "\n\n";
  return buffer;
  });
});

;require.register("views/templates/addStudent", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<div id=\"header\">\n  <h1>Add Student</h1>\n    <div id=\"backButton\" class=\"back\">Back</div>\n</div>\n\n<div id=\"wrapper\" class=\"bottomless\">\n  <div id=\"scroller\" class=\"container\">\n\n    <input id=\"add-first\" class=\"first-input\" type=\"text\" autocorrect=\"off\" placeholder=\"Name\" />\n\n    <div id=\"add-student\" class=\"button primary-fill\">Add Student</div>\n\n  </div> "
    + "\n</div> "
    + "\n\n";
  return buffer;
  });
});

;require.register("views/templates/bookDetail", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	    <div class=\"title-art\">\n\n	    	";
  stack1 = helpers['if'].call(depth0, depth0.cover_image, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	      <h2>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n	      <h3>";
  if (stack1 = helpers.author) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.author; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n				<h4>ISBN: ";
  if (stack1 = helpers.ISBN) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ISBN; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n				<div class=\"availables\">\n					<span id=\"totalBooks\">";
  if (stack1 = helpers.quantity_total) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.quantity_total; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " Total</span>\n					<em>/</em>\n					<span id=\"availableBooks\">";
  if (stack1 = helpers.quantity_available) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.quantity_available; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " Available</span>\n				</div>\n				<div class=\"clearfix\"></div>\n				\n	    </div>\n	<div id=\"checkout-list\">\n		<h5>Copies loaned to:</h5>\n		  <ul id=\"studentlist\">\n		    ";
  stack1 = helpers.each.call(depth0, depth0.studentList, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		    </ul>	\n		</div>\n\n	    <div id=\"checkout-book\" class=\"ab-btn button primary-fill\">Check Out</div>\n	    <div id=\"checkin-book\" class=\"ab-btn button secondary\">Check In</div>\n	    <div id=\"edit-book\" class=\"ab-btn button primary\">Edit Book</div>\n	    <div id=\"remove-book-prompt\" data-id=\"";
  if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-title=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"ab-btn button secondary-fill\">Remove Book</div>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	      	<img src=\"";
  if (stack1 = helpers.cover_image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cover_image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n	      ";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n	      	<div class=\"no-icon\"></div>\n	      ";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		      <li class=\"first-name\">";
  if (stack1 = helpers.Name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li> \n			";
  return buffer;
  }

  buffer += "\n<div id=\"header\">\n  <div class=\"back\">Books</div>\n  <h1>Book Detail</h1>\n</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\" class=\"add-book\">\n\n  	";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  </div> "
    + "\n\n\n</div> "
    + "\n\n</div> ";
  return buffer;
  });
});

;require.register("views/templates/bookList", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<div id=\"header\" class=\"extended-header\">\n	<div id=\"add\" class=\"plus-btn\">\n		<span>Add</span>\n		<div class=\"plus\"></div>\n	</div>\n  <h1>Books</h1>\n  <div id=\"filter-wrap\">\n  	<div class=\"filter\">\n		<span id=\"filt-all\" class=\"selected\">All Books</span>\n  		<span id=\"filt-available\">Available</span>\n  		<span id=\"filt-checked\">Checked Out</span>\n  	</div>\n	</div>\n</div>\n\n<div id=\"wrapper\" class=\"booklist-wrap\">\n\n</div> "
    + "\n\n";
  return buffer;
  });
});

;require.register("views/templates/bookListBooks", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<ul id=\"booklist\">\n		";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<li data-id=\"";
  if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"bookItem\">\n			";
  stack1 = helpers['if'].call(depth0, depth0.cover_image, {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<div class=\"book-meta\">\n				<h2 class=\"truncate-two\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n				<h3 class=\"truncate\">";
  if (stack1 = helpers.author) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.author; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n				";
  stack1 = helpers['if'].call(depth0, depth0.quantity_available, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</li>\n		";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<img data-original=\"";
  if (stack1 = helpers.cover_image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cover_image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"lazy\">\n			";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n			<div class=\"no-art\">\n				<div class=\"no-icon\"></div>\n			</div>\n			";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<p>";
  if (stack1 = helpers.quantity_available) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.quantity_available; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " Available</p>\n				";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\n	<h2>No Books</h2>\n	";
  }

  buffer += "\n<div id=\"scroller\" class=\"usersBooks\">\n	";
  stack1 = helpers['if'].call(depth0, depth0, {hash:{},inverse:self.program(9, program9, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div> ";
  return buffer;
  });
});

;require.register("views/templates/checkIn", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = helpers['if'].call(depth0, depth0.cover_image, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	<div class=\"title-info\">\n		<h2 class=\"truncate-three\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n		<h3 class=\"truncate\">";
  if (stack1 = helpers.author) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.author; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n		"
    + "\n		<p>";
  if (stack1 = helpers.quantity_available) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.quantity_available; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " Available</p>\n		<div id=\"checkIn\" class=\"check-btn button disabled\">Check In</div> "
    + "\n	</div>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<div class=\"title-art\">\n				<img src=\"";
  if (stack1 = helpers.cover_image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cover_image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n			</div>\n		";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n			<div class=\"no-art\">\n				<div class=\"no-icon\"></div>\n			</div>\n	";
  }

  buffer += "<div id=\"header\">\n	<div class=\"back\">Books</div>\n	<h1>Check In</h1>\n</div>\n\n<div class=\"check\">\n	";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</div> "
    + "\n<div class=\"clearfix\"></div>\n\n<div class=\"name-header\">Pick your name</div>\n\n<div id=\"wrapper\" class=\"check-wrap\">\n	<div id=\"scroller\" class=\"students\">\n	</div> "
    + "\n</div> ";
  return buffer;
  });
});

;require.register("views/templates/checkOut", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = helpers['if'].call(depth0, depth0.cover_image, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	<div class=\"title-info\">\n		<h2 class=\"truncate-three\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n		<h3 class=\"truncate\">";
  if (stack1 = helpers.author) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.author; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n		"
    + "\n		<p>";
  if (stack1 = helpers.quantity_available) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.quantity_available; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " Available</p>\n		<div id=\"checkOut\" class=\"check-btn button disabled\">Check Out</div> "
    + "\n	</div>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<div class=\"title-art\">\n				<img src=\"";
  if (stack1 = helpers.cover_image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cover_image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n			</div>\n		";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n			<div class=\"no-art\">\n				<div class=\"no-icon\"></div>\n			</div>\n	";
  }

  buffer += "<div id=\"header\">\n	<div class=\"back\">Books</div>\n	<h1>Check Out</h1>\n</div>\n\n<div class=\"check\">\n	";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</div> "
    + "\n<div class=\"clearfix\"></div>\n\n<div class=\"name-header\">Pick your name</div>\n\n<div id=\"wrapper\" class=\"check-wrap\">\n	<div id=\"scroller\" class=\"students\">\n	</div> "
    + "\n</div> ";
  return buffer;
  });
});

;require.register("views/templates/editBook", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"custom-art\" style=\"width:150px;margin:10px auto 0;\">\n          <img src=\"";
  if (stack1 = helpers.cover_image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cover_image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        </div>\n          <div class=\"no-icon\"></div>\n    <div id=\"addPhoto\" class=\"button sm-btn secondary\">Change Photo</div>\n\n    <input id=\"title\" class=\"first-input\" type=\"text\" placeholder=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n    <input id=\"author\" type=\"text\" placeholder=\"";
  if (stack1 = helpers.author) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.author; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n    <input id=\"isbn\" type=\"number\" placeholder=\"";
  if (stack1 = helpers.ISBN) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ISBN; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n    <select id=\"numberAvailable\" name=\"amount\" data-role=\"none\">\n      <option value=\"1\">1</option>\n      <option value=\"2\">2</option>\n      <option value=\"3\">3</option>\n      <option value=\"4\">4</option>\n      <option value=\"5\">5</option>\n      <option value=\"6\">6</option>\n      <option value=\"7\">7</option>\n      <option value=\"8\">8</option>\n      <option value=\"9\">9</option>\n      <option value=\"10\">10</option>\n    </select>\n    ";
  return buffer;
  }

  buffer += "<div id=\"header\">\n	<div class=\"back\">Cancel</div>\n  <h1>Edit Book</h1>\n</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\" class=\"container add-scroll long-page\">\n    ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div id=\"addBook\" class=\"button primary-fill\">Save Book</div>\n\n  </div> "
    + "\n</div> "
    + "\n\n";
  return buffer;
  });
});

;require.register("views/templates/home", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<div id=\"header\">\n	<h1>Home</h1>\n</div>\n\n<div id=\"wrapper\">\n	<div id=\"scroller\" class=\"home\">\n		<div id=\"checkOut\" class=\"check-out button primary-fill\">Check Out</div>\n		<div id=\"checkIn\" class=\"check-in button secondary\">Check In</div>\n	</div> "
    + "\n</div> ";
  return buffer;
  });
});

;require.register("views/templates/login", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<div id=\"header\">\n  <h1>Login</h1>\n</div>\n\n<div id=\"wrapper\" class=\"bottomless\">\n  <div id=\"scroller\" class=\"container\">\n\n    <h2>First things first.</h2>\n    <input id=\"login-email\" type=\"email\" autocomplete=\"off\" placeholder=\"Email\" />\n    <input id=\"login-pass\" type=\"password\" placeholder=\"Password\" />\n\n    <div id=\"login\" class=\"button primary-fill\">Sign In</div>\n    <div id=\"login-have-account\" class=\"button primary\">Create an Account</div>\n    <div id=\"forgot\">Forgot your password?</div>\n"
    + "\n\n  </div> "
    + "\n</div> "
    + "\n\n";
  return buffer;
  });
});

;require.register("views/templates/settings", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"header\">\n  <h1>Settings</h1>\n</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\" class=\"container settings-scroll long-page\">\n\n    "
    + "\n    <input id=\"set-email\" type=\"email\" autocomplete=\"off\" placeholder=\"Email\" value=\"";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n    <input id=\"set-current\" type=\"password\" placeholder=\"Current Password\" />\n    <input id=\"set-new\" type=\"password\" placeholder=\"New Password\" />\n    <input id=\"set-new-confirm\" type=\"password\" placeholder=\"Confirm New Password\" />\n\n    <div id=\"save\" class=\"button primary\">Update Account</div>\n    <div id=\"logout\" class=\"button secondary-fill\">Log Out</div>\n    <div id=\"help\" class=\"button primary\">Help Me</div>\n\n  </div> "
    + "\n</div> "
    + "\n";
  return buffer;
  });
});

;require.register("views/templates/signup", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<div id=\"header\">\n  <div class=\"back\">Cancel</div>\n  <h1>Sign Up</h1>\n</div>\n\n<div id=\"wrapper\" class=\"bottomless\">\n  <div id=\"scroller\" class=\"container\">\n\n    <h2>This'll be quick.</h2>\n    "
    + "\n    <input id=\"sign-email\" type=\"email\" autocomplete=\"off\" placeholder=\"Email\" />\n    <input id=\"sign-pass\" type=\"password\" placeholder=\"Password\" />\n    <input id=\"sign-pass-confirm\" type=\"password\" placeholder=\"Confirm Password\" />\n\n    <div id=\"create-account\" class=\"button primary-fill\">Create Account</div>\n    <div id=\"have-account\" class=\"button primary\">I have an Account</div>\n	"
    + "\n\n  </div> "
    + "\n</div> "
    + "\n\n";
  return buffer;
  });
});

;require.register("views/templates/student", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<div id=\"header\" class=\"extended-header\">\n  <h1>Student</h1>\n  <div id=\"filter-wrap\">\n  	<div class=\"filter\">\n		<span id=\"filt-current\" class=\"selected\">Current Books</span>\n  		<span id=\"filt-past\">Past Books</span>\n  	</div>\n	</div>\n</div>\n\n<div id=\"wrapper\" class=\"booklist-wrap\">\n\n</div> ";
  return buffer;
  });
});

;require.register("views/templates/studentList", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  		<li id=\"";
  if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  			<p data-id=\"";
  if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"first-name\">";
  if (stack1 = helpers.Name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p> \n			<p data-id=\"";
  if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"delete-name\">Delete</p>\n  		</li>\n	";
  return buffer;
  }

  buffer += "<div id=\"header\">\n	<h1>Students</h1>\n  <div id=\"add\" class=\"plus-btn\">\n    <span>Add</span>\n    <div class=\"plus\"></div>\n  </div>\n</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\" class=\"students\">\n  	<ul id=\"studentlist\">\n	";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  	</ul>\n\n  </div> "
    + "\n</div> ";
  return buffer;
  });
});

;require.register("views/templates/studentListCheck", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<li data-id=\"";
  if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.Name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"studentCheck\">";
  if (stack1 = helpers.Name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "<div class=\"student-check\"></div></li>\n	";
  return buffer;
  }

  buffer += "<ul id=\"studentlist\">\n	";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  });
});

;require.register("views/view", function(exports, require, module) {
require('lib/view_helper');

// Base class for all views.
module.exports = Backbone.View.extend({
  initialize: function() {
    this.render = _.bind(this.render, this);
  },

  template: function() {},
  getRenderData: function() {},

  render: function() {
    this.$el.html(this.template(this.getRenderData()));
    this.afterRender();
    return this;
  },

  afterRender: function() {}
});

});

;
//@ sourceMappingURL=app.js.map