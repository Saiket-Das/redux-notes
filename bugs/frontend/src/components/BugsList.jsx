import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, getUnresolvedBugsSelector, resolveBug } from "../store/bugs";

const BugsList = () => {
  const dispatch = useDispatch();

  //   const {} = useSelector((state) => state.entities.bugs.list);
  const bugs = useSelector(getUnresolvedBugsSelector);

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  return (
    <div>
      <ul>
        {bugs.map((bug) => (
          <li key={bug.id} style={{ marginBottom: "10px" }}>
            {bug.description}
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => dispatch(resolveBug(bug.id))}
            >
              Resolve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugsList;
