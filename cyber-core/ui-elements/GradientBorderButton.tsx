import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS} from '../config/colors';

interface GradientBorderButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const GradientBorderButton: React.FC<GradientBorderButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  icon,
}) => {
  return (
    <View style={[styles.gradientContainer, style]}>
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradientBorder}>
        <TouchableOpacity
          style={[
            styles.button,
            disabled && styles.buttonDisabled,
          ]}
          onPress={onPress}
          disabled={disabled}>
          {icon && (
            <View style={styles.iconContainer}>
              {icon}
            </View>
          )}
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: BORDER_RADIUS.lg,
  },
  gradientBorder: {
    borderRadius: BORDER_RADIUS.lg,
    padding: 1, // This creates the border effect
  },
  button: {
    // backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg - 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#000',
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default GradientBorderButton;
