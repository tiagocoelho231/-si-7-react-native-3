import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require('../assets/logo.jpg')} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3d8af7',
    paddingBottom: 20,
    paddingTop: 40,
    paddingHorizontal: 20
  },
  logo: {
    height: 30,
    aspectRatio: 37 / 30
  }
});
