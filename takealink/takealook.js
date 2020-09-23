let G_KEY = "AIzaSyBTvBGAODg2kD6BUOMnRvfMvxwnhA82aVI"; // YouTube API
let K_KEY = "6a8ee66bca41b37928967acbce53838a"; // Kakao API

Kakao.init(K_KEY);
console.log(Kakao.isInitialized());

//let $ = (q) => document.getElementById(q);

function getLinks() {
  let arr = [];
  for (let i = 1; i <= 7; i++) {
    if ($("#link" + i).val() != "") arr.push($("#link" + i).val());
  }
  return arr;
}

function getIds(arr) {
  let arr2 = arr.map((item) => {
    let start = item.indexOf("=");
    let id = item.substring(start + 1, item.length);
    return id;
  });
  return arr2;
}

function getThumbnail(id) {
  let url = "http://img.youtube.com/vi/";
  let type = "/default.jpg";
  return url + id + type;
}

var titles = [];

function getTitle(id) {
  let title = "";
  $.ajax({
    type: "GET",
    url: "https://www.googleapis.com/youtube/v3/videos/",
    async: false,
    dataType: "jsonp",
    data: {
      part: "snippet",
      id: id,
      key: G_KEY,
    },
    success: function (data) {
      title = data.items[0].snippet.title;
      titles.push(title);
    },
  });
}

function setContents(arr) {
  let arr2 = arr.map((item, index) => {
    let content = {};
    content.title = titles[index];
    content.description = "Youtube";
    content.imageUrl = getThumbnail(item);
    content.link = {};
    content.link.mobileWebUrl = "https://www.youtube.com/watch?v=" + item;
    content.link.webUrl = "https://www.youtube.com/watch?v=" + item;
    return content;
  });
  return arr2;
}

function sendLink() {
  Kakao.Link.sendDefault({
    objectType: "list",
    headerTitle: "TAKE A LINK",
    headerLink: {
      mobileWebUrl: "https://deran2016.github.io/takealink",
      webUrl: "https://deran2016.github.io/takealink",
    },
    contents: setContents(getIds(getLinks())),
  });
}
