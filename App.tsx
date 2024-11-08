import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [labelIndex, setLabelIndex] = useState(0); // Index for cycling labels
  const labels = ['RGB Colors', 'Warm Colors', 'Cool Colors'];
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const generateRandomColor = () => {
    let g = Math.floor(Math.random() * 256)
    let r = 0
    let b = 0
    
    if (labelIndex == 0) {
      r = Math.floor(Math.random() * 256)
      b = Math.floor(Math.random() * 256)
    } else if (labelIndex == 1) {
      r = Math.floor(Math.random() * 256)
      b = Math.floor(Math.random() * (r + 1))
    } else {
      b = Math.floor(Math.random() * 256)
      r = Math.floor(Math.random() * (b + 1))
    }
    const randomColor = `rgb(${r}, ${g}, ${b})`;
    return randomColor;
  };

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
  }, [labelIndex]);

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

  const handlePress = () => {
    setLabelIndex((prevIndex) => (prevIndex + 1) % labels.length);
  };

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={handlePress}>
      <Text style={styles.label}>{labels[labelIndex]}</Text>
      <Text style={[styles.timeText, { fontFamily: 'SpaceMono-Regular' }]}>{formatTime(currentTime)}</Text>
      <StatusBar style="auto" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 32,
    fontWeight: 'normal',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 36,
    fontWeight: 'normal',
  },
});
