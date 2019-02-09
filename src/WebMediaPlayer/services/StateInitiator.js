const DEFAULT_WIDTH = 560 //560;
const DEFAULT_HEIGHT = 315 //315;
const DEFAULT_ALLOW_FULL_FRAME = true;
const DEFAULT_VOLUME = 1.0;

const initSlideshowPlayerState = (options) => {
    let state = {};
    state.hasAudio = false;
    state.hasSlideshow = true;
    state.hasVideo = false;
    if (options.slideshow.slice(-1)[0].endTime === undefined) {
        throw new Error("No time specified for slideshow");
    }
    state.duration = options.slideshow.slice(-1)[0].endTime;
    state.slideshow = options.slideshow;
    return state;
}

const initAudioSlideshowPlayerState = (options) => {
    let state = {};
    state.hasAudio = true;
    state.hasSlideshow = true;
    state.hasVideo = false;
    if (options.slideshow.slice(-1)[0].endTime === undefined) {
        throw new Error("No time specified for slideshow");
    }
    state.duration = options.slideshow.slice(-1)[0].endTime;
    state.slideshow = options.slideshow;
    state.audio = options.audio;
    return state;
}

const initVideoPlayerState = (options) => {
    let state = {};
    state.hasVideo = true;
    state.hasAudio = false;
    state.hasSlideshow = false;
    state.duration = 0;
    state.video = options.video;
    return state;
}

const getInitState = (options) => {
    if (options === undefined) {
        throw new Error("No options given to the player !");
    }
    let state = {};
    if (options.hasOwnProperty("video")) {
        if (options.hasOwnProperty("audio")) {
            throw new Error("Combination impossible");
        } else if (options.hasOwnProperty("imageSequence")) {
            throw new Error("Combination impossible");
        } else {
            state = initVideoPlayerState(options);
        }
    } else if (options.hasOwnProperty("slideshow")) {
        if (options.hasOwnProperty("audio")) {
            state = initAudioSlideshowPlayerState(options);
        } else if (options.hasOwnProperty("video")) {
            throw new Error("Combination impossible");
        } else {
            state = initSlideshowPlayerState(options);
        }
    } else {
        throw new Error("Combination impossible");
    }

    if (options.hasOwnProperty("height")) {
        state.height = options.height;
    } else {
        state.height = DEFAULT_HEIGHT;
    }
    if (options.hasOwnProperty("width")) {
        state.width = options.width;
    } else {
        state.width = DEFAULT_WIDTH;
    }
    if (options.hasOwnProperty("volume")) {
        state.volume = options.volume;
        state.pastVolume = options.volume;

    } else {
        state.volume = DEFAULT_VOLUME;
        state.pastVolume = DEFAULT_VOLUME;
    }
    if (options.hasOwnProperty("allowFullFrame")) {
        state.allowFullFrame = options.allowFullFrame;
    } else {
        state.allowFullFrame = DEFAULT_ALLOW_FULL_FRAME;
    }
    if (options.hasOwnProperty("currentTime")) {
        state.currentTime = options.currentTime;
    } else {
        state.currentTime = 0;
    }
    if (options.hasOwnProperty("color")) {
        state.color = options.color;
    } else {
        state.color = "#4ea6ff";
    }
    if (options.hasOwnProperty("logo")) {
        if (!options.logo.hasOwnProperty('img'))
          throw new Error("You need to specify the img property of the logo");
        state.logo = options.logo;
    }
    if (options.hasOwnProperty("buttons")) {
        state.buttons = [];
        for (let i = 0; i < options.buttons.length; ++i) {
            if (!options.buttons[i].hasOwnProperty('img'))
                throw new Error("You need to specify the img property of the button");
            state.buttons.push(options.buttons[i])
        }
    }
    state.thumbnail = options.thumbnail;
    state.title = options.title;
    state.link = options.link;
    state.isPlayerHighlighted = false;
    state.isLoading = false;
    state.isInitialized = false;
    state.isLargePlayButtonHighlighted = false;
    state.isPlaying = false;
    state.isReadingTerminated = false;
    state.showVolumeSlider = true;
    state.isFullscreen = false;
    state.isFullscreenActivated = false;
    state.highlightProgressBar = false;
    state.allowUnhighlightProgressBar = true;
    state.volumeSliderLeftMargin = "calculateMe!";
    state.allowMouseLeaveVolumeSlider = true;
    state.showMenus = true;
    state.allowMenuHiding = true;
    state.showCursor = true;
    state.timeLastUserAction = new Date();
    return state;
}

export { getInitState }