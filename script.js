function showPage(n) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById("page" + n);
  if (targetPage) {
    targetPage.classList.add("active");
  } else {
    console.error("Halaman dengan id 'page" + n + "' tidak ditemukan.");
  }
}

function checkDate() {
  const input = document.getElementById("dateInput").value.trim();
  if (input === "2026-02-27") {
    showPage(2);
  } else {
    alert("Wrong date 😭");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // tombol di page 2
  const arrow = document.getElementById("next-arrow");
  if (arrow) {
    arrow.addEventListener("click", () => {
      showPage(3);
    });
  }

  // pilih lagu di page 3
  document.querySelectorAll(".song").forEach(song => {
    song.addEventListener("click", () => {
      const title = song.querySelector(".title").innerText;
      const artist = song.querySelector(".artist").innerText;
      const audioSrc = song.getAttribute("data-src");

      localStorage.setItem("selectedSong", JSON.stringify({
        title, artist, audioSrc
      }));

      showPage(4);

      const songData = JSON.parse(localStorage.getItem("selectedSong"));
      if (songData) {
        const audio = document.getElementById("audioPlayer");
        audio.src = songData.audioSrc;
        audio.play();
      }
    });
  });

  // klik giftbox di page 4 → lanjut ke page 5
  const giftbox = document.querySelector("#page4 .gift");
  if (giftbox) {
    giftbox.addEventListener("click", () => {
      showPage(5);
      // audioPlayer tetap jalan, tidak direset
    });
  }
});

arrow.addEventListener("click", () => {
  const page2 = document.getElementById("page2");
  page2.classList.add("fade-out");

  setTimeout(() => {
    showPage(3);
    page2.classList.remove("fade-out");
  }, 600);
});
