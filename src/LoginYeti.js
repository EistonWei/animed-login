
import React, { Component } from 'react';
import { TweenMax, Expo} from "gsap/all";
import MorphSVGPlugin from "../src/MorphSVGPlugin.js"

class LoginYeti extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:""
        };
        this.email = null;
        this.emailTag = null;
        this.password = null;
        this.mySVG = null;
        //animation components
        this.armL = null;
        this.armR = null;
        this.eyeL = null;
        this.eyeR = null;
        this.nose = null;
        this.mouth = null;
        this.mouthBG = null;
        this.mouthSmallBG = null;
        this.mouthMediumBG = null;
        this.mouthLargeBG = null;
        this.mouthMaskPath = null;
        this.mouthOutline = null;
        this.tooth = null;
        this.tongue = null;
        this.chin = null;
        this.face = null;
        this.eyebrow = null;
        this.outerEarL = null;
        this.outerEarR = null;
        this.earHairL = null;
        this.earHairR = null;
        this.hair = null;
        this.mouthStatus = "small";
        //bind events
        this.getCoord = this.getCoord.bind(this);
        this.onEmailInput = this.onEmailInput.bind(this);
        this.onEmailFocus = this.onEmailFocus.bind(this);
        this.onEmailBlur = this.onEmailBlur.bind(this);
        this.onPasswordBlur = this.onPasswordBlur.bind(this);
        this.onPasswordFocus = this.onPasswordFocus.bind(this);
        this.coverEyes = this.coverEyes.bind(this);
        this.uncoverEyes = this.uncoverEyes.bind(this);
        this.resetFace = this.resetFace.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }
    
    handleSubmit = event => {
        event.preventDefault();
    }
    componentDidMount(){
        this.email.addEventListener("focus", this.onEmailFocus);
        this.email.addEventListener("blur", this.onEmailBlur);
        this.email.addEventListener("input", this.onEmailInput);
        this.password.addEventListener("focus", this.onPasswordFocus);
        this.password.addEventListener("blur", this.onPasswordBlur);
        TweenMax.set(this.armL, {
            x: -93,
            y: 220,
            rotation: 105,
            transformOrigin: "top left"
        });
        TweenMax.set(this.armR, {
            x: -93,
            y: 220,
            rotation: -105,
            transformOrigin: "top right"
        });

        // if the browser caches the login then move the helper up
        // this.email.focus();
    }
    // this will make the face follow the caret postion
    getCoord(e){	
        var eyeMaxHorizD = 20,
        eyeMaxVertD = 10,
        noseMaxHorizD = 23,
        noseMaxVertD = 10,
        carPos = this.email.selectionEnd,
        div = document.createElement("div"),
        span = document.createElement("span"),
        copyStyle = getComputedStyle(this.email),
        emailCoords = {},
        caretCoords = {},
        centerCoords = {};
        [].forEach.call(copyStyle, function(prop) {
        div.style[prop] = copyStyle[prop];
        });

        div.style.position = "absolute";
        document.body.appendChild(div);
        div.textContent = this.email.value.substr(0, carPos);
        span.textContent = this.email.value.substr(carPos) || ".";
        div.appendChild(span);

        emailCoords = this.getPosition(this.email); //console.log("emailCoords.x: " + emailCoords.x + ", emailCoords.y: " + emailCoords.y);
        caretCoords = this.getPosition(span); //console.log("caretCoords.x " + caretCoords.x + ", caretCoords.y: " + caretCoords.y);
        centerCoords = this.getPosition(this.mySVG); //console.log("centerCoords.x: " + centerCoords.x);
        var svgCoords = this.getPosition(this.mySVG);
        var screenCenter = centerCoords.x + this.mySVG.offsetWidth / 2; //console.log("screenCenter: " + screenCenter);
        var caretPos = caretCoords.x + emailCoords.x; //console.log("caretPos: " + caretPos);

        var dFromC = screenCenter - caretPos; //console.log("dFromC: " + dFromC);
        var pFromC = Math.round(caretPos / screenCenter * 100) / 100;
        if (pFromC < 1) {
        } else if (pFromC > 1) {
        pFromC -= 2;
        pFromC = Math.abs(pFromC);
        }

        var eyeDistH = -dFromC * 0.05;
        if (eyeDistH > eyeMaxHorizD) {
        eyeDistH = eyeMaxHorizD;
        } else if (eyeDistH < -eyeMaxHorizD) {
        eyeDistH = -eyeMaxHorizD;
        }

        var eyeLCoords = { x: svgCoords.x + 84, y: svgCoords.y + 76 };
        var eyeRCoords = { x: svgCoords.x + 113, y: svgCoords.y + 76 };
        var noseCoords = { x: svgCoords.x + 97, y: svgCoords.y + 81 };
        var mouthCoords = { x: svgCoords.x + 100, y: svgCoords.y + 100 };
        var eyeLAngle = this.getAngle(
        eyeLCoords.x,
        eyeLCoords.y,
        caretPos,
        emailCoords.y + 25
        );
        var eyeLX = Math.cos(eyeLAngle) * eyeMaxHorizD;
        var eyeLY = Math.sin(eyeLAngle) * eyeMaxVertD;
        var eyeRAngle = this.getAngle(
        eyeRCoords.x,
        eyeRCoords.y,
        caretPos,
        emailCoords.y + 25
        );
        var eyeRX = Math.cos(eyeRAngle) * eyeMaxHorizD;
        var eyeRY = Math.sin(eyeRAngle) * eyeMaxVertD;
        var noseAngle = this.getAngle(
        noseCoords.x,
        noseCoords.y,
        caretPos,
        emailCoords.y + 25
        );
        var noseX = Math.cos(noseAngle) * noseMaxHorizD;
        var noseY = Math.sin(noseAngle) * noseMaxVertD;
        var mouthAngle = this.getAngle(
        mouthCoords.x,
        mouthCoords.y,
        caretPos,
        emailCoords.y + 25
        );
        var mouthX = Math.cos(mouthAngle) * noseMaxHorizD;
        var mouthY = Math.sin(mouthAngle) * noseMaxVertD;
        var mouthR = Math.cos(mouthAngle) * 6;
        var chinX = mouthX * 0.8;
        var chinY = mouthY * 0.5;
        var chinS = 1 - dFromC * 0.15 / 100;
        if (chinS > 1) {
        chinS = 1 - (chinS - 1);
        }
        var faceX = mouthX * 0.3;
        var faceY = mouthY * 0.4;
        var faceSkew = Math.cos(mouthAngle) * 5;
        var eyebrowSkew = Math.cos(mouthAngle) * 25;
        var outerEarX = Math.cos(mouthAngle) * 4;
        var outerEarY = Math.cos(mouthAngle) * 5;
        var hairX = Math.cos(mouthAngle) * 6;
        var hairS = 1.2;
        // using tweenmax to animate the eyes nose
        TweenMax.to(this.eyeL, 1, { x: -eyeLX, y: -eyeLY, ease: Expo.easeOut });
        TweenMax.to(this.eyeR, 1, { x: -eyeRX, y: -eyeRY, ease: Expo.easeOut });
        TweenMax.to(this.nose, 1, {
        x: -noseX,
        y: -noseY,
        rotation: mouthR,
        transformOrigin: "center center",
        ease: Expo.easeOut
        });
        TweenMax.to(this.mouth, 1, {
        x: -mouthX,
        y: -mouthY,
        rotation: mouthR,
        transformOrigin: "center center",
        ease: Expo.easeOut
        });
        TweenMax.to(this.chin, 1, {
        x: -chinX,
        y: -chinY,
        scaleY: chinS,
        ease: Expo.easeOut
        });
        TweenMax.to(this.face, 1, {
        x: -faceX,
        y: -faceY,
        skewX: -faceSkew,
        transformOrigin: "center top",
        ease: Expo.easeOut
        });
        TweenMax.to(this.eyebrow, 1, {
        x: -faceX,
        y: -faceY,
        skewX: -eyebrowSkew,
        transformOrigin: "center top",
        ease: Expo.easeOut
        });
        TweenMax.to(this.outerEarL, 1, { x: outerEarX, y: -outerEarY, ease: Expo.easeOut });
        TweenMax.to(this.outerEarR, 1, { x: outerEarX, y: outerEarY, ease: Expo.easeOut });
        TweenMax.to(this.earHairL, 1, { x: -outerEarX, y: -outerEarY, ease: Expo.easeOut });
        TweenMax.to(this.earHairR, 1, { x: -outerEarX, y: outerEarY, ease: Expo.easeOut });
        TweenMax.to(this.hair, 1, {
        x: hairX,
        scaleY: hairS,
        transformOrigin: "center bottom",
        ease: Expo.easeOut
        });

        document.body.removeChild(div);
    }
    onEmailInput(e){
        this.getCoord(e);
        var value = e.target.value;
        var curEmailIndex = value.length;
    
        // very crude email validation for now to trigger effects
        if (curEmailIndex > 0) {
            if (this.mouthStatus === "small") {
                this.mouthStatus = "medium";
                TweenMax.to([this.mouthBG, this.mouthOutline, this.mouthMaskPath], 1, {
                    morphSVG: this.mouthMediumBG,
                    shapeIndex: 8,
                    ease: Expo.easeOut
                });
                TweenMax.to(this.tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
                TweenMax.to(this.tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
                TweenMax.to([this.eyeL, this.eyeR], 1, {
                    scaleX: 0.85,
                    scaleY: 0.85,
                    ease: Expo.easeOut
                });
            }
            if (value.includes("@")) {
                this.mouthStatus = "large";
                TweenMax.to([this.mouthBG, this.mouthOutline, this.mouthMaskPath], 1, {
                    morphSVG: this.mouthLargeBG,
                    ease: Expo.easeOut
                });
                TweenMax.to(this.tooth, 1, { x: 3, y: -2, ease: Expo.easeOut });
                TweenMax.to(this.tongue, 1, { y: 2, ease: Expo.easeOut });
                TweenMax.to([this.eyeL, this.eyeR], 1, {
                    scaleX: 0.65,
                    scaleY: 0.65,
                    ease: Expo.easeOut,
                    transformOrigin: "center center"
                });
            } else {
                this.mouthStatus = "medium";
                TweenMax.to([this.mouthBG, this.mouthOutline, this.mouthMaskPath], 1, {
                    morphSVG: this.mouthMediumBG,
                    ease: Expo.easeOut
                });
                TweenMax.to(this.tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
                TweenMax.to(this.tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
                TweenMax.to([this.eyeL, this.eyeR], 1, {
                    scaleX: 0.85,
                    scaleY: 0.85,
                    ease: Expo.easeOut
                });
            }
        } else {
            this.mouthStatus = "small";
            TweenMax.to([this.mouthBG, this.mouthOutline, this.mouthMaskPath], 1, {
                morphSVG: this.mouthSmallBG,
                shapeIndex: 9,
                ease: Expo.easeOut
            });
            TweenMax.to(this.tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
            TweenMax.to(this.tongue, 1, { y: 0, ease: Expo.easeOut });
            TweenMax.to([this.eyeL, this.eyeR], 1, { scaleX: 1, scaleY: 1, ease: Expo.easeOut });
        }
    }
    onEmailFocus(e){
        this.emailTag.classList.add("focusWithText");
        this.getCoord();
    }
    onEmailBlur(e){
        if (e.target.value === "") {
            this.emailTag.classList.remove("focusWithText");
        }
        this.resetFace();
    }
    onPasswordFocus(e){
        this.coverEyes();
    }
    onPasswordBlur(e){
        this.uncoverEyes();
    }
    coverEyes(){
        TweenMax.to(this.armL, 0.45, { x: -93, y: 2, rotation: 0, ease: Expo.easeOut });
        TweenMax.to(this.armR, 0.45, {
            x: -93,
            y: 2,
            rotation: 0,
            ease: Expo.easeOut,
            delay: 0.1
        });
    }
    uncoverEyes(){
        TweenMax.to(this.armL, 1.35, { y: 220, ease: Expo.easeOut });
        TweenMax.to(this.armL, 1.35, { rotation: 105, ease: Expo.easeOut, delay: 0.1 });
        TweenMax.to(this.armR, 1.35, { y: 220, ease: Expo.easeOut });
        TweenMax.to(this.armR, 1.35, { rotation: -105, ease: Expo.easeOut, delay: 0.1 });
    }
    resetFace(){
        TweenMax.to([this.eyeL, this.eyeR], 1, { x: 0, y: 0, ease: Expo.easeOut });
        TweenMax.to(this.nose, 1, { x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut });
        TweenMax.to(this.mouth, 1, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut });
        TweenMax.to(this.chin, 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
        TweenMax.to([this.face, this.eyebrow], 1, { x: 0, y: 0, skewX: 0, ease: Expo.easeOut });
        TweenMax.to([this.outerEarL, this.outerEarR, this.earHairL, this.earHairR, this.hair], 1, {
            x: 0,
            y: 0,
            scaleY: 1,
            ease: Expo.easeOut
        });
    }
    getAngle(x1,y1,x2,y2){
        var angle = Math.atan2(y1 - y2, x1 - x2);
        return angle;
    }
    getPosition(el){
        var xPos = 0;
        var yPos = 0;

        while (el) {
            if (el.tagName === "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;

                xPos += el.offsetLeft - xScroll + el.clientLeft;
                yPos += el.offsetTop - yScroll + el.clientTop;
            } else {
                // for all other non-BODY elements
                xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
                yPos += el.offsetTop - el.scrollTop + el.clientTop;
            }

            el = el.offsetParent;
        }
        return {
        x: xPos,
        y: yPos
        };
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
            <div ref={ svg => this.mySVG = svg } class="svgContainer">
                <svg  class="mySVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                    <defs>
                        <circle id="armMaskPath" cx="100" cy="100" r="100"/>
                    </defs>
                    <clipPath id="armMask">
                        <use href="#armMaskPath" overflow="visible"/>
                    </clipPath>
                    <circle cx="100" cy="100" r="100" fill="#a9ddf3"/>
                    <g transform="translate(20,2.5) rotate(10)">
                            <path fill="#FFBD14" d="M64.565,36.038c-0.022,0.238-0.045,0.475-0.075,0.709C64.52,36.513,64.543,36.275,64.565,36.038z"/>
                            <path fill="#FFBD14" d="M64.356,37.636c-0.039,0.227-0.075,0.454-0.121,0.677C64.281,38.089,64.317,37.862,64.356,37.636z"/>
                            <path fill="#FFBD14" d="M64.029,39.186c-0.053,0.212-0.104,0.425-0.164,0.633C63.925,39.611,63.976,39.398,64.029,39.186z"/>
                            <path fill="#FFBD14" d="M30.808,47.675c-0.197-0.186-0.386-0.379-0.572-0.576C30.422,47.295,30.611,47.489,30.808,47.675z"/>
                            <path fill="#FFBD14" d="M31.853,48.563c-0.212-0.164-0.417-0.333-0.618-0.507C31.436,48.231,31.641,48.4,31.853,48.563z"/>
                            <path fill="#FFBD14" d="M33.003,49.361c-0.232-0.145-0.461-0.294-0.682-0.45C32.542,49.067,32.771,49.216,33.003,49.361z"/>
                            <path fill="#FFBD14" d="M28.24,44.487c-0.24-0.397-0.466-0.808-0.678-1.231C27.774,43.679,28,44.09,28.24,44.487z"/>
                            <path fill="#FFBD14" d="M34.273,50.068c-0.262-0.129-0.523-0.261-0.773-0.403C33.75,49.807,34.011,49.938,34.273,50.068z"/>
                            <path fill="#FFBD14" d="M29.86,46.697c-0.191-0.218-0.371-0.446-0.55-0.675C29.489,46.251,29.669,46.479,29.86,46.697z"/>
                            <path fill="#FFBD14" d="M26.767,41.422c-0.109-0.286-0.217-0.572-0.316-0.867C26.549,40.85,26.657,41.137,26.767,41.422z"/>
                            <path fill="#FFBD14" d="M29.006,45.633c-0.215-0.294-0.417-0.602-0.613-0.914C28.59,45.032,28.792,45.339,29.006,45.633z"/>
                            <path fill="#FFBD14" d="M27.391,42.885c-0.147-0.309-0.292-0.62-0.425-0.942C27.1,42.265,27.244,42.576,27.391,42.885z"/>
                            <path fill="#FFBD14" d="M54.563,49.914c-0.241,0.099-0.489,0.193-0.739,0.286C54.074,50.107,54.322,50.013,54.563,49.914z"/>
                            <path fill="#FFBD14" d="M35.724,50.696c-0.321-0.121-0.641-0.243-0.946-0.38C35.083,50.453,35.402,50.575,35.724,50.696z"/>
                            <path fill="#FFBD14" d="M36.155,50.863c0.47,0.161,0.954,0.307,1.458,0.433c-0.956,6.112-2.373,13.375-4.537,14.618
                                c-0.738,0.424-3.611-0.98-5.544-1.386c-6.574-1.38-12.873-0.665-17.49,1.583c-0.383,0.187-4.248-0.707-4.949-2.608
                                c-0.428-1.16,0.418-3.765,0.64-4.739c0.102-0.449,0.112-0.874,0.053-1.255c-0.247,0.407-0.574,0.699-0.95,0.838
                                c-0.516-0.043-0.974-0.127-1.389-0.264c-0.006,0.173-0.019,0.352-0.043,0.537c-0.206,1.544-1.743,3.592-1.516,5.723
                                c0.442,4.174,4.288,4.409,4.059,4.617c-1.791,1.615-3.308,5.324-3.728,7.598c-0.835,4.521,1.831,23.459,2.407,24.545
                                c0.882,1.664,4.012,1.648,5.122,0.773c1.31-1.031,3.492-8.744,5.473-9.777c2.52-1.313,4.512-0.26,7.2,1.195
                                c1.299,0.703,4.13,9.563,4.908,10.34c0.701,0.703,3.801,0.844,4.676-0.422c1.948-2.822,0.8-7.545,2.861-10.271
                                c1.418,1.268,2.965,9.432,3.276,10.131c0.625,1.406,4.345,1.266,5.487-0.596c0.353-0.576,2.361-17.533,2.552-18.961
                                c0.319-2.371,5.413-24.015,6.205-32.822c0.137-0.041,0.257-0.092,0.392-0.134c-1.623,0.512-3.418,0.903-5.432,1.137
                                C42.844,52.218,39.153,51.891,36.155,50.863z M11.343,67.664c-0.19-1.079,0.571-2.116,1.702-2.317
                                c1.131-0.201,2.203,0.509,2.395,1.587c0.191,1.078-0.572,2.115-1.703,2.317C12.605,69.452,11.534,68.741,11.343,67.664z
                                 M15.706,73.465c-0.775,0.139-1.508-0.348-1.639-1.086c-0.13-0.736,0.391-1.446,1.164-1.583c0.775-0.138,1.509,0.347,1.638,1.085
                                C17,72.619,16.479,73.328,15.706,73.465z M20.677,70.738c-1.123,0.2-2.187-0.506-2.377-1.577c-0.188-1.071,0.568-2.101,1.691-2.301
                                c1.124-0.2,2.187,0.506,2.376,1.576C22.557,69.507,21.801,70.539,20.677,70.738z M25.272,73.465
                                c-0.775,0.139-1.508-0.348-1.638-1.086c-0.13-0.736,0.391-1.446,1.165-1.583c0.774-0.138,1.507,0.347,1.639,1.085
                                C26.566,72.619,26.045,73.328,25.272,73.465z M28.19,69.16c-1.078,0.191-2.099-0.486-2.282-1.514
                                c-0.182-1.028,0.545-2.017,1.623-2.208c1.079-0.192,2.099,0.485,2.282,1.513C29.995,67.979,29.269,68.967,28.19,69.16z"/>
                            <path fill="#FFBD14" d="M56.183,49.162c-0.215,0.113-0.441,0.219-0.666,0.326C55.742,49.381,55.967,49.275,56.183,49.162z"/>
                            <path fill="#FFBD14" d="M61.135,45.167c-0.082,0.101-0.176,0.194-0.26,0.294C60.959,45.361,61.053,45.268,61.135,45.167z"/>
                            <path fill="#FFBD14" d="M62.085,43.824c-0.023,0.037-0.042,0.077-0.065,0.113C62.043,43.901,62.062,43.861,62.085,43.824z"/>
                            <path fill="#FFBD14" d="M63.575,40.693c-0.066,0.189-0.126,0.382-0.2,0.568C63.448,41.076,63.508,40.883,63.575,40.693z"/>
                            <path fill="#FFBD14" d="M62.97,42.178c-0.071,0.152-0.133,0.309-0.209,0.458C62.837,42.487,62.899,42.33,62.97,42.178z"/>
                            <path fill="#FFBD14" d="M60.116,46.303c-0.129,0.13-0.272,0.25-0.407,0.376C59.843,46.553,59.987,46.433,60.116,46.303z"/>
                            <path fill="#FFBD14" d="M57.645,48.306c-0.189,0.124-0.39,0.24-0.588,0.358C57.254,48.546,57.456,48.43,57.645,48.306z"/>
                            <path fill="#FFBD14" d="M58.955,47.351c-0.162,0.131-0.337,0.253-0.506,0.38C58.618,47.604,58.793,47.482,58.955,47.351z"/>
                            <path fill="#F15A29" d="M21.131,19.025c-3.958,1.009-4.415,4.583-3.115,6.462c1.254,1.812,3.283-0.045,5.37-0.589
                                c0.85-0.222,2.2,0.005,2.754-0.771C27.687,21.963,23.695,18.372,21.131,19.025z"/>
                            <path fill="#FFBD14" d="M64.013,11.07c-3.172,0-6.914,3.51-8.57,5.247c-0.868-0.602-1.76-1.148-2.663-1.634
                                c0.399-0.543,0.713-1.045,0.897-1.417c0.601-1.218,2.029-4.329,2.818-6.055c1.789-0.216,3.176-1.741,3.176-3.593
                                C59.671,1.62,58.055,0,56.061,0c-1.994,0-3.61,1.62-3.61,3.619c0,0.992,0.398,1.89,1.044,2.545
                                c-0.82,1.789-2.116,4.609-2.635,5.661c-0.286,0.578-0.62,1.076-0.974,1.514c-2.878-1.129-5.66-1.608-7.779-1.308
                                c-2.578,0.366-5.795,2.111-8.738,4.736c-0.098-0.099-0.197-0.193-0.293-0.299c-0.786-0.872-2.796-3.234-4.067-4.734
                                c0.443-0.804,0.583-1.777,0.316-2.732c-0.541-1.923-2.535-3.044-4.454-2.502c-1.919,0.542-3.037,2.541-2.497,4.465
                                c0.5,1.783,2.249,2.874,4.028,2.595c1.227,1.447,3.443,4.054,4.351,5.063c0.103,0.114,0.234,0.244,0.378,0.38
                                c-0.303,0.338-0.597,0.687-0.886,1.042c-2.075-1.291-6.468-3.681-9.495-2.91c-6.602,1.681-7.408,7-5.226,9.872
                                c2.104,2.77,5.509-0.067,9.013-0.898c0.64-0.152,1.4-0.207,2.15-0.308c-1.274,2.909-1.904,6.063-1.48,9.243
                                c0.251,1.89,0.642,3.658,1.176,5.294c-0.206-0.954,6.462-8.907,17.943-10.714c11.448-1.804,20.18,5.133,20.282,5.874
                                c0.136-1.918,0.063-3.932-0.214-6.016c-0.428-3.212-1.885-6.098-3.903-8.56c0.717-0.087,1.43-0.211,2.059-0.221
                                c3.6-0.059,7.596,1.85,8.955-1.354C72.913,16.025,70.825,11.07,64.013,11.07z M26.141,24.127c-0.555,0.776-1.905,0.549-2.754,0.771
                                c-2.087,0.544-4.116,2.401-5.37,0.589c-1.299-1.88-0.843-5.453,3.115-6.462C23.695,18.372,27.687,21.963,26.141,24.127z
                                 M35.195,31.608c-1.599,0.284-3.115-0.72-3.384-2.246c-0.27-1.523,0.808-2.991,2.406-3.276c1.6-0.285,3.115,0.72,3.386,2.245
                                S36.795,31.323,35.195,31.608z M54.194,29.024c-1.6,0.285-3.115-0.72-3.384-2.245s0.808-2.992,2.406-3.276
                                c1.6-0.284,3.115,0.72,3.385,2.245C56.872,27.272,55.794,28.739,54.194,29.024z M68.713,18.49c-0.77,2.066-3.193,0.767-5.348,0.755
                                c-0.879-0.005-2.13,0.547-2.858-0.067c-2.031-1.717,0.955-6.182,3.601-6.182C68.191,12.997,69.512,16.347,68.713,18.49z"/>
                            <path fill="#F15A29" d="M64.108,12.996c-2.646,0-5.632,4.465-3.601,6.182c0.728,0.615,1.979,0.063,2.858,0.067
                                c2.155,0.012,4.578,1.311,5.348-0.755C69.512,16.347,68.191,12.997,64.108,12.996z"/>
                            
                                <ellipse transform="matrix(-0.1743 -0.9847 0.9847 -0.1743 -33.5539 106.4607)" fill="#F15A29" cx="27.861" cy="67.299" rx="1.89" ry="1.983"/>
                            <path fill="#F15A29" d="M44.325,29.624c-11.481,1.807-18.149,9.76-17.943,10.714c0.001,0.005-0.004,0.018-0.002,0.022
                                c0.022,0.066,0.049,0.128,0.071,0.195c0.099,0.295,0.207,0.582,0.316,0.867c0.066,0.174,0.129,0.351,0.2,0.521
                                c0.133,0.322,0.278,0.633,0.425,0.942c0.058,0.123,0.11,0.25,0.171,0.37c0.212,0.423,0.438,0.834,0.678,1.231
                                c0.049,0.08,0.104,0.154,0.153,0.233c0.196,0.312,0.398,0.619,0.613,0.914c0.097,0.134,0.203,0.259,0.304,0.388
                                c0.179,0.229,0.359,0.458,0.55,0.675c0.121,0.138,0.25,0.269,0.375,0.402c0.186,0.197,0.375,0.391,0.572,0.576
                                c0.139,0.131,0.282,0.257,0.427,0.382c0.201,0.174,0.406,0.343,0.618,0.507c0.153,0.119,0.309,0.235,0.468,0.348
                                c0.221,0.156,0.45,0.305,0.682,0.45c0.165,0.103,0.328,0.206,0.498,0.303c0.25,0.142,0.511,0.274,0.773,0.403
                                c0.167,0.083,0.332,0.17,0.504,0.248c0.305,0.137,0.625,0.259,0.946,0.38c0.145,0.054,0.283,0.116,0.432,0.167
                                c2.998,1.028,6.688,1.355,11.191,0.832c2.014-0.234,3.81-0.625,5.432-1.137c0.358-0.113,0.706-0.232,1.045-0.358
                                c0.25-0.093,0.499-0.187,0.739-0.286c0.328-0.135,0.644-0.279,0.954-0.426c0.225-0.107,0.451-0.212,0.666-0.326
                                c0.302-0.159,0.589-0.327,0.874-0.498c0.198-0.119,0.399-0.234,0.588-0.358c0.28-0.184,0.543-0.379,0.804-0.575
                                c0.169-0.126,0.344-0.249,0.506-0.38c0.265-0.216,0.509-0.444,0.754-0.672c0.135-0.126,0.278-0.246,0.407-0.376
                                c0.269-0.271,0.516-0.556,0.759-0.842c0.084-0.1,0.178-0.193,0.26-0.294c0.317-0.396,0.613-0.806,0.885-1.229
                                c0.024-0.037,0.042-0.076,0.065-0.113c0.243-0.386,0.47-0.781,0.676-1.188c0.076-0.149,0.138-0.307,0.209-0.458
                                c0.141-0.302,0.282-0.604,0.405-0.917c0.073-0.186,0.133-0.379,0.2-0.568c0.102-0.289,0.204-0.577,0.29-0.874
                                c0.061-0.208,0.111-0.421,0.164-0.633c0.073-0.289,0.146-0.578,0.207-0.874c0.045-0.223,0.082-0.45,0.121-0.677
                                c0.049-0.294,0.097-0.589,0.135-0.889c0.029-0.234,0.052-0.472,0.075-0.709c0.016-0.172,0.042-0.34,0.054-0.514
                                c0-0.005-0.012-0.02-0.013-0.026C64.505,34.757,55.773,27.82,44.325,29.624z M49.066,43.57c-0.177,0.335-1.921,4.685-5.722,4.068
                                c-3.801-0.617-5.439-5.627-5.536-5.895c-0.097-0.267,0.383-0.51,0.524-0.227c0.135,0.274,1.633,4.292,4.794,5.034l0.611,0.099
                                c3.168,0.281,4.88-3.198,5.016-3.442C48.893,42.953,49.244,43.234,49.066,43.57z"/>
                            <path fill="#FFFFFF" d="M34.217,26.087c-1.598,0.285-2.675,1.752-2.406,3.276c0.269,1.525,1.785,2.529,3.384,2.246
                                c1.6-0.285,2.678-1.752,2.407-3.277S35.817,25.802,34.217,26.087z M35.821,29.459c-0.829,0.148-1.615-0.373-1.753-1.163
                                c-0.141-0.79,0.418-1.55,1.247-1.697c0.829-0.148,1.613,0.373,1.754,1.163C37.208,28.552,36.65,29.312,35.821,29.459z"/>
                            
                                <ellipse transform="matrix(-0.1745 -0.9847 0.9847 -0.1745 14.1756 67.9424)" fill="#662D3D" cx="35.568" cy="28.029" rx="1.452" ry="1.524"/>
                            <path fill="#FFFFFF" d="M53.216,23.503c-1.598,0.285-2.676,1.752-2.406,3.276s1.784,2.529,3.384,2.245
                                c1.6-0.285,2.678-1.751,2.407-3.276C56.331,24.223,54.815,23.219,53.216,23.503z M54.82,26.875
                                c-0.829,0.148-1.615-0.373-1.753-1.163c-0.141-0.79,0.417-1.55,1.246-1.697c0.829-0.148,1.614,0.373,1.755,1.163
                                C56.206,25.968,55.649,26.728,54.82,26.875z"/>
                            
                                <ellipse transform="matrix(-0.1748 -0.9846 0.9846 -0.1748 39.053 83.6186)" fill="#662D3D" cx="54.566" cy="25.445" rx="1.452" ry="1.523"/>
                            
                                <ellipse transform="matrix(-0.1742 -0.9847 0.9847 -0.1742 -43.8699 100.8087)" fill="#F15A29" cx="20.334" cy="68.799" rx="1.969" ry="2.066"/>
                            
                                <ellipse transform="matrix(-0.1747 -0.9846 0.9846 -0.1747 -41.6121 109.3814)" fill="#F15A29" cx="25.035" cy="72.13" rx="1.356" ry="1.423"/>
                            
                                <ellipse transform="matrix(-0.175 -0.9846 0.9846 -0.175 -52.8405 99.9858)" fill="#F15A29" cx="15.468" cy="72.13" rx="1.356" ry="1.423"/>
                            
                                <ellipse transform="matrix(0.9845 -0.1753 0.1753 0.9845 -11.5922 3.3903)" fill="#F15A29" cx="13.391" cy="67.299" rx="2.08" ry="1.983"/>
                            <path fill="#662D3D" d="M48.754,43.207c-0.136,0.245-1.848,3.723-5.016,3.442l-0.611-0.099c-3.161-0.742-4.659-4.759-4.794-5.034
                                c-0.141-0.283-0.622-0.041-0.524,0.227c0.097,0.268,1.735,5.278,5.536,5.895c3.801,0.616,5.545-3.733,5.722-4.068
                                C49.244,43.234,48.893,42.953,48.754,43.207z"/>
                            <path fill="#662D3D" d="M5.787,57.509c0.507-0.835,0.648-2.198-0.02-4.013c-0.512-1.392-1.631-2.73-2.596-3.083
                                c0.362,0.462,0.011,1.021,0.051,1.391c-0.116-1.279-0.773-1.971-0.879-2.059c-0.74-0.614-1.098-0.853-1.156-1.45
                                c-1.135,0.935-1.654,3.633-0.661,6.332c0.753,2.046,1.616,3.024,2.922,3.456c0.415,0.137,0.873,0.221,1.389,0.264
                                C5.213,58.208,5.541,57.916,5.787,57.509z"/>
                </g>
 
                    <g class="body">
                        {this.props.animal.body}
                    </g>
                    <g class="earL">
                        <g ref={ g => this.outerEarL = g } class="outerEar" >
                            {this.props.animal.outerEarL}
                        </g>
                        <g ref={ g => this.earHairL = g } class="earHair">
                            {this.props.animal.earHairL}
                        </g>
                    </g>
                    <g class="earR">
                        <g ref={ g => this.outerEarR = g } class="outerEar" >
                            {this.props.animal.outerEarR}
                        </g>
                        <g ref={ g => this.earHairR = g } class="earHair">
                            {this.props.animal.earHairR}
                        </g>
                    </g>
                    <g class="chin" ref={ path => this.chin = path }>
                        {this.props.animal.chin}
                    </g>
                    <g class="face" ref={ path => this.face = path }> 
                        {this.props.animal.face}
                    </g>
                    <g class="hair" ref={ path => this.hair = path }>
                        {this.props.animal.hair}
                    </g>
                    <g class="eyebrow" ref={ g => this.eyebrow = g }>
                        {this.props.animal.eyebrow}
                    </g>
                    <g class="eyeL" ref={ g => this.eyeL = g }>
                        {this.props.animal.eyeL}
                    </g>
                    <g class="eyeR" ref={ g => this.eyeR = g }>
                        {this.props.animal.eyeR}
                    </g>
                    <g class="mouth" ref={ g => this.mouth = g }>
                        <path class="mouthBG"  ref={ g => this.mouthBG = g } fill="#617E92" d={this.props.animal.mouthBG}/>
                        <path style={{display: "none"}}  ref={ g => this.mouthSmallBG = g } class="mouthSmallBG" fill="#617E92" d={this.props.animal.mouthSmallBG}/>
                        <path style={{display: "none"}}  ref={ g => this.mouthMediumBG = g } class="mouthMediumBG" d={this.props.animal.mouthMediumBG}/>
                        <path style={{display: "none"}}  ref={ g => this.mouthLargeBG = g } class="mouthLargeBG" d={this.props.animal.mouthLargeBG} fill="#617e92" stroke="#3a5e77" stroke-linejoin="round" stroke-width="2.5"/>
                        <defs>
                            <path id="mouthMaskPath" ref={ g => this.mouthMaskPath = g } d={this.props.animal.mouthMaskPath}/>
                        </defs>
                        <clipPath id="mouthMask">
                            <use href="#mouthMaskPath" overflow="visible"/>
                        </clipPath>
                        <g clip-path="url(#mouthMask)">
                            <g class="tongue"  ref={ g => this.tongue = g }>
                                <circle cx="100" cy="107" r="8" fill="#cc4a6c"/>
                                <ellipse class="tongueHighlight" cx="100" cy="100.5" rx="3" ry="1.5" opacity=".1" fill="#fff"/>
                            </g>
                        </g>
                        <path clip-path="url(#mouthMask)" class="tooth" ref={ g => this.tooth = g } style={{fill:"#FFFFFF"}} d="M106,97h-4c-1.1,0-2-0.9-2-2v-2h8v2C108,96.1,107.1,97,106,97z"/>
                        <path class="mouthOutline" ref={ g => this.mouthOutline = g } fill="none" stroke="#3A5E77" stroke-width="2.5" stroke-linejoin="round" d={this.props.animal.mouthOutline}/>
                    </g>
                    <g class="nose" ref={ g => this.nose = g }>
                        {this.props.animal.nose}
                    </g>
                    <g class="arms" clip-path="url(#armMask)">
                        <g class="armL" ref={ g => this.armL = g }>
                            {this.props.animal.armL}
                        </g>
                        <g class="armR" ref={ g => this.armR = g }>>
                            {this.props.animal.armR}
                        </g>				
                    </g>
                </svg>
            </div>
            <div ref={ div => this.emailTag = div } class="inputGroup inputGroup1">
            <label for="email1" >Email</label>
            <p class="helper helper1">email@domain.com</p>
            <input type="text" ref={ g => this.email = g } id="email" class="email" maxlength="256"/>
            <span class="indicator"></span>
            </div>
            <div class="inputGroup inputGroup2">
            <label for="password">Password</label>
            <input type="password" id="password" class="password" ref={ g => this.password = g }/>
            </div>
            <div class="inputGroup inputGroup3">
            <button id="login">Log in</button>
            </div>	
            </form>
        );
    }
}
export default LoginYeti;