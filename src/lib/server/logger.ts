import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file"; // eslint-disable-line
const { combine, timestamp, printf, colorize, align } = winston.format;

// Winston log rotation settings
const fileRotateTransport = new winston.transports.DailyRotateFile({
	filename: 'logs/combined-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '14d',
	maxSize: '20m',
});

// Create and export a Winston logger
export const logger = winston.createLogger({
	level: 'info',
	format: combine(
		timestamp({
		  format: 'YYYY-MM-DD hh:mm:ss.SSS A',
		}),
		//align(),
		printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
	),
	defaultMeta: { service: 'user-service' },
	transports: [
		fileRotateTransport
	],
});

// If not in production, add console logging with all the colors
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: combine(
			colorize({ all: true }),
			timestamp({
			  format: 'YYYY-MM-DD hh:mm:ss.SSS A',
			}),
			align(),
			printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
		),
	}));
}

logger.info("Logging configured");
