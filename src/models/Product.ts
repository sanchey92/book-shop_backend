import * as fs from 'fs';
import * as path from 'path';

export interface IProduct {
  id: string | null,
  title: string,
  imgUrl: string,
  price: string,
  description: string
}

const mainPath = path.join(__dirname, '..', 'data', 'products.json');

const getProductsFromFile = (): Promise<IProduct[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(mainPath, (error, data) => {
      if (error) {
        resolve([])
      } else {
        resolve(JSON.parse(data.toString()))
      }
    })
  })
}

const saveProductInFile = (data: IProduct[]): void => {
  fs.writeFile(mainPath, JSON.stringify(data), err => {
    if (err) throw err;
  })
}

export default class Product implements IProduct {
  constructor(public id: string | null,
              public  title: string,
              public imgUrl: string,
              public price: string,
              public description: string) {
  }

  static async fetchAll(): Promise<IProduct[]> {
    return await getProductsFromFile()
  }

  static async fetchById(id: string): Promise<IProduct> {
    const product = await Product.fetchAll();
    const idx = product.findIndex(el => el.id === id);
    return product[idx]
  }

  save() {
    getProductsFromFile()
      .then(product => {
        if (this.id) {
          const existProductIndex = product.findIndex(el => el.id === this.id);
          const updatedProducts = [...product];
          updatedProducts[existProductIndex] = this;
          saveProductInFile(updatedProducts);
        } else {
          this.id = Math.random().toString();
          product.push(this);
          saveProductInFile(product)
        }
      })
  }
}
