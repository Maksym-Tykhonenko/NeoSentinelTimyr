import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import {COLORS} from '../config/colors';

const Loader: React.FC = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 162, // Длина пути анимации
          duration: 2000, // Половина времени анимации
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    
    animation.start();

    return () => {
      animation.stop();
    };
  }, [translateX]);

  return (
    <View style={styles.container}>
      <View style={styles.sectionCenter}>
        <View style={styles.sectionPath}>
          <Animated.View
            style={[
              styles.globe,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionCenter: {
    position: 'absolute',
    top: '50%',
    left: 0,
    zIndex: 10,
    transform: [{ translateY: -150 }],
    width: '100%',
    margin: 0,
    alignItems: 'center',
  },
  sectionPath: {
    position: 'relative',
    width: 238,
    height: 76,
    borderRadius: 35,
    margin: 0,
    backgroundColor: '#e6e6e6',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 20 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    borderWidth: 3,
    borderColor: 'rgba(225,225,225,0.07)',
    overflow: 'hidden',
  },
  globe: {
    position: 'absolute',
    width: 66,
    height: 66,
    top: 2,
    left: 2,
    borderRadius: 33,
    backgroundColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.65,
    shadowRadius: 40,
  },
});

export default Loader;
