import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom'
});

let imagesCollection = document.querySelector('.images');
const LoadMore = document.querySelector('.load-more');
LoadMore.style.display = 'none'

export function updateGallery(images) {
    const galleryHTML = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="items">
            <a class="gallery-link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}">
            </a>
            <div class="info-gallery">
                <p class="gallery-description">
                    <span class="gallery-description-span">Likes:
                    <span class="span">${likes}</span>
                    </span>
                </p>
                <p class="gallery-description">
                    <span class="gallery-description-span">Views: <span class="span">${views}</span>
                    </span>   
                </p>
                <p class="gallery-description">
                    <span class="gallery-description-span">Comments: <span class="span">${comments}</span>
                    </span>   
                </p>
                <p class="gallery-description">
                    <span class="gallery-description-span">Downloads: <span class="span">${downloads}</span>
                    </span>   
                </p>
            </div>
        </div>`;
    }).join('');
        imagesCollection.innerHTML += galleryHTML;
        LoadMore.style.display = 'none';
        smoothScrollToGallery()
}

export function smoothScrollToGallery() {
    const cards = document.querySelectorAll('.items');
    
    if (cards.length > 0) {
        const cardHeight = cards[0].getBoundingClientRect().height;
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
}
