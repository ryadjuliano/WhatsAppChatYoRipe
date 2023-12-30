import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

import HomeScreen from "./Home";
import ChatScreen from './ChatScreen';


const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name='StartedLogin' component={LoginForm}  options={{headerShown: false}} /> */}
        {/* <Stack.Screen
          name="RegisterForm"
          component={RegScreen}
          options={{title: 'Register'}}
        /> */}
        {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Welcome'}}
        /> */}
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: true, title:'Chats'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;