import axios from 'axios'

<<<<<<< HEAD
const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? 'https://petsgram-adoption-server.onrender.com'
    : 'http://localhost:8080'
=======
const BASE_URL = 'http://localhost:8080'
>>>>>>> parent of 34a2e4845 (Merge pull request #5 from manumurillo0430/Frontend-updates)

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
