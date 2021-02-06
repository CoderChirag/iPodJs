// NOTE YOU HAVE TO FIRSTLY WRITE "npm i" FOR INSTALLING ALL THE NODE_MODULES WHICH ARE LISTED IN THE PACKAGE.JSON FILE NEEDED FOR THE PROJECT

// Importing All the Stuff Needed
import React, {useState} from "react";
import Screen from "./Screen";
// Here I am Importing all the Photos which arre to be used when Changing Wallpapers
import Forest from "../Wallpapers/Forest.jpg";
import Beach from "../Wallpapers/Beach.jpg";
import City from "../Wallpapers/City.jpg";
import Valley from "../Wallpapers/Valley.jpg";
import Desert from "../Wallpapers/Desert.jpg";
import Food from "../Wallpapers/Food.jpg";
import Mountain from "../Wallpapers/Mountain.jpg";
import Ocean from "../Wallpapers/Ocean.jpg";
import Countryside from "../Wallpapers/Countryside.jpg";
// Here I am importing the Functions from The Player File which is responsible for Playing Songs, Changing Songs, Functionning of the Player and all that stuff
import {newAudio, play, pause, stop, isPlaying} from "./Player"


// This is the main Frame of our iPod which contains mainly 2 items : The Wheel and The Screen
function Frame(){
// ------------------------------ Global Variables and Hooks Section ------------------------------------------//

    // These are the arrays containing the Items of Different Menus, which would be later on passed in to the props of Screen depending on which menu we are currently.
    const mainMenuItems = ["Cover Flow", "Games", "Music", "Settings"];
    const gamesMenuItems = ["Catch Me"];
    const musicMenuItems = ["Songs", "Albums", "Artists", "Playlists"];
    const songsMenuItems = ["Jeena Jeena", "Kaun Tuzhe", "Dooriyan"];
    // These are the audio links from which we are playing Songs. For Now I am not using The Fetch Methods and all, But Yes In Future We can do that and can  Extend this thing to the Searching of any Song and Playing it Feature.
    const audioLinks = ["https://aac.saavncdn.com/940/2ef7c9587cefad1ac29b94add29b6c40_320.mp4", "https://aac.saavncdn.com/569/6a016eb165b341281a97bc570f70c1d4_320.mp4", "https://aac.saavncdn.com/211/dd5a448a9d67996b19aeb405a315cc17_320.mp4"]
    const settingsMenuItems = ["Wallpaper", "WiFi", "Bluetooth", "Orientation", "Notifications", "Privacy", "GPS"];
    const wallpaperMenuItems = ["Forest", "Mountain", "Ocean", "Valley", "Food", "City", "Beach", "Countryside", "Desert"];
    // This array is for storing the text which we have to show on the pages of settingsOptionsText
    const settingsOptionsText = ["","","","Sorry, This Device Only Supports Portrait View", "No Notifications Currently", "Your device is Protected"];
    // These are Some of the variables created by react hooks, so that we can track changes and re-render the iPod on the changes
    // This one is for keeping track of motion of mouse over the wheel 
    const [isMoving, setMoving] = useState(false);
    // This is for keeping the track of current menu, and by default it is in main menu
    const [currentMenu, setCurrentMenu] = useState("mainMenu");
    // This is for changing the options of menu
    const [currentMenuOption, setCurrentMenuOption] = useState(1);
    // This one is for changing the items as the current Menu changes
    const [items, setItems] = useState(mainMenuItems);
    // This one is for setting the text/HTML on the Pages in Which We have to give Some Text
    const [text, setText] = useState("");
    // This one is for changing the Audio Links as we change the Song
    const [audioLink, setAudioLink] = useState();
    // This one is for changing the Audio Name as we change the Song
    const [audioName, setAudioName] = useState();
    // This one is for keeping the track of the toggler of bluetooth,, wifi and gps section
    const [isToggled, setIsToggled] = useState({WiFi: false, Bluetooth: false, GPS: false});
    // This one is for changing the Current Wallpaper
    const [currentWallpaper, setCurrentWallpaper] = useState(Forest);
    // These 2 variables are for tracking the direction of mouse move on our wheel, if the user is moving upwards or downwards
    var wheelMoveDirection;
    var clientY;

// ------------------------- Handling of Mouse Events and Changing Direction Section -------------------//

    // This is the mousedown event.
    // Basically when the use press on the mouse button and move the mouse on the wheel while holding the mouse we should change the options
    function mouseDown(e){
        // Here we changing isMoving from false to true, and depicting that now we are moving the mouse over the wheel
        setMoving(true);
    }
    function mouseMove(e){
        // This event works only when it see that user has a hold on mouse click button
        if(isMoving){
            // If user is starting to move the mouse its initial position would be captured for the first time
            if(clientY === undefined){
                clientY = e.clientY;
            }
            // Now after that after a regular interval of 13px of movement we changes the selected option
            // And now if the Y-Coordinate is increasing, then we are going downwards
            if(e.clientY-clientY > 13){
                wheelMoveDirection = "down";
                clientY = e.clientY;
                changeCurrentMenuOption();
            // If Y-Coordinate is decreasing then mouse is moving up
            }else if(clientY-e.clientY > 13){
                wheelMoveDirection = "up";
                clientY = e.clientY;
                changeCurrentMenuOption();
            }
        }
    }
    // Now this event is handling when the user leaves the click, and now isMoving should become false as now user have stopped changing the options
    function mouseUp(e){
        // Here we change isMoving to false and also changes Y-Coordinate to undefined so that next time when we start moving again it would be initialized from the position from where user has started this time
        setMoving(false);
        clientY = undefined;
    }

// ------------------------------ Handling Button Events and Changing Menu Section ----------------------------//

    // Now these functions are called when the user clicks on the btns of the wheel
    // This is for the forward function and it selects the next option of the menu
    function forward(){
        // Here we change the wheel direction to downwards and then forwards to changeCurrentMenuOption to go to the next option
        wheelMoveDirection = "down";
        changeCurrentMenuOption();
    }
    // This function is for going to previous option
    function backward(){
        // Here we change the wheel direction to upwards and then forwards to changeCurrentMenuOption to go to the previous option
        wheelMoveDirection = "up";
        changeCurrentMenuOption();
    }

    // This function runs when we click on the center button which opens the selected option on the  screen 
    function changeMenu(){
        // Here we check that on which menu was we at the time of click and which option was selected and then changes the currentMenu accordingly to make it to that meenu which we have to show after the click

        // For checking click inside mainMenu
        if(currentMenu === "mainMenu"){
            if(currentMenuOption === 1){
                setCurrentMenu("CoverFlow");
                setItems([]);
            }else if(currentMenuOption === 2){
                setCurrentMenu("gamesMenu");
                setItems(gamesMenuItems);
            }else if(currentMenuOption === 3){
                setCurrentMenu("musicMenu");
                setItems(musicMenuItems);
            }else if(currentMenuOption === 4){
                setCurrentMenu("settingsMenu");
                setItems(settingsMenuItems);
            }else{
                setCurrentMenu(mainMenuItems[currentMenuOption-1]);
                setItems([]);
            }
        }
        // For Checking Click inside game Menu
        else if(currentMenu === "gamesMenu"){
            setCurrentMenu("CatchMe");
            setItems([]);
        }
        // For Checking click inside musicMenu
        else if(currentMenu === "musicMenu"){
            if(currentMenuOption === 1){
                setCurrentMenu("songsMenu");
                setItems(songsMenuItems);
            }else{
                setCurrentMenu(musicMenuItems[currentMenuOption-1]);
                setItems([]);
                setText(<div id="screen-without-bg"><p><center>New {`${musicMenuItems[currentMenuOption-1]}`}</center></p><p><center>Coming Soon</center></p></div>);
            }
        }
        // For Checking Click inside the SongsMenu where We Have to Load the Song according to the User's Click
        else if(currentMenu === "songsMenu"){
            setAudioLink(audioLinks[currentMenuOption-1]);
            setAudioName(songsMenuItems[currentMenuOption-1]);
            setCurrentMenu("audioPage");
            setItems([]);
        }
        // For Checking Click inside settingsMenu
        else if(currentMenu === "settingsMenu"){
            if(currentMenuOption === 2 || currentMenuOption === 3 || currentMenuOption === 7){
                setCurrentMenu(settingsMenuItems[currentMenuOption-1]);
                setItems([]);
                setText(<div id="screen-without-bg" style={{backgroundColor: "white", justifyContent: "space-between"}}><p>{settingsMenuItems[currentMenuOption-1]}</p><div className="toggler-div" id={`toggler-div-${settingsMenuItems[currentMenuOption-1]}`}><div className="toggler" id={`toggler-${settingsMenuItems[currentMenuOption-1]}`}></div></div></div>)
            }else if(currentMenuOption !== 1){
                setCurrentMenu(settingsMenuItems[currentMenuOption-1]);
                setItems([]);
                setText(<div id="screen-without-bg"><center>{`${settingsOptionsText[currentMenuOption-1]}`}</center></div>);
            }else{
                setCurrentMenu("wallpaperMenu")
                setItems(wallpaperMenuItems);
            }
        }
        // For Checking and Changing Wallpapers inside WallPaper Menu
        else if(currentMenu === "wallpaperMenu"){
            switch(currentMenuOption){
                case 1:
                    setCurrentWallpaper(Forest);
                    break;
                case 2:
                    setCurrentWallpaper(Mountain);
                    break;
                case 3:
                    setCurrentWallpaper(Ocean);
                    break; 
                case 4:
                    setCurrentWallpaper(Valley);
                    break;
                case 5:
                    setCurrentWallpaper(Food);
                    break;
                case 6:
                    setCurrentWallpaper(City);
                    break;
                case 7:
                    setCurrentWallpaper(Beach);
                    break;
                case 8:
                    setCurrentWallpaper(Countryside);
                    break;
                case 9:
                    setCurrentWallpaper(Desert);
                    break;
                default:
                    break
            }
        }
        // This is for checking the click on the Center button when we are inside the WiFI, Bluetooth or GPS page
        // We are here changing the value of 1 of these 3 features to true and this makes toggler but to move to left and change color to orangered.
        // Now here we are changing the value in object to true of whichever toggler is clicked and then we are passing it to the props of Screen.jsx where screen renders accordingly, if the toggles is enabled or diabled
        else if(currentMenu === "WiFi" || currentMenu === "Bluetooth" || currentMenu === "GPS"){
            let toggler = document.getElementById(`toggler-${currentMenu}`);
            if(toggler.style.left){
                setIsToggled({WiFi: currentMenu === "WiFi" ? false : isToggled.WiFi, Bluetooth: currentMenu === "Bluetooth" ? false : isToggled.Bluetooth, GPS: currentMenu === "GPS" ? false : isToggled.GPS});
            }else{
                setIsToggled({WiFi: currentMenu === "WiFi" ? true : isToggled.WiFi, Bluetooth: currentMenu === "Bluetooth" ? true : isToggled.Bluetooth, GPS: currentMenu === "GPS" ? true : isToggled.GPS});
            }
        }

        // Now first checking that we are now on any menu or on a screen page
        // Also we have to scroll the top of the new menu
        if(currentMenu.indexOf("Menu") !== -1 && currentMenu !== "wallpaperMenu" ){
            setCurrentMenuOption(1);
            let topPos = document.getElementById("li-menu-div-1").offsetTop;
            document.getElementById('menu').scrollTop = -(topPos-100);
        }
    }
    // This function runs when we click on Menu written on wheel
    function back(){
        // Here we checks on which menu we are currently and then changes current menu to accordingly to come 1 step backwards
        if(currentMenu === "gamesMenu" || currentMenu === "musicMenu" || currentMenu === "settingsMenu" || currentMenu === "CoverFlow"){
            setCurrentMenu("mainMenu");
            setItems(mainMenuItems)    
        }else if(currentMenu === "CatchMe"){
            setCurrentMenu("gamesMenu");
            setItems(gamesMenuItems);
        }else if(musicMenuItems.includes(currentMenu) || currentMenu === "songsMenu"){
            setCurrentMenu("musicMenu");
            setItems(musicMenuItems); 
        }else if(currentMenu === "audioPage"){
            setCurrentMenu("songsMenu");
            setItems(songsMenuItems);
            stop();
        }
        else if(currentMenu === "wallpaperMenu" || settingsMenuItems.includes(currentMenu)){
            setCurrentMenu("settingsMenu");
            setItems(settingsMenuItems);
        }
        setText("");
        // Now first checking that we are now on any menu or on a screen page
        // And if we are on any menu than now since menu has changed, we also have to change the selected option and now have to select the first option
        // Also we have to scroll the top of the new menu
        if(currentMenu.indexOf("Menu") !== -1){
            setCurrentMenuOption(1);
            let topPos = document.getElementById("li-menu-div-1").offsetTop;
            document.getElementById('menu').scrollTop = -(topPos-100);
        }
    }

    // This function is for changing the options
    function changeCurrentMenuOption(){
        // Here first of all we are checking on which menu we are
        if(currentMenu.indexOf("Menu") !== -1){
            // Here firstly we are checking that if we are on that option that for going downwards or upwards we have to scroll down or up, and then we are changing it accordingly

            // 1st CASE: The currentMenuOption is such that now going to downwards we have to scroll up and also currentMenuOption is not the last one. 
            if(currentMenuOption >= 3 && currentMenuOption !== items.length && wheelMoveDirection === "down"){
                let topPos = document.getElementById(`li-menu-div-${currentMenuOption + 1}`).offsetTop;
                document.getElementById('menu').scrollTop = topPos-20;
            }
            // 2nd CASE: The currentMenuOption is now going upwards and it is not the First Option. 
            else if(currentMenuOption !== 1 && wheelMoveDirection === "up"){
                let topPos = document.getElementById(`li-menu-div-${currentMenuOption - 1}`).offsetTop;
                // console.log(true, currentMenuOption - 1, topPos);
                if(currentMenuOption-1 <= 3){
                    document.getElementById('menu').scrollTop = -(topPos-100);
                }else{
                    document.getElementById('menu').scrollTop = topPos+100;
                }
            }
            // 3rd CASE: CurrentMenuOption is first one, and we have to go upwards which means now we have to go to the last option.
            else if(currentMenuOption === 1 && wheelMoveDirection === "up"){
                let topPos = document.getElementById(`li-menu-div-${items.length}`).offsetTop;
                document.getElementById('menu').scrollTop = topPos-100;
            }
            // 4th CASE: CurrentMenuOption is the last one, and now we are going downwards which means now we have to go to the top.
            else if(currentMenuOption === items.length && wheelMoveDirection === "down"){
                let topPos = document.getElementById(`li-menu-div-1`).offsetTop;
                document.getElementById('menu').scrollTop = -(topPos-100);
            }
            // Now we are checking on which option we currenlty are and on which we have to go and then changing currentMenuOption accordingly
            if(currentMenuOption === items.length && wheelMoveDirection === "down"){
                setCurrentMenuOption(1);
            }else if(wheelMoveDirection === "down"){
                setCurrentMenuOption(currentMenuOption+1);
            }else if(currentMenuOption === 1 && wheelMoveDirection === "up"){
                setCurrentMenuOption(items.length);
            }else if(wheelMoveDirection === "up"){
                setCurrentMenuOption(currentMenuOption-1);
            }
        }
    }

// -------------------------------- Music Player Section -------------------------------------------------------
    // While Most of the Functions of Music Player is Written Inside Player.js file,
    // But here I have Written One Main Function
    // This is Called When The User Click on The Play Button
    // It Furst of all, Detects on which menu the User is at, and if he/she is on the audioPage then, it checks if the Song was not Playing or Paused previously, then it makes a new instance of the Audio Object.
    // Otherwise it resumes the song which was paused earlier
    function playSong(){
        console.log(isPlaying);
        if(currentMenu === "audioPage"){
            if(isPlaying === "notStarted"){
                newAudio(audioLink);
                console.log(audioName);
            }else{
                play();
            }
        }
    }
    


    return(
        <React.Fragment>
        
            <div id="frame">
                {/* ---------------Screen Section --------------------------------------------- */}
                {/* Now in this section we are passing 2 props to Screen: 1.)To tell the screen which menu to be rendered, 2.)Which option is selected at present and should have a blue bg. */}
                <Screen menu={currentMenu} items={items} option={currentMenuOption} text={text} isToggled={isToggled} audioLink={audioLink} audioName={audioName} wallpaper={currentWallpaper}></Screen>
                {/* -----------------------------Wheel Section ----------------------------------------- */}
                <div id="outer-wheel" onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}>
                    <p id="menu-btn" onClick={back}>Menu</p>
                    <i className="fas fa-fast-forward" id="next-btn" onClick={forward}></i>
                    <i className="fas fa-fast-backward" id="previous-btn" onClick={backward}></i>
                    <i className="fas fa-play" id="play-btn" onClick={playSong}></i>
                    <i className="fas fa-pause" id="pause-btn" onClick={pause}></i>
                </div>
                <button className="center-btn" onClick={changeMenu}></button>
            </div>
        </React.Fragment>
    )
}

export default Frame;