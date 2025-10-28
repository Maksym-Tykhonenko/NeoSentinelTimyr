import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface OnboardingImageProps {
  source: string;
  style?: any;
}

const OnboardingImage: React.FC<OnboardingImageProps> = ({source, style}) => {
  // Check if it's an emoji
  const isEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(source);
  
  if (isEmoji) {
    return <Text style={[styles.emoji, style]}>{source}</Text>;
  }
  
  // Check if it's a local require path
  if (source.includes('require(')) {
    try {
      const imageSource = eval(source);
      return <Image source={imageSource} style={[styles.image, style]} />;
    } catch (error) {
      console.warn('Failed to load image:', source);
      return <Text style={[styles.emoji, style]}>📱</Text>;
    }
  }
  
  // Assume it's a URL or file path
  return <Image source={{uri: source}} style={[styles.image, style]} />;
};

const styles = StyleSheet.create({
  emoji: {
    fontSize: 80,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});

export default OnboardingImage;
