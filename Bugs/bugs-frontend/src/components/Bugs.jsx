import React, { Component } from "react";
import { connect } from "react-redux";

import { loadBugs } from "../store/bugs";

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.bugs.map((bug) => (
            <li key={bug.id}>{bug.description}</li>
          ))}
        </ul>
      </div>
    );
  }
}

// bugs: state.entities.bug.list

const mappStateToProps = (state) => ({
  bugs: state.entities.bugs.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
});

// Conatiner
// Presentation (Bugs)

export default connect(mappStateToProps, mapDispatchToProps)(Bugs);
