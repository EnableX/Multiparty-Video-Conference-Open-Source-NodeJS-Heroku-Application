let url = prompt("Please enter domain url", "URL");
if (url != null) {
    document.getElementById("frameElement").src =url;
}

var isRoomSubscription = false;
var isLiveStreamSubscription = false;
var isStreamUpdatesSubscription = false;
var toggleLiveStream = false;
var toggleSubscribe = false;
var toggleVideo = false;
var toggleAudio = false;
const frameElement = document.querySelector('#frameElement');
const videoBttnId = document.querySelector('#video_btn');
const audioBttnId = document.querySelector('#audio_btn');
const disconnectBttnId = document.querySelector('#disconnect_btn');
const destroyBttnId = document.querySelector('#destroy_btn');
const changeLayoutRtmpLeaderId = document.querySelector('#change_layout_rtmp_leader');
const changeLayoutRtmpGalleryId = document.querySelector('#change_layout_rtmp_gallery');
const changeLayoutAllLeaderId = document.querySelector('#change_layout_all_leader');
const changeLayoutAllGalleryId = document.querySelector('#change_layout_all_gallery');
const sendSignalling = document.querySelector('#sendSignalling');

document.getElementById('subscribe_btn').addEventListener('click', function () {
    if (toggleSubscribe === false) {
        const subscribeMssg = JSON.stringify({
            action: 'subscribe-notification',
            data: [
                'room-connection',
                'stream-updates',
                'live-streaming',
                "messaging"
            ]
        });
        console.log("subscribeMssg==", JSON.parse(subscribeMssg).data);
        localStorage.setItem('subscribeArray', JSON.stringify(JSON.parse(subscribeMssg).data));
        frameElement.contentWindow.postMessage(subscribeMssg, '*');
    }
    else {
        const unsubscribeMssg = JSON.stringify({
            action: 'unsubscribe-notification',
            data: [
                'room-connection',
                'stream-updates',
                'messaging'
            ]
        });
        frameElement.contentWindow.postMessage(unsubscribeMssg, '*');
    }
});
document.getElementById('live_stream_btn').addEventListener('click', function () {
    if (toggleLiveStream === false) {
        const liveStreamMssg = JSON.stringify({
            action: 'start-live-streaming',
            data: {
                "name": "Youtube",
                "rtmp_endpoint": "rtmp://a.rtmp.youtube.com/live2",
                "rtmp_key": "7msy-s1r5-89z0-pbfr-323y",
            }

        });
        frameElement.contentWindow.postMessage(liveStreamMssg, '*');
    } else {
        const stopStreamMssg = JSON.stringify({
            action: 'stop-live-streaming',
        });
        frameElement.contentWindow.postMessage(stopStreamMssg, '*');
    }
})

// document.getElementById('live_stream_btn_stop').addEventListener('click', function () {
//     // if (toggleLiveStream === false) {
//     //     const liveStreamMssg = JSON.stringify({
//     //         action: 'start-live-streaming',
//     //         data: {
//     //             "name": "Youtube",
//     //             "rtmp_endpoint": "rtmp://a.rtmp.youtube.com/live2",
//     //             "rtmp_key": "jrjh-yrbq-gqdc-cw0x-7bvp",
//     //         }

//     //     });
//     //     frameElement.contentWindow.postMessage(liveStreamMssg, '*');
//     // } else {
//     const stopStreamMssg = JSON.stringify({
//         action: 'stop-live-streaming',
//     });
//     frameElement.contentWindow.postMessage(stopStreamMssg, '*');
//     // }
// })


videoBttnId.addEventListener('click', function () {
    if (toggleVideo === false) {
        const muteVideoMssg = JSON.stringify({
            action: 'mute-video',
        });
        frameElement.contentWindow.postMessage(muteVideoMssg, '*');
    } else {
        const unmuteVideoMssg = JSON.stringify({
            action: 'unmute-video',
        });
        frameElement.contentWindow.postMessage(unmuteVideoMssg, '*');
    }
})

audioBttnId.addEventListener('click', function () {
    if (toggleAudio === false) {
        const muteAudioMssg = JSON.stringify({
            action: 'mute-audio',
        });
        frameElement.contentWindow.postMessage(muteAudioMssg, '*');
    } else {
        const unmuteAudioMssg = JSON.stringify({
            action: 'unmute-audio',
        });
        frameElement.contentWindow.postMessage(unmuteAudioMssg, '*');
    }
})

changeLayoutRtmpLeaderId.addEventListener('click', function () {
    // if (toggleView === false) {
    const changeLayoutRtmpLeaderMssg = JSON.stringify({
        action: 'change-layout',
        data: {
            target: "rtmp",
            mode: "leader",
        }
    });
    frameElement.contentWindow.postMessage(changeLayoutRtmpLeaderMssg, '*');
    // } else {

    // }
})

changeLayoutRtmpGalleryId.addEventListener('click', function () {
    // if (toggleView === false) {
    const cchangeLayoutRtmpGalleryMssg = JSON.stringify({
        action: 'change-layout',
        data: {
            target: "rtmp",
            mode: "gallery",
        }
    });
    frameElement.contentWindow.postMessage(cchangeLayoutRtmpGalleryMssg, '*');
    // } else {

    // }
})
changeLayoutAllLeaderId.addEventListener('click', function () {
    // if (toggleView === false) {
    const changeLayoutAllLeaderMssg = JSON.stringify({
        action: 'change-layout',
        data: {
            target: "all",
            mode: "leader",
        }
    });
    frameElement.contentWindow.postMessage(changeLayoutAllLeaderMssg, '*');
    // } else {

    // }
})
changeLayoutAllGalleryId.addEventListener('click', function () {
    // if (toggleView === false) {
    const changeLayoutAllGalleryMssg = JSON.stringify({
        action: 'change-layout',
        data: {
            target: "all",
            mode: "gallery",
        }
    });
    frameElement.contentWindow.postMessage(changeLayoutAllGalleryMssg, '*');
    // } else {

    // }
})

