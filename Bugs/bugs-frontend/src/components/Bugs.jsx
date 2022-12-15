import React, { Component } from "react";
import { connect } from "react-redux";

import { loadBugs, resolveBug, getUnresolvedBugsSelector } from "../store/bugs";

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.bugs.map((bug) => (
            <li key={bug.id} style={{ marginBottom: "10px" }}>
              {bug.description}
              <button
                style={{ marginLeft: "20px" }}
                onClick={() => this.props.resolveBug(bug.id)}
              >
                Resolve
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// bugs: state.entities.bug.list

const mappStateToProps = (state) => ({
  bugs: getUnresolvedBugsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBug: (id) => dispatch(resolveBug(id)),
});

// Conatiner
// Presentation (Bugs)

export default connect(mappStateToProps, mapDispatchToProps)(Bugs);
