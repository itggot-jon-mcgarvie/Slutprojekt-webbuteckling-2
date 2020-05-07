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
            vueApp.text = JSON.parse(this.responseText).lyrics
            // = JSON.parse(this.responseText).lyrics.replace(/\n/g, '<br>');
          }else{
            vueApp.text = "Can't find the lyrics"
          };
        }
      };

      request.send();
      e.preventDefault();
    },
    findVideo: function(e){
      e.preventDefault();
      // prepare the request
      var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: encodeURIComponent(this.search).replace(/%20/g, "+"),
        order: "viewCount",
        maxResults: 1,
      });
      //execute the request
      request.execute(function(response){
        console.log(response);
      });
    },

    init: function(){
      gapi.client.setApiKey("AIzaSyANcbM-uHNXXypipbVOYmwPVV7m9BI2o5c");
      gapi.client.load("youtube", "v3", function() {
        //yt api is ready
      });
    },
  }
})





// key för youtube api : AIzaSyANcbM-uHNXXypipbVOYmwPVV7m9BI2o5c