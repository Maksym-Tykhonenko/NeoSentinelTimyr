export interface ThreatAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  timestamp: Date;
  isResolved: boolean;
  source: string;
}

export interface VulnerabilityReport {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  cveId: string;
  isSaved: boolean;
  createdAt: Date;
  remediation: string;
  affectedSystems: string[];
}

export interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  timestamp: Date;
  resolution?: string;
  affectedSystems: string[];
  incidentType: string;
}

export interface EncryptionResult {
  id: string;
  originalText: string;
  encryptedText: string;
  key: string;
  timestamp: Date;
  operation: 'encrypt' | 'decrypt';
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  reminderTime: string; // HH:MM format
  soundEnabled: boolean;
}

export interface AppSettings {
  notifications: NotificationSettings;
  biometricEnabled: boolean;
  theme: 'dark' | 'light';
}

export interface GeneratedPassword {
  password: string;
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  createdAt: Date;
}

export type TabParamList = {
  Threats: undefined;
  Analysis: undefined;
  Journal: undefined;
  Encryption: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  Onboarding: undefined;
  AddThreat: {threat?: ThreatAlert};
  EditThreat: {threat: ThreatAlert};
};
