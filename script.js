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
    textheader: "สวัสดีครับ ผมชื่อนายเอกฐากร ไตรมิตร (น๊อต)",
    text7: "ตื่นจากเตียงและอาบน้ำ",
    text72: "แต่งกายด้วยชุดสุภาพเรียบร้อย",
    text725: "เตรียมน้ำร้อนและชงกาแฟ",
    text735: "เตรียมพร้อมทานอาหารช่วงเช้า",
    text8: "เตรียมการประชุมประจำวัน",
    text9: "เริ่มการประชุม",
    namet: "ลายเช็นผู้ปกครอง",
    txtm: "ไทม์ไลน์การเริ่มฝึกงานของผม เมื่อต้องทำงานจากที่บ้าน",
    cme: "สิ่งที่ผมต้องปรับปรุงช่วงเริ่มฝึกงาน",
    c1: "เริ่มปรับเวลาการนอนพักผ่อนร่างกายให้เร็วขึ้น เพื่อการพักผ่อนที่เพียงพอสำหรับการตื่นเช้าเริ่มฝึกงานวันต่อไป",
    c2: "ปรับความเข้าใจกาลเทศะของการทำงาน หรือการดำรงชีวิตร่วมกับผู้อื่น เพื่อไม่ให้เกิดความขัดแย้งและข้อผิดพลาด",
    c3: "ช่วงเวลาเริ่มงานต้องเจาะจงกับสิ่งที่ได้รับมอบหมายเป็นอย่างแรกเสมอ เพื่อไม่ให้เป็นภาระต่อผู้ร่วมงาน",
    c4: "พัฒนาทักษะด้านการสื่อสารและการสนทนา เพื่อการพูดคุยอธิบายสิ่งที่ต้องการจะสื่อความหมายให้เข้าใจง่ายยิ่งขึ้น",
    btn_language: "ไทย"
  };
  var en = {
    textheader: "Hi, my name is Mr.Akthakorn Traimtir (Knot)",
    text7: "Wake up from bed and take a shower.",
    text72: "Get dressed in neat clothes.",
    text725: "Prepare hot water and make coffee.",
    text735: "Eat breakfast.",
    text8: "Prepare daily meeting.",
    text9: "Start the meeting.",
    namet: "Parent's signature",
    txtm: "My start internship timeline when work from home.",
    cme: "Things to improve when starting an internship for me",
    c1: "Start adjusting the time to sleep and rest your body faster. To have enough rest for waking up early for the next day's training.",
    c2: "Improve circumstance understanding of the working times or living with others to avoid conflicts and errors",
    c3: "The start time must always be specific to the assignment first. in order not to be a burden on the co-workers",
    c4: "Improve communication and conversation skills in order to discuss and explain what needs to be conveyed in a way that is easier to understand",
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
      $("#txtm").text(settext("txtm"));
      $("#btn_language").text(settext("btn_language"));
      $("#cme").text(settext("cme"));
      $("#c1").text(settext("c1"));
      $("#c2").text(settext("c2"));
      $("#c3").text(settext("c3"));
      $("#c4").text(settext("c4"));
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
  
