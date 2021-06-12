import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, CardGroup } from 'react-bootstrap';
export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      API: process.env.REACT_APP_API,
      mainData: [],

    }
  }
  componentDidMount = async () => {
    const getRequest = await axios.get(`${this.state.API}/manga`);
    this.setState({
      mainData: getRequest.data
    })
  }
  saveItem = async (manga) => {
    console.log(this.state.API);

    await axios.post(`${this.state.API}/manga/mymanga`, manga);
  }
  render() {

    return (
      <div>
        <Row xs={1} md={4} className="g-4">
          {this.state.mainData.map((data, index) => {
            return (<div key={index}>
              <Col>
                <CardGroup>
                  <Card >
                    <Card.Img src={data.img} alt='' />
                    <Card.Body>
                      <Card.Title>{data.title}</Card.Title>
                      <Card.Link>{data.review}</Card.Link>
                    </Card.Body>
                    <Card.Footer>Start Show in :{data.startShow}</Card.Footer>
                    <Button onClick={() => this.saveItem(data)} variant="primary">Add To Favorite</Button>
                  </Card>
                </CardGroup>
              </Col>
            </div>)
          })}
        </Row> </div>
    )
  }
}

export default Main
