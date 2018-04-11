require('console-stamp')(console, '[HH:MM:ss.l]');
var request = require('request');
var cheerio = require('cheerio');
var admin = require('firebase-admin');
var serviceAccount = require('./changepush-firebase-adminsdk-v9baa-acf7bba9b7.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://changepush.firebaseio.com'
});


// See documentation on defining a message payload.
var message = {
  notification: {
      "title": "Test Notification",
      "body": "This offer expires at 11:30 or whatever"
  },
  topic:'nfl_change'
};

admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Dry run successful:', response);
  })
  .catch((error) => {
    console.log('Error during dry run:', error);
  });


//
//
// var url = 'https://www.ticketmaster.co.uk/nfl';
//
// checkHtml();
// setInterval(checkHtml, 1000 * 60);
//
// function checkHtml() {
//   request(url, function (error, response, body) {
//
// // console.log('error ' + error);
// // console.log('response ' + response);
//
//     if(!error && response.statusCode === 200){
//       $ = cheerio.load(body);
//       if ($('div.heightFix2').children()[0].attribs.src
//           === 'https://media.ticketmaster.co.uk/tm/en-gb/img/static/nfl2018/Season-tickets.jpg' && $('div.heightFix2')
//                                                                                                      .children()[13].children[0].data
//                                                                                                    === 'General Admission Tickets '
//           && $('div.heightFix2').children()[13].children[0].next.children[0].data === 'ON SALE SOON' && $('div.heightFix2')
//                                                                                                           .children()[13].children[0].next.attribs.href
//                                                                                                         === '#')
//       {
//         console.log('no changes');
//       }
//       else {
//         console.log('changes');
//         process.exit(1);
//
//       }
//     }
//     else {
//       console.log('response ' + response );
//       console.log('error ' + error );
//       process.exit(1);
//
//     }
//
//   });
// }
