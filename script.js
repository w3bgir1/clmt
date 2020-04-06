window.addEventListener("scroll", () => {
  let active =
    window.scrollY < window.innerHeight - window.innerHeight * 0.3
      ? document.querySelector("#home")
      : document.elementFromPoint(
          window.innerWidth / 2,
          window.innerHeight / 2
        );

  if (active.className.includes("section")) {
    document.querySelector("#navigation").childNodes.forEach((el) => {
      if (!el.className) return;
      el.className.includes(active.id)
        ? el.classList.add("active-link")
        : el.classList.remove("active-link");
    });
  }
});

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
                  hop_top_position + getScrollTopDocumentAtBegin
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

const handleShow = (name) => {
  const markup = `
  <i class="far fa-times-circle" onclick="handleClose()"></i>
  <div class="team-card">
  <p>
    Sander van Maanen
  </p>
  <div class="links-block">
    <a
      href="https://www.linkedin.com/in/sander-van-maanen-863102/"
      target="_blank"
      class="linkedin-link"
      ><i class="fab fa-linkedin-in"></i
    ></a>
    <a class="linkedin-link" href="mailto:ask@clmtpartners.com"
      ><i class="fas fa-envelope"></i
    ></a>
  </div>
  <ul>
    <li>
      Former Managing Director at AlpInvest, a Carlyle group company
      managing ~$50bn of Private Equity assets. Member of Global
      Investment Committee. Responsible for investments across Asia,
      Australia and New Zealand
    </li>
    <li>
      Previously at Procter &amp; Gamble and The Boston Consulting Group
    </li>
    <li>MSc from Delft University of Technology and MBA from INSEAD</li>
  </ul>
</div>`;

  document.querySelector(".modal").classList.add("modal-visible");

  document
    .querySelector(".modal-content")
    .insertAdjacentHTML("beforeend", markup);
};

const handleClose = () => {
  document.querySelector(".modal-content").innerHTML = "";
  document.querySelector(".modal").classList.remove("modal-visible");
};
