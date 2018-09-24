const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('client/build'));

let que = [];
let ans = [];


app.param('id', function(req, res, next, id) {

    var modified = id;
    que.push(id);
    
    var url = process.env.CLOUDAMQP_URL || "amqp://localhost";

	var amqp = require('amqplib/callback_api');

	amqp.connect(url, function(err, conn) {
	//amqp.connect('amqp://rabbitmq:5672', function(err, conn) {	
	  conn.createChannel(function(err, ch) {
	    ch.assertQueue('', {exclusive: true}, function(err, q) {
	      var corr = generateUuid();
	      var num = que[que.length-1];

	      console.log(' [x] Asking (%s)', num);

	      ch.consume(q.queue, function(msg) {
	        if (msg.properties.correlationId === corr) {
	          console.log(' [.] REPLY %s', msg.content.toString());
	          ans.push(msg.content.toString());

   			  var numx = ans[ans.length-1];;
			  req.id = numx.toString();

			  res.send(req.id)

	          setTimeout(function() { conn.close(); console.log("DONE") }, 500);
	        }
	      }, {noAck: true});

	      ch.sendToQueue('rpc_queue',
	        Buffer.from(num.toString()),
	        { correlationId: corr, replyTo: q.queue });
	    });
	  });
	});

	function generateUuid() {
	  return Math.random().toString() +
	         Math.random().toString() +
	         Math.random().toString();
	} 


    next();
});


app.get('/api/user/:id',(req,res)=>{});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const PORT = process.env.PORT || 3001;


app.listen(PORT);









