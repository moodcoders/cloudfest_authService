import logger from './logger';

export default class ConfigUtils {
    private static config: any;

    static async fetchConfig() {
        try {
            // rewrite this method to get configurations from
            // distributed config management like zookeeper
            ConfigUtils.config = {
                MONGO_URI: 'mongodb+srv://shams:nYrfl3IiVLcBpdnp@handymancluster.cml1v.mongodb.net/smartservice?retryWrites=true&w=majority'
            }
        } catch (error) {
            logger.error(error);
        }
    };

    static async getConfig(): Promise<any> {
        return this.config;
    };
};