/**
 * This whole page is designed to render the about us section of the website
 */

// import React from 'react';
import React, { useState } from "react";
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
import "../CSS-Files/About.css";
import '../CSS-Files/button.css';
import ReactJson from "react-json-view";


function ImportExportIndexDBData({that}) {
    //-----------------------------------------------------------------------------------------------------------------//
    //Drawer Information
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
    //Exporting Options
    const renderTitle = () => {
        if ((that.state.DatabaseData.length !== 0) && (that.state.DatabaseDataBAER.length !== 0)) {
            return (
                <div>
                    <h1>Export Database for Both Time/Volume and BAER</h1>
                </div>
            )
        } else if ((that.state.DatabaseData.length !== 0)) {
            return (
                <div>
                    <h1>Export Database for Time/Volume</h1>
                </div>
            )
        } else if ((that.state.DatabaseDataBAER.length !== 0)) {
            return (
                <div>
                    <h1>Export Database for BAER</h1>
                </div>
            )
        }
    }
    const renderExportTV = () => {
        if (that.state.DatabaseData.length !== 0) {
            return (
                <div>
                    <Button onClick={that.exportDBTimeVolume} variant="contained" color="primary" className={"buttonContainer"}> Export Time and Volume Database </Button>
                </div>
            )
        }
    }

    const renderExportBAER = () => {
        if (that.state.DatabaseDataBAER.length !== 0) {
            return (
                <div>
                    <Button onClick={that.exportDBBAER} variant="contained" color="primary" className={"buttonContainer"}> Export BAER Database </Button>
                </div>
            )
        }
    }

    //Import Options
    //TimeVolume Importing
    const [files, setFiles] = useState("");

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            // console.log("e.target.result", e.target.result);
            setFiles(e.target.result);
            that.setState({
                ImportFileTimeVolume: that.state.ImportFileTimeVolume = eval(e.target.result)
            })
        };

        // that.state.SelectedFileTimeVolume = files;
    };

    //BAER Importing
    const [filesBAER, setFilesBAER] = useState("");

    const handleChangeBAER = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            // console.log("e.target.result", e.target.result);
            setFilesBAER(e.target.result);
            that.setState({
                ImportFileBAER: that.state.ImportFileBAER = eval(e.target.result)
            })
        };

        // that.state.SelectedFileTimeVolume = files;
    };


    const renderImportButtons = () => {
        return (
            <div>
                <h1>Import Database for Both Time/Volume and BAER</h1>
                <h3> Import Time/Volume Database </h3>
                <input accept={".json"} type="file" onChange={handleChange} />
                <br />

                <h3> Import BAER Database </h3>
                <input accept={".json"} type="file" onChange={handleChangeBAER} />
                <br/>
                <br/>

                <Link onClick={that.importBothTimeVolumeAndBAER} to="/soilinfiltrometer/index.html" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" className={"buttonContainer"}> Save </Button>
                </Link>
            </div>
        )
    }

    const RenderScreen = () => {
        if ((that.state.DatabaseDataBAER.length !== 0) || (that.state.DatabaseData.length !== 0)) {
            return(
                <div>
                    <div style={{ height: (that.state.ScreenHeight), width: "50%", float: "left"}}>
                        {renderTitle()}
                        {renderExportTV()}<br/>
                        {renderExportBAER()}
                    </div>
                    <div align={"center"} style={{ height: (that.state.ScreenHeight), width: "50%", float: "left"}}>
                        {renderImportButtons()}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    {renderImportButtons()}
                </div>
            )
        }
    }
    //-----------------------------------------------------------------------------------------------------------------//
    //If the site is in landscape and is mobile
    if ((that.state.ScreenHeight < that.state.ScreenWidth) && (that.state.MobileCheck === true)) {
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
                <div align={"center"} style={{ height: (that.state.ScreenHeight), width: "100%", float: "left"}}>
                    {RenderScreen()}
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
                <div style={{ height: (that.state.ScreenHeight), width: "18%", float: "left"}}></div>
                <div align={"center"} style={{ height: (that.state.ScreenHeight), width: "82%", float: "left"}}>
                    {RenderScreen()}
                </div>
            </div>
        )
    }

    //-----------------------------------------------------------------------------------------------------------------//
    //If the site is in portrait
    if ((that.state.ScreenHeight > that.state.ScreenWidth)) {
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
                <div align={"center"} style={{ height: (that.state.ScreenHeight), width: "100%", float: "left"}}>
                    {renderTitle()}
                    {renderExportTV()}<br/>
                    {renderExportBAER()} <br/><br/>
                    {renderImportButtons()}
                </div>
            </div>
        )
    }
}

export default ImportExportIndexDBData;
