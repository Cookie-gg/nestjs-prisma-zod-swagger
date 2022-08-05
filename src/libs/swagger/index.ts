import { ApiParam, ApiParamOptions, ApiQuery, ApiQueryOptions, DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('api.cookie-gg.dev')
  .setDescription('A document of api.cookie-gg.dev')
  .setVersion('0.0.1')
  .setExternalDoc('openapi.json', '../api-json')
  .build();

export const CommonApiQuery = (args: Partial<ApiQueryOptions>) => ApiQuery({ required: false, type: String, ...args });

export const CommonApiParam = (args: Partial<ApiParamOptions>) => ApiParam({ name: 'id', type: String, ...args });
