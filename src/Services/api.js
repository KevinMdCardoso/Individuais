import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:58210/api/"
})

export default api
