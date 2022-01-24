/**
 * This is designed to be used when a person is collecting data when their using Volume Protocol
 */

import React, {useEffect, useRef, useState} from 'react';
import {Link, NavLink, Redirect, Route, Switch} from "react-router-dom";
import {
    AppBar,
    Button,
    TextField,
    Toolbar,
    Typography,
    makeStyles,
    Modal,
    FormControl,
    FormLabel, RadioGroup, FormControlLabel, Radio
} from "@material-ui/core";
import Timer from "react-compound-timer";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";
import addNotification from "react-push-notification";
import '../CSS-Files/button.css'

const tiRef = React.createRef();
function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function DataGatheringExperimental({that}) {

    window.addEventListener("beforeunload", function (e) {
        let confirmationMessage = 'It looks like you have been editing something. '
            + 'If you leave before saving, test will be los5t.';

        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    });
    //-------------------------------------------------------------------------------------------------//
    //Audio and Notification Settings
    //Notification
    const [NotificationValue, NotificationSetValue] = React.useState('Enabled');
    const NotificationHandleChange = (event) => {
        NotificationSetValue(event.target.value);
        if (event.target.value === "Enabled") {
            that.notificationFlag = true;
            //console.log("Notification: " + that.notificationFlag);
        }

        if (event.target.value === "Disabled") {
            that.notificationFlag = false;
            //console.log("Notification: " + that.notificationFlag);
        }
    };

    //Audio
    const [value, setValue] = React.useState('Enabled');
    const handleChange = (event) => {
        setValue(event.target.value);

        if (event.target.value === "Enabled") {
            that.audioFlag = true;
            //console.log("Audio: " + that.audioFlag);
        }

        if (event.target.value === "Disabled") {
            that.audioFlag = false;
            //console.log("Audio: " + that.audioFlag);
        }
    };

    //-------------------------------------------------------------------------------------------------//
    //Drawer
    let index = 0;

    const Name = [
        {id: 0, name: "Data Collecting: Application is Running (Volume)"},
    ]

    let currentWindow = window.location.pathname;


    const Categories =
        [
            // {id: " Data Gathering Completed", location: "/data-complete", command: that.SwitchToDataCompleted, number: 0},
            {id: " Reset to Main Page", location: "/soilinfiltrometer/index.html", command: that.resettingToMainPage, number: 1},
        ]


    const [openModel, setOpenModal] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpenModal(true);
    };
    const handleDrawerClose = () => {
        setOpenModal(false);
    };


    //-------------------------------------------------------------------------------------------------//
    //Enter Data Modal
    const DataCollectingclasses = useStyles();
    const [DataCollectingmodalStyle] = React.useState(getModalStyle);
    const [DataCollectingModalopen, DataCollectingsetOpen] = React.useState(false);

    const DataCollectingModalhandleOpen = () => {
        if (that.notificationFlag === true) {
            notification()
        }

        if (that.audioFlag === true) {
            that.playAudio()
        }
        DataCollectingsetOpen(true);
    };

    const DataCollectingModalhandleClose = () => {
        if (that.state.volume !== "") {
            that.pauseAudio()
            that.CalculatedAddToDataArray()
            DataCollectingsetOpen(false);
        }
    };
    const body = (
        <div align={"center"} style={DataCollectingmodalStyle} className={DataCollectingclasses.paper}>
            <h3>Quickly: Enter Volumetric Data</h3>
            <div align='center'>
                <TextField id="filled-basic-Time"
                           label="Enter Volumetric Data"
                           variant="filled"
                           onChange={e => that.setState({ volume: e.target.value })}
                           type="number"
                           pattern="[0-9]*"
                           inputmode="numeric"
                />
            </div>
            <br/>
            <div align={"center"}>
                <Button variant="contained"
                        color="primary"
                        onClick={DataCollectingModalhandleClose}
                > Submit Volume</Button>
            </div>
        </div>
    );

    //-------------------------------------------------------------------------------------------------//
    //Settings Modal
    const Settingsclasses = useStyles();
    const [SettingsmodalStyle] = React.useState(getModalStyle);
    const [SettingsModalopen, SettingssetOpen] = React.useState(false);

    const SettingsModalhandleOpen = () => {
        SettingssetOpen(true);
    };

    const SettingsModalhandleClose = () => {
        handleDrawerClose()
        SettingssetOpen(false);
    };
    const Settingsbody = (
        <div align={"center"} style={SettingsmodalStyle} className={Settingsclasses.paper}>
            <div>
                <div align={"center"}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" >Notification Settings</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={NotificationValue} onChange={NotificationHandleChange}>
                            <FormControlLabel value="Enabled" control={<Radio />} label="Enabled" />
                            <FormControlLabel value="Disabled" control={<Radio />} label="Disabled" />
                        </RadioGroup>
                    </FormControl>
                </div>

                <br/>
                <div align={"center"}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Audio Settings</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="Enabled" control={<Radio />} label="Enabled" />
                            <FormControlLabel value="Disabled" control={<Radio />} label="Disabled" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <br/>
                <div align={"center"}>
                    <Button variant="contained"
                            color="primary"
                            onClick={SettingsModalhandleClose}
                    > Close </Button>
                </div>
            </div>
        </div>
    );

    //------------------------------------------------------------------------------------------------//
    //Notification
    const notification = () => {
        addNotification({
            title: 'Warning',
            subtitle: 'Timer',
            message: 'YOUR TIMER IS GOING DONE. COLLECT DATA',
            theme: 'darkblue',
            native: true // when using native, your OS will handle theming.
        });
    };

    //------------------------------------------------------------------------------------------------//
    //Rendering Data Gathering
    const ButtonRendering = () => {
        if ((that.state.volume - that.state.VolumeInterval) < 0) {
            return (
                <div className={"center"}>
                    <br/>
                    <br/>
                    {/*{id: " Data Gathering Completed", location: "/data-complete", command: that.SwitchToDataCompleted, number: 0},*/}
                    <Link onClick={that.SwitchToDataCompleted} to="/soilinfiltrometer/data-complete" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="secondary" className={"buttonContainer"}> Data Gathering Completed</Button>
                    </Link>
                    <br/>
                    <br/>
                    <br/>
                </div>
            )
        } else {
            return (
                <div>
                    <div align={"center"}>
                        <table>
                            <tr>
                                <td><h3>Total Time: </h3></td>
                                <td><h3><Timer formatValue={e => that.state.TotalTime = e}
                                               lastUnit={"s"}
                                               initialTime={that.state.TotalTime * 1000}
                                               direction="forward"
                                >
                                    <Timer.Seconds /> seconds
                                </Timer></h3></td>
                            </tr>
                        </table>
                    </div>

                    <br/>

                    <div align={"center"}>
                        <h3>Pay attention for the next Volume Interval: {that.state.volume - that.state.VolumeInterval} (mL)</h3>
                    </div>
                    <br/>
                    <br/>
                    <div align={"center"}>
                        <Button variant="contained"
                                color="primary"
                                onClick={that.AddToDataArrayExperimental}
                                className={"buttonContainer"}
                        > Submit Volume</Button>
                    </div>
                    <br/>
                    <br/>
                    {/*{id: " Data Gathering Completed", location: "/data-complete", command: that.SwitchToDataCompleted, number: 0},*/}
                    <div align={"center"}>
                        <Link onClick={that.SwitchToDataCompleted} to="/soilinfiltrometer/data-complete" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary" className={"buttonContainer"}> Data Gathering Completed</Button>
                        </Link>
                    </div>
                    <br/>
                    <br/>
                </div>
            )
        }
    }

    const reredendering = () => {
        if (that.state.SwitchDataGathering === 0) {
            return (
                <div align={"center"}>
                    <div>
                        <h1>You may have refreshed the page or routed to this page directly and a given test could not be given.</h1>
                        <h1>Please Return to the main page and load a test up.</h1>
                    </div>

                    <div className={"center"}>
                        <Link onClick={that.SwitchToMain} to="/soilinfiltrometer/index.html" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary" className={"buttonContainer"}> Return to Main Page </Button>
                        </Link>
                    </div>
                </div>
            )
        } else if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === true)) {
            return (
                <div align={"center"}>
                    <div style={{ height: (that.state.ScreenHeight), width: "36%", float: "left"}}>
                        <div>
                            {ButtonRendering()}
                        </div>
                    </div>
                    <div style={{ height: (that.state.ScreenHeight), width: "64%", float: "left"}}>
                        <div align={"center"}>
                            <h1 id='title'>Mini-disk Data</h1>
                            <table id='students'>
                                <tbody>
                                <tr>{that.renderTableHeader()}</tr>
                                {that.renderTableData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        } else if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === false)) {
            return (
                <div>
                    <div style={{ height: (that.state.ScreenHeight), width: "11%", float: "left"}}></div>
                    <div style={{ height: (that.state.ScreenHeight), width: "25%", float: "left"}}>
                        <div>
                            {ButtonRendering()}
                        </div>
                    </div>
                    <div style={{ height: (that.state.ScreenHeight), width: "64%", float: "left"}}>
                        <div align={"center"}>
                            <h1 id='title'>Mini-disk Data</h1>
                            <table id='students'>
                                <tbody>
                                <tr>{that.renderTableHeader()}</tr>
                                {that.renderTableData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        } else if (that.state.ScreenHeight > that.state.ScreenWidth){
            return (
                <div>
                    <div>
                        {ButtonRendering()}
                    </div>
                    <div align={"center"}>
                        <h1 id='title'>Mini-disk Data</h1>
                        <table id='students'>
                            <tbody>
                            <tr>{that.renderTableHeader()}</tr>
                            {that.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </div>
            )
        }
    }

    //-----------------------------------------------------------------------------------------------------------------//
    //If the site is in landscape and is mobile
    if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === true) && (that.state.SwitchDataGathering !== 0)) {
        return (
            <div>
                <div>
                    <CssBaseline/>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <IconButton color="inherit" onClick={handleDrawerOpen} edge="start">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h5" align="center"
                                        style={{width: "100%", alignItems: "center"}}> {Name[index].name} </Typography>
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
                                <ListItem button onClick={SettingsModalhandleOpen} activeClassName="Mui-selected" exact>
                                    <ListItemText primary={"Settings"}/>
                                </ListItem>
                            </List>
                        </List>
                    </Drawer>
                    <main style={{marginTop: 10}}>
                    </main>
                </div>
                <div align='center'>
                </div>
                <div>
                    {reredendering()}
                </div>
            </div>
        )
    }

    //-----------------------------------------------------------------------------------------------------------------//
    //If the site is in landscape and is not mobile
    if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === false) && (that.state.SwitchDataGathering !== 0)) {
        return (
            <div>
                <div>
                    <CssBaseline/>
                    <AppBar position="relative" style={{zIndex: 2}}>
                        <Toolbar variant="dense">
                            {/*<IconButton color="inherit" onClick={handleDrawerOpen} edge="start">*/}
                            {/*    <MenuIcon/>*/}
                            {/*</IconButton>*/}
                            <Typography variant="h5" align="center"
                                        style={{width: "100%", alignItems: "center"}}> {Name[index].name} </Typography>
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
                                <ListItem button onClick={SettingsModalhandleOpen} activeClassName="Mui-selected" exact>
                                    <ListItemText primary={"Settings"}/>
                                </ListItem>
                            </List>
                        </List>
                    </Drawer>
                    {/*<main style={{marginTop: 10}}>*/}
                    {/*</main>*/}
                </div>
                <div align='center'>
                </div>
                <div>
                    {reredendering()}
                </div>
            </div>
        )
    }

    //-----------------------------------------------------------------------------------------------------------------//
    //If the site is in portrait
    if ((that.state.ScreenHeight > that.state.ScreenWidth) && (that.state.SwitchDataGathering !== 0)) {
        return (
            <div>
                <div>
                    <CssBaseline/>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <IconButton color="inherit" onClick={handleDrawerOpen} edge="start">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h5" align="center"
                                        style={{width: "100%", alignItems: "center"}}> {Name[index].name} </Typography>
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
                                <ListItem button onClick={SettingsModalhandleOpen} activeClassName="Mui-selected" exact>
                                    <ListItemText primary={"Settings"}/>
                                </ListItem>
                            </List>
                        </List>
                    </Drawer>
                    <main style={{marginTop: 10}}>
                    </main>
                </div>
                <div align='center'>
                </div>
                <div>
                    {reredendering()}
                </div>
            </div>
        )
    }

    if (that.state.SwitchDataGathering === 0) {
        return (
            <div>
                <div>
                    <CssBaseline/>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <IconButton color="inherit" onClick={handleDrawerOpen} edge="start">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h5" align="center"
                                        style={{width: "100%", alignItems: "center"}}> {Name[index].name} </Typography>
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
                                <ListItem button onClick={SettingsModalhandleOpen} activeClassName="Mui-selected" exact>
                                    <ListItemText primary={"Settings"}/>
                                </ListItem>
                            </List>
                        </List>
                    </Drawer>
                    <main style={{marginTop: 10}}>
                    </main>
                </div>
                <div align='center'>
                </div>
                <div>
                    {reredendering()}
                </div>
            </div>
        )
    }
}

export default DataGatheringExperimental;
