import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS} from '../config/colors';

interface TabBarIconProps {
  name: string;
  focused: boolean;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({name, focused, size}) => {
  const getEmoji = (routeName: string) => {
    switch (routeName) {
      case 'Threats':
        return '🛡️';
      case 'Analysis':
        return '🔍';
      case 'Journal':
        return '📋';
      case 'Encryption':
        return '🔐';
      case 'Vault':
        return '🗄️';
      default:
        return '🛡️';
    }
  };

  return (
    <View
      style={[
        styles.iconContainer,
        {
          backgroundColor: focused ? COLORS.primary : COLORS.cardBackground,
          width: 50,
          height: 50,
        },
      ]}>
      <Text style={{fontSize: 24}}>{getEmoji(name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default TabBarIcon;
