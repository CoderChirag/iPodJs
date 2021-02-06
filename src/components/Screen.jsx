// NOTE YOU HAVE TO FIRSTLY WRITE "npm i" FOR INSTALLING ALL THE NODE_MODULES WHICH ARE LISTED IN THE PACKAGE.JSON FILE NEEDED FOR THE PROJECT

// Importing All The Stuff Needed
import React, {useEffect} from "react";
import Menu from "./Menu";
// Importing All The Wallpapers Which We Have To Change According To The User
import Forest from "../Wallpapers/Forest.jpg";
import Beach from "../Wallpapers/Beach.jpg";
import City from "../Wallpapers/City.jpg";
import Valley from "../Wallpapers/Valley.jpg";
import Desert from "../Wallpapers/Desert.jpg";
import Food from "../Wallpapers/Food.jpg";
import Mountain from "../Wallpapers/Mountain.jpg";
import Ocean from "../Wallpapers/Ocean.jpg";
import Countryside from "../Wallpapers/Countryside.jpg";
// Importing all The Required Funnctions of Player.js File for Functionning odf Our Music Player
import {replay, setProgress, isPlaying, dragStart, drag, dragEnd} from "./Player"; 
// Also here we are getting to know which option is selected at this time from the props, which we are passing ahead to the Menu which is going to be rendered.
function Screen(props){

    var obj = props.isToggled;

    // This hook I have used to render according to the props that whenever we reopen our wifi, bluetooth or gps page it shuld look like as we left it previously.
    useEffect(()=>{
        let settingsArr = ["WiFi", "Bluetooth", "GPS"]
        if(settingsArr.includes(props.menu)){
            let toggler = document.getElementById(`toggler-${props.menu}`);
            let togglerDiv = document.getElementById(`toggler-div-${props.menu}`);
            if(props.menu === "WiFi"){
                if(obj.WiFi){
                    togglerDiv.style.backgroundColor = "orangered";
                    toggler.style.left = "55%";
                }else{
                    togglerDiv.style.backgroundColor = null;
                    toggler.style.left = null;
                }
            }else if(props.menu === "Bluetooth"){
                if(obj.Bluetooth){
                    togglerDiv.style.backgroundColor = "orangered";
                    toggler.style.left = "55%";
                }else{
                    togglerDiv.style.backgroundColor = null;
                    toggler.style.left = null;
                }
            }else if(props.menu === "GPS"){
                if(obj.GPS){
                togglerDiv.style.backgroundColor = "orangered";
                toggler.style.left = "55%";
                }else{
                    togglerDiv.style.backgroundColor = null;
                    toggler.style.left = null;
                }
            }
        }
        //------------------------------- Logic for our Catch Me Game --------------------------------------
        else if(props.menu === "CatchMe"){
            const box = document.getElementById("box");

            box.addEventListener("mouseover", function(){
                let top = Math.floor(Math.random()*(86));
                let left = Math.floor(Math.random()*(88));
                box.style.top = top + "%";
                box.style.left = left + "%";
            });
        }

    }, [obj, props.isToggled, props.menu])

    // The function for Changing the Song Time according to Users Click on the player progress bar
    // Here in this function internally We are using the function of Player.jsx
    function changeDurationByClick(e){
        // The current time of the song would be changed only if any song is in Playing State or in Paused State, but it should not be in notStarted State
        if (isPlaying !== "notStarted"){
            // These are the CoOrdinates of the player div inside which progress of our song is going on
            const rect = document.getElementById("player-bar").getBoundingClientRect();
            console.log(rect);
            // This is the total width of the player div
            const playerWidth = rect.width;
            // This is the Xcoordinate of user click From Left Of The Player Div
            const clickLocation = e.clientX - rect.left;
            // Setting the progress of song in the song div according to the coordinate of click
            setProgress(clickLocation, playerWidth);
        }
    }

    const arr = ["mainMenu", "gamesMenu", "musicMenu", "songsMenu", "settingsMenu", "wallpaperMenu"]

    if(arr.includes(props.menu)){
        return(
            <div id="screen"  style={{backgroundImage: `url(${props.wallpaper})`}}>
                <Menu menu={props.menu} items={props.items} option={props.option}></Menu>
            </div>
        )
    }else if(props.menu === "CoverFlow"){
        return <div id="screen"  style={{backgroundImage: `url(${props.wallpaper})`}}></div>
    }else if(props.menu === "CatchMe"){
        return (
            <div id="screen-without-bg" style={{padding: "15px"}}>
                <div id="viewport">
                    <div id="box" style={{top: "45%", left: "45%"}}><p>Catch Me If You Can</p></div>
                </div>
            </div>
        )
    }else if(props.menu === "audioPage"){
        return (
            <div id="screen-without-bg" style={{padding: "0", alignItems: "flex-start"}}>
                <center style={{marginTop: "25px"}}>{props.audioName}</center>
                <div className="audio">
                    <center><i className="fas fa-undo" id="replay" onClick={() => replay(props.audioLink)}></i></center>
                    <div className="player">
                        <p id="current-time" style={{marginLeft: "13px"}}>0:00</p>
                        <div className="progress-div" id="player-bar" onClick={changeDurationByClick} onMouseDown={dragStart} onTouchStart={dragStart} onMouseUp={dragEnd} onTouchEnd={dragEnd} onMouseMove={drag} onTouchMove={drag}>
                            <div className="progress-bar" id="progress"></div>
                            <div id="progress-tip"></div>
                        </div>
                        <p className="ls" id="duration" style={{marginLeft: "5px"}}>0:00</p>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return props.text;
    }
}

export default Screen;