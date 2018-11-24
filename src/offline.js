import { GET_NOTES } from "./quries";

export const saveNote = cache => {
  const notes = cache.readQuery({ query: GET_NOTES });
  const jsonNotes = JSON.stringify(notes);
  try {
    localStorage.setItem("Note", jsonNotes);
  } catch (error) {
    console.log(error);
  }
};
