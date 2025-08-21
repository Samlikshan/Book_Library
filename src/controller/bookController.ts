import { Request, Response, NextFunction } from "express";
import { bookService } from "../services/bookService";
import { STATUS_CODES } from "../utils/statusCodes";
import { getBooksQuerySchema } from "../validators/bookSchema";

interface ListBooksQuery {
  genre?: string;
  author?: string;
  minYear?: string;
  limit?: string;
  offset?: string;
}

export const bookController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await bookService.createBook(req.body);
      res.status(STATUS_CODES.CREATED).json({ data: created });
    } catch (err) {
      next(err);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = getBooksQuerySchema.parse(req.query);

      const { genre, author, minYear, limit, offset } =
        req.query as ListBooksQuery;
      const result = await bookService.listBooks({
        genre,
        author,
        minYear: minYear ? Number(minYear) : undefined,
        limit: Number(limit),
        offset: Number(offset),
      });
      res.status(STATUS_CODES.OK).json(result);
    } catch (err) {
      next(err);
    }
  },

  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await bookService.checkoutBook(req.params.id);
      res
        .status(STATUS_CODES.OK)
        .json({ data: updated, message: "Book checkout successfull" });
    } catch (err) {
      next(err);
    }
  },
};
