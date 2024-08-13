import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import FriendsScreen from './screens/FriendsScreen';
import DogPicScreen from './screens/DogPicScreen';
import JokeScreen from './screens/JokeScreen';
import GOTScreen from './screens/GOTScreen';
import FacebookLogin from './screens/FacebookLogin';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="Friends" component={FriendsScreen}/>
      <Stack.Screen name="Dog" component={DogPicScreen}/>
      <Stack.Screen name="Joke" component={JokeScreen}/>
      <Stack.Screen name="GOT" component={GOTScreen}/>
      <Stack.Screen name="Facebook" component={FacebookLogin}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
