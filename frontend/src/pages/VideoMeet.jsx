

// // import React, { useEffect, useRef, useState } from 'react';
// // import io from "socket.io-client";
// // import { Badge, IconButton, TextField, Box, Typography, Container, Grid, Paper } from '@mui/material';
// // import { Button } from '@mui/material';
// // import VideocamIcon from '@mui/icons-material/Videocam';
// // import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// // import CallEndIcon from '@mui/icons-material/CallEnd';
// // import MicIcon from '@mui/icons-material/Mic';
// // import MicOffIcon from '@mui/icons-material/MicOff';
// // import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// // import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
// // import ChatIcon from '@mui/icons-material/Chat';
// // import server from '../environment';
// // import styles from "../styles/videoComponent.module.css";

// // const server_url = server;

// // var connections = {};

// // const peerConfigConnections = {
// //     "iceServers": [
// //         { "urls": "stun:stun.l.google.com:19302" }
// //     ]
// // }

// // export default function VideoMeetComponent() {

// //     var socketRef = useRef();
// //     let socketIdRef = useRef();

// //     let localVideoref = useRef();

// //     let [videoAvailable, setVideoAvailable] = useState(true);

// //     let [audioAvailable, setAudioAvailable] = useState(true);

// //     let [video, setVideo] = useState([]);

// //     let [audio, setAudio] = useState();

// //     let [screen, setScreen] = useState();

// //     let [showModal, setModal] = useState(true);

// //     let [screenAvailable, setScreenAvailable] = useState();

// //     let [messages, setMessages] = useState([]);

// //     let [message, setMessage] = useState("");

// //     let [newMessages, setNewMessages] = useState(3);

// //     let [askForUsername, setAskForUsername] = useState(true);

// //     let [username, setUsername] = useState("");

// //     const videoRef = useRef([]);

// //     let [videos, setVideos] = useState([]);

// //     useEffect(() => {
// //         console.log("HELLO");
// //         getPermissions();
// //     }, []);

// //     let getDislayMedia = () => {
// //         if (screen) {
// //             if (navigator.mediaDevices.getDisplayMedia) {
// //                 navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
// //                     .then(getDislayMediaSuccess)
// //                     .then((stream) => { })
// //                     .catch((e) => console.log(e));
// //             }
// //         }
// //     };

// //     const getPermissions = async () => {
// //         try {
// //             const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
// //             if (videoPermission) {
// //                 setVideoAvailable(true);
// //                 console.log('Video permission granted');
// //             } else {
// //                 setVideoAvailable(false);
// //                 console.log('Video permission denied');
// //             }

// //             const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
// //             if (audioPermission) {
// //                 setAudioAvailable(true);
// //                 console.log('Audio permission granted');
// //             } else {
// //                 setAudioAvailable(false);
// //                 console.log('Audio permission denied');
// //             }

// //             if (navigator.mediaDevices.getDisplayMedia) {
// //                 setScreenAvailable(true);
// //             } else {
// //                 setScreenAvailable(false);
// //             }

// //             if (videoAvailable || audioAvailable) {
// //                 const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
// //                 if (userMediaStream) {
// //                     window.localStream = userMediaStream;
// //                     if (localVideoref.current) {
// //                         localVideoref.current.srcObject = userMediaStream;
// //                     }
// //                 }
// //             }
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     };

// //     useEffect(() => {
// //         if (video !== undefined && audio !== undefined) {
// //             getUserMedia();
// //             console.log("SET STATE HAS ", video, audio);
// //         }
// //     }, [video, audio]);

// //     let getMedia = () => {
// //         setVideo(videoAvailable);
// //         setAudio(audioAvailable);
// //         connectToSocketServer();
// //     };

// //     let getUserMediaSuccess = (stream) => {
// //         try {
// //             window.localStream.getTracks().forEach(track => track.stop());
// //         } catch (e) { console.log(e); }

// //         window.localStream = stream;
// //         localVideoref.current.srcObject = stream;

// //         for (let id in connections) {
// //             if (id === socketIdRef.current) continue;

// //             connections[id].addStream(window.localStream);

// //             connections[id].createOffer().then((description) => {
// //                 console.log(description);
// //                 connections[id].setLocalDescription(description)
// //                     .then(() => {
// //                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
// //                     })
// //                     .catch(e => console.log(e));
// //             });
// //         }

// //         stream.getTracks().forEach(track => track.onended = () => {
// //             setVideo(false);
// //             setAudio(false);

// //             try {
// //                 let tracks = localVideoref.current.srcObject.getTracks();
// //                 tracks.forEach(track => track.stop());
// //             } catch (e) { console.log(e); }

// //             let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
// //             window.localStream = blackSilence();
// //             localVideoref.current.srcObject = window.localStream;

// //             for (let id in connections) {
// //                 connections[id].addStream(window.localStream);

// //                 connections[id].createOffer().then((description) => {
// //                     connections[id].setLocalDescription(description)
// //                         .then(() => {
// //                             socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
// //                         })
// //                         .catch(e => console.log(e));
// //                 });
// //             }
// //         });
// //     };

