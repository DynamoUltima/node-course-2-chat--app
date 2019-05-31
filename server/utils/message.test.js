var expect = require('expect');
var moment = require('moment');

var {generateMessage,generateLocationMessage}= require('./message');

describe('generateMessgae',()=>{
    it('it should generate correct message object',()=>{
        var from = 'Jen';
        var text='Some Message';
        var message= generateMessage(from,text);


        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});

    })
})

describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from ='Admin'
        var latitude=15;
        var longitude =9;
        var url ='https://www.google.com/maps?q=15,9';
        var message= generateLocationMessage(from,latitude,longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url})
    })
})


describe('generateCreatedAt',()=>{
    it('should generate  the current time',()=>{
        var date= new Date().getTime();
        var moomentDate = moment().valueOf();

        expect(date).toEqual(moomentDate);
       // expect(date).toEqual(moment().add(7,'years'))


    
    })
})