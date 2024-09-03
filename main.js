import { toggleBox, updateCount, handleLinkClick } from './utils.js';
import { getDatabase, ref, set, update, onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js';

// Ваші Firebase конфігурації
const firebaseConfig = {
    apiKey: "AIzaSyAYj1yAtKimTm7ym00Kk3AfH6stlkoTxS0",
    authDomain: "like-counter-8cd29.firebaseapp.com",
    databaseURL: "https://like-counter-8cd29-default-rtdb.firebaseio.com",
    projectId: "like-counter-8cd29",
    storageBucket: "like-counter-8cd29.appspot.com",
    messagingSenderId: "403893805395",
    appId: "1:403893805395:web:f7c9993ba0fb016a04c1a6",
    measurementId: "G-451JTQES2S"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Функція для оновлення лічильників у Firebase
async function updateFirebaseCount(boxId, type, spanElement) {
    const currentCount = parseInt(spanElement.textContent, 10);
    const newCount = currentCount + 1;
    
    const countRef = ref(db, `counts/${boxId}_${type}`);
    await set(countRef, newCount);
    
    // Сортуємо коробки після оновлення лічильника
    sortBoxesByLikes();
}

// Функція ініціалізації лічильників
function initCounts() {
    document.querySelectorAll('.box').forEach((box, index) => {
        const likeSpan = box.querySelector('.like-count');
        const dislikeSpan = box.querySelector('.dislike-count');
        const neutralSpan = box.querySelector('.neutral-count');

        const boxId = `box${index}`;

        // Підписка на зміни в базі даних для цього конкретного box
        onValue(ref(db, `counts/${boxId}_likes`), (snapshot) => {
            likeSpan.textContent = snapshot.exists() ? snapshot.val() : 0;
            sortBoxesByLikes(); // Додаємо сортування при кожній зміні кількості лайків
        });

        onValue(ref(db, `counts/${boxId}_dislikes`), (snapshot) => {
            dislikeSpan.textContent = snapshot.exists() ? snapshot.val() : 0;
        });

        onValue(ref(db, `counts/${boxId}_neutrals`), (snapshot) => {
            neutralSpan.textContent = snapshot.exists() ? snapshot.val() : 0;
        });

        // Обробка кліків на іконки
        box.querySelector('.like-icon').addEventListener('click', (event) => {
            event.stopPropagation();
            updateFirebaseCount(boxId, 'likes', likeSpan);
        });

        box.querySelector('.dislike-icon').addEventListener('click', (event) => {
            event.stopPropagation();
            updateFirebaseCount(boxId, 'dislikes', dislikeSpan);
        });

        box.querySelector('.neutral-icon').addEventListener('click', (event) => {
            event.stopPropagation();
            updateFirebaseCount(boxId, 'neutrals', neutralSpan);
        });
    });

    sortBoxesByLikes(); // Першочергове сортування при ініціалізації
}

// Сортування box за кількістю лайків
function sortBoxesByLikes() {
    const boxes = Array.from(document.querySelectorAll('.box'));
    boxes.sort((a, b) => {
        const aLikes = parseInt(a.querySelector('.like-count').textContent, 10);
        const bLikes = parseInt(b.querySelector('.like-count').textContent, 10);
        return bLikes - aLikes;
    });
    
    const container = document.querySelector('.tab-content');
    boxes.forEach(box => container.appendChild(box));
}

// Виклик ініціалізації при завантаженні сторінки
document.addEventListener('DOMContentLoaded', initCounts);

document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => toggleBox(box));
});

document.querySelectorAll('.app-link').forEach(link => {
    link.addEventListener('click', handleLinkClick);
});
