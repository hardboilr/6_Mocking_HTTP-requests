var expect = require('chai').expect;
var tickets = require('../modules/tickets');
var nock = require('nock');

var testResponse =
        {airline: 'AngularJS Airline',
            flights:
                    [
                        {flightID: 'COL2215x100x2016-03-09T08:00:00.000Z',
                            numberOfSeats: 4,
                            date: '2016-03-09T08:00:00.000Z',
                            totalPrice: 340,
                            traveltime: 60,
                            origin: 'SXF',
                            destination: 'CPH'}
                    ]
        };

var airport = 'SXF';
var date = new Date("2016-03-09");
var numTickets = 4;

var n = nock('http://angularairline-plaul.rhcloud.com');

describe('Flight API Get', function () {
    before(function (done) {
        n.get('/api/flightinfo/' + airport + '/' + date + '/' + numTickets)
                .reply(200, testResponse);
    });
    it('should return json formatted flightInfo', function (done) {
        tickets.getAvailableTickets(airport, date, numTickets, function (err, flightInfo) {
            if (err) {
                throw err;
            }
            console.log(flightInfo); // <-- just to see if anything is returned
        });
        done();
    });
});

