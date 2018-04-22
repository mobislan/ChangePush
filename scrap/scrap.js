require('console-stamp')(console, '[HH:MM:ss.l]');
var request = require('request');
var cheerio = require('cheerio');
var admin = require('firebase-admin');
var serviceAccount = require('./changepush-firebase-adminsdk-v9baa-acf7bba9b7.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://changepush.firebaseio.com'
});
console.log('1');

process.on('uncaughtException', err => {
console.error(err, 'Uncaught Exception thrown'); process.exit(1); }
);

console.log('2');

function sendMessage(title , body){
    var message = {
        android:{
            priority:'HIGH',
            notification: {
                "title": title,
                "body": body,
                color:'#0000FF'
            },
        },

        topic:'nfl_changes'
    };
console.log('4');
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('message send successful:', response);
process.exit(1);
        })
        .catch((error) => {
            console.log('Error message send', error);
process.exit(1);
        });

}

var url = 'https://www.ticketmaster.co.uk/nfl';

checkHtml();
setInterval(checkHtml, 1000 * 60);

function checkHtml() {
    request(url, function (error, response, body) {

// console.log('error ' + error);
// console.log('response ' + response);
        if(!error && response.statusCode === 200){
            $ = cheerio.load(body);
            var siblingLink = $('img[src="https://media.ticketmaster.co.uk/tm/en-gb/img/static/nfl2018/seahawksraiders.jpg"]')[0].parent.children[11].children[0];
            if (siblingLink.data
                === 'General Admission Tickets '
                && siblingLink.next.children[0].data === 'ON SALE SOON' && siblingLink.next.attribs.href
                === '#')
            {
                console.log('no changes');
            }
            else {
                sendMessage('TICKETMASTER CHANGED!','Something changed! Now Exiting scrap.js service')

            }
        }
        else {
            console.log('response ' + response );
            console.log('error ' + error );
        }

    });
}
