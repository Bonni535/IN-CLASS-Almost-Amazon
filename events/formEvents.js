import { createAuthor, getAuthors, updateAuthor } from "../api/authorData";
import { createBook, getBooks, updateBook } from "../api/bookData";
import { showAuthors } from "../pages/authors";
import { showBooks } from "../pages/books";

const formEvents = (user) => {
  document.querySelector("#main-container").addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes("submit-book")) {
      console.warn("CLICKED SUBMIT BOOK", e.target.id);
      console.warn('e.target.id', e.target.id)
      const payload = {
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        image: document.querySelector("#image").value,
        price: document.querySelector("#price").value,
        author_id: document.querySelector("#author_id").value,
        sale: document.querySelector("#sale").checked,
        uid: user.uid,
      };
      createBook(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateBook(patchPayload).then(() => {
          getBooks(user.uid).then(showBooks);
        });
      });
    }

    // TODO: CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes("update-book")) {
      const [, firebaseKey] = e.target.id.split("--");
      console.warn("CLICKED UPDATE BOOK", e.target.id);
      console.warn(firebaseKey);
      const payload = {
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        image: document.querySelector("#image").value,
        price: document.querySelector("#price").value,
        author_id: document.querySelector("#author_id").value,
        sale: document.querySelector("#sale").checked,
        firebaseKey,
      };

      updateBook(payload).then(() => {
        getBooks(user.uid).then(showBooks);
      });
    }

    // FIXME: ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes("submit-author")) {
      console.warn("CLICKED SUBMIT AUTHOR");
      const payload = {
        email: document.querySelector("#email").value,
        first_name: document.querySelector("#first_name").value,
        last_name: document.querySelector("#last_name").value,
        favorite: document.querySelector("#favorite").value,
        uid: user.uid,
      };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          getAuthors(user.uid).then(showAuthors);
        });
      });
    }
    // FIXME:ADD CLICK EVENT FOR UPDATING AN AUTHOR
    if (e.target.id.includes("update-author")) {
      const [, firebaseKey] = e.target.id.split("--");
      console.warn("CLICKED UPDATE AUTHOR");
      const payload = {
        email: document.querySelector("#email").value,
        first_name: document.querySelector("#first_name").value,
        last_name: document.querySelector("#last_name").value,
        favorite: document.querySelector("#favorite").value,
        firebaseKey,
      };
      console.warn(payload);
      updateAuthor(payload).then(() => {
        getAuthors(user.uid).then(showAuthors);
      });
    }
  });
};

export default formEvents;
