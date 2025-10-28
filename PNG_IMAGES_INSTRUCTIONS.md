# PNG Images Setup Instructions

## How to Add PNG Images to Neo Sentinel

### 1. Onboarding Images
To replace the emoji icons with PNG images in the onboarding screen:

1. **Add your PNG files** to the `src/assets/img/` directory:
   - `1.png` - Welcome screen (🔐)
   - `2.png` - Password reminders (⏰)
   - `3.png` - Password generator (🔑)
   - `4.png` - Security tips (🛡️)
   - `5.png` - Secure vault (🏦)

2. **Update the onboarding steps** in `src/screens/OnboardingScreen.tsx`:
   ```typescript
   const onboardingSteps: OnboardingStep[] = [
     {
       id: '1',
       title: 'Welcome to Neo Sentinel',
       description: 'Your essential personal safety calendar and cybersecurity coach...',
       image: require('../assets/img/1.png'), // Replace '🔐' with this
     },
     // ... repeat for other steps
   ];
   ```

### 2. Image Requirements
- **Format**: PNG with transparency
- **Size**: 200x200px recommended
- **Background**: Transparent or matching app theme (#1F1D2A)
- **Style**: Modern, clean icons that match the app's design

### 3. Current Implementation
The app currently uses emoji icons as placeholders:
- 🔐 Welcome/Password security
- ⏰ Time/Reminders
- 🔑 Keys/Password generation
- 🛡️ Shield/Security
- 🏦 Bank/Vault

### 4. Automatic Detection
The `OnboardingImage` component automatically detects:
- **Emoji**: Displays as large text
- **PNG files**: Displays as images
- **URLs**: Loads from remote source

### 5. Testing
After adding PNG images:
1. Run `npm start` to start Metro bundler
2. Test on iOS: `npm run ios`
3. Test on Android: `npm run android`

### 6. Troubleshooting
- **Images not showing**: Check file paths and ensure PNG files exist
- **Build errors**: Verify image file formats and sizes
- **Performance**: Optimize PNG files for mobile (compress if needed)

## Example PNG Image Sources
You can find suitable icons at:
- [Feather Icons](https://feathericons.com/)
- [Heroicons](https://heroicons.com/)
- [Tabler Icons](https://tabler-icons.io/)
- [Lucide Icons](https://lucide.dev/)

Make sure to download PNG format and resize to 200x200px for best results.
