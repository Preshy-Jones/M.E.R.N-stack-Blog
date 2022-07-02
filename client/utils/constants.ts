export enum Constants {
    AUTH_TOKEN = 'auth_token'
}

export enum Links {
    DASHBOARD = '/dashboard',
    WALLETS = '/dashboard/wallets',
    TRANSACTIONS = '/dashboard/transactions',
    ACTIVITIES = '/activities',
    ANNOUNCEMENT = '/dashboard/announcements',
    VERIFICATIONS = '/dashboard/verifications',
    USERS = '/users',
    SETTINGS = '/dashboard/settings',
}

export enum ENDPOINTS {
    LOGIN = 'auth/login/admin',
    GET_CURRENT_USER = 'user/current',
    GET_WALLET_SUMMARY = 'admin/summary',
    GET_ALL_TRANSACTIONS = 'transactions',
    GET_ALL_ANNOUNCEMENTS = 'announcement',
    GET_PENDING_KYC = 'user/kyc/pending'
}