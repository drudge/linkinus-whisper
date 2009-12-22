
//
//  common.js
//  Linkinus 2.0 Style Engine
//
//  Created by Nicholas Penree on 4/21/09.
//  Copyright 2009 Conceited Software. All rights reserved.
//

// Message detail locations --------------------------------------------------------------------------------
var MESSAGE_TYPE_KEY = 0;
var POST_ID_KEY = 1;
var NICKNAME_KEY = 2;
var DESCRIPTION_KEY = 3;
var TIMESTAMP_KEY = 4;
var NICK_COLOR_KEY = 5;
var EXTRA_DATA_KEY = 6;
var POST_TYPE_KEY = 7;
var HIGHLIGHTED_KEY = 8;
var STARRED_KEY = 9;
var ALLOW_EMBEDDING_KEY = 10;
var MESSAGE_DIRECTION_KEY = 11;
var USER_IMAGE_URL_KEY = 12;
var LOCATION_KEY = 13;
var USERHOST_KEY = 14;
var DISPLAY_UNENCRYPTED_KEY = 15;

// Post types  ---------------------------------------------------------------------------------------------
var POST_TYPE_HISTORY = 0;
var POST_TYPE_CURRENT = 1;

// Config --------------------------------------------------------------------------------------------------
var CLIP_LINE_NUM = 10;

// Utility   0         1    --------------------------------------------------------------------------------
var TF = [ 'false', 'true' ];
var SIZES =  ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; 

var EMOTE_LIST = {
    ";)"        : "Wink.png",
    "X)~"        : "Facial.png",
    "&GT;:D"    : "Angry Face.png",
    ":)"        : "Smile.png",
    "(:"        : "Smile.png",
    ":@"        : "Angry Face.png",
    ":["        : "Blush.png",
    ":S"        : "Undecided.png",
    ":&APOS;("  : "Crying.png",
    ":|"        : "Foot In Mouth.png",
    ":("        : "Frown.png",
    ":O"        : "Gasp.png",
    ":D"        : "Grin.png",
    "D:"        : "Gasp.png",
    " D:"        : "Gasp.png",
    "O:)"       : "Halo.png",
    "&LT;3"     : "Heart.png",
    "8)"        : "Wearing Sunglasses.png",
    ":*"        : "Kiss.png",
    ":$"        : "Money-mouth.png",
    ":P"        : "Sticking Out Tongue.png",
    ":\\"       : "Undecided.png",
    "(N)"       : "Thumbs Down.png",
    "(Y)"       : "Thumbs Up.png",
    "(NL)"      : "nl.png",
    "(OKEANOS)" : "okeanos.png",
    "(DRUDGE)"  : "drudge.png",
    "(CALTSAR)" : "caltsar.png"
};

//
//  hintbox.js
//  Linkinus 2.0 Style Engine
//
//  Created by Nicholas Penree on 5/21/09.
//  Copyright 2009 Conceited Software. All rights reserved.
//

var intDialog;

function setInternalDialog(dialog){
    intDialog = dialog;
}

function openConnectionHintBox(dialog) {
    intDialog = dialog;
	dialog.overlay.slideDown('fast', function () {
		dialog.container.slideDown('fast', function () {
			dialog.data.hide().slideDown('fast');	 
		});
	});
}

function closeConnectionHintBox(dialog) {
	dialog.data.slideUp('fast', function () {
		dialog.container.slideUp('fast', function () {
			dialog.overlay.slideUp('fast', function () {
				$.modal.close();
			});
		});
	});
	
    updateConnectionHintDisplayPreference();
}

function updateConnectionHintDisplayPreference()
{
    if (typeof window.linkinus.setDisableConnectionHintBox_ !== 'undefined') {
	    if (typeof $('#chkShowConnectionHintBox')[0] !== 'undefined') {
	        window.linkinus.setDisableConnectionHintBox_($('#chkShowConnectionHintBox')[0].checked);
	    }
	}
}

function displayJoinDialog(){
    if (typeof window.linkinus.displayJoinDialog !== 'undefined') {
        window.linkinus.displayJoinDialog();
    }
}

function displayChannelListDialog(){
    if (typeof window.linkinus.displayChannelList !== 'undefined') {
        window.linkinus.displayChannelList();
    }
}

function configureStyle(){
    if (typeof window.linkinus.showStylePreferences !== 'undefined') {
	    window.linkinus.showStylePreferences();
	}
}

function welcomeMain(){
    $('#WelcomeWhatsNew').fadeOut('slow');
    $('#WelcomeWhatsNewMore').fadeOut('slow');
    $('#WelcomeMain').fadeIn('slow');
}

function welcomeWhatsNew(){
    $('#WelcomeMain').fadeOut('slow');
    $('#WelcomeWhatsNewMore').fadeOut('slow');
    $('#WelcomeWhatsNew').fadeIn('slow');  
}

