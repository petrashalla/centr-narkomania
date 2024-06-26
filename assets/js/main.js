let scrollWidthFunc = () => {
    let scrollWidth = window.innerWidth - document.body.clientWidth;
    document.querySelector('html').style.paddingRight = scrollWidth + 'px';
    document.querySelector('header').style.paddingRight = scrollWidth + 'px';
}
const scrollTop = document.querySelector('.scroll-top');
if (scrollTop)
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

['load', 'resize'].forEach((event) => {
    window.addEventListener(event, function () {
        let headerHeight = header.clientHeight;
        const plashka = header.querySelector('.header__plashka');
        const headerTop = header.querySelector('.header__top');
        if (plashka) {
            var originalHeightPlashka = plashka.offsetHeight;
            var originalHeightHeaderTop = headerTop.offsetHeight;
        }
        window.onscroll = function (e) {
            if (window.scrollY > headerHeight) {
                if (!plashka.classList.contains('hide')) {
                    plashka.classList.add('hide');
                    plashka.style.height = '0px';

                    headerTop.classList.add('hide');
                    headerTop.style.height = '0px';
                    headerTop.style.opacity = '0';
                }
            }
            else {
                plashka.style.height = originalHeightPlashka + 'px';
                plashka.classList.remove('hide');

                headerTop.style.height = originalHeightHeaderTop + 'px';
                headerTop.classList.remove('hide');
                headerTop.style.opacity = '1';
            }
        };
    })
})


