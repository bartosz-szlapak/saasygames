export interface DecodedJwt {
  exp: number;
  iat: number;
  userId: string;
  roleId: number;
  userName: string;
}
