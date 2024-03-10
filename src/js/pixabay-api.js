import axios from "axios";

let totalImages = 0;
const loader = document.querySelector('.loader-span')
const loadBtn = document.querySelector('.load-button')
const LoadMore = document.querySelector('.load-more')

// початкові стилі
loader.style.display = 'none';
loadBtn.style.display = 'none';
LoadMore.style.display = 'none'

// для формування запиту на сервер дані
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '42597996-b1dc9edd2aa87e1c7d2b2d72b';

// робимо запит
export async function makeRequest(QUERY, page, per_page) {
    loader.style.display = 'block';
    const params = {
        key: KEY,
        q: `${QUERY}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: per_page,
        page: page
    };
    try {
        const response = await axios.get('/', {
            params: params
        });
        // зберігаємо загальну кількість зображень
        totalImages = response.data.totalHits;
        return response.data;
    }
    catch (error) {
        console.log(`Error! ${error}`);
        throw new Error;
    }
}
