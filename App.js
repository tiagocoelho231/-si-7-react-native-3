import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Form from './components/Form';
import Header from './components/Header';

export default function App() {
  return (
    <View style={styles.wrapper}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <Form />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  scrollView: {
    backgroundColor: '#ffffff',
    flex: 1
  }
});
