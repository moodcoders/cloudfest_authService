import ConfigUtils from './utils/config';
import DatabaseUtils from './utils/database';
import startServer from './app';

ConfigUtils.fetchConfig().then( async () => {
    await DatabaseUtils.connectToDB()
    await startServer()
});