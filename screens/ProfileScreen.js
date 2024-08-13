import axios from 'axios';
import { StyleSheet, Text, View, Image, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';


const openUrl = async (url) => {
    console.log(url)
    const isUrlSupported = await Linking.canOpenURL(url)
    if (isUrlSupported) {
      await Linking.openURL(url)
    }else{
        console.log("cannot open")
    }
}

const ProfileScreen = ({route, navigation}) => {
    const animation = useRef(null)
    const { id } = route.params;
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const END_POINT = `https://jsonplaceholder.typicode.com/users/${id}`;

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(END_POINT);
            setUsers(response.data);
            
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(()=>{
                setIsLoading(false)
            }, 2000)
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    function showLoadingScreen() {
        return (
            <LoadingScreen/>
        )
    }

    return (
        <>
            {isLoading ? (
                <View style={{
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
                </View>
                       
            ) : (
                <>
                    <View style={styles.welcomecontainer}>
                        <Text style={styles.welcome}>Hello, {users.username} 👾</Text>
                    </View>
                    <View style={styles.container}>
                        <Image style={styles.img} source={require('../assets/dp.jpg')} />
                        <Text style={styles.title}>{users.name}</Text>
    
                        <View style={{
                            backgroundColor: '#0e9594',
                            padding: 20,
                            borderRadius: 30,
                            width: 380,
                            height: 140
                        }}>
                            <TouchableOpacity onPress={()=> Linking.openURL(`tel:${users.phone}`)} style={styles.contactsContainer}>
                                <AntDesign style={{opacity: 0.6}} name="phone" size={20} color="#bb3e03" />
                                <Text style={styles.txtInfo}>{users.phone}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> Linking.openURL(`mailto:${users.email}`)} style={styles.contactsContainer}>
                                <Entypo style={{opacity: 0.6}} name="mail" size={20} color="#bb3e03" />
                                <Text style={styles.txtInfo}>{users.email}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={async () => {
                                openUrl(`https://google.com`)
                            }} style={styles.contactsContainer}>
                                <AntDesign style={{opacity: 0.6}} name="link" size={20} color="#bb3e03" />
                                <Text style={styles.txtInfo}>{users.website}</Text>
                            </TouchableOpacity>
                            <View  style={styles.contactsContainer}>
                                <Entypo style={{opacity: 0.6}} name="address" size={20} color="#bb3e03" />
                                <Text style={styles.txtInfo}>
                                    {users.address ? ( <Text style={styles.txtInfo}>{users.address.suite} {users.address.street} St., {users.address.city} </Text>
                                    ) : ( <Text style={styles.txtInfo}>Address Not Available</Text>
                                    )}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.companyInfo}>
                            {users.company ? (
                                <>
                                    <Text style={{
                                        fontSize: 50,
                                        fontWeight: 'bold',
                                        color: '#e9f5db'
                                    }}>🏢</Text>
                                    <Text style={{
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        color: '#2a9d8f'
                                    }}>{users.company.name}</Text>
                                    <Text style={{
                                        fontSize: 17,
                                        color: '#cfe1b9'
                                    }}>"{users.company.catchPhrase}"</Text>
                                    <Text style={{
                                        fontSize: 15,
                                        color: '#264653',
                                        fontWeight: 'bold'
                                    }}>{users.company.bs}</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={{
                                        fontSize: 50,
                                        fontWeight: 'bold',
                                        color: '#e9f5db'
                                    }}>🏢</Text>
                                    <Text style={{
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        color: '#cfe1b9'
                                    }}>Company Not Available</Text>
                                </>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("Friends", {name: users.name})} style={{
                            margin: 20,
                            backgroundColor: '#F5DAD2',
                            width: 170,
                            height: 50,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: '#f4a261',
                            borderWidth: 4
                        }}>
                            <Text style={{
                                fontWeight: '600',
                                color: '#264653',
                                fontSize: 20
                            }}>My Friends 🤝</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </>
    );
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#2a9d8f'
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#f4a261'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        color: '#f4a261'
    },
    contactsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 5
    }, 
    welcomecontainer: {
        backgroundColor: '#2a9d8f',
        paddingTop: 60,
        paddingLeft: 20
    },
    welcome: {
        fontSize: 30,
        color: '#264653',
        fontWeight: 'bold',
    },
    txtInfo: {
        color: '#f5dfbb'
    },
    companyInfo: {
        padding: 20,
        backgroundColor: '#e76f51',
        marginTop: 20,
        borderRadius: 20,
        alignItems: 'center',
        width: 380,
        height: 200
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight,
        justifyContent: 'center',
        alignItems: 'center'
    }
})