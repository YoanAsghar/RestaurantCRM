import { config } from "../config";
import type { User } from "../models/user";

const API_URL = `${config.apiRoute}/api/v1/User`

export const UserServices = {
  getAll: async(): Promise<User[]> => {
    const response = await fetch(API_URL, {
      credentials: "include",
      headers: { "Content-Type": "application/json"}
    })
    if(!response.ok) throw new Error("Error fetching users");

    return await response.json();
  },

  logIn: async(user: User): Promise<User> => {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

    if(response.ok){
      return await response.json();
    }
    else{
      return await response.json();
    }
  },

  createUser: async(newUser: User): Promise<User> => {
    const response = await fetch(API_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(newUser)
    })
    if(!response.ok) throw new Error("Error creating user");

    return await response.json();
  },

  editUser: async(userToEdit: User): Promise<User> => {

    const response = await fetch(API_URL, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(userToEdit)
    })
    if(!response.ok) throw new Error("Error creating user");

    return await response.json();
  },

  deleteUser: async(userToDelete: User): Promise<User> => {
    const response = await fetch(API_URL, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(userToDelete)
    })
    if(!response.ok) throw new Error("Error creating user");

    return await response.json();
  }
}
