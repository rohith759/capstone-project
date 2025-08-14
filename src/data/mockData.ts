import { Message, Alert, Policy, Tenant, User, MetricData } from '../types';

export const mockMessages: Message[] = [
  {
    id: '1',
    messageId: '<msg001@example.com>',
    fromAddress: 'security@paypaI.com',
    fromDisplay: 'PayPal Security',
    toAddress: 'john.doe@company.com',
    subject: 'Urgent: Verify Your Account - Action Required',
    bodyHtml: '<html><body>Your PayPal account has been limited. Click here to verify.</body></html>',
    bodyText: 'Your PayPal account has been limited. Click here to verify.',
    receivedAt: '2025-01-16T10:30:00Z',
    spfPass: false,
    dkimPass: false,
    dmarcPass: false,
    sourceIp: '192.168.1.100',
    mlScore: 0.95,
    status: 'blocked',
    quarantineReason: 'Suspicious sender domain and high phishing score',
    size: 2048,
    attachmentCount: 0,
    urlCount: 3,
    riskFactors: [
      {
        type: 'domain_reputation',
        severity: 'critical',
        description: 'Domain uses lookalike character (I instead of l)',
        score: 0.95
      },
      {
        type: 'content_analysis',
        severity: 'high',
        description: 'Contains urgent language and credential harvesting patterns',
        score: 0.87
      }
    ],
    indicators: [
      { type: 'spf', status: 'fail', message: 'SPF record does not authorize sending IP' },
      { type: 'dkim', status: 'fail', message: 'DKIM signature validation failed' },
      { type: 'dmarc', status: 'fail', message: 'DMARC policy violation' },
      { type: 'lookalike_domain', status: 'warning', message: 'Domain closely resembles paypal.com' }
    ]
  },
  {
    id: '2',
    messageId: '<msg002@legitimate.com>',
    fromAddress: 'noreply@github.com',
    fromDisplay: 'GitHub',
    toAddress: 'jane.smith@company.com',
    subject: 'Your pull request has been merged',
    bodyHtml: '<html><body>Your pull request #123 has been successfully merged.</body></html>',
    bodyText: 'Your pull request #123 has been successfully merged.',
    receivedAt: '2025-01-16T09:15:00Z',
    spfPass: true,
    dkimPass: true,
    dmarcPass: true,
    sourceIp: '140.82.112.4',
    mlScore: 0.05,
    status: 'allowed',
    size: 1024,
    attachmentCount: 0,
    urlCount: 2,
    riskFactors: [
      {
        type: 'sender_history',
        severity: 'low',
        description: 'Known legitimate sender with good reputation',
        score: 0.02
      }
    ],
    indicators: [
      { type: 'spf', status: 'pass', message: 'SPF record authorizes sending IP' },
      { type: 'dkim', status: 'pass', message: 'DKIM signature valid' },
      { type: 'dmarc', status: 'pass', message: 'DMARC alignment passed' },
      { type: 'ip_reputation', status: 'pass', message: 'Source IP has good reputation' }
    ]
  },
  {
    id: '3',
    messageId: '<msg003@suspicious.net>',
    fromAddress: 'admin@banking-alert.net',
    fromDisplay: 'Bank Security Team',
    toAddress: 'mike.johnson@company.com',
    subject: 'Account Security Update Required',
    bodyHtml: '<html><body>Please update your banking credentials immediately. <a href="http://suspicious-link.com">Click here</a></body></html>',
    bodyText: 'Please update your banking credentials immediately.',
    receivedAt: '2025-01-16T08:45:00Z',
    spfPass: true,
    dkimPass: false,
    dmarcPass: false,
    sourceIp: '203.0.113.5',
    mlScore: 0.78,
    status: 'quarantined',
    quarantineReason: 'Suspicious content and failed authentication checks',
    size: 3072,
    attachmentCount: 1,
    urlCount: 4,
    riskFactors: [
      {
        type: 'content_analysis',
        severity: 'high',
        description: 'Contains credential harvesting language',
        score: 0.82
      },
      {
        type: 'url_analysis',
        severity: 'medium',
        description: 'Contains suspicious shortened URLs',
        score: 0.65
      }
    ],
    indicators: [
      { type: 'spf', status: 'pass', message: 'SPF record valid' },
      { type: 'dkim', status: 'fail', message: 'DKIM signature missing' },
      { type: 'dmarc', status: 'warning', message: 'DMARC policy not strict' },
      { type: 'phishing_keywords', status: 'warning', message: 'Contains potential phishing keywords' }
    ]
  },
  {
    id: '4',
    messageId: '<msg004@newsletter.com>',
    fromAddress: 'news@techcrunch.com',
    fromDisplay: 'TechCrunch',
    toAddress: 'sarah.wilson@company.com',
    subject: 'Daily Tech News Digest',
    bodyHtml: '<html><body>Here are today\'s top tech stories...</body></html>',
    bodyText: 'Here are today\'s top tech stories...',
    receivedAt: '2025-01-16T07:00:00Z',
    spfPass: true,
    dkimPass: true,
    dmarcPass: true,
    sourceIp: '185.199.108.153',
    mlScore: 0.12,
    status: 'allowed',
    size: 8192,
    attachmentCount: 0,
    urlCount: 15,
    riskFactors: [
      {
        type: 'sender_history',
        severity: 'low',
        description: 'Established newsletter sender',
        score: 0.05
      }
    ],
    indicators: [
      { type: 'spf', status: 'pass', message: 'SPF record authorizes sending IP' },
      { type: 'dkim', status: 'pass', message: 'DKIM signature valid' },
      { type: 'dmarc', status: 'pass', message: 'DMARC alignment passed' },
      { type: 'domain_age', status: 'pass', message: 'Domain registered over 10 years ago' }
    ]
  },
  {
    id: '5',
    messageId: '<msg005@malware.evil>',
    fromAddress: 'invoice@accounting-dept.biz',
    fromDisplay: 'Accounting Department',
    toAddress: 'bob.anderson@company.com',
    subject: 'Invoice #12345 - Payment Overdue',
    bodyHtml: '<html><body>Please find attached invoice. Payment is overdue.</body></html>',
    bodyText: 'Please find attached invoice. Payment is overdue.',
    receivedAt: '2025-01-16T06:30:00Z',
    spfPass: false,
    dkimPass: false,
    dmarcPass: false,
    sourceIp: '198.51.100.10',
    mlScore: 0.92,
    status: 'blocked',
    quarantineReason: 'Malicious attachment detected',
    size: 1536000,
    attachmentCount: 1,
    urlCount: 0,
    riskFactors: [
      {
        type: 'attachment_risk',
        severity: 'critical',
        description: 'Attachment contains macro-enabled document',
        score: 0.98
      },
      {
        type: 'domain_reputation',
        severity: 'high',
        description: 'Newly registered domain with poor reputation',
        score: 0.89
      }
    ],
    indicators: [
      { type: 'spf', status: 'fail', message: 'No SPF record found' },
      { type: 'dkim', status: 'fail', message: 'DKIM signature missing' },
      { type: 'dmarc', status: 'fail', message: 'No DMARC policy found' },
      { type: 'suspicious_attachment', status: 'fail', message: 'Attachment flagged as malicious' }
    ]
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    tenantId: 'tenant-1',
    messageId: '1',
    severity: 'critical',
    title: 'High-Risk Phishing Attempt Blocked',
    description: 'PayPal lookalike domain detected with credential harvesting content',
    createdAt: '2025-01-16T10:30:15Z',
    acknowledged: false,
    category: 'detection'
  },
  {
    id: '2',
    tenantId: 'tenant-1',
    messageId: '5',
    severity: 'critical',
    title: 'Malicious Attachment Blocked',
    description: 'Macro-enabled document with suspicious behavior detected',
    createdAt: '2025-01-16T06:30:45Z',
    acknowledged: false,
    category: 'detection'
  },
  {
    id: '3',
    tenantId: 'tenant-1',
    messageId: '3',
    severity: 'warning',
    title: 'Suspicious Message Quarantined',
    description: 'Banking-themed message with failed authentication',
    createdAt: '2025-01-16T08:45:30Z',
    acknowledged: true,
    category: 'detection'
  },
  {
    id: '4',
    tenantId: 'tenant-1',
    severity: 'info',
    title: 'Policy Update Applied',
    description: 'Block threshold updated to 0.85 for enhanced security',
    createdAt: '2025-01-16T05:00:00Z',
    acknowledged: true,
    category: 'policy'
  }
];

