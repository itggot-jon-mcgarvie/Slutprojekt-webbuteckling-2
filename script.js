var vueApp = new Vue({

  el: "#app",

  data: {
    //variabler
    artist:null,
    song:null,
    lyrics:null
  },

  methods: {
    //funktioner
    findLyric: function(e){
      var request = new XMLHttpRequest();

      request.open('GET', 'https://api.lyrics.ovh/v1/' + this.artist +'/' + this.song);

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log('Status:', this.status);
          statusCode = this.status;
          // if (statusCode == 200){
          //   e.lyrics = this.responseText;
          // }else{
          //   //set error or something
          // };
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
        }
      };

      request.send();
      e.preventDefault();
    }
  }
})





// key för youtube api : AIzaSyC4e0YtI3DZVjDA2Rn403tLMb-zCPRS0Jk