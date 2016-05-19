/**
* @fileOverview - Level Social Module
* @name - lvl-social
* @description - modules loads social networking follow up button with counts of page or username passed in arguments
**/
var LvlSocial = (function(){
	var config;

	/**
	* @method init 
	* @description - initialize call setConfig to set sdk url for all services and calls activate network function.
	* @param {obj} obj - Contains the arguments to load services.
	*/
	var init = function(obj){
		_setConfig(obj);
		_activateNetwork(obj);
	};

	/**
   	* @method _setConfig
   	* @description Set sdk url for all networks
   	* @param {obj} arguments passed as object for type of service to load and required param.
   	*/
	var _setConfig = function(obj){
		config = {
			networks : {
				twitter :{
					sdkurl : obj.service.twitter.sdkurl || '://platform.twitter.com/widgets.js'
				},
				facebook: {
					sdkurl : obj.service.facebook.sdkurl || '://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5'
				},
				linkedln :{
					sdkurl : obj.service.linkedln.sdkurl || '://platform.linkedin.com/in.js'
				},
				gplus: {
					sdkurl : obj.service.gplus.sdkurl || '://apis.google.com/js/platform.js'
				},
				youtube: {
					sdkurl : obj.service.youtube.sdkurl || '://apis.google.com/js/platform.js'
				}
			}
		};
	};

	/**
   	* @method _activateNetwork
   	* @description Activate Network based on param passed in obj and load 
   	* @param {obj} arguments passed as object for type of service to load and required param.
   	*/
   	var _activateNetwork = function(obj){
   		if(typeof obj === 'object'){
			if(!document.getElementById(obj.element)){
				var el = _createElement('div',obj.element)
				document.body.appendChild(el);
				obj.element = el;
			}
			for(var key in obj.service){
    			if(obj.service.hasOwnProperty(key)){
    				switch(key){
						case 'twitter':
							_twitter(obj);
							break;
						case 'facebook':
							_facebook(obj);
							break;
						case 'linkedln':
							_linkedln(obj);
							break;
						case 'youtube':
							_youtube(obj);
							break;
						case 'instagram':
							_instagram(obj);
							break;
						case 'gplus':
							_gplus(obj);
							break;
					}
    			}
    		}
		}
   	};

	/**
   	* @method _createElement
   	* @description Returns an html element.
   	* @param {type} type of element i.e div,a,img etc.
   	* @param {className} adds className value to element
   	* @returns {DOMNode} element
   	*/
	var _createElement = function(type,className){
		var el = document.createElement(type);
		el.className = className;
		return el;
	};

	/**
   	* @method _validatelnId
   	* @description Validate Linkedln Id input is passed or not. Linkedln will throw error if valid id is not passed.
   	* @param {obj} Input obj 
   	* @returns {Boolean}
   	*/
	var _validatelnId = function(obj){
		if(!obj.service.linkedln.id) {
			_errorMsg('Please pass correct Linkedln id to load follow button');
			return false;
		} else {
			return true;
		}		
	};

	/**
   	* @method _errorMsg
   	* @description append error msg div
   	* @param {String} Input msg 
   	* @returns {DomNode} element
   	*/
	var _errorMsg = function(msg){
		var eMsg = _createElement('div','error-message');
		eMsg.appendChild(document.createTextNode(msg));
		document.body.appendChild(eMsg);
	};

	/**
   	* @method _openWin
   	* @description Method to open share window for follow page like a pop up with fixed width and height
   	* @param {String}  link
   	*/
	var _openWin = function(link) {
		var w = 600,
    	h = 400,
    	left = (screen.width/2)-(w/2),
		top = (screen.height/2)-(h/2);
		window.open(link,'name','toolbar=no, location=no, width='+w+', height='+h+', top='+top+', left='+left);
	};

	/**
	* @method _updateHref
	* @description Makes the elements a tag have a href of the popup link and
	* as pops up the share window for the element
	* @private
	* @param {DOMNode} element
	* @param {String} url
	* @param {Object} params
	*/
	var _updateHref = function(element,url, params){
		var or = 'original_referer='+ window.location.href;
		var refsrc = '';
		var region = '&region=follow_link';
		var sname = '&screen_name=' + params.sname;
		var tp = '&tw_p=followbutton';
		return encodeURI(url + '?' + or + region + sname + tp) ;
	};

	/**
	* @method _twitter
	* @description Check Twitter Object inputs , create element and make service request to api
	* @private
	*/
	var _twitter = function(obj){
    	var element = obj.element;
    	var sname = obj.service.twitter.screenName || '';
    	var url = obj.service.twitter.url || obj.url;
    	var btnTypes = obj.service.twitter.btnTypes || 'follow';
    	
    	if(!sname || !url){
    		_errorMsg("Please pass valid screenName or twitter share url");
       	}
    
    	var twDiv = _createElement('div','twitter-icon');
    	element.appendChild(twDiv);

    	if(typeof btnTypes === 'string'){
    		_twitterType(btnTypes);
    	} else if(typeof btnTypes === 'object' || btnTypes instanceof Array) {
    		for(var key in btnTypes){
    			if(btnTypes.hasOwnProperty(key)){
    				_twitterType(btnTypes[key]);
    			}
    		}
    	}
		function _twitterType(btnType){
			if(!document.querySelector('.twitter-'+btnType +'-button')){
				var wel = _createElement('a','twitter-'+ btnType + '-button');
		        if(url){
		        	wel.setAttribute('href', url);
		        }
		        wel.setAttribute('text','Follow' +sname);
		        wel.setAttribute('data-show-screen-name',false);
		        wel.setAttribute('data-size','small');
		        twDiv.appendChild(wel);
		    }		
		}
		_loadsdk('twitter'); 
	};

	/**
	* @method _facebook
	* @description Check facebook Object inputs for types of buttons, create element and make service request to api
	* @param {Object} obj
	*/
	var _facebook = function(obj){
		var element = obj.element;
    	var url = obj.service.facebook.url || obj.url;
    	var fbTypes = obj.service.facebook.btnTypes || 'follow';
 	
    	// create div    	
    	var fbDiv = _createElement('div','facebook-icon');
    	element.appendChild(fbDiv);

    	if(typeof fbTypes === 'string'){
    		_facebookType(fbTypes);
    	} else if(typeof fbTypes === 'object' || fbTypes instanceof Array) {
    		for(var key in fbTypes){
    			if(fbTypes.hasOwnProperty(key)){
    				_facebookType(fbTypes[key]);
    			}
    		}
    	}
    	function _facebookType(btnType){
    		if(! document.querySelector('.fb-'+ btnType)){   
            	var wel = _createElement('div','fb-'+ btnType);
		        wel.setAttribute('data-layout','button_count');
		        wel.setAttribute('data-href', url);
		        fbDiv.appendChild(wel);
		    }
    	}
    	if (!window.FB) {
    		_loadsdk('facebook');   
    	}         
	};

	/**
	* @method _linkedln
	* @description Check _linkedln Object inputs for types of buttons, create element and make service request to api
	* @param {Object} obj
	*/
	var _linkedln = function(obj){
		var vid = _validatelnId(obj);
		
		if (!vid){
			return;
		}

		var btnType = obj.service.linkedln.btnTypes || 'follow';
		var element = obj.element;
		var id = obj.service.linkedln.id;

    	var lnDiv = _createElement('div','linkedln-icon');
    	element.appendChild(lnDiv);

    	var el = document.createElement('script');
        el.type = 'IN/FollowCompany';
        el.setAttribute('data-id',id);
        el.setAttribute('data-counter','right');
        lnDiv.appendChild(el);

        _loadsdk('linkedln');
	};

	/**
	* @method _gplus
	* @description Check _gplus Object inputs for types of buttons, create element and make service request to api
	* @description gplus and youtube uses same sdk so only load sdk if not loaded by other service type
	* @param {Object} obj
	*/
	var _gplus = function(obj){
		var element = obj.element;

		if(obj.service.gplus.url) {
			var link = obj.service.gplus.url;
		} else if(obj.service.gplus.profileId){
			var link = 'https://plus.google.com/+' + profileId;
		}
    	var gplusDiv = _createElement('div','g-follow');
    	gplusDiv.setAttribute('data-href',link);
    	element.appendChild(gplusDiv); 

    	setTimeout(function(){
			if(!window.gapi){
				_loadsdk('gplus');
			}
		},100);
	};

	/**
	* @method _youtube
	* @description Check _gplus Object inputs for types of buttons, create element and make service request to api
	* @description gplus and youtube uses same sdk so only load sdk if not loaded by other service type
	* @param {Object} obj
	*/
	var _youtube = function(obj){
		var element = obj.element;
		var channel = obj.service.youtube.channel;

    	var ytDiv = _createElement('div','youtube-icon g-ytsubscribe');
    	ytDiv.setAttribute('data-channel',channel);
    	element.appendChild(ytDiv);
	
		setTimeout(function(){
			if(!window.gapi){
				_loadsdk('youtube');
			}
		},500);
	};

	/**
	* @method _instagram
	* @description Instagram follow button need unique id and profile so this is alternate way to just adds share popup of profile page
	* @param {Object} obj
	*/
	var _instagram = function(obj){
		var element = obj.element;
		var user = obj.service.instagram.user;
		
    	var igDiv = _createElement('div','ig-follow');
    	igDiv.setAttribute('data-handle',user);

    	var img = _createElement('img','ig-badge')
    	img.src = 'https://badges.instagram.com/static/images/ig-badge-24.png';

    	img.setAttribute('alt','Instagram');
    	igDiv.appendChild(img);
    	element.appendChild(igDiv);

    	var link = 'https://www.instagram.com/' + user;
    	igDiv.addEventListener('click',function(e){
    		e.preventDefault();
    		_openWin(link);
    	});   
	};

	/**
   	* @method _loadsdk
   	* @description Javascript request to load api/sdk if not loaded on page or used by other social plugins
   	*/
	var _loadsdk = function(network){
		var d = document, s ='script', id= network+'-jssdk';
		var js, fjs = d.getElementsByTagName(s)[0];
		var p=/^http:/.test(d.location)?'http':'https';
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		var sdkurl = config.networks[network].sdkurl;
		js.src = p + sdkurl;
		fjs.parentNode.insertBefore(js, fjs);            
	};  

	return {
		init: init
	};

})();