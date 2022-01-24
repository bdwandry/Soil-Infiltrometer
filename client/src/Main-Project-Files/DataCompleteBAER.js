/**
 * This page is used to render when a user routes to datacomplete for BAER protocol
 */

import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar, Typography} from "@material-ui/core";
import Table from "../Tables-Generated/table";
import {CSVLink} from "react-csv";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";
import LineGraph from 'react-line-graph'
import LineChart from 'react-linechart';
import 'react-linechart/dist/styles.css';
import '../CSS-Files/button.css'
import '../CSS-Files/table.css'

function DataCompleteBAER({that}) {
    if ((that.state.longitude === "") ||(that.state.latitude === "")) {
        if (that.state.CSVArray[0] != null) {
            that.state.CSVArray[0].GPS = "N/A - Not Saved!"
        }
    } else {
        if (that.state.CSVArray[0] != null) {
            that.state.CSVArray[0].GPS = that.state.longitude + "," + that.state.latitude;
        }
    }

    window.addEventListener("beforeunload", function (e) {
        let confirmationMessage = 'It looks like you have been editing something. '
            + 'If you leave before saving, your changes will be lost.';

        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    });
    //-------------------------------------------------------------------------------------------------//
    //Drawer
    let index = 0;

    const Name = [
        {id: 0, name: "Data Gathered: Application Completed (BAER)"},
    ]

    let currentWindow = window.location.pathname;

    const Categories =
        [
            // {id: " Save & Return to Main Page", location: "/index.html", command: that.SaveAndExit, number: 0},
            // {id: " Reset to Main Page", location: "/index.html", command: that.resettingToMainPage, number: 1},
        ]

    const [openModel, setOpenModal] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpenModal(true);
    };
    const handleDrawerClose = () => {
        setOpenModal(false);
    };

    //------------------------------------------------------------------------------------------------//
    const data2 = [
        {
            color: "steelblue",
            points: that.state.InfiltrometerCalculations.Coordinates
        }
    ];
    //-------------------------------------------------------------------------------------------------//
    const renderCSV = () => {
        if (that.state.title === "") {
            return (
                <div align={"center"}>
                    <h3>Please add a title before Exporting a CSV File</h3>
                </div>
            )
        } else {
            return (
                <div align={"center"}>
                    <CSVLink
                        data={that.state.CSVArray}
                        filename={that.state.title.toString() + ".csv"}
                        className="btn btn-primary"
                        target="_blank"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button variant="contained" color="primary" className={"buttonContainer"} style={{ textDecoration: 'none' }}>Export as CSV File</Button>

                    </CSVLink>
                </div>
            )
        }
    }

    //rerender
    const rerender = () => {
        if (that.state.SwitchDataCompleted === 0) {
            return (
                <div>
                    <div align={"center"}>
                        <div>
                            <h1>You may have refreshed the page or routed to this page directly and a given test could
                                not be saved.</h1>
                            <h1>Please Return to the main page and load a test up.</h1>
                        </div>

                        <div className={"center"}>
                            <Link onClick={that.SwitchToMain} to="/soilinfiltrometer/index.html"
                                  style={{textDecoration: 'none'}}>
                                <Button variant="contained" color="secondary" className={"buttonContainer"}> Return to
                                    Main Page </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        } else if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === true)){
            return (
                <div>
                    <div style={{ height: (that.state.ScreenHeight), width: "75%", float: "left"}}>
                            <div align={"center"}>
                                <h3>Mini-disk Configuration</h3>
                                <table>
                                    <tr>
                                        <td>Radius: </td>
                                        <td>{that.state.Radius}</td>
                                    </tr>
                                    <tr>
                                        <td>Alpha: </td>
                                        <td>{that.state.Alpha}</td>
                                    </tr>
                                    <tr>
                                        <td>n/ho: </td>
                                        <td>{that.state.NperH0}</td>
                                    </tr>
                                    <tr>
                                        <td>Suction: </td>
                                        <td>{that.state.Suction}</td>
                                    </tr>
                                    <tr>
                                        <td>AVG:</td>
                                        <td>{that.state.AverageMLPerMin.toFixed(2)} (mL/min)</td>
                                    </tr>
                                    <tr>
                                        <td>Number of Replicates:</td>
                                        <td>{that.state.NumberOfRuns}</td>
                                    </tr>
                                </table>
                            </div>
                            <br/>
                            {renderCSV()}
                        <div align={"center"}>
                            <h1 id='title'>Mini-disk Data</h1>
                            <table id='students'>
                                <tbody>
                                <tr>{that.renderTableHeaderBAER()}</tr>
                                {that.renderTableDataBAER()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{ height: (that.state.ScreenHeight), width: "25%", float: "left"}}>
                        <div align={"center"}>
                            <h1>Save Test Results</h1>
                            <h3>Add a Title to this Test</h3>
                            <TextField id="filled-basic-Time"
                                       label="Title"
                                       variant="filled"
                                       value={that.state.title}
                                       onChange={e => that.setState({ title: e.target.value })}
                            />
                        </div>
                        <br/>
                        <div align={"center"}>
                            <h3>Enter GPS Location</h3>
                            <div>
                                <TextField id="filled-basic-Time"
                                           label="Longitude"
                                           variant="filled"
                                           value={that.state.longitude}
                                           onChange={e => that.setState({ longitude: e.target.value })}
                                           type="number"
                                           pattern="[0-9]*"
                                           inputmode="numeric"
                                />
                            </div>
                            <br/>
                            <div>
                                <TextField id="filled-basic-Time"
                                           label="Latitude"
                                           variant="filled"
                                           value={that.state.latitude}
                                           onChange={e => that.setState({ latitude: e.target.value })}
                                           type="number"
                                           pattern="[0-9]*"
                                           inputmode="numeric"
                                />
                            </div>
                            <br/>
                            <Button variant="contained"
                                    color="primary"
                                    onClick={that.getGPSLocation}
                                    className={"buttonContainer"}
                            >Use Phones GPS</Button>
                            <br/>
                            <br/>
                        </div>

                        <div align={"center"}>
                            <h3>Upload a Picture</h3>
                            <div>
                                <input
                                    type="file"
                                    id="imageFile"
                                    name='imageFile'
                                    onChange={that.imageUpload} />
                            </div>
                            <div>
                                <img src={that.state.file} alt="Picture"/>
                            </div>
                        </div>

                        <br/>

                        <br/>

                        <div className={"center"}>
                            <Link onClick={that.SaveAndExitBEAR} to="/soilinfiltrometer/index.html" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary" className={"buttonContainer"}> Save & Return to Main Page </Button>
                            </Link>
                        </div>

                        <br/>

                        <div className={"center"}>
                            <Link onClick={that.resettingToMainPage} to="/soilinfiltrometer/index.html" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="secondary" className={"buttonContainer"}> Reset to Main Page </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        } else if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === false)){
            return (
                <div>
                    <div style={{ height: (that.state.ScreenHeight), width: "75%", float: "left"}}>
                        <div style={{ height: (that.state.ScreenHeight/2), width: "50%", float: "left"}}>
                            <div align={"center"}>
                                <h3>Mini-disk Configuration</h3>
                                <table>
                                    <tr>
                                        <td>Radius: </td>
                                        <td>{that.state.Radius}</td>
                                    </tr>
                                    <tr>
                                        <td>Alpha: </td>
                                        <td>{that.state.Alpha}</td>
                                    </tr>
                                    <tr>
                                        <td>n/ho: </td>
                                        <td>{that.state.NperH0}</td>
                                    </tr>
                                    <tr>
                                        <td>Suction: </td>
                                        <td>{that.state.Suction}</td>
                                    </tr>
                                    <tr>
                                        <td>AVG:</td>
                                        <td>{that.state.AverageMLPerMin.toFixed(2)} (mL/min)</td>
                                    </tr>
                                    <tr>
                                        <td>Number of Replicates:</td>
                                        <td>{that.state.NumberOfRuns}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div style={{ height: (that.state.ScreenHeight/2), width: "50%", float: "left"}}>
                            <br/>
                            <br/>
                            <br/>
                            {renderCSV()}
                        </div>

                        <div align={"center"}>
                            <h1 id='title'>Mini-disk Data</h1>
                            <table id='students'>
                                <tbody>
                                <tr>{that.renderTableHeaderBAER()}</tr>
                                {that.renderTableDataBAER()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{ height: (that.state.ScreenHeight), width: "25%", float: "left"}}>
                        <div align={"center"}>
                            <h1>Save Test Results</h1>
                            <h3>Add a Title to this Test</h3>
                            <TextField id="filled-basic-Time"
                                       label="Title"
                                       variant="filled"
                                       value={that.state.title}
                                       onChange={e => that.setState({ title: e.target.value })}
                            />
                        </div>
                        <br/>
                        <div align={"center"}>
                            <h3>Enter GPS Location</h3>
                            <div>
                                <TextField id="filled-basic-Time"
                                           label="Longitude"
                                           variant="filled"
                                           value={that.state.longitude}
                                           onChange={e => that.setState({ longitude: e.target.value })}
                                           type="number"
                                           pattern="[0-9]*"
                                           inputmode="numeric"
                                />
                            </div>
                            <br/>
                            <div>
                                <TextField id="filled-basic-Time"
                                           label="Latitude"
                                           variant="filled"
                                           value={that.state.latitude}
                                           onChange={e => that.setState({ latitude: e.target.value })}
                                           type="number"
                                           pattern="[0-9]*"
                                           inputmode="numeric"
                                />
                            </div>
                            <br/>
                            <Button variant="contained"
                                    color="primary"
                                    onClick={that.getGPSLocation}
                                    className={"buttonContainer"}
                            >Use Phones GPS</Button>
                            <br/>
                            <br/>
                        </div>

                        <div align={"center"}>
                            <h3>Upload a Picture</h3>
                            <div>
                                <input
                                    type="file"
                                    id="imageFile"
                                    name='imageFile'
                                    onChange={that.imageUpload} />
                            </div>
                            <div>
                                <img src={that.state.file} alt="Picture"/>
                            </div>
                        </div>

                        <br/>

                        <br/>

                        <div className={"center"}>
                            <Link onClick={that.SaveAndExitBEAR} to="/soilinfiltrometer/index.html" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary" className={"buttonContainer"}> Save & Return to Main Page </Button>
                            </Link>
                        </div>

                        <br/>

                        <div className={"center"}>
                            <Link onClick={that.resettingToMainPage} to="/soilinfiltrometer/index.html" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="secondary" className={"buttonContainer"}> Reset to Main Page </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        } else if (that.state.ScreenHeight > that.state.ScreenWidth) {
            return(
                <div>
                    <div align={"center"}>
                        <h1>Save Test Results</h1>
                        <h3>Add a Title to this Test</h3>
                        <TextField id="filled-basic-Time"
                                   label="Title"
                                   variant="filled"
                                   value={that.state.title}
                                   onChange={e => that.setState({ title: e.target.value })}
                        />
                    </div>
                    <br/>
                    <div align={"center"}>
                        <h3>Enter GPS Location</h3>
                        <div>
                            <TextField id="filled-basic-Time"
                                       label="Longitude"
                                       variant="filled"
                                       value={that.state.longitude}
                                       onChange={e => that.setState({ longitude: e.target.value })}
                                       type="number"
                                       pattern="[0-9]*"
                                       inputmode="numeric"
                            />
                        </div>
                        <br/>
                        <div>
                            <TextField id="filled-basic-Time"
                                       label="Latitude"
                                       variant="filled"
                                       value={that.state.latitude}
                                       onChange={e => that.setState({ latitude: e.target.value })}
                                       type="number"
                                       pattern="[0-9]*"
                                       inputmode="numeric"
                            />
                        </div>
                        <br/>
                        <Button variant="contained"
                                color="primary"
                                onClick={that.getGPSLocation}
                                className={"buttonContainer"}
                        >Use Phones GPS</Button>
                        <br/>
                        <br/>
                    </div>

                    <div align={"center"}>
                        <h3>Upload a Picture</h3>
                        <div>
                            <input
                                type="file"
                                id="imageFile"
                                name='imageFile'
                                onChange={that.imageUpload} />
                        </div>
                        <div>
                            <img src={that.state.file} alt="Picture"/>
                        </div>
                    </div>

                    <br/>

                    <br/>

                    <div className={"center"}>
                        <Link onClick={that.SaveAndExitBEAR} to="/soilinfiltrometer/index.html" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" className={"buttonContainer"}> Save & Return to Main Page </Button>
                        </Link>
                    </div>

                    <br/>

                    <div className={"center"}>
                        <Link onClick={that.resettingToMainPage} to="/soilinfiltrometer/index.html" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary" className={"buttonContainer"}> Reset to Main Page </Button>
                        </Link>
                    </div>
                    <br/>
                    <hr></hr>
                    <div className={"center"}>
                        <h1>Test Results</h1>
                    </div>

                    <div align={"center"}>
                        <h3>Mini-disk Configuration</h3>
                        <table>
                            <tr>
                                <td>Radius: </td>
                                <td>{that.state.Radius}</td>
                            </tr>
                            <tr>
                                <td>Alpha: </td>
                                <td>{that.state.Alpha}</td>
                            </tr>
                            <tr>
                                <td>n/ho: </td>
                                <td>{that.state.NperH0}</td>
                            </tr>
                            <tr>
                                <td>Suction: </td>
                                <td>{that.state.Suction}</td>
                            </tr>
                            <tr>
                                <td>AVG:</td>
                                <td>{that.state.AverageMLPerMin.toFixed(2)} (mL/min)</td>
                            </tr>
                            <tr>
                                <td>Number of Replicates:</td>
                                <td>{that.state.NumberOfRuns}</td>
                            </tr>
                        </table>
                    </div>

                    <br/>
                    <br/>
                    {renderCSV()}
                    <br/>
                    <br/>

                    <div align={"center"}>
                        <h1 id='title'>Mini-disk Data</h1>
                        <table id='students'>
                            <tbody>
                            <tr>{that.renderTableHeaderBAER()}</tr>
                            {that.renderTableDataBAER()}
                            </tbody>
                        </table>
                    </div>

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            )
        }
    }

    //-----------------------------------------------------------------------------------------------------------------//
    //If the site is in landscape and is not mobile
    if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === true)) {
        return (
            <div>
                <div>
                    <div>
                        <CssBaseline/>
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                {/*<IconButton color="inherit" onClick={handleDrawerOpen} edge="start">*/}
                                {/*    <MenuIcon />*/}
                                {/*</IconButton>*/}
                                <Typography variant="h5" align="center"
                                            style={{width: "100%", alignItems: "center"}}> {Name[index].name} </Typography>
                            </Toolbar>
                        </AppBar>
                        <main style={{marginTop: 10}}>
                        </main>
                    </div>
                    <div>
                        {rerender()}
                    </div>
                </div>
            </div>
        )
    }

    //-----------------------------------------------------------------------------------------------------------------//
    //If the site is in landscape and is not mobile
    if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === false)) {
        return (
            <div>
                <div>
                    <div>
                        <CssBaseline/>
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                {/*<IconButton color="inherit" onClick={handleDrawerOpen} edge="start">*/}
                                {/*    <MenuIcon />*/}
                                {/*</IconButton>*/}
                                <Typography variant="h5" align="center"
                                            style={{width: "100%", alignItems: "center"}}> {Name[index].name} </Typography>
                            </Toolbar>
                        </AppBar>
                        <main style={{marginTop: 10}}>
                        </main>
                    </div>
                    <div>
                        {rerender()}
                    </div>
                </div>
            </div>
        )
    }

    //-----------------------------------------------------------------------------------------------------------------//
    //If the site is in portrait
    if (that.state.ScreenHeight > that.state.ScreenWidth) {
        return (
            <div>
                <div>
                    <CssBaseline/>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            {/*<IconButton color="inherit" onClick={handleDrawerOpen} edge="start">*/}
                            {/*    <MenuIcon />*/}
                            {/*</IconButton>*/}
                            <Typography variant="h5" align="center"
                                        style={{width: "100%", alignItems: "center"}}> {Name[index].name} </Typography>
                        </Toolbar>
                    </AppBar>
                    <main style={{marginTop: 10}}>
                    </main>
                </div>
                <div>
                    {rerender()}
                </div>
            </div>
        )
    }
}

export default DataCompleteBAER;
