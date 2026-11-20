// 点赞按钮逻辑：读取计数 → 点击 +1 → localStorage 防重复
(function () {
  function init() {
    const btn = document.getElementById("like-btn");
    if (!btn) return;
    const path = window.location.pathname;
    const countEl = btn.querySelector(".like-count");
    const liked = localStorage.getItem("liked:" + path) === "1";

    const render = (n, isLiked) => {
      countEl.textContent = n;
      btn.classList.toggle("liked", isLiked);
    };

    fetch("/api/like?path=" + encodeURIComponent(path))
      .then((r) => r.json())
      .then((d) => render(d.likes, liked))
      .catch(() => btn.classList.add("hidden"));

    btn.addEventListener("click", function () {
      if (localStorage.getItem("liked:" + path) === "1") return;
      fetch("/api/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: path }),
      })
        .then((r) => r.json())
        .then((d) => {
          localStorage.setItem("liked:" + path, "1");
          render(d.likes, true);
        })
        .catch(() => {});
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
