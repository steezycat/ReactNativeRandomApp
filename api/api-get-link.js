
import { encodeBase64US } from '../api/encode'
import axios from 'axios'

const API_URL_NA = 'https://na.bcpaytech.info/RestMobileWS/api'

const getAPIKey = async () => {
    return await encodeBase64US()
  }

export const getCustomerGuid = async () => {
    try {
      console.log(`${API_URL_NA}/get/customer`)
  
      const res = await axios({
        method: 'POST',
        url: `${API_URL_NA}/get/customer`,
        headers: {
          'Content-Type': 'application/json',
          'ApiKey': await getAPIKey(),
        },
        data: {
          strCIF: customerModel.customerCIF,
          strEmail: customerModel.customerEmail,
        },
      })
  
      if (res.status >= 200 && res.status < 300) {
        const data = await res.data
        console.log(JSON.stringify(data, undefined, 4))
  
        return data
      } else {
        return 'ERR'
      }
    } catch (e) {
      console.error(`Error : ${e}`)
      return 'ERR'
    }
  }