(function ($) {
	"use strict"

	// Scrollspy
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	// Mobile nav toggle
	$('.navbar-toggle').on('click', function () {
		$('.main-nav').toggleClass('open');
	});

	// Fixed nav
	$(window).on('scroll', function () {
		var wScroll = $(this).scrollTop();
		wScroll > 50 ? $('#header').addClass('fixed-navbar') : $('#header').removeClass('fixed-navbar');
	});

	// Smooth scroll
	$(".main-nav a[href^='#']").on('click', function (e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 800);
	});

	// Section title animation
	$('.section-title').each(function () {
		var $this = $(this);
		$this.find('.title > span').each(function (i) {
			var $span = $(this);
			var animated = new Waypoint({
				element: $this,
				handler: function () {
					setTimeout(function () {
						$span.addClass('appear')
					}, i * 250);
					this.destroy();
				},
				offset: '95%'
			});
		});
	});

	// Galery Owl
	$('#galery-owl').owlCarousel({
		items: 1,
		loop: true,
		margin: 0,
		dots: false,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		autoplay: true,
		autoplaySpeed: 500,
		navSpeed: 500,
		responsive: {
			0: {
				stagePadding: 0,
			},
			768: {
				stagePadding: 120,
			}
		}
	});

	// Parallax Background
	$.stellar({
		responsive: true
	});

	// CountTo
	var reachedCount = false;
	var counterCount = 0;
	var counterAmount = $('.counter').length;
	$('.counter').each(function () {
		var $this = $(this);
		var counter = new Waypoint({
			element: $this,
			handler: function () {
				if (counterCount < counterAmount) {
					$this.countTo();
					counterCount++;
				}

			},
			offset: '95%'
		});
	});



})(jQuery);

$(document).ready(function () {
	var currentSpeakersToShow = 3;
	var bySpeakers = 3;

	countdownInterval = setInterval(function () {
		updateCountdown();
	}, 1000);

	$("#viewButton").click(function () {

		var speakersToBeAffected = $('.speaker').slice(currentSpeakersToShow, currentSpeakersToShow + bySpeakers + 1);
		var delay = 100;
		var initialDuration = 500;
		currentSpeakersToShow += bySpeakers;
		Array.from(speakersToBeAffected).forEach(function (item, idx) {

			var imageNode = $(item).children('.speaker-img').children();
			$(imageNode).attr("src", $(imageNode).data('sourceimage'));

			$(imageNode).load(function () {
				$(item).css("display", "block");
				$(item).animate({ opacity: 1 }, initialDuration).delay(delay += 100);
			});

		});

	});

	var mymap = L.map('mapid').setView([51.505, -0.09], 13);

	var accessToken = "pk.eyJ1IjoiY3Jlc3RpdHV5byIsImEiOiJjam12YmhtZmsycjBoM3BxY3o5MHp3anVoIn0._R3aMTesieiXelfDWKFV2Q"

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + accessToken, {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

	L.marker([51.5, -0.09]).addTo(mymap)
		.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();



});

function updateCountdown() {
	timeNow = Date.now();
	timeGoal = new Date("Oct 24, 2018 09:00:00").getTime();
	distance = timeGoal - timeNow;

	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	if (distance <= 0) {
		$(".ct_days").text("0");
		$(".ct_hours").text("0");
		$(".ct_minutes").text("0");
		$(".ct_seconds").text("0");
		clearInterval(countdownInterval);
	} else {
		$(".ct_days").text(days);
		$(".ct_hours").text(hours);
		$(".ct_minutes").text(minutes);
		$(".ct_seconds").text(seconds);
	}
}
