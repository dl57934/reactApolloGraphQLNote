import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { GET_NOTES } from "../../quries";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Plus } from "../../Components/plus.svg";

const Header = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  margin-left: 10px;
  transform: scale(0.8);
  background-color: #eee;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const SubTitle = styled.h2`
  color: #a2a19e;
  font-weight: 400;
`;

export default class Notes extends Component {
  render() {
    return (
      <Fragment>
        <Header>
          <Title>
            Sanghoon's Study Note
            <Link to={"/add"}>
              <Button>
                <Plus />
              </Button>
            </Link>
          </Title>
          <SubTitle>Taking notes while we learn. </SubTitle>
        </Header>
        <Query query={GET_NOTES}>
          {({ data }) =>
            data.notes
              ? data.notes.map(note => (
                  <Link to={`/note/${note.id}`} key={note.id}>
                    {note.title}
                  </Link>
                ))
              : ""
          }
        </Query>
      </Fragment>
    );
  }
}
