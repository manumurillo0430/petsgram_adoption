import axios from 'axios'

const BASE_URL = 'https://ec2-54-195-178-147.eu-west-1.compute.amazonaws.com'

export const GetReq = async (path) => {
  const rest = await axios.get(BASE_URL + path, {
    withCredentials: true,
  })
  return rest.data
}

export const GetReqQuery = async (path, params) => {
  console.log(params, 'params')
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
  console.log(data, 'delete')
  const rest = await axios.delete(BASE_URL + path, {
    data: data,
    withCredentials: true,
  })
  return rest.data
}
