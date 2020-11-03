const Kafka  = require("node-rdkafka")
const Logger = console

class KafkaService {
    constructor() {
        this.topics = Config.get('business.kafka_topics');

        this.producer = new Kafka.Producer({
            'metadata.broker.list': '127.0.0.1:9092,127.0.0.1:9093',
            'security.protocol': 'sasl_plaintext',
            'sasl.mechanisms': 'PLAIN',
            'sasl.username': 'admin',
            'sasl.password': 'admin',
            // 'api.version.request': true,
            // 'dr_cb': true,
        })

        this.producer.setPollInterval(100);
    }
    start() {
        const connectPromise = new Promise((res, rej) => {
            this.producer
                .on('delivery-report', (err, report) => Logger.debug("错误: %O, 递送报告: %O", err, report))
                .on('event.error', (err) => {
                    Logger.error("生产者出错：", err);
                    rej(err);
                })
                .on('ready', () => {
                    Logger.info("生产端连接已就绪");
                    res(true);
                });
            this.producer.connect();
        });

        return connectPromise;
    }
    stop() {
        return Promise.resolve(true);
    }

    send(data, topic) {
        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }

        data = JSON.stringify({
            INDEX: '',
            SOURCE_TYPE: '',
            FILE_NAME: '',
            SOURCE_HOST: '',
            AGENT_TIMESTAMP: '',
            LOG: data,
            TOPIC: '',
            FILE_PATH: '',
        });

        Logger.info('发送消息 topic=%s, data=%s', topic, data);

        try {
            this.producer.produce(topic, null, new Buffer(data));

            Logger.debug("发送消息完成 topic=%s, data=%s", topic, data);

            return Promise.resolve(true);
        }
        catch (e) {
            Logger.error('发送消息失败 topic=%s, data=%s', topic, data, e);

            return Promise.resolve(false);
        }
    }

    checkHealth() {
        Logger.debug("健康检查完成");

        return Promise.resolve(true);
    }
}
