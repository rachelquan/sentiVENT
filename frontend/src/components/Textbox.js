import React, { Component, Fragment } from "react";
import "./Textbox.css";

import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { analyzeEntity, analyzeSentiment } from "../server/index.js";
import Particles from "react-particles-js";

const particleOpt = {
  particles: {
    number: {
      value: 700,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}

function NegativeSentiment(props) {
  return (
  <div>
    <Container><p>Perhaps you are not feeling your best. Here are some resources nearby that could be beneficial: </p>
    <div id="tablehead">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Organization Name</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell ><a href="www.shcs.ucdavis.edu"  target="_blank">Student Health and Counseling Services</a></TableCell>
            <TableCell >930 Orchard Rd, Davis 95616</TableCell>
          </TableRow>
          <TableRow>
              <TableCell><a href="www.yolocounty.org/health-human-services/mental-health/mental-health-services" target="_blank">Yolo County Health and Human Services</a></TableCell>
              <TableCell>600 A St, Davis 95616</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><a href="www.eachaggiematters.ucdavis.edu/"  target="_blank">Each Aggie Matters</a></TableCell>
            <TableCell>232 ARC, One Shields Avenue Davis, CA 95616</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div></Container>
    
  </div>);
}

function PostiveSentiment(props) {
  return (<p>Glad to see that you seem happy!</p>);
}

function SentimentText(props) {
  const sentimentValue = props.sentimentValue;
  if (sentimentValue >= 0) {
    return (<PostiveSentiment />);
  }

  else if (sentimentValue < 0) {
    return (<NegativeSentiment />);
  }

  return null;
}

export default class Textbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: "",
      response: [], 
      sentiment: {
        documentSentiment:{
          magnitude: null
        }
      }
    };
  }

  handleChange = e => {
    this.setState({ userText: e.target.value });
  };

  handleCancel = e => {
    this.setState({ userText: ""});
  };

  handleSubmit = async e => {
    let payload = {
      document: {
        type: "PLAIN_TEXT",
        language: "EN",
        content: this.state.userText
      },
      encodingType: "UTF8",
    };

    let res = await analyzeEntity(payload);
    let res_sentiment = await analyzeSentiment(payload);
    
    this.setState({ response: res.entities });
    this.setState({sentiment: res_sentiment});

    console.log(res.entities);
    console.log(res_sentiment);
    console.log("happy");
  };

  render() {
    console.log(this.state.sentiment);
    return (
      <Fragment>
        <Particles
          params={particleOpt}
        />
        <TextField
          id="outlined-multiline-static"
          className="textbox"
          value={this.state.userText}
          onChange={this.handleChange}
          multiline
          rows="7"
          variant="outlined"
          size="medium"
          label="How are you feeling?"
        ></TextField>
        <div>
          <br/>
          <Button
            id="cancelbuttons"
            type="submit"
            onClick={this.handleCancel}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            id="buttons"
            type="submit"
            onClick={this.handleSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </div>
        <br />
        <ol>
          {this.state.response.map(value => {
            return <li key={value.name}>{value.name}</li>;
          })}
        </ol>

        <SentimentText
          sentimentValue={this.state.sentiment.documentSentiment.score}
        />
      </Fragment>
    );
  }
}
