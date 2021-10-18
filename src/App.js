/* eslint-disable no-unused-vars */

import React from 'react';
import './App.css';
import { Container, Main, InputField, Form } from './utils/styles';
import { query } from './utils/static';
import { TreeJsonMod, RenderData } from './helpers'
import axios from 'axios';

export const treeContext = React.createContext();

function App() {
  /*
   * Main Component. Renders form fiels, buttons, and 
   * dropdown tree.
  */
  const [data, setData] = React.useState([])
  const [showData, setShowData] = React.useState(false)
  const [treeParams, setTreeParams] = React.useState({n: 2, m:2})
  const [closeAll, setCloseAll] = React.useState(false)

  // Render Tree component with random data
  const treeDropdown = () => {
    return TreeJsonMod(treeParams.n, treeParams.m)
  }

  React.useEffect(() => {
    axios.post("https://countries.trevorblades.com/", {
      query
    }).then(res => {
      setData(res.data.data.continents)
    }).catch(err => console.log(err.response))
  }, []) 

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowData(false)
    var n = parseInt(e.target[0].value)
    var m = parseInt(e.target[1].value)
    setTreeParams({n:n, m:m})
  }

  const renderFormField = (key, label, placeholder) => {
    return (
      <span key={key} style={{ display: "flex", alignItems: "center"}}>
        <span style={{ fontWeight: "500", color: "grey", marginRight: "10px"}}>
          {label}
        </span>
        <InputField type='number' placeholder={placeholder} />
      </span>
    )
  }

  const returnData = React.useMemo(() => {
    return RenderData(data)
  }, [data])
  
  return (
    <Main>
      <Form onSubmit={(e) => handleSubmit(e)} style={{ marginTop: "30px"}}>
        {renderFormField(1, "N", "Enter Tree Depth...")}
        {renderFormField(2, "M", "No of Children in Each Node...")}
        <button style={{ height: "40px", width: "40px"}} type='submit'>Go</button>
      </Form>
      <button style= {{ marginTop: "20px", padding: "15px"}} onClick={() => setShowData(true)}>
        Show Continent Data 
      </button>
      <Container>
        <treeContext.Provider value={{closeAll, setCloseAll}}>
          {showData ? data.length > 0 ? returnData : "" : treeDropdown()}           
        </treeContext.Provider>
      </Container>
    </Main>
  );
}


export default App;

















