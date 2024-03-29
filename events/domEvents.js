import {
  deleteSingleAuthor,
  getAuthors,
  getSingleAuthor,
} from "../api/authorData";
import { deleteBook, getBooks, getSingleBook } from "../api/bookData";
import addAuthorForm from "../components/forms/addAuthorForm";
import addBookForm from "../components/forms/addBookForm";
import { showAuthors } from "../pages/authors";
import { showBooks } from "../pages/books";

const domEvents = (user) => {
  document.querySelector("#main-container").addEventListener("click", (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes("delete-book")) {
      // eslint-disable-next-line no-alert
      if (window.confirm("Want to delete?")) {
        console.warn("CLICKED DELETE BOOK", e.target.id);
        console.warn(e.target.id.split("--"));
        const splitArr = e.target.id.split("--");
        console.warn("splitArr", splitArr);
        const [, firebaseKey] = e.target.id.split("--");
        deleteBook(firebaseKey)
          .then(() => getBooks(user.uid))
          .then((books) => showBooks(books));
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes("add-book-btn")) {
      addBookForm(user.uid);
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes("edit-book-btn")) {
      const [, firebaseKey] = e.target.id.split("--");
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(user.uid, bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes("view-book-btn")) {
      console.warn("VIEW BOOK", e.target.id);
      console.warn(e.target.id.split("--"));
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes("delete-author-btn")) {
      // eslint-disable-next-line no-alert
      if (window.confirm("Want to delete?")) {
        console.warn("DELETE AUTHOR", e.target.id);
        console.warn(e.target.id.split("--"));
        const [, firebaseKey] = e.target.id.split("--");
        deleteSingleAuthor(firebaseKey)
          .then(() => getAuthors(user.uid))
          .then((authors) => showAuthors(authors));
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes("add-author-btn")) {
      console.warn("ADD AUTHOR");
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes("edit-author-btn")) {
      const splitArr = e.target.id.split("--");
      console.warn("splitArr", splitArr);
      const [, firebaseKey] = e.target.id.split("--");
      getSingleAuthor(firebaseKey).then((author) => addAuthorForm(author));
    }
  });
};

export default domEvents;
