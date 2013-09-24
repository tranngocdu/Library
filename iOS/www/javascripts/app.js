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
		var BookDetail = require('views/bookdetail-view');
		var BookList = require('views/booklist-view');
		var CheckIn = require('views/checkin-view');
		var CheckOut = require('views/checkout-view');
		var EnterPassword = require('views/enterpassword-view');
		var Login = require('views/login-view');
		var Settings = require('views/settings-view');
		var Signup = require('views/signup-view');
		
		var Router = require('lib/router');


		this.homeView = new Home();
		this.addBookView = new AddBook();
		this.bookDetailView = new BookDetail();
		this.bookListView = new BookList();
		this.checkInView = new CheckIn();
		this.checkOutView = new CheckOut();
		this.enterPasswordView = new EnterPassword();
		this.loginView = new Login();
		this.settingsView = new Settings();
		this.signupView = new Signup();
		
		this.router = new Router();


		if (typeof Object.freeze === 'function') Object.freeze(this);
		// Initializing BackStack.StackNavigator for the #container div
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
		'':'login',
		'home':'home',
		'addBook':'addBook',
		'bookDetail':'bookDetail',
		'bookList':'bookList',
		'checkIn':'checkIn',
		'checkOut':'checkOut',
		'enterPassword':'enterPassword',
		'login':'login',
		'settings':'settings',
		'signup':'signup'
		
	},

	initialize:function () {
		// Handle back button throughout the application or menu buttons
		$('#back-button').on('vclick', function(e) {
			e.preventDefault();
			$.mobile.activePage.back = true;
			window.history.back();
		});

		$('.navbar-close').on('vclick', function(e) {
			e.preventDefault();
			$.mobile.activePage.back = true;
			window.history.back();
		});

		// Loading spinner
		//$('body').append('<div id="theSpinner" class="spinnerModal" style="display:none"><div class="spinnerContainer"><div class="spinnerWrapper"><div class="spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div></div><div class="description">Pencils Ready!</div></div></div>');

		// First page logic
		this.firstPage = true;

	},

	//Functions for changing pages
	home:function() {
		this.changePage(Application.homeView);
	},

	addBook:function() {
		this.changePage(Application.addBookView);
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
	enterPassword:function() {
		this.changePage(Application.enterPasswordView);
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
module.exports = Backbone.Model.extend({
	url: function() {
		//return 'appcallurl.json';
	},
	handle: function(){

		return {"descriptive_name": this.toJSON()};

	}

});
});

;require.register("models/collection", function(exports, require, module) {
// Base class for all collections.
module.exports = Backbone.Collection.extend({
  
});

});

;require.register("models/library", function(exports, require, module) {
var Book = require('./book');

module.exports = Backbone.Collection.extend({
	model: Book,
	url: function() {
		return 'ServerCallurl.json';
	},
	handle: function(){

		return {"DescriptiveName": this.toJSON()};

	}

});
});

