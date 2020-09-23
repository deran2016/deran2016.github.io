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

var contents = []; // 컨텐츠를 담기 위한 전역 변수

/*********************************************************
 * getContents(id): 입력받은 ID의 컨텐츠를 반환합니다.
 *********************************************************/
function getContents(id) {
  $.ajax({
    type: "GET",
    url: "https://www.googleapis.com/youtube/v3/videos/",
    dataType: "jsonp",
    data: {
      part: "snippet",
      id: id,
      key: G_KEY,
    },
    async: false,
    success: function (data) {
      if (data != null) {
        let content = {};
        content.title = data.items[0].snippet.title.replace(/\"/g, "");
        content.description = "Youtube";
        content.imageUrl = getThumbnail(id);
        content.link = {};
        content.link.mobileWebUrl = "https://www.youtube.com/watch?v=" + id;
        content.link.webUrl = "https://www.youtube.com/watch?v=" + id;
        contents.push(content);
      }
    },
    error: function (e) {
      alert("콘텐츠를 불러오는데 실패했습니다.");
    },
  });
}

/*********************************************************
 * sendLink(): 종합된 메시지 템플릿을 카카오 링크로 전송합니다.
 *********************************************************/
function sendLink() {
  getIds(getLinks()).map((item) => getContents(item));
  Kakao.Link.sendDefault({
    objectType: "list",
    headerTitle: "TAKE A LINK",
    headerLink: {
      mobileWebUrl: "https://deran2016.github.io/takealink",
      webUrl: "https://deran2016.github.io/takealink",
    },
    contents: contents,
  });
  titles = [];
}
