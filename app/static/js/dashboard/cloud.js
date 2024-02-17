function showHutaoCloud() {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"))
  document.getElementById("hutao-cloud-expire").textContent = new Date(userInfo.data.GachaLogExpireAt).toLocaleString();

  fetchGachaLogs()
}

function redeem() {
  let redeemCode = document.getElementById("hutao-cloud-redeem-code-input").value;

  fetch("https://passport.snapgenshin.cn/api/redemption/use", {
    method: "POST",
    headers: {
      "Authorization": BearerWrap(getToken()),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: redeemCode
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.retcode === 0) {
        alert(`兑换成功，到期时间已增加 ${data.data.value} 天`);
        updateLocalUserInfo(userInfo => {
          document.getElementById("hutao-cloud-expire").textContent = new Date(userInfo.data.GachaLogExpireAt).toLocaleString();
        })
      } else {
        alert("兑换失败：" + data.message);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("兑换失败：" + error);
    });
}

function fetchGachaLogs() {
  fetch("https://homa.snapgenshin.com/GachaLog/Entries", {
    headers: {
      "Authorization": BearerWrap(getToken())
    }
  }).then(response => response.json())
    .then(data => {
      for (let entry of data.data) {
        addEntry(entry)
      }
    })

  function addEntry(entry) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("items-center");
    card.classList.add("p-3");
    card.classList.add("flex");
    card.classList.add("shadow");
    card.style.justifyContent = "space-between";

    let uid = createP("UID: " + entry.Uid);

    if (entry.Excluded) {
      let sub = document.createElement("span")
      sub.classList.add("subtext")
      sub.textContent = "数据异常"

      let tooltip = document.createElement("span")
      tooltip.classList.add("tooltiptext")
      tooltip.textContent = "数据异常，建议删除记录后通过胡桃重新上传。"

      sub.appendChild(tooltip)

      uid.appendChild(sub)
    }

    let itemCount = createP("抽卡次数: " + entry.ItemCount);

    let del = createButton("删除", function () {
      if (confirm(`确定删除 ${entry.Uid} 的数据？`)) {
        fetch(`https://homa.snapgenshin.com/GachaLog/Delete?Uid=${entry.Uid}`, {
          headers: {
            "Authorization": BearerWrap(getToken())
          }
        }).then(response => response.json())
          .then(data => {
            if (data.retcode === 0) {
              alert("删除成功");
              card.remove();
            } else {
              alert("删除失败：" + data.message);
            }
          })
          .catch(error => {
            console.error("Error:", error);
            alert("删除失败：" + error);
          })
      }
    });

    card.appendChild(uid);
    card.appendChild(itemCount);
    card.appendChild(del);

    let parent = document.getElementById("hutao-cloud-gacha-entries")
    for (let element of parent.children) {
      element.remove()
    }
    parent.appendChild(card);

    function createP(text) {
      let p = document.createElement("p");
      p.textContent = text;
      return p;
    }

    function createButton(text, onclick) {
      let button = document.createElement("button");
      button.textContent = text;
      button.classList.add("bg-blue-500");
      button.classList.add("hover:bg-blue-700");
      button.classList.add("text-white");
      button.classList.add("font-bold");
      button.classList.add("py-2");
      button.classList.add("px-4");
      button.classList.add("rounded");
      button.onclick = onclick;
      return button;
    }
  }
}