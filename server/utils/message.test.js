let expect = require('expect');

let {generateMessage}  = require('./message');

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