function welcomeWhatsNewMore(){
    $('#WelcomeWhatsNew').fadeOut('slow');
    $('#WelcomeWhatsNewMore').fadeIn('slow');  
}

function showConnectionHintBox(network, server, nickname, realname){
var html = function() {
/*
    <div id="connectionHintBox" style="display: none">
        <div id="connectionHintBoxContent">
            <div id="connectionHintBoxAssistant">
                <img src="img//hintbox/assistant.png" />
            </div>
            <div id="connectionHintBoxAssistantText">
                <h2>Welcome, <strong>$REALNAME!</strong> You are now connected to the <strong>$NETWORK</strong> network as <strong>$NICKNAME</strong>.</h2>
                <p>Now that you're connected, why not join a channel and start chatting?</p>
            </div>
            <div class="connectionHintBoxJoinOption join" onclick="displayJoinDialog()">
                <img src="img/hintbox/channel.png" /> Join a specific channel
            </div>
            <div class="connectionHintBoxJoinOption chanlist" onclick="displayChannelListDialog()">
                <img src="img/hintbox/list.png" /> Browse channel listing
            </div>
            <div class="connectionHintBoxJoinOption console" onclick="hideConnectionHintBox()">
                <img src="img/hintbox/console.png" /> View console activity&nbsp;&nbsp;
            </div>
            <div class="connectionHintBoxWelcomeOption" style="display:block" id="WelcomeMain">
                <h3>New to Linkinus?</h3>
                    <img src="img/hintbox/crowd.png" id="crowd" />
                    <img src="img/hintbox/customize.png" id="customize" />
                    <img src="img/hintbox/map.png" id="map" />
                    
                    <p class="intro">Linkinus 2 provides a rich, social IRC experience; featuring embedded media, message starring, nickname coloring, emoticons, and more!</p> <p class="customize">Linkinus is highly configurable. You can choose between different emoticon sets, style variants, etc. Enjoy!</p>
                    
                    <div class="connectionHintBoxConfigureOption configureWelcome" onclick="configureStyle()">
                        <p>Configure...</p>
                    </div>
                    <div class="connectionHintBoxConfigureOption whatsNew" onclick="welcomeWhatsNew()">
                        <p>What's New?</p>
                    </div>
                </div>
                <div class="connectionHintBoxWelcomeOption" style="display:none" id="WelcomeWhatsNew">
                    <img src="img/hintbox/stars.png" id="stars" />
                    <img src="img/hintbox/media.png" id="media" />
                    <img src="img/hintbox/colorednicks.png" id="colorednicks" />
                    
                    <p class="stars">With <span style="background-color: #BDEFBC;text-shadow:none">message starring</span> you're in control. Star messages and review them later in the Highlights &amp; Stars window. Press ⌘1 to manage your interesting messages.</p>
                    
                    <p class="media">Embedded content like you've never seen before. Embed all kinds of audio, video, and even document files right in your chat window.</p>
                    
                    <p class="colorednicks">Add a splash of color with colorized nicknames.</p>
                    
                    <div class="connectionHintBoxConfigureOption configureWelcome" onclick="welcomeMain()">
                        <p>Back</p>
                    </div>

                    <div class="connectionHintBoxConfigureOption whatsNew" onclick="welcomeWhatsNewMore()">
                        <p>More</p>
                    </div>
                </div>
                <div class="connectionHintBoxWelcomeOption" style="display:none" id="WelcomeWhatsNewMore" >
                    <img src="img/hintbox/links.png" id="links" />
                    <img src="img/hintbox/emoticons.png" id="emoticons" />
                    <img src="img/hintbox/groups.png" id="groups" />
                    
                    <p class="stars">Avoid clicking misleading links. With automatic link expansion for multiple URL shorting services you can easily see where a link will take you before you click it.</p>
                    
                    <p class="media">Make your smiles visually appealing! Styles may now include their own emoticon sets for you to enjoy.</p>
                    
                    <p class="colorednicks">Use Groups to save your combined chat view layouts for repeat use!</p>
                    
                    <div class="connectionHintBoxConfigureOption whatsNew" onclick="welcomeWhatsNew()">
                        <p>Back</p>
                    </div>
                </div>
                
                <span id="connectionHintCheck">
                    <input id="chkShowConnectionHintBox" type="checkbox" onclick="updateConnectionHintDisplayPreference();" /> Don't show this message again
                </span>
            </div>
        </div>
*/
    }
    var outputLine = heredoc(new String(html));
    
    outputLine = outputLine.replace(/\$NETWORK/g, network).replace(/\$SERVER/g, server).replace(/\$NICKNAME/g, nickname).replace(/\$REALNAME/g, realname);
    
    $(outputLine).modal({onOpen: openConnectionHintBox, onClose: closeConnectionHintBox});
}

function hideConnectionHintBox(){
    closeConnectionHintBox(intDialog);
}

function hintboxButtonPressed($this){
    $($this).addClass('pressed');
}

function hintboxButtonReleased($this){
    $($this).removeClass('pressed');
}