// //     let getUserMedia = () => {
// //         if ((video && videoAvailable) || (audio && audioAvailable)) {
// //             navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
// //                 .then(getUserMediaSuccess)
// //                 .then((stream) => { })
// //                 .catch((e) => console.log(e));
// //         } else {
// //             try {
// //                 let tracks = localVideoref.current.srcObject.getTracks();
// //                 tracks.forEach(track => track.stop());
// //             } catch (e) { }
// //         }
// //     };

// //     let getDislayMediaSuccess = (stream) => {
// //         console.log("HERE");
// //         try {
// //             window.localStream.getTracks().forEach(track => track.stop());
// //         } catch (e) { console.log(e); }

// //         window.localStream = stream;
// //         localVideoref.current.srcObject = stream;

// //         for (let id in connections) {
// //             if (id === socketIdRef.current) continue;

// //             connections[id].addStream(window.localStream);

// //             connections[id].createOffer().then((description) => {
// //                 connections[id].setLocalDescription(description)
// //                     .then(() => {
// //                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
// //                     })
// //                     .catch(e => console.log(e));
// //             });
// //         }

// //         stream.getTracks().forEach(track => track.onended = () => {
// //             setScreen(false);

// //             try {
// //                 let tracks = localVideoref.current.srcObject.getTracks();
// //                 tracks.forEach(track => track.stop());
// //             } catch (e) { console.log(e); }

// //             let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
// //             window.localStream = blackSilence();
// //             localVideoref.current.srcObject = window.localStream;

// //             getUserMedia();
// //         });
// //     };

// //     let gotMessageFromServer = (fromId, message) => {
// //         var signal = JSON.parse(message);

// //         if (fromId !== socketIdRef.current) {
// //             if (signal.sdp) {
// //                 connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
// //                     if (signal.sdp.type === 'offer') {
// //                         connections[fromId].createAnswer().then((description) => {
// //                             connections[fromId].setLocalDescription(description).then(() => {
// //                                 socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }));
// //                             }).catch(e => console.log(e));
// //                         }).catch(e => console.log(e));
// //                     }
// //                 }).catch(e => console.log(e));
// //             }

// //             if (signal.ice) {
// //                 connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e));
// //             }
// //         }
// //     };

// //     let connectToSocketServer = () => {
// //         socketRef.current = io.connect(server_url, { secure: false });

// //         socketRef.current.on('signal', gotMessageFromServer);

// //         socketRef.current.on('connect', () => {
// //             socketRef.current.emit('join-call', window.location.href);
// //             socketIdRef.current = socketRef.current.id;

// //             socketRef.current.on('chat-message', addMessage);

// //             socketRef.current.on('user-left', (id) => {
// //                 setVideos((videos) => videos.filter((video) => video.socketId !== id));
// //             });

// //             socketRef.current.on('user-joined', (id, clients) => {
// //                 clients.forEach((socketListId) => {

// //                     connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
// //                     // Wait for their ice candidate       
// //                     connections[socketListId].onicecandidate = function (event) {
// //                         if (event.candidate != null) {
// //                             socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }));
// //                         }
// //                     };

// //                     // Wait for their video stream
// //                     connections[socketListId].onaddstream = (event) => {
// //                         console.log("BEFORE:", videoRef.current);
// //                         console.log("FINDING ID: ", socketListId);

// //                         let videoExists = videoRef.current.find(video => video.socketId === socketListId);

// //                         if (videoExists) {
// //                             console.log("FOUND EXISTING");

// //                             // Update the stream of the existing video
// //                             setVideos(videos => {
// //                                 const updatedVideos = videos.map(video =>
// //                                     video.socketId === socketListId ? { ...video, stream: event.stream } : video
// //                                 );
// //                                 videoRef.current = updatedVideos;
// //                                 return updatedVideos;
// //                             });
// //                         } else {
// //                             // Create a new video
// //                             console.log("CREATING NEW");
// //                             let newVideo = {
// //                                 socketId: socketListId,
// //                                 stream: event.stream,
// //                                 autoplay: true,
// //                                 playsinline: true
// //                             };

// //                             setVideos(videos => {
// //                                 const updatedVideos = [...videos, newVideo];
// //                                 videoRef.current = updatedVideos;
// //                                 return updatedVideos;
// //                             });
// //                         }
// //                     };

// //                     // Add the local video stream
// //                     if (window.localStream !== undefined && window.localStream !== null) {
// //                         connections[socketListId].addStream(window.localStream);
// //                     } else {
// //                         let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
// //                         window.localStream = blackSilence();
// //                         connections[socketListId].addStream(window.localStream);
// //                     }
// //                 });

// //                 if (id === socketIdRef.current) {
// //                     for (let id2 in connections) {
// //                         if (id2 === socketIdRef.current) continue;

// //                         try {
// //                             connections[id2].addStream(window.localStream);
// //                         } catch (e) { }

