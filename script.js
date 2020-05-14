var vueApp = new Vue({

  el: "#app",

  data: {
    //variabler
    artist:null,
    song:null,
    text:"",
    title:null,
    videoid:null,
    apiKey: "AIzaSyBQC7ZnE9CiiQAPMs-xoue5dh2GPsJfc-w"
  },

  methods: {
    //funktioner
    findLyric: function(e){
      var request = new XMLHttpRequest();

      var artistStr = this.artist;
      var songStr = this.song;

      request.open('GET', 'https://api.lyrics.ovh/v1/' + artistStr +'/' + songStr);

      var search = artistStr.concat(" ");
      search = search.concat(songStr);
      videoSearch(vueApp.apiKey,search,1);

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          statusCode = this.status;
          if (statusCode == 200){
            vueApp.text = JSON.parse(this.responseText).lyrics
          }else{
            vueApp.text = "Can't find the lyrics"
          };
        }
      };

      request.send();
      e.preventDefault();
    },
  }
});

function videoSearch(key,search,maxresults){
  var video = "";
  $("#video").empty();
  $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxresults + "&q=" + search,function(data){
    data.items.forEach(item => {
      video = `<iframe width="640" height="400" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0"></iframe>`;
      // Fungerar inte för populära videos i localhost då det finns settings för skaparen av videon som gör att det bara funkar på public domains
      $("#video").append(video)
    })
  });
};

// om jag känner för det kan jag skriva om det i vue.js men vi får se, jquery är så mycket lättare

// key för youtube api : AIzaSyANcbM-uHNXXypipbVOYmwPVV7m9BI2o5c