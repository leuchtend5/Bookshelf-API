import { nanoid } from 'nanoid';
import books from './books.js';

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  let finished = false;

  if (pageCount === readPage) {
    finished = true;
  }

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (newBook.name === '' || newBook.name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (newBook.name !== null && newBook.readPage <= pageCount) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    books.push(newBook);
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const showBooksHandler = (request, h) => {
  const { name: title, reading, finished } = request.query;

  const selectingProperty = (array) => {
    const selected = array.map((item) => {
      const { id, name, publisher } = item;
      return { id, name, publisher };
    });
    return selected;
  };

  if (title) {
    const filteredBooksName = books.filter((book) => book.name.toLowerCase().includes(title.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: selectingProperty(filteredBooksName),
      },
    });
    response.code(200);
    return response;
  }

  if (reading) {
    const filteredBooksReading = books.filter((book) => (reading === '1' ? book.reading === true : book.reading === false));
    const response = h.response({
      status: 'success',
      data: {
        books: selectingProperty(filteredBooksReading),
      },
    });
    response.code(200);
    return response;
  }

  if (finished) {
    const filteredBooksFinished = books.filter((book) => (finished === '1' ? book.finished === true : book.finished === false));
    const response = h.response({
      status: 'success',
      data: {
        books: selectingProperty(filteredBooksFinished),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: selectingProperty(books),
    },
  });
  response.code(200);
  return response;
};

const showBookByID = (request, h) => {
  const { id } = request.params;
  const book = books.filter((item) => item.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByID = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByID = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

export {
  addBookHandler,
  showBooksHandler,
  showBookByID,
  editBookByID,
  deleteBookByID,
};