// //                         connections[id2].createOffer().then((description) => {
// //                             connections[id2].setLocalDescription(description)
// //                                 .then(() => {
// //                                     socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }));
// //                                 })
// //                                 .catch(e => console.log(e));
// //                         });
// //                     }
// //                 }
// //             });
// //         });
// //     };

// //     let silence = () => {
// //         let ctx = new AudioContext();
// //         let oscillator = ctx.createOscillator();
// //         let dst = oscillator.connect(ctx.createMediaStreamDestination());
// //         oscillator.start();
// //         ctx.resume();
// //         return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
// //     };

// //     let black = ({ width = 640, height = 480 } = {}) => {
// //         let canvas = Object.assign(document.createElement("canvas"), { width, height });
// //         canvas.getContext('2d').fillRect(0, 0, width, height);
// //         let stream = canvas.captureStream();
// //         return Object.assign(stream.getVideoTracks()[0], { enabled: false });
// //     };

// //     let handleVideo = () => {
// //         setVideo(!video);
// //     };

// //     let handleAudio = () => {
// //         setAudio(!audio);
// //     };

// //     useEffect(() => {
// //         if (screen !== undefined) {
// //             getDislayMedia();
// //         }
// //     }, [screen]);

// //     let handleScreen = () => {
// //         setScreen(!screen);
// //     };

// //     let handleEndCall = () => {
// //         try {
// //             let tracks = localVideoref.current.srcObject.getTracks();
// //             tracks.forEach(track => track.stop());
// //         } catch (e) { }
// //         window.location.href = "/";
// //     };

// //     let openChat = () => {
// //         setModal(true);
// //         setNewMessages(0);
// //     };

// //     let closeChat = () => {
// //         setModal(false);
// //     };

// //     let handleMessage = (e) => {
// //         setMessage(e.target.value);
// //     };

// //     const addMessage = (data, sender, socketIdSender) => {
// //         setMessages((prevMessages) => [
// //             ...prevMessages,
// //             { sender: sender, data: data }
// //         ]);
// //         if (socketIdSender !== socketIdRef.current) {
// //             setNewMessages((prevNewMessages) => prevNewMessages + 1);
// //         }
// //     };

// //     let sendMessage = () => {
// //         console.log(socketRef.current);
// //         socketRef.current.emit('chat-message', message, socketIdRef.current);
// //         setMessage("");
// //     };

// //     let connect = () => {
// //         setAskForUsername(false);
// //         getMedia();
// //     };

// //     return (
// //         <div>
// //             {askForUsername === true ?
// //                 <Container component="main" maxWidth="xs" sx={{ mt: 8, textAlign: 'center' }}>
// //                     <Box
// //                         sx={{
// //                             display: 'flex',
// //                             flexDirection: 'column',
// //                             alignItems: 'center',
// //                             backgroundColor: 'white',
// //                             padding: 4,
// //                             borderRadius: 2,
// //                             boxShadow: 3,
// //                         }}
// //                     >
// //                         <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
// //                             Enter into Lobby
// //                         </Typography>
// //                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%' }}>
// //                             <TextField
// //                                 id="outlined-basic"
// //                                 label="Username"
// //                                 value={username}
// //                                 onChange={e => setUsername(e.target.value)}
// //                                 variant="outlined"
// //                                 fullWidth
// //                                 sx={{ mr: 2 }}
// //                             />
// //                             <Button
// //                                 variant="contained"
// //                                 onClick={connect}
// //                                 sx={{ backgroundColor: '#FF9839', color: 'white', '&:hover': { backgroundColor: 'rgba(255, 152, 57, 0.8)' } }}
// //                             >
// //                                 Connect
// //                             </Button>
// //                         </Box>
// //                         <video ref={localVideoref} autoPlay muted style={{ width: '100%', borderRadius: '8px' }}></video>
// //                     </Box>
// //                 </Container> :
// //                 <div className={styles.meetVideoContainer}>
// //                     {showModal ? <div className={styles.chatRoom}>
// //                         <div className={styles.chatContainer}>
// //                             <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
// //                                 Chat
// //                             </Typography>
// //                             <div className={styles.chattingDisplay}>
// //                                 {messages.length !== 0 ? messages.map((item, index) => {
// //                                     console.log(messages);
// //                                     return (
// //                                         <div style={{ marginBottom: "20px" }} key={index}>
// //                                             <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.sender}</Typography>
// //                                             <Typography variant="body2">{item.data}</Typography>
// //                                         </div>
// //                                     );
// //                                 }) : <Typography variant="body2">No Messages Yet</Typography>}
// //                             </div>
// //                             <div className={styles.chattingArea} style={{ display: 'flex', alignItems: 'center', position: 'absolute', bottom: 0, width: '100%', padding: '10px', backgroundColor: 'white' }}>
// //                                 <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="outlined-basic" label="Enter Your chat" variant="outlined" fullWidth sx={{ mr: 2 }} />
// //                                 <Button variant='contained' onClick={sendMessage} sx={{ backgroundColor: '#FF9839', color: 'white', height: '56px', '&:hover': { backgroundColor: 'rgba(255, 152, 57, 0.8)' } }}>Send</Button>
// //                             </div>
// //                         </div>
// //                     </div> : <></>}
// //                     <div className={styles.buttonContainers}>
// //                         <IconButton onClick={handleVideo} style={{ color: "#FF9839" }}>
// //                             {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
// //                         </IconButton>
// //                         <IconButton onClick={handleEndCall} style={{ color: "red" }}>
// //                             <CallEndIcon />
// //                         </IconButton>
// //                         <IconButton onClick={handleAudio} style={{ color: "#FF9839" }}>
// //                             {audio === true ? <MicIcon /> : <MicOffIcon />}
// //                         </IconButton>
// //                         {screenAvailable === true ?
// //                             <IconButton onClick={handleScreen} style={{ color: "#FF9839" }}>
// //                                 {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
// //                             </IconButton> : <></>}
// //                         <Badge badgeContent={newMessages} max={999} color='orange'>
// //                             <IconButton onClick={() => setModal(!showModal)} style={{ color: "#FF9839" }}>
// //                                 <ChatIcon />
// //                             </IconButton>
// //                         </Badge>
// //                     </div>
// //                     <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted style={{ width: '100%', borderRadius: '8px' }}></video>
// //                     <div className={styles.conferenceView}>
// //                         {videos.map((video) => (
// //                             <div key={video.socketId} style={{ margin: '10px' }}>
// //                                 <video
// //                                     data-socket={video.socketId}
// //                                     ref={ref => {
// //                                         if (ref && video.stream) {
// //                                             ref.srcObject = video.stream;
// //                                         }
// //                                     }}
// //                                     autoPlay
// //                                     style={{ width: '100%', borderRadius: '8px' }}
// //                                 >
// //                                 </video>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             }
// //         </div>
// //     );
// // }


