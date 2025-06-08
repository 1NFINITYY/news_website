// DOM Elements
const boxes = document.querySelectorAll('.select');
const search_button = document.querySelector('#search-button');
const input = document.getElementById("input");
const cardsContainer = document.getElementById('card-container');
const template = document.getElementById('card-template');
const image = document.getElementById("image");

// Load default news on page load
window.addEventListener('load', () => fetchNews("India"));

// Fetch news from your Vercel serverless function
async function fetchNews(query) {
    try {
        const res = await fetch(`/api/news?query=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (!data.articles || !Array.isArray(data.articles)) {
            cardsContainer.innerHTML = `<p>No news found for "${query}"</p>`;
            return;
        }

        bindData(data.articles);
    } catch (error) {
        console.error("Failed to fetch news:", error);
        cardsContainer.innerHTML = `<p>Error fetching news. Please try again later.</p>`;
    }
}

// Bind the news data to the UI
function bindData(articles) {
    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = template.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

// Fill one card with article data
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.textContent = article.title || "No Title";
    newsDesc.textContent = article.description || "No Description";

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.textContent = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

// Handle search button click
search_button.addEventListener('click', () => {
    const query = input.value.trim() || "India";
    fetchNews(query);
    boxes.forEach(box => box.classList.remove('selected'));
});

// Handle category click
boxes.forEach(box => {
    box.addEventListener('click', () => {
        boxes.forEach(b => b.classList.remove('selected'));
        fetchNews(box.innerHTML);
        box.classList.add('selected');
    });
});

// Handle logo click (reset to default)
image.addEventListener('click', () => {
    fetchNews("India");
    boxes.forEach(box => box.classList.remove('selected'));
});
