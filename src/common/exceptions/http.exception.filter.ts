import {  FastifyReply,FastifyRequest } from 'fastify';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException
} from '@nestjs/common';
// http.exception.filter.ts => Catch 的参数为 HttpException 将只捕获 HTTP 相关的异常错误
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();
        const status = exception.getStatus();
        response.status(status).send({
            statusCode: status,
            timestamp:new Date().toISOString(),
            path: request.url,
            message: exception.getResponse()
        })
    }
}