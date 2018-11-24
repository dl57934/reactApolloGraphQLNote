import { GET_NOTES } from "./quries";

export const saveNote = cache => {
  const { notes } = cache.readQuery({ query: GET_NOTES });
  const jsonNotes = JSON.stringify(notes);
  try {
    localStorage.setItem("Note", jsonNotes);
  } catch (error) {
    console.log(error);
  }
};

export const restoreNote = () => {
  const notes = localStorage.getItem("Note");
  if (notes) {
    try {
      const parseNotes = JSON.parse(notes);
      return parseNotes;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  return [];
};
