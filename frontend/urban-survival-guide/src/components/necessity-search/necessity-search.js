import axios from 'axios';
import React, { Component } from 'react';
import { Button, Card, Checkbox, Grid } from 'semantic-ui-react';


class NecessitySearch extends Component {


  constructor(props) {
    super();
    this.state = {
        necessities: [],
        nids: '',
        status: [],
        type: []
    };

    this.searchNecessities = this.searchNecessities.bind(this)
    this.gotoNecessity = this.gotoNecessity.bind(this)
  }

  searchNecessities() {
    let query = 'http://localhost:5000/NecessityList?'
    if (this.state.nids != '')
      query += 'id=' + this.state.nids.toString() + '&'

    if (this.state.status.length > 0)
      query += 'status=' + this.state.status.join(',') + '&'

    if (this.state.type.length > 0)
      query += 'type=' + this.state.type.join(',') + '&'

    axios.get(query)
      .then(response => {
        var necessities = []
        for (let necessity of response.data) {
          necessities.push(necessity)
        }

        this.setState({
          necessities: necessities
        });
      })
  }

  toggleStatus(status) {
    var statuses = [...this.state.status]

    if (statuses.includes(status))
      statuses.splice(statuses.indexOf(status), 1)
    else
      statuses.push(status)

    this.setState({
      status: statuses
    });
  }

  toggleType(type) {
    var types = [...this.state.type]

    if (types.includes(type))
      types.splice(types.indexOf(type), 1)
    else
      types.push(type)

    this.setState({
      type: types
    });
  }

  gotoNecessity(id) {
    axios.get('http://localhost:5000/NecessityType/'+id)
      .then(response => {
        this.props.history.push('/necessity/' + response.data + '/' + id);
      })
  }

  render() {
    return (

    <div>
    <style>{`
      .search {
        background-color: #bfbfbf;
        padding: 1rem;
        margin: 1rem 1rem 1rem 0;
      }

      .results {
        background-color: #bfbfbf;
        padding: 1rem;
        padding-bottom: 2rem;
        margin: 1rem 0rem 1rem 1rem;
      }
    }
    `}
    </style>
        <Grid relaxed>
            <Grid.Column width={11}>
              <Grid.Row>
              <div className="results">
                <p>Search Result</p>
                <Card.Group itemsPerRow={4}>
                {this.state.necessities.map((data, idx) => {
                  return (
                    <Card key={idx}>
                      <Card.Content>
                        <Card.Header>Necessity ID: {data.Necessity_id}</Card.Header>
                        <Card.Meta>Building ID: {data.Building_id}</Card.Meta>
                        <Card.Description>
                          Status: {data.Status}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                          <Button basic color='blue' onClick={() => this.gotoNecessity(data.Necessity_id)}>
                            Details
                          </Button>
                      </Card.Content>
                    </Card>
                  )})}

               </Card.Group>
              </div>
              </Grid.Row>
            </Grid.Column>


            <Grid.Column width={5}>
              <div className="search">
                <div>
                  <span>Find necessities</span>
                </div>

                <hr></hr>

                <span>Status:</span>
                <br></br>
                <Checkbox label='open' onChange={() => {
                  this.toggleStatus('open')}}/>
                <br></br>
                <Checkbox label='closed' onChange={() => {
                  this.toggleStatus('closed')}}/>
                <br></br>
                <Checkbox label='broken' onChange={() => {
                  this.toggleStatus('broken')}}/>
                <br></br>

                <span>Type:</span>
                <br></br>
                <Checkbox label='washroom' onChange={() => {
                  this.toggleType('Washroom')}}/>
                <br></br>
                <Checkbox label='shower' onChange={() => {
                  this.toggleType('Shower')}}/>
                <br></br>
                <Checkbox label='fountain' onChange={() => {
                  this.toggleType('WaterFountain')}}/>
                <br></br>

                <span>Necessity IDs:</span>
                <input placeholder="ex: 1,4,10" onChange={(event) => {
                  this.setState({nids: event.target.value})}}/>
                <button onClick={() => this.searchNecessities()}>Search</button>

              </div>
            </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default NecessitySearch
