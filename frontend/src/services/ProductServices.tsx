import { Product } from "../models/product";
import { config } from "../config";

const API_URL = config.apiRoute + "/api/v1/Product"

export const ProductServices = {
  getAll: async(searchTerm : string = ""): Promise<Product[]> =>{
    //If search term is empty return all products     
    if(searchTerm === ""){
      const response = await fetch(API_URL + "/search");
      if(!response.ok) throw new Error ("Error fetching products");
      return await response.json();
    }

    const response = await fetch(API_URL + `/search?search=${searchTerm}`)
    if(!response.ok) throw new Error (`Error getting ${searchTerm} products`);
    return await response.json();
  },

  createProduct: async(product: Product): Promise<Product> => {
    const response = await fetch(API_URL, {
      method : "POST",
      headers : { "Content-Type": "application/json"},
      body : JSON.stringify(product)
    })

    if(!response.ok) throw new Error("Error creating product");
    
  return await response.json();
  },
  
  editProduct: async(product: Product): Promise<Product> => {
    const response = await fetch(API_URL + `/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
    
    console.log(product);

    if(!response.ok) throw  new Error (`Error editing product to ${product.name}`);

  return await response.json();
  },
  
  deleteProduct: async(id: number): Promise<Product> => {
    const response = await fetch(API_URL + `/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json"}
    })

    if(!response.ok) throw new Error (`Error deleting product by id ${id}`);

    return await response.json();
  }
}
