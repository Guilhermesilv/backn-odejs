import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
  console.error('VITE_API_URL não está definida!')
}

// Remove a barra final da URL se existir
const baseURL = API_URL?.endsWith('/') ? API_URL.slice(0, -1) : API_URL

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})