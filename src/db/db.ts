import { Note, NewNote } from '@/store/models';
import { Book, NewBook } from '@/store/models';
import axios from 'axios';

const authHeader = (): string | {} => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {};
  }
  if (token) {
    return { Authorization: token };
  } else {
    return {};
  }
};

const logout = (): void => {
  localStorage.removeItem('user');
};

/* Notes */

export const getNotes = async (): Promise<Note[]> => {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/notes`, {
    method: 'GET',
    headers: authHeader(),
  });
  const json = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      location.reload(true);
    }
    const error = (json && json.message) || response.statusText;
    return Promise.reject(error);
  }

  return json.data
};

export const createNote = async (note: NewNote, bookId: number): Promise<Note> => {
  const storaged = localStorage.getItem('user');
  const user = JSON.parse(storaged);
  const token = localStorage.getItem('token');
  const response = await fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/notes`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        'title': note.attributes.title,
        'content': note.attributes.content,
        'user_id': user.id,
        'book_id': bookId,
        'color': note.attributes.color,
      }
    ),
  });
  const json = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      location.reload(true);
    }
    const error = (json && json.message) || response.statusText;
    return Promise.reject(error);
  }

  note.attributes = json.data.attributes;

  return {
    id: json.data.id,
    ...note
  };
};

export const updateNote = async (note: Note): Promise<Note> => {
  const storaged = localStorage.getItem('user');
  const user = JSON.parse(storaged);
  const token = localStorage.getItem('token');
  const response = await fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/notes/${note.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        'title': note.attributes.title,
        'content': note.attributes.content,
        'user_id': user.id,
        'book_id': note.attributes.book.id,
        'color': note.attributes.color,
      }
    ),
  });
  const json = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      location.reload(true);
    }
    const error = (json && json.message) || response.statusText;
    return Promise.reject(error);
  }

  return note;
};

export const deleteNote = async (id: string): Promise<string> => {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/notes/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });

  return id
};

export const downloadNote = async (id: string): Promise<string> => {
  const token = localStorage.getItem('token');
  axios(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/notes/${id}/export`, {
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Authorization': token,
    },
  })
    .then(response => {
      //Create a Blob from the PDF Stream
      const file = new Blob(
        [response.data],
        { type: 'application/pdf' });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    })
    .catch(error => {
      console.log(error);
    });

  return id
};

/* Books */

export const getBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/books`, {
    method: 'GET',
    headers: authHeader(),
  });
  const json = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      location.reload(true);
    }
    const error = (json && json.message) || response.statusText;
    return Promise.reject(error);
  }

  return json.data
};

export const createBook = async (book: NewBook): Promise<Book> => {
  const storaged = localStorage.getItem('user');
  const user = JSON.parse(storaged);
  const token = localStorage.getItem('token');
  const response = await fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/books`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        'name': book.attributes.name,
        'user_id': user.id,
      }
    ),
  });
  const json = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      location.reload(true);
    }
    const error = "(json && json.message) || response.statusText";
    return Promise.reject(error);
  }

  book.attributes = json.data.attributes

  return {
    id: json.data.id,
    ...book
  };
};

export const updateBook = async (book: Book): Promise<Book> => {
  const storaged = localStorage.getItem('user');
  const user = JSON.parse(storaged);
  const token = localStorage.getItem('token');
  const response = await fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        'name': book.attributes.name,
        'user_id': user.id,
      }
    ),
  });
  const json = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      location.reload(true);
    }
    const error = (json && json.message) || response.statusText;
    return Promise.reject(error);
  }

  return book;
};

export const deleteBook = async (id: string): Promise<string> => {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/books/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  /*const json = await response.json();

  if (response.status != 204) {
    if (response.status === 401) {
      logout();
      location.reload(true);
    }
    const error = (json && json.message) || response.statusText;
    return Promise.reject(error);
  }*/

  return id
};

export const getBookNotes = async (id: string): Promise<Note[]> => {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/books/${id}/notes`, {
    method: 'GET',
    headers: authHeader(),
  });
  const json = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      location.reload(true);
    }
    const error = (json && json.message) || response.statusText;
    return Promise.reject(error);
  }

  return json.data
};

export const downloadBook = async (id: string): Promise<string> => {
  const token = localStorage.getItem('token');
  axios(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/books/${id}/export`, {
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Authorization': token,
    },
  })
    .then(response => {
      //Create a Blob from the PDF Stream
      const file = new Blob(
        [response.data],
        { type: 'application/zip' });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      //window.open(fileURL);
      const fileName = response.headers["content-disposition"].split('filename=')[1].split(';')[0].replace(/['"]+/g, '');
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link)
    })
    .catch(error => {
      console.log(error);
    });

  return id
};

export const downloadBooks = async (): Promise<boolean> => {
  const token = localStorage.getItem('token');
  axios(`${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_PREFIX}/exportBooks`, {
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Authorization': token,
    },
  })
    .then(response => {
      //Create a Blob from the PDF Stream
      const file = new Blob(
        [response.data],
        { type: 'application/zip' });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      //window.open(fileURL);
      const fileName = response.headers["content-disposition"].split('filename=')[1].split(';')[0].replace(/['"]+/g, '');
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link)
    })
    .catch(error => {
      console.log(error);
    });

  return true;
};