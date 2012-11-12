var DEBUG = true;
var selectedUser = null;
/*
 * Onload startup
 */
$(document).ready(function() {
	
	//set hostname for brand
	$("#hostname").text(lightdm.hostname);
	log("hostname: " + lightdm.hostname);

	//create a list of session options
	var sessions = [];

	for ( i in lightdm.sessions ) {

		var session = lightdm.sessions[i];
		log("session: " + session.name);
		sessions.push( $("<option></option>").text(session.name) );

	}

	$("#session").append(sessions);



	$("#logIn").click( function() {
		log("Log in button clicked");
		logIn();
	});

	$("#inputPassword").keypress(function(e) {
		if( e.which == 13 ) {
			logIn();
		}
	});



	if(DEBUG) {
		$("#log").show();

	}

	log("default_session: " + lightdm.default_session);

});

function logIn() {
	selectedUser = $("#inputUsername").val();
	log("logging in with user: " + selectedUser);
	lightdm.start_authentication( selectedUser );
}

function submitPassword(){
	log("submitPassword called");

	lightdm.provide_secret($("#inputPassword").val());
}

function authentication_complete() {
	log("authentication_complete called");
	log("is_authenticated: " + lightdm.is_authenticated);
	log("auth_user: " + lightdm.authentication_user);
	if( lightdm.is_authenticated ) {
		
		lightdm.login( lightdm.authentication_user, lightdm.default_session); 

	}else {
		//Authentication Failed
		log("authentication failed");
	}

}

function show_prompt(text) {
	log("show_prompt called");
	log("show_prompt text: " + text);
	submitPassword()
}

function log(text) {
	if(DEBUG) {
		$("#log").append(text);
		$("#log").append("<br/>");
	}
}
