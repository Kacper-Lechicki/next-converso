export interface BuildClient {
  key?: string;
  sessionToken?: string;
}

export interface CreateUser {
  email: string;
  name: string;
  image?: string;
  accountId: string;
}
