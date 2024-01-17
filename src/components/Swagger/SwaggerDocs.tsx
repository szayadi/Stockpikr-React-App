import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import swaggerJson from './Swagger.json';

const SwaggerDocs = () => {
  return <SwaggerUI spec={swaggerJson} />;
};

export default SwaggerDocs;