;require.register("models/model", function(exports, require, module) {
// Base class for all models.
module.exports = Backbone.Model.extend({
  
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
		'click #quantity':'quantitySelector',

	},

	initialize: function() {

	},

	render: function() {
		this.$el.html(this.template());
		this.username = window.localStorage.setItem("userId", userId);
	
		return this;
	},
	
	done: function() {
		var ISBN = $('#ISBN').val();
		var quantity = $('#studentName').val();
		var username = this.username;

		if( ISBN && studentName)
		{
			$.ajax({
				data: {
					"username":username,
					"ISBN":ISBN,
					"quantity":quantity,
				},
				url: Application.serverURL+"register",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				success: function (data) {
					navigator.notification.alert(
						'Book Added',  // message
						function alertDismissed() {}, // callback
						'Success',            // title
						'OK'                  // buttonName
					);
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
					{
						navigator.notification.alert(
							'Unable to add book at this time.',  // message
							function alertDismissed() {}, // callback
							'Error',            // title
							'OK'                  // buttonName
						);
					}
				}
			});
		}
		else{
			navigator.notification.alert(
				'Please scan book and select quantity',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
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
		"dataLoaded":"append"
	},

	initialize: function() {

	},

	render: function() {
		this.bookDetail = new Book();
		this.bookDetail.bookJSON ={};
		this.$el.html(this.template(this.bookDetail.bookJSON));
		this.bookDetail.fetch({
			processData:true,
			xhrFields: {withCredentials: true},
			add:true,
			data: {"bookId":Application.bookDetailView.bookId},
			success: function(data){
				Application.bookDetailView.$el.trigger("dataLoaded");
			}
		});

		return this;
	},

	append: function(){
		this.bookDetail.bookJSON = this.bookDetail.handle();
		this.$el.html(this.template(this.bookDetail.bookJSON));
	}

});

});

;require.register("views/booklist-view", function(exports, require, module) {
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
		this.bookDetail.fetch({
			processData:true,
			xhrFields: {withCredentials: true},
			add:true,
			data: {"teacherId":Application.bookDetailView.teacherId},
			success: function(data){
				Application.bookListView.$el.trigger("dataLoaded");
			}
		});

		return this;
	},

	append: function(){
		this.bookList.libraryJSON = this.bookList.handle();
		this.$el.html(this.template(this.bookList.libraryJSON));
	}

});

});

