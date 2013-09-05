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

		var Home = require('views/example-view');
		var Router = require('lib/router');
		var PullRefresh = require('views/pullRefresh-view');
		var MultipleChoice = require('views/multipleChoice-view');

		this.homeView = new Home();
		this.router = new Router();
		this.pullRefreshView = new PullRefresh;
		this.multipleChoiceView = new MultipleChoice;


		if (typeof Object.freeze === 'function') Object.freeze(this);
		// Initializing BackStack.StackNavigator for the #container div
	},

}

module.exports = Application;