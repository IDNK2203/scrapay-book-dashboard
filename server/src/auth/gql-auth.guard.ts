import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(GqlAuthGuard.name);

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    
    // Log the authorization header for debugging
    const authHeader = request?.headers?.authorization;
    this.logger.log(`Auth header present: ${authHeader ? 'Yes' : 'No'}`);
    if (authHeader) {
      this.logger.log(`Header starts with Bearer: ${authHeader.startsWith('Bearer ') ? 'Yes' : 'No'}`);
      // Log first 50 chars of token for debugging (not the full token for security)
      this.logger.log(`Token preview: ${authHeader.substring(0, 50)}...`);
    }
    
    return request;
  }


  


  handleRequest(err: any, user: any, info: any) {
    // Log any errors from passport
    if (err || !user) {
      this.logger.error('JWT validation failed');
      this.logger.error(`Error: ${err?.message || 'No error object'}`);
      this.logger.error(`Info: ${info?.message || info || 'No info'}`);
      throw err || new UnauthorizedException(info?.message || 'Unauthorized');
    }
    
    this.logger.log(`User authenticated: ${user.userId}`);
    return user;
  }
}
