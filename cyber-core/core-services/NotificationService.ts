import {Alert} from 'react-native';
import {ThreatAlert} from '../data-models';

class NotificationService {
  private static instance: NotificationService;

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  constructor() {
    // Simple notification service without external dependencies
  }

  public async requestPermissions(): Promise<boolean> {
    // For now, just return true since we're not using actual push notifications
    console.log('Notification permissions requested (simplified version)');
    return true;
  }

  public scheduleThreatAlert(threat: ThreatAlert) {
    // Log the threat alert instead of scheduling actual notification
    console.log(`🚨 Threat alert scheduled for ${threat.title} at ${threat.timestamp}`);
    console.log(`⚠️ Severity: ${threat.severity}, Category: ${threat.category}`);
  }

  public cancelThreatAlert(threatId: string) {
    console.log(`❌ Cancelled notification for threat ${threatId}`);
  }

  public updateThreatAlert(threat: ThreatAlert) {
    // Cancel existing notification
    this.cancelThreatAlert(threat.id);
    
    // Schedule new notification
    this.scheduleThreatAlert(threat);
  }

  public scheduleAllThreats(threats: ThreatAlert[]) {
    console.log('📋 Scheduling all threat alerts:');
    threats.forEach(threat => {
      if (!threat.isResolved) {
        this.scheduleThreatAlert(threat);
      }
    });
  }

  public showTestNotification() {
    Alert.alert(
      '🛡️ CyberGuardian',
      'This is a test notification from CyberGuardian',
      [{text: 'OK'}]
    );
  }

  public getScheduledNotifications(): Promise<any[]> {
    return new Promise((resolve) => {
      // Return empty array since we're not using actual notifications
      resolve([]);
    });
  }

  public clearAllNotifications() {
    console.log('🧹 Cleared all notifications (simplified version)');
  }
}

export default NotificationService;
