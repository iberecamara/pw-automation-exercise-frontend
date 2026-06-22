import { Environment } from '@configs/environment.config';
import { DateTimeUtils } from '@utils/datetime.utils';
import winston from 'winston';

const PRINTF_FORMATTER = () => winston.format.printf(({ level, message, timestamp }: any) => {
    return `[${level}] - ${timestamp}: ${message}`;
});

const TIMESTAMP_FORMAT = { format: Environment.LOG_TIMESTAMP_FORMAT };

export const LOG_FOLDER = './artifacts/logs';

export class TestAutomationLogger {

    private static instance: TestAutomationLogger;
    private readonly winstonLogger: winston.Logger;
    lineLenght: number;

    private constructor() {
        this.lineLenght = Environment.LOG_LINE_LENGTH;
        this.winstonLogger = TestAutomationLogger.startLogger();
    }

    public static getInstance(): TestAutomationLogger {
        if (!TestAutomationLogger.instance) {
            TestAutomationLogger.instance = new TestAutomationLogger();
        }
        return TestAutomationLogger.instance;
    }

    private static startLogger(): winston.Logger {
        const dateTime = DateTimeUtils.getDateTime();
        const transports = [];

        if (Environment.LOG_CONSOLE) {
            transports.push(new winston.transports.Console());
        }

        transports.push(new winston.transports.File({
            filename: `test-automation-${dateTime.date}_${dateTime.time.replaceAll(':', '-')}.log`,
            dirname: `${LOG_FOLDER}/${Environment.APPLICATION_ENVIRONMENT}/${dateTime.date}`,
        }));

        return winston.createLogger({
            level: Environment.LOG_LEVEL,
            format: TestAutomationLogger.getFormat(Environment.LOG_TYPE),
            transports: transports,
        });

    }

    private static getFormat(format: string): winston.Logform.Format {
        if (Environment.LOG_TYPE === 'json') {
            return TestAutomationLogger.jsonFormat();
        } else {
            return TestAutomationLogger.textFormat();
        }
    }

    private static jsonFormat(): winston.Logform.Format {
        return winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.json(),
            winston.format.prettyPrint({ depth: 4, colorize: true }),
            winston.format.timestamp(TIMESTAMP_FORMAT),
            winston.format.metadata(),
            PRINTF_FORMATTER(),
        );
    }

    private static textFormat(): winston.Logform.Format {
        return winston.format.combine(
            winston.format.colorize(),
            winston.format.errors({ stack: true }),
            winston.format.align(),
            winston.format.timestamp(TIMESTAMP_FORMAT),
            PRINTF_FORMATTER(),
            winston.format.metadata(),
        );
    }

    isDebugEnabled(): boolean {
        return this.winstonLogger.levels[this.winstonLogger.level] >= this.winstonLogger.levels['debug'];
    }

    info(message: string): void {
        this.winstonLogger.info(message);
    }

    debug(message: string): void {
        this.winstonLogger.debug(message);
    }

    error(message: string): void {
        this.winstonLogger.error(message);
    }

    warn(message: string): void {
        this.winstonLogger.warn(message);
    }

    close(): void {
        this.winstonLogger.close();
    }
}