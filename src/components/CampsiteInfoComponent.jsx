import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

export default class CampsiteInfoComponent extends Component {
    constructor(props){
        super(props)
    }

    

    renderCampsite(campsite){
        return(
            <div className="col-md-5 m-1">
                    <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

    renderComments(comments){
        if(comments){
            return (
                <div className="col-md-5">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return (
                            <p>{comment.text}
                            <br></br>
                            --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        )
                    })}
                    
                </div>
            )
        }
        return <div></div>
    }

    render() {
       const campsite = this.props.campsite;
       if(campsite){
        return ( 
            <div className="container">
                <div className="row">
                    {this.renderCampsite(this.props.campsite)}
                    {this.renderComments(this.props.campsite.comments)}
                </div>
            </div>
    
       )} 
        return <div></div>
    }
}
