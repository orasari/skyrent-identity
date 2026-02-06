export type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export type IdentityStatus = 'verified' | 'failed';

export type IdentityData = {
  selfieUrl: string;
  phone: string;
  address: Address;
  score: number;
  status: IdentityStatus;
};
