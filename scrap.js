var request = require('request');
var cheerio = require('cheerio');

var url = 'http://localhost:8000/test.html';
var pushUrl = 'http://localhost:8000/push';


setInterval(checkHtml, 1000 * 60);

function checkHtml() {
  request(url, function (error, response, body) {
    $ = cheerio.load(body);
    if ($('div.heightFix2').children()[0].attribs.src
        === 'https://media.ticketmaster.co.uk/tm/en-gb/img/static/nfl2018/Season-tickets.jpg' && $('div.heightFix2')
                                                                                                   .children()[13].children[0].data
                                                                                                 === 'General Admission Tickets '
        && $('div.heightFix2').children()[13].children[0].next.children[0].data === 'ON SALE SOON' && $('div.heightFix2')
                                                                                                        .children()[13].children[0].next.attribs.href
                                                                                                      === '#')
    {
      console.log('no changes');
    }
    else {
      console.log('changes');
      request(pushUrl, function (error, response, body) {
        process.exit(1);
      });

    }
  });
}
