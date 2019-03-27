export interface Form {
  landing?: string;
  Country?: string;
  currency?: string;
  phone_prefix?: number;
  campaignId?: number;
  lang?: string;
  Phone?: number;
  FirstName?: string;
  LastName?: string;
  email?: string;
  terms?: string;
  password?: string;
  [key: string]: string | number | boolean;
}
