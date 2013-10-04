var Book = require('./book');

module.exports = Parse.Collection.extend({
	model: Book, 
		

	handle: function(){

		return {"DescriptiveName": this.toJSON()};

	}

});