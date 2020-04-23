var vueApp = new Vue({

  el: "#app",

  data: {
    //variabler
    artist:null,
    song:null,
    text:""
  },

  methods: {
    //funktioner
    findLyric: function(e){
      var request = new XMLHttpRequest();

      request.open('GET', 'https://api.lyrics.ovh/v1/' + this.artist +'/' + this.song);

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          statusCode = this.status;
          if (statusCode == 200){
            console.log(this.responseText);
            vueApp.text = JSON.parse(this.responseText).lyrics.replace(/\n/g, '<br />')
            // = JSON.parse(this.responseText).lyrics.replace(/\n/g, '<br>');
          }else{
            vueApp.text = "Can't find the lyrics"
          };
        }
      };

      request.send();
      e.preventDefault();
    },
    
  }
})





// key för youtube api : AIzaSyC4e0YtI3DZVjDA2Rn403tLMb-zCPRS0Jk