export const mockPolicy: Policy = {
  id: 'policy-1',
  tenantId: 'tenant-1',
  blockThreshold: 0.9,
  quarantineThreshold: 0.7,
  blockNewDomains: true,
  blockMacros: true,
  allowExternalImages: false,
  enableRealTimeAlerts: true,
  createdAt: '2025-01-15T00:00:00Z',
  updatedAt: '2025-01-16T05:00:00Z'
};

export const mockTenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Acme Corporation',
    userCount: 1250,
    messageCount: 58432,
    detectionRate: 12.4,
    falsePositiveRate: 0.3,
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'tenant-2',
    name: 'TechStart Inc.',
    userCount: 87,
    messageCount: 4521,
    detectionRate: 8.7,
    falsePositiveRate: 0.5,
    createdAt: '2024-06-10T00:00:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    tenantId: 'tenant-1',
    email: 'admin@acme.com',
    role: 'admin',
    mfaEnabled: true,
    lastLoginAt: '2025-01-16T09:00:00Z',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'user-2',
    tenantId: 'tenant-1',
    email: 'analyst@acme.com',
    role: 'analyst',
    mfaEnabled: true,
    lastLoginAt: '2025-01-16T08:30:00Z',
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 'user-3',
    tenantId: 'tenant-1',
    email: 'john.doe@acme.com',
    role: 'user',
    mfaEnabled: false,
    lastLoginAt: '2025-01-15T17:45:00Z',
    createdAt: '2024-03-15T00:00:00Z'
  }
];

export const mockMetrics: MetricData[] = [
  {
    label: 'Messages Processed',
    value: 12847,
    change: 8.2,
    trend: 'up'
  },
  {
    label: 'Threats Blocked',
    value: 1592,
    change: 15.7,
    trend: 'up'
  },
  {
    label: 'False Positives',
    value: 23,
    change: -12.4,
    trend: 'down'
  },
  {
    label: 'Detection Rate',
    value: 12.4,
    change: 2.1,
    trend: 'up'
  }
];