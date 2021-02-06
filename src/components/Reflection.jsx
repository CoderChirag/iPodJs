// NOTE YOU HAVE TO FIRSTLY WRITE "npm i" FOR INSTALLING ALL THE NODE_MODULES WHICH ARE LISTED IN THE PACKAGE.JSON FILE NEEDED FOR THE PROJECT

import React from "react";

// This is the Section where I have given the Reflection of the frame
function Reflection(){
    return(
        <div id="frame" className="refl">
            <div id="outer-wheel">
                <p id="menu-btn">Menu</p>
                <i className="fas fa-fast-forward" id="next-btn"></i>
                <i className="fas fa-fast-backward" id="previous-btn"></i>
                <i className="fas fa-play" id="play-btn"></i>
                <i className="fas fa-pause" id="pause-btn"></i>
            </div>
            <div className="center-btn" style={{border: "1px black solid", cursor: "default"}}></div>
            </div>
    )
}

export default Reflection;