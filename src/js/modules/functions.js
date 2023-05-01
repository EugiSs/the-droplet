// *______________________________Header Scripts______________________________
export function HeaderUtilities() {

	// При клике на документ, скрыть бургер меню
	$(document).on("click", function (e) {
		if ($(".header__burger.active").length > 0) {
			if (e.target.closest("a")) {
        toggleBurgerMenu(".header__burger", ".header__menu")
				return
			}
			if (e.target.closest(".header__burger") || !e.target.closest(".header")) {
				hideBurger(".header__burger", ".header__menu")
			}
			return false
		}
	})

	// показать/скрыть бургер меню
	$(".header").on("click", ".header__burger", function () {
		toggleBurgerMenu(".header__burger", ".header__menu")
		return false
	})
}

// *_________________________________Бургер_________________________________
// показать/скрыть бурер
function toggleBurgerMenu(burger, menu) {
	let $burger = $(burger)
	let $menu = $(menu)

	$burger.toggleClass("active")
	$menu.toggleClass("active")
	$("body").toggleClass("lock")
	$(".wrapper").toggleClass("blurred")
}
// скрыть бургер меню
function hideBurger(burger, menu) {
	$(burger).removeClass("active")
	$(menu).removeClass("active")
	$("body").removeClass("lock")
	$(".wrapper").removeClass("blurred")
}