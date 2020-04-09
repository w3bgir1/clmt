const data = {
  sander: {
    name: "Sander van Maanen",
    linkedin: "https://www.linkedin.com/in/sander-van-maanen-863102/",
    email: "",
    list: `
    <li>
    Former Managing Director at AlpInvest, a Carlyle group company
    managing ~$50bn of Private Equity assets. Member of Global
    Investment Committee. Responsible for investments across Asia,
    Australia and New Zealand
  </li>
  <li>
    Previously at Procter &amp; Gamble and The Boston Consulting Group
  </li>
  <li>MSc from Delft University of Technology and MBA from INSEAD</li>`,
  },
  steven: {
    name: "Steven Zwaan",
    linkedin: "https://www.linkedin.com/in/steven-zwaan-bb81bb/",
    email: "",
    list: `
    <li>
    Co-founder and Board Director of UPC Renewables, one of the
    largest independent renewable energy companies in the Asia-Pacific
    region with assets comprising over 10GW in operation, under
    construction and in development.
  </li>
  <li>
    Co-founder of MyTown, developer of affordable co-living
    communities in the Philippines
  </li>
  <li>
    Previously a Managing Director in Investment Banking in Hong Kong
  </li>`,
  },
  han: {
    name: "Han de Groot",
    linkedin: "https://www.linkedin.com/in/handegroot/",
    email: "",
    list: `
    <li>
    Background of leading a marketing technology company from start to
    public exit as founder, CEO and Board Director
  </li>
  <li>
    Co-founder of Stadswaarde, which aims to redefine the concept of
    sustainable urban living
  </li>
  <li>
    Investor in Tech & Life Science
  </li>`,
  },
};

const isMobile = window.innerWidth < 640;

const menu = document.querySelector(".navigation-menu");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const menuBtn = document.querySelector(".mobile-menu-icon--bars");
const closeMenuBtn = document.querySelector(".mobile-menu-icon--close");

const addVideo = (name) => {
  const video = document.createElement("VIDEO");
  video.className = "video-background";
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  const source = document.createElement("source");
  source.type = "video/mp4";
  source.src = `/images/${name}${isMobile ? "-mobile" : ""}.mp4`;
  video.appendChild(source);
  document.querySelector(`.video-wrapper--${name}`).appendChild(video);
  video.load();
  video.play();
};

addVideo("home");
addVideo("team");

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
  const { name, linkedin, email, list } = data[person];

  const markup = `
  <div class='btn--close'>
    <i class="far fa-times-circle icon--close" onclick="handleClose()"></i>
  </div>
  <div class="team-description">
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
  <ul>
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