;require.register("views/checkin-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/checkIn');

module.exports = View.extend({
	id: 'checkin-view',
	template: template,
	events: {
		'click #checkInButton':'checkIn',
	},

	initialize: function() {
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},
	
	checkIn:function () {
		var ISBN = $('#ISBN').val();
		var studentName = $('#studentName').val();

		if( ISBN && studentName)
		{
			$.ajax({
				data: {
					"studentName":studentName,
					"ISBN":ISBN,
				},
				url: Application.serverURL+"register",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				success: function (data) {
					navigator.notification.alert(
						'Thank you for returning your book',  // message
						function alertDismissed() {}, // callback
						'Success',            // title
						'OK'                  // buttonName
					);
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
					{
						navigator.notification.alert(
							'Unable to return book at this time.',  // message
							function alertDismissed() {}, // callback
							'Error',            // title
							'OK'                  // buttonName
						);
					}
				}
			});
		}
		else{
			navigator.notification.alert(
				'Please scan book and select name',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
	}

});

});

;require.register("views/checkout-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/checkOut');

module.exports = View.extend({
	id: 'checkout-view',
	template: template,
	events: {
		'click #checkOutButton':'checkOut',
	},

	initialize: function() {
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},
	
	checkOut:function () {
		var ISBN = $('#ISBN').val();
		var studentName = $('#studentName').val();

		if( ISBN && studentName)
		{
			$.ajax({
				data: {
					"studentName":studentName,
					"ISBN":ISBN,
				},
				url: Application.serverURL+"register",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				success: function (data) {
					navigator.notification.alert(
						'Enjoy Your Book!',  // message
						function alertDismissed() {}, // callback
						'Success',            // title
						'OK'                  // buttonName
					);
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
					{
						navigator.notification.alert(
							'Unable to checkout book at this time.',  // message
							function alertDismissed() {}, // callback
							'Error',            // title
							'OK'                  // buttonName
						);
					}
				}
			});
		}
		else{
			navigator.notification.alert(
				'Please scan book and select name',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
	}

});

});

;require.register("views/enterpassword-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/enterPassword');

module.exports = View.extend({
	id: 'enterPassword-view',
	template: template,
	events: {
		'click #submitPassword':'submit',
	},

	initialize: function() {
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},
	
	submit:function () {
		var password = $('#password').val();
		var teacherId = window.localStorage.getItem("userId", userId);

		if(password && teacherId)
		{
			$.ajax({
				data: {
					"password":password,
					"teacherId":teacherId,
				},
				url: Application.serverURL+"register",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				success: function (data) {
					Application.router.navigate("#settings", {
						trigger: true
					});
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
					{
						navigator.notification.alert(
							'Incorrect Password.',  // message
							function alertDismissed() {}, // callback
							'Error',            // title
							'OK'                  // buttonName
						);
					}
				}
			});
		}
		else{
			navigator.notification.alert(
				'Please enter password',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
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
		'click #library': 'library'
	},

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	checkIn: function () {
		Application.router.navigate("#checkIn", {
			trigger: true
		});

	},

	checkOut: function () {
		Application.router.navigate("#checkOut", {
			trigger: true
		});
	},

	library: function() {
		Application.router.navigate("#library", {
			trigger: true
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
		"dataLoaded":"append",
		'click #signup':'signUp',
		'click #signin':'signIn',
		'click #scanner':'scanner', 
		'getbookinfo':'bookinfo'

	},

	initialize: function() {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
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

 	bookinfo: function () {

 		$.ajax({
 				data: {
 						bibkeys: "ISBN:" + Application.loginView.ISBN,
 						jscmd: "data",
 						format: "json"
 				},
 				url: "http://openlibrary.org/api/books",
 				type: "GET",
 				success: function (data) {
 						alert("Success");
 						Application.loginView.bookdata = data;
 				},
				error: function (jqXHR,textStatus,errorThrown) {
 						alert("Error");
 				}

 		});

 	},

	signUp: function () {
		Application.router.navigate("#signUp", {
			trigger: true
		});

	},

	signIn: function () {
		//do some signin magic
		var username = $('#username').val();
		var password =  $('#password').val();

		if( username && password)
		{
			$.ajax({
				data: {
					"username":username,
					"password":password,
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
			navigator.notification.alert(
				'Please enter username and password',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
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
});

;require.register("views/signup-view", function(exports, require, module) {
var View = require('./view');
var template = require('./templates/signup');

module.exports = View.extend({
	id: 'signup-view',
	template: template,
	events: {
		"dataLoaded":"append",
		'click #signup':'signUp',
	},

	initialize: function() {

	},

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	signUp: function () {
		Application.router.navigate("#signUp", {
			trigger: true
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
			navigator.notification.alert(
				'Please enter all fields',  // message
				function alertDismissed() {}, // callback
				'All Fields Required',            // title
				'OK'                  // buttonName
			);
		}
	},

});

});

;require.register("views/templates/addBook", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "  <div id=\"multiple\">\n\n      <div>\n          <input type=\"radio\" name=\"option\" id=\"choice1\" value=\"Pizza\">\n          <span>Pizza</span>\n      </div>\n\n      <div>\n          <input type=\"radio\" name=\"option\" id=\"choice2\" value=\"Wings\">\n          <span>Wings</span>\n      </div>\n\n      <div>\n          <input type=\"radio\" name=\"option\" id=\"choice3\" value=\"Waffles\">\n          <span>Waffles</span>\n      </div>\n\n      <div>\n          <input type=\"radio\" name=\"option\" id=\"choice-own\" value=\"Other\">\n          <span>Other</span>\n      </div>\n\n      <div id=\"other-field\" class=\"hide\">\n        <input name=\"name\" id=\"myInput\" type=\"text\" placeholder=\"I want to eat ...\" />\n      </div>\n\n      <div>\n        <input type=\"submit\" class=\"submit\" id=\"submit\" value=\"Feed Me\" />\n      </div>\n\n  </div>\n\n  <textarea cols=\"40\" rows=\"2\" id=\"log\" placeholder=\"Food Log\"></textarea>";});
});

;require.register("views/templates/bookDetail", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"header\">Pull Refresh</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\">\n    <div id=\"pullDown\">\n      <span class=\"pullDownIcon\"></span><span class=\"pullDownLabel\" style=\"color:white;\">Pull down to refresh...</span>\n    </div>\n\n    <ul id=\"thelist\">\n      <li>Message 1</li>\n      <li>Message 2</li>\n      <li>Message 3</li>\n      <li>Message 4</li>\n      <li>Message 5</li>\n      <li>Message 6</li>\n      <li>Message 7</li>\n      <li>Message 8</li>\n      <li>Message 9</li>\n      <li>Message 10</li>\n      <li>Message 11</li>\n      <li>Message 12</li>\n      <li>Message 13</li>\n      <li>Message 14</li>\n      <li>Message 15</li>\n      <li>Message 16</li>\n      <li>Message 17</li>\n      <li>Message 18</li>\n      <li>Message 19</li>\n      <li>Message 20</li>\n    </ul>\n  </div>\n</div>\n\n<div id=\"footer\">Footer</div>";});
});

;require.register("views/templates/bookList", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"header\">Pull Refresh</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\">\n    <div id=\"pullDown\">\n      <span class=\"pullDownIcon\"></span><span class=\"pullDownLabel\" style=\"color:white;\">Pull down to refresh...</span>\n    </div>\n\n    <ul id=\"thelist\">\n      <li>Message 1</li>\n      <li>Message 2</li>\n      <li>Message 3</li>\n      <li>Message 4</li>\n      <li>Message 5</li>\n      <li>Message 6</li>\n      <li>Message 7</li>\n      <li>Message 8</li>\n      <li>Message 9</li>\n      <li>Message 10</li>\n      <li>Message 11</li>\n      <li>Message 12</li>\n      <li>Message 13</li>\n      <li>Message 14</li>\n      <li>Message 15</li>\n      <li>Message 16</li>\n      <li>Message 17</li>\n      <li>Message 18</li>\n      <li>Message 19</li>\n      <li>Message 20</li>\n    </ul>\n  </div>\n</div>\n\n<div id=\"footer\">Footer</div>";});
});

;require.register("views/templates/checkIn", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"header\">Pull Refresh</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\">\n    <div id=\"pullDown\">\n      <span class=\"pullDownIcon\"></span><span class=\"pullDownLabel\" style=\"color:white;\">Pull down to refresh...</span>\n    </div>\n\n    <ul id=\"thelist\">\n      <li>Message 1</li>\n      <li>Message 2</li>\n      <li>Message 3</li>\n      <li>Message 4</li>\n      <li>Message 5</li>\n      <li>Message 6</li>\n      <li>Message 7</li>\n      <li>Message 8</li>\n      <li>Message 9</li>\n      <li>Message 10</li>\n      <li>Message 11</li>\n      <li>Message 12</li>\n      <li>Message 13</li>\n      <li>Message 14</li>\n      <li>Message 15</li>\n      <li>Message 16</li>\n      <li>Message 17</li>\n      <li>Message 18</li>\n      <li>Message 19</li>\n      <li>Message 20</li>\n    </ul>\n  </div>\n</div>\n\n<div id=\"footer\">Footer</div>";});
});

;require.register("views/templates/checkOut", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"header\">Pull Refresh</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\">\n    <div id=\"pullDown\">\n      <span class=\"pullDownIcon\"></span><span class=\"pullDownLabel\" style=\"color:white;\">Pull down to refresh...</span>\n    </div>\n\n    <ul id=\"thelist\">\n      <li>Message 1</li>\n      <li>Message 2</li>\n      <li>Message 3</li>\n      <li>Message 4</li>\n      <li>Message 5</li>\n      <li>Message 6</li>\n      <li>Message 7</li>\n      <li>Message 8</li>\n      <li>Message 9</li>\n      <li>Message 10</li>\n      <li>Message 11</li>\n      <li>Message 12</li>\n      <li>Message 13</li>\n      <li>Message 14</li>\n      <li>Message 15</li>\n      <li>Message 16</li>\n      <li>Message 17</li>\n      <li>Message 18</li>\n      <li>Message 19</li>\n      <li>Message 20</li>\n    </ul>\n  </div>\n</div>\n\n<div id=\"footer\">Footer</div>";});
});

