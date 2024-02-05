
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ShowDetails from '../screens/ShowDetails';
import Header from '../components/Header';
import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import FavoriteList from '../screens/FavoriteList';

type RootStackParamList = {
  Home: undefined;
  ShowDetails: undefined;
  FavoriteList: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerTitle: () => <Header/>,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('FavoriteList')}>
              <Text>Favorite</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ShowDetails"
        component={ShowDetails}
        options={{
          headerTitle: () => <Header/>,
        }}
      />
      <Stack.Screen
        name="FavoriteList"
        component={FavoriteList}
        options={{
          headerTitle: () => <Header/>,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;