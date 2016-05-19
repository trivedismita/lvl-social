/**
* input obj to pass in init function 
*/
var obj = {
	element: 'lvl-social',
    url: 'http://my-url.com',
    service: { 
	    'twitter': {
	        url: 'http://twitter.com/levelstudios',
	        screenName: 'levelstudios',
	        btnTypes: 'follow' // multiple buttons can be added by comma separated types ie. ['follow','share']
	    },
	    'facebook': {
	    	btnTypes: 'follow',
	    	url : 'https://www.facebook.com/levelstudios'
	    },
	    'linkedln':{
	    	btnTypes: 'follow',
	    	id: '209147'
	    },
	    'gplus':{
	    	url :'https://plus.google.com/115668974172344509914/about',
	    	profile: ''
	    },
	    'youtube':{
	    	channel: 'levelstudios'
	    },
	    'instagram' : {
	    	url : 'https://www.instagram.com/levelstudios/',
	    	user: 'levelstudios'
	    }
	}
};
LvlSocial.init(obj);