import React from "react";
import TopBar from "./TopBar"
import MaterialTable from "material-table";

export default class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
  }
  async componentDidMount(){
    let response = await fetch(`/data/donations.csv`);
    let file = await response.blob();
    let content = await file.text();
    let fileDataArray = await content.split("\n");
    await fileDataArray.shift();
    await console.log(fileDataArray);
    fileDataArray = await fileDataArray.filter(eachRow=>eachRow);
    let tableData = await fileDataArray.map(eachRow=>{
      let rowData = eachRow.split("|");
      return {
        "name":rowData[0],
        "area":rowData[1],
        "funds":rowData[2]
      }
    });
    await console.log(tableData);
    this.setState({data:tableData});
    }

  render(){
    return(
      <React.Fragment>
        <TopBar></TopBar>
        <div style={{
            "display":"flex",
            "justifyContent":"center",
            "alignItems":"center",
            "marginTop":"2rem"
          }}>
          <MaterialTable
            title="Donations"
            columns={[
              {title:"Name",field:"name",type:"string"},
              {title:"Area",field:"area",type:"string"},
              {title:"Funds",field:"funds",type:'numeric'}
            ]}
            data={this.state.data}
            options={{
              sorting:true
            }}/>
          </div>
      </React.Fragment>
    );
  }
}
