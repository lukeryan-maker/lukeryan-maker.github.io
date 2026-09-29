/*
========================================
LUKE RYAN PORTFOLIO
JavaScript
========================================
*/


/*
----------------------------------------
REDUCED MOTION
----------------------------------------
Respect the user's accessibility
preferences.
*/

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/*
----------------------------------------
SCROLL REVEAL
----------------------------------------
Sections fade upward slightly when
entering the viewport.
*/

if (reducedMotion) {

  document
    .querySelectorAll(".reveal")
    .forEach((element) => {

      element.classList.add("visible");

    });

} else {

  const observer = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {

      threshold: 0.12

    }

  );


  document
    .querySelectorAll(".reveal")
    .forEach((element) => {

      observer.observe(element);

    });

}


/*
----------------------------------------
INTERNAL LINKS
----------------------------------------
Remove focus from navigation links after
they are clicked with a mouse.
*/

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        link.blur();

      }
    );

  });


/*
----------------------------------------
ACTIVE NAVIGATION
----------------------------------------
Determine which major section is
currently visible.
*/

const sections = document.querySelectorAll(
  "main section[id]"
);

const navigationLinks =
  document.querySelectorAll(
    'nav a[href^="#"]'
  );


const updateNavigation = () => {

  let currentSection = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 180;

    if (
      window.scrollY >= sectionTop
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });


  navigationLinks.forEach((link) => {

    link.removeAttribute(
      "aria-current"
    );

    const destination =
      link
        .getAttribute("href")
        .replace("#", "");


    if (
      destination === currentSection
    ) {

      link.setAttribute(
        "aria-current",
        "page"
      );

    }

  });

};


window.addEventListener(
  "scroll",
  updateNavigation,
  {
    passive: true
  }
);


updateNavigation();
