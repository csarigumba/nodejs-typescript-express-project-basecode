import { format, createLogger, transports } from 'winston';
const { combine, timestamp, label, printf, prettyPrint } = format;
import cls from 'cls-hooked';

const namespace = cls.getNamespace('namespace');

const hookedFormat = format((info) => {
  const traceId = namespace.get('trace_id');

  if (typeof traceId !== 'undefined') {
    info.traceId = traceId;
  }

  return info;
});


const logger = createLogger({
  level: "debug",
  defaultMeta: { service: 'user-service' },
  format: combine(
    hookedFormat(),
    format.errors({ stack: true }),
    label({ label: "Some test" }),
    timestamp(),
    format.json(),
  ),
  transports: [new transports.Console()],
});


export default logger;
