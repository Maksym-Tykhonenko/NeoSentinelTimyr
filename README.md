# Neo Sentinel - Personal Safety Calendar & Cybersecurity Coach

Neo Sentinel is a React Native application that serves as your essential personal safety calendar and cybersecurity coach. It helps you stay on top of password security by providing proactive reminders and secure password generation.

## 🔥 Key Features

### 1. Proactive Password Reminders (The Sentinel)
- Set rotation cycles (10-90 days) for each account in your personal Vault
- Receive clear, timely alerts exactly when a password is due for an update
- Get a quick overview of your security status right from the home dashboard

### 2. Built-in Secure Generation (Neo SecureGen)
- Seamlessly integrate with iCloud Keychain to generate strong, unique passwords
- Track the change date automatically to restart your security cycle after a successful update
- Copy and regenerate passwords with ease

### 3. Cybersecurity Tips (Knowledge is Power)
- Access short, practical, and up-to-date security tips daily
- Learn to spot phishing, strengthen 2FA, and improve your overall cyber hygiene
- Save and share tips with others

### 4. My Vault (Secure Tracking)
- Securely protected by Face ID / Touch ID
- Store only the service name and login for tracking purposes
- **Important**: Neo Sentinel DOES NOT store your actual passwords. We only track the update schedule.

## 🎨 Design

The app features a modern dark theme with vibrant green accents, matching the provided design specifications:
- Dark background (#1F1D2A) with gradient green borders (#BEFF60 to #008809)
- Clean, minimalist interface
- Intuitive navigation with bottom tabs
- Smooth animations and transitions
- Gradient border buttons with linear gradient from #BEFF60 to #008809

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NeoSentinel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the application**

   For iOS:
   ```bash
   npm run ios
   ```

   For Android:
   ```bash
   npm run android
   ```

## 📱 App Structure

### Screens

1. **Onboarding Screen**
   - Welcome introduction with dots indicator
   - 5-step onboarding process explaining app features
   - Skip option available

2. **Password Reminders**
   - Add new password reminders with custom intervals (10-90 days)
   - View all active reminders with status indicators
   - Mark reminders as completed
   - Delete reminders

3. **Security Tips**
   - Browse curated cybersecurity tips
   - Save tips to favorites
   - Share tips with others

4. **Saved Tips**
   - View all saved security tips
   - Remove tips from saved list
   - Share saved tips

5. **Password Generator**
   - Generate secure passwords with iCloud Keychain integration
   - Copy passwords to clipboard
   - Regenerate new passwords
   - Password strength indicator

6. **My Vault**
   - Secure vault protected by biometric authentication
   - Store service names and login information
   - Track password update schedules
   - Add/remove vault entries

### Services

1. **NotificationService**
   - Simplified notification system (logs reminders to console)
   - Tracks password reminder schedules
   - Ready for future push notification integration

2. **BiometricService**
   - Manages Face ID/Touch ID authentication
   - Handles biometric key creation and validation
   - Provides secure authentication for vault access

## 🔧 Configuration

### iOS Setup

1. **Enable Keychain Sharing**
   - Add Keychain Sharing capability in Xcode
   - Configure keychain access groups

2. **Configure Notifications (Optional)**
   - Currently using simplified notification system
   - Can be extended with push notifications in the future

3. **Biometric Authentication**
   - Add Face ID/Touch ID usage description in Info.plist
   - Configure biometric authentication settings

### Android Setup

1. **Permissions**
   - Notification permissions are handled automatically
   - Biometric authentication permissions are configured

2. **Keychain Integration**
   - Android Keystore integration for secure storage

## 🛡️ Security Features

- **No Password Storage**: The app never stores actual passwords
- **Biometric Protection**: Vault access protected by Face ID/Touch ID
- **Local Data**: All data stored locally on device
- **Secure Generation**: Passwords generated using secure algorithms
- **Encrypted Storage**: Sensitive data encrypted using device keychain

## 📦 Dependencies

### Core Dependencies
- `react-native`: 0.80.0
- `react`: 19.1.0
- `@react-navigation/native`: Navigation library
- `@react-navigation/bottom-tabs`: Bottom tab navigation
- `@react-native-async-storage/async-storage`: Local data storage

### Security & Authentication
- `react-native-biometrics`: Biometric authentication
- `react-native-keychain`: Secure keychain access

### UI & Utilities
- `react-native-vector-icons`: Icon library
- `react-native-share`: Share functionality
- `react-native-safe-area-context`: Safe area handling

## 🎯 Usage

### Adding Password Reminders
1. Navigate to the "Reminders" tab
2. Tap the "+" button to add a new reminder
3. Enter service name, interval (10-90 days), and optional comment
4. Save to schedule notifications

### Using Password Generator
1. Go to the "Generator" tab
2. Tap "Generate safe password"
3. Copy the generated password
4. Use "Regenerate" to create a new password

### Managing Security Tips
1. Browse tips in the "Tips" tab
2. Save interesting tips using the heart icon
3. View saved tips in the "Saved" tab
4. Share tips using the share button

### Accessing Your Vault
1. Navigate to the "Vault" tab
2. Authenticate using Face ID/Touch ID
3. Add service entries for tracking
4. View and manage your account list

## 🔒 Privacy & Security

Neo Sentinel is designed with privacy and security in mind:

- **Local Storage Only**: All data remains on your device
- **No Cloud Sync**: No data is sent to external servers
- **Biometric Protection**: Sensitive areas protected by device biometrics
- **Minimal Data Collection**: Only service names and login info stored
- **No Password Storage**: Actual passwords are never stored

## 🐛 Troubleshooting

### Common Issues

1. **iOS Pod Install Issues**
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

2. **Android Build Issues**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

3. **Notification System**
   - Currently using simplified logging system
   - Reminders are tracked and logged to console
   - Can be extended with actual push notifications later

4. **Biometric Authentication**
   - Verify device has biometric authentication set up
   - Check app permissions for biometric access

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Neo Sentinel** - Making password updates a routine, not a risk. 🔐