document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.querySelector('.burger__menu');
    if (burgerMenu) {
        const headerMobile = document.querySelector('.header__bottom');
        const header = document.querySelector('.header');
        const plashka = document.querySelector('.header__plashka');
        burgerMenu.addEventListener("click", () => {
            if (burgerMenu.classList.contains('burger__menu--active')) {
                plashka.style.display = 'block';
                document.body.classList.remove('lock');                  
            }
            else {
                plashka.style.display = 'none';
            }
            headerMobile.classList.toggle("header__bottom--active");
            burgerMenu.classList.toggle("burger__menu--active");
            header.classList.toggle("header--active");

            document.querySelector('html').classList.toggle('burger-lock');
        });
    }


    /* Mask phone */
    [].forEach.call(document.querySelectorAll('input[type=tel]'), function (input) {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });
    /* End Mask phone */


    /*  Popups  */
    function popupClose(popupActive) {
        popupActive.classList.remove('open');
        document.body.classList.remove('lock');
        document.querySelector('html').removeAttribute('style');
        document.querySelector('html').classList.remove('lock');
        document.querySelector('header').removeAttribute('style');
    }

    const popupOpenBtns = document.querySelectorAll('.popup-btn');
    const popups = document.querySelectorAll('.popup');
    const closePopupBtns = document.querySelectorAll('.close-popup, .popup__btn--good');
    closePopupBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            popupClose(e.target.closest('.popup'));
        });
    });

    popupOpenBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            const path = e.currentTarget.dataset.path;
            const currentPopup = document.querySelector(`[data-target="${path}"]`);
            if (currentPopup) {
                popups.forEach(function (popup) {
                    popupClose(popup);
                    popup.addEventListener('click', function (e) {
                        if (!e.target.closest('.popup__content')) {
                            popupClose(e.target.closest('.popup'));
                        }
                    });
                });
                currentPopup.classList.add('open');
                document.querySelector('html').classList.add('lock');
            }
        });
    });
    /*  end popups  */


        /* yandex map */
        let flagMap = false;
        document.addEventListener('scroll', function () {
            const blockMap = document.getElementById('map');
            if (blockMap) {
                const posTop = blockMap.getBoundingClientRect().top;
    
                if (posTop < window.innerHeight && !flagMap) {
                    if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
                        const script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
                        document.head.appendChild(script);
                    }
                    setTimeout(function () {
                        ymaps.ready(init);
                        function init() {
                            const map = document.querySelector('#map');
                            if (map) {
                                var myMap = new ymaps.Map("map", {
                                    center: [55.415002, 42.529884],
                                    zoom: 15,
                                });
                                myGeoObject = new ymaps.GeoObject();
                                myMap.geoObjects.add(new ymaps.Placemark(myMap.getCenter(), {
                                    preset: 'islands#redDotIconWithCaption',
                                    iconLayout: 'default#image',
                                    iconImageHref: '\assets\img\map-pin_map.svg',
                                    iconImageSize: [31, 31],
                                    iconImageOffset: [-5, -38]
                                }));
                                myMap.behaviors.disable(['scrollZoom']);
                            }
                        }
                    }, 500)
                    flagMap = true;
                }
            }
        });
        /* end yandex map */


        /*  FAQ  */
        const acc = document.getElementsByClassName("faq__accordion");
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("price__accordion--active");
                const panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }

        const questions = document.getElementsByClassName("questions__btn");
        for (let i = 0; i < questions.length; i++) {
            questions[i].addEventListener("click", function() {
                this.classList.toggle("questions__btn--active");
                this.classList.toggle("faq__active");
                const panelQuestions = this.nextElementSibling;
                if (panelQuestions.style.display !== "block") {
                    panelQuestions.style.display = "none";
                } else {
                    panelQuestions.style.display = "block";
                }
            });
        }
        /*  End FAQ   */


        /* Select  */
        const selectSingle = document.querySelectorAll('.__select');
        for (let i = 0; i < selectSingle.length; i++) {
            const selectSingle_title = selectSingle[i].querySelector('.__select__title');
            selectSingle_title.addEventListener('click', () => {
                if ('active' === selectSingle[i].getAttribute('data-state')) {
                    selectSingle[i].setAttribute('data-state', '');
                } else {
                    selectSingle[i].setAttribute('data-state', 'active');
                }
            });
            const selectSingle_labels = selectSingle[i].querySelectorAll('.__select__label');
            for (let j = 0; j < selectSingle_labels.length; j++) {
                selectSingle_labels[j].addEventListener('click', (evt) => {
                selectSingle_title.textContent = evt.target.textContent;
                selectSingle_title.style.color = "#292929";
                selectSingle[i].setAttribute('data-state', '');
                });
            }
        }
        /* End select  */


        /*  Slaider  */
            const tariffSwiperEconom = new Swiper(".tariffSwiperEconom", {
                spaceBetween: 10,
                slidesPerView: 5,
                freeMode: true,
                watchSlidesProgress: true,
            });
            const tariffSwiperEconom2 = new Swiper(".tariffSwiperEconom2", {
                spaceBetween: 10,
                navigation: {
                    nextEl: ".tariff__swiper-button-next",
                    prevEl: ".tariff__swiper-button-prev",
                },
                pagination: {
                    el: ".tariff__swiper-pagination-econom",
                },
                thumbs: {
                    swiper: tariffSwiperEconom,
                },
            });


            const tariffSwiperStandart = new Swiper(".tariffSwiperStandart", {
                spaceBetween: 10,
                slidesPerView: 5,
                freeMode: true,
                watchSlidesProgress: true,
            });
            const tariffSwiperStandart2 = new Swiper(".tariffSwiperStandart2", {
                spaceBetween: 10,
                navigation: {
                    nextEl: ".tariff__swiper-button-next",
                    prevEl: ".tariff__swiper-button-prev",
                },
                pagination: {
                    el: ".tariff__swiper-pagination-standart",
                },
                thumbs: {
                    swiper: tariffSwiperStandart,
                },
            });


            const tariffSwiperPremium = new Swiper(".tariffSwiperPremium", {
                spaceBetween: 10,
                slidesPerView: 5,
                freeMode: true,
                watchSlidesProgress: true,
            });
            const tariffSwiperPremium2 = new Swiper(".tariffSwiperPremium2", {
                spaceBetween: 10,
                navigation: {
                    nextEl: ".tariff__swiper-button-next",
                    prevEl: ".tariff__swiper-button-prev",
                },
                pagination: {
                    el: ".tariff__swiper-pagination-premium",
                },
                thumbs: {
                    swiper: tariffSwiperPremium,
                },
            });

        /*  End slaider  */


    // navigation
    const articleNavigation = document.querySelector('.navigation');
    if (articleNavigation) {
        const jsScrollBlockList = document.querySelectorAll('.text__content h1, .text__content h2, .text__content h3');

        if (jsScrollBlockList.length > 0) {
            for (let i = 0; i < jsScrollBlockList.length; i += 1) {
                const jsScrollBlock = jsScrollBlockList[i];
                const titleBlock = jsScrollBlock.textContent;
                const articleNavigationList = document.querySelector('.navigation__item ul');
                const articleNavigationItem = document.createElement('li');
                const articleNavigationLink = document.createElement('a');
                articleNavigationItem.classList.add('navigation__list-item');
                articleNavigationLink.classList.add('navigation__link');
                jsScrollBlock.setAttribute('id', `${i}`)
                articleNavigationLink.setAttribute('href', `$${i}`);
                articleNavigationLink.textContent = ' ' + titleBlock;
                articleNavigationItem.append(articleNavigationLink);
                articleNavigationList.append(articleNavigationItem);
            }
            document.querySelectorAll('a[href^="$"').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    let href = this.getAttribute('href').substring(1);
                    const scrollTarget = document.getElementById(href);
                    const topOffset = 280;
                    const elementPosition = scrollTarget.getBoundingClientRect().top;
                    const offsetPosition = elementPosition - topOffset;
                    window.scrollBy({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                });
            });
        } else {
            articleNavigation.querySelector('.navigation__item').remove();
        }
    }
    // end navigation


})