disconnectBttnId.addEventListener('click', function () {
    const disconnectMssg = JSON.stringify({
        action: 'disconnect-room',
        data: {
            alert: false,
        }
    });
    frameElement.contentWindow.postMessage(disconnectMssg, '*');
})

destroyBttnId.addEventListener('click', function () {
    const destroyMssg = JSON.stringify({
        action: 'destroy-room',
        data: {
            alert: false,
        }
    });
    frameElement.contentWindow.postMessage(destroyMssg, '*');
})


sendSignalling.addEventListener('click', () => {
    const signallingMessage = JSON.stringify({
        action: 'signal',
        data: {
            "name": "Sourav",
            "class": 12,
            "Lnaguage": "Haryanvi"
        }
    })
    frameElement.contentWindow.postMessage(signallingMessage, '*');
})

window.addEventListener('message', function (resp) {
    // Get the sent data
    var data = resp.data;

    // If you encode the notification  in JSON before sending them,
    // then decode here
    var data_decoded = JSON.parse(data);
    var notification = data_decoded.notification;
    switch (notification) {
        case "notification-subscribed":
            if (toggleSubscribe === false) {
                // toastr.info('notification subscribed');
                document.getElementById('subscribe_btn').innerText = 'Unsubscribe';
                data_decoded.data.forEach(element => {
                    switch (element) {
                        case 'live-streaming':
                            isLiveStreamSubscription = true;
                            break;
                        case 'room-connection':
                            isRoomSubscription = true;
                            break;
                        case 'stream-updates':
                            isStreamUpdatesSubscription = true;
                            break;
                    }
                });
                toastr.info("notification-subscribed");
                toggleSubscribe = true;
            }
            break;
        case "notification-unsubscribed":
            if (toggleSubscribe === true) {
                // setTimeout(() => {
                // toastr.info('notification unsubscribed');
                data_decoded.data.forEach(element => {
                    switch (element) {
                        case 'live-streaming':
                            isLiveStreamSubscription = false;
                            break;
                        case 'room-connection':
                            isRoomSubscription = false;
                            break;
                        case 'stream-updates':
                            isStreamUpdatesSubscription = false;
                            break;
                    }
                });
                document.getElementById('subscribe_btn').innerText = 'Subscribe';
                // }, 1000);
                toggleSubscribe = false;
                toastr.info("notification-unsubscribed");

            }
            break;
        case "live-streaming-started":
            if (isLiveStreamSubscription === true) {
                // toastr.info('Streaming-started');
                document.getElementById('live_stream_btn').innerText = 'Stop Stream';
                toggleLiveStream = true;
            }
            break;
        case "live-streaming-stopped":
            if (isLiveStreamSubscription === true) {
                // toastr.info('Streaming Stopped');
                document.getElementById('live_stream_btn').innerText = 'Live Stream';
                toggleLiveStream = false;
            }
            break;
        case "video-muted":
            if (isStreamUpdatesSubscription === true) {
                videoBttnId.innerText = 'ON Video';
                toggleVideo = false;
                toastr.info("video-is-muted");

            }
            break;
        case "video-unmuted":
            if (isStreamUpdatesSubscription === true) {
                videoBttnId.innerText = 'OFF Video';
                toggleVideo = true;
                toastr.info("video-is-unmuted");

            }
            break;
        case "audio-muted":
            if (isStreamUpdatesSubscription === true) {
                audioBttnId.innerText = 'ON Audio';
                toggleAudio = false;
                toastr.info("audio-is-muted");

            }
            break;
        case "audio-unmuted":
            if (isStreamUpdatesSubscription === true) {
                audioBttnId.innerText = 'OFF Audio';
                toggleAudio = true;
                toastr.info("audio-is-unmuted");

            }
            break;
        case "room-disconnected":
            toastr.info('Room is diconnected');
            console.log("data of room-disconnected", data_decoded.data);
            break;
        case "room-reconnected":
            toastr.info('Room is reconnected');
            break;
        case "room-connected":
            toastr.info(`Room is Connected ${data_decoded.data}`);
            break;
        case "room-not-connected":
            toastr.info('Room is not connected');
            break;
        case "media-access-denied":
            toastr.info('media denied access');
            break;
        case "camera-access-denied":
            toastr.info('No video');
            break;
        case "mic-access-denied":
            toastr.info('No audio');
            break;
        // case 'media-access-denied':
        //     toastr.info('No audio video');
        //     break;
        case "camera-access-allowed":
            toastr.info('video');
            break;
        case "mic-access-allowed":
            toastr.info('audio');
            break;
        case "signal-received":
            toastr.info("data received by singnalling", JSON.stringify(data_decoded.data))
            break;
        case "user-awaited":
            toastr.info("user is waiting", JSON.stringify(data_decoded.data));
            break;
        case "room-awaited":
            toastr.info("room is awaited");
            break;
    }

});
