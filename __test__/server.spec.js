import { callBack,sendData } from "../src/server/server";

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

test('responds to post request', () => {
    const req = { params: { city: 'Riyadh', date:'5/22/2022'}  };

    const res = { text: '',
        send: function(input) { this.text = input } 
    };
    callBack(req, res);
    
    expect(res.text).toEqual(req.text);
    
});

