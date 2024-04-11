'use strict'

// Прелоадер

document.addEventListener("DOMContentLoaded", function() {
	const preloader = document.getElementById('preloader')
	preloader.classList.add('preloader--hidden')
})


const partnersItems = document.querySelectorAll('.partners__item')

const swiperMainBanner = new Swiper('.swiper-mainbanner', {
	slidesPerView: 1,
	autoplay: true,
	loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
		bulletClass: 'banner__bullet',
		bulletActiveClass: 'banner__bullet--active',
  },
})

const swiperPartners = new Swiper('.swiper-partners', {
	slidesPerView: 'auto',
	autoplay: true,
})

// Меню
const mobileMenu = document.querySelector('.nav__mobilemenu')
const burger = document.querySelector('.burger')
const mobileClose = document.querySelector('.mobile-close')
const overlay = document.querySelector('.overlay')
const body = document.body

burger.addEventListener('click', () => {
	mobileMenu.classList.add('active')
	overlay.classList.add('open')
	body.classList.add('lock')
})

mobileClose.addEventListener('click', () => {
	mobileMenu.classList.remove('active')
	overlay.classList.remove('open')
	body.classList.remove('lock')
})

// Табы
const tabs = document.querySelector('.groups')
const tabItem = document.querySelectorAll('.groups__btn')
const tabContent = document.querySelectorAll('.events__list')

if (tabs) {
	tabItem.forEach(function (element) {
		element.addEventListener('click', open)
	})

	function open(evt) {
		const tabTarget = evt.currentTarget
		const button = tabTarget.dataset.button

		tabItem.forEach(function (item) {
			item.classList.remove('active')
		})

		tabTarget.classList.add('active')

		tabContent.forEach(function (item) {
			item.classList.remove('active')
		})

		document.querySelector(`#${button}`).classList.add('active')
	}

	tabItem[0].click()
}

// Яндекс карта 

const coordinates = {
	shahmatovo: [56.314571, 37.052317],
	tarakanovo: [56.333690, 37.045332],
	boblovo: [56.382197, 37.013738],
	center: [56.34206895435997, 37.03670915232444]
}

const addresses = {}

const iconSetting = {
	iconLayout: 'default#image',
	iconImageHref: 'https://weblazum.ru/shahmatovo/img/placemark.svg',
	iconImageSize: [45, 45],
	iconImageOffset: [-19, -24],
	iconCaption: 'Очень длиннный, но невероятно интересный текст'
}

const coordinatesArr = Object.keys(coordinates);

coordinatesArr.forEach(key => {
  console.log(`${key} : ${coordinates[key]}`);
});


// Функция для обработки загрузки библиотеки Яндекс.Карт
function init() {
	// Инициализация карты с id="ymapMain"
	if (document.querySelector('#ymapMain')) {
		const ymapMain = new ymaps.Map('ymapMain', {
			center: coordinates.center,
			zoom: 11,
			controls: ['zoomControl'],
		})

		// Добавление двух меток на карту
		ymapMain.geoObjects
			.add(
				new ymaps.Placemark(
					coordinates.shahmatovo,
					{
						balloonContent: 'Усадьба Шахматово',
						hintContent: 'Усадьба Шахматово',
					}, iconSetting
				)
			)
			.add(
				new ymaps.Placemark(
					coordinates.tarakanovo,
					{
						balloonContent: 'Усадьба Тараканово',
						hintContent: 'Усадьба Тараканово',
					}, iconSetting
				)
			)
			.add(
				new ymaps.Placemark(
					coordinates.boblovo,
					{
						balloonContent: 'Усадьба Боблово',
						hintContent: 'Усадьба Боблово',
					}, iconSetting
				)
			)
		}

	// Инициализация карты с id="ymapVyazyomy"
	if (document.querySelector('#ymapVyazyomy')) {
		const ymapVyazyomy = new ymaps.Map('ymapVyazyomy', {
			center: coordinatesVyazyomy,
			zoom: 14,
			controls: ['zoomControl'],
		})

		// Добавление одной метки на карту
		ymapVyazyomy.geoObjects.add(
			new ymaps.Placemark(
				coordinatesVyazyomy,
				{
					balloonContentHeader: headerVyazyomy,
					balloonContentBody: addressVyazyomy,
				},
				{
					iconLayout: 'default#image',
					iconImageHref: placemarkPath,
					iconImageSize: [45, 45],
					iconImageOffset: [-19, -24],
				}
			)
		)
	}

	// Инициализация карты с id="ymapZakharovo"
	if (document.querySelector('#ymapZakharovo')) {
		const ymapZakharovo = new ymaps.Map('ymapZakharovo', {
			center: coordinatesZakharovo,
			zoom: 14,
			controls: ['zoomControl'],
		})

		// Добавление одной метки на карту
		ymapZakharovo.geoObjects.add(
			new ymaps.Placemark(
				coordinatesZakharovo,
				{
					balloonContentHeader: headerZakharovo,
					balloonContentBody: addressZakharovo,
				},
				{
					iconLayout: 'default#image',
					iconImageHref: placemarkPath,
					iconImageSize: [45, 45],
					iconImageOffset: [-19, -24],
				}
			)
		)
	}
}

// Ожидание загрузки библиотеки Яндекс.Карт
if (document.querySelector('.ymap')) {
	ymaps.ready(init)
}