;require.register("views/templates/enterPassword", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"header\">Pull Refresh</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\">\n    <div id=\"pullDown\">\n      <span class=\"pullDownIcon\"></span><span class=\"pullDownLabel\" style=\"color:white;\">Pull down to refresh...</span>\n    </div>\n\n    <ul id=\"thelist\">\n      <li>Message 1</li>\n      <li>Message 2</li>\n      <li>Message 3</li>\n      <li>Message 4</li>\n      <li>Message 5</li>\n      <li>Message 6</li>\n      <li>Message 7</li>\n      <li>Message 8</li>\n      <li>Message 9</li>\n      <li>Message 10</li>\n      <li>Message 11</li>\n      <li>Message 12</li>\n      <li>Message 13</li>\n      <li>Message 14</li>\n      <li>Message 15</li>\n      <li>Message 16</li>\n      <li>Message 17</li>\n      <li>Message 18</li>\n      <li>Message 19</li>\n      <li>Message 20</li>\n    </ul>\n  </div>\n</div>\n\n<div id=\"footer\">Footer</div>";});
});

;require.register("views/templates/home", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"header\">Pull Refresh</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\">\n    <div id=\"pullDown\">\n      <span class=\"pullDownIcon\"></span><span class=\"pullDownLabel\" style=\"color:white;\">Pull down to refresh...</span>\n    </div>\n\n    <ul id=\"thelist\">\n      <li>Message 1</li>\n      <li>Message 2</li>\n      <li>Message 3</li>\n      <li>Message 4</li>\n      <li>Message 5</li>\n      <li>Message 6</li>\n      <li>Message 7</li>\n      <li>Message 8</li>\n      <li>Message 9</li>\n      <li>Message 10</li>\n      <li>Message 11</li>\n      <li>Message 12</li>\n      <li>Message 13</li>\n      <li>Message 14</li>\n      <li>Message 15</li>\n      <li>Message 16</li>\n      <li>Message 17</li>\n      <li>Message 18</li>\n      <li>Message 19</li>\n      <li>Message 20</li>\n    </ul>\n  </div>\n</div>\n\n<div id=\"footer\">Footer</div>";});
});

