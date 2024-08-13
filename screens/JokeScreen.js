import { StyleSheet, Text, Touchable, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler'

const JokeScreen = () => {
    const [data, setData] = useState([])
    const [showPunchline, setShowPunchline] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const END_POINT = 'https://official-joke-api.appspot.com/random_joke'

    const fetchData = async () => {
      setIsLoading(true)
        try {
            const response = await axios.get(END_POINT);
            setData(response.data);
            
        } catch (error) {
            console.log(error)
          
        }finally {
          setTimeout(()=> {
           setIsLoading(false) 
          }, 2000)
        }
    };

    useEffect(()=> {
        fetchData();
    }, [])


    const handleShowPunchline = () => {
        setShowPunchline(true);
    }

    const handleHidePunchLine = () => {
        setShowPunchline(false);
        fetchData();
    }

  return (
    <View style={styles.container}>
     {isLoading ? <Text style={styles.setUpTxt}>Wait...</Text> : <Text style={styles.setUpTxt}>{data.setup}</Text>}
      {showPunchline && 
      <>
      <Text style={styles.punchlineTxt}>
        {data.punchline} 🤪
      </Text> 
      <TouchableOpacity onPress={handleHidePunchLine}>
        <Text style={{
            fontSize: 40
        }}>🥲</Text>
        </TouchableOpacity>
    </>}
      {!showPunchline && <TouchableOpacity onPress={handleShowPunchline}>
        <Text style={styles.punchlineTxt}>??</Text>
      </TouchableOpacity>}
    </View>
  )
}

export default JokeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6a4c93'
    },
    setUpTxt: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#8ac926',
        marginBottom: 20
    },
    punchlineTxt: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#ff595e',
        marginBottom: 20
    }
})