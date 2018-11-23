import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { GET_NOTE } from "../../quries";
import styled from "styled-components";
import MarkdownRender from "react-markdown-renderer";
import { Link } from "react-router-dom";

const TitleComponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
`;

const Button = styled.button`
  padding: 5px;
`;

export default class Note extends Component {
  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <Query query={GET_NOTE} variables={{ id }}>
        {({ data }) =>
          data.note ? (
            <Fragment>
              <TitleComponent>
                <Title>{data.note.title}</Title>
                <Link to={`/edit/${data.note.id}`}>
                  <Button>Edit</Button>
                </Link>
              </TitleComponent>
              <MarkdownRender markdown={data.note.content} />
            </Fragment>
          ) : null
        }
      </Query>
    );
  }
}
