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