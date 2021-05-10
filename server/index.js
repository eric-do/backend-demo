const express = require('express')
const app = express()
const port = 3000
const { data } = require('./dummy')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/search', (req, res) => {
  const { kw } = req.body;
  const { results } = data;
  console.log(kw);
  const filtered = results.filter(product => product.name.search(kw) >= 0);
  res.send({ results: filtered });
})

app.get('/api/products/:productId/details', (req, res) => {
  const { productId } = req.params;
  console.log(`GET DETAILS: ${productId}`);
  const { results } = data;
  res.send(results[productId].details);
})

app.post('/api/cart', (req, res) => {
  const { productId } = req.body;
  console.log(`ADD TO CART: ${productId}`);
  const { results } = data;
  const response = `Successfully added ${results[productId].name} to cart!`;
  res.send(response);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})