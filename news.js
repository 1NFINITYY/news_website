const boxes = document.querySelectorAll('.select');
const search_button= document.querySelector('#search-button');
const select=document.getElementById("select")

const url='https://newsapi.org/v2/everything?q=';
const api_key="7d64ae4c10354faa9e62a2e3ef04b522";

window.addEventListener('load',()=> fetchNews("India"));


async function fetchNews(query){
     const res = await fetch(`${url}${query}&apiKey=${api_key}`);
     const data=await res.json();
     bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById('card-container'); 
    const template=document.getElementById('card-template'); 

    cardsContainer.innerHTML="";

    articles.forEach((article) => {
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
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

const input=document.getElementById("input");

search_button.addEventListener('click',()=>{
        if(input.value==""){
            fetchNews("India");
        }
        else{
            fetchNews(input.value);
        }
    boxes.forEach((box)=>{
        box.classList.remove('selected');
    });
    
})

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        
        boxes.forEach((box)=>{
            box.classList.remove('selected');
        });
        fetchNews(box.innerHTML)
        box.classList.add('selected');
    })
})

const image=document.getElementById("image");

image.addEventListener('click',()=> fetchNews("India"));
image.addEventListener('click',()=>{
    boxes.forEach((box)=>{
        box.classList.remove('selected');
    });
});