// import React, { useEffect, useRef, useState } from 'react';
// import io from "socket.io-client";
// import { Badge, IconButton, TextField, Box, Typography, Container, Grid, Paper } from '@mui/material';
// import { Button } from '@mui/material';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import CallEndIcon from '@mui/icons-material/CallEnd';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
// import ChatIcon from '@mui/icons-material/Chat';
// import server from '../environment';
// import styles from "../styles/videoComponent.module.css";

// const server_url = server;

// var connections = {};

// const peerConfigConnections = {
//     "iceServers": [
//         { "urls": "stun:stun.l.google.com:19302" }
//     ]
// }

// export default function VideoMeetComponent() {

//     var socketRef = useRef();
//     let socketIdRef = useRef();

//     let localVideoref = useRef();

//     let [videoAvailable, setVideoAvailable] = useState(true);

//     let [audioAvailable, setAudioAvailable] = useState(true);

//     let [video, setVideo] = useState([]);

//     let [audio, setAudio] = useState();

//     let [screen, setScreen] = useState();

//     let [showModal, setModal] = useState(true);

//     let [screenAvailable, setScreenAvailable] = useState();

//     let [messages, setMessages] = useState([]);

//     let [message, setMessage] = useState("");

//     let [newMessages, setNewMessages] = useState(3);

//     let [askForUsername, setAskForUsername] = useState(true);

//     let [username, setUsername] = useState("");

//     const videoRef = useRef([]);

//     let [videos, setVideos] = useState([]);

//     useEffect(() => {
//         console.log("HELLO");
//         getPermissions();
//     }, []);

//     let getDislayMedia = () => {
//         if (screen) {
//             if (navigator.mediaDevices.getDisplayMedia) {
//                 navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
//                     .then(getDislayMediaSuccess)
//                     .then((stream) => { })
//                     .catch((e) => console.log(e));
//             }
//         }
//     };

//     const getPermissions = async () => {
//         try {
//             const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoPermission) {
//                 setVideoAvailable(true);
//                 console.log('Video permission granted');
//             } else {
//                 setVideoAvailable(false);
//                 console.log('Video permission denied');
//             }

//             const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
//             if (audioPermission) {
//                 setAudioAvailable(true);
//                 console.log('Audio permission granted');
//             } else {
//                 setAudioAvailable(false);
//                 console.log('Audio permission denied');
//             }

//             if (navigator.mediaDevices.getDisplayMedia) {
//                 setScreenAvailable(true);
//             } else {
//                 setScreenAvailable(false);
//             }

