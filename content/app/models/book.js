module.exports = Parse.Object.extend({
	className: "book",
	
	handle: function(){

		return {"descriptive_name": this.toJSON()};

	}

});