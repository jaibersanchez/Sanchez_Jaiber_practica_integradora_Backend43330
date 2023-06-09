import express from 'express';
import ProductoManager from '../productoManager.js';

const container = new ProductoManager('./src/data/products.json');
export const productsHtml = express.Router();

productsHtml.get('/', async (req, res) => {
  try {
    const products = await container.getProducts();
    return res.status(200).render('home', { products });
  } catch (error) {
    console.log(error);
  }
});