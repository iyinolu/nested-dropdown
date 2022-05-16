/* eslint-disable no-unused-vars */

import React from "react";
import { createUseStyles } from "react-jss";
import "./App.css";
import { Container, Main, InputField, Form } from "./utils/styles";
import { query } from "./utils/static";
import axios from "axios";
import Tree from "./component/Tree";
export const treeContext = React.createContext();

function App() {
  /*
   * Main Component. Renders form fiels, buttons, and
   * dropdown tree.
   */
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [showData, setShowData] = React.useState(false);
  const [treeParams, setTreeParams] = React.useState({ n: 2, m: 2 });
  const [closeAll, setCloseAll] = React.useState(false);

  // Render Tree component with random data
  React.useEffect(() => {
    axios
      .post("https://countries.trevorblades.com/", {
        query,
      })
      .then((res) => {
        setData(res.data.data.continents);
      })
      .catch((err) => console.log(err.response));
  }, []);

  React.useEffect(() => {
    if (closeAll) {
      setCloseAll(false);
    }
  }, [closeAll, setCloseAll]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowData(false);
    var n = parseInt(e.target[0].value);
    var m = parseInt(e.target[1].value);
    setTreeParams({ n: n, m: m });
  };

  const renderFormField = (key, label, placeholder) => {
    return (
      <div key={key} className={classes.formContainer}>
        <div className={classes.formLabel}>{label}</div>
        <InputField type="number" placeholder={placeholder} />
      </div>
    );
  };

  return (
    <Main>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {renderFormField(1, "N", "Enter Tree Depth")}
        {renderFormField(2, "M", "No of Children in Each Node")}
        <button className={classes.goButton} type="submit">
          Go
        </button>
        <button
          type="button"
          className={classes.showContinentButton}
          onClick={() => setShowData(true)}
        >
          Show Continent Data
        </button>
      </Form>
      <Container>
        <treeContext.Provider value={{ closeAll, setCloseAll, showData }}>
          {showData ? (
            data.length > 0 ? (
              <Tree data={data} />
            ) : (
              ""
            )
          ) : (
            <Tree n={treeParams.n} m={treeParams.m} />
          )}
        </treeContext.Provider>
      </Container>
    </Main>
  );
}

const useStyles = createUseStyles({
  showContinentButton: {
    padding: "15px",
    marginLeft: "20px"
  },
  goButton: {
    height: "40px",
    width: "40px",
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
  },
  formLabel: {
    fontWeight: "500",
    color: "grey",
    marginRight: "10px",
  },
});

export default App;
