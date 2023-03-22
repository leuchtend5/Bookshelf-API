import {
  addBookHandler,
  showBooksHandler,
  showBookByID,
  editBookByID,
  deleteBookByID,
} from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: showBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: showBookByID,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByID,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByID,
  },
];

export default routes;
