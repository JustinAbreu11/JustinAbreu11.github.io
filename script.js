"use strict";

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");
const yearElement = document.querySelector("#current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const menuIsOpen = navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );

        menuButton.textContent = menuIsOpen ? "×" : "☰";
    });

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
        });
    });

    document.addEventListener("click", (event) => {
        const clickedInsideNavigation =
            navigation.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);

        if (
            !clickedInsideNavigation &&
            !clickedMenuButton &&
            navigation.classList.contains("open")
        ) {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
        }
    });
}

const observedElements = document.querySelectorAll(
    [
        ".content-section",
        ".project-card",
        ".engineering-card",
        ".skill-group"
    ].join(", ")
);

if ("IntersectionObserver" in window) {
    observedElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    observedElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigationLink() {
    let currentSectionId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSectionId = section.id;
        }
    });

    navigationLinks.forEach((link) => {
        const targetId = link
            .getAttribute("href")
            ?.replace("#", "");

        link.classList.toggle(
            "active",
            targetId === currentSectionId
        );
    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigationLink,
    {
        passive: true
    }
);

updateActiveNavigationLink();
