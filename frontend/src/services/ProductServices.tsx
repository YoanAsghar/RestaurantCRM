import { Product } from "../models/product";
import { config } from "../config";

const API_URL = config.apiRoute + "/api/v1/Product"

export const ProductServices = {
  getAll: async(searchTerm : string = ""): Promise<Product[]> =>{
    //If search term is empty return all products     
      if(searchTerm === ""){
      const response = await fetch(API_URL + "/search");
      return await response.json();
    }

    const response = await fetch(API_URL + `/search?search=${searchTerm}`)
    return await response.json();
  }
}
