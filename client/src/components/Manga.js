import axios from 'axios';
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, CardGroup, Form } from 'react-bootstrap';
export class Manga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosingManga: [],
      slug: '',
      title: '',
      showUpdateForm: false,
      API: process.env.REACT_APP_API
    }
  }
  componentDidMount = async () => {
    const getRequest = await axios.get(`${this.state.API}/manga/mymanga`);

    this.setState({
      chosingManga: getRequest.data
    })
    console.log(this.state.chosingManga);
  }
  deleteManga = async (slug) => {
    const deleteRequest = await axios.delete(`${this.state.API}/manga/mymanga/${slug}`);
    this.setState({
      chosingManga: deleteRequest.data
    })
  }
  updateSlug = async (slug) => { this.setState({ slug: slug, showUpdateForm: true }) }
  updatetitle = async (e) => { this.setState({ title: e.target.value }) }
  updateManga = async (e) => {
    e.preventDefault();
    const body = { title: this.state.title }
    const updateRequest = await axios.put(`${this.state.API}/manga/mymanga/${this.state.slug}`, body);
    this.setState({ chosingManga: updateRequest.data })
  }
  render() {
    const rendering =
      <Row xs={2} md={4} className="g-2">
        {this.state.chosingManga.map((data, index) => {
          return (<div key={index}>
            <Col >
              <CardGroup style={{ height: '18rem' }}>
                <Card >
                  <Card.Img src={data.img} alt='' />
                  <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Link>{data.review}</Card.Link>
                  </Card.Body>
                  <Card.Footer>Start Show in :{data.startShow}</Card.Footer>
                  <Button onClick={() => this.updateSlug(data.slug)} variant="primary">update</Button>
                  <Button onClick={() => this.deleteManga(data.slug)} variant="danger">delete</Button>
                </Card>
              </CardGroup>
            </Col>
          </div>
          )
        })}
      </Row>

    const form = <Form onSubmit={(e) => this.updateManga(e)}>
      <Form.Control onChange={this.updatetitle} type='text' />
      <Button type='submit' value='Update' variant="primary" >Update</Button>

    </Form>
    return (
      <div>
        {rendering}
        {this.state.showUpdateForm &&

          form

        }
      </div>
    )
  }
}

export default Manga
