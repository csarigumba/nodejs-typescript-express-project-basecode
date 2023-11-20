import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import cls from 'cls-hooked';

export default function trace(req: Request, res: Response, next: NextFunction): void {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  const namespace = cls.createNamespace('namespace');

  // namespace.bind(req);
  // namespace.bind(res);


  const traceId = req.headers["X-Amzn-Trace-Id"] ? req.headers["X-Amzn-Trace-Id"] : uuidv4();

  req['trace_id'] = traceId;

  namespace.run(() => {
    namespace.set('trace_id', traceId);

    next();
  });
}
