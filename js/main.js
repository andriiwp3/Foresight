document.addEventListener('DOMContentLoaded', () => {
   /** General **/
   const testWebP = callback => {
   let webP = new Image()
   webP.onload = webP.onerror = () => {
      callback(webP.height == 2)
   }
   webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}

testWebP(support => {
   if (support == true) {
      document.querySelector('body').classList.add('webp')
   } else {
      document.querySelector('body').classList.add('no-webp')
   }
})

   // HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());
   const burgerMenu = () => {
   const iconMenu = document.querySelector('.icon-menu')
   const body = document.querySelector('body')
   const menuBody = document.querySelector('.menu__body')
   if (iconMenu) {
      iconMenu.addEventListener('click', function () {
         iconMenu.classList.toggle('active')
         body.classList.toggle('lock')
         menuBody.classList.toggle('active')
      })
   }
}
burgerMenu()

   const form = form => {
   form.addEventListener('submit', e => {
      e.preventDefault()

      let err = 0
      const valElements = form.querySelectorAll('._val input, ._val textarea')
      valElements.forEach(elem => {
         const parent =
            elem.type === 'checkbox'
               ? elem.closest('.checkbox')
               : elem.closest('.form__elem')
         err += validation(parent, elem)
      })
      if (err === 0) {
      }
   })

   const formElements = form.querySelectorAll(
      '.form__elem input, .form__elem textarea',
   )
   formElements.forEach(elem => {
      const parent = elem.closest('.form__elem')

      elem.addEventListener('focus', () => {
         focusInput(parent)
         parent.classList.contains('err') && removeError(parent)

         !form.querySelector('.err') && removeError(form)
      })
      elem.addEventListener('blur', () => {
         elem.value = elem.value.trim()
         blurInput(parent)

         parent.classList.contains('_val') && validation(parent, elem)
      })
   })

   const formCheckbox = form.querySelectorAll('.checkbox')
   formCheckbox.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
         if (!checkbox.querySelector('input').checked) return

         checkbox.classList.contains('err') && removeError(checkbox)
         !form.querySelector('.err') && removeError(form)
      })
   })

   const validation = (parent, elem) => {
      let err = 0
      if (parent.classList.contains('_req')) {
         err += !elem.value.trim() ? addError(parent, form) : 0
      }
      if (elem.type === 'email') {
         const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         err += re.test(elem.value) ? 1 : false
      }
      if (elem.type === 'checkbox' && parent.classList.contains('_req')) {
         err += +!elem.checked ? addError(parent, form) : 0
      }
      return err
   }
   const focusInput = elem => {
      elem.classList.add('focus')
   }
   const blurInput = elem => {
      elem.classList.remove('focus')
   }
   const addError = (elem, form) => {
      elem.classList.add('err')
      form && form.classList.add('err')
      return 1
   }
   const removeError = elem => {
      elem.classList.remove('err')
   }
}

   const contactForm = document.querySelector('.contact__form')
   form(contactForm)

   /** Custom JS **/
   const lampBlink = () => {
   const lamp = document.querySelector('.hero__lamp')
   const removeBlink = () => {
      lamp.classList.remove('_non-hovered')
      lamp.removeEventListener('mouseover', removeBlink)
   }
   if (lamp && lamp.classList.contains('_non-hovered')) {
      lamp.addEventListener('mouseover', removeBlink)
   }
}
lampBlink()

})
