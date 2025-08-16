export interface Message {
  id: string;
  messageId: string;
  fromAddress: string;
  fromDisplay: string;
  toAddress: string;
  subject: string;
  bodyHtml: string;
  bodyText: string;
  receivedAt: string;
  spfPass: boolean;
  dkimPass: boolean;
  dmarcPass: boolean;
  sourceIp: string;
  mlScore: number;
  status: 'allowed' | 'quarantined' | 'blocked' | 'suspicious';
  quarantineReason?: string;
  size: number;
  attachmentCount: number;
  urlCount: number;
  riskFactors: RiskFactor[];
  indicators: SecurityIndicator[];
}

export interface RiskFactor {
  type: 'domain_reputation' | 'sender_history' | 'content_analysis' | 'url_analysis' | 'attachment_risk';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  score: number;
}

export interface SecurityIndicator {
  type: 'spf' | 'dkim' | 'dmarc' | 'ip_reputation' | 'domain_age' | 'lookalike_domain' | 'suspicious_attachment' | 'phishing_keywords';
  status: 'pass' | 'fail' | 'warning' | 'neutral';
  message: string;
}

export interface Alert {
  id: string;
  tenantId: string;
  messageId?: string;
  severity: 'info' | 'warning' | 'high' | 'critical';
  title: string;
  description: string;
  createdAt: string;
  acknowledged: boolean;
  category: 'detection' | 'policy' | 'system' | 'user_action';
}

export interface Policy {
  id: string;
  tenantId: string;
  blockThreshold: number;
  quarantineThreshold: number;
  blockNewDomains: boolean;
  blockMacros: boolean;
  allowExternalImages: boolean;
  enableRealTimeAlerts: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  userCount: number;
  messageCount: number;
  detectionRate: number;
  falsePositiveRate: number;
  createdAt: string;
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  role: 'user' | 'analyst' | 'admin';
  mfaEnabled: boolean;
  lastLoginAt: string;
  createdAt: string;
}

export interface FilterState {
  status: string[];
  search: string;
  dateRange: [Date | null, Date | null];
  scoreRange: [number, number];
  sender: string;
}

export interface MetricData {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'analyst' | 'admin';
  tenantId: string;
  tenantName: string;
  mfaEnabled: boolean;
  lastLoginAt: string;
  createdAt: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    realTime: boolean;
  };
  language: string;
  timezone: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RealTimeEmail {
  id: string;
  messageId: string;
  fromAddress: string;
  fromDisplay: string;
  toAddress: string;
  subject: string;
  receivedAt: string;
  mlScore: number;
  status: 'processing' | 'allowed' | 'quarantined' | 'blocked';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  threatType?: string;
}

export interface ContentFilter {
  id: string;
  name: string;
  type: 'keyword' | 'domain' | 'attachment' | 'url' | 'header';
  pattern: string;
  action: 'allow' | 'quarantine' | 'block';
  enabled: boolean;
  priority: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}