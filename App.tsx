import React, { useState } from 'react';
import { View, SafeAreaView,TextInput, Button } from 'react-native';
import RootNavigator from "./src/Navigator";

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
        <RootNavigator />
     </SafeAreaView>
  );
}
