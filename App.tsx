import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const generateRandomColor = () => {
    let g = Math.floor(Math.random() * 256)
    let r = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    // start code for warm vs cool colors
    // let b = Math.floor(Math.random() * (r + 1));
    // let r = Math.floor(Math.random() * (b + 1)); 
    const randomColor = `rgb(${r}, ${g}, ${b})`;
    return randomColor;
  };

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [backgroundColor, setBackgroundColor] = useState(generateRandomColor());

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'SpaceMono-Regular': require('./assets/fonts/SpaceMono-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setBackgroundColor(generateRandomColor());
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.timeText, { fontFamily: 'SpaceMono-Regular' }]}>{formatTime(currentTime)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'normal',
  },
});
