export type BankCategory = 'CAT A' | 'CAT B' | 'CAT C' | 'CAT D' | 'UNLISTED' | 'REJECT';

export interface Bank {
  id: string;
  name: string;
  code: string;
  type: 'BANK' | 'NBFC';
  logoUrl?: string;
  isActive: boolean;
}

export interface CompanySearchResult {
  bankId: string;
  bankName: string;
  bankCode: string;
  bankType: 'BANK' | 'NBFC';
  companyName: string;
  category: string;
  status: string;
  remarks?: string;
  updatedAt: string;
}

export interface PincodeSearchResult {
  pincode: string;
  city?: string;
  state?: string;
  area?: string;
  availableBanks: Array<{
    bankId: string;
    bankName: string;
    bankType: string;
    category?: string;
    isServiceable: boolean;
    isNegative: boolean;
  }>;
  availableNbfcs: Array<{
    bankId: string;
    bankName: string;
    bankType: string;
    category?: string;
    isServiceable: boolean;
    isNegative: boolean;
  }>;
  serviceStatus: 'FULL_SERVICEABLE' | 'PARTIAL_SERVICEABLE' | 'NON_SERVICEABLE';
}

export interface LoanApplicationFormData {
  name: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  company: string;
  monthlyIncome: number;
  loanType: string;
  loanAmount: number;
  remarks?: string;
}

export interface ImportHistoryItem {
  id: string;
  bankId: string;
  bankName: string;
  fileName: string;
  importType: 'REPLACE' | 'MERGE';
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  errorMessage?: string;
  createdAt: string;
  createdByName: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'DSA' | 'USER';
}
