import type { Metric } from '../types'

export const metrics: Metric[] = [
  {
    id: 'booking-time-reduced',
    label: 'Booking Time Reduced',
    value: '93%',
    description: 'From 30+ minutes to under 2 minutes per appointment',
    verified: true,
  },
  {
    id: 'double-bookings-eliminated',
    label: 'Double-Bookings Eliminated',
    value: '100%',
    description: 'Real-time calendar conflict checking across timezones',
    verified: true,
  },
  {
    id: 'timezone-accuracy',
    label: 'Timezone Accuracy',
    value: '100%',
    description: 'All slots shown in user\'s local time, stored in IST',
    verified: true,
  },
  {
    id: 'manual-intervention',
    label: 'Manual Intervention',
    value: '0%',
    description: 'Fully automated: lead → qualification → booking → confirmation',
    verified: true,
  },
  {
    id: 'clients-served',
    label: 'Clients Served',
    value: '1',
    description: 'Verified client projects delivered',
    verified: true,
  },
  {
    id: 'automations-deployed',
    label: 'Automations Deployed',
    value: '3',
    description: 'WhatsApp AI agent + calendar sync + email confirmation',
    verified: true,
  },
]