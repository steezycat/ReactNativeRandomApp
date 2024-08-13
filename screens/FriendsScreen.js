import axios from 'axios';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Modal, Pressable, StatusBar } from 'react-native'
import React, {useState, useEffect} from 'react'


const FriendsScreen = ({route}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { name } = route.params;
    const [users, setUsers] = useState([]);
    const [modalPhone, setModalPhone] = useState([]);
    const [modalEmail, setModalEmail] =  useState('');

    const END_POINT = `https://jsonplaceholder.typicode.com/users/`;

    
    useEffect(() => {
        async function init() {
            try {
                const response = await axios.get(END_POINT);
                setUsers(response.data);
                
            } catch (error) {
                console.log(error)
            }
    
        }

        init()
        
    }, [])

    const filteredUsers = users.filter(user => user.name !== name);

    const passDataToModal = (email, phone) => {
        setModalVisible(true);
        setModalEmail(email);
        setModalPhone(phone)
    }
    
    const renderUserItem = ({ item }) => (
        <>
        <StatusBar visible={true}/>
        <TouchableOpacity 
        onPress={()=>{passDataToModal(item.email, item.phone)}}
        style={styles.userItem}>
            <Text style={{
                color: '#f4a261',
                fontWeight: 'bold',
                fontSize: 20
            }}>🫡 {item.name}</Text>
        </TouchableOpacity>
         
       </>
    );

  return (
    <View style={styles.container}>
       
        <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>🤩 My Friends 🤩</Text>
        </View>
        <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredUsers}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id.toString()}
            />
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
            <View>
            <Text style={styles.modalText}>{modalEmail}</Text>
            <Text style={styles.modalText}>{modalPhone}</Text>
            </View>
             
             <Pressable
               style={[styles.button, styles.buttonClose]}
               onPress={() => setModalVisible(!modalVisible)}>
               <Text style={styles.textStyle}>Okay</Text>
             </Pressable>
           </View>
         </View>
       </Modal>
    </View>
  )
}

export default FriendsScreen

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginBottom: 20,
    },
    userItem: {
        backgroundColor: '#2a9d8f',
        margin: 10,
        padding: 15,
        borderRadius: 20,
        borderColor: '#264653',
        borderWidth: 3
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#e9c46a',
    },
    titleStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#264653'
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
        height: 250, 
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
})