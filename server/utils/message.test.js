const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var from = "hester";
        var text = "let us play badminton";
        var res = generateMessage(from , text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(res.createdAt).toBeA('number');
    });
});