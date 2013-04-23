jQuery.fn.random = function() {
    var randomIndex = Math.floor(Math.random() * this.length);  
    return jQuery(this[randomIndex]);
};

var code_page = function() {
	$(function () {
		$("#github-profile-widget").github({
			user: "kevinoconnor7",
			show_extended_info: true,
			show_follows: false,
			width: "100%",
			show_repos: 10,
			oldest_first: false
		});
	});
};

var index_page = function() {
	var selector = $('.index-banner .banners');

	var crossfade = function(){
		var active = $(' > div.active', $(selector));
		var next = (active.next().length > 0) ? active.next() : $(' > div:first-child', $(selector));
		next.hide().css('z-index',3);
		next.fadeIn(1500,function() {
			active.css('z-index',1).hide().removeClass('active');
			next.css('z-index',2).addClass('active');
		});
    }

	$(document).ready(function(){
		$('> div', $(selector)).random().show().addClass('active').css('z-index',2);
		setInterval(crossfade, 7000);
	})
};


$(function () {
    $("[rel='tooltip']").tooltip();
});