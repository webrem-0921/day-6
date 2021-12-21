import axios from 'axios'

const uploadService = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/upload`
})

export function uploadImage(imageForm) {
    return uploadService.post('/image', imageForm)
}