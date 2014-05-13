var simplesmtp  = require("simplesmtp");
    


var port = 25;
simplesmtp.createSimpleServer({SMTPBanner:"My Server"}, function(req){
	    req.pipe(process.stdout);
	        req.accept();
}).listen(port);
