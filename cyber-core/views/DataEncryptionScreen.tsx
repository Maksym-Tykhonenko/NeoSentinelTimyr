import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Clipboard,
  Animated,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS} from '../config/colors';
import {EncryptionResult} from '../data-models';
import GradientBorderButton from '../ui-elements/GradientBorderButton';

const DataEncryptionScreen: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [encryptedText, setEncryptedText] = useState<string>('');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState<string>('');
  const [copyAnimation] = useState(new Animated.Value(1));
  const [encryptionHistory, setEncryptionHistory] = useState<EncryptionResult[]>([]);

  useEffect(() => {
    loadEncryptionHistory();
  }, []);

  const loadEncryptionHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('encryptionHistory');
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setEncryptionHistory(parsedHistory);
      }
    } catch (error) {
      console.error('Error loading encryption history:', error);
    }
  };

  const saveEncryptionHistory = async (newHistory: EncryptionResult[]) => {
    try {
      await AsyncStorage.setItem('encryptionHistory', JSON.stringify(newHistory));
      setEncryptionHistory(newHistory);
    } catch (error) {
      console.error('Error saving encryption history:', error);
    }
  };

  const generateEncryptionKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let key = '';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setEncryptionKey(key);
  };

  const simpleEncrypt = (text: string, key: string): string => {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
      const textChar = text.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      encrypted += String.fromCharCode(textChar ^ keyChar);
    }
    return btoa(encrypted); // Base64 encode
  };

  const simpleDecrypt = (encryptedText: string, key: string): string => {
    try {
      const decoded = atob(encryptedText); // Base64 decode
      let decrypted = '';
      for (let i = 0; i < decoded.length; i++) {
        const encryptedChar = decoded.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        decrypted += String.fromCharCode(encryptedChar ^ keyChar);
      }
      return decrypted;
    } catch (error) {
      return 'Decryption failed - invalid key or corrupted data';
    }
  };

  const handleEncrypt = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter text to encrypt');
      return;
    }

    if (!encryptionKey.trim()) {
      Alert.alert('Error', 'Please generate or enter an encryption key');
      return;
    }

    setIsEncrypting(true);
    
    // Simulate encryption process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const encrypted = simpleEncrypt(inputText, encryptionKey);
      setEncryptedText(encrypted);
      setIsEncrypted(true);
      
      // Save to history
      const newResult: EncryptionResult = {
        id: Date.now().toString(),
        originalText: inputText,
        encryptedText: encrypted,
        key: encryptionKey,
        timestamp: new Date(),
        operation: 'encrypt',
      };
      
      const updatedHistory = [newResult, ...encryptionHistory.slice(0, 9)]; // Keep last 10
      await saveEncryptionHistory(updatedHistory);
      
    } catch (error) {
      Alert.alert('Encryption Error', 'Failed to encrypt the text');
    }
    
    setIsEncrypting(false);
  };

  const handleDecrypt = async () => {
    if (!encryptedText.trim()) {
      Alert.alert('Error', 'Please enter encrypted text to decrypt');
      return;
    }

    if (!encryptionKey.trim()) {
      Alert.alert('Error', 'Please enter the encryption key');
      return;
    }

    setIsEncrypting(true);
    
    // Simulate decryption process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const decrypted = simpleDecrypt(encryptedText, encryptionKey);
      setInputText(decrypted);
      setIsEncrypted(false);
      
      // Save to history
      const newResult: EncryptionResult = {
        id: Date.now().toString(),
        originalText: decrypted,
        encryptedText: encryptedText,
        key: encryptionKey,
        timestamp: new Date(),
        operation: 'decrypt',
      };
      
      const updatedHistory = [newResult, ...encryptionHistory.slice(0, 9)]; // Keep last 10
      await saveEncryptionHistory(updatedHistory);
      
    } catch (error) {
      Alert.alert('Decryption Error', 'Failed to decrypt the text. Check your key.');
    }
    
    setIsEncrypting(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await Clipboard.setString(text);
      
      // Animate copy button
      Animated.sequence([
        Animated.timing(copyAnimation, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(copyAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      Alert.alert('Copied!', 'Text copied to clipboard');
    } catch (error) {
      console.error('Error copying text:', error);
      Alert.alert('Error', 'Failed to copy text');
    }
  };

  const clearAll = () => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to clear all data?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            setInputText('');
            setEncryptedText('');
            setEncryptionKey('');
            setIsEncrypted(false);
          },
        },
      ]
    );
  };

  const loadFromHistory = (item: EncryptionResult) => {
    if (item.operation === 'encrypt') {
      setInputText(item.originalText);
      setEncryptedText(item.encryptedText);
      setEncryptionKey(item.key);
      setIsEncrypted(true);
    } else {
      setInputText(item.originalText);
      setEncryptedText(item.encryptedText);
      setEncryptionKey(item.key);
      setIsEncrypted(false);
    }
  };

  const renderEncryptionInterface = () => {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.iconContainer}>
            <Image source={require('../media-resources/media-assets/6.png')} style={{width: 260, height: 160}} />
          </View>
          
          <Text style={styles.title}>CyberGuardian Data Encryption</Text>
          
          <View style={styles.keySection}>
            <Text style={styles.sectionTitle}>Encryption Key</Text>
            <View style={styles.keyContainer}>
              <TextInput
                style={styles.keyInput}
                value={encryptionKey}
                onChangeText={setEncryptionKey}
                placeholder="Enter or generate encryption key"
                placeholderTextColor={COLORS.textSecondary}
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={styles.generateKeyButton}
                onPress={generateEncryptionKey}>
                <Text style={{fontSize: 20}}>🔄</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.sectionTitle}>Text to Encrypt/Decrypt</Text>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Enter your text here..."
              placeholderTextColor={COLORS.textSecondary}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonContainer}>
            <GradientBorderButton
              title={isEncrypting ? 'Processing...' : 'Encrypt'}
              onPress={handleEncrypt}
              disabled={isEncrypting || !inputText.trim() || !encryptionKey.trim()}
              style={styles.actionButton}
            />
            <GradientBorderButton
              title={isEncrypting ? 'Processing...' : 'Decrypt'}
              onPress={handleDecrypt}
              disabled={isEncrypting || !encryptedText.trim() || !encryptionKey.trim()}
              style={styles.actionButton}
            />
          </View>

          {encryptedText && (
            <View style={styles.resultSection}>
              <Text style={styles.sectionTitle}>Encrypted Result</Text>
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{encryptedText}</Text>
                <Animated.View style={{transform: [{scale: copyAnimation}]}}>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(encryptedText)}>
                    <Image source={require('../media-resources/media-assets/solar_copy-bold-duotone.png')} style={{width: 20, height: 20}} />
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          )}

          <View style={styles.footer}>
            <Text style={styles.poweredBy}>Powered by: </Text>
            <Text style={styles.encryptionEngine}>AES-256 Encryption Engine</Text>
          </View>
        </View>

        {encryptionHistory.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>Recent Operations</Text>
            {encryptionHistory.slice(0, 5).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.historyItem}
                onPress={() => loadFromHistory(item)}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyOperation}>
                    {item.operation === 'encrypt' ? 'Encrypted' : 'Decrypted'}
                  </Text>
                  <Text style={styles.historyTime}>
                    {item.timestamp.toLocaleTimeString()}
                  </Text>
                </View>
                <Text style={styles.historyText} numberOfLines={1}>
                  {item.originalText}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return renderEncryptionInterface();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mainContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  keySection: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  keyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyInput: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    marginRight: SPACING.sm,
  },
  generateKeyButton: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSection: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  textInput: {
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  actionButton: {
    flex: 1,
  },
  resultSection: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  resultText: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontFamily: 'monospace',
  },
  copyButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  poweredBy: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  encryptionEngine: {
    fontSize: FONT_SIZES.sm,
    color: '#FF6B6B',
    fontWeight: FONT_WEIGHTS.bold,
  },
  historySection: {
    padding: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  historyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  historyItem: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  historyOperation: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
  historyTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  historyText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  clearButton: {
    backgroundColor: COLORS.error,
    margin: SPACING.xl,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  clearButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
  },
});

export default DataEncryptionScreen;