//             if (videoAvailable || audioAvailable) {
//                 const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
//                 if (userMediaStream) {
//                     window.localStream = userMediaStream;
//                     if (localVideoref.current) {
//                         localVideoref.current.srcObject = userMediaStream;
//                     }
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (video !== undefined && audio !== undefined) {
//             getUserMedia();
//             console.log("SET STATE HAS ", video, audio);
//         }
//     }, [video, audio]);

//     let getMedia = () => {
//         setVideo(videoAvailable);
//         setAudio(audioAvailable);
//         connectToSocketServer();
//     };

//     let getUserMediaSuccess = (stream) => {
//         try {
//             window.localStream.getTracks().forEach(track => track.stop());
//         } catch (e) { console.log(e); }

//         window.localStream = stream;
//         localVideoref.current.srcObject = stream;

//         for (let id in connections) {
//             if (id === socketIdRef.current) continue;

//             connections[id].addStream(window.localStream);

//             connections[id].createOffer().then((description) => {
//                 console.log(description);
//                 connections[id].setLocalDescription(description)
//                     .then(() => {
//                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
//                     })
//                     .catch(e => console.log(e));
//             });
//         }

//         stream.getTracks().forEach(track => track.onended = () => {
//             setVideo(false);
//             setAudio(false);

//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks();
//                 tracks.forEach(track => track.stop());
//             } catch (e) { console.log(e); }

//             let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
//             window.localStream = blackSilence();
//             localVideoref.current.srcObject = window.localStream;

//             for (let id in connections) {
//                 connections[id].addStream(window.localStream);

//                 connections[id].createOffer().then((description) => {
//                     connections[id].setLocalDescription(description)
//                         .then(() => {
//                             socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
//                         })
//                         .catch(e => console.log(e));
//                 });
//             }
//         });
//     };

//     let getUserMedia = () => {
//         if ((video && videoAvailable) || (audio && audioAvailable)) {
//             navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
//                 .then(getUserMediaSuccess)
//                 .then((stream) => { })
//                 .catch((e) => console.log(e));
//         } else {
//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks();
//                 tracks.forEach(track => track.stop());
//             } catch (e) { }
//         }
//     };

//     let getDislayMediaSuccess = (stream) => {
//         console.log("HERE");
//         try {
//             window.localStream.getTracks().forEach(track => track.stop());
//         } catch (e) { console.log(e); }

//         window.localStream = stream;
//         localVideoref.current.srcObject = stream;

//         for (let id in connections) {
//             if (id === socketIdRef.current) continue;

//             connections[id].addStream(window.localStream);

//             connections[id].createOffer().then((description) => {
//                 connections[id].setLocalDescription(description)
//                     .then(() => {
//                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
//                     })
//                     .catch(e => console.log(e));
//             });
//         }

//         stream.getTracks().forEach(track => track.onended = () => {
//             setScreen(false);

//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks();
//                 tracks.forEach(track => track.stop());
//             } catch (e) { console.log(e); }

//             let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
//             window.localStream = blackSilence();
//             localVideoref.current.srcObject = window.localStream;

//             getUserMedia();
//         });
//     };

//     let gotMessageFromServer = (fromId, message) => {
//         var signal = JSON.parse(message);

//         if (fromId !== socketIdRef.current) {
//             if (signal.sdp) {
//                 connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
//                     if (signal.sdp.type === 'offer') {
//                         connections[fromId].createAnswer().then((description) => {
//                             connections[fromId].setLocalDescription(description).then(() => {
//                                 socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }));
//                             }).catch(e => console.log(e));
//                         }).catch(e => console.log(e));
//                     }
//                 }).catch(e => console.log(e));
//             }

//             if (signal.ice) {
//                 connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e));
//             }
//         }
//     };

//     let connectToSocketServer = () => {
//         socketRef.current = io.connect(server_url, { secure: false });

//         socketRef.current.on('signal', gotMessageFromServer);

//         socketRef.current.on('connect', () => {
//             socketRef.current.emit('join-call', window.location.href);
//             socketIdRef.current = socketRef.current.id;

//             socketRef.current.on('chat-message', addMessage);

//             socketRef.current.on('user-left', (id) => {
//                 setVideos((videos) => videos.filter((video) => video.socketId !== id));
//             });

//             socketRef.current.on('user-joined', (id, clients) => {
//                 clients.forEach((socketListId) => {

//                     connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
//                     // Wait for their ice candidate       
//                     connections[socketListId].onicecandidate = function (event) {
//                         if (event.candidate != null) {
//                             socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }));
//                         }
//                     };

//                     // Wait for their video stream
//                     connections[socketListId].onaddstream = (event) => {
//                         console.log("BEFORE:", videoRef.current);
//                         console.log("FINDING ID: ", socketListId);

//                         let videoExists = videoRef.current.find(video => video.socketId === socketListId);

//                         if (videoExists) {
//                             console.log("FOUND EXISTING");

//                             // Update the stream of the existing video
//                             setVideos(videos => {
//                                 const updatedVideos = videos.map(video =>
//                                     video.socketId === socketListId ? { ...video, stream: event.stream } : video
//                                 );
//                                 videoRef.current = updatedVideos;
//                                 return updatedVideos;
//                             });
//                         } else {
//                             // Create a new video
//                             console.log("CREATING NEW");
//                             let newVideo = {
//                                 socketId: socketListId,
//                                 stream: event.stream,
//                                 autoplay: true,
//                                 playsinline: true
//                             };

//                             setVideos(videos => {
//                                 const updatedVideos = [...videos, newVideo];
//                                 videoRef.current = updatedVideos;
//                                 return updatedVideos;
//                             });
//                         }
//                     };

//                     // Add the local video stream
//                     if (window.localStream !== undefined && window.localStream !== null) {
//                         connections[socketListId].addStream(window.localStream);
//                     } else {
//                         let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
//                         window.localStream = blackSilence();
//                         connections[socketListId].addStream(window.localStream);
//                     }
//                 });

//                 if (id === socketIdRef.current) {
//                     for (let id2 in connections) {
//                         if (id2 === socketIdRef.current) continue;

//                         try {
//                             connections[id2].addStream(window.localStream);
//                         } catch (e) { }

//                         connections[id2].createOffer().then((description) => {
//                             connections[id2].setLocalDescription(description)
//                                 .then(() => {
//                                     socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }));
//                                 })
//                                 .catch(e => console.log(e));
//                         });
//                     }
//                 }
//             });
//         });
//     };

//     let silence = () => {
//         let ctx = new AudioContext();
//         let oscillator = ctx.createOscillator();
//         let dst = oscillator.connect(ctx.createMediaStreamDestination());
//         oscillator.start();
//         ctx.resume();
//         return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
//     };

//     let black = ({ width = 640, height = 480 } = {}) => {
//         let canvas = Object.assign(document.createElement("canvas"), { width, height });
//         canvas.getContext('2d').fillRect(0, 0, width, height);
//         let stream = canvas.captureStream();
//         return Object.assign(stream.getVideoTracks()[0], { enabled: false });
//     };

//     let handleVideo = () => {
//         setVideo(!video);
//     };

//     let handleAudio = () => {
//         setAudio(!audio);
//     };

//     useEffect(() => {
//         if (screen !== undefined) {
//             getDislayMedia();
//         }
//     }, [screen]);

//     let handleScreen = () => {
//         setScreen(!screen);
//     };

//     let handleEndCall = () => {
//         try {
//             let tracks = localVideoref.current.srcObject.getTracks();
//             tracks.forEach(track => track.stop());
//         } catch (e) { }
//         window.location.href = "/";
//     };

//     let openChat = () => {
//         setModal(true);
//         setNewMessages(0);
//     };

//     let closeChat = () => {
//         setModal(false);
//     };

//     let handleMessage = (e) => {
//         setMessage(e.target.value);
//     };

//     const addMessage = (data, sender, socketIdSender) => {
//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: sender, data: data }
//         ]);
//         if (socketIdSender !== socketIdRef.current) {
//             setNewMessages((prevNewMessages) => prevNewMessages + 1);
//         }
//     };

//     let sendMessage = () => {
//         console.log(socketRef.current);
//         socketRef.current.emit('chat-message', message, username);
//         setMessage("");
//     };

//     let connect = () => {
//         setAskForUsername(false);
//         getMedia();
//     };

//     return (
//         <div>
//             {askForUsername === true ?
//                 <Container component="main" maxWidth="xs" sx={{ mt: 8, textAlign: 'center' }}>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                             backgroundColor: 'white',
//                             padding: 4,
//                             borderRadius: 2,
//                             boxShadow: 3,
//                         }}
//                     >
//                         <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
//                             Enter into Lobby
//                         </Typography>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%' }}>
//                             <TextField
//                                 id="outlined-basic"
//                                 label="Username"
//                                 value={username}
//                                 onChange={e => setUsername(e.target.value)}
//                                 variant="outlined"
//                                 fullWidth
//                                 sx={{ mr: 2 }}
//                             />
//                             <Button
//                                 variant="contained"
//                                 onClick={connect}
//                                 sx={{ backgroundColor: '#FF9839', color: 'white', '&:hover': { backgroundColor: 'rgba(255, 152, 57, 0.8)' } }}
//                             >
//                                 Connect
//                             </Button>
//                         </Box>
//                         <video ref={localVideoref} autoPlay muted style={{ width: '100%', borderRadius: '8px' }}></video>
//                     </Box>
//                 </Container> :
//                 <div className={styles.meetVideoContainer}>
//                     {showModal ? <div className={styles.chatRoom}>
//                         <div className={styles.chatContainer}>
//                             <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
//                                 Chat
//                             </Typography>
//                             <div className={styles.chattingDisplay} style={{ flex: 1, overflowY: 'auto', paddingBottom: '70px' }}>
//                                 {messages.length !== 0 ? messages.map((item, index) => {
//                                     console.log(messages);
//                                     return (
//                                         <div style={{ marginBottom: "20px" }} key={index}>
//                                             <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.sender}</Typography>
//                                             <Typography variant="body2">{item.data}</Typography>
//                                         </div>
//                                     );
//                                 }) : <Typography variant="body2">No Messages Yet</Typography>}
//                             </div>
//                             <div className={styles.chattingArea} style={{ display: 'flex', alignItems: 'center', position: 'absolute', bottom: 0, width: '100%', padding: '10px', backgroundColor: 'white' }}>
//                                 <TextField value={message} onChange={handleMessage} id="outlined-basic" label="Enter Your chat" variant="outlined" fullWidth sx={{ mr: 2 }} />
//                                 <Button variant='contained' onClick={sendMessage} sx={{ backgroundColor: '#FF9839', color: 'white', '&:hover': { backgroundColor: 'rgba(255, 152, 57, 0.8)' } }}>Send</Button>
//                             </div>
//                         </div>
//                     </div> : <></>}
//                     <div className={styles.buttonContainers}>
//                         <IconButton onClick={handleVideo} style={{ color: "#FF9839" }}>
//                             {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
//                         </IconButton>
//                         <IconButton onClick={handleEndCall} style={{ color: "red" }}>
//                             <CallEndIcon />
//                         </IconButton>
//                         <IconButton onClick={handleAudio} style={{ color: "#FF9839" }}>
//                             {audio === true ? <MicIcon /> : <MicOffIcon />}
//                         </IconButton>
//                         {screenAvailable === true ?
//                             <IconButton onClick={handleScreen} style={{ color: "#FF9839" }}>
//                                 {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
//                             </IconButton> : <></>}
//                         <Badge badgeContent={newMessages} max={999} color='orange'>
//                             <IconButton onClick={() => setModal(!showModal)} style={{ color: "#FF9839" }}>
//                                 <ChatIcon />
//                             </IconButton>
//                         </Badge>
//                     </div>
//                     <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted style={{ width: '100%', borderRadius: '8px' }}></video>
//                     <div className={styles.conferenceView} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                         {videos.map((video) => (
//                             <div key={video.socketId} style={{ width: '100%', height: '100%' }}>
//                                 <video
//                                     data-socket={video.socketId}
//                                     ref={ref => {
//                                         if (ref && video.stream) {
//                                             ref.srcObject = video.stream;
//                                         }
//                                     }}
//                                     autoPlay
//                                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                                 >
//                                 </video>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             }
//         </div>
//     );
// }


import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import { Badge, IconButton, TextField, Box, Typography, Container, Grid, Paper } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import server from '../environment';
import styles from "../styles/videoComponent.module.css";

const server_url = server;

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState([]);

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setModal] = useState(false);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([]);

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(0);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useRef([]);

    let [videos, setVideos] = useState([]);

    useEffect(() => {
        console.log("HELLO");
        getPermissions();
    }, []);

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e));
            }
        }
    };

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) {
                setVideoAvailable(true);
                console.log('Video permission granted');
            } else {
                setVideoAvailable(false);
                console.log('Video permission denied');
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
                console.log('Audio permission granted');
            } else {
                setAudioAvailable(false);
                console.log('Audio permission denied');
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
            console.log("SET STATE HAS ", video, audio);
        }
    }, [video, audio]);

    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    };

    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop());
        } catch (e) { console.log(e); }

        window.localStream = stream;
        localVideoref.current.srcObject = stream;

        for (let id in connections) {
            if (id === socketIdRef.current) continue;

            connections[id].addStream(window.localStream);

            connections[id].createOffer().then((description) => {
                console.log(description);
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
                    })
                    .catch(e => console.log(e));
            });
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            } catch (e) { console.log(e); }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            localVideoref.current.srcObject = window.localStream;

            for (let id in connections) {
                connections[id].addStream(window.localStream);

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
                        })
                        .catch(e => console.log(e));
                });
            }
        });
    };

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e));
        } else {
            try {
                let tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            } catch (e) { }
        }
    };

    let getDislayMediaSuccess = (stream) => {
        console.log("HERE");
        try {
            window.localStream.getTracks().forEach(track => track.stop());
        } catch (e) { console.log(e); }

        window.localStream = stream;
        localVideoref.current.srcObject = stream;

        for (let id in connections) {
            if (id === socketIdRef.current) continue;

            connections[id].addStream(window.localStream);

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
                    })
                    .catch(e => console.log(e));
            });
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            } catch (e) { console.log(e); }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            localVideoref.current.srcObject = window.localStream;

            getUserMedia();
        });
    };

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message);

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }));
                            }).catch(e => console.log(e));
                        }).catch(e => console.log(e));
                    }
                }).catch(e => console.log(e));
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e));
            }
        }
    };

    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false });

        socketRef.current.on('signal', gotMessageFromServer);

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href);
            socketIdRef.current = socketRef.current.id;

            socketRef.current.on('chat-message', addMessage);

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id));
            });

            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {

                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
                    // Wait for their ice candidate       
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }));
                        }
                    };

                    // Wait for their video stream
                    connections[socketListId].onaddstream = (event) => {
                        console.log("BEFORE:", videoRef.current);
                        console.log("FINDING ID: ", socketListId);

                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        if (videoExists) {
                            console.log("FOUND EXISTING");

                            // Update the stream of the existing video
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        } else {
                            // Create a new video
                            console.log("CREATING NEW");
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            };

                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        }
                    };

                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream);
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
                        window.localStream = blackSilence();
                        connections[socketListId].addStream(window.localStream);
                    }
                });

                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue;

                        try {
                            connections[id2].addStream(window.localStream);
                        } catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }));
                                })
                                .catch(e => console.log(e));
                        });
                    }
                }
            });
        });
    };

    let silence = () => {
        let ctx = new AudioContext();
        let oscillator = ctx.createOscillator();
        let dst = oscillator.connect(ctx.createMediaStreamDestination());
        oscillator.start();
        ctx.resume();
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
    };

    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height });
        canvas.getContext('2d').fillRect(0, 0, width, height);
        let stream = canvas.captureStream();
        return Object.assign(stream.getVideoTracks()[0], { enabled: false });
    };

    let handleVideo = () => {
        setVideo(!video);
    };

    let handleAudio = () => {
        setAudio(!audio);
    };

    useEffect(() => {
        if (screen !== undefined) {
            getDislayMedia();
        }
    }, [screen]);

    let handleScreen = () => {
        setScreen(!screen);
    };

    let handleEndCall = () => {
        try {
            let tracks = localVideoref.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        } catch (e) { }
        window.location.href = "/";
    };

    let toggleChat = () => {
        setModal(!showModal);
        if (!showModal) {
            setNewMessages(0);
        }
    };

    let handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };

    let sendMessage = () => {
        console.log(socketRef.current);
        socketRef.current.emit('chat-message', message, username);
        setMessage("");
    };

    let connect = () => {
        setAskForUsername(false);
        getMedia();
    };

    return (
        <div>
            {askForUsername === true ?
                <Container component="main" maxWidth="xs" sx={{ mt: 8, textAlign: 'center' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            padding: 4,
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    >
                        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
                            Enter into Lobby
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%' }}>
                            <TextField
                                id="outlined-basic"
                                label="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                variant="outlined"
                                fullWidth
                                sx={{ mr: 2 }}
                            />
                            <Button
                                variant="contained"
                                onClick={connect}
                                sx={{ backgroundColor: '#FF9839', color: 'white', '&:hover': { backgroundColor: 'rgba(255, 152, 57, 0.8)' } }}
                            >
                                Connect
                            </Button>
                        </Box>
                        <video ref={localVideoref} autoPlay muted style={{ width: '100%', borderRadius: '8px' }}></video>
                    </Box>
                </Container> :
                <div className={styles.meetVideoContainer}>
                    {showModal ? <div className={styles.chatRoom}>
                        <div className={styles.chatContainer}>
                            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                                Chat
                            </Typography>
                            <div className={styles.chattingDisplay} style={{ flex: 1, overflowY: 'auto', paddingBottom: '70px' }}>
                                {messages.length !== 0 ? messages.map((item, index) => {
                                    console.log(messages);
                                    return (
                                        <div style={{ marginBottom: "20px" }} key={index}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.sender}</Typography>
                                            <Typography variant="body2">{item.data}</Typography>
                                        </div>
                                    );
                                }) : <Typography variant="body2">No Messages Yet</Typography>}
                            </div>
                            <div className={styles.chattingArea} style={{ display: 'flex', alignItems: 'center', position: 'absolute', bottom: 0, width: '100%', padding: '10px', backgroundColor: 'white' }}>
                                <TextField value={message} onChange={handleMessage} id="outlined-basic" label="Enter Your chat" variant="outlined" fullWidth sx={{ mr: 2 }} />
                                <Button variant='contained' onClick={sendMessage} sx={{ backgroundColor: '#FF9839', color: 'white', '&:hover': { backgroundColor: 'rgba(255, 152, 57, 0.8)' } }}>Send</Button>
                            </div>
                        </div>
                    </div> : <></>}
                    <div className={styles.buttonContainers}>
                        <IconButton onClick={handleVideo} style={{ color: "#FF9839" }}>
                            {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
                        </IconButton>
                        <IconButton onClick={handleEndCall} style={{ color: "red" }}>
                            <CallEndIcon />
                        </IconButton>
                        <IconButton onClick={handleAudio} style={{ color: "#FF9839" }}>
                            {audio === true ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>
                        {screenAvailable === true ?
                            <IconButton onClick={handleScreen} style={{ color: "#FF9839" }}>
                                {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                            </IconButton> : <></>}
                        <Badge badgeContent={newMessages} max={999} color='orange'>
                            <IconButton onClick={toggleChat} style={{ color: "#FF9839" }}>
                                <ChatIcon />
                            </IconButton>
                        </Badge>
                    </div>
                    <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted style={{ width: '100%', borderRadius: '8px' }}></video>
                    <div className={styles.conferenceView}>
                        {videos.map((video) => (
                            <div key={video.socketId} style={{ margin: '10px' }}>
                                <video
                                    data-socket={video.socketId}
                                    ref={ref => {
                                        if (ref && video.stream) {
                                            ref.srcObject = video.stream;
                                        }
                                    }}
                                    autoPlay
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                >
                                </video>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}