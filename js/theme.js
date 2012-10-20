/*
 * Onload startup
 */
$(document).ready(function() {
	
	//set hostname for brand
	$("#hostname").text(lightdm.hostname);

	//create a list of session options
	var sessions = [];

	for ( i in lightdm.sessions ) {

		var session = lightdm.sessions[i];
		sessions.push( $("<option></option>").text(session) );

	}

	$("#session").append(sessions);

}
