import express from 'express';
import CartManager from '../cartManager.js';
import ProductoManager from '../productoManager.js';
import { CartService } from '../services/carts.service.js';

const containerCarts = new CartManager('./src/data/carts.json');
const containerProducts = new ProductoManager('./src/data/products.json');

const cartService = new CartService();

export const cartsRouter = express.Router();

cartsRouter.get('/', async (req, res) => {
  try {
    const carts = await cartService.getAll();
    res.status(201).json({ status: 'success', payload: carts });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'cart not found' });
  }
});

cartsRouter.get('/:cid/products', async (req, res) => {

  try {
    const cid = req.params.cid;
    const cart = await cartService.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: `cart ${cid} not found` });
    }
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'error getting cart' });
  }
});

cartsRouter.post('/', async (req, res) => {
 
  try {
    const cart = await cartService.createCart();
    res.status(201).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'error creating cart' });
  }
});


cartsRouter.put('/:cid/products/:pid', async (req, res) => {
  
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartService.addProductToCart(cid, pid);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: 'FATAL ERROR' });
  }
});


cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartService.removeProductFromCart(cid, pid);
    return res.status(200).json({
      status: 'success',
      msg: 'Product removed from cart',
      payload: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});