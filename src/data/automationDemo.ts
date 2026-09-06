export const automationDemo = {
  before: {
    label: 'Before',
    steps: [
      'Website Form',
      'Employee checks submission',
      'Copies information',
      'Opens CRM',
      'Creates lead',
      'Sends WhatsApp',
      'Sends email',
      'Updates spreadsheet',
    ],
  },
  after: {
    label: 'After',
    steps: [
      'Website Form',
      'AI Lead Qualification',
      'CRM',
      'WhatsApp',
      'Email',
      'Sales Notification',
      'Analytics',
    ],
  },
} as const
