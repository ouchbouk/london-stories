import _ from "lodash";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { connect } from "react-redux";
import { getAllAttractions, createStory } from "../../actions";
import history from "../../history";
import {
  Input,
  Label,
  Container,
  Button,
  TextArea,
  Select,
  CenterText,
  Title,
  FlashMessage,
} from "../styledComponents/createAttraction";
class CreateStory extends React.Component {
  state = {
    title: "",
    body: "",
    locationId: "",
    tagTerm: "",
    tags: [],
    publish: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, body, locationId, tags, publish } = this.state;
    if (locationId === "") locationId = this.props.attractions[0]._id;
    this.props.createStory({
      title,
      body,
      locationId,
      tags,
      published: publish,
    });
  };

  componentDidMount() {
    this.props.getAllAttractions();
  }

  renderAttractionsDropdown = () => {
    let attractions = this.props.attractions;
    if (attractions) {
      return (
        <div>
          <Label>Location</Label>
          <Select
            onClick={(e) => {
              this.setState({ locationId: e.target.value });
            }}
          >
            {attractions.map(({ _id, name }) => {
              return (
                <option value={_id} key={_id}>
                  {name}
                </option>
              );
            })}
          </Select>
        </div>
      );
    }
  };

  renderTagsInput = () => {
    let { tagTerm, tags } = this.state;
    return (
      <div style={{ width: "45rem" }}>
        <Label>Tags</Label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <Input
            type="text"
            onChange={({ target }) => this.setState({ tagTerm: target.value })}
            value={tagTerm}
          />
          <button
            type="button"
            style={{
              border: "none",
              backgroundColor: "#064e3b",
              color: "white",
              height: "52px",
              width: "100px",
            }}
            onClick={() => {
              if (tagTerm) {
                this.setState({ tags: [...tags, tagTerm] });
                this.setState({ tagTerm: "" });
              }
            }}
          >
            Add tag
          </button>
        </div>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "12px",
          }}
        >
          {tags.map((tag, i) => {
            return (
              <li key={i}>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  onClick={() => {
                    let tags = this.state.tags;
                    tags.splice(i, 1);
                    this.setState({ tags });
                  }}
                >
                  <span> {tag}</span>
                  <AiOutlineCloseCircle style={{ cursor: "pointer" }} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  renderStoryForm = () => {
    let { title, body, publish } = this.state;
    return (
      <Container style={{ borderRadius: "12px" ,marginBottom:'40px'}}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Label>Title</Label>
            <Input
              style={{ width: "45rem", display: "block" }}
              type="text"
              onChange={({ target }) => {
                this.setState({ title: target.value });
              }}
              value={title}
            />
          </div>
          <div>
            <Label>Body</Label>
            <TextArea
              type="text"
              onChange={({ target }) => this.setState({ body: target.value })}
              value={body}
            />
          </div>
          {this.renderAttractionsDropdown()}
          {this.renderTagsInput()}
          <div
             style={{
              width: "45rem",
              display: "flex",
              alignItems: "center",
              gap: "50px",
              marginBottom:'30px'
            }}
          >
            <Label>Publish</Label>
            <input
              style={{ transform: "scale(1.5)" }}
              type="checkbox"
              onChange={() => {
                this.setState({ publish: !publish });
              }}
            />
          </div>
          <Button type="submit">Submit Story</Button>
        </form>
      </Container>
    );
  };

  render() {
    if (!this.props.user.loggedIn) {
      history.push("/login");
    }
    return <div>{this.renderStoryForm()}</div>;
  }
}

export default connect(
  ({ attractions, user }) => {
    return { attractions: _.values(attractions), user };
  },
  { getAllAttractions, createStory }
)(CreateStory);
