let expect = require('expect');

let {generateMessage, generateLocationMessage}  = require('./message');

describe('generateMessage', () => {
    it('should generate a message object', () => {
        let from = 'jesus';
        let text = 'Praise thee lord';
        //calling the generateMessage function and passing it in our variables above
        let message = generateMessage(from, text);
        //we expect that createdAt is a number
        expect(typeof message.createdAt).toBe('number');
        //we expect that the message includes a from and text property
        expect(message).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate a location message object', () => {
        let from = 'goku'
        let latitude = 39.5916085
        let longitude = -76.385098
        let url = 'https://www.google.com/maps?q=39.5916085,-76.385098'
        let message = generateLocationMessage(from, latitude, longitude);
        // expect(typeof message.createdAt).toBe('number');
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});