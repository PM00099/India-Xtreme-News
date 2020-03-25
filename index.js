console.log("This is my news website")

// Initialize the news api parameters
let country = 'in';
let cat = 'sports';
let apiKey = '301fbd60ffb34208bf2fd3c4bfa2668e';
let sources = 'google-news-in';
// Grab the news container
let newsAccordian = document.getElementById('newsAccordian');

// Create an ajex get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `
https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${apiKey}`, true);
xhr.getResponseHeader('Content-type', 'application/json');

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText)
        let articles = json.articles;
        let newsHtml = "";
        // console.log(articles);
        articles.forEach(function (element,index) {
            // console.log(element,index)

            let news = `<div class="card">
          <div class="card-header" id="heading${index}">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
              <b>Breaking News ${index + 1} : </b>${element["title"]}
              </button>
            </h2>
          </div>
      
          <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordian">
            <div class="card-body">
              ${element["content"]}.<a href="${element['url']}" target="_blank" >Read more here..</a
              >
            </div>
          </div>
        </div> `
            newsHtml += news;
        });
        newsAccordian.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send();

