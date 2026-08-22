export interface RevenueItem {
    label: string;
    value: number;
}

export interface SalesItem {
    year: string;
    revenue: number;
    income: number;
}

export type ActivityStatus = 'Paid' | 'Issued' | 'Received' | 'Pending';

export interface ActivityItem {
    name: string;
    action: string;
    amount: string;
    time: string;
    status: ActivityStatus;
}

export type IssueLevel = 'High' | 'Medium' | 'Low';

export interface IssueItem {
    title: string;
    time: string;
    level: IssueLevel;
}

export interface ReportItem {
    name: string;
    value: number;
}

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const accountValues = [52, 72, 34, 66, 82, 49];

export const revenue: RevenueItem[] = [
    { label: 'Pizza', value: 110 },
    { label: 'Biscuits', value: 260 },
    { label: 'Donuts', value: 490 },
    { label: 'Cakes', value: 570 },
    { label: 'Coffee', value: 310 },
];

export const sales: SalesItem[] = [
    { year: '2022', revenue: 1900, income: 2500 },
    { year: '2023', revenue: 2900, income: 3500 },
    { year: '2024', revenue: 3900, income: 4400 },
    { year: '2025', revenue: 4900, income: 5400 },
];

export const activities: ActivityItem[] = [
    {
        name: 'Daniel Schmidt',
        action: 'Invoice #INV-10482 paid',
        amount: '$1,460.00',
        time: '2 hours ago',
        status: 'Paid',
    },
    {
        name: 'Aisha Al-Farsi',
        action: 'Invoice #INV-10476 issued',
        amount: '$920.00',
        time: '5 hours ago',
        status: 'Issued',
    },
    {
        name: 'Kenji Tanaka',
        action: 'Payment received for #INV-10421',
        amount: '$2,150.00',
        time: 'Yesterday',
        status: 'Received',
    },
    {
        name: 'Isabella Rossi',
        action: 'New invoice created',
        amount: '$1,280.00',
        time: 'Yesterday',
        status: 'Pending',
    },
];

export const issues: IssueItem[] = [
    { title: 'API server outage', time: '2 min ago', level: 'High' },
    {
        title: 'Payment gateway latency spike',
        time: '15 min ago',
        level: 'Medium',
    },
    { title: 'Transaction processed', time: '25 min ago', level: 'Low' },
    { title: 'Database connection timeout', time: '40 min ago', level: 'High' },
    {
        title: 'Authentication service restored',
        time: '1 hr ago',
        level: 'Medium',
    },
    { title: 'System backup completed', time: '2 hrs ago', level: 'Low' },
];

export const reportItems: ReportItem[] = [
    { name: 'Patch Release', value: 30 },
    { name: 'Firewalls', value: 45 },
    { name: 'OS Update', value: 60 },
    { name: 'Server Setup', value: 75 },
    { name: 'Trainings', value: 90 },
];
