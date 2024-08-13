import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as Facebook from "expo-auth-session/providers/facebook"
import * as WebBrowser from "expo-web-browser"

WebBrowser.maybeCompleteAuthSession()

const FacebookLogin = () => {
    const [user, setUser] = useState(null)

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: "1461170601456842"
    })

    useEffect(() => {
        if(response && response.type === 'success' && response.authentication) {
            (async () => {
                const userInfoResponse = await fetch(
                    `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
                )
                const userInfo = await userInfoResponse.json()
                setUser(userInfo)
            })()
        }
    }, [response])

    const handlePressAsync = async () => {
        const result = await promptAsync()
        if(result.type !== "success") {
            alert("Uh oh, something went wrong")
            return
        }
    }

  return (
    <View style={styles.container}>
      {
        user ? (
            <Profile user={user} />
        ) : <Button
        disabled={!request}
        title="Sign in with Facebook"
        onPress={handlePressAsync}
        />
      }
    </View>
  )
}

function Profile({user}) {
    return (
        <View style={styles.profile}>
            <Image source={{ uri: user.picture.data.url }} style={styles.image} />
            <Text style={styles.name}>{user.name}</Text>
            <Text>ID: {user.id}</Text>
        </View>
    )
}

export default FacebookLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profile: {
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    }
})