/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CommonProvider } from './src/context/context';
import MainNavigator from './src/navigation/MainNavigator';


function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </CommonProvider>
    </SafeAreaView>
  );
}




export default App;
