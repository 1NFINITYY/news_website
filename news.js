const boxes = document.querySelectorAll('.select');
const search_button = document.querySelector('#search-button');
const input = document.getElementById("input");
const cardsContainer = document.getElementById('card-container');
const template = document.getElementById('card-template');
const image = document.getElementById("image");

const SERVERLESS_API_URL = '/api/news?query=';  // Your new backend endpoint

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    try {
        const res = await fetch(`${SERVERLESS_API_URL}${encodeURIComponent(query)}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("API response:", data);

        if (!data.articles || !Array.isArray(data.articles)) {
            console.error("No articles found in API response", data);
            cardsContainer.innerHTML = `<p>No news found for "${query}"</p>`;
            return;
        }

        bindData(data.articles);
    } catch (error) {
        console.error("Failed to fetch news:", error);
        cardsContainer.innerHTML = `<p>Error fetching news. Please try again later.</p>`;
    }
}

function bindData(articles) {
    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = template.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

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

search_button.addEventListener('click', () => {
    const query = input.value.trim() || "India";
    fetchNews(query);
    boxes.forEach(box => box.classList.remove('selected'));
});

boxes.forEach(box => {
    box.addEventListener('click', () => {
        boxes.forEach(b => b.classList.remove('selected'));
        fetchNews(box.innerHTML);
        box.classList.add('selected');
    });
});

image.addEventListener('click', () => {
    fetchNews("India");
    boxes.forEach(box => box.classList.remove('selected'));
});
