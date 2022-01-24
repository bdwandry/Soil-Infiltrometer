/**
 * This page will be returned when a user wants to review a specific test case for the time/volume protocols
 */

import React from 'react';
import {Link, NavLink, Route} from "react-router-dom";
import {AppBar, Button,  Toolbar, Typography} from "@material-ui/core";
import { CSVLink } from "react-csv";
import Table from "../../Tables-Generated/table";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";
import LineChart from "react-linechart";
import '../../CSS-Files/button.css'

function ReviewData({that}) {
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
        {id: 0, name: "Review Old Data: "},
    ]

    let currentWindow = window.location.pathname;

    const Categories =
        [
            {id: " Return To Previous Data", location: "/soilinfiltrometer/previous-data", command: that.SwitchToPreviousData, number: 0},
            {id: " Return to Main Page", location: "/soilinfiltrometer/index.html", command: that.SwitchToMain, number: 1},
        ]

    const [openModel, setOpenModal] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpenModal(true);
    };
    const handleDrawerClose = () => {
        setOpenModal(false);
    };

    //------------------------------------------------------------------------------------------------//
    let Data;
    if (that.state.SwitchReviewData === 1) {
         Data = [
            {
                color: "steelblue",
                points: that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.Coordinates
            }
        ];
    }

    //------------------------------------------------------------------------------------------------//
    //rerender
    const rerender = () => {
        //-----------------------------------------------------------------------------------------------------------------//
        //If the site is in landscape and is mobile
        if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === true)) {
            if (that.state.SwitchReviewData === 0) {
                return (
                    <div>
                        <div align={"center"}>
                            <AppBar position="static">
                                <Toolbar variant="dense">
                                    <Typography variant="h5" align="center"
                                                style={{width: "100%", alignItems: "center"}}> Review old Data
                                        (Standard) </Typography>
                                </Toolbar>
                            </AppBar>
                            <div>
                                <h1>You may have refreshed the page or routed to this page directly and an old test
                                    could could not be loaded/reviewed.</h1>
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
                                    <IconButton color="inherit" onClick={handleDrawerOpen} edge="start">
                                        <MenuIcon/>
                                    </IconButton>
                                    <Typography variant="h5" align="center" style={{
                                        width: "100%",
                                        alignItems: "center"
                                    }}> {Name[index].name} {that.state.DatabaseData[that.state.indexNum].Title} </Typography>
                                </Toolbar>
                            </AppBar>
                            <Drawer variant="persistent" anchor="left" open={openModel}>
                                <List>
                                    <ListItem button key="home" onClick={handleDrawerClose}>
                                        <ListItemIcon>
                                            <CloseIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Close"/>
                                    </ListItem>
                                    <List>
                                        {Categories.map((id, command) => (
                                            <ListItem button component={NavLink} to={id.location} onClick={id.command}
                                                      activeClassName="Mui-selected" exact>
                                                <ListItemText primary={id.id}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </List>
                            </Drawer>
                            <main style={{marginTop: 10}}>
                            </main>
                        </div>
                        <div style={{ height: (that.state.ScreenHeight), width: "75%", float: "left"}}>
                            <div style={{ height: (that.state.ScreenHeight)/2, width: "50%", float: "left"}}>
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
                            </div>
                            <div style={{ height: (that.state.ScreenHeight)/2, width: "50%", float: "left"}}>
                                <div align={"center"}>
                                    <div>
                                        <h3>Calculated Constants</h3>
                                    </div>
                                    <table>
                                        <tr>
                                            <td>A:</td>
                                            <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.A.toFixed(3)}</td>
                                        </tr>
                                        <tr>
                                            <td>C1:</td>
                                            <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.C1.toFixed(3)}</td>
                                        </tr>
                                        <tr>
                                            <td>K:</td>
                                            <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.K.toFixed(3)}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div style={{ height: (that.state.ScreenHeight)/2, width: "50%", float: "left"}}>
                                <div align={"center"}>
                                    <div className="App">
                                        <h2>Regression plot</h2>
                                        <LineChart
                                            width={300}
                                            height={300}
                                            data={Data}
                                            xLabel={"Square Root of Time(s)"}
                                            yLabel={"Cumulative Infiltration(cm)"}
                                            hidePoints={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{ height: (that.state.ScreenHeight)/2, width: "50%", float: "left"}}>
                                    <Table Data={that.state.DatabaseData[that.state.indexNum].Data}/>
                                </div>
                            </div>
                        </div>

                        <div align={"center"} style={{ height: (that.state.ScreenHeight), width: "25%", float: "left"}}>
                            <h2>Title: {that.state.DatabaseData[that.state.indexNum].Title}</h2>
                            <br/>
                            <br/>
                            <h2>GPS Coordinate: {that.state.DatabaseData[that.state.indexNum].GPSLocation}</h2>
                            <br/>
                            <br/>
                            <div align={"center"}>
                                <CSVLink
                                    data={that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.CSVArray}
                                    filename={that.state.DatabaseData[that.state.indexNum].Title.toString() + ".csv"}
                                    className="btn btn-primary"
                                    target="_blank"
                                    style={{textDecoration: 'none'}}
                                >
                                    <Button variant="contained" color="primary" style={{textDecoration: 'none'}}>Export
                                        as CSV File</Button>

                                </CSVLink>
                            </div>
                            <br/>
                            <br/>

                            <h2>Picture:</h2>
                            <img className={"mediumImg"} src={that.state.DatabaseData[that.state.indexNum].Picture}
                                 alt="Picture"/>
                            <br/>
                        </div>
                    </div>
                )
            }
        }

        //-----------------------------------------------------------------------------------------------------------------//
        //If the site is in landscape and is not mobile
        if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === false)) {
            if (that.state.SwitchReviewData === 0) {
                return (
                    <div>
                        <div align={"center"}>
                            <AppBar position="static">
                                <Toolbar variant="dense">
                                    <Typography variant="h5" align="center"
                                                style={{width: "100%", alignItems: "center"}}> Review old Data
                                        (Standard) </Typography>
                                </Toolbar>
                            </AppBar>
                            <div>
                                <h1>You may have refreshed the page or routed to this page directly and an old test
                                    could could not be loaded/reviewed.</h1>
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
                            <AppBar position="relative" style={{zIndex: 2}}>
                                <Toolbar variant="dense">
                                    {/*<IconButton color="inherit" onClick={handleDrawerOpen} edge="start">*/}
                                    {/*    <MenuIcon/>*/}
                                    {/*</IconButton>*/}
                                    <Typography variant="h5" align="center" style={{
                                        width: "100%",
                                        alignItems: "center"
                                    }}> {Name[index].name} {that.state.DatabaseData[that.state.indexNum].Title} </Typography>
                                </Toolbar>
                            </AppBar>
                            <Drawer variant="permanent" anchor="left" open={openModel} style={{position:'relative', zIndex: 1}}>
                                <List>
                                    <ListItem button key="home" onClick={handleDrawerClose}>
                                        <ListItemIcon>
                                            <CloseIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Close"/>
                                    </ListItem>
                                    <List>
                                        {Categories.map((id, command) => (
                                            <ListItem button component={NavLink} to={id.location} onClick={id.command}
                                                      activeClassName="Mui-selected" exact>
                                                <ListItemText primary={id.id}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </List>
                            </Drawer>
                        </div>
                        <div style={{ height: (that.state.ScreenHeight), width: "13%", float: "left"}}></div>
                        <div style={{ height: (that.state.ScreenHeight), width: "65%", float: "left"}}>
                            <div style={{ height: (that.state.ScreenHeight)/2, width: "33.333333333333333333%", float: "left"}}>
                                <div align={"center"}>
                                    <div className="App">
                                        <h2>Regression plot</h2>
                                        <LineChart
                                            width={300}
                                            height={300}
                                            data={Data}
                                            xLabel={"Square Root of Time(s)"}
                                            yLabel={"Cumulative Infiltration(cm)"}
                                            hidePoints={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={{ height: (that.state.ScreenHeight)/2, width: "33.333333333333333333%", float: "left"}}>
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
                            </div>
                            <div style={{ height: (that.state.ScreenHeight)/2, width: "33.333333333333333333%", float: "left"}}>
                                <div align={"center"}>
                                    <div>
                                        <h3>Calculated Constants</h3>
                                    </div>
                                    <table>
                                        <tr>
                                            <td>A:</td>
                                            <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.A.toFixed(3)}</td>
                                        </tr>
                                        <tr>
                                            <td>C1:</td>
                                            <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.C1.toFixed(3)}</td>
                                        </tr>
                                        <tr>
                                            <td>K:</td>
                                            <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.K.toFixed(3)}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div style={{ height: (that.state.ScreenHeight)/2, width: "100%", float: "left"}}>
                                <div align={"center"}>
                                    <Table Data={that.state.DatabaseData[that.state.indexNum].Data}/>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: (that.state.ScreenHeight), width: "22%", float: "left"}}>
                            <div align={"center"}>
                                <h2>Title: {that.state.DatabaseData[that.state.indexNum].Title}</h2>
                                <br/>
                                <br/>
                                <h2>GPS Coordinate: {that.state.DatabaseData[that.state.indexNum].GPSLocation}</h2>
                                <br/>
                                <br/>
                                <div align={"center"}>
                                    <CSVLink
                                        data={that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.CSVArray}
                                        filename={that.state.DatabaseData[that.state.indexNum].Title.toString() + ".csv"}
                                        className="btn btn-primary"
                                        target="_blank"
                                        style={{textDecoration: 'none'}}
                                    >
                                        <Button variant="contained" color="primary" style={{textDecoration: 'none'}}>Export
                                            as CSV File</Button>

                                    </CSVLink>
                                </div>
                                <br/>
                                <br/>

                                <h2>Picture:</h2>
                                <img className={"reviewImg"} src={that.state.DatabaseData[that.state.indexNum].Picture}
                                     alt="Picture"/>
                                <br/>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        //-----------------------------------------------------------------------------------------------------------------//
        if (that.state.ScreenHeight > that.state.ScreenWidth) {
            if (that.state.SwitchReviewData === 0) {
                return (
                    <div>
                        <div align={"center"}>
                            <AppBar position="static">
                                <Toolbar variant="dense">
                                    <Typography variant="h5" align="center"
                                                style={{width: "100%", alignItems: "center"}}> Review old Data
                                        (Standard) </Typography>
                                </Toolbar>
                            </AppBar>
                            <div>
                                <h1>You may have refreshed the page or routed to this page directly and an old test
                                    could could not be loaded/reviewed.</h1>
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
                                    <IconButton color="inherit" onClick={handleDrawerOpen} edge="start">
                                        <MenuIcon/>
                                    </IconButton>
                                    <Typography variant="h5" align="center" style={{
                                        width: "100%",
                                        alignItems: "center"
                                    }}> {Name[index].name} {that.state.DatabaseData[that.state.indexNum].Title} </Typography>
                                </Toolbar>
                            </AppBar>
                            <Drawer variant="persistent" anchor="left" open={openModel}>
                                <List>
                                    <ListItem button key="home" onClick={handleDrawerClose}>
                                        <ListItemIcon>
                                            <CloseIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Close"/>
                                    </ListItem>
                                    <List>
                                        {Categories.map((id, command) => (
                                            <ListItem button component={NavLink} to={id.location} onClick={id.command}
                                                      activeClassName="Mui-selected" exact>
                                                <ListItemText primary={id.id}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </List>
                            </Drawer>
                            <main style={{marginTop: 10}}>
                            </main>
                        </div>
                        <div align={"center"}>
                            <h2>Title: {that.state.DatabaseData[that.state.indexNum].Title}</h2>
                            <br/>
                            <h2>GPS Coordinate: {that.state.DatabaseData[that.state.indexNum].GPSLocation}</h2>
                            <br/>
                            <div align={"center"}>
                                <div className="App">
                                    <h2>Regression plot</h2>
                                    <LineChart
                                        width={300}
                                        height={300}
                                        data={Data}
                                        xLabel={"Square Root of Time(s)"}
                                        yLabel={"Cumulative Infiltration(cm)"}
                                        hidePoints={true}
                                    />
                                </div>
                            </div>
                            <br/>

                            <h2>Picture</h2>
                            <img className={"reviewImg"} src={that.state.DatabaseData[that.state.indexNum].Picture}
                                 alt="Picture"/>
                            <br/>
                            <br/>
                            <div align={"center"}>
                                <CSVLink
                                    data={that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.CSVArray}
                                    filename={that.state.DatabaseData[that.state.indexNum].Title.toString() + ".csv"}
                                    className="btn btn-primary"
                                    target="_blank"
                                    style={{textDecoration: 'none'}}
                                >
                                    <Button variant="contained" color="primary" style={{textDecoration: 'none'}}>Export
                                        as CSV File</Button>

                                </CSVLink>
                            </div>
                        </div>

                        <br/>
                        <hr></hr>
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

                        <div align={"center"}>
                            <div>
                                <h3>Calculated Constants</h3>
                            </div>
                            <table>
                                <tr>
                                    <td>A:</td>
                                    <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.A.toFixed(3)}</td>
                                </tr>
                                <tr>
                                    <td>C1:</td>
                                    <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.C1.toFixed(3)}</td>
                                </tr>
                                <tr>
                                    <td>K:</td>
                                    <td>{that.state.DatabaseData[that.state.indexNum].InfiltrometerCalculations.K.toFixed(3)}</td>
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
                    </div>
                )
            }
        }
    }

    return (
      <div>
          <div>
              {rerender()}
          </div>
      </div>
  )
}

export default ReviewData;
