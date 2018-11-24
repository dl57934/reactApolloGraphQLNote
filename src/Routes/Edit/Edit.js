import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { GET_NOTE } from "../../quries";
import Editor from "../../Components/Editor";
import gql from "graphql-tag";

const EDIT_NOTE = gql`
  mutation editNote($id: Int!, $title: String!, $content: String!) @client {
    editNote(id: $id, title: $title, content: $content) {
      id
    }
  }
`;

export default class Edit extends Component {
  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <Query query={GET_NOTE} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return "loading";
          const { title, content } = data.note;

          return (
            <Mutation mutation={EDIT_NOTE}>
              {editNote => {
                this.editNote = editNote;
                return (
                  <Editor
                    title={title}
                    content={content}
                    id={id}
                    onSave={this._onSave}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
  _onSave = (title, content, id) => {
    const {
      history: { push }
    } = this.props;
    if (title !== "" && content !== "" && id) {
      this.editNote({ variables: { id, title, content } });
      push("/");
    }
  };
}
