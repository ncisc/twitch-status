$(document).ready(function(){

  var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger","noobs2ninjas","beohoff", "brunofin"];
  // var url = 'https://api.twitch.tv/kraken/streams/freecodecamp?callback=?';
  // var userUrl = 'https://api.twitch.tv/kraken/user/';
  var streamUrl = 'https://api.twitch.tv/kraken/streams/';
  var Accounts = {};

  // create streams object
  var Streamer = function(name, status, logo, url){
    this.name = name;
    this.status = status;
    this.url = url;
    this.logo = logo;
  };

  // function getprofiledata
  // function getProfile(){
  //   // $.getJSON()
  // };

  // function get streamData
  function getStream(user){
    $.getJSON(streamUrl + user + '?callback=?', function(data){
      // console.log(data);
      if (data.stream !== null && data.stream !== undefined) {
        Accounts[user] = new Streamer(user, data.stream.channel.status, data.stream.channel.logo, data.stream.channel.url);
      } else if (data.status === 422) {
        Accounts[user] = new Streamer(user, 'Account Closed', 'https://cdn4.iconfinder.com/data/icons/linecon/512/photo-48.png');
      } else if (data.stream === null) {
        Accounts[user] = new Streamer(user, 'Offline', 'https://cdn4.iconfinder.com/data/icons/linecon/512/photo-48.png');
      }
      showStreamer(user);
    });
  };

  function showStreamer(user){
    var isOnline;
    if (Accounts[user].status !== 'Account Closed' && Accounts[user].status !== 'Offline') {
      isOnline = 'online';
    } else {
      isOnline = '';
    }
    var isLink;
    if (Accounts[user].url) {
      isLink = "<p><a href=" + Accounts[user].url + ">" + Accounts[user].name + "</a></p>";
    } else {
      isLink = "<p>" + Accounts[user].name + "</p>"
    }
    $("#streamers").append("<div class='stream row " + isOnline + "'><div class='logo col-md-1'><img class='img-responsive img-rounded' src=" + Accounts[user].logo + " alt='logo' /></div><div class='name col-md-3'>" + isLink + "</div><div class='description col-md-8'><p class=''><i>" + Accounts[user].status + "</i></p></div></div>");
  }

  // starting the loop for users array
  for (var i = 0; i < users.length; i++) {
    getStream(users[i]);
  }

  // add code for menu's buttons
  $('#streamAll').on('click', function(){
    $('.stream').show();
    $('.active').removeClass('active');
    $('#streamAll').addClass('active');
  });
  $('#streamOn').on('click', function(){
    $('.stream').hide();
    $('.online').show();
    $('.active').removeClass('active');
    $('#streamOn').addClass('active');
  });
  $('#streamOff').on('click', function(){
    $('.stream').show();
    $('.online').hide();
    $('.active').removeClass('active');
    $('#streamOff').addClass('active');
  });

});


  // OLD CODE
  //
  // for (var i=0; i<users.length; i++) {
  //   url = 'https://api.twitch.tv/kraken/streams/' + users[i] + '?callback=?';
  //   $.getJSON(url, function(data) {
  //     console.log(data);
  //     // var name = data._links.channel.substr(38);
  //     var status;
  //     var url;
  //     var logo;
  //     if (data.stream !== null && data.stream !== undefined) {
  //       status = data.stream.channel.status;
  //       url = data.stream.channel.url;
  //       logo = data.stream.channel.logo;
  //     } else if (data.status === 422){
  //       status = 'Account Closed';
  //       url = '#';
  //       logo = 'https://cdn4.iconfinder.com/data/icons/linecon/512/photo-48.png';
  //     } else {
  //       status = 'Offline';
  //       url = '#';
  //       logo = 'https://cdn4.iconfinder.com/data/icons/linecon/512/photo-48.png';
  //     }
  //  });
  //}

  // adding data to HTML
  // $("#streamers").append("<div class='stream row online'><div class='logo col-md-1'><img class='img-responsive img-rounded' src=" + logo + " alt='logo' /></div><div class='name col-md-3'><a class='' href=" + url + "><p>" + name + "</p></a></div><div class='description col-md-8'><p class=''><i>" + status + "</i></p></div></div>");

  // data.stream != null
  // data.stream.channel.status
  // data.stream.channel.url
  // data.stream.channel.logo

  // data.status = unavailable
  // data.stream = null

  // api doc
  // https://github.com/justintv/Twitch-API/blob/master/v3_resources/streams.md#get-streamschannel

  // look for streamers and profile info
  // keep data into an object var
  // sort data by status
  // show data in html
