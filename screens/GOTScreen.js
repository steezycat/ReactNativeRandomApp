import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import LottieView from 'lottie-react-native';
import { BlurView } from '@react-native-community/blur';

const GOTScreen = () => {
    const animation = useRef(null)
    const [data, setData] = useState([])
    const END_POINT = 'https://api.gameofthronesquotes.xyz/v1/random'
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        try {
            const response = await axios.get(END_POINT);
            setData(response.data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    const handleChangePic = () => {
        fetchData(); 
    };

  return (
    <>
    {isLoading ? <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#2a9d8f'
                }}>
                    <LottieView 
                    size="large"
                    autoPlay
                    ref={animation}
                    style={{
                        width: 300,
                        height: 300,
                        backgroundColor: '#2a9d8f'
                    }} 
                    source={require('../assets/Lottie Lego.json')}
                    />   
                </View> : <TouchableOpacity style={styles.container} onPress={handleChangePic}>
            <BlurView style={styles.subContainer}
            blurType="light"
        blurAmount={400}
        reducedTransparencyFallbackColor="white">
                {data && (
                    <>
                        <Text style={styles.quote}>"{data.sentence}"</Text>
                        {data.character && (
                            <Text style={styles.character}>
                                -{' '}
                                <Text style={{ color: '#f2cc8f' }}>
                                    {data.character.name}
                                </Text>{' '}
                                {data.character.house && data.character.house.name ? (
                                    <Text style={{ color: '#f2cc8f' }}>
                                        {' '}
                                        of {data.character.house.name}
                                    </Text>
                                ) : null}
                            </Text>
                        )}
                    </>
                )}
            </BlurView>
        </TouchableOpacity>}
        </>
  )
}

export default GOTScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        padding: 20,
        backgroundColor: '#f2e8cf'
    },
    quote: {
        textAlign: 'center',
        fontSize: 40,
        color: '#a7c957',
        fontWeight: 'bold',
        marginBottom: 20
    },
    character: {
        textAlign: 'center',
        fontSize: 20,
        color: '#dde5b6',
        fontWeight: 'bold'
    }, 
    subContainer: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#bc4749'  
    }
})