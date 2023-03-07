import { AnyZodObject } from "zod";
import { Request, Response, NextFunction} from "express";

const validate = (schema: AnyZodObject) => async(req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
  
      next();
    } catch (err: any) {
      // construct error message
      const message = err.errors
        .map((error: any) => error.message)
        .join(', ');

        res.status(400).json({ message });
    }
};

export default validate;
