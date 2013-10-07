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
		$('#cancel').on('vclick', function(e) {
			alert("v");
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
