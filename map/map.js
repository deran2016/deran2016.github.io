// data
const data = [
  {
    name: "세광양대창 성수점",
    time: "매일 12:00 ~ 24:00",
    price: "곱창전골: 17,000원",
    tag: "곱창전골",
    x: 127.05747750953856,
    y: 37.5438637338413,
    zIndex: 1,
  },
];

// init
const mapContainer = document.getElementById("map");
const mapOptions = {
  center: new kakao.maps.LatLng(37.54449199083064, 127.04779742906891), // 지도의 중심 좌표(헤이그라운드 성수 시작점)
  level: 3, // 지도의 레벨(확대, 축소 정도)
};
const map = new kakao.maps.Map(mapContainer, mapOptions);
let overlays = [];

getData(data);

function getData() {
  // init Overlays
  removeOverlays();

  // draw Markers
  drawMarker(data);
}

// remove Overlays
function removeOverlays() {
  let len = overlays.length,
    i = 0;

  for (; i < len; i++) {
    overlays[i].setMap(null);
  }

  overlays = [];
}

// draw Marker
function drawMarker(markers) {
  let len = markers.length,
    i = 0;

  for (; i < len; i++) {
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(markers[i].y, markers[i].x),
      zIndex: markers[i].zIndex,
    });

    overlays.push(marker);
  }
}