import type { Product } from "./product";

export class orderDetail {
 id?: number;
  productId: number;
  product?: Product;
  quantity: number;

  constructor(id:number, productId: number, product: Product, quantity: number){
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.quantity = quantity;
  }
}
