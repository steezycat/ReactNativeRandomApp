import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import LottieView from 'lottie-react-native';

const DogPicScreen = () => {
    const animation = useRef(null)
    const [data, setData] = useState([])
    const END_POINT = 'https://dog.ceo/api/breeds/image/random'
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        try {
            const response = await axios.get(END_POINT);
            setData(response.data);
           
        } catch (error) {
            console.log(error)
        }finally {
            setTimeout(()=>{
                setIsLoading(false)
            }, 2000)
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

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
                </View> : <View style={styles.imageContainer}>
        
        <Text style={styles.title}>🐶 Your Lucky Dog Pic 🐶</Text>
        <Image style={styles.image} source={{uri: data.message}} />
      <TouchableOpacity style={styles.btnContainer} onPress={handleChangePic}>
        <Text style={styles.changeTxt}>Change Pic</Text>
      </TouchableOpacity>
    </View>}
    </>
  )
}

export default DogPicScreen

const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: '#F9C74E',
        borderWidth: 5,
        borderColor: '#43AA8B',
        borderRadius: 40,
    },
    image: {
        width: 350,
        height: 300,
        borderWidth: 10,
        borderRadius: 30,
        marginTop: -250,
        borderColor: '#277DA1', 
        
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        backgroundColor: '#90BE6D'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F94144',
        marginBottom: 70
    },
    changeTxt: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F94144',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wait: {
        justifyContent: 'center',
        borderWidth: 10,
        borderRadius: 30,
        marginTop: -250,
        borderColor: '#277DA1',
        fontSize: 30,
        width: 350,
        height: 300,
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 120,
        fontWeight: 'bold',
        color: '#F94144'
    },
})