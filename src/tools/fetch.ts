import axios from 'axios'
import API from './constants'

export default function fetch(url: string, data: any) {
  try {
    return new Promise((resolve, reject) => {
      axios.post(`${API.domain}${url}`, data).then(data => {
        if (data.data.code === 0) {
          resolve(data.data)
        } else {
          resolve(data.data)
        }
      }).catch(e => {
        reject(data.data)
      })
    })
  } catch (e) {
    console.log(e)
  }
}
