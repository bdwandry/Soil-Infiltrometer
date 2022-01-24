import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";
import "../CSS-Files/LearnInfil.css";
import '../CSS-Files/button.css'
import androidApp from "../Files/SoilInfiltrometer.apk"

function Downloads({that}) {
    let OtherContentindex = 0;

    const Name = [
        {id: 0, name: "Welcome to Soil Infiltration App"},
        {id: 1, name: "Learn How To Use The App?"},
        {id: 2, name: "Learn How to Use the Infiltrometer?"},
        {id: 3, name: "Learn BAER Protocol?"},
        {id: 4, name: "Previous Test Data"},
        {id: 5, name: "Downloads"},
        {id: 6, name: "About Us"},
        {id: 7, name: "Project Structure"},
        {id: 8, name: "Import or Export Database"}
    ]

    let OtherContentcurrentWindow = window.location.pathname;
    if (OtherContentcurrentWindow === "/soilinfiltrometer/index.html") {
        OtherContentindex = 0;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/learn") {
        OtherContentindex = 1;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/learn-infiltrometer") {
        OtherContentindex = 2;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/learn-baer") {
        OtherContentindex = 3;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/previous-data") {
        OtherContentindex = 4;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/download") {
        OtherContentindex = 5;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/about") {
        OtherContentindex = 6;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/project-structure") {
        OtherContentindex = 7;
    } else if (OtherContentcurrentWindow === "/soilinfiltrometer/import-export-indexdb-data") {
        OtherContentindex = 8;
    }

    const OtherContentCategories = [{id: " Main Page", location: "/soilinfiltrometer/index.html", command: that.SwitchToMain, number: 0},
        {id: " Learn How To Use The App?", location: '/soilinfiltrometer/learn', command: that.SwitchToLearnHowToUseTheApp, number: 1},
        {id: " Learn How to Use the Infiltrometer?", location: "/soilinfiltrometer/learn-infiltrometer", command: that.SwitchToLearnHowToUseTheInfiltrometer, number: 2},
        {id: " Learn BAER Protocol?", location: "/soilinfiltrometer/learn-baer", command: that.SwitchToLearnBAER, number: 3},
        {id: " Previous Test Data", location: "/soilinfiltrometer/previous-data", command: that.SwitchToPreviousData, number: 4},
        {id: " Downloads", location: "/soilinfiltrometer/download", command: that.SwitchToAboutUs, number: 5},
        {id: " About Us?", location: "/soilinfiltrometer/about", command: that.SwitchToAboutUs, number: 6},
        {id: " Project Structure", location: "/soilinfiltrometer/project-structure", command: that.SwitchToImportExport, number: 7},
        {id: " Import or Export Database", location: "/soilinfiltrometer/import-export-indexdb-data", command: that.SwitchToImportExport, number: 8},
    ]

    const [OtherContentopen, OtherContentsetOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        OtherContentsetOpen(true);
    };
    const handleDrawerClose = () => {
        OtherContentsetOpen(false);
    };

    //-----------------------------------------------------------------------------------------------------------------//
    //If the site is in landscape and is not mobile
    if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === false)) {
        return (
            <div>
                <div>
                    <CssBaseline/>
                    <AppBar position="relative" style={{zIndex: 2}}>
                        <Toolbar variant="dense">
                            <Typography variant="h5" align="center" style={{
                                width: "100%",
                                alignItems: "center"
                            }}> {Name[OtherContentindex].name} </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" anchor="left" open={OtherContentopen} style={{position:'relative', zIndex: 1}}>
                        <List>
                            <ListItem button key="home" onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <CloseIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Close"/>
                            </ListItem>
                            <List>
                                {OtherContentCategories.map((id, command) => (
                                    <ListItem button component={NavLink} to={id.location} onClick={id.command}
                                              activeClassName="Mui-selected" exact>
                                        <ListItemText primary={id.id}/>
                                    </ListItem>
                                ))}
                            </List>
                        </List>
                    </Drawer>
                </div>
                <div style={{ height: (that.state.ScreenHeight), width: "20%", float: "left"}}></div>
                <div style={{ height: (that.state.ScreenHeight), width: "80%", float: "left"}}>
                    <div>
                        <h3>
                            <li>Download Android Application: <a href={androidApp}>Click Here</a></li>
                        </h3>
                        <h3>
                            <li>To download (click the link above) and install, you will need to enable install secondary
                                Apps.
                            </li>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }

    //-----------------------------------------------------------------------------------------------------------------//
    //If the site is in portrait
    if ((that.state.ScreenHeight > that.state.ScreenWidth) || (that.state.MobileCheck === true)) {
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
                            }}> {Name[OtherContentindex].name} </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="persistent" anchor="left" open={OtherContentopen}>
                        <List>
                            <ListItem button key="home" onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <CloseIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Close"/>
                            </ListItem>
                            <List>
                                {OtherContentCategories.map((id, command) => (
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

                <div>
                    <h3>
                        <li>Download Android Application: <a href={androidApp}>Click Here</a></li>
                    </h3>
                    <h3>
                        <li>To download (click the link above) and install, you will need to enable install secondary
                            Apps.
                        </li>
                    </h3>
                </div>

            </div>
        )
    }
}

export default Downloads;
