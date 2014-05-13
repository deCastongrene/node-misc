
// check for new dividends in stock table
console.log('start app');


var mysql = require('mysql2');
var yahooFinance = require('yahoo-finance');


try {

var conn = mysql.createConnection({
     hostname: 'localhost',
     user: 'root',
     password: 'password',
     database: 'dbname'
});

conn.query('SELECT * from stock', function(err,res) {
    if (err) console.log('err='+err);
    //console.log(res);

    symbols = [];
    dividends = {};
    for(var i=0; i < res.length; i++) {
	var row = res[i];
	symbols.push(row.symbol);
	dividends[row.symbol] = row.dividendPerShare;
    } 
    //console.log('symbols',symbols);
    //console.log('dividends',dividends);


    yahooFinance.snapshot({
        symbols: symbols,
        fields: ['s','n','d']
    }, function (err, data, url, symbol) {
        if (err) console.log('err='+err);
        //console.log('yahoo data: ',data);

	// check new data vs dividends
	Object.keys(data).forEach(function(key){
	    var stock = data[key];
	    //console.log('stock=',stock);
	    if (stock.dividendPerShare !== dividends[stock.symbol]){
                console.log('dividend change for '+stock.symbol+' - '+stock.name);
		console.log('  from '+dividends[stock.symbol]+' to '+stock.dividendPerShare);
		var sql = 'UPDATE stock SET dividendPerShare="'+
		    stock.dividendPerShare+
			'" WHERE symbol="'+
		          stock.symbol+'"';
                conn.query(sql,function(err,result){
		    if (err) console.log(err);
		    //console.log(result);
		    //conn.writeOk(result);
		    //console.log('writeOk for update');
		});



	    }
	});


	conn.end();

    });

    //console.log('end of conn');
    //conn.end();
});

} catch (e) {
    console.log('error thrown',e);
}

console.log('end app');
