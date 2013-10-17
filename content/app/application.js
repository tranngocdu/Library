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
	},

}

module.exports = Application;