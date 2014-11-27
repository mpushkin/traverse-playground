console.log('lets get started');

var data = {
	someProp: {
		someNestedProp: {
			someDeeperNesterProp: {
				someValue: 'really deep'
			}
		}
	}
};

traverse(data).forEach(function(x) {
	console.log('we are here: "' + this.key + '"', x);
});