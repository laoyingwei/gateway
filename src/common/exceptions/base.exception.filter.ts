import {  FastifyReply,FastifyRequest } from 'fastify';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    ServiceUnavailableException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();
        request.log.error(exception)

        response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            timestamp:new Date().toISOString(),
            path: request.url,
            message: new ServiceUnavailableException().getResponse()
        })
    }
}