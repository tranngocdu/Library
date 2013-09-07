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