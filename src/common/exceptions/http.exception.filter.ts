import {  FastifyReply,FastifyRequest } from 'fastify';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { BusinessException } from './business.exception'
// http.exception.filter.ts => Catch 的参数为 HttpException 将只捕获 HTTP 相关的异常错误
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();
        const status = exception.getStatus();

        ///自定义抛出错误 判断是否 为 BusinessException 类 可预知的错误
        if(exception instanceof BusinessException) {
            const error = exception.getResponse();
            response.status(HttpStatus.OK).send({
                data:null,
                status: error['code'],
                extra:{},
                message: error['message'],
                success:false
            })
            return;
        }
        response.status(status).send({
            statusCode: status,
            timestamp:new Date().toISOString(),
            path: request.url,
            message: exception.getResponse(),
            success:false
        })
    }
}