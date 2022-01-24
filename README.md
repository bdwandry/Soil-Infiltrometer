Team Members:
Name: Bryan Wandrych, Github: bdwandry, Email: bdwandry@mtu.edu\
Name: Franklin Van Hove, Github: FrankVanHove, Email: ftvanhov@mtu.edu\
Name: John Bland, Github: kgost, Email: jpbland@mtu.edu\
Name: Nathan Kenwabikise, Github: nikenwab, Email: nikenwab@mtu.edu\
Name: Paul Rayment, Github: plraymen, Email: plraymen@mtu.edu\

App Description: What this application is doing is allowing a user to get more accurate and precise measurements when it comes to recording information. We will build the app so that it will initially allow the user to set the time intervals they want to, then gets notified when the selected time intervals finally come into fruition. When the user gets notified, it will prompt them to enter the volumetric information that the soil infiltrometer shows (please note that the user will have to manually enter the information in and the time is still static during the interval). The app will show a table below that will dynamically auto-populate the information and create several different charts and graphs based-off of the recorded/calculated values. What this application is doing is allowing a user to get more accurate and precise measurements when it comes to recording information. We will build the app so that it will initially allow the user to set the time intervals they want to, then gets notified when the selected time intervals finally come into fruition. When the user gets notified, it will prompt them to enter the volumetric information that the soil infiltrometer shows (please note that the user will have to manually enter the information in and the time is still static during the interval). The app will show a table below that will dynamically auto-populate the information and create several different charts and graphs based-off of the recorded/calculated values.



# Getting Started with Grails App with React Profile

This is going to be a restructured project, because it makes it easier to deploy on a tomcat server. We are still developing with react, but now all of the react code must be developed under client/ folder.

## Available Scripts

You must be in the root directory to run this. 
You can also cd into the client folder and run npm/yarn start
Please also note, you might have to run it with './' on linux/wsl. On Windows, do not run with that option.
In the project directory, you can run:

### `gradlew bootrun -parallel`

Boots up the server and client servers. Handy for if we implement any controllers.

### `gradlew client:start`

Launches the ReactJS profile
Meaning the client/ folder

### `gradlew server:start`

Launches the Backend Server

## How to Deploy
### 1. Open the Root of the project into Terminal, then type: 'gradlew assembleServerAndClient'
### 2. Navigate to '~\server\build\libs\', you will find a generated file called 'server.war', rename it to 'soilinfiltrometer.war' (capitalization matters)
### 3. SSH into the tomcat server. Type: 'ssh 2021_hci_4@hci-dev.cs.mtu.edu' (You can find the password in the Google Drive)
### 4. Shutdown or Disable the Tomcat Server. Type: 'sudo systemctl stop tomcat@2021_hci_4'
### 5. Navigate to web-app folder. Type: 'cd /var/lib/tomcats/2021_hci_4/webapps/'
### 6. Remove old files. Type: 'sudo rm -rf soilinfiltrometer soilinfiltrometer.war'
### 7. For this next portion, you will need to have a way to SFTP and transfer the other war file to the tomcat server. For Windows, highly reccomend using WinSCP. Next, transfer the newly created war file to '/var/lib/tomcats/2021_hci_4/webapps/' using SFTP.
### 8. Start backup the server. For this part it will take 30 seconds to a minute to complete. The war file needs to be 'exploded'. Type: "sudo systemctl start tomcat@2021_hci_4"
### 9.Just wait a couple of minutes for the tomcat server to officially bootup and then go the Website: In you Web-Browser, Type: 'https://hci-dev.cs.mtu.edu:8143/soilinfiltrometer/index.html'# Soil-Infiltrometer
