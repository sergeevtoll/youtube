import { API_URL } from 'config/urls'
import axios from 'axios'

export default axios.create({
  baseURL: API_URL,
})
