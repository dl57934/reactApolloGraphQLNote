import React, { Component, Fragment } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import MarkdownRender from "react-markdown-renderer";

const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`;

const TitleInput = styled(TextareaAutosize)`
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  ::placeholder {
    font-weight: 600;
  }
`;

const ContentInput = styled(TextareaAutosize)`
  font-size: 18px;
  margin-top: 15px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.button`
  padding: 5px;
`;

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || "",
      content: props.content || "",
      id: props.id || null
    };
  }

  render() {
    const { title, content } = this.state;
    return (
      <Fragment>
        <TitleContainer>
          <TitleInput
            value={title}
            placeholder={"Unamed....."}
            onChange={this._onInputChange}
            name={"title"}
          />
          <Button onClick={this._onSave}>Save</Button>
        </TitleContainer>
        <ContentPreview>
          <ContentInput
            value={content}
            onChange={this._onInputChange}
            name={"content"}
            placeholder={"# This is supported markdown!"}
          />
          <MarkdownRender markdown={content} className={"markdown"} />
        </ContentPreview>
      </Fragment>
    );
  }
  _onInputChange = event => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    });
  };
  _onSave = () => {
    const { onSave } = this.props;
    const { title, content, id } = this.state;
    console.log(id);
    onSave(title, content, id);
  };
}
