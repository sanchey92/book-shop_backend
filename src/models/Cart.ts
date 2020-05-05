import * as fs from 'fs';
import * as path from 'path';


const mainPath = path.join(__dirname, '..', 'data', 'cart.json');

const saveFile = (data:ICart) => {
  fs.writeFile(mainPath, JSON.stringify(data), (error) => {
    console.log(error)
  })
}

interface ICartProduct {
  id: string,
  quantity: number
}

interface ICart {
  products: ICartProduct[]
  totalPrice: number,
}

export default class Cart {

  static getCart = async (): Promise<ICart> => {
    return new Promise((resolve, reject) => {
      fs.readFile(mainPath, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(data.toString()))
        }
      })
    })
  }

  static addToCart = async (id: string, productPrice: number) => {
    const cart = await Cart.getCart();
    const idx = cart.products.findIndex(el => el.id === id);
    const existingProduct = cart.products[idx]

    let updatedProduct;

    if (existingProduct) {
      updatedProduct = {...existingProduct};
      updatedProduct.quantity! += 1
      cart.products = [...cart.products];
      cart.products[idx] = updatedProduct
    } else {
      updatedProduct = {id: id, quantity: 1}
      cart.products = [...cart.products, updatedProduct]
    }

    cart.totalPrice += +productPrice
    saveFile(cart)
  }

  static deleteFromCart = async (id: string, productPrice: number) => {
    const cart = await Cart.getCart();
    const updatedCart = {...cart};

    const product = updatedCart.products.find(el => el.id === id);
    if (!product) return ;

    const productQuantity = product.quantity;
    updatedCart.products = updatedCart.products.filter(el => el.id !== id);

    updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQuantity;
    saveFile(updatedCart)
  }
}