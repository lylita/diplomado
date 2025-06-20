// lo que es node
import 'dotenv/config';
import app from './app.js';
import logger from './logs/logger.js';
import config from './config/env.js'
import { sequelize } from './database/database.js';

async function main(){
    await sequelize.sync({force:false})
    const PORT = config.PORT;
    app.listen(PORT);
    logger.info('Server is runninging on  http://localhost:'+PORT );
    //logger.error('error');
}
main();