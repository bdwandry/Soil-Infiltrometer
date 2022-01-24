/**
 * This is a page for when a person wants to learn how to use the application/website
 */

import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloseIcon from "@material-ui/icons/Close";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";
import '../CSS-Files/Learn.css';
import '../CSS-Files/button.css'

function Learn({that}) {
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
                <div style={{ height: (that.state.ScreenHeight), width: "18%", float: "left"}}></div>
                <div style={{ height: (that.state.ScreenHeight), width: "82%", float: "left"}}>
                    <div>
                        {/*   Main Page Help Section Collapsible  */}
                        <div className="wrap-collapsible">
                            <input id="StartingTest" className="toggle" type="checkbox"></input>
                            <label htmlFor="StartingTest" className="lbl-toggle">Starting a Test</label>
                            <div className="collapsible-content">
                                <div className="content-inner">
                                    <h1 className={"step"}>Step 1: Enter Initial Settings</h1>
                                    <h2 className={"stepText"}>
                                        You should see input boxes just like the ones shown in Figure 1.1 for the Time
                                        Interval (seconds) and Initial Volume (mL).
                                        <br/>
                                        <br/>
                                        <img className={"helpImg"} src='help1_step1_1.jpg' alt='step1'></img>
                                        <br/>
                                        Figure 1.1
                                        <br/>
                                        <br/>
                                        Make sure both boxes are filled appropriately.
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        Underneath there are more input boxes corresponding to the data of their
                                        respective names. (See Figure 1.2)
                                        <br/>
                                        <br/>
                                        You may either manually enter in your data into each box or you can click on the
                                        drop-down arrow to choose from built-in values.
                                        <br/>
                                        <br/>
                                        <br/>
                                        <img className={"helpImg"} src='help1_step1_2.jpg' alt='step1_2'></img>
                                        <br/>
                                        Figure 1.2
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>

                                    </h2>
                                    <br/>
                                    <h1 className={"step"}>Step 2: Begin timer!</h1>
                                    <h2 className={"stepText"}>
                                        <h3 className={"note"}>
                                            Once you click the button the timer will start, so only proceed when ready!
                                        </h3>
                                        <br/>
                                        When you are ready to begin collecting data click the "Start collecting data"
                                        button on the bottom of the page.
                                        <br/>
                                        <br/>
                                        <img className={"helpImg"} src='help1_step2_1.jpg' alt='step2'></img>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>

                                    </h2>
                                </div>
                            </div>
                        </div>


                        {/*   Entering Data Help Section Collapsible   */}
                        <div className="wrap-collapsible">
                            <input id="EnteringData" className="toggle" type="checkbox"></input>
                            <label htmlFor="EnteringData" className="lbl-toggle">Entering Data During Test</label>
                            <div className="collapsible-content">
                                <div className="content-inner">
                                    <h1 className={"step"}>Step 1: Wait...</h1>
                                    <h2 className={"stepText"}>
                                        Once you enter your initial settings and click "Start collecting data" you will be
                                        brought to a new page, you will notice the 2 running timers. (See Figure 2.1)
                                        <br/>
                                        <br/>
                                        Total Time: Total amount of time spent on this test. (Since "Start collecting data")
                                        <br/>
                                        Time Left in Interval: Time left in current data interval.
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <img className={"helpImg"} src='help2_step1_1.jpg' alt='step1'></img>
                                        <br/>
                                        Figure 2.1
                                        <br/>
                                        <br/>
                                        For now you may wait until the Interval Timer reaches 0, but keep an eye on it so
                                        you
                                        are ready to enter data when it goes off.
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </h2>

                                    <h1 className={"step"}>Step 2: Enter volume data</h1>
                                    <h2 className={"stepText"}>
                                        Once the Interval Timer reaches 0, a popup window will appear prompting you to enter
                                        the current volumetric data. (See Figure 2.2)
                                        <br/>
                                        <br/>
                                        <img className={"helpImg"} src='help2_step2_1.jpg' alt='step1'></img>
                                        <br/>
                                        Figure 2.2
                                        <br/>
                                        <br/>
                                        Click in the input box to being entering the data. Once you are done click
                                        "Submit Volume" to save the data into the current test table.
                                        <br/>
                                        <h3 className={"note"}>
                                            The Interval Timer will continue to run in the background.
                                        </h3>
                                        <br/>
                                        After the data is saved the popup window will disappear and you may wait for the
                                        next interval.
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </h2>
                                </div>
                            </div>
                        </div>


                        <div className="wrap-collapsible">
                            <input id="help3" className="toggle" type="checkbox"></input>
                            <label htmlFor="help3" className="lbl-toggle">Finishing a test / Saving data</label>
                            <div className="collapsible-content">
                                <div className="content-inner">
                                    <h1 className={"step"}>Step 1: Ending the Test</h1>
                                    <h2 className={"stepText"}>

                                        Once you are done collecting data click on the menu button in the top-left corner as
                                        shown in Figure 3.1.
                                        <br/>
                                        <br/>
                                        <img className={"helpImg"} src='help3_step1_1.jpg' alt='step1_1'></img>
                                        <br/>
                                        Figure 3.1
                                        <br/>
                                        <br/>
                                        If you want to keep the data you've collected, click on "Data Gathering Completed".
                                        If you'd rather restart the test and return to the previous page, click on
                                        "Reset to Main Page". (See figure 3.2)
                                        <br/>
                                        <h3 className={"note"}>
                                            You will lose the current test data if you click "Reset to Main Page"
                                        </h3>
                                        <br/>
                                        <br/>
                                        <img className={"helpImg"} src='help3_step1_2.jpg' alt='step1_2'></img>
                                        <br/>
                                        Figure 3.2
                                        <br/>
                                        <br/>

                                    </h2>
                                    <h1 className={"step"}>Step 2: Saving the data</h1>
                                    <h2 className={"stepText"}>

                                        If you selected "Data Gathering Completed" you should have been brought to the
                                        "Application
                                        Completed" page. Here you can add a Title to the test, upload a Picture, add GPS
                                        coordinates,
                                        and export as a .CSV file. You may also use your devices GPS service as the
                                        coordinates
                                        by clicking "Use Phones GPS".
                                        <br/>
                                        <br/>
                                        After you are done entering your information, click the menu button in the top-left
                                        corner. If you are satisfied with the test and want to save it, click "Save & Return
                                        to
                                        Main Page". (See Figure 3.3)
                                        <br/>
                                        If you want to delete this test and start over, click "Reset To Main Page".
                                        <br/>
                                        <h3 className={"note"}>
                                            You will lose all current test data if you click "Reset to Main Page".
                                        </h3>
                                        <br/>
                                        <br/>
                                        <img className={"helpImg"} src='help3_step2_1.jpg' alt='step1_2'></img>
                                        <br/>
                                        Figure 3.3
                                        <br/>
                                        <br/>

                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/*   TODO  */}
                        <div className="wrap-collapsible">
                            <input id="help4" className="toggle" type="checkbox"></input>
                            <label htmlFor="help4" className="lbl-toggle">Reviewing past data</label>
                            <div className="collapsible-content">
                                <div className="content-inner">
                                    <h1 className={"step"}>Step 1: Open Data Review Page</h1>
                                    <h2 className={"stepText"}>
                                        Click the menu button in the top-left corner to open the page menu. Then click
                                        "Previous Test Data"
                                        to be brought to the Data Review page.
                                        <br/>
                                        <br/>
                                        <h3 className={"note"}>
                                            If you do not see "Previous Test Data" you may have to finish your test, save
                                            your current data,
                                            or exit the current test by clicking "Reset to Main Page" form the menu.
                                        </h3>
                                        <br/>
                                        <br/>
                                        Once at the "Previous Test Data" page, you should see a table at the bottom
                                        containing any
                                        previous tests you may have saved. If not, click "Reload Table" to refresh the
                                        table.
                                        <br/>
                                        <br/>
                                    </h2>

                                    <h1 className={"step"}>Step 2: Review, Delete, or Edit</h1>
                                    <h2 className={"stepText"}>
                                        If your data has been successfully loaded you should see at least 1 of your tests in
                                        the table
                                        similar to that in Figure 4.1

                                        <br/>
                                        <br/>
                                        <img className={"helpImg"} src='help4_step2_1.jpg' alt='step2_1'></img>
                                        <br/>
                                        Figure 4.1
                                        <br/>
                                        <br/>
                                        The buttons in the Action column are used to interact with the table.
                                        <br/>
                                        By clicking "Review" you can see the data saved in the test and export
                                        the data as a .CSV file if needed.
                                        <br/>
                                        Clicking "Delete" will prompt you to confirm if you'd like the data deleted.
                                        <br/>
                                        <h3 className={"note"}>
                                            Deleted data CANNOT be recovered, only delete data if you are sure you don't
                                            need it.
                                        </h3>
                                        <br/>
                                        Edit will allow you to change the Title, GPS data, and the associated Picture.
                                        <br/>
                                        <br/>
                                        Once done you can click the menu button and save your results.
                                        <br/>

                                    </h2>

                                </div>
                            </div>
                        </div>

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
                    {/*   Main Page Help Section Collapsible  */}
                    <div className="wrap-collapsible">
                        <input id="StartingTest" className="toggle" type="checkbox"></input>
                        <label htmlFor="StartingTest" className="lbl-toggle">Starting a Test</label>
                        <div className="collapsible-content">
                            <div className="content-inner">
                                <h1 className={"step"}>Step 1: Enter Initial Settings</h1>
                                <h2 className={"stepText"}>
                                    You should see input boxes just like the ones shown in Figure 1.1 for the Time
                                    Interval (seconds) and Initial Volume (mL).
                                    <br/>
                                    <br/>
                                    <img className={"helpImg"} src='help1_step1_1.jpg' alt='step1'></img>
                                    <br/>
                                    Figure 1.1
                                    <br/>
                                    <br/>
                                    Make sure both boxes are filled appropriately.
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    Underneath there are more input boxes corresponding to the data of their
                                    respective names. (See Figure 1.2)
                                    <br/>
                                    <br/>
                                    You may either manually enter in your data into each box or you can click on the
                                    drop-down arrow to choose from built-in values.
                                    <br/>
                                    <br/>
                                    <br/>
                                    <img className={"helpImg"} src='help1_step1_2.jpg' alt='step1_2'></img>
                                    <br/>
                                    Figure 1.2
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>

                                </h2>
                                <br/>
                                <h1 className={"step"}>Step 2: Begin timer!</h1>
                                <h2 className={"stepText"}>
                                    <h3 className={"note"}>
                                        Once you click the button the timer will start, so only proceed when ready!
                                    </h3>
                                    <br/>
                                    When you are ready to begin collecting data click the "Start collecting data"
                                    button on the bottom of the page.
                                    <br/>
                                    <br/>
                                    <img className={"helpImg"} src='help1_step2_1.jpg' alt='step2'></img>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>

                                </h2>
                            </div>
                        </div>
                    </div>


                    {/*   Entering Data Help Section Collapsible   */}
                    <div className="wrap-collapsible">
                        <input id="EnteringData" className="toggle" type="checkbox"></input>
                        <label htmlFor="EnteringData" className="lbl-toggle">Entering Data During Test</label>
                        <div className="collapsible-content">
                            <div className="content-inner">
                                <h1 className={"step"}>Step 1: Wait...</h1>
                                <h2 className={"stepText"}>
                                    Once you enter your initial settings and click "Start collecting data" you will be
                                    brought to a new page, you will notice the 2 running timers. (See Figure 2.1)
                                    <br/>
                                    <br/>
                                    Total Time: Total amount of time spent on this test. (Since "Start collecting data")
                                    <br/>
                                    Time Left in Interval: Time left in current data interval.
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <img className={"helpImg"} src='help2_step1_1.jpg' alt='step1'></img>
                                    <br/>
                                    Figure 2.1
                                    <br/>
                                    <br/>
                                    For now you may wait until the Interval Timer reaches 0, but keep an eye on it so
                                    you
                                    are ready to enter data when it goes off.
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                </h2>

                                <h1 className={"step"}>Step 2: Enter volume data</h1>
                                <h2 className={"stepText"}>
                                    Once the Interval Timer reaches 0, a popup window will appear prompting you to enter
                                    the current volumetric data. (See Figure 2.2)
                                    <br/>
                                    <br/>
                                    <img className={"helpImg"} src='help2_step2_1.jpg' alt='step1'></img>
                                    <br/>
                                    Figure 2.2
                                    <br/>
                                    <br/>
                                    Click in the input box to being entering the data. Once you are done click
                                    "Submit Volume" to save the data into the current test table.
                                    <br/>
                                    <h3 className={"note"}>
                                        The Interval Timer will continue to run in the background.
                                    </h3>
                                    <br/>
                                    After the data is saved the popup window will disappear and you may wait for the
                                    next interval.
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                </h2>
                            </div>
                        </div>
                    </div>


                    <div className="wrap-collapsible">
                        <input id="help3" className="toggle" type="checkbox"></input>
                        <label htmlFor="help3" className="lbl-toggle">Finishing a test / Saving data</label>
                        <div className="collapsible-content">
                            <div className="content-inner">
                                <h1 className={"step"}>Step 1: Ending the Test</h1>
                                <h2 className={"stepText"}>

                                    Once you are done collecting data click on the menu button in the top-left corner as
                                    shown in Figure 3.1.
                                    <br/>
                                    <br/>
                                    <img className={"helpImg"} src='help3_step1_1.jpg' alt='step1_1'></img>
                                    <br/>
                                    Figure 3.1
                                    <br/>
                                    <br/>
                                    If you want to keep the data you've collected, click on "Data Gathering Completed".
                                    If you'd rather restart the test and return to the previous page, click on
                                    "Reset to Main Page". (See figure 3.2)
                                    <br/>
                                    <h3 className={"note"}>
                                        You will lose the current test data if you click "Reset to Main Page"
                                    </h3>
                                    <br/>
                                    <br/>
                                    <img className={"helpImg"} src='help3_step1_2.jpg' alt='step1_2'></img>
                                    <br/>
                                    Figure 3.2
                                    <br/>
                                    <br/>

                                </h2>
                                <h1 className={"step"}>Step 2: Saving the data</h1>
                                <h2 className={"stepText"}>

                                    If you selected "Data Gathering Completed" you should have been brought to the
                                    "Application
                                    Completed" page. Here you can add a Title to the test, upload a Picture, add GPS
                                    coordinates,
                                    and export as a .CSV file. You may also use your devices GPS service as the
                                    coordinates
                                    by clicking "Use Phones GPS".
                                    <br/>
                                    <br/>
                                    After you are done entering your information, click the menu button in the top-left
                                    corner. If you are satisfied with the test and want to save it, click "Save & Return
                                    to
                                    Main Page". (See Figure 3.3)
                                    <br/>
                                    If you want to delete this test and start over, click "Reset To Main Page".
                                    <br/>
                                    <h3 className={"note"}>
                                        You will lose all current test data if you click "Reset to Main Page".
                                    </h3>
                                    <br/>
                                    <br/>
                                    <img className={"helpImg"} src='help3_step2_1.jpg' alt='step1_2'></img>
                                    <br/>
                                    Figure 3.3
                                    <br/>
                                    <br/>

                                </h2>
                            </div>
                        </div>
                    </div>

                    {/*   TODO  */}
                    <div className="wrap-collapsible">
                        <input id="help4" className="toggle" type="checkbox"></input>
                        <label htmlFor="help4" className="lbl-toggle">Reviewing past data</label>
                        <div className="collapsible-content">
                            <div className="content-inner">
                                <h1 className={"step"}>Step 1: Open Data Review Page</h1>
                                <h2 className={"stepText"}>
                                    Click the menu button in the top-left corner to open the page menu. Then click
                                    "Previous Test Data"
                                    to be brought to the Data Review page.
                                    <br/>
                                    <br/>
                                    <h3 className={"note"}>
                                        If you do not see "Previous Test Data" you may have to finish your test, save
                                        your current data,
                                        or exit the current test by clicking "Reset to Main Page" form the menu.
                                    </h3>
                                    <br/>
                                    <br/>
                                    Once at the "Previous Test Data" page, you should see a table at the bottom
                                    containing any
                                    previous tests you may have saved. If not, click "Reload Table" to refresh the
                                    table.
                                    <br/>
                                    <br/>
                                </h2>

                                <h1 className={"step"}>Step 2: Review, Delete, or Edit</h1>
                                <h2 className={"stepText"}>
                                    If your data has been successfully loaded you should see at least 1 of your tests in
                                    the table
                                    similar to that in Figure 4.1

                                    <br/>
                                    <br/>
                                    <img className={"helpImg"} src='help4_step2_1.jpg' alt='step2_1'></img>
                                    <br/>
                                    Figure 4.1
                                    <br/>
                                    <br/>
                                    The buttons in the Action column are used to interact with the table.
                                    <br/>
                                    By clicking "Review" you can see the data saved in the test and export
                                    the data as a .CSV file if needed.
                                    <br/>
                                    Clicking "Delete" will prompt you to confirm if you'd like the data deleted.
                                    <br/>
                                    <h3 className={"note"}>
                                        Deleted data CANNOT be recovered, only delete data if you are sure you don't
                                        need it.
                                    </h3>
                                    <br/>
                                    Edit will allow you to change the Title, GPS data, and the associated Picture.
                                    <br/>
                                    <br/>
                                    Once done you can click the menu button and save your results.
                                    <br/>

                                </h2>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Learn;
