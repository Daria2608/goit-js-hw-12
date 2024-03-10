import { makeRequest } from "./js/pixabay-api";
import { updateGallery } from "./js/render-functions";
import { smoothScrollToGallery } from "./js/render-functions";

// витягуємо елементи і задаємо початкові стилі
const searchBtn = document.querySelector('button');
const searchInput = document.querySelector('input');
const searchForm = document.querySelector('form');
let imagesCollection = document.querySelector('.images');
const loader = document.querySelector('.loader-span')
const loadBtn = document.querySelector('.load-button')
const LoadMore = document.querySelector('.load-more')

// початкові стилі
loader.style.display = 'none';
loadBtn.style.display = 'none';
LoadMore.style.display = 'none'

// імпортуємо бібліотеки
import axios from "axios";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom'
});

// оголошуємо пусті змінні для подальшої роботи

// пошуковий запит користувача
let QUERY = '';
// початкова сторінка і кількість елементів у віповіді
let page;
let per_page;
// кількість хітсів
let totalImages = 0;
// висота лі
let cardHeight;

//вішаємо слухача на подію сабміт

searchForm.addEventListener('submit', getLink);

function getLink(event) {
    imagesCollection.innerHTML = '';
     event.preventDefault();
     //отримуємо значення для пошуку від користувача
    QUERY = searchInput.value.trim();

    page = 1;
    // перевіряємо, чи користувач щось ввів
    if (QUERY !== "")  {
        //даємо згенероване посилання на сервер
        makeRequest(QUERY, page, per_page)
        //викликаємо функцію формування карток
        createCard()
    }
    else {
        
        iziToast.error({
                timeout: 3000,
                position: 'topRight',
                message:
                    'Sorry, there are no images matching your search query. Please try again!',
    });   
       loadBtn.style.display = 'none';
    }
    searchForm.reset();
}

// генеруємо галерею, показуємо кнопку лоад мор 
function createCard() {
    makeRequest(QUERY, page, 15).then(data => {
        updateGallery(data.hits);
        loader.style.display = 'none';
        loadBtn.style.display = 'block';
        lightbox.refresh() 
        }).catch(error => {
            console.error('Error fetching images:', error);
    });
}

// вішаємо слухача події на кнопку лоад мор
loadBtn.addEventListener('click', showMore)

function showMore()  {
    loadBtn.style.display = 'none';
    LoadMore.style.display = 'block';
    page++;
    makeRequest(QUERY, page, 15)
        .then(data => {
            totalImages = data.totalHits;
            updateGallery(data.hits);
            loader.style.display = 'none';
            // перевіряємо, чи було завантажено максимальну кількість зображень
            if (imagesCollection.children.length >= totalImages) {
                LoadMore.style.display = 'none';
                iziToast.info({
                    timeout: 3000,
                    position: 'topRight',
                    message: "You've reached the end of search results."
                });
            } else {
                loadBtn.style.display = 'block';
            }
            lightbox.refresh();
        })
        .catch(error => {
            console.error('Error fetching images:', error);
                iziToast.info({
                    timeout: 3000,
                    position: 'topRight',
                    message: "We're sorry, but you've reached the end of search results."
                });
        });
}
