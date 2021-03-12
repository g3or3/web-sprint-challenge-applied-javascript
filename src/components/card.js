// TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

const Card = (article) => {
  const card = document.createElement('div')
  card.classList.add('card')

  const headline = document.createElement('div')
  headline.classList.add('headline')
  headline.textContent = article.headline

  const author = document.createElement('div')
  author.classList.add('author')
  
  const imgContainer = document.createElement('div')
  imgContainer.classList.add('img-container')

  const img = document.createElement('img')
  img.src = article.authorPhoto

  const span = document.createElement('span')
  span.textContent = `By ${article.authorName}`

  card.append(headline, author)
  author.append(imgContainer, span)
  imgContainer.append(img)

  return card
}


// TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

import axios from 'axios'

const cardAppender = (selector) => {
  const parent = document.querySelector(selector)

  axios
  .get('https://lambda-times-api.herokuapp.com/articles')
  .then(res => {
    for (const articles of Object.values(res.data['articles'])) {
      for (const article of articles) {
        const card = Card(article)
        parent.append(card)
      }
    }
  })
  .catch(err => console.log(err))
}

export { Card, cardAppender }
