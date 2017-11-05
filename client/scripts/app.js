class CBox {
  init() {
    this.roomList = [];
    this.friendsList = [];
    this.username;
    this.roomname;
  }
  send (message) {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/classes/messages',
      data: JSON.stringify(message)
    });
  }
  fetch () {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000/classes/messages',
      contentType: 'application/json',
      success: function(err, res, body) {
        let beach = JSON.parse(body.responseText);
        $('#currentRoomHeader').html('Currently Viewing: #' + this.roomname);
        this.clearMessages();
        beach.forEach(e => {
          e.message = _.escape(e.message);
          e.username = _.escape(e.username);
          this.renderMessage(e);
          this.renderRoom(e.roomname);
          
        });
        
      },
      error: function(error) {
        console.log('SOMETHING WENT WRONG!\n', error);
      }
    }); // message
  }
  clearMessages () {
    $('#chats').html('');
  }
  renderMessage (message) {
    //current user will have a list of friends and if they are not there, add them
    if (this.roomname === message.roomname && message.username !== 'undefined') {
      if (this.friendsList.indexOf(message.username) === -1) {
        $('<p class=".message"><strong><button value="' + _.escape(message.username) + '"class="username">' 
        + _.escape(message.username) + '</button></strong>: ' 
        + _.escape(message.message) + '</p><hr>').appendTo('#chats');
      } else {
        $('<p class=".message"><strong><button value="' + _.escape(message.username) + '"class="username">' 
        + _.escape(message.username) + '</button>: ' 
        + _.escape(message.message) + '</strong></p><hr>').appendTo('#chats');
      }
    }
  }
  renderRoom (roomName) {
    if (this.roomList.indexOf(roomName) === -1 && this.room !== undefined) {
      this.roomList.push(roomName);
      $('<br><button value="' + roomName + '" class="roomButton">#' + roomName + '</button>').appendTo('#roomSelect');
    }
  }
  handleUsernameClick (username) {
    $('<button class="username">' + username + '</button><br>').appendTo('#friendsList');
    alert('User name ' + username + ' will be added to your friends list');
  }
  handleSubmit (message) {
    this.send(message);
    $('<p class=".message"><strong><button value="' + message.username + '"class="username">' 
      + message.username + '</button></strong>: ' 
      + message.text + '</p><hr>').prependTo('#chats');
  }
  addFriend (name) {
    this.friendsList[name] = name;
  }
  
}
var app = new CBox;
$(document).ready(function() {
  app.username = window.location.href.split('?')[1].split('=')[1];
  app.username = app.username.replace(new RegExp(/[0-9]/, 'g'), '');
  app.username = app.username.replace(new RegExp('%', 'g'), ' ');
  
  app.friendsList = [];
  app.roomname = 'lobby';
  app.roomList = [];
  app.fetch();
  $('#currentRoomHeader').html('Currently Viewing: #' + app.room);
  setInterval(function () {
    app.fetch(app.roomName);
  }, 1000);
  //handle username click will add the clicked name as a friend.
  $(document).on('click', '.username', function(event) {
    app.friendsList.push(this.value);
    app.handleUsernameClick(this.value);
    app.clearMessages();
    app.fetch();
  });
  
  //submit will post the POST the message and append to the DOM
  $(document).on('submit', '#send', function(e) {
    var $message = $('input[name="message"]').val();
    app.handleSubmit({roomname: app.roomname, text: $message, username: app.username});
    e.preventDefault();
  });
  
  $(document).on('submit', '#newRoom', function(e) {
    var $roomname = $('input[name="room"]').val();
    app.roomList.push($roomname);
    $('<br><button value="' + $roomname + '" class="roomButton">#' + $roomname + '</button>').appendTo('#roomSelect');
    e.preventDefault();
  });
  
  $(document).on('click', '.roomButton', function(e) {
    
    app.clearMessages();
    app.roomname = this.value;
    app.fetch();
  });
});
