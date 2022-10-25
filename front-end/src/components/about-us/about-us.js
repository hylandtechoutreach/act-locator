import React, {Component} from "react"
import { connect } from "react-redux";
import PropTypes from "prop-types";



class About extends Component {
  render() {
      return (<div>
        <h1>Welcome to the UCT Locator</h1> 
        <p>This is a web application that allows caregivers to locate accessible 
           universal changing stations.</p>
        <p>This project is part of the <a href = "http://www.changingspacescampaign.org/" 
            target = "_blank" rel="noopener noreferrer">Changing Spaces Campaign</a></p>
      </div>
      )      
  }
}

About.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(About);

About.propTypes = {
  auth: PropTypes.object.isRequired,
};

