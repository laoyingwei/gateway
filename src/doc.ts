import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import * as packageConfig from '../package.json';

export const generateDocument = (app) => {
    const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .build()

    const doucument = SwaggerModule.createDocument(app,options) 

    SwaggerModule.setup('/api/doc',app,doucument)

}