const commentsSwiper = new Swiper(".commentsSwiper", {
    pagination: {
        el: ".comments__swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".comments__swiper-button-next",
        prevEl: ".comments__swiper-button-prev",
    },
});

const licenseSwiper = new Swiper(".licenseSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    freeMode: true,
    pagination: {
        el: ".license__swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".license__swiper-button-next",
        prevEl: ".license__swiper-button-prev",
    },

    breakpoints: {
        1100: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        500: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
    }
});

const doctorsSwiper = new Swiper(".doctorsSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    freeMode: true,
    pagination: {
        el: ".doctors__swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".doctors__swiper-button-next",
        prevEl: ".doctors__swiper-button-prev",
    },

    breakpoints: {
        1150: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
        860: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        600: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
    }
});

const doctorsArticleSwiper = new Swiper(".doctorsArticleSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    freeMode: true,
    pagination: {
        el: ".doctors__swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".doctors__swiper-button-next",
        prevEl: ".doctors__swiper-button-prev",
    },

    breakpoints: {
        1030: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        600: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
    }
});



/*  pop-up menu  */
const list = document.querySelectorAll('.hide-item');
function accordion(e){
    e.stopPropagation(); 
    if(this.classList.contains('hide-item--active')){
        this.classList.remove('hide-item--active');
    }
    else if(this.parentElement.parentElement.classList.contains('hide-item--active')){
        this.classList.add('hide-item--active');
    }
    else{
        for(i=0; i < list.length; i++){
            list[i].classList.remove('hide-item--active');
        }
            this.classList.add('hide-item--active');
        }
}
for(i = 0; i < list.length; i++ ){
    list[i].addEventListener('click', accordion);
}


/*  comment show/hide  */
const info=document.querySelectorAll(".comment__more")
for (let i = 0; i < info.length; i++) {
    info[i].addEventListener("click", function() {
        this.classList.toggle("comment__more--active");
        const commentText = this.previousElementSibling;
        commentText.classList.toggle('comment__text--active');
        this.innerText === 'Скрыть' ? this.innerText = 'Читать все' : this.innerText = 'Скрыть';
    });
}


