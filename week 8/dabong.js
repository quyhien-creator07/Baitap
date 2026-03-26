let time = 0;
let scoreA = 0;
let scoreB = 0;

// Danh sách sự kiện (giả lập)
const matchEvents = [
    {time: 10, team: "A", text: "⚽ Real Madrid ghi bàn!", videoTime: 10},
    {time: 35, team: "B", text: "⚽ Atlético gỡ hòa!", videoTime: 35},
    {time: 67, team: "A", text: "⚽ Real Madrid nâng tỷ số!", videoTime: 67},
    {time: 85, team: "A", text: "⚽ Real Madrid kết liễu trận đấu!", videoTime: 85}
];

// Update thời gian
setInterval(() => {
    time++;
    document.getElementById("matchTime").innerText = formatTime(time);

    // Check sự kiện
    matchEvents.forEach(event => {
        if (event.time === time) {
            addEvent(event);
        }
    });

}, 1000);

// Format time
function formatTime(sec) {
    let m = Math.floor(sec / 60);
    let s = sec % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
}

// Thêm event
function addEvent(event) {
    const div = document.createElement("div");
    div.className = "event goal";
    div.innerText = event.text + " (" + formatTime(event.time) + ")";

    // Update score
    if (event.team === "A") scoreA++;
    else scoreB++;

    document.getElementById("score").innerText = scoreA + " - " + scoreB;

    // Click → xem highlight
    div.onclick = () => {
        document.getElementById("videoFrame").src =
            "https://www.youtube.com/embed/H22-ry7R-po?start=" + event.videoTime;
    };

    document.getElementById("events").prepend(div);
}