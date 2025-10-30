import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS} from '../config/colors';
import {ThreatAlert} from '../data-models';
// import removed: GradientBorderButton no longer used on this screen

const ThreatMonitoringScreen: React.FC = () => {
  const [threats, setThreats] = useState<ThreatAlert[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const defaultThreats: ThreatAlert[] = [
    {
      id: '1',
      title: 'Suspicious Login Attempts: What They Are and How to Spot Them',
      description: 'This is a common security topic for awareness and learning. It does not imply this issue exists on your device.',
      severity: 'high',
      category: 'Authentication',
      timestamp: new Date(),
      isResolved: false,
      source: 'Security Article',
    },
    
    {
      id: '3',
      title: 'Network Anomalies: Examples and Analysis',
      description: 'This is a common security topic for awareness and learning. It does not imply this issue exists on your device.',
      severity: 'medium',
      category: 'Network',
      timestamp: new Date(Date.now() - 7200000),
      isResolved: true,
      source: 'Monitoring Guide',
    },
  ];

  useEffect(() => {
    loadThreats();
  }, []);

  const loadThreats = async () => {
    try {
      const storedThreats = await AsyncStorage.getItem('threatAlerts');
      if (storedThreats) {
        const parsedThreats = JSON.parse(storedThreats).map((threat: any) => ({
          ...threat,
          timestamp: new Date(threat.timestamp),
        }));
        setThreats(parsedThreats);
      } else {
        setThreats(defaultThreats);
        await saveThreats(defaultThreats);
      }
    } catch (error) {
      console.error('Error loading threats:', error);
      setThreats(defaultThreats);
    }
  };

  const saveThreats = async (newThreats: ThreatAlert[]) => {
    try {
      await AsyncStorage.setItem('threatAlerts', JSON.stringify(newThreats));
      setThreats(newThreats);
    } catch (error) {
      console.error('Error saving threats:', error);
    }
  };

  // интерактивные действия скрыты, так как это раздел со статьями/материалами

  const onRefresh = async () => {
    setRefreshing(true);
    await loadThreats();
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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'check-circle';
      default: return 'info';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const renderThreat = ({item}: {item: ThreatAlert}) => {
    const severityColor = getSeverityColor(item.severity);
    const severityIcon = getSeverityIcon(item.severity);

    return (
      <View style={[styles.threatCard, {borderLeftColor: severityColor, borderLeftWidth: 4}]}>
        <View style={styles.threatHeader}>
          <View style={styles.threatTitleContainer}>
            <Text style={{fontSize: 20, color: severityColor}}>
              {severityIcon === 'error' ? '🚨' : 
               severityIcon === 'warning' ? '⚠️' : 
               severityIcon === 'info' ? 'ℹ️' : '✅'}
            </Text>
            <Text style={styles.threatTitle}>{item.title}</Text>
          </View>
        </View>
        
        <Text style={styles.threatDescription}>{item.description}</Text>
        
        <View style={styles.threatInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Relevance:</Text>
            <Text style={[styles.infoValue, {color: severityColor}]}>
              {item.severity.toUpperCase()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Category:</Text>
            <Text style={styles.infoValue}>{item.category}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Source:</Text>
            <Text style={styles.infoValue}>{item.source}</Text>
          </View>
          
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image source={require('../media-resources/media-assets/1.png')} style={{width: 180, height: 180}} />
      <Text style={styles.emptyStateTitle}>Threat Monitoring Materials</Text>
      <Text style={styles.emptyStateDescription}>
        Examples and explanations of what can appear in security monitoring. This is educational content and is not tied to your device.
      </Text>
    </View>
  );

  // статистика скрыта, так как экран носит информативный характер

  return (
    <View style={styles.container}>
      {/***/}
      <FlatList
        data={threats}
        renderItem={renderThreat}
        keyExtractor={(item) => item.id}
        contentContainerStyle={threats.length === 0 ? styles.emptyContainer : styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  threatCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  threatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  threatTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  threatTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  threatActions: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  resolveButton: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  resolveButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  deleteButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  threatDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  threatInfo: {
    gap: SPACING.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: FONT_WEIGHTS.medium,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyStateTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptyStateDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
});

export default ThreatMonitoringScreen;
