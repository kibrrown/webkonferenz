//const openStream = require('./openStream');
//openStream();
const Peer = require('simple-peer');
//const playVideo = require('./playVideo');
const $ = require('jquery');
function openStream(){
  navigator.mediaDevices.getUserMedia({audio:false, video:true})
    .then(stream => {
        playVideo(stream,'localStream');


        const p = new Peer({initiator: location.hash === '#1', trickle:false, stream});
        //openCamera();
        p.on('signal', token => {
          $('#txtMySignal').val(JSON.stringify(token));
        });

        $('#btnConnect').click(() => {
          const friendSignal = JSON.parse($('#txtFriendSignal').val());
          p.signal(friendSignal);
          alert('verbinde dein Freund ID: '+ friendSignal);
        });

        p.on('stream', friendStream => playVideo(friendStream, 'friendStream'))

    })
    .catch(err => console.log(err));

    function playVideo(stream, idVideo){
      const video = document.getElementById(idVideo);
      video.srcObject = stream;
      video.onloadmetadata = function(){
        video.play();
      };
    }
}


//module.exports = playVideo;

//module.exports = openStream;

