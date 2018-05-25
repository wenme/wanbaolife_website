// product-compare.js

$(function(){
	var pid_a = GetQueryString("pid_a");
	var pid_b = GetQueryString("pid_b");
	var SESSION_KEY = sessionStorage.getItem("session_key");
	var timestamp = Date.parse(new Date()) / 1000;

	var post_data = {
		pid_a: pid_a,
		pid_b: pid_b,
		timestamp: timestamp,
		session_key: SESSION_KEY
	};
	post_data['sign'] = complete_digest(post_data);
	$.post(url, post_data, function(data, status)
	{
		//TODO product name & insurer logo
		//TODO SIX part for product infos
		//TODO menu
	}
})