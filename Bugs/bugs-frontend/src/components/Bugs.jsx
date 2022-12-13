import React, { Component } from "react";
import StoreContext from "../contexts/storeContext";
import { loadBugs } from "../store/bugs";

export default class Bugs extends Component {
  static contextType = StoreContext;

  state = { bugs: [] };

  componentDidMount() {
    const store = this.context;

    this.unsubscribe = store.subscribe(() => {
      const bugsInSotre = store.getState().entities.bugs.list;

      if (this.state.bugs !== bugsInSotre) {
        this.setState({ bugs: bugsInSotre });
      }
    });

    store.dispatch(loadBugs());
    console.log(this.state.bugs);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.bugs.map((bug) => (
            <li key={bug.id}>{bug.description}</li>
          ))}
        </ul>
      </div>
    );
  }
}