;require.register("views/templates/login", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"scanner\" style=\"padding-top:30px;\">Test</div>";});
});

;require.register("views/templates/settings", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "  <div id=\"multiple\">\n\n      <div>\n          <input type=\"radio\" name=\"option\" id=\"choice1\" value=\"Pizza\">\n          <span>Pizza</span>\n      </div>\n\n      <div>\n          <input type=\"radio\" name=\"option\" id=\"choice2\" value=\"Wings\">\n          <span>Wings</span>\n      </div>\n\n      <div>\n          <input type=\"radio\" name=\"option\" id=\"choice3\" value=\"Waffles\">\n          <span>Waffles</span>\n      </div>\n\n      <div>\n          <input type=\"radio\" name=\"option\" id=\"choice-own\" value=\"Other\">\n          <span>Other</span>\n      </div>\n\n      <div id=\"other-field\" class=\"hide\">\n        <input name=\"name\" id=\"myInput\" type=\"text\" placeholder=\"I want to eat ...\" />\n      </div>\n\n      <div>\n        <input type=\"submit\" class=\"submit\" id=\"submit\" value=\"Feed Me\" />\n      </div>\n\n  </div>\n\n  <textarea cols=\"40\" rows=\"2\" id=\"log\" placeholder=\"Food Log\"></textarea>";});
});

;require.register("views/templates/signup", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"header\">Pull Refresh</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\">\n    <div id=\"pullDown\">\n      <span class=\"pullDownIcon\"></span><span class=\"pullDownLabel\" style=\"color:white;\">Pull down to refresh...</span>\n    </div>\n\n    <ul id=\"thelist\">\n      <li>Message 1</li>\n      <li>Message 2</li>\n      <li>Message 3</li>\n      <li>Message 4</li>\n      <li>Message 5</li>\n      <li>Message 6</li>\n      <li>Message 7</li>\n      <li>Message 8</li>\n      <li>Message 9</li>\n      <li>Message 10</li>\n      <li>Message 11</li>\n      <li>Message 12</li>\n      <li>Message 13</li>\n      <li>Message 14</li>\n      <li>Message 15</li>\n      <li>Message 16</li>\n      <li>Message 17</li>\n      <li>Message 18</li>\n      <li>Message 19</li>\n      <li>Message 20</li>\n    </ul>\n  </div>\n</div>\n\n<div id=\"footer\">Footer</div>";});
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