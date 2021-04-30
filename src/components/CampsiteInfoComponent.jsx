import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Modal,
  FormGroup,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent'


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, addComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <p>
              {comment.text}
              <br></br>
              --{comment.author},{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </p>
          );
        })}
        <CommentForm campsiteId={campsiteId} addComment={addComment} />
      </div>
    );
  }
  return <div></div>;
}

function CampsiteInfo(props) {

  if(props.isLoading){
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  }
  if(props.errMess){
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    )
  }
  if (props.campsite) {
    return (
      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/directory">Directory</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
        </Breadcrumb>
        <h2>{props.campsite.name}</h2>
        <hr />
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} addComment={props.addComment} campsiteId={props.campsite.id} />
        </div>
      </div>
    );
  }
  return <div></div>;
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
    console.log("click");
  };

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text)
    
  }

  render() {
    return (
      <>
        <Button color="primary" outline onClick={this.toggleModal}>
          <i className="fa fa-pencil"></i>Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            {" "}
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <FormGroup>
                <Label htmlFor="Rating">Rating</Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  placeholder="rating"
                  className="form-control"
                >
                  <option></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <Errors
                    className="text-danger"
                    model=".rating"
                    show="touched"
                    component="div"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Control.select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="Name">Your Name</Label>
                <Control.text
                  model=".Name"
                  id="Name"
                  name="Name"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".Name"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  rows="6"
                  model=".comment"
                  id="comment"
                  name="comment"
                  placeholder="add your comments"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(15),
                    maxLength: maxLength(300),
                  }}
                />
                {/* <Errors
                  className="text-danger"
                  model=".comment"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 15 characters",
                    maxLength: "Must be 300 characters or less",
                  }}
                /> */}
              </FormGroup>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default CampsiteInfo;
