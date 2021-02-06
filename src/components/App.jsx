// NOTE YOU HAVE TO FIRSTLY WRITE "npm i" FOR INSTALLING ALL THE NODE_MODULES WHICH ARE LISTED IN THE PACKAGE.JSON FILE NEEDED FOR THE PROJECT

// Importing all the stuff needed
import React from "react";
import Frame from "./Frame";
import Reflection from "./Reflection";

// App Function which is our main app which would be rendered on the screen
function App(){
// This function is in turn rendering the frame and reflection components
    return(
        <div>
            <Frame></Frame>
            <Reflection></Reflection>
        </div>
    )
}

// Exporting the APP function so that our index.js, which is the entry point of our project, can import this 
export default App;