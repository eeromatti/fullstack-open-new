import axios from 'axios'
const baseUrl = `http://localhost:3002/persons`

const getAll = () => {
  const request = axios.get(baseUrl)
  // console.log("request:", request)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  // console.log(`request:`, request)
  return request.then(response => response.data)
}

const del = (id) => {
  const url = `${baseUrl}/${id}`
  return axios.delete(url)
}

const update = (id, updatedObject) => {
  return axios.put(`${baseUrl}/${id}`, updatedObject)

}

export default { 
  getAll, create, del, update
}