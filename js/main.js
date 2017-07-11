if (document.querySelector('.search-form')) {
	$('.date-input').attr('readonly', 'true');

	//выбор даты в календаре
	addEventListener('DOMContentLoaded', function () {
		pickmeup('#checkin', {
			position: 'bottom',
			hide_on_select: true,
			locale: "ru",
			format: 'd B Y',
			title_format: 'b, Y',
			min: 'now',
			select_year: false
		});
		pickmeup('#checkout', {
			position: 'bottom',
			hide_on_select: true,
			locale: "ru",
			format: 'd B Y',
			title_format: 'b, Y',
			min: 'now',
			select_year: false
		});
	});

	// изменение количества в инпут
	$('.quantity-box-minus').on('click', function (event) {
		event.preventDefault();
		current = +$(this).siblings('input').val();
		input = $(this).siblings('input');
		$(input).val(current - 1);

		if (current < 1) {
			$(input).val(current);
		}
	});

	$('.quantity-box-plus').on('click', function (event) {
		event.preventDefault();
		current = +$(this).siblings('input').val();
		input = $(this).siblings('input');
		$(input).val(current + 1);

		if (current > 98) {
			$(input).val(current);
		}
	});

	//запрет ввода не цифр
	$(":input[class='number-of-people']").keypress(function (event) {
		if ((event.which < 48 || event.which > 57) && event.which != 0 && event.charCode != 0) {
			return false;
		}
		// Ввод не больше 2-х цифр
		if (this.value.length > 1 && event.charCode != 0) {
			return false;
		}
	});
}

// слайдер на странице отелей
if (document.querySelector('.filter-price')) {
	var slider = document.getElementById('slider');
	var filterScale = document.querySelector('.filter-scale');
	var inputMin = document.getElementById('filter-price-min');
	var inputMax = document.getElementById('filter-price-max');
	var inputs = [inputMin, inputMax];

	filterScale.classList.add('hide-block');

	noUiSlider.create(slider, {
		start: [0, 3500],
		connect: true,
		step: 1,
		range: {
			'min': 0,
			'max': 5000
		},
		format: wNumb({
			decimals: 0
		})
	});

	slider.noUiSlider.on('update', function (values, handle) {
		inputs[handle].value = values[handle];
	});

	function setSliderHandle(i, value) {
		var r = [null, null];
		r[i] = value;
		slider.noUiSlider.set(r);
	}

	// Listen to keydown events on the input field.
	inputs.forEach(function (input, handle) {

		input.addEventListener('change', function () {
			setSliderHandle(handle, this.value);
		});

		input.addEventListener('keydown', function (e) {

			var values = slider.noUiSlider.get();
			var value = Number(values[handle]);

			// [[handle0_down, handle0_up], [handle1_down, handle1_up]]
			var steps = slider.noUiSlider.steps();

			// [down, up]
			var step = steps[handle];

			var position;

			// 13 is enter,
			// 38 is key up,
			// 40 is key down.
			switch (e.which) {

				case 13:
					setSliderHandle(handle, this.value);
					e.preventDefault();
					break;

				case 38:

					// Get step to go increase slider value (up)
					position = step[1];

					// false = no step is set
					if (position === false) {
						position = 1;
					}

					// null = edge of slider
					if (position !== null) {
						setSliderHandle(handle, value + position);
					}

					break;

				case 40:

					position = step[0];

					if (position === false) {
						position = 1;
					}

					if (position !== null) {
						setSliderHandle(handle, value - position);
					}
					break;
			}
		});
	});
}

//анимация хедера
if (document.querySelector('.main-header')) {
	var header = $('.main-header');

	header.css({
		'position': 'absolute',
		'box-shadow': 'none'
	});

	$(window).scroll(function () {
		if ($(window).scrollTop() === 0) {
			header.css({
				'position': 'absolute',
				'box-shadow': 'none',
				'animation': 'none'
			});
		}
		if ($(window).scrollTop() >= 350) {
			header.css({
				'position': 'fixed',
				'box-shadow': '0 0 10px 0 rgba(0, 0, 0, 0.2)',
				'animation': 'header-show 0.5s ease-out'
			});
		}
	});
}
