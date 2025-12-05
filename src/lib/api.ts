export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

const API_BASE_URL = "https://fakestoreapi.com"

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`)
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  return response.json()
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/products/categories`)
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/category/${category}`)
  if (!response.ok) {
    throw new Error("Failed to fetch products by category")
  }
  return response.json()
}

