import gql from "graphql-tag";

export const NOTE_FRAGMENT = gql`
  fragment OneNotePars on Note {
    id
    title
    content
  }
`;
