import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateSchema = (schema: AnyZodObject) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next(); // Si todo está bien, pasa al controlador
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(
          error.errors.map((e) => ({
            field: e.path[1],
            message: e.message,
          }))
        );
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };