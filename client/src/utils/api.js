import axios from 'axios'
<<<<<<< HEAD
=======

>>>>>>> cd1729fdf897053278de24b90902eb1f98ad693b
const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? 'https://petsgram-adoption-server.onrender.com'
    : 'http://localhost:8080'

export const GetReq = async (path) => {
  const rest = await axios.get(BASE_URL + path, {
    withCredentials: true,
  })
  return rest.data
}

export const GetReqQuery = async (path, params) => {
  const rest = await axios.get(
    BASE_URL + path,
    { params: params },
    {
      withCredentials: true,
    },
  )
  return rest.data
}

export const PostReq = async (path, data) => {
  const rest = await axios.post(BASE_URL + path, data, {
    withCredentials: true,
  })
  return rest.data
}

export const PutReq = async (path, data) => {
  const rest = await axios.put(BASE_URL + path, data, { withCredentials: true })
  return rest.data
}
export const DeleteReq = async (path, data) => {
  const rest = await axios.delete(BASE_URL + path, {
    data: data,
    withCredentials: true,
  })
  return rest.data
}
