import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Share,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS} from '../config/colors';
import {SecurityIncident} from '../data-models';
import GradientBorderButton from '../ui-elements/GradientBorderButton';

const IncidentJournalScreen: React.FC = () => {
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const defaultIncidents: SecurityIncident[] = [
    {
      id: '1',
      title: 'Data Breach Attempt Blocked',
      description: 'Automated system successfully blocked multiple unauthorized access attempts to sensitive data.',
      category: 'Data Protection',
      severity: 'high',
      status: 'resolved',
      timestamp: new Date(Date.now() - 86400000),
      resolution: 'Access blocked, IP addresses blacklisted, additional monitoring enabled',
      affectedSystems: ['Database Server', 'Web Application'],
      incidentType: 'Unauthorized Access',
    },
    {
      id: '2',
      title: 'Malware Quarantine',
      description: 'Suspicious file detected and automatically quarantined before execution.',
      category: 'Malware Protection',
      severity: 'medium',
      status: 'investigating',
      timestamp: new Date(Date.now() - 172800000),
      resolution: 'File quarantined, system scan completed, no additional threats found',
      affectedSystems: ['Workstation-001', 'File Server'],
      incidentType: 'Malware Detection',
    },
    {
      id: '3',
      title: 'Network Intrusion Detected',
      description: 'Unusual network traffic patterns detected indicating potential intrusion attempt.',
      category: 'Network Security',
      severity: 'critical',
      status: 'resolved',
      timestamp: new Date(Date.now() - 259200000),
      resolution: 'Intrusion blocked, firewall rules updated, network segmentation implemented',
      affectedSystems: ['Firewall', 'Network Infrastructure'],
      incidentType: 'Network Intrusion',
    },
    {
      id: '4',
      title: 'Phishing Email Blocked',
      description: 'Email security system blocked phishing attempt targeting employees.',
      category: 'Email Security',
      severity: 'low',
      status: 'resolved',
      timestamp: new Date(Date.now() - 345600000),
      resolution: 'Email blocked, sender blacklisted, security awareness training scheduled',
      affectedSystems: ['Email Server', 'Security Gateway'],
      incidentType: 'Phishing Attack',
    },
    {
      id: '5',
      title: 'Privilege Escalation Attempt',
      description: 'Unauthorized attempt to escalate user privileges detected and prevented.',
      category: 'Access Control',
      severity: 'high',
      status: 'resolved',
      timestamp: new Date(Date.now() - 432000000),
      resolution: 'Attempt blocked, user account reviewed, additional access controls implemented',
      affectedSystems: ['Active Directory', 'User Management System'],
      incidentType: 'Privilege Escalation',
    },
  ];

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      const storedIncidents = await AsyncStorage.getItem('securityIncidents');
      if (storedIncidents) {
        const parsedIncidents = JSON.parse(storedIncidents).map((incident: any) => ({
          ...incident,
          timestamp: new Date(incident.timestamp),
        }));
        setIncidents(parsedIncidents);
      } else {
        setIncidents(defaultIncidents);
        await saveIncidents(defaultIncidents);
      }
    } catch (error) {
      console.error('Error loading incidents:', error);
      setIncidents(defaultIncidents);
    }
  };

  const saveIncidents = async (newIncidents: SecurityIncident[]) => {
    try {
      await AsyncStorage.setItem('securityIncidents', JSON.stringify(newIncidents));
      setIncidents(newIncidents);
    } catch (error) {
      console.error('Error saving incidents:', error);
    }
  };

  const handleShareIncident = async (incident: SecurityIncident) => {
    try {
      const shareContent = `Security Incident Report: ${incident.title}\n\nDescription: ${incident.description}\n\nCategory: ${incident.category}\nSeverity: ${incident.severity.toUpperCase()}\nStatus: ${incident.status.toUpperCase()}\nIncident Type: ${incident.incidentType}\n\nResolution: ${incident.resolution}\n\nShared from CyberGuardian`;
      await Share.share({
        message: shareContent,
        title: incident.title,
      });
    } catch (error) {
      console.error('Error sharing incident:', error);
      Alert.alert('Error', 'Failed to share incident report');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadIncidents();
    setRefreshing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return COLORS.error;
      case 'high': return '#FF6B35';
      case 'medium': return COLORS.warning;
      case 'low': return COLORS.info;
      default: return COLORS.textSecondary;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return COLORS.success;
      case 'investigating': return COLORS.warning;
      case 'open': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return 'check-circle';
      case 'investigating': return 'search';
      case 'open': return 'error';
      default: return 'info';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return 'Just now';
    }
  };

  const renderIncident = ({item}: {item: SecurityIncident}) => {
    const severityColor = getSeverityColor(item.severity);
    const statusColor = getStatusColor(item.status);
    const statusIcon = getStatusIcon(item.status);

    return (
      <View style={styles.incidentCard}>
        <View style={styles.incidentHeader}>
          <View style={styles.incidentTitleContainer}>
            <Text style={{fontSize: 20, color: statusColor}}>
              {statusIcon === 'check-circle' ? '✅' : 
               statusIcon === 'search' ? '🔍' : 
               statusIcon === 'error' ? '❌' : 'ℹ️'}
            </Text>
            <Text style={styles.incidentTitle}>{item.title}</Text>
          </View>
          <View style={styles.incidentBadges}>
            <View style={[styles.severityBadge, {backgroundColor: severityColor}]}>
              <Text style={styles.badgeText}>{item.severity.toUpperCase()}</Text>
            </View>
            <View style={[styles.statusBadge, {backgroundColor: statusColor}]}>
              <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.incidentCategory}>{item.category}</Text>
        <Text style={styles.incidentDescription}>{item.description}</Text>
        
        <View style={styles.incidentDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Incident Type:</Text>
            <Text style={styles.detailValue}>{item.incidentType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Affected Systems:</Text>
            <Text style={styles.detailValue}>{item.affectedSystems.join(', ')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailValue}>{formatTimestamp(item.timestamp)}</Text>
          </View>
        </View>
        
        {item.resolution && (
          <View style={styles.resolutionContainer}>
            <Text style={styles.resolutionLabel}>Resolution:</Text>
            <Text style={styles.resolutionText}>{item.resolution}</Text>
          </View>
        )}
        
        <View style={styles.incidentActions}>
          <GradientBorderButton
            title="Share Report"
            onPress={() => handleShareIncident(item)}
            icon={<Image source={require('../media-resources/media-assets/ion_share.png')} style={{width: 20, height: 20}} />}
            style={styles.shareButtonContainer}
          />
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image source={require('../media-resources/media-assets/4.png')} style={{width: 280, height: 180}} />
      <Text style={styles.emptyStateTitle}>No Security Incidents Recorded</Text>
      <Text style={styles.emptyStateDescription}>
        Your security systems are working well. Incident reports will appear here when security events occur.
      </Text>
      <GradientBorderButton
        title="Generate Security Report"
        onPress={() => {
          Alert.alert('Security Report', 'Comprehensive security report generated successfully.');
        }}
      />
    </View>
  );

  const resolvedIncidents = incidents.filter(incident => incident.status === 'resolved');
  const criticalIncidents = incidents.filter(incident => incident.severity === 'critical');

  return (
    <View style={styles.container}>
      {incidents.length > 0 && (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{incidents.length}</Text>
            <Text style={styles.statLabel}>Total Incidents</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, {color: COLORS.success}]}>{resolvedIncidents.length}</Text>
            <Text style={styles.statLabel}>Resolved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, {color: COLORS.error}]}>{criticalIncidents.length}</Text>
            <Text style={styles.statLabel}>Critical</Text>
          </View>
        </View>
      )}
      
      <FlatList
        data={incidents}
        renderItem={renderIncident}
        keyExtractor={(item) => item.id}
        contentContainerStyle={incidents.length === 0 ? styles.emptyContainer : styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  statNumber: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  listContainer: {
    padding: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  incidentCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  incidentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  incidentTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  incidentBadges: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  severityBadge: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.background,
    fontWeight: FONT_WEIGHTS.bold,
  },
  incidentCategory: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: '500' as const,
    textTransform: 'uppercase',
    marginBottom: SPACING.xs,
  },
  incidentDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  incidentDetails: {
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xs,
  },
  detailLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    width: 120,
  },
  detailValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: FONT_WEIGHTS.medium,
    flex: 1,
  },
  resolutionContainer: {
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
  },
  resolutionLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.xs,
  },
  resolutionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    lineHeight: 18,
  },
  incidentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareButtonContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyStateTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold' as const,
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
});

export default IncidentJournalScreen;
