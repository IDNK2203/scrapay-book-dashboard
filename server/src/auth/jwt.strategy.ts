import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    // Ensure issuer URL has trailing slash
    const issuerUrl = process.env.AUTH0_ISSUER_URL?.endsWith('/')
      ? process.env.AUTH0_ISSUER_URL
      : `${process.env.AUTH0_ISSUER_URL}/`;
    
    const jwksUri = `${issuerUrl}.well-known/jwks.json`;
    
    // Debug logging
    console.log('=== JWT Strategy Configuration ===');
    console.log('AUTH0_ISSUER_URL:', process.env.AUTH0_ISSUER_URL);
    console.log('AUTH0_AUDIENCE:', process.env.AUTH0_AUDIENCE);
    console.log('JWKS URI:', jwksUri);
    console.log('Issuer (with slash):', issuerUrl);
    console.log('==================================');

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
    this.logger.log('Token validated successfully');
    this.logger.log(`User ID: ${payload.sub}`);
    return { userId: payload.sub, email: payload.email };
  }
}

