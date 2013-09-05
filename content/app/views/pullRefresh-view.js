//Standard View initialization
var View = require('./view');
var template = require('./templates/pullRefresh');

module.exports = View.extend({
	id: 'pull-refresh',
	template: template,
	events: {
		"dataLoaded":"append",
		"pullDownAction":"pullDown",
		"DOMContentLoaded":"loaded",
		"touchmove":"movePrevent"
	},

	initialize: function() {		

	},

	render: function() {

		this.myScroll = 0;
		this.pullDownEl = 0;
		this.pullDownOffset = 0;
		this.pullUpEl = 0;
		this.pullUpOffset = 0;
		this.generatedCount = 0;
		
		var pullDownEl = document.getElementById('pullDown');
		var pullDownOffset = pullDownEl.offsetHeight;

		myScroll = new iScroll('wrapper', {
			useTransition: true,
			topOffset: pullDownOffset,
			onRefresh: function () {
				if (pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				}
			},
			onScrollMove: function () {
				if (this.y > 5 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
					this.minScrollY = 0;
				} else if (this.y < 5 && pullDownEl.className.match('flip')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
					this.minScrollY = -pullDownOffset;
				}
			},
			onScrollEnd: function () {
				if (pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
					pullDownAction(); // Execute custom function (ajax call?)
				}
			}
		});

		this.$el.html(this.template());
		
		

		return this;
	},

	pullDownAction: function () {
		alert("pulldownaction");
		setTimeout(function () {  // Simulates loading (remove from production).
			var el, li, i;
			el = document.getElementById('thelist');

			for (i=0; i<1; i++) {
				li = document.createElement('li');
				li.innerText = 'Hey! New Row! ' + (++generatedCount);
				el.insertBefore(li, el.childNodes[0]);
			}

			myScroll.refresh();   // Refresh when contents are loaded (ie: on ajax completion)
			}, 1000); // Simulates loading (remove from production).

		},

		movePrevent: function(e) {
			e.preventDefault();
		},

		loaded: function() {
			var pullDownEl = document.getElementById('pullDown');
			var pullDownOffset = pullDownEl.offsetHeight;

			myScroll = new iScroll('wrapper', {
				useTransition: true,
				topOffset: pullDownOffset,
				onRefresh: function () {
					if (pullDownEl.className.match('loading')) {
						pullDownEl.className = '';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
					}
				},
				onScrollMove: function () {
					if (this.y > 5 && !pullDownEl.className.match('flip')) {
						pullDownEl.className = 'flip';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
						this.minScrollY = 0;
					} else if (this.y < 5 && pullDownEl.className.match('flip')) {
						pullDownEl.className = '';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
						this.minScrollY = -pullDownOffset;
					}
				},
				onScrollEnd: function () {
					if (pullDownEl.className.match('flip')) {
						pullDownEl.className = 'loading';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
						pullDownAction(); // Execute custom function (ajax call?)
					}
				}
			});
			setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);		

		},

		append: function(){

		},


	});
