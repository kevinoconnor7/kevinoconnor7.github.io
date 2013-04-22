var code_page = function() {
	$(document).ready(function(){
		$("#github-profile-widget").github({
			user: "kevinoconnor7",
			show_extended_info: true,
			show_follows: true,
			width: "100%",
			show_repos: 10,
			oldest_first: false
		});
	});
};