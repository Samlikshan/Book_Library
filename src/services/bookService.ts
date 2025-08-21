import { bookRepository } from "../repositories/bookRepository";
import { BadRequest, NotFound } from "../utils/ApiError";

export const bookService = {
  async createBook(payload: {
    title: string;
    author: string;
    publishedYear?: number;
    genre?: string;
    stock: number;
  }) {
    if (!Number.isInteger(payload.stock) || payload.stock < 0)
      throw BadRequest("stock must be a positive integer or zero");
    return bookRepository.create(payload);
  },

  async listBooks(query: {
    genre?: string;
    author?: string;
    minYear?: number;
    limit: number;
    offset: number;
  }) {
    const filter: any = {};
    if (query.genre) filter.genre = query.genre;
    if (query.author) filter.author = query.author;
    if (typeof query.minYear === "number")
      filter.publishedYear = { $gte: query.minYear };

    const { data, total } = await bookRepository.findAll(
      filter,
      query.limit,
      query.offset
    );
    return {
      data,
      meta: {
        total,
        limit: query.limit,
        offset: query.offset,
        hasMore: total > query.offset + query.limit,
      },
    };
  },

  async checkoutBook(id: string) {
    const book = await bookRepository.findById(id);
    if (!book) throw NotFound("Book not found");
    if (book.stock <= 0) throw BadRequest("Book is out of stock");
    book.stock -= 1;
    return bookRepository.save(book);
  },
};
