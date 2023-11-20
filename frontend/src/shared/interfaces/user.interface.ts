export interface User {
  id?: string;
  email: string;
  password: string;
  role: string;
  isProfileSetup: boolean;
  name?: string;
  phoneNumber?: string;
  designation?: string;
  departmentName?: string;
  isOnline?: boolean;
  availabilityStatus?: string;
  groupIds?: string[];
  lastLogin?: Date;
}
