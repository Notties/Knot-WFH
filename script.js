const line = document.querySelector(".timeline-innerline");

let i = 0;
let i2 = 1;
let target1 = document.querySelector(".timeline ul");
let target2 = document.querySelectorAll(".timeline ul li");

const timeline_events = document.querySelectorAll("ul li");

function showTime(e) {
  e.setAttribute("done", "true");
  e.querySelector(".timeline-point").style.background = "#1D2F6F";
  e.querySelector(".date").style.opacity = "100%";
  e.querySelector("p").style.opacity = "100%";
  e.querySelector("p").style.transform = "translateY(0px)";
}

function hideTime(e) {
  e.removeAttribute("done");
  e.querySelector(".timeline-point").style.background = "rgb(228, 228, 228)";
  e.querySelector(".date").style.opacity = "0%";
  e.querySelector("p").style.opacity = "0%";
  e.querySelector("p").style.transform = "translateY(-10px)";
}

function slowLoop() {
  setTimeout(function () {
    showTime(timeline_events[i]);
    timelineProgress(i + 1);
    i++;
    if (i < timeline_events.length) {
      slowLoop();
    }
  }, 800);
}


function timelineProgress(value) {
  let progress = `${(value / timeline_events.length) * 100}%`;
  if (window.matchMedia("(min-width: 728px)").matches) {
    line.style.width = progress;
    line.style.height = "4px";
  } else {
    line.style.height = progress;
    line.style.width = "4px";
  }
}

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.9) {
        if (window.matchMedia("(min-width: 728px)").matches) {
          slowLoop();
        } else {
          showTime(entry.target);
          timelineProgress(i2);
          i2++;
        }
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 1, rootMargin: "0px 0px -50px 0px" }
);

if (window.matchMedia("(min-width: 728px)").matches) {
  observer.observe(target1);
} else {
  target2.forEach((t) => {
    observer.observe(t);
  });
}


timeline_events.forEach((li, index) => {
  li.addEventListener("click", () => {
    if (li.getAttribute("done")) {
      timelineProgress(index);

      // hide all timeline events from last upto the point clicked
      timeline_events.forEach((ev, idx) => {
        if (idx >= index) {
          hideTime(ev);
        }
      });
    } else {
      timelineProgress(index + 1);
      // show all timeline events from first upto the point clicked
      timeline_events.forEach((ev, idx) => {
        if (idx <= index) {
          showTime(ev);
        }
      });
    }
  });
});

var doit;
window.addEventListener("resize", () => {
  clearTimeout(doit);
  doit = setTimeout(resizeEnd, 1200);
});

function resizeEnd() {
  i = 0;
  slowLoop();
}

// Change Language

var th = {
    textheader: "ไทม์ไลน์การเริ่มฝึกงานของผมเมื่อทำงานจากที่บ้าน",
    text7: "ตื่นจากเตียงและอาบน้ำ",
    text72: "แต่งกายด้วยชุดสุภาพเรียบร้อย",
    text725: "เตรียมน้ำร้อนและชงกาแฟ",
    text735: "เตรียมพร้อมทานอาหารช่วงเช้า",
    text8: "เตรียมการประชุมประจำวัน",
    text9: "เริ่มการประชุม",
    namet: "ลายเช็นผู้ปกครอง",
    btn_language: "ไทย"
  };
  var en = {
    textheader: "My internship start timeline when work from home.",
    text7: "Wake up from bed and take a shower.",
    text72: "Get dressed in neat clothes.",
    text725: "Prepare hot water and make coffee.",
    text735: "Eat breakfast.",
    text8: "Prepare daily meeting.",
    text9: "Start the meeting.",
    namet: "Parent's signature",
    btn_language: "EN"
  };
  
  function renderlang() {
    if (!localStorage.lang) {
      localStorage.setItem("lang", "en");
    } else {
      $("#textheader").text(settext("textheader"));
      $("#text7").text(settext("text7"));
      $("#text72").text(settext("text72"));
      $("#text725").text(settext("text725"));
      $("#text735").text(settext("text735"));
      $("#text8").text(settext("text8"));
      $("#text9").text(settext("text9"));
      $("#namet").text(settext("namet"));
      $("#btn_language").text(settext("btn_language"));
    }
  }
  
  function settext(key) {
    if (localStorage.lang == "en") {
      return en[key];
    } else {
      return th[key];
    }
  }
  
  function togglelang() {
    if (localStorage.lang == "en") localStorage.setItem("lang", "th");
    else if (localStorage.lang == "th") localStorage.setItem("lang", "en");
  
    renderlang();
    return "now language: " + localStorage.lang;
  }
  
  renderlang()
  
