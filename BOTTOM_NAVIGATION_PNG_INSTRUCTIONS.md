# Bottom Navigation PNG Images Setup

## How to Add PNG Images to Bottom Navigation

### Current Status
The app currently uses vector icons for the bottom navigation. To switch to PNG images, follow these steps:

### 1. Create PNG Images
Create the following PNG files in `src/assets/img/bottom/`:

- **1.png** - Notifications/Reminders icon
- **2.png** - Security/Shield icon  
- **3.png** - Heart/Favorites icon
- **4.png** - Lock/Password Generator icon
- **5.png** - Vault/Account icon

### 2. Image Requirements
- **Format**: PNG with transparency
- **Size**: 24x24px (or 48x48px for retina)
- **Style**: Outline icons work best for navigation
- **Background**: Transparent
- **Color**: Will be automatically tinted by the app

### 3. Update TabBarIcon Component
Once you have the PNG files, update `src/components/TabBarIcon.tsx`:

```typescript
// Replace the current implementation with:
const TabBarIcon: React.FC<TabBarIconProps> = ({routeName, focused, color, size}) => {
  const [imageError, setImageError] = useState(false);

  const getIconConfig = () => {
    switch (routeName) {
      case 'Reminders':
        return {
          pngPath: require('../assets/img/bottom/1.png'),
          fallbackIcon: 'notifications',
        };
      case 'Tips':
        return {
          pngPath: require('../assets/img/bottom/2.png'),
          fallbackIcon: 'security',
        };
      case 'Saved':
        return {
          pngPath: require('../assets/img/bottom/3.png'),
          fallbackIcon: 'favorite',
        };
      case 'Generator':
        return {
          pngPath: require('../assets/img/bottom/4.png'),
          fallbackIcon: 'lock',
        };
      case 'Vault':
        return {
          pngPath: require('../assets/img/bottom/5.png'),
          fallbackIcon: 'account-balance-wallet',
        };
      default:
        return {
          pngPath: require('../assets/img/bottom/1.png'),
          fallbackIcon: 'help',
        };
    }
  };

  const {pngPath, fallbackIcon} = getIconConfig();

  // If image failed to load, use vector icon
  if (imageError) {
    return (
      <Icon 
        name={fallbackIcon} 
        size={size} 
        color={focused ? color : '#999999'} 
      />
    );
  }

  // Try to use PNG image
  return (
    <Image 
      source={pngPath} 
      style={{
        width: size,
        height: size,
        tintColor: focused ? color : '#999999',
      }}
      resizeMode="contain"
      onError={() => {
        setImageError(true);
        console.log(`Failed to load PNG for ${routeName}, using fallback icon`);
      }}
    />
  );
};
```

### 4. Icon Suggestions
Here are some good icon sources for bottom navigation:

**Free Icon Resources:**
- [Feather Icons](https://feathericons.com/) - Clean outline icons
- [Heroicons](https://heroicons.com/) - Modern outline icons
- [Tabler Icons](https://tabler-icons.io/) - Consistent outline style
- [Lucide Icons](https://lucide.dev/) - Beautiful outline icons

**Icon Mapping:**
- **1.png**: `bell` or `notifications` icon
- **2.png**: `shield` or `security` icon
- **3.png**: `heart` or `favorite` icon
- **4.png**: `lock` or `key` icon
- **5.png**: `vault` or `safe` icon

### 5. Testing
After adding PNG images:
1. Run `npm start` to start Metro bundler
2. Test on iOS: `npm run ios`
3. Test on Android: `npm run android`

### 6. Fallback System
The current implementation includes a fallback system:
- If PNG images fail to load, vector icons will be used automatically
- This ensures the app always works, even if images are missing
- Console logs will show when fallbacks are used

### 7. Current Implementation
The app currently uses these vector icons:
- 🔔 Notifications (Reminders)
- 🛡️ Security (Tips)
- ❤️ Heart (Saved)
- 🔒 Lock (Generator)
- 🏦 Vault (Vault)

### 8. Troubleshooting
- **Images not showing**: Check file paths and ensure PNG files exist
- **Build errors**: Verify image file formats and sizes
- **Performance**: Optimize PNG files for mobile (compress if needed)
- **Tinting issues**: Ensure images have transparent backgrounds

## Quick Start
1. Download 5 PNG icons (24x24px, transparent background)
2. Save them as `1.png` through `5.png` in `src/assets/img/bottom/`
3. Update the TabBarIcon component with the code above
4. Test the app

The fallback system ensures your app will work even if you don't have PNG images yet!