/*   tabs  */
const showTab = (elTabBtn) => {
    const elTab = elTabBtn.closest('.tab');
    if (elTabBtn.classList.contains('tariff__btn--active')) {
        return;
    }
    const targetId = elTabBtn.dataset.id;
    const elTabPane = elTab.querySelectorAll(`.tabcontent[data-id="${targetId}"]`);
    console.log(elTabPane);

    for (let i=0; i<elTabPane.length; i++){
        if (elTabPane[i]) {
        const elTabBtnActive = document.querySelector('.tariff__btn--active');
        elTabBtnActive.classList.remove('tariff__btn--active');

        const elTabPaneShow = document.querySelectorAll('.tabcontent--active');
        for (let j=0; j<elTabPaneShow.length; j++){
            elTabPaneShow[j].classList.remove('tabcontent--active');
        }
        elTabBtn.classList.add('tariff__btn--active');
        // elTabPane[i].classList.add('tabcontent--active');

        for (let j=0; j<elTabPaneShow.length; j++){
            elTabPane[j].classList.add('tabcontent--active');
        }
        }         
    }
}

document.addEventListener('click', (e) => {
    if (e.target && !e.target.closest('.tariff__btn')) {
        return;
    }
    const elTabBtn = e.target.closest('.tariff__btn');
    showTab(elTabBtn);
});  
/*   end tabs  */



/* category tab  */
document.addEventListener('DOMContentLoaded', function () {

    const quantityElement = document.querySelector('.category-quantity span');
    const buttons = document.querySelectorAll('.category-btn');
    const cards = document.querySelectorAll('.category-card');

    function updateVisibleDoctors(category) {
        let visibleCount = 0;
        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        quantityElement.textContent = visibleCount;
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('category-btn--active'));
            button.classList.add('category-btn--active');

            const category = button.getAttribute('data-category');
            updateVisibleDoctors(category);
        });
    });

    document.querySelector('.category-btn[data-category="all"]').classList.add('category-btn--active');
    updateVisibleDoctors('all');
});


/* open select category */
function toggleDropdown() {
    const dropdown = document.querySelector('.custom-select');
    dropdown.classList.toggle('open');
}

document.querySelectorAll('.options li').forEach(option => {
    option.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        const text = this.textContent;
        const dropdown = document.querySelector('.custom-select');
        const options = document.querySelector('.options');
        dropdown.querySelector('.selected-option').textContent = text;
        options.classList.remove('open'); 
    });
});



/*  search  */
document.addEventListener('DOMContentLoaded', function() {
    let inputSearch = document.querySelectorAll('input[type=search]');
    if (inputSearch.length > 0) {
        inputSearch.forEach((elem) => {
            const wrapper = elem.closest('.search-wrapper');
            if (wrapper) {
                const searchResultBlock = wrapper.querySelector('.popup__search-result');
                const popularCitiesBlock = wrapper.querySelector('.popup__search-city');
                const resultCount = searchResultBlock.querySelector('.popup__search-result_text span');

                function search() {
                    let filter = elem.value.toUpperCase();
                    let ul = wrapper.querySelectorAll('.search-list');
                    let totalResults = 0;

                    ul.forEach((item) => {
                        let li = item.getElementsByTagName("li");
                        for (let i = 0; i < li.length; i++) {
                            let a = li[i].querySelector(".search-name");
                            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                                li[i].classList.remove('none');
                                console.log(li[i]);
                                totalResults++;
                            } else {
                                li[i].classList.add('none');
                            }
                        }
                    });
                    resultCount.innerText = totalResults;

                    if (elem.value.trim() === "") {
                        searchResultBlock.classList.add('none');
                        popularCitiesBlock.classList.remove('none');
                    } else {
                        searchResultBlock.classList.remove('none');
                        popularCitiesBlock.classList.add('none');
                    }
                }
                elem.addEventListener('keyup', search);
            }
        });
    }
});
/*  end search  */
