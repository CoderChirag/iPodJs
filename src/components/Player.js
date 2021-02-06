// Declaring all the GLobals
var audio, duration, interval;

var isPlaying = 'notStarted';

// Function for creating New Instance of the Audio Object
function newAudio(url){
    audio = new Audio(url);

    // Getting the Duration of the Song and displaying it on the player
    audio.addEventListener('canplay', function(e){
        duration =  Math.round(audio.duration);
        var minutes = Math.floor(duration/60);
        var seconds = duration%60;
        if (seconds<10){
            if (isPlaying !== "notStarted"){
            document.getElementById("duration").innerHTML = `${minutes} :0${seconds.toPrecision(1)}`;
            }
        }
        else{
            if (isPlaying !== "notStarted"){
            document.getElementById("duration").innerHTML = `${minutes}:${seconds.toPrecision(2)}`;
            }
        }
    });
    // Callback to Play Function
    play();
}

// Play Function
function play(){
    isPlaying = 'playing';
    // Playing the audio object created above
    audio.play();
    // Getting the current duration of song and getting it displayed after each second
    // Also here we are moving the progress bar also
    interval = setInterval(function(){
        if (isPlaying !== "notStarted"){
            let currentTime = Math.round(audio.currentTime) 
            let minutes = Math.floor(currentTime/60);
            let seconds = currentTime%60;
            // Updating the current time each second
            if (seconds<10){
                document.getElementById("current-time").innerHTML = minutes + ":0" + seconds.toPrecision(1);
            }
            else{
                document.getElementById("current-time").innerHTML = minutes + ":" + seconds.toPrecision(2);
            }
            // Updating the progress bar each second
            // I am using this just for increasing the speed of updation of width
            // Here I will not round the current time and thus the time would be very accurate and thus it woul be updated very fast
            let currentTimeAccurate = audio.currentTime;
            document.getElementById("progress").style.width = `${(currentTimeAccurate/duration)*100}%`;
            document.getElementById("progress-tip").style.marginLeft = `${((currentTimeAccurate/duration)*100)-5}%`;
        }
        if(audio.currentTime === audio.duration){
            clearInterval(interval);
        }
    }, 100);
}

// Pause Function
function pause(){
    isPlaying = 'paused';
    // Stoping the updataion of the current duration after pausing the song so that computer memory dont get wasted
    clearInterval(interval)
    // Pausing the audo Object created above
    audio.pause();
}

// Stop Function
function stop(){
    // Now our work is to pause the song and then set the Current Time of the song to 00:00 second. This task would act like that we have stopped the current song.
    if(isPlaying !== "notStarted"){
        clearInterval(interval)
        audio.pause();
        audio.currentTime = 0;
    }
        
    isPlaying = 'notStarted';
}
// Replay Function
// Here We have to Stop The Song First and Then again Play It.
function replay(url){
    stop();
    newAudio(url);
}

//--------------------------- Functions for setting progress of song on click or on dragging --------------------

// This One is When The User Clicks On Any Portion of the SongProgress Bar, The Song's Duration Would Reach to that Part
function setProgress(xPos, playerWidth) {
    // This is the location of click from Left of the player div In Percentage 
    const xPosPercent = (xPos/playerWidth)*100;
    // Now changing the Left Margin of Progress Tip and width of Song Progress According to the percentage
    document.getElementById("progress-tip").style.marginLeft = xPosPercent + "%";
    document.getElementById("progress").style.width = (xPosPercent+1.5) + "%";
    // Now Changing the current time of the song
    const currentTime = (xPosPercent/100)*duration;
    audio.currentTime = currentTime;
}

// Functions for Changing the current time of song by dragging the Progress-Tip

// Function for starting of drag event
// Here we have to check that the target which the user is dragging is Progress-tip and if it is so then set active to true, which means that drag event has started
// Also the current time of the song would be changed only if any song is in Playing State or in Paused State, but it should not be in notStarted State
var active = false;
function dragStart(e) {
    const dragItem = document.querySelector("#progress-tip");
    if (isPlaying !== "notStarted"){
        if (e.target === dragItem) {
            active = true;
        }
    }
}

// Function which will be executed during the dragging is going on
function drag(e) {
    // Defining the drag-container as Player-Div and drag-item as Progress-Tip
    const container = document.querySelector("#player-bar");
    // These are the CoOrdinates of the player div inside which progress of our song is going on
    const rect = container.getBoundingClientRect();
    // This is the total width of the player div
    const playerWidth = rect.width;
    if (active) {
        // As by default, the divs has a nature of preventing the events like drag, therefore, we use preventDefault() method to prevent their default nature of preventing the drag to occur
        e.preventDefault();
        // Finding the X- coordinate of the current drag
        var currentX;
        if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - rect.left;
        } else {
        currentX = e.clientX - rect.left;
        }
        // Setting the progress of current song according to the current X-coordinate
        setProgress(currentX, playerWidth);
    }
}

// Function for ending the drag
function dragEnd(e) {
    // At the time of ending the drag, we set active to false which indicates that drag is now over
    active = false;
}


// Exporting All The Functions So We Can Use Them Inside The Frame.jsx and Screen.jsx
export {newAudio, play, pause, stop, replay, setProgress, dragStart, drag, dragEnd, isPlaying};