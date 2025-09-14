interface JwtPayloadWithUser {
  name: string;
  sub: number;
  role: string;
  iat?: number;
  exp?: number;
}
