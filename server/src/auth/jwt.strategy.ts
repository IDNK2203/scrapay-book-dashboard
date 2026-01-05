import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Ensure issuer URL has trailing slash
    const issuerUrl = process.env.AUTH0_ISSUER_URL?.endsWith('/')
      ? process.env.AUTH0_ISSUER_URL
      : `${process.env.AUTH0_ISSUER_URL}/`;
    
    const jwksUri = `${issuerUrl}.well-known/jwks.json`;

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: jwksUri,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: issuerUrl,
      algorithms: ['RS256'],
    });
  }

  validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}


