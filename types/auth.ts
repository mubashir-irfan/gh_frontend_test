type UserType = 'root' | 'owner' | 'agent' | 'driver';
type UserStatusType = 'active' | 'inactive'

export interface IUser {
  id: string;
  ref_id: string;
  user_type: UserType;
  email: string;
  first_name: string;
  last_name: string
  country: string;
  dob: string;
  phone_country_code: string;
  phone_numner: string;
  status: UserStatusType;
  is_email_verified: boolean;
}

export interface IOTPAPIResponse {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface IRefreshAPIResponse {
  access_token: string;
  user: IUser;
}
