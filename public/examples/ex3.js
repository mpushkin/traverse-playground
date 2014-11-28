console.log('a bit hardcore example');

var data = {
	"actives": {
		"assets": {
			"intangibles": 5,
			"office": 10,
			"inventories": 7
		},
		"payments": {
			"cash": 0,
			"bank1": 10
		},
		"other": 12
	},
	"passives": {
		"equity": {
			"subscribed_capital": 0,
			"retained_earnings": 5
		},
		"liabilities": {
			"trade_payables": 3,
			"other": 5,
			"tax": 2
		}
	}
};

function updateTotals(data) {
	traverse(data).forEach(function(x) {
		this.after(function(y) {
			if (this.notLeaf) {
				y._total = sumNonTotalChildren(y);
			}
		});
	});
}

function sumNonTotalChildren(node) {
	return Object.keys(node).reduce(function(acc, key) {
		if (key === '_total') {
			return acc;
		}
		var nodeValue = node[key];
		var nodeTotal = nodeValue._total !== undefined ? nodeValue._total : nodeValue;
		return acc + nodeTotal;
	}, 0);
}

//updateTotals(data);
console.log(data);
