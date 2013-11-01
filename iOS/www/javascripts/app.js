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
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
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

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
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
  		var BookList = require('views/booklist-view');
  		var CheckIn = require('views/checkin-view');
  		var CheckOut = require('views/checkout-view');
  		var EnterPassword = require('views/enterpassword-view');
  		var Login = require('views/login-view');
  		var Settings = require('views/settings-view');
  		var Signup = require('views/signup-view');
  		var StudentList = require('views/studentlist-view');
  		
  		var Router = require('lib/router');


  		this.homeView = new Home();
  		this.addBookView = new AddBook();
  		this.addStudentView = new AddStudent();
  		this.bookDetailView = new BookDetail();
  		this.bookListView = new BookList();
  		this.checkInView = new CheckIn();
  		this.checkOutView = new CheckOut();
  		this.enterPasswordView = new EnterPassword();
  		this.loginView = new Login();
  		this.settingsView = new Settings();
  		this.signupView = new Signup();
  		this.studentListView = new StudentList();
  		
  		this.router = new Router();


  		if (typeof Object.freeze === 'function') Object.freeze(this);
  		// Initializing BackStack.StackNavigator for the #container div
  		
  		var homeTab = function() {
  	    	if(window.tapReady){
  	           // window.tapReady = false;
  			      $('.tab').removeClass('active');
  			      $('#home_tab').addClass('active');

  			      Application.router.navigate("#home" , {trigger: true});
  			  }
  	      //activateTabs();
  	    }

  	    var bookListTab = function() {
  		if(window.tapReady){
  	           // window.tapReady = false;
  		      Application.router.navigate("#bookList" , {trigger: true});
  			  $('.tab').removeClass('active');
  		      $('#bookList_tab').addClass('active');

  		    }
  	    }
  	    var studentListTab = function() {
  	      if(window.tapReady){
  		      $('.tab').removeClass('active');
  		      $('#studentList_tab').addClass('active');
  		      Application.router.navigate("#studentList" , {trigger: true});

  		    }
  	    }
  	    var settingsTab =  function() {
  	      if(window.tapReady){
  		      $('.tab').removeClass('active');
  		      $('#settings_tab').addClass('active');
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
window.require.register("initialize", function(exports, require, module) {
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
window.require.register("lib/router", function(exports, require, module) {
  var application = require('application');

  module.exports = Backbone.Router.extend({

  	routes: {
  		// If you want to save login state, send them to a prelogin function which checks for login state
  		'':'preLogin',
  		'home':'home',
  		'addBook':'addBook',
  		'addStudent':'addStudent',
  		'bookDetail':'bookDetail',
  		'bookList':'bookList',
  		'checkIn':'checkIn',
  		'checkOut':'checkOut',
  		'enterPassword':'enterPassword',
  		'login':'login',
  		'settings':'settings',
  		'signup':'signup',
  		'studentList':'studentList'

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
  		$('body').append('<div id="footer" style="z-index:10000"><ul><li id="home_tab" class="active tab">Home</li><li id="bookList_tab" class="tab">Books</li><li id="studentList_tab" class="tab">Students</li><li id="settings_tab" class="tab">Settings</li></ul></div>');

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
  		studentList:function() {
  			this.changePage(Application.studentListView);
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
window.require.register("lib/view_helper", function(exports, require, module) {
  // Put your handlebars.js helpers here.
  
});
window.require.register("models/book", function(exports, require, module) {
  module.exports = Parse.Object.extend({
  	className: "book",
  	
  	handle: function(){

  		return {"descriptive_name": this.toJSON()};

  	}

  });
});
window.require.register("models/collection", function(exports, require, module) {
  // Base class for all collections.
  module.exports = Parse.Collection.extend({
    
  });
  
});
window.require.register("models/library", function(exports, require, module) {
  var Book = require('./book');

  module.exports = Parse.Collection.extend({
  	model: Book, 
  		

  	handle: function(){

  		return {"DescriptiveName": this.toJSON()};

  	}

  });
});
window.require.register("models/model", function(exports, require, module) {
  // Base class for all models.
  module.exports = Parse.Object.extend({
    
  });
  
});
window.require.register("models/student", function(exports, require, module) {
  module.exports = Parse.Object.extend({
  	className: "student",
  	
  	handle: function(){

  		return {"descriptive_name": this.toJSON()};

  	}

  });
});
window.require.register("views/addbook-view", function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/addBook');
  var passData=null;
  var totalAmount = "";

  module.exports = View.extend({
  	id: 'addbook-view',
  	template: template,
  	events: {
  		"dataLoaded":"append",
  		'click #done':'addBook',
  		'click #edit-quantity':'quantity',
  		'click #add-book':'addBook'
  	},

  	initialize: function() {

  	},

  	render: function() {
  		var data = Application.addBookView.bookData;
  		var passData = data;
  		console.log(passData);
  		var dataString = JSON.stringify(data);
  		var combinedString = dataString.substring(0,6) + dataString.substring(20);
  		var data=JSON.parse(combinedString);
  		this.bookData = data;
  		this.$el.html(this.template(data));
  		
  		return this;
  	},
  	
  	addBook: function() {

  		var currentUser = Parse.User.current();
  		var currentUserId = currentUser.id;
  		var NewBook=Parse.Object.extend("NewBook");
  		var newBook=new NewBook();
  		newBook.set("title", this.bookData.ISBN.title);
  		//newBook.set("User", currentUserId);
  		console.log(currentUser);
  		var lengthAuthors = this.bookData.ISBN.authors.length;
  		var i = 0;
  		var authorArray = new Array ();
  		while (i < lengthAuthors) {
  				authorArray.push(this.bookData.ISBN.authors[i].name);
  				i++;
  			}
  			authorArray = authorArray.toString();
  			newBook.set("author", authorArray);
  			if (typeof this.bookData.ISBN.cover!='undefined'){
  			newBook.set("cover_image", this.bookData.ISBN.cover.medium);
  		};
  			newBook.set("quantity_total", "2");
  			newBook.set("quantity_out", "0");
  			newBook.set("User", currentUserId);
  			newBook.set("studentList",[{}]);
  			newBook.set("ISBN", this.bookData.ISBN.identifiers.isbn_13[0]);
  			newBook.save(null, {
  				success: function(newBook) {
  						Application.router.navigate("#bookList" , {trigger: true});
  				},
  				error: function(newBook, error) {
  					alert('Back to the drawing board');
  					console.log(error);
  				}
  			});
  	},

  	quantity: function() {
  		var data = Application.addBookView.bookData;
  		var quantityPrompt = {
  			state0: { 
  				title: "Edit Quantity",
  				buttons: { "Cancel": false, "Submit": true },
  				html:'<input type="number" name="amount" value="" style="font-size:18px;width:100%;text-align:center;">',
  				submit: function(e,v,m,f){
  					console.log(f.amount);
  					totalAmount=f.amount;
  				$("#numberAvailable").html("Number Available: "+totalAmount+"");
  				}
  			}
  		};
  		$.prompt(quantityPrompt);
  	},

  });
  
});
window.require.register("views/addstudent-view", function(exports, require, module) {
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
window.require.register("views/bookdetail-view", function(exports, require, module) {
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
  		var that=this;
  		var query = new Parse.Query("NewBook");
  		query.equalTo("objectId", Application.bookDetailView.bookId);
  		query.find({
  			
  			success: function(bookdetail) {

  				var bookdetailArray = JSON.stringify(bookdetail);
  				var bookdetailArray = JSON.parse(bookdetailArray);

  				console.log(bookdetailArray);				
  				that.$el.html(that.template(bookdetailArray));
  			},
  			error: function(error) {
  				alert("Error: " + error.code + " " + error.message);
  			}
  		});


  		
  		return this;
  	}

  });
  
});
window.require.register("views/booklist-view", function(exports, require, module) {
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
  		query.equalTo("User", currentUserId);
  		query.find({
  			success: function(usersBooks) {
  				var bookArray = JSON.stringify(usersBooks);
  				var bookArray = JSON.parse(bookArray);
  				that.bookArray = bookArray;	
  				$('.booklist-wrap').html(that.templateBooks(bookArray));				
  			},
  			error: function(error) {
  				alert("Error: " + error.code + " " + error.message);
  			}
  		});

  		return this;
  	},

  	allSelected: function() {
  		$('#filt-all').addClass("selected");
  		$('#filt-available').removeClass("selected");
  		$('#filt-checked').removeClass("selected");
  		var that = this;
  		this.$el.html(this.template());
  		var currentUser = Parse.User.current();
  		var currentUserId = currentUser.id;
  		var query = new Parse.Query("NewBook");
  		query.equalTo("User", currentUserId);
  		query.find({
  			success: function(usersBooks) {
  				var bookArray = JSON.stringify(usersBooks);
  				var bookArray = JSON.parse(bookArray);
  				that.bookArray = bookArray;				
  				$('#wrapper').html(that.templateBooks(bookArray));
  			},
  			error: function(error) {
  				alert("Error: " + error.code + " " + error.message);
  			}
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
  		query.notEqualTo("quantity_available","0");
  		query.find({
  			success: function(usersBooks) {

  				var bookArray = JSON.stringify(usersBooks);
  				var bookArray = JSON.parse(bookArray);
  				that.bookArray = bookArray;				
  				$('#wrapper').html(that.templateBooks(bookArray));
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
  		alert("and here");
  		
  		var that = this;
  		var currentUser = Parse.User.current();
  		var currentUserId = currentUser.id;
  		var query = new Parse.Query("NewBook");
  		query.equalTo("User", currentUserId);
  		query.equalTo("quantity_out","0");
  		query.find({
  			success: function(usersBooks) {

  				var bookArray = JSON.stringify(usersBooks);
  				var bookArray = JSON.parse(bookArray);
  				that.bookArray = bookArray;				
  				$('#wrapper').html(that.templateBooks(bookArray));
  			},
  			error: function(error) {
  				alert("Error: " + error.code + " " + error.message);
  			}
  		});

  	},

  	addBook: function() {
  		var scanner = cordova.require("cordova/plugin/BarcodeScanner");

  		scanner.scan(
  			function (result) {
  				Application.bookListView.ISBN = result.text;
  				Application.bookListView.$el.trigger("getbookinfo");

  			}, 
  			function (error) {
  				alert("Scanning failed: " + error);
  			}
  		);
  	},
  	
  	bookDetail: function(e) {
  		Application.bookDetailView.bookId = $(e.currentTarget).data('id');
  		Application.router.navigate("#bookDetail", {trigger:true});
  		
  	},

  	getBookInfo: function() {
  		$.ajax({
  			data: {
  				bibkeys: "ISBN:" + Application.bookListView.ISBN,
  				jscmd: "data",
  				format: "json"
  			},
  			url: "http://openlibrary.org/api/books",
  			type: "GET",
  			success: function (data) {
  				alert(Application.bookListView.ISBN);
  				Application.addBookView.bookData = data;
  				Application.router.navigate("#addBook", {
  					trigger: true
  				});

  			},
  			error: function (jqXHR,textStatus,errorThrown) {
  				alert("Error");
  			}

  		});
  	}

  });


  
});
window.require.register("views/checkin-view", function(exports, require, module) {
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
  		var currentUser = Parse.User.current();
  		var currentUserId = currentUser.id;
  		var query = new Parse.Query("NewBook");
  		that.ISBN = Application.checkInView.bookInfo.ISBN.identifiers.isbn_13[0];
  		query.equalTo("User", currentUserId);
  		query.equalTo("ISBN", Application.checkInView.bookInfo.ISBN.identifiers.isbn_13[0]);

  		query.first({
  			success: function(bookData) {
  				console.log(bookData);
  				var studentBookList = bookData.attributes.studentList;
  				console.log(studentBookList);
  				$('.students').html(that.templateStudents(studentBookList));
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

  			$("#checkIn").removeClass("disabled");
  			$("#checkIn").addClass("primary-fill");
  		}
  		//Just highlite the damn thing already
  		else {
  			$(".studentCheck").removeClass("deselected");
  			$(".studentCheck").removeClass("selected");
  			$(".studentCheck").addClass("deselected");
  			$(e.currentTarget).removeClass("deselected");
  			$(e.currentTarget).addClass("selected");
  			$("#checkIn").removeClass("disabled");
  			$("#checkIn").addClass("primary-fill");
  		};
  		//If a name isn't selected make sure the Check Out button isn't highlited
  		if (!$(".studentCheck").hasClass("selected")){
  			$("#checkIn").addClass("disabled");
  			$("#checkIn").removeClass("primary-fill");
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
  				usersBooks.save(null, {
  					success: function(newBook) {
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
window.require.register("views/checkout-view", function(exports, require, module) {
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
  		this.$el.html(this.template(data));
  		var currentUser = Parse.User.current();
  		var currentUserId = currentUser.id;
  		var query = new Parse.Query("Student");
  		query.equalTo("UserId", currentUserId);
  		query.find({
  			success: function(students) {
  				var studentArray = JSON.stringify(students);
  				var studentArray = JSON.parse(studentArray);
  				console.log(studentArray);
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
  		query.equalTo("title", data.ISBN.title);
  		query.first({
  			success: function(usersBooks) {

  				var studentsCheck = usersBooks.attributes.studentList;
  				console.log(studentsCheck);
  				studentsCheck.push({"Name":that.studentName,"objectId":that.studentId});
  				var length = studentsCheck.length;
  				var cutItem = undefined;
  				var i;
  				for (i = 0; i < length; i++) {
  					var element = studentsCheck[i];
  					var id = element.id;
  					if (id == undefined) {
  						cutItem = i;
  					}
  				}
  				if (cutItem != undefined){
  					studentsCheck.splice(cutItem,1);
  				}

  				usersBooks.set("studentList",studentsCheck);
  				usersBooks.save(null, {
  					success: function(newBook) {
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
window.require.register("views/enterpassword-view", function(exports, require, module) {
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
window.require.register("views/home-view", function(exports, require, module) {
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
  		return this;
  	},

  	checkOut: function ()  {
  		var scanner = cordova.require("cordova/plugin/BarcodeScanner");

  		scanner.scan(
  			function (result) {
  				Application.homeView.ISBN = result.text;
  				Application.homeView.$el.trigger("bookInfoCheckout");

  			}, 
  			function (error) {
  				alert("Scanning failed: " + error);
  			}
  		);
  	},

  	checkIn: function () {
  		var scanner = cordova.require("cordova/plugin/BarcodeScanner");

  		scanner.scan(
  			function (result) {
  				Application.homeView.ISBN = result.text;
  				Application.homeView.$el.trigger("bookInfoCheckin");

  			}, 
  			function (error) {
  				alert("Scanning failed: " + error);
  			}
  		);

  	},

  	bookList: function () {
  		Application.router.navigate("#bookList", {trigger:true});
  	},

  	studentList: function () {
  		Application.router.navigate("#studentList", {trigger:true});
  	},

  	bookInfoCheckout: function () {

  		$.ajax({
  			data: {
  				bibkeys: "ISBN:" + Application.homeView.ISBN,
  				jscmd: "data",
  				format: "json"
  			},
  			url: "http://openlibrary.org/api/books",
  			type: "GET",
  			success: function (data) {
  				var dataString = JSON.stringify(data);
  				var combinedString = dataString.substring(0,6) + dataString.substring(20);
  				var data = JSON.parse(combinedString);
  				alert(data);
  				Application.checkOutView.bookInfo = data;
  				console.log(Application.checkOutView.bookInfo);
  				Application.router.navigate("#checkOut", {
  					trigger: true
  				});
  			},
  			error: function (jqXHR,textStatus,errorThrown) {
  				alert("Error");
  			}

  		});

  	},
  	
  	bookInfoCheckin: function () {

  		$.ajax({
  			data: {
  				bibkeys: "ISBN:" + Application.homeView.ISBN,
  				jscmd: "data",
  				format: "json"
  			},
  			url: "http://openlibrary.org/api/books",
  			type: "GET",
  			success: function (data) {
  				var dataString = JSON.stringify(data);
  				var combinedString = dataString.substring(0,6) + dataString.substring(20);
  				var data = JSON.parse(combinedString);
  				Application.checkInView.bookInfo = data;
  				Application.router.navigate("#checkIn", {
  					trigger: true
  				});
  			},
  			error: function (jqXHR,textStatus,errorThrown) {
  				alert("Error");
  			}

  		});

  	}


  });
});
window.require.register("views/login-view", function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/login');


  module.exports = View.extend({
  	id: 'login-view',
  	template: template,
  	events: {
  		'click #login':'signIn',
  		'click #login-have-account':'signUp'
  	},

  	initialize: function() {

  	},

  	render: function () {
  		this.$el.html(this.template());
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
  							alert("Login Failed");
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
window.require.register("views/settings-view", function(exports, require, module) {
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
  		var that = this;
  		this.$el.html(this.template());
  		var query = new Parse.Query("User");
  		var currentUser = Parse.User.current();
  		var currentUserId = currentUser.id;
  		query.equalTo("objectId", currentUserId);
  		query.first({
  			success: function(userData) {
  				var userInfo = JSON.stringify(userData);
  				var userArray = JSON.parse(userInfo);
  				console.log(userArray);
  				that.$el.html(that.template(userArray));

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
});
window.require.register("views/signup-view", function(exports, require, module) {
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

  		user.signUp(null, {
  			success: function(user) {
  				alert("Success!");
  				Application.router.navigate("#home", {
  					trigger: true
  				});
  			},
  			error: function(user, error) {
  				// Show the error message somewhere and let the user try again.
  				alert("Error: " + error.code + " " + error.message);
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
window.require.register("views/studentlist-view", function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/studentList');

  module.exports = View.extend({
  	id: 'studentlist-view',
  	template: template,
  	events: {
  		'click #add':'addStudent',
  		'click .delete-name':'deleteStudent'
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
  		query.equalTo("UserId", currentUserId);
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

  	deleteStudent: function(e) {
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
  		
  		/*navigator.notification.confirm(
  			'Are you sure you want to delete this student?',  // message
  			function(buttonIndex){
  				if (buttonIndex == 2)
  				{
  					var Student = Parse.Object.extend("Student");
  					var query = new Parse.Query(Student);
  					query.get(studentId, {
  					  success: function(myObj) {
  					    // The object was retrieved successfully.
  					    myObj.destroy({});
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
  		*/
  	}

  });
  
});
window.require.register("views/templates/addBook", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n	  ";
    if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\n	  ";
    return buffer;
    }

    buffer += "<div id=\"header\">\n  <div class=\"back\">Cancel</div>\n  <h1>Add Book</h1>\n</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\" class=\"add-book\">\n\n    <div class=\"title-art\">\n      <img src=\""
      + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.ISBN),stack1 == null || stack1 === false ? stack1 : stack1.cover)),stack1 == null || stack1 === false ? stack1 : stack1.medium)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "\">\n      <h2>"
      + escapeExpression(((stack1 = ((stack1 = depth0.ISBN),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "</h2>\n      <h3>";
    stack2 = helpers.each.call(depth0, ((stack1 = depth0.ISBN),stack1 == null || stack1 === false ? stack1 : stack1.authors), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack2 || stack2 === 0) { buffer += stack2; }
    buffer += "</h3>\n      <h4>ISBN Number</h4>\n      <p id=\"numberAvailable\"></p>\n    </div>\n\n    <div id=\"add-book\" class=\"ab-btn button primary-fill\">Add Book</div>\n    <div id=\"edit-quantity\" class=\"ab-btn button primary\">Edit Quantity</div>\n    <div id=\"remove-book\" class=\"ab-btn button secondary\">Remove Book</div>\n\n  </div> "
      + "\n</div> "
      + "\n\n";
    return buffer;
    });
});
window.require.register("views/templates/addStudent", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    var buffer = "";


    buffer += "<div id=\"header\">\n  <h1>Add Student</h1>\n    <div id=\"backButton\" class=\"back\">Cancel</div>\n</div>\n\n<div id=\"wrapper\" class=\"bottomless\">\n  <div id=\"scroller\" class=\"container\">\n\n    <input id=\"add-first\" class=\"first-input\" type=\"text\" autocorrect=\"off\" placeholder=\"Name\" />\n\n    <div id=\"add-student\" class=\"button primary-fill\">Add Student</div>\n\n  </div> "
      + "\n</div> "
      + "\n";
    return buffer;
    });
});
window.require.register("views/templates/bookDetail", function(exports, require, module) {
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
      + "</h3>\n	      "
      + "\n	      <p>Number Available</p>\n	    </div>\n\n	    <div id=\"checkout-book\" class=\"ab-btn button primary-fill\">Check Out</div>\n	    <div id=\"edit-book\" class=\"ab-btn button primary\">Edit Quantity</div>\n	    <div id=\"remove-book\" class=\"ab-btn button secondary\">Remove Book</div>\n    ";
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
    
    
    return "\n	      		<span>No Cover Found</span>\n	      ";
    }

    buffer += "\n<div id=\"header\">\n  <div class=\"back\">Books</div>\n  <h1>Book Detail</h1>\n</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\" class=\"add-book\">\n\n  	";
    stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n\n  </div> "
      + "\n</div> ";
    return buffer;
    });
});
window.require.register("views/templates/bookList", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    var buffer = "";


    buffer += "<div id=\"header\" class=\"extended-header\">\n	<div id=\"add\" class=\"right-btn\">Add</div>\n  <h1>Books</h1>\n  <div id=\"filter-wrap\">\n  	<div class=\"filter\">\n		<span id=\"filt-all\" class=\"selected\">All Books</span>\n  		<span id=\"filt-available\">Available</span>\n  		<span id=\"filt-checked\">Checked Out</span>\n  	</div>\n	</div>\n</div>\n\n<div id=\"wrapper\" class=\"booklist-wrap\">\n\n</div> "
      + "\n\n";
    return buffer;
    });
});
window.require.register("views/templates/bookListBooks", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n      <li data-id=\"";
    if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\" class=\"bookItem\">\n        <img src=\"";
    if (stack1 = helpers.cover_image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.cover_image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\">\n        <div class=\"book-meta\">\n          <h2 class=\"truncate-two\">";
    if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</h2>\n          <h3 class=\"truncate\">";
    if (stack1 = helpers.author) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.author; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</h3>\n          <p>Number Available</p>\n        </div>\n      </li>\n    ";
    return buffer;
    }

    buffer += "\n  <div id=\"scroller\" class=\"usersBooks\">\n    <ul id=\"booklist\">\n    ";
    stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n    </ul>\n  </div> ";
    return buffer;
    });
});
window.require.register("views/templates/checkIn", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n          ";
    if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\n          ";
    return buffer;
    }

    buffer += "<div id=\"header\">\n  <div class=\"back\">Books</div>\n  <h1>Check In</h1>\n</div>\n<style type=\"text/css\">\n.selected {\n  background-color:#0a5fff;\n  color: white;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  padding-left:10px;\n}\n.deselected {\n  background-color:white!important;\n  color:black!important;\n}\n</style>\n\n<div class=\"check\">\n\n    <div class=\"title-art\">\n      <img src=\""
      + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.ISBN),stack1 == null || stack1 === false ? stack1 : stack1.cover)),stack1 == null || stack1 === false ? stack1 : stack1.medium)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "\">\n    </div>\n\n    <div class=\"title-info\">\n      <h2>"
      + escapeExpression(((stack1 = ((stack1 = depth0.ISBN),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "</h2>\n      <h3>\n          ";
    stack2 = helpers.each.call(depth0, ((stack1 = depth0.ISBN),stack1 == null || stack1 === false ? stack1 : stack1.authors), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack2 || stack2 === 0) { buffer += stack2; }
    buffer += "\n      </h3>\n      <h4>ISBN Number</h4>\n      <p>Number Available</p>\n      <div id=\"checkIn\" class=\"check-btn button disabled\">Check In</div> "
      + "\n    </div>\n\n    <div class=\"clearfix\"></div>\n</div>\n\n<div class=\"name-header\">Pick your name</div>\n\n<div id=\"wrapper\" class=\"check-wrap\">\n<div id=\"scroller\" class=\"students\">\n    \n    \n  </div> "
      + "\n</div> "
      + "\n\n";
    return buffer;
    });
});
window.require.register("views/templates/checkOut", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n          ";
    if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\n          ";
    return buffer;
    }

    buffer += "<div id=\"header\">\n  <div class=\"back\">Books</div>\n  <h1>Check Out</h1>\n</div>\n<style type=\"text/css\">\n.selected {\n  background-color:#0a5fff;\n  color: white;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  padding-left:10px;\n}\n.deselected {\n  background-color:white!important;\n  color:black!important;\n}\n</style>\n<div class=\"check\">\n\n    <div class=\"title-art\">\n      <img src=\""
      + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.ISBN),stack1 == null || stack1 === false ? stack1 : stack1.cover)),stack1 == null || stack1 === false ? stack1 : stack1.medium)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "\">\n    </div>\n\n    <div class=\"title-info\">\n      <h2>"
      + escapeExpression(((stack1 = ((stack1 = depth0.ISBN),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "</h2>\n      <h3>\n          ";
    stack2 = helpers.each.call(depth0, ((stack1 = depth0.ISBN),stack1 == null || stack1 === false ? stack1 : stack1.authors), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack2 || stack2 === 0) { buffer += stack2; }
    buffer += "\n      </h3>\n      <h4>ISBN Number</h4>\n      <p>Number Available</p>\n      <div id=\"checkOut\" class=\"check-btn button disabled\">Check Out</div> "
      + "\n    </div>\n\n    <div class=\"clearfix\"></div>\n</div>\n\n<div class=\"name-header\">Pick your name</div>\n\n<div id=\"wrapper\" class=\"check-wrap\">\n<div id=\"scroller\" class=\"students\">\n    \n    \n  </div> "
      + "\n</div> "
      + "\n\n";
    return buffer;
    });
});
window.require.register("views/templates/enterPassword", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    


    return "<div id=\"header\">Pull Refresh</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\">\n    <div id=\"pullDown\">\n      <span class=\"pullDownIcon\"></span><span class=\"pullDownLabel\" style=\"color:white;\">Pull down to refresh...</span>\n    </div>\n\n    <ul id=\"thelist\">\n      <li>Message 1</li>\n      <li>Message 2</li>\n      <li>Message 3</li>\n      <li>Message 4</li>\n      <li>Message 5</li>\n      <li>Message 6</li>\n      <li>Message 7</li>\n      <li>Message 8</li>\n      <li>Message 9</li>\n      <li>Message 10</li>\n      <li>Message 11</li>\n      <li>Message 12</li>\n      <li>Message 13</li>\n      <li>Message 14</li>\n      <li>Message 15</li>\n      <li>Message 16</li>\n      <li>Message 17</li>\n      <li>Message 18</li>\n      <li>Message 19</li>\n      <li>Message 20</li>\n    </ul>\n  </div>\n</div>\n";
    });
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    var buffer = "";


    buffer += "<div id=\"header\">\n	<h1>Library</h1>\n</div>\n\n<div id=\"wrapper\">\n	<div id=\"scroller\" class=\"home\">\n		<div id=\"checkOut\" class=\"check-out button primary-fill\">Check Out</div>\n		<div id=\"checkIn\" class=\"check-in button secondary\">Check In</div>\n	</div> "
      + "\n</div> ";
    return buffer;
    });
});
window.require.register("views/templates/login", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    var buffer = "";


    buffer += "<div id=\"header\">\n  <h1>Login</h1>\n</div>\n\n<div id=\"wrapper\" class=\"bottomless\">\n  <div id=\"scroller\" class=\"container\">\n\n    <h2>First things first.</h2>\n    <input id=\"login-email\" class=\"first-input\" type=\"email\" autocomplete=\"off\" placeholder=\"Email\" />\n    <input id=\"login-pass\" type=\"password\" placeholder=\"Password\" />\n\n    <div id=\"login\" class=\"button primary-fill\">Sign In</div>\n    <div id=\"login-have-account\" class=\"button primary\">Create an Account</div>\n    <div id=\"forgot\">Forgot your password?</div>\n\n    <div id=\"disclaimer\">\n      By creating an account you agree to our <a href=\"#\">Terms of Service</a> and <a href=\"#\">Privacy Policy</a>.\n    </div>\n\n  </div> "
      + "\n</div> "
      + "\n\n";
    return buffer;
    });
});
window.require.register("views/templates/settings", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    var buffer = "";


    buffer += "<div id=\"header\">\n  <h1>Settings</h1>\n  <div id=\"edit\" class=\"right-btn\">Edit</div>\n</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\" class=\"container\">\n\n    <input id=\"set-name\" class=\"first-input\" type=\"text\" autocorrect=\"off\" placeholder=\"Name\" value=\"Dimitar Karaytchev\" />\n    <input id=\"set-email\" type=\"email\" autocomplete=\"off\" placeholder=\"Email\" value=\"dimitar.k@me.com\"/>\n    <input id=\"set-current\" class=\"hide-hard\" type=\"password\" placeholder=\"Current Password\" />\n    <input id=\"set-new\" class=\"hide-hard\" type=\"password\" placeholder=\"New Password\" />\n    <input id=\"set-new-confirm\" class=\"hide-hard\" type=\"password\" placeholder=\"Confirm New Password\" />\n\n    "
      + "\n    "
      + "\n    <div id=\"help\" class=\"button primary\">Help Me</div>\n    <div id=\"logout\" class=\"button secondary-fill\">Log Out</div>\n\n  </div> "
      + "\n</div> "
      + "\n";
    return buffer;
    });
});
window.require.register("views/templates/signup", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    var buffer = "";


    buffer += "<div id=\"header\">\n  <div class=\"back\">Cancel</div>\n  <h1>Sign Up</h1>\n</div>\n\n<div id=\"wrapper\" class=\"bottomless\">\n  <div id=\"scroller\" class=\"container\">\n\n    <h2>This'll be quick.</h2>\n    "
      + "\n    <input id=\"sign-email\" type=\"email\" autocomplete=\"off\" placeholder=\"Email\" />\n    <input id=\"sign-pass\" type=\"password\" placeholder=\"Password\" />\n    <input id=\"sign-pass-confirm\" type=\"password\" placeholder=\"Confirm Password\" />\n\n    <div id=\"create-account\" class=\"button primary-fill\">Create Account</div>\n    <div id=\"have-account\" class=\"button primary\">I have an Account</div>\n\n    <div id=\"disclaimer\">\n      By creating an account you agree to our <a href=\"#\">Terms of Service</a> and <a href=\"#\">Privacy Policy</a>.\n    </div>\n\n  </div> "
      + "\n</div> "
      + "\n\n";
    return buffer;
    });
});
window.require.register("views/templates/studentList", function(exports, require, module) {
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
      + "\">\n  			<p class=\"first-name\">";
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

    buffer += "<div id=\"header\">\n	<h1>Student List</h1>\n	<div id=\"add\" class=\"right-btn\">Add</div>\n</div>\n\n<div id=\"wrapper\">\n  <div id=\"scroller\" class=\"students\">\n  	<ul id=\"studentlist\">\n	";
    stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n\n  	</ul>\n\n  </div> "
      + "\n</div> ";
    return buffer;
    });
});
window.require.register("views/templates/studentListCheck", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n    <li data-id=\"";
    if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\" data-name=\"";
    if (stack1 = helpers.Name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\" class=\"studentCheck\" style=\"padding-left:10px!important;\">\n      <p data-id=\"";
    if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\" class=\"first-name\">";
    if (stack1 = helpers.Name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</p> \n    </li>\n";
    return buffer;
    }

    buffer += " <div id=\"scroller\" class=\"students\">\n  <ul id=\"studentlist\">\n";
    stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n\n  </ul>\n\n</div> ";
    return buffer;
    });
});
window.require.register("views/view", function(exports, require, module) {
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
