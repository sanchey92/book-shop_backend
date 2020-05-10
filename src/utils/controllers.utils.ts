import Cart from "../models/Cart";
import Product from "../models/Product";

export const getCartProducts = async () => {
  const cart = await Cart.getCart()
  const products = await Product.fetchAll();
  const cartProducts = [];
  for (let product of products) {
    const cartProductData = cart.products.find(el => el.id === product.id)
    if (cartProductData) {
      cartProducts.push({productData: product, quantity: cartProductData.quantity})
    }
  }
  return {
    cartProducts: cartProducts,
    totalPrice: cart.totalPrice
  }
}