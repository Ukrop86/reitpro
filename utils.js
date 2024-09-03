// utils.js
export function toggleBox(box) {
    const isExpanded = box.classList.contains('expanded');
    const boxes = document.querySelectorAll('.box');
    
    // Згортаємо всі віконечка
    boxes.forEach(b => b.classList.remove('expanded'));
    
    // Якщо віконечко не розгорнуте, розгортаємо його
    if (!isExpanded) {
        box.classList.add('expanded');
    }
}
export function updateCount(event, type) {
    event.stopPropagation(); // Не дозволяємо події кліку на іконку впливати на блок
    const countSpan = event.target.nextElementSibling;
    let count = parseInt(countSpan.textContent, 10);
    
    countSpan.textContent = count + 1;
}
export function handleLinkClick(event) {
  
    event.stopPropagation(); // Припиняємо подію кліку для віконечка
}
