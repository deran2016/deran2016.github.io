let G_KEY = "AIzaSyBTvBGAODg2kD6BUOMnRvfMvxwnhA82aVI"; // YouTube API
let K_KEY = "6a8ee66bca41b37928967acbce53838a"; // Kakao API

Kakao.init(K_KEY); // Kakao API를 사용할 준비를 합니다.
console.log(Kakao.isInitialized()); // Kakao API가 초기화 되었는지 체크합니다.

// let $ = (q) => document.getElementById(q);

/*********************************************************
 * getLinks(): 입력받은 링크들을 배열 형식으로 반환합니다.
 *********************************************************/
function getLinks() {
  let arr = [];
  for (let i = 1; i <= 3; i++) {
    if ($("#link" + i).val() != "" && $("#link" + i).val() != "undefined")
      arr.push($("#link" + i).val());
  }
  return arr;
}

/*********************************************************
 * getIds(arr): 입력받은 링크에서 동영상의 ID를 배열 형식으로 반환합니다.
 *********************************************************/
function getIds(arr) {
  let arr2 = arr.map((item) => {
    let start = item.indexOf("=");
    let id = item.substring(start + 1, item.length);
    return id;
  });
  return arr2;
}

/*********************************************************
 * getThumbnail(id): 입력받은 ID의 썸네일 이미지 주소를 반환합니다.
 *********************************************************/
function getThumbnail(id) {
  let url = "http://img.youtube.com/vi/";
  let type = "/default.jpg";
  return url + id + type;
}

var titles = []; // 제목을 받기 위한 전역 배열을 선언합니다.

/*********************************************************
 * getTitle(id): 입력받은 ID의 제목을 titles 배열에 push 합니다.
 *********************************************************/
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
      title = data.items[0].snippet.title.replace(/\"/g, "");
      titles.push(title);
    },
  });
}

/*********************************************************
 * setContents(arr): 입력받은 ID 배열로 컨텐츠의 배열을 반환합니다.
 *********************************************************/
function setContents(arr) {
  let arr2 = arr.map((item, index) => {
    let content = {};
    content.title = titles[index];
    content.description = "Youtube 영상";
    content.imageUrl = getThumbnail(item);
    content.link = {};
    content.link.mobileWebUrl = "https://www.youtube.com/watch?v=" + item;
    content.link.webUrl = "https://www.youtube.com/watch?v=" + item;
    return content;
  });
  return arr2;
}

/*********************************************************
 * sendLink(): 종합된 메시지 템플릿을 카카오 링크로 전송합니다.
 *********************************************************/
function sendLink() {
  getIds(getLinks()).map((item) => getTitle(item));
  Kakao.Link.sendDefault({
    objectType: "list",
    headerTitle: "TAKE A LINK",
    headerLink: {
      mobileWebUrl: "https://deran2016.github.io/takealink",
      webUrl: "https://deran2016.github.io/takealink",
    },
    contents: setContents(getIds(getLinks())),
  });
  titles = [];
}
