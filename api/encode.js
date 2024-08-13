
import base64 from 'react-native-base64'

const API_KEY_US='8Y8AIAuze0ybGIK4Waybn8JrBJv(fz'
const PASSWORD_US='Aib5)NtP6zsAj9POlTpF5B9w1WFQMD'

export const encodeBase64US = async () => {
    return base64.encode(`${API_KEY_US}|${PASSWORD_US}`)
  }