## Level Social Module

- Module can be built with following command
	```
	npm start
	```
- Include javascript file lvl-social.min.js in html
- Currently supported social services are
	-twitter-follow-button
	-twitter-share-button
	-fb-like-button
	-fb-follow-button
	-linkedln-follow-button
	-gplus-follow-button

- Required Parameter, Default button for all service is "follow" if not passed.
 1. Twitter - screenName or url
 2. Facebook - url
 3. Linkedln - id

- Open example page from http-server of since some of api won't work on "file://" url.

- You can test this by adding  built file to your source code example (src/example/index.html)
````
<script type="text/javascript" src="../dist/lvl-social.min.js"></script>
````
- Example call
```
LvlSocial.init({
    element: 'lvl-social',
    url: 'http://my-url.com',
    service: { 
	    'twitter': {
	        url: 'http://twitter.com/levelstudios',
	        screenName: 'twitter-screen-name',
	        btnTypes: ['follow','share']
	    },
	    'facebook': {
	    	btnTypes: 'like',
	    	url : 'https://www.facebook.com/levelstudios'
	    },
	    'linkedln':{
	    	btnTypes: 'follow',
	    	id: 209147
	    }
	}
});
```