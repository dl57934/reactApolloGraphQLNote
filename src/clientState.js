import { NOTE_FRAGMENT } from "./fragment";
import { GET_NOTES } from "./quries";
import { saveNote } from "./offline";

export const defaults = {
  notes: []
};
export const typeDefs = [
  `
      schema {
          query: Query
          mutation: Mutation
      }
      type Query {
          notes: [Note]!
          note(id: Int!): Note
      }
      type Mutation{
          createNote(title: String!, content: String!):Note!
          editNote(id: Int!, title: String!, content:String!):Note!
      }
      type Note{
          id: Int!
          title: String!
          content: String!
      }
      `
];
export const resolvers = {
  Query: {
    note: (_, variables, { cache }) => {
      const id = cache.config.dataIdFromObject({
        __typename: "Note",
        id: variables.id
      });
      const Note = cache.readFragment({ fragment: NOTE_FRAGMENT, id });
      return Note;
    }
  },
  Mutation: {
    createNote: (_, variables, { cache }) => {
      const { notes } = cache.readQuery({ query: GET_NOTES });
      const { title, content } = variables;
      const newNote = {
        __typename: "Note",
        title,
        content,
        id: notes.length + 1
      };
      cache.writeData({
        data: {
          notes: [newNote, ...notes]
        }
      });
      saveNote(cache);
      return newNote;
    },
    editNote: (_, { id, title, content }, { cache }) => {
      const noteId = cache.config.dataIdFromObject({
        __typename: "Note",
        id
      });
      const Note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId });
      const updatedNote = {
        ...Note,
        title,
        content
      };
      cache.writeFragment({
        fragment: NOTE_FRAGMENT,
        id: noteId,
        data: updatedNote
      });
      return updatedNote;
    }
  }
};
