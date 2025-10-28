import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS} from '../config/colors';
import GradientBorderButton from '../ui-elements/GradientBorderButton';

const {width, height} = Dimensions.get('window');

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  image: any;
}

interface OnboardingScreenProps {
  onComplete: () => void;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: '1',
    title: 'Welcome to CyberGuardian',
    description: 'Your advanced cybersecurity command center. Monitor threats, analyze vulnerabilities, and protect your digital assets with enterprise-grade security tools.',
    image: require('../media-resources/media-assets/1.png'),
  },
  {
    id: '2',
    title: 'Real-Time Threat Monitoring',
    description: 'Advanced threat detection system that continuously monitors your network and alerts you to potential security breaches and suspicious activities.',
    image: require('../media-resources/media-assets/2.png'),
  },
  {
    id: '3',
    title: 'Vulnerability Analysis Engine',
    description: 'Comprehensive security scanning that identifies weaknesses in your systems and provides detailed remediation strategies.',
    image: require('../media-resources/media-assets/3.png'),
  },
  {
    id: '4',
    title: 'Security Incident Journal',
    description: 'Track and manage security incidents with detailed logging, resolution tracking, and comprehensive incident reports.',
    image: require('../media-resources/media-assets/4.png'),
  },
  {
    id: '5',
    title: 'Advanced Data Encryption',
    description: 'Military-grade encryption tools to protect your sensitive data with AES-256 encryption and secure key management.',
    image: require('../media-resources/media-assets/5.png'),
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({onComplete}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingSteps.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({index, animated: true});
  };

  const renderStep = ({item}: {item: OnboardingStep}) => (
    <View style={styles.stepContainer}>
      <View style={styles.imageContainer}>
        <Image source={require('../media-resources/media-assets/c2a94c3873fe3abc9b5984103658d00c0eeb294d.png')} style={{position: 'absolute',  bottom: 10, width: 420, height: 320}} />
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {onboardingSteps.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dot,
            index === currentIndex && styles.activeDot,
          ]}
          onPress={() => handleDotPress(index)}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.logo}>NEO SENTINEL</Text>
      </View> */}

      <FlatList
        ref={flatListRef}
        data={onboardingSteps}
        renderItem={renderStep}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />

      {renderDots()}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <GradientBorderButton
          title={currentIndex === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={styles.nextButtonContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  logo: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold' as const,
    color: COLORS.text,
    textAlign: 'center',
  },
  stepContainer: {
    width,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageContainer: {
    width: 200,
    height: 200,
    // borderRadius: 100,
    // backgroundColor: COLORS.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxl,
  },
  emoji: {
    fontSize: 80,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold' as const,
    color:'#10B01B',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  description: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textTertiary,
    marginHorizontal: SPACING.xs,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingBottom: 50,
  },
  skipButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  skipButtonText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    fontWeight: '500' as const,
  },
  nextButtonContainer: {
    minWidth: 120,
  },
});

export default OnboardingScreen;
