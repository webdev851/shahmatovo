'use strict'

// Прелоадер
document.addEventListener('DOMContentLoaded', () => {
	const preloader = document.querySelector('#preloader')
	preloader.classList.add('preloader--hidden')
})

// Верхний баннер
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

// Галерея
const swiperGallery = new Swiper('.swiper-gallery', {
	slidesPerView: 1,
	loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})


// Карусель партнеров в футере
const swiperPartners = new Swiper('.swiper-partners', {
	slidesPerView: 'auto',
	autoplay: true,
	loop: true,
})

// Инициализация Fancybox
Fancybox.bind("[data-fancybox]", {
	Carousel: {
		infinite: false,
	},
	Toolbar: {
		display: {
			left: [],
			middle: [],
			right: ["close"],
		},
	},
})

// Меню
const 
	mobileMenu = document.querySelector('.nav__mobilemenu'),
	burger = document.querySelector('.burger'),
	mobileClose = document.querySelector('.mobile-close'),
	overlay = document.querySelector('.overlay'),
	body = document.body

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
let currentUrl = window.location.href

const 
	tabs = document.querySelector('.groups'),
	tabItem = document.querySelectorAll('.groups__btn'),
	tabContent = document.querySelectorAll('.groups__content')

if (tabs) {
	tabItem.forEach(function (element) {
		element.addEventListener('click', open)
	})

	function open(evt) {
		const tabTarget = evt.currentTarget
		const button = tabTarget.dataset.button
		const tabTargetData = tabTarget.getAttribute("data-button")
		
		tabItem.forEach(function (item) {
			item.classList.remove('active')
		})
		
		tabTarget.classList.add('active')
		
		if (currentUrl.includes('?ref')) {
			currentUrl = currentUrl.replace(/ref=[^&]*/, `ref=${tabTargetData}`);
		} else {
			currentUrl += `?ref=${tabTargetData}`;
		}
		
		if (currentUrl.includes('tickets') && tabTargetData !== "common") {
			window.history.pushState({ path: currentUrl }, '', currentUrl);
		}
		
		tabContent.forEach(function (item) {
			item.classList.remove('active')
		})
		
		document.querySelector(`#${button}`).classList.add('active')
	}

	tabItem[0].click()
}


// Отслеживание страницы перехода для открытия соответствующей вкладки на странице билетов
const 
	pageParams = new URLSearchParams(window.location.search),
	pageReferrer = pageParams.get('ref')

if (pageReferrer) {
	document.querySelector(`.groups__btn[data-button="${pageReferrer}"]`).click()
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

		// Добавление трех меток на карту
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
