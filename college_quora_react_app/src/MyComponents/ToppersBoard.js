import React, { Component } from 'react'

export class ToppersBoard extends Component {
    url="http://localhost:5000/";
    
    state={
    CSName:'',CSPercentage:0,
    ITName:'',ITPercentage:0,
    ECName:'',ECPercentage:0,
    MEName:'',MEPercentage:0,
    CivilName:'',CivilPercentage:0,
    ShowPanel:'List',
    User:{}
    
}
TogglePanel(PanelName){
    this.setState({ShowPanel:PanelName});
    console.log(this.state.ShowPanel);
}
SetValue(e) {
    this.state[e.target.id]=e.target.value;
}
async componentDidMount()
{
    this.setState({ User : JSON.parse(localStorage.getItem("User")) });

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify(data)
    };
    const response = await fetch(this.url+'users/GetToppersBoard', requestOptions);
   var data = await response.json();
    this.setState(data);

}
async Save()
{
   
    var data=this.state;
        //console.log(this.state);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch(this.url+'users/SaveToppersBoard', requestOptions);
    if(response.status==409){console.log(await response.text()); }
    else if(response.status==200)
    {
            data = await response.json();
            this.setState(data);
            console.log(this.state);
            this.TogglePanel('List')
            alert("Success");
            
            //window.location.href = "/home";
    }

}    
  render() {
    return (
      <div>
          <div className="card">
    <div className="card-header d-xl-flex align-items-xl-center">
        <h5 className="flex-fill mb-0">Toppers Board</h5>
        
        {this.state.User.UserType=='Admin'?<div className="btn-group" role="group">
            <button onClick={()=>{this.TogglePanel('Edit')}} className="btn btn-primary" type="button">Edit</button>
            <button onClick={(e)=>{this.Save()}} className="btn btn-primary" type="button">Save</button>
        </div>:<></>
        
        }
        
    </div>
    <div className="card-body"></div>
   
    {this.state.ShowPanel=='List'? <div className="table-responsive">
        <table className="table">
            <thead>
                <tr>
                    <th style={{"width": "50px"}}>Sn.</th>
                    <th>Branch</th>
                    <th>Name</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>CS</td>
                    <td>{this.state.CSName}</td>
                    <td>{this.state.CSPercentage}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>EC</td>
                    <td>{this.state.ECName}</td>
                    <td>{this.state.ECPercentage}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>IT</td>
                    <td>{this.state.ITName}</td>
                    <td>{this.state.ITPercentage}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>ME</td>
                    <td>{this.state.MEName}</td>
                    <td>{this.state.MEPercentage}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Civil</td>
                    <td>{this.state.CivilName}</td>
                    <td>{this.state.CivilPercentage}</td>
                </tr>
            </tbody>
        </table>
    </div>   
    
    :<div className="table-responsive">
        <table className="table">
            <thead>
                <tr>
                    <th style={{"width": "50px"}}>Sn.</th>
                    <th style={{"width": "85px"}}>Branch</th>
                    <th>Name</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>CS</td>
                    <td><input id="CSName" onChange={(e)=>{this.SetValue(e)}} type="text" defaultValue={this.state.CSName} className="form-control" /></td>
                    <td><input  id="CSPercentage"  onChange={(e)=>{this.SetValue(e)}} type="text" defaultValue={this.state.CSPercentage} className="form-control" /></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>EC</td>
                    <td><input  id="ECName"  onChange={(e)=>{this.SetValue(e)}} type="text" defaultValue={this.state.ECName} className="form-control" /></td>
                    <td><input  id="ECPercentage"  onChange={(e)=>{this.SetValue(e)}} type="text"  defaultValue={this.state.ECPercentage} className="form-control" /></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>IT</td>
                    <td><input  id="ITName"  onChange={(e)=>{this.SetValue(e)}} type="text" defaultValue={this.state.ITName} className="form-control" /></td>
                    <td><input  id="ITPercentage"  onChange={(e)=>{this.SetValue(e)}} type="text"  defaultValue={this.state.ITPercentage} className="form-control" /></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>ME</td>
                    <td><input  id="MEName"  onChange={(e)=>{this.SetValue(e)}} type="text" defaultValue={this.state.MEName} className="form-control" /></td>
                    <td><input  id="MEPercentage"  onChange={(e)=>{this.SetValue(e)}} type="text"  defaultValue={this.state.MEPercentage} className="form-control" /></td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Civil</td>
                    <td><input  id="CivilName"  onChange={(e)=>{this.SetValue(e)}} type="text" defaultValue={this.state.CivilName} className="form-control" /></td>
                    <td><input  id="CivilPercentage"  onChange={(e)=>{this.SetValue(e)}} type="text"  defaultValue={this.state.CivilPercentage} className="form-control" /></td>
                </tr>
            </tbody>
        </table>
    </div>
    
}
    
</div>

      </div>
    )
  }
}

export default ToppersBoard