
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Pressable, StatusBar, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'


const  HomeScreen =  ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('')

   
  return (
    <>
    
    <View style={styles.welcomecontainer}>
        
        <Text style={styles.welcome}>Welcome 👻</Text>
    </View>
    <View style={styles.container}>  
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 50}}>
        <Text style={styles.txt}>👋 What is your ID number?</Text>
         <TextInput
            style={styles.input}
            onChangeText={setId}
            keyboardType='numeric'
            value={id}
            placeholder='ID Number'
            placeholderTextColor='#E76F51'
         />

        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Profile not found with this ID</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Okay</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ScrollView>
        <TouchableOpacity onPress={() => id > 10 || id < 1 ? setModalVisible(true) : navigation.navigate("Profile", {id: id})} style={styles.btnContainer}>
            <Text style={styles.btnCheck}>👤 Check my profile 👤</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => navigation.navigate('Dog')} style={styles.btnContainer}>
            <Text style={styles.btnDog}>🐶 Get Lucky Dog Pic 🐶</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Joke')} style={styles.btnContainer}>
            <Text style={styles.btnJoke}>🤪 Corny Joke 🤪</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('GOT')} style={styles.btnContainer}>
            <Text style={[styles.btnJoke, {color: '#588157'}]}>👑 GOT Quote 👑</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Facebook')} style={styles.btnContainer}>
            <Text style={[styles.btnJoke, {color: 'rgb(255,65,92)'}]}>Facebook</Text>
        </TouchableOpacity>
        </ScrollView>
    </View>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    welcomecontainer: {
        backgroundColor: '#001219',
        paddingTop: 60,
        paddingLeft: 20,
    },
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#001219'
    },
    btnContainer: {
        borderWidth: 3,
        borderRadius: 20,
        padding: 10,
        alignSelf: 'center',
        borderColor: '#F4A261',
        backgroundColor: '#005f73',
        marginBottom: 10,
        width: 300,
        
    },
    txt: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#0a9396',
        fontWeight: 'bold'
    },
    input: {
        fontSize:20,
        borderWidth: 4,
        borderColor: '#E9C46A',
        borderRadius: 10,
        color: '#E76F51',
        backgroundColor: '#94d2bd',
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnCheck: {
        fontSize: 20,
        color: '#e9d8a6',
        fontWeight: 'bold',
        textAlign: 'center'
    }, 
    welcome: {
        fontSize: 30,
        color: '#ca6702',
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        backgroundColor: '#f2542d',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#0e9594',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        height: 200
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
        width: 100
    },
      buttonClose: {
        backgroundColor: '#0e9594',
      },
      textStyle: {
        color: '#f5dfbb',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
        
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#127475',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 20
      },
      btnDog: {
        fontSize: 20,
        color: '#E76F51',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      btnContainerCat: {
        borderWidth: 3,
        borderRadius: 20,
        padding: 10,
        alignSelf: 'center',
        borderColor: '#F4A261',
        backgroundColor: '#005f73',
        marginBottom: 10
      },
      btnJoke: {
        fontSize: 20,
        color: '#d62828',
        fontWeight: 'bold',
        textAlign: 'center'
      },  
      btnCocktail: {
        fontSize: 20,
        color: '#84a59d',
        fontWeight: 'bold',
        textAlign: 'center'
      }
})