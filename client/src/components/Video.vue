<template>
<div>
  <div id="video-grid"></div>
  <br><br><br><br><br>
  <br><br><br><br><br>
  </div>
</template>
<script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>

<script>
export default {
  name: "Video",
  data() {
    return {
      Msgs: "",
    };
  },
  created() {
    this.start();
  },
  methods: {
    start(){

        const myVideo = document.createElement("video");
        myVideo.muted = true;

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        this.addVideoStream(myVideo, stream);
      });
      },
      addVideoStream(video, stream) {
      const videoGrid = document.getElementById("video-grid");
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      videoGrid.append(video);
    },
      
    
  },
};
</script>

<style scoped>
#video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
  margin-left: 30%;
  margin-top: 10%;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-left: 10%;
}
</style>


