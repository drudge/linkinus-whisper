//
//  custom.js
//  Linkinus 2.0 Style Engine
//
//  Created by Nicholas Penree on 4/21/09.
//  Copyright 2009 Conceited Software. All rights reserved.
//


var AL = [ 'even', 'odd' ];
var CL = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty' ];


//
//  variants.js
//  Linkinus 2.0 Style Engine
//
//  Created by Nicholas Penree on 5/22/09.
//  Copyright 2009 Conceited Software. All rights reserved.
//

var STYLE_VARIANT = '';

var STYLE_VARIANT_OPTIONS = {
    "normal": {
        "historyIcon": 'history.png',
        "personImage": 'person.png',
        "topicColor": '-webkit-gradient(linear, left top, left bottom, from(#d1d1d1), to(#bcbcbc))',
        "topicColorBackup": '#bcbcbc',
        "topicColorInactive": '#dddddd',
        "spotLightColor": '#dfdfdf'
    },
    'dark': {
        "historyIcon": 'darkhistory.png',
        "personImage": 'person-white.png',
        "topicColor": '-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(98, 98, 98)), color-stop(0.5, rgb(32, 32, 32)), color-stop(0.5, rgb(0, 0, 0)), to(rgb(0, 0, 0)))',
        "topicColorBackup": '#111',
        "topicColorInactive": '#444',
        "spotLightColor": '#333'
    }

};

function variant_option(setting){
    var variant = STYLE_VARIANT;
    
    if (variant == '') {
        variant = 'normal';
    }
    
    return STYLE_VARIANT_OPTIONS[variant][setting];
}


/////////////////////



function animatePoof() {
	var bgTop = 0;
	var frames = 5;
	var frameSize = 32;
	var frameRate = 80;
	
	for(i=1;i<frames;i++) {
		$('.poof').animate({ backgroundPosition: '0 ' + (bgTop - frameSize) + 'px'}, frameRate);
		bgTop -= frameSize;
	}
	setTimeout("$('.poof').hide()", frames * frameRate);
}

function hlstr(flag){
    if (flag == false || flag == 0 || flag == null || typeof flag === 'undefined' || flag == 'false' || flag == '0')
        return 'false';
        
    if (flag == true || flag == 1 | flag == 'true' || flag == '1')
        return 'true';
        
    return 'false';
}

function replaceEmoticons(text){

    if (text.match(/color:/ig)) {
        return text;
    }
    
    text = text.replace(/(^D-?:)|\s(D-?:)|(X-?\)~|&gt;:d|;-?\)|:-?\)|\(-?:|(:-?@)|:-?\[|:-?s|:&apos;-?\(|:-?\||:-?\(|:-?o|:-?D|o:-?\)|&lt;3|8-?\)|:-?\*|:-?&apos;\(|(:-?\$|:-?p|:-?\\|\(N\)|\(Y\)|\(NL\)|\(OKEANOS\)|\(DRUDGE\)|\(CALTSAR\)))/ig, function(emote){ return imageForEmoticon(emote) } );

	return text;
}

function imageForEmoticon(emote){
    window.console.log('emote = "' + emote + '"');
    var result = emote;
    var imageName = EMOTE_LIST[emote.replace('-', '').toUpperCase()];
    
    if (imageName == null) return emote;
    
    switch(emote){
        case ' D:':
            result = '&nbsp;<img src="img/emoticons/' + imageName + '" class="emoticon" alt="'+emote+'" onclick="removeEmoticon(this, \'' + emote.replace('&apos;', 'WHISPERAPOS') + '\');" />';
        default:
            result = '<img src="img/emoticons/' + imageName + '" class="emoticon" alt="'+emote+'" onclick="removeEmoticon(this, \'' + emote.replace('&apos;', 'WHISPERAPOS') + '\');" />';
    }

    return result;
}

function removeEmoticon($this, replacementText){
    var xOffset = 15;
	var yOffset = 15;
	var e = window.event;
	
	$('.poof').css({ left: e.pageX - xOffset + 'px', top: e.pageY - yOffset + 'px' }).show();
	animatePoof();

    $this.outerHTML = replacementText.replace('WHISPERAPOS', '&apos;');
}