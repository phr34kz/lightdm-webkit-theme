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
		selectedUser = $("#inputUsername").val();
		log("user: " + selectedUser);
		lightdm.start_authentication( selectedUser );
		submitPassword();
	});


	if(DEBUG) {
		$("#log").show();

	}

});

function submitPassword(){
	log("submitPassword called");

	lightdm.provide_secret($("#inputPassword").val());
}

function authentication_complete() {
	log("authentication_complete");
	if( lightdm.is_authenticated ) {
		
		lightdm.login( lightdm.authentication_user, $("#session").val());

	}else {
		//Authentication Failed
		log("authentication failed");
	}

}

function show_prompt(text) {
	log("show_prompt called");
}

var DEBUG = true;
var selectedUser = null;

function log(text) {
	if(DEBUG) {
		$("#log").append(text);
		$("#log").append("<br/>");
	}
}
