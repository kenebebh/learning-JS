const news = document.getElementById('newsletter');

console.log(news);




news.addEventListener('click', (e) => {
   e.preventDefault();
   news.style.fontFamily = 'Georgia'; news.style.backgroundColor = 'yellow';
})