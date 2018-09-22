
/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.previewSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.openedImageWrapperClass Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки открыть.
 */
const gallery = {
  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageCloseBtnSrc: 'images/gallery/close.png',
      openedImageErrorSrc: 'images/gallery/i.jpg',
      openedImageLeftSrc: 'images/gallery/left.png',
      openedImageRightSrc: 'images/gallery/right.png',
      openedImageLeftClass: 'galleryWrapperBack',
      openedImageRightClass: 'galleryWrapperNext',
      minImageClass: 'imgMin',

  },
    openedImage: null,
  /**
   * Инициализирует галерею, ставит обработчик события.
   * @param {Object} userSettings Объект настроек для галереи.
   */
  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settings, userSettings);

    // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
    // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
    // gallery и передадим туда событие MouseEvent, которое случилось.
    document
      .querySelector(this.settings.previewSelector)
      .addEventListener('click', event => this.containerClickHandler(event));

  },

  /**
   * Обработчик события клика для открытия картинки.
   * @param {MouseEvent} event Событие клики мышью.
   * @param {HTMLElement} event.target Целевой объект, куда был произведен клик.
   */
  containerClickHandler(event) {
    // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
    if (event.target.tagName !== 'IMG') {
      return;
    }
    // Открываем картинку с полученным из целевого тега (data-full_image_url аттрибут).
    this.openImage(event.target.dataset.full_image_url);
    this.openedImage = event.target;

     //console.log(this.openedImage);
    // console.log(this.openedImage.previousElementSibling);
     // console.log(this.getNextImage(event.target));
  },
    clickNextImage(event){
      let nextImage = this.getNextImage(this.openedImage);
      this.openImage(nextImage.dataset.full_image_url);
      this.openedImage = nextImage;
    },
    clickPrevImage(event){
        let nextImage = this.getPreviusImage(this.openedImage);
        this.openImage(nextImage.dataset.full_image_url);
        this.openedImage = nextImage;
    },
  /**
   * Открывает картинку.
   * @param {string} src Ссылка на картинку, которую надо открыть.
   */
  openImage(src) {
    // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
    this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;
  },

  /**
   * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
   * @returns {Element}
   */
  getScreenContainer() {
    // Получаем контейнер для открытой картинки.
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
    // Если контейнер для открытой картинки существует - возвращаем его.
    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    // Возвращаем полученный из метода createScreenContainer контейнер.
    return this.createScreenContainer();
  },

    getPreviusImage(image){
      let tempPrev = image.previousElementSibling;
      if(tempPrev) {
          return tempPrev;
      }
      else{
          let a = document.getElementsByClassName(this.settings.minImageClass);
          return a[a.length - 1];
      }
    },
    getNextImage(image) {
      let tempNext = image.nextElementSibling;
      if(tempNext){
        return image.nextElementSibling;
      }
      else{
         return document.getElementsByClassName(this.settings.minImageClass)[0];
      }
    },
    /**
     * Создает контейнер для открытой картинки.
     * @returns {HTMLElement}
     */
    createScreenContainer: function () {
        // Создаем сам контейнер-обертку и ставим ему класс.
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);
        //console.log(this);

        const leftRow = new Image();
        leftRow.classList.add(this.settings.openedImageLeftClass);
        leftRow.src = this.settings.openedImageLeftSrc;
        //leftRow.addEventListener('click', () => this.openImage(this.getPreviusImage().src));
        galleryWrapperElement.appendChild(leftRow);

        const rightRow = new Image();
        rightRow.classList.add(this.settings.openedImageRightClass);
        rightRow.src = this.settings.openedImageRightSrc;

        galleryWrapperElement.appendChild(rightRow);

        leftRow.addEventListener('click', () => this.clickPrevImage(event));
        rightRow.addEventListener('click', () => this.clickNextImage(event));
        // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
        const image = new Image();

        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);

        // Добавляем контейнер-обертку в тег body.
        document.body.appendChild(galleryWrapperElement);
        //console.log(getNextImage());
        // image.onerror = onerrorFunc ();
        image.addEventListener('error',event => this.errorFunc(event));
        // Возвращаем добавленный в body элемент, наш контейнер-обертку.
        return galleryWrapperElement;
    },
    /**
     * Функция обработки ошибки открытия картинки
     * @param event параметр
     */
    errorFunc(event) {
        console.log(event);
        event.target.src = this.settings.openedImageErrorSrc;
    },

/**
   * Закрывает (удаляет) контейнер для открытой картинки.
   */
  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  }
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});