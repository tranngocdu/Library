module.exports = Parse.Object.extend({
	className: "student",
	
	handle: function(){

		return {"descriptive_name": this.toJSON()};

	}

});