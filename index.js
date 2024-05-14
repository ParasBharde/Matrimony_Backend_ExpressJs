import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser'
import mainRouter from './src/routes/index.js';
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
config();
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['./src/index.js'],
};
const port = process.env.PORT;
const app = express();
const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(openapiSpecification))
app.use(bodyParser.json())
app.use('/api/v1', mainRouter)


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});