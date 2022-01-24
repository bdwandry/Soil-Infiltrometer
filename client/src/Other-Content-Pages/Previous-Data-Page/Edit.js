/**
 * This is the page that is designed to allow a user to edit specific data for time/volume collection protocols
 */

import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography} from "@material-ui/core";
import Table from "../../Tables-Generated/table";
import CssBaseline from "@material-ui/core/CssBaseline";
import '../../CSS-Files/button.css'

function Edit({that}) {
  window.addEventListener("beforeunload", function (e) {
    let confirmationMessage = 'It looks like you have been editing something. '
        + 'If you leave before saving, test will be los5t.';

    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  });
  //-------------------------------------------------------------------------------------------------//
  //Drawer
  let index = 0;

  const Name = [
    {id: 0, name: "Editing Old Data: "},
  ]

  let currentWindow = window.location.pathname;
  const Categories =
      [
        {id: " Save Changes and Return to Main Page", location: "/soilinfiltrometer/index.html", command: that.EditData, number: 0},
        {id: " Reset and Return to Main Page", location: "/soilinfiltrometer/index.html", command: that.resettingToEditingMainPage, number: 1},
      ]

  const [openModel, setOpenModal] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpenModal(true);
  };
  const handleDrawerClose = () => {
    setOpenModal(false);
  };

  //------------------------------------------------------------------------------------------------//
  //rerender
    const rerender = () => {
        //-----------------------------------------------------------------------------------------------------------------//
        //If the site is in landscape - doesn't matter if its mobile in this one
        if ((that.state.ScreenHeight < that.state.ScreenWidth)) {
            if (that.state.SwitchEditData === 0) {
                return (
                    <div>
                        <div align={"center"}>
                            <AppBar position="static">
                                <Toolbar variant="dense">
                                    <Typography variant="h5" align="center"
                                                style={{width: "100%", alignItems: "center"}}> Edit old Data
                                        (Standard) </Typography>
                                </Toolbar>
                            </AppBar>
                            <div>
                                <h1>You may have refreshed the page or routed to this page directly and an old test
                                    could could not be loaded/edited.</h1>
                                <h1>Please Return to the main page and load a test up.</h1>
                            </div>

                            <div className={"center"}>
                                <Link onClick={that.SwitchToMain} to="/soilinfiltrometer/index.html"
                                      style={{textDecoration: 'none'}}>
                                    <Button variant="contained" color="secondary" className={"buttonContainer"}> Return
                                        to Main Page </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <div>
                            <CssBaseline/>
                            <AppBar position="static">
                                <Toolbar variant="dense">
                                    <Typography variant="h5" align="center" style={{
                                        width: "100%",
                                        alignItems: "center"
                                    }}> {Name[index].name} {that.state.DatabaseData[that.state.indexNum].Title} </Typography>
                                </Toolbar>
                            </AppBar>
                            <main style={{marginTop: 10}}>
                            </main>
                        </div>
                        <div align={"center"} style={{ height: (that.state.ScreenHeight), width: "65%", float: "left"}}>
                            <div className={"center"}>
                                <h1>Non-Editable Test Results</h1>
                            </div>

                            <div align={"center"}>
                                <h3>Mini-disk Configuration</h3>
                                <table>
                                    <tr>
                                        <th>Setting</th>
                                        <th>Number</th>
                                    </tr>
                                    <tr>
                                        <td>Radius:</td>
                                        <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.Radius.toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Alpha:</td>
                                        <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.Alpha.toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>n/ho:</td>
                                        <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.NperH0.toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Suction:</td>
                                        <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.Suction.toString()}</td>
                                    </tr>
                                </table>
                            </div>

                            <br/>
                            <div align={"center"}>
                                <Table Data={that.state.DatabaseData[that.state.indexNum].Data}/>
                            </div>

                        </div>
                        <div align={"center"} style={{ height: (that.state.ScreenHeight), width: "35%", float: "left"}}>
                            <h1>Editable Data</h1>
                            <div align={"center"}>
                                <h3>Change Title</h3>
                                <div>
                                    <TextField id="filled-basic-Time"
                                               label="Title"
                                               variant="filled"
                                               value={that.state.newTitle}
                                               onChange={e => that.setState({newTitle: e.target.value})}
                                    />
                                </div>

                                <br/>
                                <br/>

                                <h3>Change GPS Coordinates </h3>
                                <div>
                                    <div>
                                        <TextField id="filled-basic-Time"
                                                   label="Longitude"
                                                   variant="filled"
                                                   value={that.state.longitude}
                                                   onChange={e => that.setState({longitude: e.target.value})}
                                        />
                                    </div>
                                    <br/>
                                    <div>
                                        <TextField id="filled-basic-Time"
                                                   label="Latitude"
                                                   variant="filled"
                                                   value={that.state.latitude}
                                                   onChange={e => that.setState({latitude: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <br/>
                                    <Button variant="contained"
                                            color="primary"
                                            onClick={that.getGPSLocation}
                                    >Use Phones GPS</Button>
                                </div>

                                <br/>
                                <br/>

                                <div>
                                    <h3>Upload a new Picture</h3>
                                    <div><input
                                        type="file"
                                        id="imageFile"
                                        name='imageFile'
                                        onChange={that.imageUpload}/>
                                    </div>
                                    <div>
                                        <img src={that.state.file}/>
                                    </div>
                                </div>

                                <br/>
                                <br/>

                                <div className={"center"}>
                                    <Link onClick={that.EditData} to="/soilinfiltrometer/index.html"
                                          style={{textDecoration: 'none'}}>
                                        <Button variant="contained" color="primary" className={"buttonContainer"}> Save Changes
                                            and Return to Main Page</Button>
                                    </Link>
                                </div>

                                <br/>

                                <div className={"center"}>
                                    <Link onClick={that.resettingToEditingMainPage} to="/soilinfiltrometer/index.html"
                                          style={{textDecoration: 'none'}}>
                                        <Button variant="contained" color="secondary" className={"buttonContainer"}> Reset and
                                            Return to Main Page </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        //-----------------------------------------------------------------------------------------------------------------//
        //If the site is in portrait
        if (that.state.ScreenHeight > that.state.ScreenWidth) {
            if (that.state.SwitchEditData === 0) {
                return (
                    <div>
                        <div align={"center"}>
                            <AppBar position="static">
                                <Toolbar variant="dense">
                                    <Typography variant="h5" align="center"
                                                style={{width: "100%", alignItems: "center"}}> Edit old Data
                                        (Standard) </Typography>
                                </Toolbar>
                            </AppBar>
                            <div>
                                <h1>You may have refreshed the page or routed to this page directly and an old test
                                    could could not be loaded/edited.</h1>
                                <h1>Please Return to the main page and load a test up.</h1>
                            </div>

                            <div className={"center"}>
                                <Link onClick={that.SwitchToMain} to="/soilinfiltrometer/index.html"
                                      style={{textDecoration: 'none'}}>
                                    <Button variant="contained" color="secondary" className={"buttonContainer"}> Return
                                        to Main Page </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <div>
                            <CssBaseline/>
                            <AppBar position="static">
                                <Toolbar variant="dense">
                                    <Typography variant="h5" align="center" style={{
                                        width: "100%",
                                        alignItems: "center"
                                    }}> {Name[index].name} {that.state.DatabaseData[that.state.indexNum].Title} </Typography>
                                </Toolbar>
                            </AppBar>
                            <main style={{marginTop: 10}}>
                            </main>
                        </div>

                        <div align={"center"}>
                            <h3>Change Title</h3>
                            <div>
                                <TextField id="filled-basic-Time"
                                           label="Title"
                                           variant="filled"
                                           value={that.state.newTitle}
                                           onChange={e => that.setState({newTitle: e.target.value})}
                                />
                            </div>

                            <br/>
                            <br/>

                            <h3>Change GPS Coordinates </h3>
                            <div>
                                <div>
                                    <TextField id="filled-basic-Time"
                                               label="Longitude"
                                               variant="filled"
                                               value={that.state.longitude}
                                               onChange={e => that.setState({longitude: e.target.value})}
                                    />
                                </div>
                                <br/>
                                <div>
                                    <TextField id="filled-basic-Time"
                                               label="Latitude"
                                               variant="filled"
                                               value={that.state.latitude}
                                               onChange={e => that.setState({latitude: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <br/>
                                <Button variant="contained"
                                        color="primary"
                                        onClick={that.getGPSLocation}
                                >Use Phones GPS</Button>
                            </div>

                            <br/>
                            <br/>

                            <div>
                                <h3>Upload a new Picture</h3>
                                <div><input
                                    type="file"
                                    id="imageFile"
                                    name='imageFile'
                                    onChange={that.imageUpload}/>
                                </div>
                                <div>
                                    <img src={that.state.file}/>
                                </div>
                            </div>

                            <br/>
                            <br/>

                        </div>


                        <div className={"center"}>
                            <Link onClick={that.EditData} to="/soilinfiltrometer/index.html"
                                  style={{textDecoration: 'none'}}>
                                <Button variant="contained" color="primary" className={"buttonContainer"}> Save Changes
                                    and Return to Main Page</Button>
                            </Link>
                        </div>

                        <br/>

                        <div className={"center"}>
                            <Link onClick={that.resettingToEditingMainPage} to="/soilinfiltrometer/index.html"
                                  style={{textDecoration: 'none'}}>
                                <Button variant="contained" color="secondary" className={"buttonContainer"}> Reset and
                                    Return to Main Page </Button>
                            </Link>
                        </div>

                        <br/>
                        <hr></hr>
                        <div className={"center"}>
                            <h1>Non-Editable Test Results</h1>
                        </div>

                        <div align={"center"}>
                            <h3>Mini-disk Configuration</h3>
                            <table>
                                <tr>
                                    <th>Setting</th>
                                    <th>Number</th>
                                </tr>
                                <tr>
                                    <td>Radius:</td>
                                    <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.Radius.toString()}</td>
                                </tr>
                                <tr>
                                    <td>Alpha:</td>
                                    <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.Alpha.toString()}</td>
                                </tr>
                                <tr>
                                    <td>n/ho:</td>
                                    <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.NperH0.toString()}</td>
                                </tr>
                                <tr>
                                    <td>Suction:</td>
                                    <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerData.Suction.toString()}</td>
                                </tr>
                            </table>
                        </div>

                        <br/>
                        <div align={"center"}>
                            <Table Data={that.state.DatabaseData[that.state.indexNum].Data}/>
                        </div>


                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                )
            }
        }
    }
  return (
      <div>
          {rerender()}
      </div>
  )
}

export default Edit;
