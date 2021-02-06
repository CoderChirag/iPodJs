import React from "react";
import HeadingOnScreen from "./HeadingOnScreen";

// This the function for generalising the template which is used for all menus
function Menu(props){
    return(
        <div id="menu">
            {/* Here First of all we are requesting the animated text to be shown here */}
            <HeadingOnScreen></HeadingOnScreen>
            <ul>
                {/* Here we are mapping the items array given in props accoeding to which we have to show the elements of the menu */}
                {/* Also we are checking from the props which option is selected and accordingly giving them a blue bg, and also showing the arrow of that option, hiding all other arrows */}
                {props.items.map((item, index) => {
                    return (
                        <div key={index+1} className="li-menu-div" id={`li-menu-div-${index+1}`} style={{backgroundColor: props.option===index+1 && "rgb(97, 97, 248)"}}>
                            <li>{item}<i className={`fas fa-chevron-right ${props.menu}-arrow`}  id={`${props.menu}-arrow-${index+1}`} style={{display: props.option===index+1 ? "inline-block" : "none"}}></i></li>
                        </div>
                )})}
            </ul>
        </div>
    )
}

export default Menu;