import { connect } from 'mongoose';
import { exit, env } from 'process';
import ConfigUtils from './config';
import logger from './logger';

const readyState = [ 'disconnected', 'connected', 'connecting', 'disconnecting' ];

export default class DatabaseUtils {

    public static async connectToDB() {
        try {
            const config: any = await ConfigUtils.getConfig();
            if ( config.MONGO_URI === undefined ) {
                throw new Error('Cannot find MONGO_URI in configuration, exiting !');
            } else {
                const dbconnection = await connect(config.MONGO_URI);
                logger.info(`Database connected on ${ dbconnection.now() }\n` +
                            `READY_STATE: ${readyState[dbconnection.connection.readyState]} \n` +
                            `HOST: ${dbconnection.connection.host} \n` +
                            `DATABASE: ${dbconnection.connection.name}`
                );
            }
        } catch (error) {
            logger.error(error);
            exit(1);
        }
    }
}