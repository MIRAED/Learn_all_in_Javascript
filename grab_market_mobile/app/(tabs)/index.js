import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView} from "react-native";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from "../../screens/main";
import ProductScreen from "../../screens/product";


const Stack = createNativeStackNavigator();


export default function App() {
 

  return (
    <GestureHandlerRootView>
    <SafeAreaView style={styles.safeAreaView}>
      
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={{
            title: "홈 화면"
          }} />
          <Stack.Screen name="Product" component={ProductScreen} options={{
            title: "상품 화면"
          }} />
        </Stack.Navigator>
   
      
    </SafeAreaView>
    </GestureHandlerRootView>
  );

}

const styles = StyleSheet.create({
  
  safeAreaView : {
    flex: 1,
    backgroundColor: '#fff',
  }

});