import * as flsFunctions from "./modules/functions.js"

$(document).ready(function () {
	flsFunctions.HeaderUtilities()

	$(".header").on("click", ".header__menu-item", (e) => {
		changeActiveTab(e, ".header__menu-item")
	})
})

window.onload = function () {
	SetVarForHeader()
	$("body").fadeTo("fast", 1)
}
window.onresize = function () {
	SetVarForHeader()
}

// Functions
function changeActiveTab(e, items) {
	$(items).each(function (_, item) {
		$(item).removeClass("hidden")

		if (!$(item).hasClass("hidden") && $(item).text() == $(e.target).text()) {
			$(item).addClass("hidden")
			$(".header__title").text($(item).text())
		}
	})

	SetVarForHeader()
	return false
}

// для корректной отрисовки border цетрального элемента в шапке
function SetVarForHeader() {
	document
		.querySelector(".header")
		.style.setProperty("--width", $(".header__center").width() + "px")
}
