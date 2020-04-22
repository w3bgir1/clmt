const data = {
  sander: {
    name: "Sander van Maanen",
    photo: "images/Sander.JPG",
    linkedin: "https://www.linkedin.com/in/sander-van-maanen-863102/",
    email: "sander@clmt.partners",
    list: `
    <li>
    Former Managing Director at AlpInvest, a Carlyle group company managing ~$50bn of Private Equity assets where he was global head of co-investments and member of the global investment committee
  </li>
  <li>
  Established AlpInvest Asia and responsible for investments across Asia, Australia and New Zealand
  </li>
  <li>Previously at Procter & Gamble and The Boston Consulting Group
  </li>
  <li>MSc from Delft University of Technology and MBA from INSEAD</li>`,
  },
  steven: {
    name: "Steven Zwaan",
    photo: "images/Steven.JPG",
    linkedin: "https://www.linkedin.com/in/steven-zwaan-bb81bb/",
    email: "steven@clmt.partners",
    list: `
    <li>
    Co-founder and board member of UPC Renewables Asia Pacific. UPC is an independent renewable energy company committed to the growth markets of Asia and Australia
  </li>
  <li>
  Co-founder and board member of MyTown, the Philippines’ first and largest integrated provider of affordable co-living spaces for young professionals

  </li>
  <li>
  Previously a Managing Director at ABN AMRO Rothschild and RBS in Hong Kong.
  </li>
  <li>Master in Law from Erasmus University Rotterdam
  </li>`,
  },
  han: {
    name: "Han de Groot",
    photo: "images/Han.JPG",
    linkedin: "https://www.linkedin.com/in/handegroot/",
    email: "han@clmt.partners",
    list: `
    <li>
    Founder of MetrixLab, former CEO and board member of Macromill Group, a leading marketing technology company. Han managed the company from start-up to public exit on the Tokyo Stock Exchange as founder, CEO, board member and shareholder
  </li>
  <li>
  Co-founder of Stadswaarde, a Dutch real estate developer and investor, aiming to redefine the concept of sustainable urban living
  </li>
  <li>MSc in Business Administration from Erasmus University Rotterdam
  </li>`,
  },
};

const isMobile = window.innerWidth < 640;

const menu = document.querySelector(".navigation-menu");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const menuBtn = document.querySelector(".mobile-menu-icon--bars");
const closeMenuBtn = document.querySelector(".mobile-menu-icon--close");

const changeVideoSrcToDesktop = (name) => {
  const video = document.querySelector(`.video-background--${name}`);
  const videoSrc = document.querySelector(`.video-source--${name}`);
  videoSrc.src = `images/${name}.mp4`;
  video.load();
  video.play();
};

if (window.innerWidth > 640) {
  changeVideoSrcToDesktop("home");
  changeVideoSrcToDesktop("team");
}

window.addEventListener("scroll", () => {
  let active = document.elementFromPoint(
    window.innerWidth / 2,
    window.innerHeight / 2
  );

  if (active.className.includes("section")) {
    menu.childNodes.forEach((el) => {
      if (!el.dataset) return;
      el.dataset.link === active.id
        ? el.classList.add("navigation-link--active")
        : el.classList.remove("navigation-link--active");
    });
  }
});

const handleShow = (person) => {
  const { name, linkedin, email, list, photo } = data[person];

  const markup = `
  <div class='btn--close'>
    <i class="fas fa-times icon--close" onclick="handleClose()"></i>
  </div>
  <div class="person-description">
    <div class='person-info'>
      <img class='person-photo' src=${photo} alt=${name}>
      <p>
        ${name}
      </p>
      <div class="links-block">
        <a
          href="${linkedin}"
          target="_blank"
          class="icon"
          ><i class="fab fa-linkedin-in"></i
        ></a>
        <a class="icon" href="mailto:${email}"
          ><i class="fas fa-envelope"></i
        ></a>
      </div>
    </div>
    <ul class='person-bio'>
    ${list}
    </ul>
</div>`;

  modal.classList.add("modal-visible");
  modalContent.insertAdjacentHTML("beforeend", markup);
};

const handleClose = () => {
  modalContent.innerHTML = "";
  modal.classList.remove("modal-visible");
};

const showMobileMenu = () => {
  closeMenuBtn.style.display = "block";
  menuBtn.style.display = "none";
  menu.classList.add("navigation-menu--mobile");
};

const closeMobileMenu = () => {
  if (!isMobile) return;

  menuBtn.style.display = "block";
  closeMenuBtn.style.display = "none";
  menu.classList.remove("navigation-menu--mobile");
};

// Smoth scroll
(function () // Code in a function to create an isolate scope
{
  var speed = 500;
  var moving_frequency = 15; // Affects performance !
  var links = document.getElementsByTagName("a");
  var href;

  for (var i = 0; i < links.length; i++) {
    href =
      links[i].attributes.href === undefined
        ? null
        : links[i].attributes.href.nodeValue.toString();
    if (href !== null && href.length > 1 && href.substr(0, 1) == "#") {
      links[i].onclick = function () {
        var element;
        var href = this.attributes.href.nodeValue.toString();
        if ((element = document.getElementById(href.substr(1)))) {
          var hop_count = speed / moving_frequency;
          var getScrollTopDocumentAtBegin = getScrollTopDocument();
          var gap =
            (getScrollTopElement(element) - getScrollTopDocumentAtBegin) /
            hop_count;

          for (var i = 1; i <= hop_count; i++) {
            (function () {
              var hop_top_position = gap * i;
              setTimeout(function () {
                window.scrollTo(
                  0,
                  hop_top_position + getScrollTopDocumentAtBegin + 9
                );
              }, moving_frequency * i);
            })();
          }
        }

        return false;
      };
    }
  }

  var getScrollTopElement = function (e) {
    var top = 0;

    while (e.offsetParent != undefined && e.offsetParent != null) {
      top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
      e = e.offsetParent;
    }

    return top;
  };

  var getScrollTopDocument = function () {
    return document.documentElement.scrollTop + document.body.scrollTop;
  };
})();
