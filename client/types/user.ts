import { AdminRoles } from "./roles.type";

export interface User {
  id: number;
  createddate: Date;
  updateddate: Date;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  referralCode: string;
  level: string;
  wallets: Wallet[];
}

export interface JwtAdminPayload {
  sub: string;
  email: string;
  role: AdminRoles;
}

interface Wallet {
  id: number;
  createddate: Date;
  updateddate: Date;
  balance: number;
  userId: number;
  type: string;
  currency: string;
}
