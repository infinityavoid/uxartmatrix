document.addEventListener('DOMContentLoaded', function () {
    const accordions = document.querySelectorAll('.base-accordion');
    const matrix = document.querySelectorAll('.matrix')
    const exntendSwitch = document.querySelector('.switch input')

    const initAccordion = (accordion) => {
        const accordionTitle = accordion.querySelector('.base-accordion__title');

        accordionTitle.onclick = () => {
            if (accordion.classList.contains('active')) {
                accordion.classList.remove('active');
            } else {
                accordion.classList.add('active');
            }
        };
    };

    const initAccordions = () => {
        accordions.forEach(accordion => {
            initAccordion(accordion);
        });
    };

    const extendMatrix = () => {
        matrix.forEach(el => {
            el.classList.add('extended')
        })
    }

    const removeExtendMatrix = () => {
        matrix.forEach(el => {
            el.classList.remove('extended')
        })
    }

    const initExtendSwitch = () => {
        exntendSwitch.onchange = (e) => {
            if (e.target.checked) {
                extendMatrix()
            } else {
                removeExtendMatrix()
            }
        }
    }

    const initTags = () => {
        const filterTags = document.querySelectorAll('.filter__items > .filter-tag');
        const selectTags = document.querySelectorAll('.filter-select__options > .filter-tag');


        filterTags.forEach((filterTag, index) => {
            filterTag.onclick = () => {
            filterTag.classList.toggle('active');
            selectTags[index].classList.toggle('active');
            };
        });

        selectTags.forEach((selectTag, index) => {
            selectTag.onclick = () => {

            filterTags[index].classList.toggle('active');
            selectTag.classList.toggle('active');
            };
        });
        
    };

    const initScrollContainer = () => {
        const matrixContainer = document.querySelector('.matrix__container')
        const matrixScrollContainer = document.querySelector('.matrix__scroll-container')
        const leftBtn = matrixContainer.querySelector('.matrix__swipe-left-btn')
        const rightBtn = matrixContainer.querySelector('.matrix__swipe-right-btn')

        const startBtnOffset = 90

        leftBtn.style.top = startBtnOffset + 'px'
        rightBtn.style.top = startBtnOffset + 'px'

        let scrollAmount = matrixScrollContainer.scrollWidth / 8;

        const updateButtonVisibility = () => {
            if (matrixScrollContainer.scrollLeft === 0) {
                leftBtn.classList.remove('visible')
            } else {
                leftBtn.classList.add('visible')
            }
            if (Math.abs(matrixScrollContainer.scrollWidth - matrixScrollContainer.clientWidth - matrixScrollContainer.scrollLeft) < 1) {
                rightBtn.classList.remove('visible')
            } else {
                rightBtn.classList.add('visible')
            }
        }

        leftBtn.onclick = () => {
            matrixScrollContainer.scrollLeft -= scrollAmount;
            setTimeout(() => {
                updateButtonVisibility();
            }, 350)
        };

        rightBtn.onclick = () => {
            matrixScrollContainer.scrollLeft += scrollAmount;
            setTimeout(() => {
                updateButtonVisibility();
            }, 350)
        };

        let prevY = 0

        const onScroll = () => {
            if (!prevY) {
                prevY = window.pageYOffset
            }
            if (!window.pageYOffset) {
                rightBtn.style.top = startBtnOffset + 'px'
                leftBtn.style.top = startBtnOffset + 'px'
                return
            }
            const btnTop = parseInt(rightBtn.style.top)
            const newBtnTop = window.pageYOffset - prevY + btnTop
            rightBtn.style.top = newBtnTop + 'px'
            leftBtn.style.top = newBtnTop + 'px'

            prevY = window.pageYOffset
        }

        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', updateButtonVisibility)

        updateButtonVisibility()
    }

    const initFilterSelect = () => {
        const filterSelectContainer = document.querySelector('.filter-select__container');
        const filterSelectOptions = document.querySelector('.filter-select__options');
        const margin = 8;

        document.addEventListener('click', (event) => {
            const target = event.target;
            const isInsideContainer = target.closest('.filter-select__container');
            const isInsideCurrent = target.closest('.filter-select__current'); 

            if (isInsideContainer) {
                return;
            }

            if (filterSelectContainer.style.height === '0px') {
                if (isInsideCurrent) {
                    filterSelectContainer.style.height = filterSelectOptions.clientHeight + margin + 'px';
                }
            } else {
                filterSelectContainer.style.height = 0 + 'px';
            }
        });
        
        window.addEventListener('resize', ()=>{
            if(filterSelectContainer.style.height !== '0px') {
                filterSelectContainer.style.height = filterSelectOptions.clientHeight + margin + 'px';
            }
        })
    }

    const initLegendPopup = () => {
        const btn = document.querySelector('.matrix__legend-title.btn')
        const closeBtn = document.querySelector('.legend-popup__close')
        const legend = document.querySelector('.legend-popup')
        const legendPopup = document.querySelector('.legend-popup__container');

        btn.onclick = () => {
            if (window.innerWidth <= 1023) {
                legend.classList.add('visible')
            }
        }

        closeBtn.onclick = () => legend.classList.remove('visible')

        document.addEventListener('click', (event) => {
            if (!legendPopup.contains(event.target) && event.target !== btn) {
                legend.classList.remove('visible');
            }
        });
    }

    initLegendPopup();
    initExtendSwitch();
    initAccordions();
    initScrollContainer();
    initFilterSelect();
    initTags();
});