/* 季节系统：季节强调色 + 页脚季节签 + 圣诞挂件（自动按日期生效/失效） */
(function () {
  var now = new Date();
  var m = now.getMonth(); // 0-11
  var d = now.getDate();
  var root = document.documentElement;

  /* --- 方案三：季节划分与强调色 --- */
  // 冬 = 11月~2月（配合星空主题的青蓝，11月起即入冬）
  var season;
  if (m >= 10 || m <= 1) {
    season = "winter";
  } else if (m >= 2 && m <= 4) {
    season = "spring";
  } else if (m >= 5 && m <= 7) {
    season = "summer";
  } else {
    season = "autumn";
  }
  root.classList.add("season-" + season);

  var isEN = (root.lang || "zh").indexOf("en") === 0;
  var PHRASES = isEN ? {
    winter: "Long winter nights are for long reads.",
    spring: "Spring is here—plant an idea.",
    summer: "Summer nights are noisy; read something quiet.",
    autumn: "Autumn suits both looking back and setting out."
  } : {
    winter: "冬夜漫长，适合读长文。",
    spring: "春天到了，把想法种下去。",
    summer: "夏夜聒噪，读点安静的。",
    autumn: "秋天适合回顾，也适合出发。"
  };
  var note = document.getElementById("season-note");
  if (note) note.textContent = PHRASES[season];

  /* --- 方案一：圣诞挂件，11月15日 ~ 12月26日自动出现 --- */
  var isXmas = (m === 10 && d >= 15) || (m === 11 && d <= 26);
  if (!isXmas) return;

  // 设计师金线小树挂在站名旁（SVG Repo CC0）
  var logoLink = document.querySelector(".logo a");
  if (logoLink) {
    var tree = document.createElement("span");
    tree.className = "season-tree";
    tree.setAttribute("aria-hidden", "true");
    tree.innerHTML = '<img src="/images/xmas-tree.svg" alt="" width="20" height="20">';
    logoLink.appendChild(tree);
  }

})();
