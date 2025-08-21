import { FilterQuery } from "mongoose";
import { Book, IBook } from "../models/Book";

export const bookRepository = {
  async create(data: Partial<IBook>) {
    const book = await Book.create(data);
    return book.toObject();
  },

  async findAll(filter: FilterQuery<IBook>, limit: number, offset: number) {
    const [data, total] = await Promise.all([
      Book.find(filter)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .lean(),
      Book.countDocuments(filter),
    ]);
    return { data, total };
  },

  async findById(id: string) {
    return Book.findById(id);
  },

  async save(book: IBook) {
    await book.save();
    return book.toObject();
  },
};
