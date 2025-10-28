import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS} from '../config/colors';

interface CustomHeaderProps {
  title?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.brandingContainer}>
        <Image source={require('../media-resources/media-assets/Group7.png')} style={styles.logo} />
      </View>
      
      <View style={styles.decorativeLine} />
      
      {title && (
        <Text style={styles.titleText}>{title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.background,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: 'contain',
  },
  brandingText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    textAlign: 'center',
  },
  neoText: {
    color: COLORS.primary,
  },
  eyeIcon: {
    fontSize: FONT_SIZES.xxl,
  },
  sentinelText: {
    color: COLORS.text,
  },
  decorativeLine: {
    height: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 1,
    marginBottom: SPACING.sm,
    // Add subtle curve effect
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  titleText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.text,
    textAlign: 'center',
  },
});

export default CustomHeader;
