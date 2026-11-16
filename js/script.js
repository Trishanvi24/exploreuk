/*=========================================
        STICKY HEADER
=========================================*/

const header = document.querySelector(".header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

}

/*=========================================
        HERO VIDEO SLIDER
        HOME PAGE ONLY
=========================================*/

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const nextBtn = document.querySelector(".next-slide");
const prevBtn = document.querySelector(".prev-slide");

let currentSlide = 0;
let sliderInterval;

/*-----------------------------------------
        CHECK SLIDER EXISTS
-----------------------------------------*/

if (slides.length > 0) {


    /*-----------------------------------------
            SHOW SLIDE
    -----------------------------------------*/

    function showSlide(index) {

        slides.forEach((slide, i) => {

            slide.classList.remove("active");

            if (dots[i]) {
                dots[i].classList.remove("active");
            }

            const video = slide.querySelector("video");

            if (video) {
                video.pause();
            }

        });


        slides[index].classList.add("active");


        if (dots[index]) {
            dots[index].classList.add("active");
        }


        const activeVideo =
            slides[index].querySelector("video");


        if (activeVideo) {

            activeVideo.currentTime = 0;

            activeVideo.play().catch(() => {});

        }

    }


    /*-----------------------------------------
            NEXT SLIDE
    -----------------------------------------*/

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }


    /*-----------------------------------------
            PREVIOUS SLIDE
    -----------------------------------------*/

    function prevSlide() {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide = slides.length - 1;

        }

        showSlide(currentSlide);

    }


    /*-----------------------------------------
            START SLIDER
    -----------------------------------------*/

    function startSlider() {

        clearInterval(sliderInterval);

        sliderInterval =
            setInterval(nextSlide, 6000);

    }


    /*-----------------------------------------
            STOP SLIDER
    -----------------------------------------*/

    function stopSlider() {

        clearInterval(sliderInterval);

    }


    /*-----------------------------------------
            NEXT BUTTON
    -----------------------------------------*/

    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            nextSlide();

            stopSlider();

            startSlider();

        });

    }


    /*-----------------------------------------
            PREVIOUS BUTTON
    -----------------------------------------*/

    if (prevBtn) {

        prevBtn.addEventListener("click", () => {

            prevSlide();

            stopSlider();

            startSlider();

        });

    }


    /*-----------------------------------------
            DOTS
    -----------------------------------------*/

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentSlide = index;

            showSlide(currentSlide);

            stopSlider();

            startSlider();

        });

    });


    /*-----------------------------------------
            PAUSE ON HERO HOVER
    -----------------------------------------*/

    const hero = document.querySelector(".hero");

    if (hero) {

        hero.addEventListener(
            "mouseenter",
            stopSlider
        );

        hero.addEventListener(
            "mouseleave",
            startSlider
        );

    }


    /*-----------------------------------------
            INITIAL SLIDE
    -----------------------------------------*/

    showSlide(currentSlide);

    startSlider();

}


/*=========================================
        EXPERIENCE SCROLL REVEAL
=========================================*/

const experienceCards =
    document.querySelectorAll(".experience-card");


if (experienceCards.length > 0) {

    const experienceObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        experienceObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    experienceCards.forEach((card) => {

        experienceObserver.observe(card);

    });

}


/*=========================================
        WHY EXPLORE UK REVEAL
=========================================*/

const whyElements =
    document.querySelectorAll(
        ".why-image, .why-content"
    );


if (whyElements.length > 0) {

    const whyObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        whyObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    whyElements.forEach((element) => {

        whyObserver.observe(element);

    });

}


/*=========================================
        STATISTICS COUNTER
=========================================*/

const counters =
    document.querySelectorAll(".counter");


if (counters.length > 0) {

    const counterObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const counter =
                            entry.target;

                        const target =
                            Number(
                                counter.dataset.target
                            );


                        let current = 0;


                        const increment =
                            target / 60;


                        function updateCounter() {

                            current += increment;


                            if (current < target) {

                                counter.textContent =
                                    Math.ceil(current);

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                counter.textContent =
                                    target;

                            }

                        }


                        updateCounter();


                        counterObserver.unobserve(
                            counter
                        );

                    }

                });

            },

            {
                threshold: 0.5
            }

        );


    counters.forEach((counter) => {

        counterObserver.observe(counter);

    });

}


/*=========================================
        DESTINATIONS SEARCH & FILTER
        DESTINATIONS PAGE
=========================================*/

const destinationSearch =
    document.querySelector(
        "#destinationSearch"
    );


const destinationFilters =
    document.querySelectorAll(
        ".destination-filter"
    );


const destinationCards =
    document.querySelectorAll(
        ".destination-page-card"
    );


/*-----------------------------------------
        CHECK DESTINATION PAGE
-----------------------------------------*/

if (
    destinationSearch ||
    destinationFilters.length > 0 ||
    destinationCards.length > 0
) {


    /*-----------------------------------------
            FILTER FUNCTION
    -----------------------------------------*/

    function filterDestinations() {


        /* SEARCH VALUE */

        const searchValue =
            destinationSearch
                ? destinationSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        /* ACTIVE FILTER */

        const activeFilter =
            document.querySelector(
                ".destination-filter.active"
            );


        const selectedRegion =
            activeFilter
                ? activeFilter.dataset.region
                : "all";


        /*-----------------------------------------
                LOOP THROUGH CARDS
        -----------------------------------------*/

        destinationCards.forEach((card) => {


            const cardName =
                card.dataset.name
                    ? card.dataset.name
                        .toLowerCase()
                    : "";


            const cardRegion =
                card.dataset.region
                    ? card.dataset.region
                        .toLowerCase()
                    : "";


            /* SEARCH MATCH */

            const matchesSearch =
    cardName.includes(searchValue) ||
    cardRegion.includes(searchValue);


            /* REGION MATCH */

            const matchesRegion =
                selectedRegion === "all" ||
                cardRegion ===
                    selectedRegion.toLowerCase();


            /*-----------------------------------------
                    SHOW / HIDE
            -----------------------------------------*/

            if (
                matchesSearch &&
                matchesRegion
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });


        /*-----------------------------------------
                CHECK NO RESULTS
        -----------------------------------------*/

        const visibleCards =
            Array.from(destinationCards)
                .filter((card) => {

                    return card.style.display !== "none";

                });


        const noDestination =
            document.querySelector(
                "#noDestination"
            );


        if (noDestination) {

            if (
                visibleCards.length === 0 &&
                destinationCards.length > 0
            ) {

                noDestination.style.display =
                    "block";

            } else {

                noDestination.style.display =
                    "none";

            }

        }

    }


    /*-----------------------------------------
            FILTER BUTTONS
    -----------------------------------------*/

    destinationFilters.forEach((button) => {

        button.addEventListener(
            "click",
            () => {


                /* REMOVE ACTIVE */

                destinationFilters.forEach(
                    (btn) => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                /* ADD ACTIVE */

                button.classList.add(
                    "active"
                );


                /* FILTER */

                filterDestinations();

            }
        );

    });


    /*-----------------------------------------
            SEARCH INPUT
    -----------------------------------------*/

    if (destinationSearch) {

        destinationSearch.addEventListener(
            "input",
            filterDestinations
        );

    }


    /*-----------------------------------------
            INITIAL FILTER
    -----------------------------------------*/

    filterDestinations();

}


/*=========================================
        END OF SCRIPT
=========================================*/

/*=========================================
        ATTRACTIONS SEARCH & FILTER
=========================================*/

const attractionSearch =
    document.querySelector("#attractionSearch");

const attractionFilters =
    document.querySelectorAll(".attraction-filter");

const attractionCards =
    document.querySelectorAll(".attraction-card");


/*=========================================
        FILTER FUNCTION
=========================================*/

function filterAttractions() {

    const searchValue =
        attractionSearch
        ? attractionSearch.value.toLowerCase().trim()
        : "";

    const activeFilter =
        document.querySelector(
            ".attraction-filter.active"
        );

    const selectedCategory =
        activeFilter
        ? activeFilter.dataset.category
        : "all";


    attractionCards.forEach((card) => {

        const cardName =
            card.dataset.name
            ? card.dataset.name.toLowerCase()
            : "";

        const cardCategory =
            card.dataset.category
            ? card.dataset.category.toLowerCase()
            : "";


        const matchesSearch =
            cardName.includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;


        if (matchesSearch && matchesCategory) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/*=========================================
        FILTER BUTTONS
=========================================*/

attractionFilters.forEach((button) => {

    button.addEventListener("click", () => {

        attractionFilters.forEach((btn) => {

            btn.classList.remove("active");

        });


        button.classList.add("active");

        filterAttractions();

    });

});


/*=========================================
        SEARCH INPUT
=========================================*/

if (attractionSearch) {

    attractionSearch.addEventListener(
        "input",
        filterAttractions
    );

}


/*=========================================
        INITIAL FILTER
=========================================*/

filterAttractions();
/*=========================================
        EXPERIENCES SEARCH & FILTER
=========================================*/

document.addEventListener("DOMContentLoaded", function () {

    const experienceSearch =
        document.querySelector("#experienceSearch");

    const experienceFilters =
        document.querySelectorAll(".experience-filter");

    const experienceCards =
        document.querySelectorAll(".experience-card");


    // Agar Experiences page nahi hai,
    // to yahan se script stop ho jayegi.
    if (
        experienceCards.length === 0 ||
        experienceFilters.length === 0
    ) {
        return;
    }


    function filterExperiences() {

        const searchValue =
            experienceSearch
                ? experienceSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        const activeFilter =
            document.querySelector(
                ".experience-filter.active"
            );


        const selectedCategory =
            activeFilter
                ? activeFilter.dataset.category
                : "all";


        experienceCards.forEach(function (card) {

            const cardName =
                (card.dataset.name || "")
                    .toLowerCase();


            const cardCategory =
                (card.dataset.category || "")
                    .toLowerCase();


            const searchMatch =
                cardName.includes(searchValue);


            const categoryMatch =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;


            if (searchMatch && categoryMatch) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }


    /* FILTER BUTTONS */

    experienceFilters.forEach(function (button) {

        button.addEventListener("click", function () {

            experienceFilters.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            filterExperiences();

        });

    });


    /* SEARCH */

    if (experienceSearch) {

        experienceSearch.addEventListener(
            "input",
            filterExperiences
        );

    }


    /* INITIAL */

    filterExperiences();

});
console.log("BLOG FILTER JS LOADED");
/*=========================================
        BLOG SEARCH & CATEGORY FILTER
=========================================*/

document.addEventListener("DOMContentLoaded", function () {

    const blogGrid = document.getElementById("blogGrid");
    const searchInput = document.getElementById("blogSearch");
    const clearSearch = document.getElementById("clearSearch");
    const filterButtons = document.querySelectorAll(".blog-filter-btn");
    const resultsCount = document.getElementById("blogResultsCount");

    if (!blogGrid || !searchInput || !filterButtons.length) {
        return;
    }


    let activeCategory = "all";


    /*=========================================
            FILTER BLOGS
    =========================================*/

    function filterBlogs() {

        const searchTerm = searchInput.value
            .toLowerCase()
            .trim();

        let visibleCount = 0;
        const blogCards = Array.from(
    blogGrid.querySelectorAll(".blog-card")
);


        blogCards.forEach(function (card) {

            const category =
                card.dataset.category
                    ? card.dataset.category.toLowerCase()
                    : "";

            const name =
                card.dataset.name
                    ? card.dataset.name.toLowerCase()
                    : "";

            const title =
                card.querySelector("h3")
                    ? card.querySelector("h3").textContent.toLowerCase()
                    : "";

            const description =
                card.querySelector("p")
                    ? card.querySelector("p").textContent.toLowerCase()
                    : "";


            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;


            const matchesSearch =
                searchTerm === "" ||
                name.includes(searchTerm) ||
                title.includes(searchTerm) ||
                description.includes(searchTerm) ||
                category.includes(searchTerm);


            if (matchesCategory && matchesSearch) {

                card.classList.remove("filter-hidden");

                visibleCount++;

            } else {

                card.classList.add("filter-hidden");

            }

        });


        updateResultsCount(visibleCount);

        updateClearButton(searchTerm);

    }
        document.addEventListener(
        "exploreuk:blogs-loaded",
        filterBlogs
    );


    /*=========================================
            RESULTS COUNT
    =========================================*/

    function updateResultsCount(count) {

        if (!resultsCount) {
            return;
        }


        if (count === 0) {

            resultsCount.textContent =
                "No stories found";

        } else if (count === 1) {

            resultsCount.textContent =
                "Showing 1 story";

        } else {

            resultsCount.textContent =
                "Showing " + count + " stories";

        }

    }


    /*=========================================
            SEARCH INPUT
    =========================================*/

    searchInput.addEventListener(
        "input",
        function () {

            filterBlogs();

        }
    );


    /*=========================================
            CATEGORY BUTTONS
    =========================================*/

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(function (btn) {

                    btn.classList.remove("active");

                });


                button.classList.add("active");


                activeCategory =
                    button.dataset.filter;


                filterBlogs();

            }
        );

    });


    /*=========================================
            CLEAR SEARCH
    =========================================*/

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            function () {

                searchInput.value = "";

                filterBlogs();

                searchInput.focus();

            }
        );

    }


    /*=========================================
            CLEAR BUTTON VISIBILITY
    =========================================*/

    function updateClearButton(searchTerm) {

        if (!clearSearch) {
            return;
        }


        if (searchTerm.length > 0) {

            clearSearch.classList.add("show");

        } else {

            clearSearch.classList.remove("show");

        }

    }


    /*=========================================
            INITIAL RESULT
    =========================================*/

    updateResultsCount(
    blogGrid.querySelectorAll(".blog-card").length
);

});
/*==================================
            LONDON FAQ
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const currentItem = question.parentElement;

            /* Close other FAQs */

            document.querySelectorAll(".faq-item").forEach(function (item) {

                if (item !== currentItem) {
                    item.classList.remove("active");
                }

            });

            /* Toggle current FAQ */

            currentItem.classList.toggle("active");

        });

    });

});
/*==================================
        MOBILE MENU
===================================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuBtn.classList.toggle("active");

    });

}
/*==================================
       EXPLOREUK MOBILE MENU
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav-links");

    if (!menuBtn || !nav) {
        console.log("Mobile menu elements not found");
        return;
    }

    console.log("ExploreUK mobile menu ready");


    menuBtn.onclick = function (event) {

        event.preventDefault();
        event.stopPropagation();

        const isOpen = nav.classList.contains("mobile-menu-open");

        if (isOpen) {

            nav.classList.remove("mobile-menu-open");

            nav.style.setProperty("display", "none", "important");

            menuBtn.classList.remove("menu-open");

        } else {

            nav.classList.add("mobile-menu-open");

            nav.style.setProperty("display", "flex", "important");

            menuBtn.classList.add("menu-open");

        }

    };
    /*==================================
    MOBILE DESTINATIONS DROPDOWN
===================================*/

const destinationDropdown =
    nav.querySelector(".dropdown");

const destinationLink =
    nav.querySelector(".dropdown > a");

if (destinationDropdown && destinationLink) {

    destinationLink.addEventListener("click", function (event) {

        if (window.innerWidth <= 992) {

            event.preventDefault();
            event.stopPropagation();

            destinationDropdown.classList.toggle(
                "mobile-dropdown-open"
            );

        }

    });

}


    /* Close menu when normal navigation link is clicked */

    nav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 992) {

                const dropdown = link.closest(".dropdown");

                if (!dropdown) {

                    nav.classList.remove("mobile-menu-open");

                    nav.style.setProperty(
                        "display",
                        "none",
                        "important"
                    );

                    menuBtn.classList.remove("menu-open");

                }

            }

        });

    });


    /* Close menu if screen becomes desktop */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 992) {

            nav.classList.remove("mobile-menu-open");

            nav.style.removeProperty("display");

            menuBtn.classList.remove("menu-open");

        }

    });

});
/*==================================
      SEARCH BUTTON
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    const searchBtn = document.querySelector(".search-btn");

    if (searchBtn) {

        searchBtn.addEventListener("click", function () {

            let searchBox = document.querySelector(".site-search");

            if (!searchBox) {

                searchBox = document.createElement("div");

                searchBox.className = "site-search";

                searchBox.innerHTML = `
                    <div class="search-overlay">

                        <div class="search-container">

                            <button class="search-close" type="button">
                                <i class="fa-solid fa-xmark"></i>
                            </button>

                            <h2>Search ExploreUK</h2>

                            <div class="search-input-wrap">

                                <input
                                    type="search"
                                    id="siteSearchInput"
                                    placeholder="Search destinations, attractions..."
                                    autocomplete="off"
                                >

                                <button
                                    type="button"
                                    id="performSearch">

                                    <i class="fa-solid fa-magnifying-glass"></i>

                                </button>

                            </div>

                            <div id="searchResults"></div>

                        </div>

                    </div>
                `;

                document.body.appendChild(searchBox);


                /* Close */

                const closeBtn =
                    searchBox.querySelector(".search-close");

                closeBtn.addEventListener("click", function () {

                    searchBox.classList.remove("search-active");

                });


                /* Search */

                const input =
                    searchBox.querySelector("#siteSearchInput");

                const searchAction =
                    searchBox.querySelector("#performSearch");

                function performSearch() {

                    const query =
                        input.value.trim().toLowerCase();

                    if (!query) {
                        return;
                    }

                    const pages = {

                        london: "london.html",
                        edinburgh: "edinburgh.html",
                        manchester: "manchester.html",
                        liverpool: "liverpool.html",
                        oxford: "oxford.html",
                        cambridge: "cambridge.html",
                        bath: "bath.html",
                        york: "york.html",
                        destinations: "destinations.html",
                        attractions: "attractions.html",
                        experiences: "experiences.html",
                        guide: "guide.html",
                        blog: "blog.html",
                        contact: "contact.html"

                    };

                    if (pages[query]) {

                        window.location.href = pages[query];

                    } else {

                        document.querySelector("#searchResults").innerHTML =
                            "<p>No matching ExploreUK page found.</p>";

                    }

                }

                searchAction.addEventListener(
                    "click",
                    performSearch
                );

                input.addEventListener("keydown", function (e) {

                    if (e.key === "Enter") {
                        performSearch();
                    }

                });

            }

            searchBox.classList.add("search-active");

            const input =
                searchBox.querySelector("#siteSearchInput");

            if (input) {
                setTimeout(function () {
                    input.focus();
                }, 100);
            }

        });

    }

});
/*==================================
          DARK MODE
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    const themeBtn = document.querySelector(".theme-btn");

    if (!themeBtn) {
        return;
    }


    /* Restore saved theme */

    if (localStorage.getItem("exploreuk-theme") === "dark") {

        document.body.classList.add("dark-mode");

        const icon = themeBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        }

    }


    /* Toggle */

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "exploreuk-theme",
            isDark ? "dark" : "light"
        );


        const icon = themeBtn.querySelector("i");

        if (icon) {

            if (isDark) {

                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");

            } else {

                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");

            }

        }

    });

});
/*==================================
        CONTACT FAQ FIX
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const faqItem =
                question.closest(".faq-item");

            if (!faqItem) {
                return;
            }

            const answer =
                faqItem.querySelector(".faq-answer");

            if (!answer) {
                return;
            }

            const isOpen =
                faqItem.classList.contains("active");


            /* Close all other FAQs */

            document.querySelectorAll(".faq-item").forEach(function (item) {

                item.classList.remove("active");

                const itemAnswer =
                    item.querySelector(".faq-answer");

                if (itemAnswer) {
                    itemAnswer.style.maxHeight = null;
                }

            });


            /* Open clicked FAQ */

            if (!isOpen) {

                faqItem.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });

});
/*==================================
      WORDPRESS HOME API
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "WordPress API error: " + response.status
                );
            }

            return response.json();

        })
        .then(function (data) {

            console.log("WordPress Pages API:", data);

            if (!data.posts || data.posts.length === 0) {
                console.log("No WordPress pages found.");
                return;
            }

            /* Find Home page manually */

            const homePage = data.posts.find(function (page) {

                return page.slug === "home";

            });

            if (!homePage) {

                console.log("Home page not found.");

                return;
            }

            console.log("Home page found:", homePage);

            console.log(
                "Home content from WordPress:",
                homePage.content
            );

        })
        .catch(function (error) {

            console.error(
                "WordPress Home API failed:",
                error
            );

        });

});
/*==================================
      EXPLOREUK HERO CONTENT
      WORDPRESS CONNECTION
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    const WP_HOME_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_HOME_API)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const homePage = data.posts.find(function (page) {
                return page.slug === "home";
            });

            if (!homePage) {
                console.log("WordPress Home page not found.");
                return;
            }

            const content = homePage.content;

            console.log("ExploreUK Hero WordPress content loaded.");

            /*
             * HERO TAG
             */

            const heroTag = document.getElementById("wp-hero-tag");

            if (heroTag) {

                const tagMatch = content.match(
                    /ExploreUK Home Test/
                );

                if (tagMatch) {
                    heroTag.textContent =
                        "Luxury Travel Experience";
                }

            }

            /*
             * HERO DESCRIPTION
             */

            const heroDescription =
                document.getElementById("wp-hero-description");

            if (heroDescription) {

                const tempDiv =
                    document.createElement("div");

                tempDiv.innerHTML = content;

                const paragraphs =
                    tempDiv.querySelectorAll("p");

                if (paragraphs.length > 1) {

                    heroDescription.textContent =
                        paragraphs[1].textContent.trim();

                }

            }

        })

        .catch(function (error) {

            console.error(
                "Hero WordPress connection failed:",
                error
            );

        });

});
/*==================================
   WORDPRESS FEATURED DESTINATIONS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    const WP_PAGES_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_PAGES_API)
        .then(response => response.json())
        .then(data => {

            const homePage = data.posts.find(
                page => page.slug === "home"
            );

            if (!homePage) {
                console.log("Home page not found.");
                return;
            }

            const content = homePage.content;

            /* Temporary WordPress content reader */

            const temp = document.createElement("div");
            temp.innerHTML = content;

            const paragraphs = temp.querySelectorAll("p");

            /*
             * WordPress Home content format:
             *
             * Paragraph 1 = Featured Destinations title
             * Paragraph 2 = Featured Destinations description
             */

            if (paragraphs.length >= 2) {

                const destinationTitle =
                    document.getElementById(
                        "wp-destinations-title"
                    );

                const destinationDescription =
                    document.getElementById(
                        "wp-destinations-description"
                    );

                if (destinationTitle) {
                    destinationTitle.textContent =
                        paragraphs[0].textContent.trim();
                }

                if (destinationDescription) {
                    destinationDescription.textContent =
                        paragraphs[1].textContent.trim();
                }

            }

            console.log(
                "Featured Destinations loaded from WordPress."
            );

        })

        .catch(error => {

            console.error(
                "Featured Destinations WordPress error:",
                error
            );

        });

});
/*==================================
   WORDPRESS DESTINATION CARDS
   BR TAG FIX
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const homePage = data.posts.find(function (page) {
                return page.slug === "home";
            });

            if (!homePage) {
                console.log("WordPress Home page not found.");
                return;
            }

            const temp = document.createElement("div");

            temp.innerHTML = homePage.content;

            const validCities = [
                "London",
                "Edinburgh",
                "Manchester",
                "Oxford",
                "Bath",
                "York"
            ];

            let destinations = [];

            /*
             * Find every paragraph
             */

            temp.querySelectorAll("p").forEach(function (paragraph) {

                /*
                 * Get text separated by BR tags
                 */

                let html = paragraph.innerHTML;

                let parts = html.split(/<br\s*\/?>/i);

                parts.forEach(function (part) {

                    let city =
                        part
                            .replace(/<[^>]*>/g, "")
                            .replace(/&nbsp;/g, " ")
                            .trim();

                    /*
                     * Decode HTML entities
                     */

                    const decoder =
                        document.createElement("textarea");

                    decoder.innerHTML = city;

                    city =
                        decoder.value.trim();

                    if (validCities.includes(city)) {

                        destinations.push(city);

                    }

                });

            });

            /*
             * Remove duplicates
             */

            destinations =
                [...new Set(destinations)];

            console.log(
                "Destination cards updated from WordPress:",
                destinations
            );

            /*
             * Find destination cards
             */

            const cards =
                document.querySelectorAll(
                    ".destination-card"
                );

            cards.forEach(function (card, index) {

                const city =
                    destinations[index];

                if (!city) {
                    return;
                }

                /*
                 * City name
                 */

                const name =
                    card.querySelector(
                        ".wp-dest-name"
                    );

                if (name) {
                    name.textContent = city;
                }

                /*
                 * Explore link
                 */

                const link =
                    card.querySelector(
                        ".wp-dest-link"
                    );

                if (link) {

                    const slug =
                        city
                            .toLowerCase()
                            .replace(/\s+/g, "-");

                    link.href =
                        slug + ".html";

                }

            });

        })

        .catch(function (error) {

            console.error(
                "Destination card API error:",
                error
            );

        });

});
/*==================================
   WORDPRESS LONDON PAGE CONTENT
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const londonPage = data.posts.find(function (page) {
                return page.slug === "london";
            });

            if (!londonPage) {
                console.log("WordPress London page not found.");
                return;
            }

            console.log(
                "London WordPress page found:",
                londonPage
            );

            /* Create temporary container */
            const temp = document.createElement("div");

            temp.innerHTML = londonPage.content;

            /* Get all paragraphs */
            const paragraphs =
                Array.from(temp.querySelectorAll("p"));

            const textContent =
                paragraphs
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);

            console.log(
                "London WordPress content:",
                textContent
            );




            /*==================================
                UPDATE LONDON DESCRIPTION
            ==================================*/

            if (textContent[1]) {

                const description =
                    document.getElementById(
                        "wp-london-description"
                    );

                if (description) {
                    description.textContent =
                        textContent[1];
                }
            }


            console.log(
                "London content updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "London WordPress API error:",
                error
            );

        });

});
/*==================================
   LONDON PLACES — WORDPRESS
   FINAL FIX
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const londonPage = data.posts.find(function (page) {
                return page.slug === "london";
            });

            if (!londonPage) {
                console.log("London WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");

            temp.innerHTML = londonPage.content;

            const validPlaces = [
                "Big Ben",
                "Tower Bridge",
                "Buckingham Palace",
                "London Eye",
                "Westminster Abbey",
                "The Shard"
            ];

            let places = [];

            /*==================================
                READ WORDPRESS CONTENT
            ==================================*/

            temp.querySelectorAll("p").forEach(function (paragraph) {

                let text = paragraph.innerText || "";

                /*
                 * Convert multiple spaces/new lines
                 * into clean individual lines
                 */

                let lines = text
                    .split(/\r?\n/)
                    .map(function (item) {
                        return item
                            .replace(/\s+/g, " ")
                            .trim();
                    })
                    .filter(Boolean);

                lines.forEach(function (line) {

                    validPlaces.forEach(function (place) {

                        /*
                         * Check whether this WordPress
                         * line contains a valid place
                         */

                        if (
                            line.toLowerCase() ===
                            place.toLowerCase()
                        ) {

                            places.push(place);

                        }

                    });

                });

            });

            /*==================================
                FALLBACK:
                SEARCH COMPLETE HTML TEXT
            ==================================*/

            if (places.length === 0) {

                const fullText =
                    temp.innerText
                        .replace(/\s+/g, " ")
                        .trim();

                validPlaces.forEach(function (place) {

                    if (
                        fullText
                            .toLowerCase()
                            .includes(place.toLowerCase())
                    ) {

                        places.push(place);

                    }

                });

            }

            /*==================================
                REMOVE DUPLICATES
            ==================================*/

            places = [...new Set(places)];

            console.log(
                "London places from WordPress:",
                places
            );

            /*==================================
                UPDATE HTML CARDS
            ==================================*/

            const cards =
                document.querySelectorAll(
                    ".wp-london-place-name"
                );

            cards.forEach(function (card, index) {

                if (places[index]) {

                    card.textContent =
                        places[index];

                }

            });

            console.log(
                "London place cards updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "London places API error:",
                error
            );

        });

});
/*==================================
   LONDON THINGS TO DO — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const londonPage = data.posts.find(function (page) {
                return page.slug === "london";
            });

            if (!londonPage) {
                console.log("London WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = londonPage.content;

            const validExperiences = [
                "Explore Historic London",
                "Enjoy the River Thames",
                "Visit World-Class Museums",
                "Experience West End Shows",
                "Shop Famous Streets",
                "Taste London"
            ];

            let experiences = [];

            temp.querySelectorAll("p").forEach(function (paragraph) {

                let html = paragraph.innerHTML;

                let parts = html.split(/<br\s*\/?>/i);

                parts.forEach(function (part) {

                    let text = part
                        .replace(/<[^>]*>/g, "")
                        .trim();

                    const decoder =
                        document.createElement("textarea");

                    decoder.innerHTML = text;

                    text = decoder.value.trim();

                    if (validExperiences.includes(text)) {
                        experiences.push(text);
                    }

                });

            });

            experiences = [...new Set(experiences)];

            console.log(
                "London experiences from WordPress:",
                experiences
            );

            const cards =
                document.querySelectorAll(".experience-card");

            cards.forEach(function (card, index) {

                const experience =
                    experiences[index];

                if (!experience) {
                    return;
                }

                const title =
                    card.querySelector("h3");

                if (title) {
                    title.textContent = experience;
                }

            });

            console.log(
                "London experience cards updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "London experiences API error:",
                error
            );

        });

});
/*==================================
   LONDON GETTING AROUND — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const londonPage = data.posts.find(function (page) {
                return page.slug === "london";
            });

            if (!londonPage) {
                console.log("London WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = londonPage.content;

            const validTransport = [
                "Underground",
                "London Bus",
                "Black Cab",
                "Walking"
            ];

            let transport = [];

            temp.querySelectorAll("p").forEach(function (paragraph) {

                let html = paragraph.innerHTML;

                let parts = html.split(/<br\s*\/?>/i);

                parts.forEach(function (part) {

                    let text = part
                        .replace(/<[^>]*>/g, "")
                        .trim();

                    const decoder =
                        document.createElement("textarea");

                    decoder.innerHTML = text;

                    text = decoder.value.trim();

                    if (validTransport.includes(text)) {
                        transport.push(text);
                    }

                });

            });

            transport = [...new Set(transport)];

            console.log(
                "London transport from WordPress:",
                transport
            );

            const cards =
                document.querySelectorAll(".transport-card");

            cards.forEach(function (card, index) {

                const transportName =
                    transport[index];

                if (!transportName) {
                    return;
                }

                const title =
                    card.querySelector("h3");

                if (title) {
                    title.textContent = transportName;
                }

            });

            console.log(
                "London transport cards updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "London transport API error:",
                error
            );

        });

});
/*==================================
   LONDON BEST TIME — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const londonPage = data.posts.find(function (page) {
                return page.slug === "london";
            });

            if (!londonPage) {
                console.log("London WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = londonPage.content;

            const validSeasons = [
                "Spring",
                "Summer",
                "Autumn",
                "Winter"
            ];

            let seasons = [];

            temp.querySelectorAll("p").forEach(function (paragraph) {

                let html = paragraph.innerHTML;

                let parts = html.split(/<br\s*\/?>/i);

                parts.forEach(function (part) {

                    let text = part
                        .replace(/<[^>]*>/g, "")
                        .trim();

                    const decoder =
                        document.createElement("textarea");

                    decoder.innerHTML = text;

                    text = decoder.value.trim();

                    if (validSeasons.includes(text)) {
                        seasons.push(text);
                    }

                });

            });

            seasons = [...new Set(seasons)];

            console.log(
                "London seasons from WordPress:",
                seasons
            );

            const cards =
                document.querySelectorAll(".season-card");

            cards.forEach(function (card, index) {

                const season = seasons[index];

                if (!season) {
                    return;
                }

                const title =
                    card.querySelector("h3");

                if (title) {
                    title.textContent = season;
                }

            });

            console.log(
                "London season cards updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "London seasons API error:",
                error
            );

        });

});
/*==================================
   LONDON TRAVEL TIPS — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const londonPage = data.posts.find(function (page) {
                return page.slug === "london";
            });

            if (!londonPage) {
                console.log("London WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = londonPage.content;

            const validTips = [
                "Plan Your Budget",
                "Book Popular Attractions",
                "Use Public Transport",
                "Check the Weather",
                "Stay Aware",
                "Stay Connected"
            ];

            let tips = [];

            temp.querySelectorAll("p").forEach(function (paragraph) {

                let html = paragraph.innerHTML;

                let parts = html.split(/<br\s*\/?>/i);

                parts.forEach(function (part) {

                    let text = part
                        .replace(/<[^>]*>/g, "")
                        .trim();

                    const decoder =
                        document.createElement("textarea");

                    decoder.innerHTML = text;

                    text = decoder.value.trim();

                    if (validTips.includes(text)) {
                        tips.push(text);
                    }

                });

            });

            tips = [...new Set(tips)];

            console.log(
                "London travel tips from WordPress:",
                tips
            );

            const cards =
                document.querySelectorAll(".travel-tip-card");

            cards.forEach(function (card, index) {

                const tip = tips[index];

                if (!tip) {
                    return;
                }

                const title =
                    card.querySelector("h3");

                if (title) {
                    title.textContent = tip;
                }

            });

            console.log(
                "London travel tip cards updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "London travel tips API error:",
                error
            );

        });

});
/*==================================
   LONDON FAQ — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const londonPage = data.posts.find(function (page) {
                return page.slug === "london";
            });

            if (!londonPage) {
                console.log("London WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = londonPage.content;

            const validQuestions = [
                "How many days do you need in London?",
                "What is the easiest way to get around London?",
                "What is the best time to visit London?",
                "Is London expensive for tourists?",
                "What are the must-see places in London?",
                "Is London a good city for walking?"
            ];

            let questions = [];

            temp.querySelectorAll("p").forEach(function (paragraph) {

                let html = paragraph.innerHTML;

                let parts = html.split(/<br\s*\/?>/i);

                parts.forEach(function (part) {

                    let text = part
                        .replace(/<[^>]*>/g, "")
                        .trim();

                    const decoder =
                        document.createElement("textarea");

                    decoder.innerHTML = text;

                    text = decoder.value.trim();

                    if (validQuestions.includes(text)) {
                        questions.push(text);
                    }

                });

            });

            questions = [...new Set(questions)];

            console.log(
                "London FAQ questions from WordPress:",
                questions
            );

            const faqItems =
                document.querySelectorAll(".faq-item");

            faqItems.forEach(function (item, index) {

                const question =
                    questions[index];

                if (!question) {
                    return;
                }

                const questionText =
                    item.querySelector(".faq-question span");

                if (questionText) {
                    questionText.textContent = question;
                }

            });

            console.log(
                "London FAQ questions updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "London FAQ API error:",
                error
            );

        });

});
/*==================================
   LONDON FAQ ACCORDION
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const faqQuestions =
        document.querySelectorAll(".london-faq .faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const faqItem =
                question.closest(".faq-item");

            const answer =
                faqItem.querySelector(".faq-answer");

            const icon =
                question.querySelector("i");


            /* Close other FAQs */

            document
                .querySelectorAll(".london-faq .faq-item")
                .forEach(function (item) {

                    if (item !== faqItem) {

                        item.classList.remove("active");

                        const otherAnswer =
                            item.querySelector(".faq-answer");

                        const otherIcon =
                            item.querySelector(".faq-question i");

                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                        }

                        if (otherIcon) {
                            otherIcon.classList.remove("fa-minus");
                            otherIcon.classList.add("fa-plus");
                        }

                    }

                });


            /* Toggle current FAQ */

            if (faqItem.classList.contains("active")) {

                faqItem.classList.remove("active");

                if (answer) {
                    answer.style.maxHeight = null;
                }

                if (icon) {
                    icon.classList.remove("fa-minus");
                    icon.classList.add("fa-plus");
                }

            } else {

                faqItem.classList.add("active");

                if (answer) {
                    answer.style.maxHeight =
                        answer.scrollHeight + "px";
                }

                if (icon) {
                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");
                }

            }

        });

    });

    console.log("London FAQ accordion ready.");

});
/*==================================
   LONDON CTA — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const londonPage = data.posts.find(function (page) {
                return page.slug === "london";
            });

            if (!londonPage) {
                console.log("London WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = londonPage.content;

            let ctaHeading = "";
            let ctaText = "";

            temp.querySelectorAll("p").forEach(function (paragraph) {

                const text = paragraph.textContent.trim();

                if (
                    text === "Ready to Explore London?"
                ) {
                    ctaHeading = text;
                }

                if (
                    text.includes(
                        "From royal landmarks and historic streets"
                    )
                ) {
                    ctaText = text;
                }

            });

            console.log(
                "London CTA from WordPress:",
                {
                    heading: ctaHeading,
                    text: ctaText
                }
            );

            /* CTA Heading */

            const heading =
                document.querySelector(".london-cta h2");

            if (heading && ctaHeading) {

                heading.innerHTML =
                    ctaHeading.replace(
                        "Explore London",
                        "<span>Explore London</span>"
                    );

            }

            /* CTA Text */

            const paragraph =
                document.querySelector(".london-cta p");

            if (paragraph && ctaText) {
                paragraph.textContent = ctaText;
            }

            console.log(
                "London CTA updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "London CTA API error:",
                error
            );

        });

});
/*==================================
   LONDON CTA BUTTONS — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const londonPage = data.posts.find(function (page) {
                return page.slug === "london";
            });

            if (!londonPage) {
                console.log(
                    "London page not found for CTA buttons."
                );
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = londonPage.content;

            const validButtons = [
                "Explore Attractions",
                "Read Travel Guide"
            ];

            let buttons = [];

            /*
                Find CTA links from WordPress
            */

            temp.querySelectorAll("a").forEach(function (link) {

                const text = link.textContent.trim();

                if (validButtons.includes(text)) {

                    buttons.push({
                        text: text,
                        url: link.getAttribute("href") || "#"
                    });

                }

            });

            /*
                Remove duplicates
            */

            buttons = buttons.filter(function (button, index, self) {

                return index === self.findIndex(function (item) {

                    return item.text === button.text;

                });

            });

            console.log(
                "London CTA buttons from WordPress:",
                buttons
            );

            const primaryButton =
                document.querySelector(".cta-primary-btn");

            const secondaryButton =
                document.querySelector(".cta-secondary-btn");


            /*==================================
                PRIMARY BUTTON
            ==================================*/

            if (primaryButton && buttons[0]) {

                primaryButton.href =
                    buttons[0].url;

                primaryButton.textContent = "";

                primaryButton.append(
                    document.createTextNode(
                        buttons[0].text
                    )
                );

                const icon =
                    document.createElement("i");

                icon.className =
                    "fa-solid fa-arrow-right";

                primaryButton.append(icon);

            }


            /*==================================
                SECONDARY BUTTON
            ==================================*/

            if (secondaryButton && buttons[1]) {

                secondaryButton.href =
                    buttons[1].url;

                secondaryButton.textContent = "";

                secondaryButton.append(
                    document.createTextNode(
                        buttons[1].text
                    )
                );

                const icon =
                    document.createElement("i");

                icon.className =
                    "fa-solid fa-book-open";

                secondaryButton.append(icon);

            }


            console.log(
                "London CTA buttons and links updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "London CTA buttons API error:",
                error
            );

        });

});
/*==================================
   LONDON HERO IMAGE — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const londonPage = data.posts.find(function (page) {
                return page.slug === "london";
            });

            if (!londonPage) {
                console.log("London WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = londonPage.content;

            /*
                Find first image from WordPress London page
            */

            const image = temp.querySelector("img");

            if (!image) {
                console.log(
                    "London Hero image not found in WordPress."
                );
                return;
            }

            const imageURL =
                image.getAttribute("src");

            if (!imageURL) {
                console.log(
                    "London Hero image URL not found."
                );
                return;
            }

            /*
                Update London Hero background
            */

            const hero =
                document.querySelector(".london-hero");

            if (hero) {

                hero.style.backgroundImage =
                    "url('" + imageURL + "')";

                console.log(
                    "London Hero image updated from WordPress:",
                    imageURL
                );

            }

        })

        .catch(function (error) {

            console.error(
                "London Hero image API error:",
                error
            );

        });

});
/*==================================
   LONDON HERO BUTTONS — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on London page */
    if (!window.location.pathname.includes("london.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const londonPage = data.posts.find(function (page) {
                return page.slug === "london";
            });

            if (!londonPage) {
                console.log("London WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = londonPage.content;

            const validButtons = [
                "Explore London",
                "Travel Tips"
            ];

            let buttons = [];

            temp.querySelectorAll("p").forEach(function (paragraph) {

                let html = paragraph.innerHTML;

                let parts = html.split(/<br\s*\/?>/i);

                parts.forEach(function (part) {

                    let text = part
                        .replace(/<[^>]*>/g, "")
                        .trim();

                    const decoder =
                        document.createElement("textarea");

                    decoder.innerHTML = text;

                    text = decoder.value.trim();

                    if (validButtons.includes(text)) {
                        buttons.push(text);
                    }

                });

            });

            buttons = [...new Set(buttons)];

            console.log(
                "London Hero buttons from WordPress:",
                buttons
            );


            /* Explore London button */

            const primaryButton =
                document.querySelector(".hero-primary-btn");

            if (primaryButton && buttons[0]) {

                primaryButton.textContent = "";

                primaryButton.append(
                    document.createTextNode(buttons[0])
                );

                const icon =
                    document.createElement("i");

                icon.className =
                    "fa-solid fa-arrow-down";

                primaryButton.append(icon);

            }


            /* Travel Tips button */

            const secondaryButton =
                document.querySelector(".hero-secondary-btn");

            if (secondaryButton && buttons[1]) {

                secondaryButton.textContent = "";

                secondaryButton.append(
                    document.createTextNode(buttons[1])
                );

                const icon =
                    document.createElement("i");

                icon.className =
                    "fa-solid fa-arrow-right";

                secondaryButton.append(icon);

            }


            console.log(
                "London Hero buttons updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "London Hero buttons API error:",
                error
            );

        });

});
/*==================================
   WORDPRESS EDINBURGH PAGE CONTENT
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("WordPress Edinburgh page not found.");
                return;
            }

            console.log(
                "Edinburgh WordPress page found:",
                edinburghPage
            );

            /* Create temporary container */
            const temp = document.createElement("div");

            temp.innerHTML = edinburghPage.content;

            /* Get all paragraphs */
            const paragraphs =
                Array.from(temp.querySelectorAll("p"));

            const textContent =
                paragraphs
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);

            console.log(
                "Edinburgh WordPress content:",
                textContent
            );


            /*==================================
                UPDATE EDINBURGH HERO EYEBROW
            ==================================*/

            if (textContent[0]) {

                const eyebrow =
                    document.getElementById(
                        "wp-edinburgh-eyebrow"
                    );

                if (eyebrow) {
                    eyebrow.textContent =
                        textContent[0];
                }
            }


            /*==================================
                UPDATE EDINBURGH HERO INTRO
            ==================================*/

            if (textContent[1]) {

                const heroIntro =
                    document.getElementById(
                        "wp-edinburgh-intro"
                    );

                if (heroIntro) {
                    heroIntro.textContent =
                        textContent[1];
                }
            }


            /*==================================
                UPDATE EDINBURGH INTRO DESCRIPTION
            ==================================*/

            if (textContent[2]) {

                const description =
                    document.getElementById(
                        "wp-edinburgh-description"
                    );

                if (description) {
                    description.textContent =
                        textContent[2];
                }
            }


            /*==================================
                UPDATE EDINBURGH DESCRIPTION 2
            ==================================*/

            if (textContent[3]) {

                const description2 =
                    document.getElementById(
                        "wp-edinburgh-description-2"
                    );

                if (description2) {
                    description2.textContent =
                        textContent[3];
                }
            }


            console.log(
                "Edinburgh Hero and Intro updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "Edinburgh WordPress API error:",
                error
            );

        });

});


/*==================================
   EDINBURGH TOP PLACES — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("Edinburgh WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");

            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /*==================================
                EDINBURGH PLACE NAMES
            ==================================*/

            const placeNames = [
                "Edinburgh Castle",
                "Royal Mile",
                "Arthur's Seat",
                "Palace of Holyroodhouse",
                "Calton Hill",
                "Dean Village"
            ];

            const places = [];


            /*==================================
                FIND PLACE + DESCRIPTION
            ==================================*/

            placeNames.forEach(function (placeName) {

                const index =
                    textContent.findIndex(function (text) {

                        return text
                            .toLowerCase()
                            .replace(/[’‘]/g, "'")
                            .trim()
                            ===
                            placeName
                                .toLowerCase()
                                .replace(/[’‘]/g, "'")
                                .trim();

                    });

                if (index !== -1 && textContent[index + 1]) {

                    places.push({
                        name: textContent[index],
                        description: textContent[index + 1]
                    });

                }

            });


            console.log(
                "Edinburgh places from WordPress:",
                places
            );


            /*==================================
                UPDATE PLACE NAMES
            ==================================*/

            places.forEach(function (place, index) {

                const nameElement =
                    document.getElementById(
                        "wp-edinburgh-place-" + (index + 1)
                    );

                if (nameElement) {

                    nameElement.textContent =
                        place.name;

                }

            });


            /*==================================
                UPDATE PLACE DESCRIPTIONS
            ==================================*/

            const cards =
                document.querySelectorAll(
                    ".destination-place-card"
                );

            cards.forEach(function (card, index) {

                const place = places[index];

                if (!place) {
                    return;
                }

                const description =
                    card.querySelector("p");

                if (description) {

                    description.textContent =
                        place.description;

                }

            });


            console.log(
                "Edinburgh place cards updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "Edinburgh places API error:",
                error
            );

        });

});


/*==================================
   EDINBURGH EXPERIENCES — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("Edinburgh WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");

            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /*==================================
                EXPERIENCE NAMES
            ==================================*/

            const experienceNames = [
                "Taste Scottish Whisky",
                "Explore the Old Town",
                "Enjoy Arts & Culture",
                "Hike Arthur's Seat",
                "Discover Local Food",
                "Shop the City"
            ];

            const experiences = [];


            /*==================================
                FIND EXPERIENCE + DESCRIPTION
            ==================================*/

            experienceNames.forEach(function (experienceName) {

                const index =
                    textContent.findIndex(function (text) {

                        return text
                            .toLowerCase()
                            .replace(/[’‘]/g, "'")
                            .trim()
                            ===
                            experienceName
                                .toLowerCase()
                                .replace(/[’‘]/g, "'")
                                .trim();

                    });

                if (index !== -1 && textContent[index + 1]) {

                    experiences.push({
                        name: textContent[index],
                        description: textContent[index + 1]
                    });

                }

            });


            console.log(
                "Edinburgh experiences from WordPress:",
                experiences
            );


            /*==================================
                UPDATE EXPERIENCE NAMES
            ==================================*/

            experiences.forEach(function (experience, index) {

                const nameElement =
                    document.getElementById(
                        "wp-edinburgh-experience-" + (index + 1)
                    );

                if (nameElement) {

                    nameElement.textContent =
                        experience.name;

                }

            });


            /*==================================
                UPDATE EXPERIENCE DESCRIPTIONS
            ==================================*/

            const experienceCards =
                document.querySelectorAll(
                    ".experience-card"
                );

            experienceCards.forEach(function (card, index) {

                const experience =
                    experiences[index];

                if (!experience) {
                    return;
                }

                const description =
                    card.querySelector("p");

                if (description) {

                    description.textContent =
                        experience.description;

                }

            });


            console.log(
                "Edinburgh experience cards updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "Edinburgh experiences API error:",
                error
            );

        });

});


/*==================================
   EDINBURGH TRANSPORT — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("Edinburgh WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");

            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /*==================================
                TRANSPORT NAMES
            ==================================*/

            const transportNames = [
                "City Bus",
                "Tram",
                "Taxi",
                "Walking"
            ];

            const transports = [];


            /*==================================
                FIND TRANSPORT + DESCRIPTION
            ==================================*/

            transportNames.forEach(function (transportName) {

                const index =
                    textContent.findIndex(function (text) {

                        return text
                            .toLowerCase()
                            .replace(/[’‘]/g, "'")
                            .trim()
                            ===
                            transportName
                                .toLowerCase()
                                .replace(/[’‘]/g, "'")
                                .trim();

                    });

                if (index !== -1 && textContent[index + 1]) {

                    transports.push({
                        name: textContent[index],
                        description: textContent[index + 1]
                    });

                }

            });


            console.log(
                "Edinburgh transport from WordPress:",
                transports
            );


            /*==================================
                UPDATE TRANSPORT NAMES
            ==================================*/

            transports.forEach(function (transport, index) {

                const nameElement =
                    document.getElementById(
                        "wp-edinburgh-transport-" + (index + 1)
                    );

                if (nameElement) {

                    nameElement.textContent =
                        transport.name;

                }

            });


            /*==================================
                UPDATE TRANSPORT DESCRIPTIONS
            ==================================*/

            const transportCards =
                document.querySelectorAll(
                    ".transport-card"
                );

            transportCards.forEach(function (card, index) {

                const transport =
                    transports[index];

                if (!transport) {
                    return;
                }

                const description =
                    card.querySelector("p");

                if (description) {

                    description.textContent =
                        transport.description;

                }

            });


            console.log(
                "Edinburgh transport cards updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "Edinburgh transport API error:",
                error
            );

        });

});


/*==================================
   EDINBURGH SEASONS — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("Edinburgh WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");

            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /*==================================
                SEASON NAMES
            ==================================*/

            const seasonNames = [
                "Spring",
                "Summer",
                "Autumn",
                "Winter"
            ];

            const seasons = [];


            /*==================================
                FIND SEASON + DESCRIPTION
            ==================================*/

            seasonNames.forEach(function (seasonName) {

                const index =
                    textContent.findIndex(function (text) {

                        return text
                            .toLowerCase()
                            .trim()
                            ===
                            seasonName
                                .toLowerCase()
                                .trim();

                    });

                if (index !== -1 && textContent[index + 1]) {

                    seasons.push({
                        name: textContent[index],
                        description: textContent[index + 1]
                    });

                }

            });


            console.log(
                "Edinburgh seasons from WordPress:",
                seasons
            );


            /*==================================
                UPDATE SEASON NAMES
            ==================================*/

            seasons.forEach(function (season, index) {

                const nameElement =
                    document.getElementById(
                        "wp-edinburgh-season-" + (index + 1)
                    );

                if (nameElement) {

                    nameElement.textContent =
                        season.name;

                }

            });


            /*==================================
                UPDATE SEASON DESCRIPTIONS
            ==================================*/

            const seasonCards =
                document.querySelectorAll(
                    ".season-card"
                );

            seasonCards.forEach(function (card, index) {

                const season =
                    seasons[index];

                if (!season) {
                    return;
                }

                const description =
                    card.querySelector("p");

                if (description) {

                    description.textContent =
                        season.description;

                }

            });


            console.log(
                "Edinburgh season cards updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "Edinburgh seasons API error:",
                error
            );

        });

});
/*==================================
   EDINBURGH TRAVEL TIPS — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("Edinburgh WordPress page not found.");
                return;
            }

            const temp = document.createElement("div");

            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /*==================================
                TRAVEL TIP NAMES
            ==================================*/

            const tipNames = [
                "Plan Your Trip",
                "Book Attractions",
                "Use Public Transport",
                "Carry Comfortable Shoes",
                "Check the Weather",
                "Explore Beyond the Centre"
            ];

            const tips = [];


            /*==================================
                FIND TIP + DESCRIPTION
            ==================================*/

            tipNames.forEach(function (tipName) {

                const index =
                    textContent.findIndex(function (text) {

                        return text
                            .toLowerCase()
                            .replace(/[’‘]/g, "'")
                            .trim()
                            ===
                            tipName
                                .toLowerCase()
                                .replace(/[’‘]/g, "'")
                                .trim();

                    });

                if (index !== -1 && textContent[index + 1]) {

                    tips.push({
                        name: textContent[index],
                        description: textContent[index + 1]
                    });

                }

            });


            console.log(
                "Edinburgh travel tips from WordPress:",
                tips
            );


            /*==================================
                UPDATE TIP NAMES
            ==================================*/

            tips.forEach(function (tip, index) {

                const nameElement =
                    document.getElementById(
                        "wp-edinburgh-tip-" + (index + 1)
                    );

                if (nameElement) {

                    nameElement.textContent =
                        tip.name;

                }

            });


            /*==================================
                UPDATE TIP DESCRIPTIONS
            ==================================*/

            const tipCards =
                document.querySelectorAll(
                    ".tip-card"
                );

            tipCards.forEach(function (card, index) {

                const tip = tips[index];

                if (!tip) {
                    return;
                }

                const description =
                    card.querySelector("p");

                if (description) {

                    description.textContent =
                        tip.description;

                }

            });


            console.log(
                "Edinburgh travel tip cards updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "Edinburgh travel tips API error:",
                error
            );

        });

});
/*==================================
   EDINBURGH FAQ — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("WordPress Edinburgh page not found.");
                return;
            }

            const temp = document.createElement("div");

            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /*==================================
                EDINBURGH FAQ QUESTIONS
            ==================================*/

            const faqQuestions = [
                "How many days do you need in Edinburgh?",
                "What is the easiest way to get around Edinburgh?",
                "What is the best time to visit Edinburgh?",
                "Is Edinburgh expensive for tourists?",
                "What are the must-see places in Edinburgh?",
                "Is Edinburgh a good city for walking?"
            ];


            const faqs = [];


            faqQuestions.forEach(function (question) {

                const index =
                    textContent.findIndex(function (text) {

                        return text
                            .toLowerCase()
                            .replace(/[’‘]/g, "'")
                            .trim()
                            ===
                            question
                                .toLowerCase()
                                .replace(/[’‘]/g, "'")
                                .trim();

                    });


                if (index !== -1 && textContent[index + 1]) {

                    faqs.push({

                        question: textContent[index],

                        answer: textContent[index + 1]

                    });

                }

            });


            console.log(
                "Edinburgh FAQ from WordPress:",
                faqs
            );


            /*==================================
                UPDATE FAQ QUESTIONS
            ==================================*/

            faqs.forEach(function (faq, index) {

                const questionElement =
                    document.getElementById(
                        "wp-edinburgh-faq-question-" + (index + 1)
                    );

                if (questionElement) {

                    questionElement.textContent =
                        faq.question;

                }

            });


            /*==================================
                UPDATE FAQ ANSWERS
            ==================================*/

            faqs.forEach(function (faq, index) {

                const answerElement =
                    document.getElementById(
                        "wp-edinburgh-faq-answer-" + (index + 1)
                    );

                if (answerElement) {

                    answerElement.textContent =
                        faq.answer;

                }

            });


            console.log(
                "Edinburgh FAQ questions and answers updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "Edinburgh FAQ API error:",
                error
            );

        });

});
/*==================================
   EDINBURGH FAQ ACCORDION
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const faqItems =
        document.querySelectorAll(
            ".edinburgh-faq .faq-item"
        );

    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }

        question.addEventListener("click", function () {

            const isOpen =
                item.classList.contains("active");


            /* Close all other FAQs */

            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            });


            /* Open clicked FAQ */

            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });


    console.log(
        "Edinburgh FAQ accordion ready."
    );

});
/*==================================
   EDINBURGH CTA — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("WordPress Edinburgh page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);

            /* Find CTA content */

            const eyebrowText =
                "YOUR SCOTTISH ADVENTURE STARTS HERE";

            const headingText =
                "Ready to Explore Edinburgh?";

            const descriptionText =
                "From ancient castles and historic streets to spectacular viewpoints, Scottish culture and unforgettable experiences, Edinburgh is waiting to be discovered.";

            const primaryButtonText =
                "Explore Attractions";

            const secondaryButtonText =
                "Read Travel Guide";


            /*==================================
                UPDATE CTA EYEBROW
            ==================================*/

            const eyebrow =
                document.querySelector(
                    ".edinburgh-cta .section-eyebrow"
                );

            if (eyebrow && textContent.includes(eyebrowText)) {
                eyebrow.textContent = eyebrowText;
            }


            /*==================================
                UPDATE CTA HEADING
            ==================================*/

            const heading =
                document.querySelector(
                    ".edinburgh-cta h2"
                );

            if (heading && textContent.includes(headingText)) {

                heading.innerHTML =
                    'Ready to <span>Explore Edinburgh?</span>';

            }


            /*==================================
                UPDATE CTA DESCRIPTION
            ==================================*/

            const description =
                document.querySelector(
                    ".edinburgh-cta .london-cta-content p"
                );

            if (
                description &&
                textContent.includes(descriptionText)
            ) {
                description.textContent =
                    descriptionText;
            }


            /*==================================
                UPDATE PRIMARY BUTTON
            ==================================*/

            const primaryButton =
                document.querySelector(
                    ".edinburgh-cta .cta-primary-btn"
                );

            if (
                primaryButton &&
                textContent.includes(primaryButtonText)
            ) {

                primaryButton.textContent = "";

                primaryButton.append(
                    document.createTextNode(primaryButtonText)
                );

                const icon =
                    document.createElement("i");

                icon.className =
                    "fa-solid fa-arrow-right";

                primaryButton.append(icon);
            }


            /*==================================
                UPDATE SECONDARY BUTTON
            ==================================*/

            const secondaryButton =
                document.querySelector(
                    ".edinburgh-cta .cta-secondary-btn"
                );

            if (
                secondaryButton &&
                textContent.includes(secondaryButtonText)
            ) {

                secondaryButton.textContent = "";

                secondaryButton.append(
                    document.createTextNode(secondaryButtonText)
                );

                const icon =
                    document.createElement("i");

                icon.className =
                    "fa-solid fa-book-open";

                secondaryButton.append(icon);
            }


            console.log(
                "Edinburgh CTA updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Edinburgh CTA API error:",
                error
            );

        });

});
/*==================================
   EDINBURGH HERO BUTTONS — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("WordPress Edinburgh page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);

            const primaryButtonText = "Explore Edinburgh";
            const secondaryButtonText = "Travel Tips";

            const primaryButton =
                document.querySelector(
                    ".edinburgh-hero .hero-primary-btn"
                );

            if (
                primaryButton &&
                textContent.includes(primaryButtonText)
            ) {

                primaryButton.textContent = "";

                primaryButton.append(
                    document.createTextNode(primaryButtonText)
                );

                const icon =
                    document.createElement("i");

                icon.className =
                    "fa-solid fa-arrow-down";

                primaryButton.append(icon);
            }

            const secondaryButton =
                document.querySelector(
                    ".edinburgh-hero .hero-secondary-btn"
                );

            if (
                secondaryButton &&
                textContent.includes(secondaryButtonText)
            ) {

                secondaryButton.textContent = "";

                secondaryButton.append(
                    document.createTextNode(secondaryButtonText)
                );

                const icon =
                    document.createElement("i");

                icon.className =
                    "fa-solid fa-arrow-right";

                secondaryButton.append(icon);
            }

            console.log(
                "Edinburgh Hero buttons updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Edinburgh Hero buttons API error:",
                error
            );

        });

});
/*==================================
   EDINBURGH QUICK FACTS — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("WordPress Edinburgh page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);

            const knownForIndex =
                textContent.indexOf("Known For");

            const regionIndex =
                textContent.indexOf("Region");

            const bestForIndex =
                textContent.indexOf("Best For");

            const highlightsIndex =
                textContent.indexOf("Highlights");


            /* Known For */

            if (knownForIndex !== -1) {

                const knownFor =
                    document.querySelector(
                        ".edinburgh-hero ~ .destination-intro .fact-card:nth-child(1) strong"
                    );

                if (knownFor && textContent[knownForIndex + 1]) {
                    knownFor.textContent =
                        textContent[knownForIndex + 1];
                }
            }


            /* Region */

            if (regionIndex !== -1) {

                const region =
                    document.querySelector(
                        ".edinburgh-hero ~ .destination-intro .fact-card:nth-child(2) strong"
                    );

                if (region && textContent[regionIndex + 1]) {
                    region.textContent =
                        textContent[regionIndex + 1];
                }
            }


            /* Best For */

            if (bestForIndex !== -1) {

                const bestFor =
                    document.querySelector(
                        ".edinburgh-hero ~ .destination-intro .fact-card:nth-child(3) strong"
                    );

                if (bestFor && textContent[bestForIndex + 1]) {
                    bestFor.textContent =
                        textContent[bestForIndex + 1];
                }
            }


            /* Highlights */

            if (highlightsIndex !== -1) {

                const highlights =
                    document.querySelector(
                        ".edinburgh-hero ~ .destination-intro .fact-card:nth-child(4) strong"
                    );

                if (
                    highlights &&
                    textContent[highlightsIndex + 1]
                ) {
                    highlights.textContent =
                        textContent[highlightsIndex + 1];
                }
            }


            console.log(
                "Edinburgh Quick Facts updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Edinburgh Quick Facts API error:",
                error
            );

        });

});
/*==================================
   EDINBURGH TOP PLACES SECTION — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("WordPress Edinburgh page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /* Section Eyebrow */

            const eyebrowText =
                "DISCOVER THE CITY";

            const eyebrow =
                document.querySelector(
                    ".top-places .section-heading .section-eyebrow"
                );

            if (
                eyebrow &&
                textContent.includes(eyebrowText)
            ) {
                eyebrow.textContent = eyebrowText;
            }


            /* Section Heading */

            const headingText =
                "Top Places to Visit";

            const heading =
                document.querySelector(
                    ".top-places .section-heading h2"
                );

            if (
                heading &&
                textContent.includes(headingText)
            ) {
                heading.innerHTML =
                    'Top Places to <span>Visit</span>';
            }


            /* Section Description */

            const descriptionText =
                "Explore Edinburgh's historic landmarks, dramatic viewpoints and charming neighbourhoods.";

            const description =
                document.querySelector(
                    ".top-places .section-heading p"
                );

            if (
                description &&
                textContent.includes(descriptionText)
            ) {
                description.textContent =
                    descriptionText;
            }


            console.log(
                "Edinburgh Top Places section updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Edinburgh Top Places section API error:",
                error
            );

        });

});
/*==================================
   EDINBURGH EXPERIENCES SECTION — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("WordPress Edinburgh page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /* Section Eyebrow */

            const eyebrowText =
                "EXPERIENCE EDINBURGH";

            const eyebrow =
                document.querySelector(
                    ".experiences .section-heading .section-eyebrow"
                );

            if (
                eyebrow &&
                textContent.includes(eyebrowText)
            ) {
                eyebrow.textContent = eyebrowText;
            }


            /* Section Heading */

            const headingText =
                "Things To Do";

            const heading =
                document.querySelector(
                    ".experiences .section-heading h2"
                );

            if (
                heading &&
                textContent.includes(headingText)
            ) {
                heading.innerHTML =
                    'Things To <span>Do</span>';
            }


            /* Section Description */

            const descriptionText =
                "Discover the best experiences in Edinburgh, from historic walks and cultural attractions to local food, whisky and unforgettable adventures.";

            const description =
                document.querySelector(
                    ".experiences .section-heading p"
                );

            if (
                description &&
                textContent.includes(descriptionText)
            ) {
                description.textContent =
                    descriptionText;
            }


            console.log(
                "Edinburgh Experiences section updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Edinburgh Experiences section API error:",
                error
            );

        });

});
/*==================================
   EDINBURGH GETTING AROUND SECTION — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("WordPress Edinburgh page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /* Section Eyebrow */

            const eyebrowText =
                "GETTING AROUND";

            const eyebrow =
                document.querySelector(
                    ".getting-around .section-heading .section-eyebrow"
                );

            if (
                eyebrow &&
                textContent.includes(eyebrowText)
            ) {
                eyebrow.textContent = eyebrowText;
            }


            /* Section Heading */

            const headingText =
                "Explore Edinburgh Your Way";

            const heading =
                document.querySelector(
                    ".getting-around .section-heading h2"
                );

            if (
                heading &&
                textContent.includes(headingText)
            ) {
                heading.innerHTML =
                    'Explore Edinburgh <span>Your Way</span>';
            }


            /* Section Description */

            const descriptionText =
                "Discover convenient ways to travel around Edinburgh, from buses and trams to taxis and walking through the historic city centre.";

            const description =
                document.querySelector(
                    ".getting-around .section-heading p"
                );

            if (
                description &&
                textContent.includes(descriptionText)
            ) {
                description.textContent =
                    descriptionText;
            }


            console.log(
                "Edinburgh Getting Around section updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Edinburgh Getting Around section API error:",
                error
            );

        });

});
/*==================================
   EDINBURGH BEST TIME SECTION — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("WordPress Edinburgh page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /* Section Eyebrow */

            const eyebrowText =
                "PLAN YOUR VISIT";

            const eyebrow =
                document.querySelector(
                    ".best-time .section-heading .section-eyebrow"
                );

            if (
                eyebrow &&
                textContent.includes(eyebrowText)
            ) {
                eyebrow.textContent = eyebrowText;
            }


            /* Section Heading */

            const headingText =
                "Best Time to Visit Edinburgh";

            const heading =
                document.querySelector(
                    ".best-time .section-heading h2"
                );

            if (
                heading &&
                textContent.includes(headingText)
            ) {
                heading.innerHTML =
                    'Best Time to <span>Visit Edinburgh</span>';
            }


            /* Section Description */

            const descriptionText =
                "Discover the best seasons to visit Edinburgh and choose the right time for your trip based on weather, events and sightseeing.";

            const description =
                document.querySelector(
                    ".best-time .section-heading p"
                );

            if (
                description &&
                textContent.includes(descriptionText)
            ) {
                description.textContent =
                    descriptionText;
            }


            console.log(
                "Edinburgh Best Time section updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Edinburgh Best Time section API error:",
                error
            );

        });

});
/*==================================
   EDINBURGH TRAVEL TIPS SECTION — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("WordPress Edinburgh page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /* Section Eyebrow */

            const eyebrowText =
                "TRAVEL SMART";

            const eyebrow =
                document.querySelector(
                    ".travel-tips .section-heading .section-eyebrow"
                );

            if (
                eyebrow &&
                textContent.includes(eyebrowText)
            ) {
                eyebrow.textContent = eyebrowText;
            }


            /* Section Heading */

            const headingText =
                "Edinburgh Travel Tips";

            const heading =
                document.querySelector(
                    ".travel-tips .section-heading h2"
                );

            if (
                heading &&
                textContent.includes(headingText)
            ) {
                heading.innerHTML =
                    'Edinburgh <span>Travel Tips</span>';
            }


            /* Section Description */

            const descriptionText =
                "Use these practical Edinburgh travel tips to plan your trip, save time and enjoy the city with confidence.";

            const description =
                document.querySelector(
                    ".travel-tips .section-heading p"
                );

            if (
                description &&
                textContent.includes(descriptionText)
            ) {
                description.textContent =
                    descriptionText;
            }


            console.log(
                "Edinburgh Travel Tips section updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Edinburgh Travel Tips section API error:",
                error
            );

        });

});
/*==================================
   EDINBURGH FAQ SECTION — WORDPRESS
===================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* Run only on Edinburgh page */
    if (!window.location.pathname.includes("edinburgh.html")) {
        return;
    }

    const WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(WP_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const edinburghPage = data.posts.find(function (page) {
                return page.slug === "edinburgh";
            });

            if (!edinburghPage) {
                console.log("WordPress Edinburgh page not found.");
                return;
            }

            const temp = document.createElement("div");
            temp.innerHTML = edinburghPage.content;

            const textContent =
                Array.from(temp.querySelectorAll("p"))
                    .map(function (paragraph) {
                        return paragraph.textContent.trim();
                    })
                    .filter(Boolean);


            /* Section Eyebrow */

            const eyebrowText =
                "HAVE QUESTIONS?";

            const eyebrow =
                document.querySelector(
                    ".edinburgh-faq .section-heading .section-eyebrow"
                );

            if (
                eyebrow &&
                textContent.includes(eyebrowText)
            ) {
                eyebrow.textContent = eyebrowText;
            }


            /* Section Heading */

            const headingText =
                "Edinburgh FAQs";

            const heading =
                document.querySelector(
                    ".edinburgh-faq .section-heading h2"
                );

            if (
                heading &&
                textContent.includes(headingText)
            ) {
                heading.innerHTML =
                    'Edinburgh <span>FAQs</span>';
            }


            /* Section Description */

            const descriptionText =
                "Find answers to common questions about visiting Edinburgh, getting around the city and planning your trip.";

            const description =
                document.querySelector(
                    ".edinburgh-faq .section-heading p"
                );

            if (
                description &&
                textContent.includes(descriptionText)
            ) {
                description.textContent =
                    descriptionText;
            }


            console.log(
                "Edinburgh FAQ section updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Edinburgh FAQ section API error:",
                error
            );

        });

});
/* ==========================================
   MANCHESTER WORDPRESS - HERO & INTRO
========================================== */

if (window.location.pathname.includes("manchester.html")) {

    const MANCHESTER_WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(MANCHESTER_WP_API)
        .then(response => response.json())
        .then(data => {

            const manchesterPage = data.posts.find(function (page) {
                return page.slug === "manchester";
            });

            if (!manchesterPage) {
                console.warn("Manchester WordPress page not found.");
                return;
            }

            console.log("Manchester WordPress page found");

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = manchesterPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(function (p) {
                return p.textContent.trim();
            })
            .filter(function (text) {
                return text !== "";
            });

            console.log(
                "Manchester WordPress content:",
                paragraphs
            );


            /* ==========================================
               HERO DESCRIPTION
            ========================================== */

            const heroText = document.querySelector(
                ".manchester-hero .destination-hero-content > p"
            );

            if (heroText && paragraphs[1]) {

                heroText.textContent = paragraphs[1];

                console.log(
                    "Manchester Hero description updated from WordPress."
                );

            }


            /* ==========================================
               INTRO PARAGRAPHS
            ========================================== */

            const introContent = document.querySelector(
                ".manchester-intro-content"
            );

            if (introContent) {

                const introPs =
                    introContent.querySelectorAll("p");


                /* INTRO PARAGRAPH 1 */

                if (introPs[0] && paragraphs[2]) {

                    introPs[0].textContent = paragraphs[2];

                }


                /* INTRO PARAGRAPH 2 */

                if (introPs[1] && paragraphs[3]) {

                    introPs[1].textContent = paragraphs[3];

                }


                console.log(
                    "Manchester intro updated from WordPress."
                );

            }


            console.log(
                "Manchester Hero and Intro updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Manchester WordPress error:",
                error
            );

        });

}
/* ==========================================
   MANCHESTER WORDPRESS - TOP PLACES
========================================== */

if (window.location.pathname.includes("manchester.html")) {

    const MANCHESTER_PLACES_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(MANCHESTER_PLACES_API)
        .then(response => response.json())
        .then(data => {

            const manchesterPage = data.posts.find(function (page) {
                return page.slug === "manchester";
            });

            if (!manchesterPage) {
                console.warn("Manchester page not found for Top Places.");
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = manchesterPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(p => p.textContent.trim())
            .filter(text => text !== "");

            const placeNames = [
                "Old Trafford",
                "Manchester Cathedral",
                "Northern Quarter",
                "John Rylands Library",
                "Science and Industry Museum",
                "Castlefield"
            ];

            placeNames.forEach(function (placeName, index) {

                const nameIndex = paragraphs.findIndex(function (text) {
                    return text === placeName;
                });

                if (nameIndex === -1) {
                    return;
                }

                const description = paragraphs[nameIndex + 1];

                const placeNameElement = document.querySelector(
                    "#wp-manchester-place-" + (index + 1)
                );

                const placeDescriptionElement = document.querySelector(
                    "#wp-manchester-place-description-" + (index + 1)
                );

                if (placeNameElement) {
                    placeNameElement.textContent = placeName;
                }

                if (placeDescriptionElement && description) {
                    placeDescriptionElement.textContent = description;
                }
            });

            console.log(
                "Manchester Top Places updated from WordPress."
            );

        })
        .catch(error => {
            console.error(
                "Manchester Top Places error:",
                error
            );
        });
}
/* ==========================================
   MANCHESTER WORDPRESS - THINGS TO DO
========================================== */

if (window.location.pathname.includes("manchester.html")) {

    const MANCHESTER_EXPERIENCES_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(MANCHESTER_EXPERIENCES_API)
        .then(response => response.json())
        .then(data => {

            const manchesterPage = data.posts.find(function (page) {
                return page.slug === "manchester";
            });

            if (!manchesterPage) {
                console.warn("Manchester page not found for Things To Do.");
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = manchesterPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(p => p.textContent.trim())
            .filter(text => text !== "");

            const experienceNames = [
                "Experience Football",
                "Discover Live Music",
                "Find Street Art",
                "Taste Manchester",
                "Explore Industrial Heritage",
                "Shop the City"
            ];

            experienceNames.forEach(function (experienceName, index) {

                const nameIndex = paragraphs.findIndex(function (text) {
                    return text === experienceName;
                });

                if (nameIndex === -1) {
                    return;
                }

                const description = paragraphs[nameIndex + 1];

                const card = document.querySelectorAll(
                    ".manchester-things .experience-card"
                )[index];

                if (!card) {
                    return;
                }

                const heading = card.querySelector("h3");
                const paragraph = card.querySelector("p");

                if (heading) {
                    heading.textContent = experienceName;
                }

                if (paragraph && description) {
                    paragraph.textContent = description;
                }
            });

            console.log(
                "Manchester Things To Do updated from WordPress."
            );

        })
        .catch(error => {
            console.error(
                "Manchester Things To Do error:",
                error
            );
        });
}
/* ==========================================
   MANCHESTER WORDPRESS - GETTING AROUND
========================================== */

if (window.location.pathname.includes("manchester.html")) {

    const MANCHESTER_TRANSPORT_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(MANCHESTER_TRANSPORT_API)
        .then(response => response.json())
        .then(data => {

            const manchesterPage = data.posts.find(function (page) {
                return page.slug === "manchester";
            });

            if (!manchesterPage) {
                console.warn("Manchester page not found for Getting Around.");
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = manchesterPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(p => p.textContent.trim())
            .filter(text => text !== "");

            const transportNames = [
                "Metrolink Tram",
                "City Bus",
                "Train",
                "Walking"
            ];

            const transportCards = document.querySelectorAll(
                ".manchester-around .transport-card"
            );

            transportNames.forEach(function (transportName, index) {

                const nameIndex = paragraphs.findIndex(function (text) {
                    return text === transportName;
                });

                if (nameIndex === -1) {
                    return;
                }

                const description = paragraphs[nameIndex + 1];
                const card = transportCards[index];

                if (!card) {
                    return;
                }

                const heading = card.querySelector("h3");
                const paragraph = card.querySelector("p");

                if (heading) {
                    heading.textContent = transportName;
                }

                if (paragraph && description) {
                    paragraph.textContent = description;
                }
            });

            console.log(
                "Manchester Getting Around updated from WordPress."
            );

        })
        .catch(error => {
            console.error(
                "Manchester Getting Around error:",
                error
            );
        });
}
/* ==========================================
   MANCHESTER WORDPRESS - GETTING AROUND TEXT
========================================== */

if (window.location.pathname.includes("manchester.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const manchesterPage = data.posts.find(function (page) {
                return page.slug === "manchester";
            });

            if (!manchesterPage) {
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = manchesterPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(p => p.textContent.trim())
            .filter(text => text !== "");

            const aroundContent = document.querySelector(
                ".manchester-around .getting-around-content"
            );

            if (!aroundContent) {
                return;
            }

            const sectionParagraphs =
                aroundContent.querySelectorAll(":scope > p");

            const description1 = paragraphs.find(text =>
                text.startsWith(
                    "Manchester has an extensive public transport network"
                )
            );

            const description2 = paragraphs.find(text =>
                text.startsWith(
                    "The city centre is also compact enough"
                )
            );

            const localTip = paragraphs.find(text =>
                text.startsWith(
                    "Combine walking with public transport"
                )
            );

            if (description1 && sectionParagraphs[0]) {
                sectionParagraphs[0].textContent = description1;
            }

            if (description2 && sectionParagraphs[1]) {
                sectionParagraphs[1].textContent = description2;
            }

            const tipBox = aroundContent.querySelector(".travel-tip");

            if (tipBox && localTip) {

                const tipParagraph = tipBox.querySelector("p");

                if (tipParagraph) {
                    tipParagraph.textContent = localTip;
                }
            }

            console.log(
                "Manchester Getting Around text updated from WordPress."
            );

        })
        .catch(error => {
            console.error(
                "Manchester Getting Around text error:",
                error
            );
        });
}
/* ==========================================
   MANCHESTER WORDPRESS - BEST TIME TO VISIT
========================================== */

if (window.location.pathname.includes("manchester.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const manchesterPage = data.posts.find(function (page) {
                return page.slug === "manchester";
            });

            if (!manchesterPage) {
                console.warn("Manchester page not found for Best Time.");
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = manchesterPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(p => p.textContent.trim())
            .filter(text => text !== "");

            const seasons = [
                "Spring",
                "Summer",
                "Autumn",
                "Winter"
            ];

            const seasonCards = document.querySelectorAll(
                ".manchester-best-time .season-card"
            );

            seasons.forEach(function (seasonName, index) {

                const nameIndex = paragraphs.findIndex(function (text) {
                    return text === seasonName;
                });

                if (nameIndex === -1) {
                    return;
                }

                const description = paragraphs[nameIndex + 1];
                const card = seasonCards[index];

                if (!card) {
                    return;
                }

                const heading = card.querySelector("h3");
                const paragraph = card.querySelector("p");

                if (heading) {
                    heading.textContent = seasonName;
                }

                if (paragraph && description) {
                    paragraph.textContent = description;
                }
            });

            console.log(
                "Manchester Best Time updated from WordPress."
            );

        })
        .catch(error => {
            console.error(
                "Manchester Best Time error:",
                error
            );
        });
}
/* ==========================================
   MANCHESTER WORDPRESS - TRAVEL TIPS
========================================== */

if (window.location.pathname.includes("manchester.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const manchesterPage = data.posts.find(function (page) {
                return page.slug === "manchester";
            });

            if (!manchesterPage) {
                console.warn("Manchester page not found for Travel Tips.");
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = manchesterPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(p => p.textContent.trim())
            .filter(text => text !== "");

            const tipNames = [
                "Explore the City Centre on Foot",
                "Pack for Changing Weather",
                "Plan Football Visits Early",
                "Check the Event Calendar",
                "Use Public Transport",
                "Explore Beyond the Centre"
            ];

            const tipCards = document.querySelectorAll(
                ".manchester-tips .tip-card"
            );

            tipNames.forEach(function (tipName, index) {

                const nameIndex = paragraphs.findIndex(function (text) {
                    return text === tipName;
                });

                if (nameIndex === -1) {
                    return;
                }

                const description = paragraphs[nameIndex + 1];
                const card = tipCards[index];

                if (!card) {
                    return;
                }

                const heading = card.querySelector("h3");
                const paragraph = card.querySelector("p");

                if (heading) {
                    heading.textContent = tipName;
                }

                if (paragraph && description) {
                    paragraph.textContent = description;
                }
            });

            console.log(
                "Manchester Travel Tips updated from WordPress."
            );

        })
        .catch(error => {
            console.error(
                "Manchester Travel Tips error:",
                error
            );
        });
}
/* ==========================================
   MANCHESTER WORDPRESS - FAQ
========================================== */

if (window.location.pathname.includes("manchester.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const manchesterPage = data.posts.find(function (page) {
                return page.slug === "manchester";
            });

            if (!manchesterPage) {
                console.warn("Manchester page not found for FAQ.");
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = manchesterPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(p => p.textContent.trim())
            .filter(text => text !== "");

            const faqQuestions = [
                "How many days do you need in Manchester?",
                "What is Manchester famous for?",
                "Is Manchester easy to explore without a car?",
                "Is Manchester expensive to visit?",
                "What should I pack for Manchester?",
                "Can I visit Manchester for a football experience?"
            ];

            const faqItems = document.querySelectorAll(
                ".manchester-faq .faq-item"
            );

            faqQuestions.forEach(function (question, index) {

                const questionIndex = paragraphs.findIndex(function (text) {
                    return text === question;
                });

                if (questionIndex === -1) {
                    return;
                }

                const answer = paragraphs[questionIndex + 1];
                const item = faqItems[index];

                if (!item) {
                    return;
                }

                const questionElement = item.querySelector("h3");
                const answerElement = item.querySelector("p");

                if (questionElement) {
                    questionElement.textContent = question;
                }

                if (answerElement && answer) {
                    answerElement.textContent = answer;
                }
            });

            console.log(
                "Manchester FAQ updated from WordPress."
            );

        })
        .catch(error => {
            console.error(
                "Manchester FAQ error:",
                error
            );
        });
}
/* ==========================================
   MANCHESTER FAQ ACCORDION
========================================== */

if (window.location.pathname.includes("manchester.html")) {

    const manchesterFaqItems = document.querySelectorAll(
        ".manchester-faq .faq-item"
    );

    manchesterFaqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }

        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("active");

            /* Close all other FAQs */
            manchesterFaqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            });

            /* Open clicked FAQ */
            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";
            }

        });

    });

    console.log("Manchester FAQ accordion ready.");

}
/* ==========================================
   MANCHESTER WORDPRESS - CTA
========================================== */

if (window.location.pathname.includes("manchester.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const manchesterPage = data.posts.find(function (page) {
                return page.slug === "manchester";
            });

            if (!manchesterPage) {
                console.warn("Manchester page not found for CTA.");
                return;
            }

            /* Create temporary container for WordPress content */
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = manchesterPage.content;

            /* Get all WordPress paragraphs */
            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
                .map(function (p) {
                    return p.textContent.trim();
                })
                .filter(function (text) {
                    return text !== "";
                });

            /* Find Manchester CTA */
            const ctaSection = document.querySelector(
                ".manchester-cta"
            );

            if (!ctaSection) {
                console.warn("Manchester CTA section not found.");
                return;
            }


            /* ==========================================
               CTA EYEBROW
            ========================================== */

            const eyebrow = ctaSection.querySelector(
                ".section-eyebrow"
            );

            if (eyebrow) {

                const ctaEyebrow = paragraphs.find(function (text) {
                    return text === "YOUR NORTHERN ADVENTURE STARTS HERE";
                });

                if (ctaEyebrow) {
                    eyebrow.textContent = ctaEyebrow;
                }

            }


            /* ==========================================
               CTA HEADING
            ========================================== */

            const heading = ctaSection.querySelector("h2");

            if (heading) {

                const headingText = paragraphs.find(function (text) {
                    return text.startsWith(
                        "Ready to Explore Manchester"
                    );
                });

                if (headingText) {

                    heading.innerHTML = headingText.replace(
                        "Explore Manchester",
                        "<span>Explore Manchester</span>"
                    );

                }

            }


            /* ==========================================
               CTA DESCRIPTION
            ========================================== */

            const description = ctaSection.querySelector(
                ".london-cta-content > p"
            );

            if (description) {

                const ctaDescription = paragraphs.find(function (text) {
                    return text.startsWith(
                        "From legendary football and music"
                    );
                });

                if (ctaDescription) {
                    description.textContent = ctaDescription;
                }

            }


            /* ==========================================
               CTA BUTTONS
            ========================================== */

            const ctaButtons = ctaSection.querySelectorAll(
                ".london-cta-buttons a"
            );

            const wpButtonLinks = tempDiv.querySelectorAll("a");

            wpButtonLinks.forEach(function (wpLink) {

                const text = wpLink.textContent.trim();
                const href = wpLink.getAttribute("href");

                if (!text || !href) {
                    return;
                }

                ctaButtons.forEach(function (button) {

                    const buttonText = button.textContent.trim();

                    if (buttonText.startsWith(text)) {

                        button.href = href;

                    }

                });

            });


            /* ==========================================
               CTA BUTTON 1
               Explore Attractions
            ========================================== */

            const attractionsButton = Array.from(
                ctaButtons
            ).find(function (button) {

                return button.textContent
                    .trim()
                    .startsWith("Explore Attractions");

            });

            if (attractionsButton) {

                const wpAttractionsLink = Array.from(
                    wpButtonLinks
                ).find(function (link) {

                    return link.textContent
                        .trim()
                        .startsWith("Explore Attractions");

                });

                if (wpAttractionsLink) {

                    const href =
                        wpAttractionsLink.getAttribute("href");

                    if (href) {
                        attractionsButton.href = href;
                    }

                }

            }


            /* ==========================================
               CTA BUTTON 2
               Read Travel Guide
            ========================================== */

            const guideButton = Array.from(
                ctaButtons
            ).find(function (button) {

                return button.textContent
                    .trim()
                    .startsWith("Read Travel Guide");

            });

            if (guideButton) {

                const wpGuideLink = Array.from(
                    wpButtonLinks
                ).find(function (link) {

                    return link.textContent
                        .trim()
                        .startsWith("Read Travel Guide");

                });

                if (wpGuideLink) {

                    const href =
                        wpGuideLink.getAttribute("href");

                    if (href) {
                        guideButton.href = href;
                    }

                }

            }


            /* ==========================================
               SUCCESS MESSAGE
            ========================================== */

            console.log(
                "Manchester CTA updated from WordPress."
            );

            console.log(
                "Manchester CTA buttons connected from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Manchester CTA error:",
                error
            );

        });

}
/* ==========================================
   LIVERPOOL WORDPRESS - HERO & INTRO
========================================== */

if (window.location.pathname.includes("liverpool.html")) {

    const LIVERPOOL_WP_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(LIVERPOOL_WP_API)
        .then(response => response.json())
        .then(data => {

            const liverpoolPage = data.posts.find(function (page) {
                return page.slug === "liverpool";
            });

            if (!liverpoolPage) {
                console.warn("Liverpool WordPress page not found.");
                return;
            }

            console.log("Liverpool WordPress page found");

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = liverpoolPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(function (p) {
                return p.textContent.trim();
            })
            .filter(function (text) {
                return text !== "";
            });

            console.log(
                "Liverpool WordPress content:",
                paragraphs
            );


            /* ==========================================
               HERO DESCRIPTION
            ========================================== */

            const heroText = document.querySelector(
                ".liverpool-hero .destination-hero-content > p"
            );

            if (heroText && paragraphs[1]) {

                heroText.textContent = paragraphs[1];

                console.log(
                    "Liverpool Hero description updated from WordPress."
                );

            }


            /* ==========================================
               INTRO PARAGRAPHS
            ========================================== */

            const introContent = document.querySelector(
                ".liverpool-intro-content"
            );

            if (introContent) {

                const introPs =
                    introContent.querySelectorAll("p");


                /* INTRO PARAGRAPH 1 */

                if (introPs[0] && paragraphs[2]) {

                    introPs[0].textContent = paragraphs[2];

                }


                /* INTRO PARAGRAPH 2 */

                if (introPs[1] && paragraphs[3]) {

                    introPs[1].textContent = paragraphs[3];

                }


                console.log(
                    "Liverpool intro updated from WordPress."
                );

            }


            console.log(
                "Liverpool Hero and Intro updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Liverpool WordPress error:",
                error
            );

        });

}
/* ==========================================
   LIVERPOOL WORDPRESS - TOP PLACES
========================================== */

if (window.location.pathname.includes("liverpool.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const liverpoolPage = data.posts.find(function (page) {
                return page.slug === "liverpool";
            });

            if (!liverpoolPage) {
                console.warn("Liverpool page not found for Top Places.");
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = liverpoolPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(function (p) {
                return p.textContent.trim();
            })
            .filter(function (text) {
                return text !== "";
            });

            /* ==========================================
               LIVERPOOL TOP PLACES
            ========================================== */

            const placesSection = document.querySelector(
                ".liverpool-places"
            );

            if (!placesSection) {
                console.warn("Liverpool Top Places section not found.");
                return;
            }

            const placeCards = placesSection.querySelectorAll(
                ".place-card"
            );

            /*
                WordPress content starts after the
                first 4 Liverpool paragraphs.

                Every place uses 3 paragraphs:

                Name
                Category
                Description
            */

            placeCards.forEach(function (card, index) {

                const wpStart = 4 + (index * 3);

                const name = paragraphs[wpStart];
                const category = paragraphs[wpStart + 1];
                const description = paragraphs[wpStart + 2];

                const nameElement = card.querySelector("h3");
                const categoryElement = card.querySelector(
                    ".place-category"
                );
                const descriptionElement = card.querySelector("p");

                if (nameElement && name) {
                    nameElement.textContent = name;
                }

                if (categoryElement && category) {
                    categoryElement.textContent = category;
                }

                if (descriptionElement && description) {
                    descriptionElement.textContent = description;
                }

            });

            console.log(
                "Liverpool Top Places updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Liverpool Top Places error:",
                error
            );

        });

}
/* ==========================================
   LIVERPOOL WORDPRESS - THINGS TO DO
========================================== */

if (window.location.pathname.includes("liverpool.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const liverpoolPage = data.posts.find(function (page) {
                return page.slug === "liverpool";
            });

            if (!liverpoolPage) {
                console.warn("Liverpool page not found for Things To Do.");
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = liverpoolPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(function (p) {
                return p.textContent.trim();
            })
            .filter(function (text) {
                return text !== "";
            });


            /* ==========================================
               LIVERPOOL THINGS TO DO
            ========================================== */

            const thingsSection = document.querySelector(
                ".liverpool-things"
            );

            if (!thingsSection) {
                console.warn(
                    "Liverpool Things To Do section not found."
                );
                return;
            }

            const experienceCards =
                thingsSection.querySelectorAll(
                    ".experience-card"
                );


            /*
                First 22 paragraphs are already used by:

                0–3   Hero + Intro
                4–21  Top Places

                Things To Do starts from paragraph 22.

                Each card uses:

                Name
                Description
            */

            experienceCards.forEach(function (card, index) {

                const wpStart = 22 + (index * 2);

                const name = paragraphs[wpStart];
                const description = paragraphs[wpStart + 1];


                const nameElement = card.querySelector("h3");

                const descriptionElement =
                    card.querySelector("p");


                if (nameElement && name) {

                    nameElement.textContent = name;

                }


                if (descriptionElement && description) {

                    descriptionElement.textContent = description;

                }

            });


            console.log(
                "Liverpool Things To Do updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Liverpool Things To Do error:",
                error
            );

        });

}
/* ==========================================
   LIVERPOOL WORDPRESS - GETTING AROUND
========================================== */

if (window.location.pathname.includes("liverpool.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const liverpoolPage = data.posts.find(function (page) {
                return page.slug === "liverpool";
            });

            if (!liverpoolPage) {
                console.warn(
                    "Liverpool page not found for Getting Around."
                );
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = liverpoolPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(function (p) {
                return p.textContent.trim();
            })
            .filter(function (text) {
                return text !== "";
            });

            const aroundSection = document.querySelector(
                ".liverpool-around"
            );

            if (!aroundSection) {
                console.warn(
                    "Liverpool Getting Around section not found."
                );
                return;
            }

            /*
                WordPress content:

                0–3   Hero + Intro
                4–21  Top Places
                22–33 Things To Do
                34–45 Getting Around
            */

            const leftPs =
                aroundSection.querySelectorAll(
                    ".getting-around-content > p"
                );

            const travelTip =
                aroundSection.querySelector(".travel-tip");

            const tipStrong =
                travelTip.querySelector("strong");

            const tipP =
                travelTip.querySelector("p");

            const transportCards =
                aroundSection.querySelectorAll(
                    ".transport-card"
                );


            /* LEFT CONTENT */

            if (leftPs[0] && paragraphs[34]) {
                leftPs[0].textContent = paragraphs[34];
            }

            if (leftPs[1] && paragraphs[35]) {
                leftPs[1].textContent = paragraphs[35];
            }


            /* TRAVEL TIP */

            if (tipStrong && paragraphs[36]) {
                tipStrong.textContent = paragraphs[36];
            }

            if (tipP && paragraphs[37]) {
                tipP.textContent = paragraphs[37];
            }


            /* TRANSPORT CARDS */

            transportCards.forEach(function (card, index) {

                const wpStart = 38 + (index * 2);

                const name =
                    paragraphs[wpStart];

                const description =
                    paragraphs[wpStart + 1];

                const nameElement =
                    card.querySelector("h3");

                const descriptionElement =
                    card.querySelector("p");


                if (nameElement && name) {
                    nameElement.textContent = name;
                }

                if (descriptionElement && description) {
                    descriptionElement.textContent = description;
                }

            });


            console.log(
                "Liverpool Getting Around updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Liverpool Getting Around error:",
                error
            );

        });

}
/* ==========================================
   LIVERPOOL WORDPRESS - BEST TIME
========================================== */

if (window.location.pathname.includes("liverpool.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const liverpoolPage = data.posts.find(function (page) {
                return page.slug === "liverpool";
            });

            if (!liverpoolPage) {
                console.warn(
                    "Liverpool page not found for Best Time."
                );
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = liverpoolPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(function (p) {
                return p.textContent.trim();
            })
            .filter(function (text) {
                return text !== "";
            });

            const bestTimeSection = document.querySelector(
                ".liverpool-best-time"
            );

            if (!bestTimeSection) {
                console.warn(
                    "Liverpool Best Time section not found."
                );
                return;
            }

            /*
                WordPress content:

                0–3    Hero + Intro
                4–21   Top Places
                22–33  Things To Do
                34–45  Getting Around
                46–59  Best Time
            */

            /* SECTION DESCRIPTION */

            const sectionDescription =
                bestTimeSection.querySelector(
                    ".section-heading p"
                );

            if (sectionDescription && paragraphs[46]) {
                sectionDescription.textContent =
                    paragraphs[46];
            }


            /* SEASON CARDS */

            const seasonCards =
                bestTimeSection.querySelectorAll(
                    ".season-card"
                );

            seasonCards.forEach(function (card, index) {

                const wpStart = 47 + (index * 2);

                const seasonName =
                    paragraphs[wpStart];

                const seasonDescription =
                    paragraphs[wpStart + 1];

                const nameElement =
                    card.querySelector("h3");

                const descriptionElement =
                    card.querySelector("p");

                if (nameElement && seasonName) {
                    nameElement.textContent =
                        seasonName;
                }

                if (
                    descriptionElement &&
                    seasonDescription
                ) {
                    descriptionElement.textContent =
                        seasonDescription;
                }

            });


            /* MONTHS */

            const monthElements =
                bestTimeSection.querySelectorAll(
                    ".season-months"
                );

            monthElements.forEach(function (element, index) {

                const wpIndex = 55 + index;

                if (paragraphs[wpIndex]) {
                    element.textContent =
                        paragraphs[wpIndex];
                }

            });


            /* SUMMER BADGE */

            const seasonBadge =
                bestTimeSection.querySelector(
                    ".season-badge"
                );

            if (seasonBadge && paragraphs[59]) {
                seasonBadge.textContent =
                    paragraphs[59];
            }


            console.log(
                "Liverpool Best Time updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Liverpool Best Time error:",
                error
            );

        });

}
/* ==========================================
   LIVERPOOL WORDPRESS - TRAVEL TIPS
========================================== */

if (window.location.pathname.includes("liverpool.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const liverpoolPage = data.posts.find(function (page) {
                return page.slug === "liverpool";
            });

            if (!liverpoolPage) {
                console.warn(
                    "Liverpool page not found for Travel Tips."
                );
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = liverpoolPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(function (p) {
                return p.textContent.trim();
            })
            .filter(function (text) {
                return text !== "";
            });

            const tipsSection = document.querySelector(
                ".liverpool-tips"
            );

            if (!tipsSection) {
                console.warn(
                    "Liverpool Travel Tips section not found."
                );
                return;
            }


            /*
                WordPress content:

                0–3    Hero + Intro
                4–21   Top Places
                22–33  Things To Do
                34–45  Getting Around
                46–59  Best Time
                60–72  Travel Tips
            */


            /* SECTION DESCRIPTION */

            const sectionDescription =
                tipsSection.querySelector(
                    ".section-heading p"
                );

            if (sectionDescription && paragraphs[60]) {
                sectionDescription.textContent =
                    paragraphs[60];
            }


            /* TIP CARDS */

            const tipCards =
                tipsSection.querySelectorAll(
                    ".tip-card"
                );

            tipCards.forEach(function (card, index) {

                const wpStart = 61 + (index * 2);

                const tipTitle =
                    paragraphs[wpStart];

                const tipDescription =
                    paragraphs[wpStart + 1];

                const titleElement =
                    card.querySelector("h3");

                const descriptionElement =
                    card.querySelector("p");


                if (titleElement && tipTitle) {
                    titleElement.textContent =
                        tipTitle;
                }

                if (
                    descriptionElement &&
                    tipDescription
                ) {
                    descriptionElement.textContent =
                        tipDescription;
                }

            });


            console.log(
                "Liverpool Travel Tips updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Liverpool Travel Tips error:",
                error
            );

        });

}
/* ==========================================
   LIVERPOOL WORDPRESS - FAQ
========================================== */

if (window.location.pathname.includes("liverpool.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const liverpoolPage = data.posts.find(function (page) {
                return page.slug === "liverpool";
            });

            if (!liverpoolPage) {
                console.warn(
                    "Liverpool page not found for FAQ."
                );
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = liverpoolPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(function (p) {
                return p.textContent.trim();
            })
            .filter(function (text) {
                return text !== "";
            });

            const faqSection = document.querySelector(
                ".liverpool-faq"
            );

            if (!faqSection) {
                console.warn(
                    "Liverpool FAQ section not found."
                );
                return;
            }


            /*
                WordPress content:

                0–3    Hero + Intro
                4–21   Top Places
                22–33  Things To Do
                34–45  Getting Around
                46–59  Best Time
                60–72  Travel Tips
                73–84  FAQ
            */


            /* FAQ SECTION DESCRIPTION */

            const sectionDescription =
                faqSection.querySelector(
                    ".section-heading p"
                );

            if (sectionDescription && paragraphs[73]) {
                /*
                    We keep the original HTML description
                    because FAQ content starts with Question 1.
                */
            }


            /* FAQ ITEMS */

            const faqItems =
                faqSection.querySelectorAll(
                    ".faq-item"
                );

            faqItems.forEach(function (item, index) {

                const wpStart = 73 + (index * 2);

                const question =
                    paragraphs[wpStart];

                const answer =
                    paragraphs[wpStart + 1];

                const questionElement =
                    item.querySelector(
                        ".faq-question span"
                    );

                const answerElement =
                    item.querySelector(
                        ".faq-answer p"
                    );


                if (questionElement && question) {
                    questionElement.textContent =
                        question;
                }

                if (answerElement && answer) {
                    answerElement.textContent =
                        answer;
                }

            });


            console.log(
                "Liverpool FAQ updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Liverpool FAQ error:",
                error
            );

        });

}
/* ==========================================
   LIVERPOOL FAQ - ACCORDION FIX
========================================== */

if (window.location.pathname.includes("liverpool.html")) {

    const liverpoolFaqItems =
        document.querySelectorAll(
            ".liverpool-faq .faq-item"
        );

    liverpoolFaqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }

        question.addEventListener("click", function () {

            const isOpen =
                item.classList.contains("active");


            /* Close all FAQ items */

            liverpoolFaqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(
                        ".faq-answer"
                    );

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            });


            /* Open clicked item */

            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });

    console.log(
        "Liverpool FAQ accordion ready."
    );

}
/* ==========================================
   LIVERPOOL WORDPRESS - CTA
========================================== */

if (window.location.pathname.includes("liverpool.html")) {

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(response => response.json())
        .then(data => {

            const liverpoolPage = data.posts.find(function (page) {
                return page.slug === "liverpool";
            });

            if (!liverpoolPage) {
                console.warn(
                    "Liverpool page not found for CTA."
                );
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = liverpoolPage.content;

            const paragraphs = Array.from(
                tempDiv.querySelectorAll("p")
            )
            .map(function (p) {
                return p.textContent.trim();
            })
            .filter(function (text) {
                return text !== "";
            });

            const ctaSection = document.querySelector(
                ".liverpool-cta"
            );

            if (!ctaSection) {
                console.warn(
                    "Liverpool CTA section not found."
                );
                return;
            }

            /*
                WordPress content:

                0–3    Hero + Intro
                4–21   Top Places
                22–33  Things To Do
                34–45  Getting Around
                46–59  Best Time
                60–72  Travel Tips
                73–84  FAQ
                85–89  CTA
            */

            /* CTA EYEBROW */

            const eyebrow =
                ctaSection.querySelector(
                    ".section-eyebrow"
                );

            if (eyebrow && paragraphs[85]) {
                eyebrow.textContent = paragraphs[85];
            }


            /* CTA HEADING */

            const heading =
                ctaSection.querySelector("h2");

            if (heading && paragraphs[86]) {

                const headingText =
                    paragraphs[86];

                const highlightText =
                    "Explore Liverpool?";

                if (headingText.includes(highlightText)) {

                    heading.innerHTML =
                        headingText.replace(
                            highlightText,
                            "<span>" +
                            highlightText +
                            "</span>"
                        );

                } else {

                    heading.textContent =
                        headingText;

                }
            }


            /* CTA DESCRIPTION */

            const description =
                ctaSection.querySelector("p");

            if (description && paragraphs[87]) {
                description.textContent =
                    paragraphs[87];
            }


            /* PRIMARY BUTTON */

            const primaryButton =
                ctaSection.querySelector(
                    ".cta-primary-btn"
                );

            if (primaryButton && paragraphs[88]) {

                const icon =
                    primaryButton.querySelector("i");

                if (icon) {

                    Array.from(
                        primaryButton.childNodes
                    )
                    .filter(function (node) {
                        return node.nodeType === Node.TEXT_NODE;
                    })
                    .forEach(function (node) {
                        node.remove();
                    });

                    primaryButton.insertBefore(
                        document.createTextNode(
                            " " +
                            paragraphs[88] +
                            " "
                        ),
                        icon
                    );

                }

            }


            /* SECONDARY BUTTON */

            const secondaryButton =
                ctaSection.querySelector(
                    ".cta-secondary-btn"
                );

            if (secondaryButton && paragraphs[89]) {

                const icon =
                    secondaryButton.querySelector("i");

                if (icon) {

                    Array.from(
                        secondaryButton.childNodes
                    )
                    .filter(function (node) {
                        return node.nodeType === Node.TEXT_NODE;
                    })
                    .forEach(function (node) {
                        node.remove();
                    });

                    secondaryButton.insertBefore(
                        document.createTextNode(
                            " " +
                            paragraphs[89] +
                            " "
                        ),
                        icon
                    );

                }

            }


            console.log(
                "Liverpool CTA updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Liverpool CTA error:",
                error
            );

        });

}
// ==========================================
// OXFORD WORDPRESS INTEGRATION
// HERO + INTRODUCTION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Run only on Oxford page
    if (!document.querySelector(".oxford-hero")) {
        return;
    }

    console.log("Oxford WordPress integration started.");

    const OXFORD_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(OXFORD_API)
        .then(response => {
            if (!response.ok) {
                throw new Error("Oxford WordPress API request failed.");
            }

            return response.json();
        })

        .then(data => {

            const oxfordPage = data.posts.find(
                page => page.slug === "oxford"
            );

            if (!oxfordPage) {
                console.error("Oxford WordPress page NOT found.");
                return;
            }

            console.log("Oxford WordPress page found:", oxfordPage);
            console.log("Oxford Page ID:", oxfordPage.ID);

            // Create temporary container to read WordPress HTML
            const tempDiv = document.createElement("div");

            tempDiv.innerHTML = oxfordPage.content;

            // Get all text from WordPress content
            const textContent = tempDiv.innerText
                .split("\n")
                .map(text => text.trim())
                .filter(text => text.length > 0);

            console.log("Oxford WordPress content:", textContent);


            // ==========================================
            // HERO
            // ==========================================

            const heroTitle =
                document.querySelector(".wp-oxford-hero-title");

            const heroDescription =
                document.querySelector(".wp-oxford-hero-description");


            // Find title
            const wpHeroTitle = textContent.find(text =>
                text.toLowerCase().includes("explore oxford")
            );

            if (heroTitle && wpHeroTitle) {

                heroTitle.innerHTML =
                    wpHeroTitle.replace(
                        /oxford/i,
                        "<span>Oxford</span>"
                    );

            }


            // Find hero description
            const wpHeroDescription = textContent.find(text =>
                text.toLowerCase().includes("dreaming spires")
            );

            if (heroDescription && wpHeroDescription) {

                heroDescription.textContent =
                    wpHeroDescription;

            }


            // ==========================================
            // INTRODUCTION
            // ==========================================

            const introTitle =
                document.querySelector(".wp-oxford-intro-title");

            const introDescription1 =
                document.querySelector(
                    ".wp-oxford-intro-description-1"
                );

            const introDescription2 =
                document.querySelector(
                    ".wp-oxford-intro-description-2"
                );

            const introDescription3 =
                document.querySelector(
                    ".wp-oxford-intro-description-3"
                );


            // Introduction heading

            const wpIntroTitle = textContent.find(text =>
                text.toLowerCase().includes("a city of dreaming spires")
            );

            if (introTitle && wpIntroTitle) {

                introTitle.innerHTML =
                    wpIntroTitle.replace(
                        /dreaming spires/i,
                        "<span>Dreaming Spires</span>"
                    );

            }


            // Introduction paragraph 1

            const wpIntro1 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "oxford is one of england"
                )
            );

            if (introDescription1 && wpIntro1) {

                introDescription1.textContent =
                    wpIntro1;

            }


            // Introduction paragraph 2

            const wpIntro2 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "wander through atmospheric"
                )
            );

            if (introDescription2 && wpIntro2) {

                introDescription2.textContent =
                    wpIntro2;

            }


            // Introduction paragraph 3

            const wpIntro3 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "beyond its famous university"
                )
            );

            if (introDescription3 && wpIntro3) {

                introDescription3.textContent =
                    wpIntro3;

            }


            // ==========================================
            // QUICK FACTS
            // ==========================================

            const location =
                document.querySelector(".wp-oxford-location");

            const language =
                document.querySelector(".wp-oxford-language");

            const currency =
                document.querySelector(".wp-oxford-currency");

            const transport =
                document.querySelector(".wp-oxford-transport");


            // Location

            const wpLocation = textContent.find(text =>
                text.toLowerCase().includes("south east england")
            );

            if (location && wpLocation) {
                location.textContent = wpLocation;
            }


            // Language

            const wpLanguage = textContent.find(text =>
                text.toLowerCase() === "english"
            );

            if (language && wpLanguage) {
                language.textContent = wpLanguage;
            }


            // Currency

            const wpCurrency = textContent.find(text =>
                text.toLowerCase().includes("pound sterling")
            );

            if (currency && wpCurrency) {
                currency.textContent = wpCurrency;
            }


            // Transport

            const wpTransport = textContent.find(text =>
                text.toLowerCase().includes("walking, bus")
            );

            if (transport && wpTransport) {
                transport.textContent = wpTransport;
            }


            console.log(
                "Oxford Hero + Introduction updated from WordPress."
            );

        })

        .catch(error => {

            console.error(
                "Oxford WordPress integration error:",
                error
            );

        });

});
// ==========================================
// OXFORD WORDPRESS INTEGRATION
// TOP PLACES
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Run only on Oxford page
    if (!document.querySelector(".oxford-hero")) {
        return;
    }

    console.log("Oxford Top Places integration started.");

    const OXFORD_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(OXFORD_API)
        .then(response => {
            if (!response.ok) {
                throw new Error("Oxford WordPress API request failed.");
            }

            return response.json();
        })

        .then(data => {

            const oxfordPage = data.posts.find(
                page => page.slug === "oxford"
            );

            if (!oxfordPage) {
                console.error("Oxford WordPress page NOT found.");
                return;
            }

            console.log("Oxford Top Places page found.");

            // Temporary container
            const tempDiv = document.createElement("div");

            tempDiv.innerHTML = oxfordPage.content;

            // Get clean WordPress text
            const textContent = tempDiv.innerText
                .split("\n")
                .map(text => text.trim())
                .filter(text => text.length > 0);

            console.log(
                "Oxford Top Places WordPress content:",
                textContent
            );


            // ==========================================
            // PLACE 1 — RADCLIFFE CAMERA
            // ==========================================

            const placeCategory1 =
                document.querySelector(
                    ".wp-oxford-place-category-1"
                );

            const placeName1 =
                document.querySelector(
                    ".wp-oxford-place-name-1"
                );

            const placeDescription1 =
                document.querySelector(
                    ".wp-oxford-place-description-1"
                );


            const wpCategory1 = textContent.find(text =>
                text.toLowerCase() === "architecture"
            );

            const wpName1 = textContent.find(text =>
                text.toLowerCase() === "radcliffe camera"
            );

            const wpDescription1 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "admire one of oxford's most recognisable"
                )
            );


            if (placeCategory1 && wpCategory1) {
                placeCategory1.textContent = wpCategory1;
            }

            if (placeName1 && wpName1) {
                placeName1.textContent = wpName1;
            }

            if (placeDescription1 && wpDescription1) {
                placeDescription1.textContent = wpDescription1;
            }


            // ==========================================
            // PLACE 2 — BODLEIAN LIBRARY
            // ==========================================

            const placeCategory2 =
                document.querySelector(
                    ".wp-oxford-place-category-2"
                );

            const placeName2 =
                document.querySelector(
                    ".wp-oxford-place-name-2"
                );

            const placeDescription2 =
                document.querySelector(
                    ".wp-oxford-place-description-2"
                );


            const wpCategory2 = textContent.find(text =>
                text.toLowerCase() === "history"
            );

            const wpName2 = textContent.find(text =>
                text.toLowerCase() === "bodleian library"
            );

            const wpDescription2 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "discover one of europe's oldest libraries"
                )
            );


            if (placeCategory2 && wpCategory2) {
                placeCategory2.textContent = wpCategory2;
            }

            if (placeName2 && wpName2) {
                placeName2.textContent = wpName2;
            }

            if (placeDescription2 && wpDescription2) {
                placeDescription2.textContent = wpDescription2;
            }


            // ==========================================
            // PLACE 3 — CHRIST CHURCH
            // ==========================================

            const placeCategory3 =
                document.querySelector(
                    ".wp-oxford-place-category-3"
                );

            const placeName3 =
                document.querySelector(
                    ".wp-oxford-place-name-3"
                );

            const placeDescription3 =
                document.querySelector(
                    ".wp-oxford-place-description-3"
                );


            const wpCategory3 = textContent.find(text =>
                text.toLowerCase() === "college"
            );

            const wpName3 = textContent.find(text =>
                text.toLowerCase() === "christ church"
            );

            const wpDescription3 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "explore one of oxford's most famous colleges"
                )
            );


            if (placeCategory3 && wpCategory3) {
                placeCategory3.textContent = wpCategory3;
            }

            if (placeName3 && wpName3) {
                placeName3.textContent = wpName3;
            }

            if (placeDescription3 && wpDescription3) {
                placeDescription3.textContent = wpDescription3;
            }


            // ==========================================
            // PLACE 4 — BRIDGE OF SIGHS
            // ==========================================

            const placeCategory4 =
                document.querySelector(
                    ".wp-oxford-place-category-4"
                );

            const placeName4 =
                document.querySelector(
                    ".wp-oxford-place-name-4"
                );

            const placeDescription4 =
                document.querySelector(
                    ".wp-oxford-place-description-4"
                );


            const wpCategory4 = textContent.find(text =>
                text.toLowerCase() === "landmark"
            );

            const wpName4 = textContent.find(text =>
                text.toLowerCase() === "bridge of sighs"
            );

            const wpDescription4 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "stop by this distinctive oxford landmark"
                )
            );


            if (placeCategory4 && wpCategory4) {
                placeCategory4.textContent = wpCategory4;
            }

            if (placeName4 && wpName4) {
                placeName4.textContent = wpName4;
            }

            if (placeDescription4 && wpDescription4) {
                placeDescription4.textContent = wpDescription4;
            }


            // ==========================================
            // PLACE 5 — ASHMOLEAN MUSEUM
            // ==========================================

            const placeCategory5 =
                document.querySelector(
                    ".wp-oxford-place-category-5"
                );

            const placeName5 =
                document.querySelector(
                    ".wp-oxford-place-name-5"
                );

            const placeDescription5 =
                document.querySelector(
                    ".wp-oxford-place-description-5"
                );


            const wpCategory5 = textContent.find(text =>
                text.toLowerCase() === "culture"
            );

            const wpName5 = textContent.find(text =>
                text.toLowerCase() === "ashmolean museum"
            );

            const wpDescription5 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "explore fascinating collections spanning art"
                )
            );


            if (placeCategory5 && wpCategory5) {
                placeCategory5.textContent = wpCategory5;
            }

            if (placeName5 && wpName5) {
                placeName5.textContent = wpName5;
            }

            if (placeDescription5 && wpDescription5) {
                placeDescription5.textContent = wpDescription5;
            }


            // ==========================================
            // PLACE 6 — UNIVERSITY PARKS
            // ==========================================

            const placeCategory6 =
                document.querySelector(
                    ".wp-oxford-place-category-6"
                );

            const placeName6 =
                document.querySelector(
                    ".wp-oxford-place-name-6"
                );

            const placeDescription6 =
                document.querySelector(
                    ".wp-oxford-place-description-6"
                );


            const wpCategory6 = textContent.find(text =>
                text.toLowerCase() === "outdoors"
            );

            const wpName6 = textContent.find(text =>
                text.toLowerCase() === "university parks"
            );

            const wpDescription6 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "escape the busy streets"
                )
            );


            if (placeCategory6 && wpCategory6) {
                placeCategory6.textContent = wpCategory6;
            }

            if (placeName6 && wpName6) {
                placeName6.textContent = wpName6;
            }

            if (placeDescription6 && wpDescription6) {
                placeDescription6.textContent = wpDescription6;
            }


            console.log(
                "Oxford Top Places updated from WordPress."
            );

        })

        .catch(error => {

            console.error(
                "Oxford Top Places WordPress integration error:",
                error
            );

        });

});
// ==========================================
// OXFORD WORDPRESS INTEGRATION
// THINGS TO DO
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Run only on Oxford page
    if (!document.querySelector(".oxford-things")) {
        return;
    }

    console.log("Oxford Things To Do integration started.");

    const OXFORD_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(OXFORD_API)
        .then(response => {
            if (!response.ok) {
                throw new Error("Oxford WordPress API request failed.");
            }

            return response.json();
        })

        .then(data => {

            const oxfordPage = data.posts.find(
                page => page.slug === "oxford"
            );

            if (!oxfordPage) {
                console.error("Oxford WordPress page NOT found.");
                return;
            }

            // Temporary container
            const tempDiv = document.createElement("div");

            tempDiv.innerHTML = oxfordPage.content;

            // Get clean WordPress text
            const textContent = tempDiv.innerText
                .split("\n")
                .map(text => text.trim())
                .filter(text => text.length > 0);

            console.log(
                "Oxford Things To Do WordPress content:",
                textContent
            );


            // ==========================================
            // THING 1 — GO PUNTING
            // ==========================================

            const category1 =
                document.querySelector(
                    ".wp-oxford-thing-category-1"
                );

            const name1 =
                document.querySelector(
                    ".wp-oxford-thing-name-1"
                );

            const description1 =
                document.querySelector(
                    ".wp-oxford-thing-description-1"
                );


            const wpCategory1 = textContent.find(text =>
                text.toLowerCase() === "experience"
            );

            const wpName1 = textContent.find(text =>
                text.toLowerCase() === "go punting"
            );

            const wpDescription1 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "enjoy a relaxing punt"
                )
            );


            if (category1 && wpCategory1) {
                category1.textContent = wpCategory1;
            }

            if (name1 && wpName1) {
                name1.textContent = wpName1;
            }

            if (description1 && wpDescription1) {
                description1.textContent = wpDescription1;
            }


            // ==========================================
            // THING 2 — VISIT HISTORIC COLLEGES
            // ==========================================

            const category2 =
                document.querySelector(
                    ".wp-oxford-thing-category-2"
                );

            const name2 =
                document.querySelector(
                    ".wp-oxford-thing-name-2"
                );

            const description2 =
                document.querySelector(
                    ".wp-oxford-thing-description-2"
                );


            const wpCategory2 = textContent.find(text =>
                text.toLowerCase() === "history"
            );

            const wpName2 = textContent.find(text =>
                text.toLowerCase() === "visit historic colleges"
            );

            const wpDescription2 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "explore oxford's famous colleges"
                )
            );


            if (category2 && wpCategory2) {
                category2.textContent = wpCategory2;
            }

            if (name2 && wpName2) {
                name2.textContent = wpName2;
            }

            if (description2 && wpDescription2) {
                description2.textContent = wpDescription2;
            }


            // ==========================================
            // THING 3 — EXPLORE MUSEUMS
            // ==========================================

            const category3 =
                document.querySelector(
                    ".wp-oxford-thing-category-3"
                );

            const name3 =
                document.querySelector(
                    ".wp-oxford-thing-name-3"
                );

            const description3 =
                document.querySelector(
                    ".wp-oxford-thing-description-3"
                );


            const wpCategory3 = textContent.find(text =>
                text.toLowerCase() === "culture"
            );

            const wpName3 = textContent.find(text =>
                text.toLowerCase() === "explore museums"
            );

            const wpDescription3 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "discover fascinating collections"
                )
            );


            if (category3 && wpCategory3) {
                category3.textContent = wpCategory3;
            }

            if (name3 && wpName3) {
                name3.textContent = wpName3;
            }

            if (description3 && wpDescription3) {
                description3.textContent = wpDescription3;
            }


            // ==========================================
            // THING 4 — TAKE A WALKING TOUR
            // ==========================================

            const category4 =
                document.querySelector(
                    ".wp-oxford-thing-category-4"
                );

            const name4 =
                document.querySelector(
                    ".wp-oxford-thing-name-4"
                );

            const description4 =
                document.querySelector(
                    ".wp-oxford-thing-description-4"
                );


            const wpCategory4 = textContent.find(text =>
                text.toLowerCase() === "sightseeing"
            );

            const wpName4 = textContent.find(text =>
                text.toLowerCase() === "take a walking tour"
            );

            const wpDescription4 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "walk through oxford's historic streets"
                )
            );


            if (category4 && wpCategory4) {
                category4.textContent = wpCategory4;
            }

            if (name4 && wpName4) {
                name4.textContent = wpName4;
            }

            if (description4 && wpDescription4) {
                description4.textContent = wpDescription4;
            }


            // ==========================================
            // THING 5 — DISCOVER BOOKSHOPS
            // ==========================================

            const category5 =
                document.querySelector(
                    ".wp-oxford-thing-category-5"
                );

            const name5 =
                document.querySelector(
                    ".wp-oxford-thing-name-5"
                );

            const description5 =
                document.querySelector(
                    ".wp-oxford-thing-description-5"
                );


            const wpCategory5 = textContent.find(text =>
                text.toLowerCase() === "shopping"
            );

            const wpName5 = textContent.find(text =>
                text.toLowerCase() === "discover bookshops"
            );

            const wpDescription5 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "browse independent bookshops"
                )
            );


            if (category5 && wpCategory5) {
                category5.textContent = wpCategory5;
            }

            if (name5 && wpName5) {
                name5.textContent = wpName5;
            }

            if (description5 && wpDescription5) {
                description5.textContent = wpDescription5;
            }


            // ==========================================
            // THING 6 — ENJOY OXFORD CAFÉS
            // ==========================================

            const category6 =
                document.querySelector(
                    ".wp-oxford-thing-category-6"
                );

            const name6 =
                document.querySelector(
                    ".wp-oxford-thing-name-6"
                );

            const description6 =
                document.querySelector(
                    ".wp-oxford-thing-description-6"
                );


            const wpCategory6 = textContent.find(text =>
                text.toLowerCase() === "food & culture"
            );

            const wpName6 = textContent.find(text =>
                text.toLowerCase() === "enjoy oxford cafés"
            );

            const wpDescription6 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "relax in charming cafés"
                )
            );


            if (category6 && wpCategory6) {
                category6.textContent = wpCategory6;
            }

            if (name6 && wpName6) {
                name6.textContent = wpName6;
            }

            if (description6 && wpDescription6) {
                description6.textContent = wpDescription6;
            }


            console.log(
                "Oxford Things To Do updated from WordPress."
            );

        })

        .catch(error => {

            console.error(
                "Oxford Things To Do WordPress integration error:",
                error
            );

        });

});
// ==========================================
// OXFORD WORDPRESS INTEGRATION
// GETTING AROUND
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Run only on Oxford page
    if (!document.querySelector(".oxford-around")) {
        return;
    }

    console.log("Oxford Getting Around integration started.");

    const OXFORD_API =
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20";

    fetch(OXFORD_API)
        .then(response => {
            if (!response.ok) {
                throw new Error("Oxford WordPress API request failed.");
            }

            return response.json();
        })

        .then(data => {

            const oxfordPage = data.posts.find(
                page => page.slug === "oxford"
            );

            if (!oxfordPage) {
                console.error("Oxford WordPress page NOT found.");
                return;
            }

            console.log("Oxford Getting Around page found.");

            // Temporary container
            const tempDiv = document.createElement("div");

            tempDiv.innerHTML = oxfordPage.content;

            // Get clean WordPress text
            const textContent = tempDiv.innerText
                .split("\n")
                .map(text => text.trim())
                .filter(text => text.length > 0);

            console.log(
                "Oxford Getting Around WordPress content:",
                textContent
            );


            // ==========================================
            // MAIN DESCRIPTION 1
            // ==========================================

            const description1 =
                document.querySelector(
                    ".wp-oxford-around-description-1"
                );

            const wpDescription1 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "oxford is compact"
                )
            );

            if (description1 && wpDescription1) {
                description1.textContent = wpDescription1;
            }


            // ==========================================
            // MAIN DESCRIPTION 2
            // ==========================================

            const description2 =
                document.querySelector(
                    ".wp-oxford-around-description-2"
                );

            const wpDescription2 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "buses provide"
                )
            );

            if (description2 && wpDescription2) {
                description2.textContent = wpDescription2;
            }


            // ==========================================
            // LOCAL TIP TITLE
            // ==========================================

            const tipTitle =
                document.querySelector(
                    ".wp-oxford-local-tip-title"
                );

            const wpTipTitle = textContent.find(text =>
                text.toLowerCase() === "explore like a local"
            );

            if (tipTitle && wpTipTitle) {
                tipTitle.textContent = wpTipTitle;
            }


            // ==========================================
            // LOCAL TIP DESCRIPTION
            // ==========================================

            const tipDescription =
                document.querySelector(
                    ".wp-oxford-local-tip-description"
                );

            const wpTipDescription = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "wear comfortable shoes"
                )
            );

            if (tipDescription && wpTipDescription) {
                tipDescription.textContent = wpTipDescription;
            }


            // ==========================================
            // TRANSPORT 1 — WALKING
            // ==========================================

            const transportName1 =
                document.querySelector(
                    ".wp-oxford-transport-name-1"
                );

            const transportDescription1 =
                document.querySelector(
                    ".wp-oxford-transport-description-1"
                );

            const wpTransportName1 = textContent.find(text =>
                text.toLowerCase() === "walking"
            );

            const wpTransportDescription1 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "oxford is compact and easy to explore"
                )
            );

            if (transportName1 && wpTransportName1) {
                transportName1.textContent = wpTransportName1;
            }

            if (transportDescription1 && wpTransportDescription1) {
                transportDescription1.textContent =
                    wpTransportDescription1;
            }


            // ==========================================
            // TRANSPORT 2 — BUS
            // ==========================================

            const transportName2 =
                document.querySelector(
                    ".wp-oxford-transport-name-2"
                );

            const transportDescription2 =
                document.querySelector(
                    ".wp-oxford-transport-description-2"
                );

            const wpTransportName2 = textContent.find(text =>
                text.toLowerCase() === "bus"
            );

            const wpTransportDescription2 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "local buses provide"
                )
            );

            if (transportName2 && wpTransportName2) {
                transportName2.textContent = wpTransportName2;
            }

            if (transportDescription2 && wpTransportDescription2) {
                transportDescription2.textContent =
                    wpTransportDescription2;
            }


            // ==========================================
            // TRANSPORT 3 — TRAIN
            // ==========================================

            const transportName3 =
                document.querySelector(
                    ".wp-oxford-transport-name-3"
                );

            const transportDescription3 =
                document.querySelector(
                    ".wp-oxford-transport-description-3"
                );

            const wpTransportName3 = textContent.find(text =>
                text.toLowerCase() === "train"
            );

            const wpTransportDescription3 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "oxford railway station"
                )
            );

            if (transportName3 && wpTransportName3) {
                transportName3.textContent = wpTransportName3;
            }

            if (transportDescription3 && wpTransportDescription3) {
                transportDescription3.textContent =
                    wpTransportDescription3;
            }


            // ==========================================
            // TRANSPORT 4 — TAXI
            // ==========================================

            const transportName4 =
                document.querySelector(
                    ".wp-oxford-transport-name-4"
                );

            const transportDescription4 =
                document.querySelector(
                    ".wp-oxford-transport-description-4"
                );

            const wpTransportName4 = textContent.find(text =>
                text.toLowerCase() === "taxi"
            );

            const wpTransportDescription4 = textContent.find(text =>
                text.toLowerCase().startsWith(
                    "taxis and private hire"
                )
            );

            if (transportName4 && wpTransportName4) {
                transportName4.textContent = wpTransportName4;
            }

            if (transportDescription4 && wpTransportDescription4) {
                transportDescription4.textContent =
                    wpTransportDescription4;
            }


            console.log(
                "Oxford Getting Around updated from WordPress."
            );

        })

        .catch(error => {

            console.error(
                "Oxford Getting Around WordPress integration error:",
                error
            );

        });

});
/* ==========================================
   OXFORD - BEST TIME TO VISIT WORDPRESS
========================================== */

if (document.querySelector(".oxford-best-time")) {

    console.log("Oxford Best Time integration started.");

    fetch("https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20")
        .then(response => response.json())
        .then(data => {

            const pages = data.posts || [];

            const oxfordPage = pages.find(
                page => page.slug === "oxford"
            );

            if (!oxfordPage) {
                console.log("Oxford Best Time: WordPress page not found.");
                return;
            }

            console.log("Oxford Best Time WordPress page found:", oxfordPage);

            const tempDiv = document.createElement("div");

            tempDiv.innerHTML = oxfordPage.content || "";

            const textElements = Array.from(
                tempDiv.querySelectorAll("p, h1, h2, h3, h4, span, li")
            );

            const getText = (searchText, startsWith = false) => {

                const element = textElements.find(el => {

                    const text = el.textContent
                        .trim()
                        .replace(/\s+/g, " ");

                    if (startsWith) {
                        return text.toLowerCase().startsWith(
                            searchText.toLowerCase()
                        );
                    }

                    return text.toLowerCase() ===
                        searchText.toLowerCase();
                });

                return element
                    ? element.textContent.trim().replace(/\s+/g, " ")
                    : "";
            };


            /* Main Heading */

            const bestTimeTitle =
                document.querySelector(".wp-oxford-best-time-title");

            const wpBestTimeTitle =
                getText("Best Time to Visit Oxford");

            if (bestTimeTitle && wpBestTimeTitle) {

                const words = wpBestTimeTitle.split(" ");

                const visitIndex = words.findIndex(
                    word => word.toLowerCase() === "visit"
                );

                if (visitIndex !== -1) {

                    const firstPart =
                        words.slice(0, visitIndex).join(" ");

                    const secondPart =
                        words.slice(visitIndex).join(" ");

                    bestTimeTitle.innerHTML =
                        `${firstPart} <span>${secondPart}</span>`;
                }
            }


            /* Main Description */

            const bestTimeDescription =
                document.querySelector(
                    ".wp-oxford-best-time-description"
                );

            const wpBestTimeDescription =
                getText(
                    "Oxford is beautiful throughout the year",
                    true
                );

            if (bestTimeDescription && wpBestTimeDescription) {

                bestTimeDescription.textContent =
                    wpBestTimeDescription;
            }


            /* ==========================================
               SEASON 1 - SPRING
            ========================================== */

            const springMonths =
                document.querySelector(
                    ".wp-oxford-season-months-1"
                );

            const wpSpringMonths =
                getText("MAR — MAY");

            if (springMonths && wpSpringMonths) {
                springMonths.textContent = wpSpringMonths;
            }


            const springName =
                document.querySelector(
                    ".wp-oxford-season-name-1"
                );

            const wpSpringName =
                getText("Spring");

            if (springName && wpSpringName) {
                springName.textContent = wpSpringName;
            }


            const springDescription =
                document.querySelector(
                    ".wp-oxford-season-description-1"
                );

            const wpSpringDescription =
                getText(
                    "Enjoy fresh greenery",
                    true
                );

            if (springDescription && wpSpringDescription) {
                springDescription.textContent =
                    wpSpringDescription;
            }


            /* ==========================================
               SEASON 2 - SUMMER
            ========================================== */

            const summerMonths =
                document.querySelector(
                    ".wp-oxford-season-months-2"
                );

            const wpSummerMonths =
                getText("JUN — AUG");

            if (summerMonths && wpSummerMonths) {
                summerMonths.textContent = wpSummerMonths;
            }


            const summerName =
                document.querySelector(
                    ".wp-oxford-season-name-2"
                );

            const wpSummerName =
                getText("Summer");

            if (summerName && wpSummerName) {
                summerName.textContent = wpSummerName;
            }


            const summerDescription =
                document.querySelector(
                    ".wp-oxford-season-description-2"
                );

            const wpSummerDescription =
                getText(
                    "Longer daylight hours",
                    true
                );

            if (summerDescription && wpSummerDescription) {
                summerDescription.textContent =
                    wpSummerDescription;
            }


            /* ==========================================
               SEASON 3 - AUTUMN
            ========================================== */

            const autumnMonths =
                document.querySelector(
                    ".wp-oxford-season-months-3"
                );

            const wpAutumnMonths =
                getText("SEP — NOV");

            if (autumnMonths && wpAutumnMonths) {
                autumnMonths.textContent = wpAutumnMonths;
            }


            const autumnName =
                document.querySelector(
                    ".wp-oxford-season-name-3"
                );

            const wpAutumnName =
                getText("Autumn");

            if (autumnName && wpAutumnName) {
                autumnName.textContent = wpAutumnName;
            }


            const autumnDescription =
                document.querySelector(
                    ".wp-oxford-season-description-3"
                );

            const wpAutumnDescription =
                getText(
                    "Golden foliage",
                    true
                );

            if (autumnDescription && wpAutumnDescription) {
                autumnDescription.textContent =
                    wpAutumnDescription;
            }


            /* ==========================================
               SEASON 4 - WINTER
            ========================================== */

            const winterMonths =
                document.querySelector(
                    ".wp-oxford-season-months-4"
                );

            const wpWinterMonths =
                getText("DEC — FEB");

            if (winterMonths && wpWinterMonths) {
                winterMonths.textContent = wpWinterMonths;
            }


            const winterName =
                document.querySelector(
                    ".wp-oxford-season-name-4"
                );

            const wpWinterName =
                getText("Winter");

            if (winterName && wpWinterName) {
                winterName.textContent = wpWinterName;
            }


            const winterDescription =
                document.querySelector(
                    ".wp-oxford-season-description-4"
                );

            const wpWinterDescription =
                getText(
                    "Enjoy quieter streets",
                    true
                );

            if (winterDescription && wpWinterDescription) {
                winterDescription.textContent =
                    wpWinterDescription;
            }


            /* ==========================================
               SUMMER BADGE
            ========================================== */

            const seasonBadge =
                document.querySelector(
                    ".wp-oxford-season-badge"
                );

            const wpSeasonBadge =
                getText("MOST POPULAR");

            if (seasonBadge && wpSeasonBadge) {
                seasonBadge.textContent = wpSeasonBadge;
            }


            console.log(
                "Oxford Best Time updated from WordPress."
            );

        })
        .catch(error => {

            console.error(
                "Oxford Best Time WordPress error:",
                error
            );

        });

}
/* ==========================================
   OXFORD - TRAVEL TIPS WORDPRESS
========================================== */

if (document.querySelector(".oxford-tips")) {

    console.log("Oxford Travel Tips integration started.");

    fetch("https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20")
        .then(response => response.json())
        .then(data => {

            const pages = data.posts || [];

            const oxfordPage = pages.find(
                page => page.slug === "oxford"
            );

            if (!oxfordPage) {
                console.log("Oxford Travel Tips: WordPress page not found.");
                return;
            }

            console.log(
                "Oxford Travel Tips WordPress page found:",
                oxfordPage
            );

            const tempDiv = document.createElement("div");

            tempDiv.innerHTML = oxfordPage.content || "";

            const textElements = Array.from(
                tempDiv.querySelectorAll("p, h1, h2, h3, h4, span, li")
            );

            const getText = (searchText, startsWith = false) => {

                const element = textElements.find(el => {

                    const text = el.textContent
                        .trim()
                        .replace(/\s+/g, " ");

                    if (startsWith) {

                        return text
                            .toLowerCase()
                            .startsWith(
                                searchText.toLowerCase()
                            );

                    }

                    return text.toLowerCase() ===
                        searchText.toLowerCase();

                });

                return element
                    ? element.textContent
                        .trim()
                        .replace(/\s+/g, " ")
                    : "";
            };


            /* ==========================================
               MAIN TRAVEL TIPS DESCRIPTION
            ========================================== */

            const tipsDescription =
                document.querySelector(
                    ".wp-oxford-tips-description"
                );

            /*
             * WordPress paragraph is identified
             * by its beginning text.
             */

            const wpTipsDescription =
                getText(
                    "A few practical tips to help you explore Oxford",
                    true
                );

            if (tipsDescription && wpTipsDescription) {

                tipsDescription.textContent =
                    wpTipsDescription;

            }


            /* ==========================================
               TIP 1
            ========================================== */

            const tipName1 =
                document.querySelector(
                    ".wp-oxford-tip-name-1"
                );

            const wpTipName1 =
                getText("Explore on Foot");

            if (tipName1 && wpTipName1) {

                tipName1.textContent =
                    wpTipName1;

            }


            const tipDescription1 =
                document.querySelector(
                    ".wp-oxford-tip-description-1"
                );

            const wpTipDescription1 =
                getText(
                    "Oxford's historic centre is compact",
                    true
                );

            if (tipDescription1 && wpTipDescription1) {

                tipDescription1.textContent =
                    wpTipDescription1;

            }


            /* ==========================================
               TIP 2
            ========================================== */

            const tipName2 =
                document.querySelector(
                    ".wp-oxford-tip-name-2"
                );

            const wpTipName2 =
                getText("Pack for Changeable Weather");

            if (tipName2 && wpTipName2) {

                tipName2.textContent =
                    wpTipName2;

            }


            const tipDescription2 =
                document.querySelector(
                    ".wp-oxford-tip-description-2"
                );

            const wpTipDescription2 =
                getText(
                    "Bring comfortable layers",
                    true
                );

            if (tipDescription2 && wpTipDescription2) {

                tipDescription2.textContent =
                    wpTipDescription2;

            }


            /* ==========================================
               TIP 3
            ========================================== */

            const tipName3 =
                document.querySelector(
                    ".wp-oxford-tip-name-3"
                );

            const wpTipName3 =
                getText(
                    "Check College Opening Times"
                );

            if (tipName3 && wpTipName3) {

                tipName3.textContent =
                    wpTipName3;

            }


            const tipDescription3 =
                document.querySelector(
                    ".wp-oxford-tip-description-3"
                );

            const wpTipDescription3 =
                getText(
                    "Some colleges have restricted visiting hours",
                    true
                );

            if (tipDescription3 && wpTipDescription3) {

                tipDescription3.textContent =
                    wpTipDescription3;

            }


            /* ==========================================
               TIP 4
            ========================================== */

            const tipName4 =
                document.querySelector(
                    ".wp-oxford-tip-name-4"
                );

            const wpTipName4 =
                getText("Try Punting");

            if (tipName4 && wpTipName4) {

                tipName4.textContent =
                    wpTipName4;

            }


            const tipDescription4 =
                document.querySelector(
                    ".wp-oxford-tip-description-4"
                );

            const wpTipDescription4 =
                getText(
                    "A punting trip is a relaxing way",
                    true
                );

            if (tipDescription4 && wpTipDescription4) {

                tipDescription4.textContent =
                    wpTipDescription4;

            }


            /* ==========================================
               TIP 5
            ========================================== */

            const tipName5 =
                document.querySelector(
                    ".wp-oxford-tip-name-5"
                );

            const wpTipName5 =
                getText("Use Public Transport");

            if (tipName5 && wpTipName5) {

                tipName5.textContent =
                    wpTipName5;

            }


            const tipDescription5 =
                document.querySelector(
                    ".wp-oxford-tip-description-5"
                );

            const wpTipDescription5 =
                getText(
                    "Walking is best for the centre",
                    true
                );

            if (tipDescription5 && wpTipDescription5) {

                tipDescription5.textContent =
                    wpTipDescription5;

            }


            /* ==========================================
               TIP 6
            ========================================== */

            const tipName6 =
                document.querySelector(
                    ".wp-oxford-tip-name-6"
                );

            const wpTipName6 =
                getText(
                    "Explore Beyond the Main Streets"
                );

            if (tipName6 && wpTipName6) {

                tipName6.textContent =
                    wpTipName6;

            }


            const tipDescription6 =
                document.querySelector(
                    ".wp-oxford-tip-description-6"
                );

            const wpTipDescription6 =
                getText(
                    "Wander into quieter lanes",
                    true
                );

            if (tipDescription6 && wpTipDescription6) {

                tipDescription6.textContent =
                    wpTipDescription6;

            }


            console.log(
                "Oxford Travel Tips updated from WordPress."
            );

        })
        .catch(error => {

            console.error(
                "Oxford Travel Tips WordPress error:",
                error
            );

        });

}
/* ==========================================
   OXFORD - FAQ WORDPRESS
========================================== */

if (document.querySelector(".oxford-faq")) {

    console.log("Oxford FAQ integration started.");

    fetch("https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20")
        .then(response => response.json())
        .then(data => {

            const oxfordFaqPage = data.posts.find(
                page => page.slug === "oxford"
            );

            if (!oxfordFaqPage) {
                console.log("Oxford FAQ WordPress page not found.");
                return;
            }

            console.log(
                "Oxford FAQ WordPress page found:",
                oxfordFaqPage
            );

            const oxfordFaqTemp = document.createElement("div");

            oxfordFaqTemp.innerHTML = oxfordFaqPage.content;

            const oxfordFaqElements =
                oxfordFaqTemp.querySelectorAll(
                    "p, h1, h2, h3, h4, span, li"
                );

            const oxfordFaqTexts =
                Array.from(oxfordFaqElements)
                    .map(element => element.textContent.trim())
                    .filter(text => text.length > 0);


            function getOxfordFaqText(searchText, startsWith = false) {

                const searchValue =
                    searchText.toLowerCase().trim();

                const foundText =
                    oxfordFaqTexts.find(text => {

                        const currentText =
                            text.toLowerCase().trim();

                        if (startsWith) {
                            return currentText.startsWith(searchValue);
                        }

                        return currentText === searchValue;
                    });

                return foundText || "";
            }


            /* FAQ SECTION TITLE */

            const oxfordFaqEyebrow =
                document.querySelector(
                    ".wp-oxford-faq-eyebrow"
                );

            if (oxfordFaqEyebrow) {

                const wpEyebrow =
                    getOxfordFaqText("have questions?");

                if (wpEyebrow) {
                    oxfordFaqEyebrow.textContent = wpEyebrow;
                }
            }


            const oxfordFaqTitle =
                document.querySelector(
                    ".wp-oxford-faq-title"
                );

            if (oxfordFaqTitle) {

                const wpTitle =
                    getOxfordFaqText("oxford faqs");

                if (wpTitle) {
                    oxfordFaqTitle.innerHTML =
                        wpTitle.replace(
                            "FAQs",
                            "<span>FAQs</span>"
                        );
                }
            }


            const oxfordFaqDescription =
                document.querySelector(
                    ".wp-oxford-faq-description"
                );

            if (oxfordFaqDescription) {

                const wpDescription =
                    getOxfordFaqText(
                        "helpful answers to common questions",
                        true
                    );

                if (wpDescription) {
                    oxfordFaqDescription.textContent =
                        wpDescription;
                }
            }


            /* FAQ 1 */

            const oxfordFaqQuestion1 =
                document.querySelector(
                    ".wp-oxford-faq-question-1"
                );

            const oxfordFaqAnswer1 =
                document.querySelector(
                    ".wp-oxford-faq-answer-1"
                );

            if (oxfordFaqQuestion1) {

                const wpQuestion =
                    getOxfordFaqText(
                        "how many days do you need in oxford?"
                    );

                if (wpQuestion) {
                    oxfordFaqQuestion1.textContent =
                        wpQuestion;
                }
            }

            if (oxfordFaqAnswer1) {

                const wpAnswer =
                    getOxfordFaqText(
                        "two days is a good starting point",
                        true
                    );

                if (wpAnswer) {
                    oxfordFaqAnswer1.textContent =
                        wpAnswer;
                }
            }


            /* FAQ 2 */

            const oxfordFaqQuestion2 =
                document.querySelector(
                    ".wp-oxford-faq-question-2"
                );

            const oxfordFaqAnswer2 =
                document.querySelector(
                    ".wp-oxford-faq-answer-2"
                );

            if (oxfordFaqQuestion2) {

                const wpQuestion =
                    getOxfordFaqText(
                        "what is oxford famous for?"
                    );

                if (wpQuestion) {
                    oxfordFaqQuestion2.textContent =
                        wpQuestion;
                }
            }

            if (oxfordFaqAnswer2) {

                const wpAnswer =
                    getOxfordFaqText(
                        "oxford is famous for its historic university",
                        true
                    );

                if (wpAnswer) {
                    oxfordFaqAnswer2.textContent =
                        wpAnswer;
                }
            }


            /* FAQ 3 */

            const oxfordFaqQuestion3 =
                document.querySelector(
                    ".wp-oxford-faq-question-3"
                );

            const oxfordFaqAnswer3 =
                document.querySelector(
                    ".wp-oxford-faq-answer-3"
                );

            if (oxfordFaqQuestion3) {

                const wpQuestion =
                    getOxfordFaqText(
                        "is oxford easy to explore without a car?"
                    );

                if (wpQuestion) {
                    oxfordFaqQuestion3.textContent =
                        wpQuestion;
                }
            }

            if (oxfordFaqAnswer3) {

                const wpAnswer =
                    getOxfordFaqText(
                        "yes. the historic centre is compact",
                        true
                    );

                if (wpAnswer) {
                    oxfordFaqAnswer3.textContent =
                        wpAnswer;
                }
            }


            /* FAQ 4 */

            const oxfordFaqQuestion4 =
                document.querySelector(
                    ".wp-oxford-faq-question-4"
                );

            const oxfordFaqAnswer4 =
                document.querySelector(
                    ".wp-oxford-faq-answer-4"
                );

            if (oxfordFaqQuestion4) {

                const wpQuestion =
                    getOxfordFaqText(
                        "can you go punting in oxford?"
                    );

                if (wpQuestion) {
                    oxfordFaqQuestion4.textContent =
                        wpQuestion;
                }
            }

            if (oxfordFaqAnswer4) {

                const wpAnswer =
                    getOxfordFaqText(
                        "yes. punting is one of oxford's best-known",
                        true
                    );

                if (wpAnswer) {
                    oxfordFaqAnswer4.textContent =
                        wpAnswer;
                }
            }


            /* FAQ 5 */

            const oxfordFaqQuestion5 =
                document.querySelector(
                    ".wp-oxford-faq-question-5"
                );

            const oxfordFaqAnswer5 =
                document.querySelector(
                    ".wp-oxford-faq-answer-5"
                );

            if (oxfordFaqQuestion5) {

                const wpQuestion =
                    getOxfordFaqText(
                        "what should i wear in oxford?"
                    );

                if (wpQuestion) {
                    oxfordFaqQuestion5.textContent =
                        wpQuestion;
                }
            }

            if (oxfordFaqAnswer5) {

                const wpAnswer =
                    getOxfordFaqText(
                        "comfortable walking shoes are essential",
                        true
                    );

                if (wpAnswer) {
                    oxfordFaqAnswer5.textContent =
                        wpAnswer;
                }
            }


            /* FAQ 6 */

            const oxfordFaqQuestion6 =
                document.querySelector(
                    ".wp-oxford-faq-question-6"
                );

            const oxfordFaqAnswer6 =
                document.querySelector(
                    ".wp-oxford-faq-answer-6"
                );

            if (oxfordFaqQuestion6) {

                const wpQuestion =
                    getOxfordFaqText(
                        "is oxford suitable for a day trip?"
                    );

                if (wpQuestion) {
                    oxfordFaqQuestion6.textContent =
                        wpQuestion;
                }
            }

            if (oxfordFaqAnswer6) {

                const wpAnswer =
                    getOxfordFaqText(
                        "yes. oxford can be visited as a day trip",
                        true
                    );

                if (wpAnswer) {
                    oxfordFaqAnswer6.textContent =
                        wpAnswer;
                }
            }


            console.log(
                "Oxford FAQ updated from WordPress."
            );

        })
        .catch(error => {

            console.error(
                "Oxford FAQ WordPress error:",
                error
            );

        });

}

/* ==========================================
   OXFORD - FAQ ACCORDION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const oxfordFaqItems = document.querySelectorAll(
        ".oxford-faq .faq-item"
    );

    if (!oxfordFaqItems.length) {
        return;
    }

    oxfordFaqItems.forEach(function (item) {

        const question = item.querySelector(
            ".faq-question"
        );

        const answer = item.querySelector(
            ".faq-answer"
        );

        if (!question || !answer) {
            return;
        }

        question.addEventListener("click", function () {

            const isOpen =
                item.classList.contains("active");


            /* Close all Oxford FAQs */

            oxfordFaqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            });


            /* Open clicked FAQ */

            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });


    console.log(
        "Oxford FAQ accordion ready."
    );

});
/* ==========================================
   OXFORD - CTA WORDPRESS
========================================== */

if (document.querySelector(".oxford-cta")) {

    console.log("Oxford CTA integration started.");

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            const oxfordPage = data.posts.find(function (page) {
                return page.slug === "oxford";
            });

            if (!oxfordPage) {
                console.log("Oxford CTA WordPress page not found.");
                return;
            }

            console.log(
                "Oxford CTA WordPress page found:",
                oxfordPage
            );

            const tempDiv = document.createElement("div");

            tempDiv.innerHTML = oxfordPage.content;

            const oxfordCtaTexts = Array.from(
                tempDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6")
            )
                .map(function (element) {
                    return element.textContent.trim();
                })
                .filter(function (text) {
                    return text.length > 0;
                });


            function getOxfordCtaText(searchText) {

                return oxfordCtaTexts.find(function (text) {

                    return text
                        .toLowerCase()
                        .startsWith(searchText.toLowerCase());

                });

            }


            /* Eyebrow */

            const eyebrow = getOxfordCtaText(
                "your oxford adventure starts here"
            );

            if (eyebrow) {

                const element = document.querySelector(
                    ".wp-oxford-cta-eyebrow"
                );

                if (element) {
                    element.textContent = eyebrow;
                }

            }


            /* CTA Title */

            const title = getOxfordCtaText(
                "ready to explore oxford"
            );

            if (title) {

                const element = document.querySelector(
                    ".wp-oxford-cta-title"
                );

                if (element) {

                    element.innerHTML =
                        title.replace(
                            "Explore Oxford",
                            "<span>Explore Oxford</span>"
                        );

                }

            }


            /* CTA Description */

            const description = getOxfordCtaText(
                "from historic university colleges"
            );

            if (description) {

                const element = document.querySelector(
                    ".wp-oxford-cta-description"
                );

                if (element) {
                    element.textContent = description;
                }

            }


            /* Button 1 */

            const button1 = getOxfordCtaText(
                "explore attractions"
            );

            if (button1) {

                const element = document.querySelector(
                    ".wp-oxford-cta-button-1"
                );

                if (element) {

                    element.childNodes[0].textContent =
                        button1 + " ";

                }

            }


            /* Button 2 */

            const button2 = getOxfordCtaText(
                "read travel guide"
            );

            if (button2) {

                const element = document.querySelector(
                    ".wp-oxford-cta-button-2"
                );

                if (element) {

                    element.childNodes[0].textContent =
                        button2 + " ";

                }

            }


            console.log(
                "Oxford CTA updated from WordPress."
            );

        })

        .catch(function (error) {

            console.error(
                "Oxford CTA WordPress error:",
                error
            );

        });

}
/* =========================================================
   CAMBRIDGE WORDPRESS - HERO + INTRO + QUICK FACTS
   ========================================================= */

if (document.querySelector(".cambridge-hero")) {

    console.log("Cambridge WordPress integration started.");

    fetch("https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20")
        .then(response => response.json())
        .then(data => {

            const cambridgePage = data.posts.find(
                page => page.slug === "cambridge"
            );

            if (!cambridgePage) {
                console.log("Cambridge WordPress page not found.");
                return;
            }

            console.log("Cambridge WordPress page found:", cambridgePage);

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = cambridgePage.content;

            const cambridgeTexts = Array.from(
                tempDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6, strong")
            )
                .map(element => element.textContent.trim())
                .filter(text => text.length > 0);

            console.log(
                "Cambridge WordPress content:",
                cambridgeTexts
            );

            /* -------------------------
               Helper Function
               ------------------------- */

            function getCambridgeText(searchText) {

                return cambridgeTexts.find(text =>
                    text.toLowerCase() === searchText.toLowerCase()
                );

            }

            /* -------------------------
               HERO
               ------------------------- */

            const heroTitle = getCambridgeText("Explore Cambridge");

            const heroDescription = getCambridgeText(
                "Discover the elegant university city of Cambridge, from historic colleges and peaceful riverside walks to beautiful architecture, museums and traditional punting adventures."
            );

            if (heroTitle) {

                const titleElement = document.querySelector(
                    ".wp-cambridge-hero-title"
                );

                if (titleElement) {

                    titleElement.innerHTML =
                        heroTitle.replace(
                            "Cambridge",
                            "<span>Cambridge</span>"
                        );

                }

            }

            if (heroDescription) {

                const descriptionElement = document.querySelector(
                    ".wp-cambridge-hero-description"
                );

                if (descriptionElement) {
                    descriptionElement.textContent = heroDescription;
                }

            }

            /* -------------------------
               INTRODUCTION
               ------------------------- */

            const introTitle = getCambridgeText(
                "A City of Historic Colleges"
            );

            const introDescription1 = getCambridgeText(
                "Cambridge is one of England's most beautiful university cities, celebrated for its historic colleges, elegant architecture and centuries of academic tradition."
            );

            const introDescription2 = getCambridgeText(
                "Wander through atmospheric streets, explore magnificent college courtyards and enjoy peaceful walks along the River Cam."
            );

            const introDescription3 = getCambridgeText(
                "From world-class museums and historic libraries to traditional pubs, independent bookshops and riverside cafés, Cambridge offers plenty to discover."
            );

            if (introTitle) {

                const titleElement = document.querySelector(
                    ".wp-cambridge-intro-title"
                );

                if (titleElement) {

                    titleElement.innerHTML =
                        introTitle.replace(
                            "Historic Colleges",
                            "<span>Historic Colleges</span>"
                        );

                }

            }

            if (introDescription1) {

                const element = document.querySelector(
                    ".wp-cambridge-intro-description-1"
                );

                if (element) {
                    element.textContent = introDescription1;
                }

            }

            if (introDescription2) {

                const element = document.querySelector(
                    ".wp-cambridge-intro-description-2"
                );

                if (element) {
                    element.textContent = introDescription2;
                }

            }

            if (introDescription3) {

                const element = document.querySelector(
                    ".wp-cambridge-intro-description-3"
                );

                if (element) {
                    element.textContent = introDescription3;
                }

            }

            /* -------------------------
               QUICK FACTS
               ------------------------- */

            const location = getCambridgeText("East of England");
            const language = getCambridgeText("English");
            const currency = getCambridgeText("Pound Sterling (£)");
            const transport = getCambridgeText("Walking, Bus & Train");

            if (location) {

                const element = document.querySelector(
                    ".wp-cambridge-location"
                );

                if (element) {
                    element.textContent = location;
                }

            }

            if (language) {

                const element = document.querySelector(
                    ".wp-cambridge-language"
                );

                if (element) {
                    element.textContent = language;
                }

            }

            if (currency) {

                const element = document.querySelector(
                    ".wp-cambridge-currency"
                );

                if (element) {
                    element.textContent = currency;
                }

            }

            if (transport) {

                const element = document.querySelector(
                    ".wp-cambridge-transport"
                );

                if (element) {
                    element.textContent = transport;
                }

            }

            console.log(
                "Cambridge Hero, Introduction & Quick Facts updated from WordPress."
            );

        })
        .catch(error => {

            console.error(
                "Cambridge WordPress error:",
                error
            );

        });

}
/* =========================================================
   CAMBRIDGE WORDPRESS - TOP PLACES
   ========================================================= */

if (document.querySelector(".cambridge-places")) {

    console.log("Cambridge Top Places integration started.");

    fetch("https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20")
        .then(response => response.json())
        .then(data => {

            const cambridgePlacesPage = data.posts.find(
                page => page.slug === "cambridge"
            );

            if (!cambridgePlacesPage) {
                console.log("Cambridge WordPress page not found for Top Places.");
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = cambridgePlacesPage.content;

            const placeTexts = Array.from(
                tempDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6, strong")
            )
                .map(element => element.textContent.trim())
                .filter(text => text.length > 0);

            console.log(
                "Cambridge Top Places WordPress content:",
                placeTexts
            );

            function findPlaceText(searchText) {

                return placeTexts.find(text =>
                    text.toLowerCase() === searchText.toLowerCase()
                );

            }

            /* -----------------------------------------
               SECTION HEADING
            ----------------------------------------- */

            const eyebrow = findPlaceText("DISCOVER THE CITY");
            const sectionTitle = findPlaceText("Top Places to Visit");

            const sectionDescription = findPlaceText(
                "Explore Cambridge's historic colleges, beautiful architecture, fascinating museums and peaceful riverside surroundings."
            );

            if (eyebrow) {

                const element = document.querySelector(
                    ".wp-cambridge-places-eyebrow"
                );

                if (element) {
                    element.textContent = eyebrow;
                }

            }

            if (sectionTitle) {

                const element = document.querySelector(
                    ".wp-cambridge-places-title"
                );

                if (element) {

                    element.innerHTML =
                        sectionTitle.replace(
                            "Visit",
                            "<span>Visit</span>"
                        );

                }

            }

            if (sectionDescription) {

                const element = document.querySelector(
                    ".wp-cambridge-places-description"
                );

                if (element) {
                    element.textContent = sectionDescription;
                }

            }

            /* -----------------------------------------
               PLACE 1 - KING'S COLLEGE
            ----------------------------------------- */

            const place1Category = findPlaceText("COLLEGE");
            const place1Name = findPlaceText("King's College");

            const place1Description = findPlaceText(
                "Admire one of Cambridge's most recognisable landmarks and its magnificent Gothic chapel overlooking King's Parade."
            );

            if (place1Category) {

                const element = document.querySelector(
                    ".wp-cambridge-place-category-1"
                );

                if (element) element.textContent = place1Category;

            }

            if (place1Name) {

                const element = document.querySelector(
                    ".wp-cambridge-place-name-1"
                );

                if (element) element.textContent = place1Name;

            }

            if (place1Description) {

                const element = document.querySelector(
                    ".wp-cambridge-place-description-1"
                );

                if (element) element.textContent = place1Description;

            }

            /* -----------------------------------------
               PLACE 2 - TRINITY COLLEGE
            ----------------------------------------- */

            const place2Category = findPlaceText("HISTORY");
            const place2Name = findPlaceText("Trinity College");

            const place2Description = findPlaceText(
                "Discover one of Cambridge's most prestigious colleges and admire its historic courtyards and impressive architecture."
            );

            if (place2Category) {

                const element = document.querySelector(
                    ".wp-cambridge-place-category-2"
                );

                if (element) element.textContent = place2Category;

            }

            if (place2Name) {

                const element = document.querySelector(
                    ".wp-cambridge-place-name-2"
                );

                if (element) element.textContent = place2Name;

            }

            if (place2Description) {

                const element = document.querySelector(
                    ".wp-cambridge-place-description-2"
                );

                if (element) element.textContent = place2Description;

            }

            /* -----------------------------------------
               PLACE 3 - BRIDGE OF SIGHS
            ----------------------------------------- */

            const place3Category = findPlaceText("LANDMARK");
            const place3Name = findPlaceText("Bridge of Sighs");

            const place3Description = findPlaceText(
                "See this elegant covered bridge spanning the River Cam and admire one of Cambridge's most photographed landmarks."
            );

            if (place3Category) {

                const element = document.querySelector(
                    ".wp-cambridge-place-category-3"
                );

                if (element) element.textContent = place3Category;

            }

            if (place3Name) {

                const element = document.querySelector(
                    ".wp-cambridge-place-name-3"
                );

                if (element) element.textContent = place3Name;

            }

            if (place3Description) {

                const element = document.querySelector(
                    ".wp-cambridge-place-description-3"
                );

                if (element) element.textContent = place3Description;

            }

            /* -----------------------------------------
               PLACE 4 - FITZWILLIAM MUSEUM
            ----------------------------------------- */

            const place4Category = findPlaceText("CULTURE");
            const place4Name = findPlaceText("Fitzwilliam Museum");

            const place4Description = findPlaceText(
                "Explore remarkable collections of art, antiquities and decorative pieces in one of Cambridge's leading museums."
            );

            if (place4Category) {

                const element = document.querySelector(
                    ".wp-cambridge-place-category-4"
                );

                if (element) element.textContent = place4Category;

            }

            if (place4Name) {

                const element = document.querySelector(
                    ".wp-cambridge-place-name-4"
                );

                if (element) element.textContent = place4Name;

            }

            if (place4Description) {

                const element = document.querySelector(
                    ".wp-cambridge-place-description-4"
                );

                if (element) element.textContent = place4Description;

            }

            /* -----------------------------------------
               PLACE 5 - MATHEMATICAL BRIDGE
            ----------------------------------------- */

            const place5Category = findPlaceText("ARCHITECTURE");
            const place5Name = findPlaceText("Mathematical Bridge");

            const place5Description = findPlaceText(
                "Visit this distinctive wooden bridge at Queens' College and enjoy views along the River Cam."
            );

            if (place5Category) {

                const element = document.querySelector(
                    ".wp-cambridge-place-category-5"
                );

                if (element) element.textContent = place5Category;

            }

            if (place5Name) {

                const element = document.querySelector(
                    ".wp-cambridge-place-name-5"
                );

                if (element) element.textContent = place5Name;

            }

            if (place5Description) {

                const element = document.querySelector(
                    ".wp-cambridge-place-description-5"
                );

                if (element) element.textContent = place5Description;

            }

            /* -----------------------------------------
               PLACE 6 - BOTANIC GARDEN
            ----------------------------------------- */

            const place6Category = findPlaceText("OUTDOORS");
            const place6Name = findPlaceText(
                "Cambridge Botanic Garden"
            );

            const place6Description = findPlaceText(
                "Escape the busy city streets and discover beautiful plant collections, gardens and peaceful walking paths."
            );

            if (place6Category) {

                const element = document.querySelector(
                    ".wp-cambridge-place-category-6"
                );

                if (element) element.textContent = place6Category;

            }

            if (place6Name) {

                const element = document.querySelector(
                    ".wp-cambridge-place-name-6"
                );

                if (element) element.textContent = place6Name;

            }

            if (place6Description) {

                const element = document.querySelector(
                    ".wp-cambridge-place-description-6"
                );

                if (element) element.textContent = place6Description;

            }

            console.log(
                "Cambridge Top Places updated from WordPress."
            );

        })
        .catch(error => {

            console.error(
                "Cambridge Top Places WordPress error:",
                error
            );

        });

}
/* =========================================================
   CAMBRIDGE WORDPRESS - THINGS TO DO
   ========================================================= */

if (document.querySelector(".cambridge-things")) {

    console.log("Cambridge Things To Do integration started.");

    fetch("https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20")
        .then(response => response.json())
        .then(data => {

            const cambridgeThingsPage = data.posts.find(
                page => page.slug === "cambridge"
            );

            if (!cambridgeThingsPage) {
                console.log("Cambridge WordPress page not found for Things To Do.");
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = cambridgeThingsPage.content;

            const thingTexts = Array.from(
                tempDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6, strong")
            )
                .map(element => element.textContent.trim())
                .filter(text => text.length > 0);

            console.log(
                "Cambridge Things To Do WordPress content:",
                thingTexts
            );

            function findCambridgeThingText(searchText) {

                return thingTexts.find(text =>
                    text.toLowerCase() === searchText.toLowerCase()
                );

            }

            /* -----------------------------------------
               SECTION HEADING
            ----------------------------------------- */

            const eyebrow = findCambridgeThingText(
                "EXPERIENCE CAMBRIDGE"
            );

            const sectionTitle = findCambridgeThingText(
                "Things To Do"
            );

            const sectionDescription = findCambridgeThingText(
                "Experience Cambridge through punting, historic colleges, peaceful gardens, museums, riverside walks and charming city streets."
            );

            if (eyebrow) {

                const element = document.querySelector(
                    ".wp-cambridge-things-eyebrow"
                );

                if (element) {
                    element.textContent = eyebrow;
                }

            }

            if (sectionTitle) {

                const element = document.querySelector(
                    ".wp-cambridge-things-title"
                );

                if (element) {

                    element.innerHTML =
                        sectionTitle.replace(
                            "Do",
                            "<span>Do</span>"
                        );

                }

            }

            if (sectionDescription) {

                const element = document.querySelector(
                    ".wp-cambridge-things-description"
                );

                if (element) {
                    element.textContent = sectionDescription;
                }

            }

            /* -----------------------------------------
               THING 1 - GO PUNTING
            ----------------------------------------- */

            const thing1Title = findCambridgeThingText(
                "Go Punting"
            );

            const thing1Description = findCambridgeThingText(
                "Glide along the River Cam and enjoy beautiful views of historic colleges, bridges and riverside gardens."
            );

            if (thing1Title) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-title-1"
                );

                if (element) {
                    element.textContent = thing1Title;
                }

            }

            if (thing1Description) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-description-1"
                );

                if (element) {
                    element.textContent = thing1Description;
                }

            }

            /* -----------------------------------------
               THING 2 - HISTORIC COLLEGES
            ----------------------------------------- */

            const thing2Title = findCambridgeThingText(
                "Explore Historic Colleges"
            );

            const thing2Description = findCambridgeThingText(
                "Discover Cambridge's famous colleges, magnificent courtyards, chapels and centuries of academic history."
            );

            if (thing2Title) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-title-2"
                );

                if (element) {
                    element.textContent = thing2Title;
                }

            }

            if (thing2Description) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-description-2"
                );

                if (element) {
                    element.textContent = thing2Description;
                }

            }

            /* -----------------------------------------
               THING 3 - MUSEUMS
            ----------------------------------------- */

            const thing3Title = findCambridgeThingText(
                "Visit Museums"
            );

            const thing3Description = findCambridgeThingText(
                "Explore fascinating collections covering art, science, archaeology and the history of Cambridge."
            );

            if (thing3Title) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-title-3"
                );

                if (element) {
                    element.textContent = thing3Title;
                }

            }

            if (thing3Description) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-description-3"
                );

                if (element) {
                    element.textContent = thing3Description;
                }

            }

            /* -----------------------------------------
               THING 4 - WALKING TOUR
            ----------------------------------------- */

            const thing4Title = findCambridgeThingText(
                "Take a Walking Tour"
            );

            const thing4Description = findCambridgeThingText(
                "Wander through historic streets and discover the stories behind Cambridge's famous buildings and colleges."
            );

            if (thing4Title) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-title-4"
                );

                if (element) {
                    element.textContent = thing4Title;
                }

            }

            if (thing4Description) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-description-4"
                );

                if (element) {
                    element.textContent = thing4Description;
                }

            }

            /* -----------------------------------------
               THING 5 - BOTANIC GARDEN
            ----------------------------------------- */

            const thing5Title = findCambridgeThingText(
                "Visit the Botanic Garden"
            );

            const thing5Description = findCambridgeThingText(
                "Enjoy beautiful plant collections, seasonal flowers and peaceful paths away from the busy city centre."
            );

            if (thing5Title) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-title-5"
                );

                if (element) {
                    element.textContent = thing5Title;
                }

            }

            if (thing5Description) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-description-5"
                );

                if (element) {
                    element.textContent = thing5Description;
                }

            }

            /* -----------------------------------------
               THING 6 - LOCAL CAFÉS
            ----------------------------------------- */

            const thing6Title = findCambridgeThingText(
                "Enjoy Local Cafés"
            );

            const thing6Description = findCambridgeThingText(
                "Take a break at cosy cafés, traditional pubs and independent restaurants around the historic centre."
            );

            if (thing6Title) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-title-6"
                );

                if (element) {
                    element.textContent = thing6Title;
                }

            }

            if (thing6Description) {

                const element = document.querySelector(
                    ".wp-cambridge-thing-description-6"
                );

                if (element) {
                    element.textContent = thing6Description;
                }

            }

            console.log(
                "Cambridge Things To Do updated from WordPress."
            );

        })
        .catch(error => {

            console.error(
                "Cambridge Things To Do WordPress error:",
                error
            );

        });

}
/* ==========================================
   CAMBRIDGE - GETTING AROUND WORDPRESS
========================================== */

(async function () {
    /* Run Cambridge code only on Cambridge page */ if (!document.querySelector(".cambridge-hero")) { return; }

    console.log("Cambridge Getting Around integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        const data = await response.json();

        const cambridgePage = data.posts.find(
            page => page.slug === "cambridge"
        );

        if (!cambridgePage) {
            console.warn("Cambridge WordPress page not found.");
            return;
        }

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cambridgePage.content;


        /* ==========================================
           GETTING AROUND SECTION KO ALAG SE FIND KARNA
        ========================================== */

        const allElements = Array.from(
            tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, strong")
        );

        const gettingStartIndex = allElements.findIndex(
            element =>
                element.textContent.trim().toUpperCase() === "GETTING AROUND"
        );

        if (gettingStartIndex === -1) {

            console.warn(
                "Cambridge Getting Around content not found in WordPress."
            );

            return;
        }


        /* ==========================================
           SIRF GETTING AROUND KA CONTENT LO
        ========================================== */

        const gettingItems = allElements
            .slice(gettingStartIndex)
            .map(element => element.textContent.trim())
            .filter(text => text !== "");


        console.log(
            "Cambridge Getting Around WordPress content:",
            gettingItems
        );


        /* ==========================================
           MAIN CONTENT
        ========================================== */

        const gettingEyebrow =
            document.querySelector(".wp-cambridge-getting-eyebrow");

        const gettingTitle =
            document.querySelector(".wp-cambridge-getting-title");

        const gettingDescription1 =
            document.querySelector(".wp-cambridge-getting-description-1");

        const gettingDescription2 =
            document.querySelector(".wp-cambridge-getting-description-2");

        const gettingTipTitle =
            document.querySelector(".wp-cambridge-getting-tip-title");

        const gettingTipDescription =
            document.querySelector(".wp-cambridge-getting-tip-description");


        /* ==========================================
           UPDATE MAIN CONTENT
        ========================================== */

        if (gettingEyebrow && gettingItems[0]) {
            gettingEyebrow.textContent = gettingItems[0];
        }

        if (gettingTitle && gettingItems[1]) {
            gettingTitle.textContent = gettingItems[1];
        }

        if (gettingDescription1 && gettingItems[2]) {
            gettingDescription1.textContent = gettingItems[2];
        }

        if (gettingDescription2 && gettingItems[3]) {
            gettingDescription2.textContent = gettingItems[3];
        }

        if (gettingTipTitle && gettingItems[4]) {
            gettingTipTitle.textContent = gettingItems[4];
        }

        if (gettingTipDescription && gettingItems[5]) {
            gettingTipDescription.textContent = gettingItems[5];
        }


        /* ==========================================
           TRANSPORT OPTIONS
        ========================================== */

        const transportTitles = [
            document.querySelector(".wp-cambridge-transport-title-1"),
            document.querySelector(".wp-cambridge-transport-title-2"),
            document.querySelector(".wp-cambridge-transport-title-3"),
            document.querySelector(".wp-cambridge-transport-title-4")
        ];

        const transportDescriptions = [
            document.querySelector(".wp-cambridge-transport-description-1"),
            document.querySelector(".wp-cambridge-transport-description-2"),
            document.querySelector(".wp-cambridge-transport-description-3"),
            document.querySelector(".wp-cambridge-transport-description-4")
        ];


        /* ==========================================
           WALKING
        ========================================== */

        if (transportTitles[0] && gettingItems[6]) {
            transportTitles[0].textContent = gettingItems[6];
        }

        if (transportDescriptions[0] && gettingItems[7]) {
            transportDescriptions[0].textContent = gettingItems[7];
        }


        /* ==========================================
           CYCLING
        ========================================== */

        if (transportTitles[1] && gettingItems[8]) {
            transportTitles[1].textContent = gettingItems[8];
        }

        if (transportDescriptions[1] && gettingItems[9]) {
            transportDescriptions[1].textContent = gettingItems[9];
        }


        /* ==========================================
           CITY BUS
        ========================================== */

        if (transportTitles[2] && gettingItems[10]) {
            transportTitles[2].textContent = gettingItems[10];
        }

        if (transportDescriptions[2] && gettingItems[11]) {
            transportDescriptions[2].textContent = gettingItems[11];
        }


        /* ==========================================
           TRAIN
        ========================================== */

        if (transportTitles[3] && gettingItems[12]) {
            transportTitles[3].textContent = gettingItems[12];
        }

        if (transportDescriptions[3] && gettingItems[13]) {
            transportDescriptions[3].textContent = gettingItems[13];
        }


        console.log(
            "Cambridge Getting Around updated from WordPress."
        );

    } catch (error) {

        console.error(
            "Cambridge Getting Around WordPress error:",
            error
        );

    }

})();
/* ==========================================
   CAMBRIDGE - BEST TIME WORDPRESS
========================================== */

(async function () {

    /* Run only on Cambridge page */

    if (!document.querySelector(".cambridge-hero")) {
        return;
    }

    console.log("Cambridge Best Time integration started.");



    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        const data = await response.json();

        const cambridgePage = data.posts.find(
            page => page.slug === "cambridge"
        );

        if (!cambridgePage) {
            console.warn("Cambridge WordPress page not found.");
            return;
        }

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cambridgePage.content;


        /* ==========================================
           FIND BEST TIME SECTION
        ========================================== */

        const allElements = Array.from(
            tempDiv.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, p, span, strong"
            )
        );

        const bestStartIndex = allElements.findIndex(
            element =>
                element.textContent.trim().toUpperCase() ===
                "PLAN YOUR VISIT"
        );

        if (bestStartIndex === -1) {

            console.warn(
                "Cambridge Best Time content not found in WordPress."
            );

            return;
        }


        /* ==========================================
           GET ONLY BEST TIME CONTENT
        ========================================== */

        const bestItems = allElements
            .slice(bestStartIndex)
            .map(element => element.textContent.trim())
            .filter(text => text !== "");


        console.log(
            "Cambridge Best Time WordPress content:",
            bestItems
        );


        /* ==========================================
           MAIN SECTION
        ========================================== */

        const bestEyebrow =
            document.querySelector(
                ".wp-cambridge-best-eyebrow"
            );

        const bestTitle =
            document.querySelector(
                ".wp-cambridge-best-title"
            );

        const bestDescription =
            document.querySelector(
                ".wp-cambridge-best-description"
            );


        if (bestEyebrow && bestItems[0]) {
            bestEyebrow.textContent = bestItems[0];
        }

        if (bestTitle && bestItems[1]) {
            bestTitle.textContent = bestItems[1];
        }

        if (bestDescription && bestItems[2]) {
            bestDescription.textContent = bestItems[2];
        }


        /* ==========================================
           SPRING
        ========================================== */

        const springMonths =
            document.querySelector(
                ".wp-cambridge-season-months-1"
            );

        const springTitle =
            document.querySelector(
                ".wp-cambridge-season-title-1"
            );

        const springDescription =
            document.querySelector(
                ".wp-cambridge-season-description-1"
            );


        if (springMonths && bestItems[3]) {
            springMonths.textContent = bestItems[3];
        }

        if (springTitle && bestItems[4]) {
            springTitle.textContent = bestItems[4];
        }

        if (springDescription && bestItems[5]) {
            springDescription.textContent = bestItems[5];
        }


        /* ==========================================
           SUMMER
        ========================================== */

        const summerMonths =
            document.querySelector(
                ".wp-cambridge-season-months-2"
            );

        const summerTitle =
            document.querySelector(
                ".wp-cambridge-season-title-2"
            );

        const summerDescription =
            document.querySelector(
                ".wp-cambridge-season-description-2"
            );

        const summerBadge =
            document.querySelector(
                ".wp-cambridge-season-badge-2"
            );


        if (summerMonths && bestItems[6]) {
            summerMonths.textContent = bestItems[6];
        }

        if (summerTitle && bestItems[7]) {
            summerTitle.textContent = bestItems[7];
        }

        if (summerDescription && bestItems[8]) {
            summerDescription.textContent = bestItems[8];
        }

        if (summerBadge && bestItems[9]) {
            summerBadge.textContent = bestItems[9];
        }


        /* ==========================================
           AUTUMN
        ========================================== */

        const autumnMonths =
            document.querySelector(
                ".wp-cambridge-season-months-3"
            );

        const autumnTitle =
            document.querySelector(
                ".wp-cambridge-season-title-3"
            );

        const autumnDescription =
            document.querySelector(
                ".wp-cambridge-season-description-3"
            );


        if (autumnMonths && bestItems[10]) {
            autumnMonths.textContent = bestItems[10];
        }

        if (autumnTitle && bestItems[11]) {
            autumnTitle.textContent = bestItems[11];
        }

        if (autumnDescription && bestItems[12]) {
            autumnDescription.textContent = bestItems[12];
        }


        /* ==========================================
           WINTER
        ========================================== */

        const winterMonths =
            document.querySelector(
                ".wp-cambridge-season-months-4"
            );

        const winterTitle =
            document.querySelector(
                ".wp-cambridge-season-title-4"
            );

        const winterDescription =
            document.querySelector(
                ".wp-cambridge-season-description-4"
            );


        if (winterMonths && bestItems[13]) {
            winterMonths.textContent = bestItems[13];
        }

        if (winterTitle && bestItems[14]) {
            winterTitle.textContent = bestItems[14];
        }

        if (winterDescription && bestItems[15]) {
            winterDescription.textContent = bestItems[15];
        }


        console.log(
            "Cambridge Best Time updated from WordPress."
        );

    } catch (error) {

        console.error(
            "Cambridge Best Time WordPress error:",
            error
        );

    }

})();
/* ==========================================
   CAMBRIDGE - TRAVEL TIPS WORDPRESS
========================================== */

(async function () {

/* Run only on Cambridge page */

if (!document.querySelector(".cambridge-hero")) {
    return;
}

console.log("Cambridge Travel Tips integration started.");


    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        const data = await response.json();

        const cambridgePage = data.posts.find(
            page => page.slug === "cambridge"
        );

        if (!cambridgePage) {
            console.warn("Cambridge WordPress page not found.");
            return;
        }

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cambridgePage.content;


        /* ==========================================
           FIND TRAVEL TIPS SECTION
        ========================================== */

        const allElements = Array.from(
            tempDiv.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, p, span, strong"
            )
        );

        const tipsStartIndex = allElements.findIndex(
            element =>
                element.textContent.trim().toUpperCase() ===
                "TRAVEL SMART"
        );

        if (tipsStartIndex === -1) {

            console.warn(
                "Cambridge Travel Tips content not found in WordPress."
            );

            return;
        }


        /* ==========================================
           ONLY TRAVEL TIPS CONTENT
        ========================================== */

        const tipsItems = allElements
            .slice(tipsStartIndex)
            .map(element => element.textContent.trim())
            .filter(text => text !== "");


        console.log(
            "Cambridge Travel Tips WordPress content:",
            tipsItems
        );


        /* ==========================================
           MAIN SECTION
        ========================================== */

        const tipsEyebrow =
            document.querySelector(
                ".wp-cambridge-tips-eyebrow"
            );

        const tipsTitle =
            document.querySelector(
                ".wp-cambridge-tips-title"
            );

        const tipsDescription =
            document.querySelector(
                ".wp-cambridge-tips-description"
            );


        if (tipsEyebrow && tipsItems[0]) {
            tipsEyebrow.textContent = tipsItems[0];
        }

        if (tipsTitle && tipsItems[1]) {
            tipsTitle.textContent = tipsItems[1];
        }

        if (tipsDescription && tipsItems[2]) {
            tipsDescription.textContent = tipsItems[2];
        }


        /* ==========================================
           TRAVEL TIP CARDS
        ========================================== */

        const tipTitles = [
            document.querySelector(".wp-cambridge-tip-title-1"),
            document.querySelector(".wp-cambridge-tip-title-2"),
            document.querySelector(".wp-cambridge-tip-title-3"),
            document.querySelector(".wp-cambridge-tip-title-4"),
            document.querySelector(".wp-cambridge-tip-title-5"),
            document.querySelector(".wp-cambridge-tip-title-6")
        ];

        const tipDescriptions = [
            document.querySelector(".wp-cambridge-tip-description-1"),
            document.querySelector(".wp-cambridge-tip-description-2"),
            document.querySelector(".wp-cambridge-tip-description-3"),
            document.querySelector(".wp-cambridge-tip-description-4"),
            document.querySelector(".wp-cambridge-tip-description-5"),
            document.querySelector(".wp-cambridge-tip-description-6")
        ];


        /* ==========================================
           UPDATE ALL 6 TIPS
        ========================================== */

        for (let i = 0; i < 6; i++) {

            const titleIndex = 3 + (i * 2);
            const descriptionIndex = 4 + (i * 2);

            if (tipTitles[i] && tipsItems[titleIndex]) {
                tipTitles[i].textContent = tipsItems[titleIndex];
            }

            if (
                tipDescriptions[i] &&
                tipsItems[descriptionIndex]
            ) {
                tipDescriptions[i].textContent =
                    tipsItems[descriptionIndex];
            }

        }


        console.log(
            "Cambridge Travel Tips updated from WordPress."
        );

    } catch (error) {

        console.error(
            "Cambridge Travel Tips WordPress error:",
            error
        );

    }

})();
/* ==========================================
   CAMBRIDGE - FAQ WORDPRESS
========================================== */

(async function () {

 /* Run only on Cambridge page */

if (!document.querySelector(".cambridge-hero")) {
return;
}

console.log("Cambridge FAQ integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        const data = await response.json();

        const cambridgePage = data.posts.find(
            page => page.slug === "cambridge"
        );

        if (!cambridgePage) {
            console.warn("Cambridge WordPress page not found.");
            return;
        }


        /* ==========================================
           READ WORDPRESS CONTENT
        ========================================== */

        const tempDiv = document.createElement("div");

        tempDiv.innerHTML = cambridgePage.content;


        const allElements = Array.from(
            tempDiv.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, p, span, strong"
            )
        );


        /* ==========================================
           FIND FAQ SECTION
        ========================================== */

        const faqStartIndex = allElements.findIndex(
            element =>
                element.textContent.trim().toUpperCase() ===
                "HAVE QUESTIONS?"
        );


        if (faqStartIndex === -1) {

            console.warn(
                "Cambridge FAQ content not found in WordPress."
            );

            return;
        }


        /* ==========================================
           GET FAQ CONTENT
        ========================================== */

        const faqItems = allElements
            .slice(faqStartIndex)
            .map(element => element.textContent.trim())
            .filter(text => text !== "");


        console.log(
            "Cambridge FAQ WordPress content:",
            faqItems
        );


        /* ==========================================
           MAIN FAQ HEADING
        ========================================== */

        const faqEyebrow =
            document.querySelector(
                ".wp-cambridge-faq-eyebrow"
            );

        const faqTitle =
            document.querySelector(
                ".wp-cambridge-faq-title"
            );

        const faqDescription =
            document.querySelector(
                ".wp-cambridge-faq-description"
            );


        if (faqEyebrow && faqItems[0]) {
            faqEyebrow.textContent = faqItems[0];
        }

        if (faqTitle && faqItems[1]) {
            faqTitle.textContent = faqItems[1];
        }

        if (faqDescription && faqItems[2]) {
            faqDescription.textContent = faqItems[2];
        }


        /* ==========================================
           FAQ QUESTIONS & ANSWERS
        ========================================== */

        const faqQuestions = [
            document.querySelector(".wp-cambridge-faq-question-1"),
            document.querySelector(".wp-cambridge-faq-question-2"),
            document.querySelector(".wp-cambridge-faq-question-3"),
            document.querySelector(".wp-cambridge-faq-question-4"),
            document.querySelector(".wp-cambridge-faq-question-5"),
            document.querySelector(".wp-cambridge-faq-question-6")
        ];


        const faqAnswers = [
            document.querySelector(".wp-cambridge-faq-answer-1"),
            document.querySelector(".wp-cambridge-faq-answer-2"),
            document.querySelector(".wp-cambridge-faq-answer-3"),
            document.querySelector(".wp-cambridge-faq-answer-4"),
            document.querySelector(".wp-cambridge-faq-answer-5"),
            document.querySelector(".wp-cambridge-faq-answer-6")
        ];


        /* ==========================================
           UPDATE 6 FAQS
        ========================================== */

        for (let i = 0; i < 6; i++) {

            const questionIndex = 3 + (i * 2);

            const answerIndex = 4 + (i * 2);


            if (
                faqQuestions[i] &&
                faqItems[questionIndex]
            ) {
                faqQuestions[i].textContent =
                    faqItems[questionIndex];
            }


            if (
                faqAnswers[i] &&
                faqItems[answerIndex]
            ) {
                faqAnswers[i].textContent =
                    faqItems[answerIndex];
            }

        }


        console.log(
            "Cambridge FAQ updated from WordPress."
        );


    } catch (error) {

        console.error(
            "Cambridge FAQ WordPress error:",
            error
        );

    }

})();
/* ==========================================
   CAMBRIDGE - FAQ ACCORDION FINAL FIX
========================================== */

(function () {

/* Run only on Cambridge page */

if (!document.querySelector(".cambridge-hero")) {
    return;
}

console.log("Cambridge FAQ final accordion started.");

const faqSection = document.querySelector(
    ".cambridge-faq"
);
    if (!faqSection) {
        console.warn(
            "Cambridge FAQ section not found."
        );
        return;
    }


    faqSection.addEventListener("click", function (event) {

        const question = event.target.closest(
            ".faq-question"
        );

        if (!question) {
            return;
        }


        event.preventDefault();
        event.stopPropagation();


        const currentItem =
            question.closest(".faq-item");

        if (!currentItem) {
            return;
        }


        const currentAnswer =
            currentItem.querySelector(".faq-answer");

        const currentIcon =
            question.querySelector("i");


        if (!currentAnswer) {
            return;
        }


        const isOpen =
            currentItem.classList.contains("active");


        /* ==========================================
           CLOSE ALL FAQS
        ========================================== */

        faqSection
            .querySelectorAll(".faq-item")
            .forEach(function (item) {

                item.classList.remove("active");

                const answer =
                    item.querySelector(".faq-answer");

                const icon =
                    item.querySelector(".faq-question i");


                if (answer) {

                    answer.style.maxHeight = "0px";
                    answer.style.display = "block";

                }


                if (icon) {

                    icon.classList.remove("fa-minus");
                    icon.classList.add("fa-plus");

                }

            });


        /* ==========================================
           OPEN CLICKED FAQ
        ========================================== */

        if (!isOpen) {

            currentItem.classList.add("active");

            currentAnswer.style.display = "block";

            currentAnswer.style.maxHeight =
                currentAnswer.scrollHeight + "px";


            if (currentIcon) {

                currentIcon.classList.remove(
                    "fa-plus"
                );

                currentIcon.classList.add(
                    "fa-minus"
                );

            }

        }

    });


    console.log(
        "Cambridge FAQ final accordion ready."
    );

})();
/* ==========================================
   CAMBRIDGE - CTA WORDPRESS INTEGRATION
========================================== */

(function () {
    /* Run only on Cambridge page */ if (!document.querySelector(".cambridge-hero")) { return; }

    console.log("Cambridge CTA integration started.");

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const pages = data.posts || [];

            const cambridgePage = pages.find(function (page) {
                return page.slug === "cambridge";
            });

            if (!cambridgePage) {
                console.warn("Cambridge page not found for CTA.");
                return;
            }

            const tempDiv = document.createElement("div");

            tempDiv.innerHTML = cambridgePage.content;

            const content = Array.from(
                tempDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a")
            )
                .map(function (element) {
                    return element.textContent.trim();
                })
                .filter(function (text) {
                    return text !== "";
                });


            /* FIND CTA SECTION */

            const ctaIndex = content.findIndex(function (text) {
                return text === "YOUR CAMBRIDGE ADVENTURE STARTS HERE";
            });

            if (ctaIndex === -1) {
                console.warn("Cambridge CTA content not found.");
                return;
            }


            /* CTA ELEMENTS */

            const eyebrow = document.querySelector(
                ".wp-cambridge-cta-eyebrow"
            );

            const title = document.querySelector(
                ".wp-cambridge-cta-title"
            );

            const description = document.querySelector(
                ".wp-cambridge-cta-description"
            );

            const button1 = document.querySelector(
                ".wp-cambridge-cta-button-1"
            );

            const button2 = document.querySelector(
                ".wp-cambridge-cta-button-2"
            );


            /* UPDATE CTA */

            if (eyebrow && content[ctaIndex]) {
                eyebrow.textContent = content[ctaIndex];
            }

            if (title && content[ctaIndex + 1]) {

                title.innerHTML =
                    content[ctaIndex + 1].replace(
                        "Explore Cambridge?",
                        "<span>Explore Cambridge?</span>"
                    );

            }

            if (description && content[ctaIndex + 2]) {
                description.textContent =
                    content[ctaIndex + 2];
            }

            if (button1 && content[ctaIndex + 3]) {

                button1.innerHTML =
                    content[ctaIndex + 3] +
                    ' <i class="fa-solid fa-arrow-right"></i>';

            }

            if (button2 && content[ctaIndex + 4]) {

                button2.innerHTML =
                    content[ctaIndex + 4] +
                    ' <i class="fa-solid fa-book-open"></i>';

            }


            console.log(
                "Cambridge CTA updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Cambridge CTA WordPress error:",
                error
            );

        });

})();

/* ==========================================
   BATH - HERO + INTRODUCTION + QUICK FACTS
   WORDPRESS INTEGRATION
========================================== */

(function () {
    /* Run only on Bath page */

    if (!document.querySelector(".bath-hero")) {
        return;
    }

    console.log("Bath WordPress integration started.");

    fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const pages = data.posts || [];

            const bathPage = pages.find(function (page) {
                return page.slug === "bath";
            });

            if (!bathPage) {
                console.warn("Bath WordPress page not found.");
                return;
            }

            console.log("Bath WordPress page found:", bathPage);

            const tempDiv = document.createElement("div");

            tempDiv.innerHTML = bathPage.content;

            const content = Array.from(
                tempDiv.querySelectorAll(
                    "p, h1, h2, h3, h4, h5, h6, span, strong"
                )
            )
                .map(function (element) {
                    return element.textContent.trim();
                })
                .filter(function (text) {
                    return text !== "";
                });

            console.log("Bath WordPress content:", content);


            /* ==========================================
               FIND MAIN SECTIONS
            ========================================== */

            const heroIndex = content.findIndex(function (text) {
                return text === "SOUTH WEST ENGLAND • UNITED KINGDOM";
            });

            const introIndex = content.findIndex(function (text) {
                return text === "DISCOVER BATH";
            });


            /* ==========================================
               HERO
            ========================================== */

            if (heroIndex !== -1) {

                const heroEyebrow =
                    document.querySelector(
                        ".wp-bath-hero-eyebrow"
                    );

                const heroTitle =
                    document.querySelector(
                        ".wp-bath-hero-title"
                    );

                const heroDescription =
                    document.querySelector(
                        ".wp-bath-hero-description"
                    );


                if (heroEyebrow && content[heroIndex]) {

                    heroEyebrow.textContent =
                        content[heroIndex];

                }


             
if (heroTitle && content[heroIndex + 1]) {

    let bathCambridgeTitle =
        content[heroIndex + 1].trim();

    /* Remove "Explore " if WordPress title contains it */
    bathCambridgeTitle =
        bathCambridgeTitle.replace(
            /^Explore\s+/i,
            ""
        );

    heroTitle.textContent =
        bathCambridgeTitle;

}




                if (
                    heroDescription &&
                    content[heroIndex + 2]
                ) {

                    heroDescription.textContent =
                        content[heroIndex + 2];

                }

            }


            /* ==========================================
               INTRODUCTION
            ========================================== */

            if (introIndex !== -1) {

                const introEyebrow =
                    document.querySelector(
                        ".wp-bath-intro-eyebrow"
                    );

                const introTitle =
                    document.querySelector(
                        ".wp-bath-intro-title"
                    );

                const introDescription1 =
                    document.querySelector(
                        ".wp-bath-intro-description-1"
                    );

                const introDescription2 =
                    document.querySelector(
                        ".wp-bath-intro-description-2"
                    );

                const introDescription3 =
                    document.querySelector(
                        ".wp-bath-intro-description-3"
                    );


                if (
                    introEyebrow &&
                    content[introIndex]
                ) {

                    introEyebrow.textContent =
                        content[introIndex];

                }


                if (
                    introTitle &&
                    content[introIndex + 1]
                ) {

                    introTitle.textContent =
                        content[introIndex + 1];

                }


                if (
                    introDescription1 &&
                    content[introIndex + 2]
                ) {

                    introDescription1.textContent =
                        content[introIndex + 2];

                }


                if (
                    introDescription2 &&
                    content[introIndex + 3]
                ) {

                    introDescription2.textContent =
                        content[introIndex + 3];

                }


                if (
                    introDescription3 &&
                    content[introIndex + 4]
                ) {

                    introDescription3.textContent =
                        content[introIndex + 4];

                }

            }


            /* ==========================================
               QUICK FACTS
            ========================================== */

            const location =
                document.querySelector(
                    ".wp-bath-location"
                );

            const language =
                document.querySelector(
                    ".wp-bath-language"
                );

            const currency =
                document.querySelector(
                    ".wp-bath-currency"
                );

            const transport =
                document.querySelector(
                    ".wp-bath-transport"
                );


            const locationIndex =
                content.findIndex(function (text) {
                    return text === "LOCATION";
                });


            if (
                location &&
                locationIndex !== -1 &&
                content[locationIndex + 1]
            ) {

                location.textContent =
                    content[locationIndex + 1];

            }


            const languageIndex =
                content.findIndex(function (text) {
                    return text === "LANGUAGE";
                });


            if (
                language &&
                languageIndex !== -1 &&
                content[languageIndex + 1]
            ) {

                language.textContent =
                    content[languageIndex + 1];

            }


            const currencyIndex =
                content.findIndex(function (text) {
                    return text === "CURRENCY";
                });


            if (
                currency &&
                currencyIndex !== -1 &&
                content[currencyIndex + 1]
            ) {

                currency.textContent =
                    content[currencyIndex + 1];

            }


            const transportIndex =
                content.findIndex(function (text) {
                    return text === "GETTING AROUND"
                });


            if (
                transport &&
                transportIndex !== -1 &&
                content[transportIndex + 1]
            ) {

                transport.textContent =
                    content[transportIndex + 1];

            }


            console.log(
                "Bath Hero, Introduction & Quick Facts updated from WordPress."
            );

        })
        .catch(function (error) {

            console.error(
                "Bath WordPress integration error:",
                error
            );

        });

})();
/* ==========================================
BATH - TOP PLACES WORDPRESS
========================================== */

(async function () {

/* Run only on Bath page */

if (!document.querySelector(".bath-hero")) {
    return;
}

console.log("Bath Top Places integration started.");

try {

    const response = await fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    );

    const data = await response.json();

    const bathPage = data.posts.find(
        page => page.slug === "bath"
    );

    if (!bathPage) {
        console.warn("Bath WordPress page not found.");
        return;
    }

    const tempDiv = document.createElement("div");

    tempDiv.innerHTML = bathPage.content;

    const allElements = Array.from(
        tempDiv.querySelectorAll(
            "h1, h2, h3, h4, h5, h6, p, span, strong"
        )
    );

    const topPlacesStartIndex = allElements.findIndex(
        element =>
            element.textContent.trim().toUpperCase() ===
            "DISCOVER THE CITY"
    );

    if (topPlacesStartIndex === -1) {

        console.warn(
            "Bath Top Places content not found in WordPress."
        );

        return;
    }

 
const topPlacesEndIndex = allElements.findIndex(
    (element, index) =>
        index > topPlacesStartIndex &&
        element.textContent.trim().toUpperCase() ===
        "EXPERIENCE BATH"
);

const topPlacesItems = allElements
    .slice(
        topPlacesStartIndex,
        topPlacesEndIndex === -1
            ? allElements.length
            : topPlacesEndIndex
    )
    .map(element => element.textContent.trim())
    .filter(text => text !== "");



    console.log(
        "Bath Top Places WordPress content:",
        topPlacesItems
    );


    /* ==========================================
       SECTION HEADING
    ========================================== */

    const placesEyebrow =
        document.querySelector(
            ".wp-bath-places-eyebrow"
        );

    const placesTitle =
        document.querySelector(
            ".wp-bath-places-title"
        );

    const placesDescription =
        document.querySelector(
            ".wp-bath-places-description"
        );


    if (placesEyebrow && topPlacesItems[0]) {
        placesEyebrow.textContent =
            topPlacesItems[0];
    }

    /*
       WordPress H2 is:
       Top Places to Visit

       Static HTML has:
       Top Places to <span>Visit</span>

       So we only put "Visit" inside the span.
    */

    if (placesTitle && topPlacesItems[1]) {

        const titleText =
            topPlacesItems[1];

        if (
            titleText.toLowerCase().includes(
                "top places to"
            )
        ) {

            placesTitle.textContent =
                titleText.replace(
                    /^Top Places to\s*/i,
                    ""
                );

        } else {

            placesTitle.textContent =
                titleText;

        }

    }

    if (placesDescription && topPlacesItems[2]) {
        placesDescription.textContent =
            topPlacesItems[2];
    }


    /* ==========================================
       PLACE 1
    ========================================== */

    const placeCategory1 =
        document.querySelector(
            ".wp-bath-place-category-1"
        );

    const placeName1 =
        document.querySelector(
            ".wp-bath-place-name-1"
        );

    const placeDescription1 =
        document.querySelector(
            ".wp-bath-place-description-1"
        );


    if (placeCategory1 && topPlacesItems[3]) {
        placeCategory1.textContent =
            topPlacesItems[3];
    }

    if (placeName1 && topPlacesItems[4]) {
        placeName1.textContent =
            topPlacesItems[4];
    }

    if (placeDescription1 && topPlacesItems[5]) {
        placeDescription1.textContent =
            topPlacesItems[5];
    }


    /* ==========================================
       PLACE 2
    ========================================== */

    const placeCategory2 =
        document.querySelector(
            ".wp-bath-place-category-2"
        );

    const placeName2 =
        document.querySelector(
            ".wp-bath-place-name-2"
        );

    const placeDescription2 =
        document.querySelector(
            ".wp-bath-place-description-2"
        );


    if (placeCategory2 && topPlacesItems[6]) {
        placeCategory2.textContent =
            topPlacesItems[6];
    }

    if (placeName2 && topPlacesItems[7]) {
        placeName2.textContent =
            topPlacesItems[7];
    }

    if (placeDescription2 && topPlacesItems[8]) {
        placeDescription2.textContent =
            topPlacesItems[8];
    }


    /* ==========================================
       PLACE 3
    ========================================== */

    const placeCategory3 =
        document.querySelector(
            ".wp-bath-place-category-3"
        );

    const placeName3 =
        document.querySelector(
            ".wp-bath-place-name-3"
        );

    const placeDescription3 =
        document.querySelector(
            ".wp-bath-place-description-3"
        );


    if (placeCategory3 && topPlacesItems[9]) {
        placeCategory3.textContent =
            topPlacesItems[9];
    }

    if (placeName3 && topPlacesItems[10]) {
        placeName3.textContent =
            topPlacesItems[10];
    }

    if (placeDescription3 && topPlacesItems[11]) {
        placeDescription3.textContent =
            topPlacesItems[11];
    }


    /* ==========================================
       PLACE 4
    ========================================== */

    const placeCategory4 =
        document.querySelector(
            ".wp-bath-place-category-4"
        );

    const placeName4 =
        document.querySelector(
            ".wp-bath-place-name-4"
        );

    const placeDescription4 =
        document.querySelector(
            ".wp-bath-place-description-4"
        );


    if (placeCategory4 && topPlacesItems[12]) {
        placeCategory4.textContent =
            topPlacesItems[12];
    }

    if (placeName4 && topPlacesItems[13]) {
        placeName4.textContent =
            topPlacesItems[13];
    }

    if (placeDescription4 && topPlacesItems[14]) {
        placeDescription4.textContent =
            topPlacesItems[14];
    }


    /* ==========================================
       PLACE 5
    ========================================== */

    const placeCategory5 =
        document.querySelector(
            ".wp-bath-place-category-5"
        );

    const placeName5 =
        document.querySelector(
            ".wp-bath-place-name-5"
        );

    const placeDescription5 =
        document.querySelector(
            ".wp-bath-place-description-5"
        );


    if (placeCategory5 && topPlacesItems[15]) {
        placeCategory5.textContent =
            topPlacesItems[15];
    }

    if (placeName5 && topPlacesItems[16]) {
        placeName5.textContent =
            topPlacesItems[16];
    }

    if (placeDescription5 && topPlacesItems[17]) {
        placeDescription5.textContent =
            topPlacesItems[17];
    }


    /* ==========================================
       PLACE 6
    ========================================== */

    const placeCategory6 =
        document.querySelector(
            ".wp-bath-place-category-6"
        );

    const placeName6 =
        document.querySelector(
            ".wp-bath-place-name-6"
        );

    const placeDescription6 =
        document.querySelector(
            ".wp-bath-place-description-6"
        );


    if (placeCategory6 && topPlacesItems[18]) {
        placeCategory6.textContent =
            topPlacesItems[18];
    }

    if (placeName6 && topPlacesItems[19]) {
        placeName6.textContent =
            topPlacesItems[19];
    }

    if (placeDescription6 && topPlacesItems[20]) {
        placeDescription6.textContent =
            topPlacesItems[20];
    }


    console.log(
        "Bath Top Places updated from WordPress."
    );

} catch (error) {

    console.error(
        "Bath Top Places WordPress error:",
        error
    );

}

})();
/* ==========================================
BATH - THINGS TO DO WORDPRESS
========================================== */

(async function () {

/* Run only on Bath page */

if (!document.querySelector(".bath-hero")) {
    return;
}

console.log("Bath Things To Do integration started.");

try {

    const response = await fetch(
        "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
    );

    const data = await response.json();

    const bathPage = data.posts.find(
        page => page.slug === "bath"
    );

    if (!bathPage) {
        console.warn("Bath WordPress page not found.");
        return;
    }

    const tempDiv = document.createElement("div");

    tempDiv.innerHTML = bathPage.content;

    const allElements = Array.from(
        tempDiv.querySelectorAll(
            "h1, h2, h3, h4, h5, h6, p, span, strong"
        )
    );

    const thingsStartIndex = allElements.findIndex(
        element =>
            element.textContent.trim().toUpperCase() ===
            "EXPERIENCE BATH"
    );

    if (thingsStartIndex === -1) {

        console.warn(
            "Bath Things To Do content not found in WordPress."
        );

        return;
    }
const thingsEndIndexes = allElements
    .map((element, index) => ({
        index,
        text: element.textContent.trim().toUpperCase()
    }))
    .filter(
        item =>
            item.index > thingsStartIndex &&
            item.text === "GETTING AROUND"
    );

const thingsEndIndex =
    thingsEndIndexes.length > 0
        ? thingsEndIndexes[thingsEndIndexes.length - 1].index
        : allElements.length;

const thingsItems = allElements
    .slice(thingsStartIndex, thingsEndIndex)
    .map(element => element.textContent.trim())
    .filter(text => text !== "");

console.log(
    "Bath Things To Do WordPress content:",
    thingsItems
);



    /* ==========================================
       SECTION HEADING
    ========================================== */

    const thingsEyebrow =
        document.querySelector(
            ".wp-bath-things-eyebrow"
        );

    const thingsTitle =
        document.querySelector(
            ".wp-bath-things-title"
        );

    const thingsDescription =
        document.querySelector(
            ".wp-bath-things-description"
        );


    if (thingsEyebrow && thingsItems[0]) {
        thingsEyebrow.textContent =
            thingsItems[0];
    }


    /*
       WordPress H2:
       Things To Do

       Static HTML:
       Things To <span>Do</span>

       So only "Do" goes inside the span.
    */

    if (thingsTitle && thingsItems[1]) {

        const titleText =
            thingsItems[1];

        if (
            titleText.toLowerCase().includes(
                "things to"
            )
        ) {

            thingsTitle.textContent =
                titleText.replace(
                    /^Things To\s*/i,
                    ""
                );

        } else {

            thingsTitle.textContent =
                titleText;

        }

    }


    if (thingsDescription && thingsItems[2]) {
        thingsDescription.textContent =
            thingsItems[2];
    }


    /* ==========================================
       EXPERIENCE 1
    ========================================== */

    const thingTitle1 =
        document.querySelector(
            ".wp-bath-thing-title-1"
        );

    const thingDescription1 =
        document.querySelector(
            ".wp-bath-thing-description-1"
        );


    if (thingTitle1 && thingsItems[3]) {
        thingTitle1.textContent =
            thingsItems[3];
    }

    if (thingDescription1 && thingsItems[4]) {
        thingDescription1.textContent =
            thingsItems[4];
    }


    /* ==========================================
       EXPERIENCE 2
    ========================================== */

    const thingTitle2 =
        document.querySelector(
            ".wp-bath-thing-title-2"
        );

    const thingDescription2 =
        document.querySelector(
            ".wp-bath-thing-description-2"
        );


    if (thingTitle2 && thingsItems[5]) {
        thingTitle2.textContent =
            thingsItems[5];
    }

    if (thingDescription2 && thingsItems[6]) {
        thingDescription2.textContent =
            thingsItems[6];
    }


    /* ==========================================
       EXPERIENCE 3
    ========================================== */

    const thingTitle3 =
        document.querySelector(
            ".wp-bath-thing-title-3"
        );

    const thingDescription3 =
        document.querySelector(
            ".wp-bath-thing-description-3"
        );


    if (thingTitle3 && thingsItems[7]) {
        thingTitle3.textContent =
            thingsItems[7];
    }

    if (thingDescription3 && thingsItems[8]) {
        thingDescription3.textContent =
            thingsItems[8];
    }


    /* ==========================================
       EXPERIENCE 4
    ========================================== */

    const thingTitle4 =
        document.querySelector(
            ".wp-bath-thing-title-4"
        );

    const thingDescription4 =
        document.querySelector(
            ".wp-bath-thing-description-4"
        );


    if (thingTitle4 && thingsItems[9]) {
        thingTitle4.textContent =
            thingsItems[9];
    }

    if (thingDescription4 && thingsItems[10]) {
        thingDescription4.textContent =
            thingsItems[10];
    }


    /* ==========================================
       EXPERIENCE 5
    ========================================== */

    const thingTitle5 =
        document.querySelector(
            ".wp-bath-thing-title-5"
        );

    const thingDescription5 =
        document.querySelector(
            ".wp-bath-thing-description-5"
        );


    if (thingTitle5 && thingsItems[11]) {
        thingTitle5.textContent =
            thingsItems[11];
    }

    if (thingDescription5 && thingsItems[12]) {
        thingDescription5.textContent =
            thingsItems[12];
    }


    /* ==========================================
       EXPERIENCE 6
    ========================================== */

    const thingTitle6 =
        document.querySelector(
            ".wp-bath-thing-title-6"
        );

    const thingDescription6 =
        document.querySelector(
            ".wp-bath-thing-description-6"
        );


    if (thingTitle6 && thingsItems[13]) {
        thingTitle6.textContent =
            thingsItems[13];
    }

    if (thingDescription6 && thingsItems[14]) {
        thingDescription6.textContent =
            thingsItems[14];
    }


    console.log(
        "Bath Things To Do updated from WordPress."
    );

} catch (error) {

    console.error(
        "Bath Things To Do WordPress error:",
        error
    );

}

})();

/* ==========================================
   BATH - GETTING AROUND WORDPRESS
========================================== */

(async function () {

    if (!document.querySelector(".bath-hero")) {
        return;
    }

    console.log("Bath Getting Around integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        const data = await response.json();

        const bathPage = data.posts.find(
            page => page.slug === "bath"
        );

        if (!bathPage) {
            console.warn("Bath WordPress page not found.");
            return;
        }

        const tempDiv = document.createElement("div");

        tempDiv.innerHTML = bathPage.content;

        const allElements = Array.from(
            tempDiv.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, p, span, strong"
            )
        );


        /* ==========================================
           FIND ALL "GETTING AROUND" OCCURRENCES
        ========================================== */

        const aroundIndexes = allElements
            .map((element, index) => ({
                text: element.textContent.trim().toUpperCase(),
                index: index
            }))
            .filter(item =>
                item.text === "GETTING AROUND"
            );


        console.log(
            "Bath Getting Around occurrences:",
            aroundIndexes
        );


        if (aroundIndexes.length === 0) {

            console.warn(
                "Bath Getting Around content not found in WordPress."
            );

            return;
        }


        /* ==========================================
           USE THE LAST / ACTUAL SECTION
        ========================================== */

        const aroundStartIndex =
            aroundIndexes[aroundIndexes.length - 1].index;


        /* ==========================================
           FIND NEXT SECTION
           PLAN YOUR VISIT
        ========================================== */

        const aroundEndIndex = allElements.findIndex(
            (element, index) =>
                index > aroundStartIndex &&
                element.textContent.trim().toUpperCase() ===
                "PLAN YOUR VISIT"
        );


        const endIndex =
            aroundEndIndex === -1
                ? allElements.length
                : aroundEndIndex;


        /* ==========================================
           GET ONLY ACTUAL GETTING AROUND CONTENT
        ========================================== */

        const aroundItems = allElements
            .slice(
                aroundStartIndex,
                endIndex
            )
            .map(element =>
                element.textContent.trim()
            )
            .filter(text => text !== "");


        console.log(
            "Bath Getting Around WordPress content:",
            aroundItems
        );


        /* ==========================================
           EYEBROW
        ========================================== */

        const aroundEyebrow =
            document.querySelector(
                ".wp-bath-around-eyebrow"
            );

        if (
            aroundEyebrow &&
            aroundItems[0]
        ) {

            aroundEyebrow.textContent =
                aroundItems[0];

        }


        /* ==========================================
           TITLE
        ========================================== */

        const aroundTitle =
            document.querySelector(
                ".wp-bath-around-title"
            );

        if (
            aroundTitle &&
            aroundItems[1]
        ) {

            aroundTitle.textContent =
                aroundItems[1];

        }


        /* ==========================================
           DESCRIPTION 1
        ========================================== */

        const aroundDescription1 =
            document.querySelector(
                ".wp-bath-around-description-1"
            );

        if (
            aroundDescription1 &&
            aroundItems[2]
        ) {

            aroundDescription1.textContent =
                aroundItems[2];

        }


        /* ==========================================
           DESCRIPTION 2
        ========================================== */

        const aroundDescription2 =
            document.querySelector(
                ".wp-bath-around-description-2"
            );

        if (
            aroundDescription2 &&
            aroundItems[3]
        ) {

            aroundDescription2.textContent =
                aroundItems[3];

        }


        /* ==========================================
           TIP TITLE
        ========================================== */

        const tipTitle =
            document.querySelector(
                ".wp-bath-around-tip-title"
            );

        if (
            tipTitle &&
            aroundItems[4]
        ) {

            tipTitle.textContent =
                aroundItems[4];

        }


        /* ==========================================
           TIP DESCRIPTION
        ========================================== */

        const tipDescription =
            document.querySelector(
                ".wp-bath-around-tip-description"
            );

        if (
            tipDescription &&
            aroundItems[5]
        ) {

            tipDescription.textContent =
                aroundItems[5];

        }


        /* ==========================================
           WALKING
        ========================================== */

        const transportTitle1 =
            document.querySelector(
                ".wp-bath-transport-title-1"
            );

        if (
            transportTitle1 &&
            aroundItems[6]
        ) {

            transportTitle1.textContent =
                aroundItems[6];

        }


        const transportDescription1 =
            document.querySelector(
                ".wp-bath-transport-description-1"
            );

        if (
            transportDescription1 &&
            aroundItems[7]
        ) {

            transportDescription1.textContent =
                aroundItems[7];

        }


        /* ==========================================
           LOCAL BUS
        ========================================== */

        const transportTitle2 =
            document.querySelector(
                ".wp-bath-transport-title-2"
            );

        if (
            transportTitle2 &&
            aroundItems[8]
        ) {

            transportTitle2.textContent =
                aroundItems[8];

        }


        const transportDescription2 =
            document.querySelector(
                ".wp-bath-transport-description-2"
            );

        if (
            transportDescription2 &&
            aroundItems[9]
        ) {

            transportDescription2.textContent =
                aroundItems[9];

        }


        /* ==========================================
           TRAIN
        ========================================== */

        const transportTitle3 =
            document.querySelector(
                ".wp-bath-transport-title-3"
            );

        if (
            transportTitle3 &&
            aroundItems[10]
        ) {

            transportTitle3.textContent =
                aroundItems[10];

        }


        const transportDescription3 =
            document.querySelector(
                ".wp-bath-transport-description-3"
            );

        if (
            transportDescription3 &&
            aroundItems[11]
        ) {

            transportDescription3.textContent =
                aroundItems[11];

        }


        /* ==========================================
           TAXI
        ========================================== */

        const transportTitle4 =
            document.querySelector(
                ".wp-bath-transport-title-4"
            );

        if (
            transportTitle4 &&
            aroundItems[12]
        ) {

            transportTitle4.textContent =
                aroundItems[12];

        }


        const transportDescription4 =
            document.querySelector(
                ".wp-bath-transport-description-4"
            );

        if (
            transportDescription4 &&
            aroundItems[13]
        ) {

            transportDescription4.textContent =
                aroundItems[13];

        }


        console.log(
            "Bath Getting Around updated from WordPress."
        );

    } catch (error) {

        console.error(
            "Bath Getting Around WordPress error:",
            error
        );

    }

})();




/* ==========================================
   BATH - BEST TIME TO VISIT WORDPRESS
========================================== */

(async function () {

    /* Run only on Bath page */

    if (!document.querySelector(".bath-hero")) {
        return;
    }

    console.log("Bath Best Time integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        const data = await response.json();

        const bathPage = data.posts.find(
            page => page.slug === "bath"
        );

        if (!bathPage) {
            console.warn("Bath WordPress page not found.");
            return;
        }

        const tempDiv = document.createElement("div");

        tempDiv.innerHTML = bathPage.content;

        const allElements = Array.from(
            tempDiv.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, p, span, strong"
            )
        );

        const bestTimeStartIndex = allElements.findIndex(
            element =>
                element.textContent.trim().toUpperCase() ===
                "PLAN YOUR VISIT"
        );

        if (bestTimeStartIndex === -1) {

            console.warn(
                "Bath Best Time content not found in WordPress."
            );

            return;
        }

 
const bestTimeEndIndex = allElements.findIndex(
    (element, index) =>
        index > bestTimeStartIndex &&
        element.textContent.trim().toUpperCase() ===
        "TRAVEL SMART"
);

const bestTimeItems = allElements
    .slice(
        bestTimeStartIndex,
        bestTimeEndIndex === -1
            ? allElements.length
            : bestTimeEndIndex
    )
    .map(element => element.textContent.trim())
    .filter(text => text !== "");

console.log(
    "Bath Best Time WordPress content:",
    bestTimeItems
);




        /* ==========================================
           SECTION HEADING
        ========================================== */

        const bestTimeEyebrow =
            document.querySelector(
                ".wp-bath-best-time-eyebrow"
            );

        const bestTimeTitle =
            document.querySelector(
                ".wp-bath-best-time-title"
            );

        const bestTimeDescription =
            document.querySelector(
                ".wp-bath-best-time-description"
            );


        if (
            bestTimeEyebrow &&
            bestTimeItems[0]
        ) {

            bestTimeEyebrow.textContent =
                bestTimeItems[0];

        }


        /*
           WordPress H2:
           Best Time to Visit Bath

           Static HTML:
           Best Time to <span>Visit Bath</span>

           So only "Visit Bath" goes inside the span.
        */

        if (
            bestTimeTitle &&
            bestTimeItems[1]
        ) {

            const titleText =
                bestTimeItems[1];

            if (
                titleText.toLowerCase().includes(
                    "best time to"
                )
            ) {

                bestTimeTitle.textContent =
                    titleText.replace(
                        /^Best Time to\s*/i,
                        ""
                    );

            } else {

                bestTimeTitle.textContent =
                    titleText;

            }

        }


        if (
            bestTimeDescription &&
            bestTimeItems[2]
        ) {

            bestTimeDescription.textContent =
                bestTimeItems[2];

        }


        /* ==========================================
           SPRING
        ========================================== */

        const seasonMonths1 =
            document.querySelector(
                ".wp-bath-season-months-1"
            );

        const seasonTitle1 =
            document.querySelector(
                ".wp-bath-season-title-1"
            );

        const seasonDescription1 =
            document.querySelector(
                ".wp-bath-season-description-1"
            );


        if (
            seasonMonths1 &&
            bestTimeItems[3]
        ) {

            seasonMonths1.textContent =
                bestTimeItems[3];

        }

        if (
            seasonTitle1 &&
            bestTimeItems[4]
        ) {

            seasonTitle1.textContent =
                bestTimeItems[4];

        }

        if (
            seasonDescription1 &&
            bestTimeItems[5]
        ) {

            seasonDescription1.textContent =
                bestTimeItems[5];

        }


        /* ==========================================
           SUMMER
        ========================================== */

        const seasonMonths2 =
            document.querySelector(
                ".wp-bath-season-months-2"
            );

        const seasonTitle2 =
            document.querySelector(
                ".wp-bath-season-title-2"
            );

        const seasonDescription2 =
            document.querySelector(
                ".wp-bath-season-description-2"
            );

        const seasonBadge =
            document.querySelector(
                ".wp-bath-season-badge"
            );


        if (
            seasonMonths2 &&
            bestTimeItems[6]
        ) {

            seasonMonths2.textContent =
                bestTimeItems[6];

        }

        if (
            seasonTitle2 &&
            bestTimeItems[7]
        ) {

            seasonTitle2.textContent =
                bestTimeItems[7];

        }

        if (
            seasonDescription2 &&
            bestTimeItems[8]
        ) {

            seasonDescription2.textContent =
                bestTimeItems[8];

        }

        if (
            seasonBadge &&
            bestTimeItems[9]
        ) {

            seasonBadge.textContent =
                bestTimeItems[9];

        }


        /* ==========================================
           AUTUMN
        ========================================== */

        const seasonMonths3 =
            document.querySelector(
                ".wp-bath-season-months-3"
            );

        const seasonTitle3 =
            document.querySelector(
                ".wp-bath-season-title-3"
            );

        const seasonDescription3 =
            document.querySelector(
                ".wp-bath-season-description-3"
            );


        if (
            seasonMonths3 &&
            bestTimeItems[10]
        ) {

            seasonMonths3.textContent =
                bestTimeItems[10];

        }

        if (
            seasonTitle3 &&
            bestTimeItems[11]
        ) {

            seasonTitle3.textContent =
                bestTimeItems[11];

        }

        if (
            seasonDescription3 &&
            bestTimeItems[12]
        ) {

            seasonDescription3.textContent =
                bestTimeItems[12];

        }


        /* ==========================================
           WINTER
        ========================================== */

        const seasonMonths4 =
            document.querySelector(
                ".wp-bath-season-months-4"
            );

        const seasonTitle4 =
            document.querySelector(
                ".wp-bath-season-title-4"
            );

        const seasonDescription4 =
            document.querySelector(
                ".wp-bath-season-description-4"
            );


        if (
            seasonMonths4 &&
            bestTimeItems[13]
        ) {

            seasonMonths4.textContent =
                bestTimeItems[13];

        }

        if (
            seasonTitle4 &&
            bestTimeItems[14]
        ) {

            seasonTitle4.textContent =
                bestTimeItems[14];

        }

        if (
            seasonDescription4 &&
            bestTimeItems[15]
        ) {

            seasonDescription4.textContent =
                bestTimeItems[15];

        }


        console.log(
            "Bath Best Time updated from WordPress."
        );


    } catch (error) {

        console.error(
            "Bath Best Time WordPress error:",
            error
        );

    }

})();
/* ==========================================
   BATH TRAVEL TIPS - WORDPRESS INTEGRATION
========================================== */

(function () {

    // Only run on Bath page
    if (!document.querySelector(".bath-hero")) {
        return;
    }

    console.log("Bath Travel Tips integration started.");

    fetch("https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20")
        .then(response => response.json())
        .then(data => {

            const bathPage = data.posts.find(post => post.slug === "bath");

            if (!bathPage) {
                console.warn("Bath WordPress page not found.");
                return;
            }

            console.log("Bath Travel Tips WordPress page found.");

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = bathPage.content;

            const allElements = Array.from(tempDiv.querySelectorAll("p, h2, h3"));

            const tipsStartIndex = allElements.findIndex(
                el => el.textContent.trim() === "TRAVEL SMART"
            );

            if (tipsStartIndex === -1) {
                console.warn("Bath Travel Tips content not found in WordPress.");
                return;
            }

            const tipsContent = allElements.slice(tipsStartIndex);

            console.log(
                "Bath Travel Tips WordPress content:",
                tipsContent
            );


            /* ------------------------------------------
               SECTION HEADING
            ------------------------------------------ */

            const eyebrow = document.querySelector(
                ".wp-bath-tips-eyebrow"
            );

            const title = document.querySelector(
                ".wp-bath-tips-title"
            );

            const description = document.querySelector(
                ".wp-bath-tips-description"
            );


            if (eyebrow && tipsContent[0]) {
                eyebrow.textContent =
                    tipsContent[0].textContent.trim();
            }

            if (title && tipsContent[1]) {
                title.textContent =
                    tipsContent[1].textContent.trim()
                        .replace(/^Bath\s*/i, "");
            }

            if (description && tipsContent[2]) {
                description.textContent =
                    tipsContent[2].textContent.trim();
            }


            /* ------------------------------------------
               TRAVEL TIPS - 6 CARDS
            ------------------------------------------ */

            for (let i = 1; i <= 6; i++) {

                const titleIndex = 3 + ((i - 1) * 2);
                const descriptionIndex = titleIndex + 1;

                const tipTitle = document.querySelector(
                    `.wp-bath-tip-title-${i}`
                );

                const tipDescription = document.querySelector(
                    `.wp-bath-tip-description-${i}`
                );


                if (tipTitle && tipsContent[titleIndex]) {
                    tipTitle.textContent =
                        tipsContent[titleIndex]
                            .textContent.trim();
                }

                if (tipDescription && tipsContent[descriptionIndex]) {
                    tipDescription.textContent =
                        tipsContent[descriptionIndex]
                            .textContent.trim();
                }

            }


            console.log(
                "Bath Travel Tips updated from WordPress."
            );

        })
        .catch(error => {
            console.error(
                "Bath Travel Tips WordPress error:",
                error
            );
        });

})();
/* ==========================================
   BATH FAQ - WORDPRESS INTEGRATION
========================================== */

(function () {

    // Only run on Bath page
    if (!document.querySelector(".bath-hero")) {
        return;
    }

    console.log("Bath FAQ integration started.");

    fetch("https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20")
        .then(response => response.json())
        .then(data => {

            const bathPage = data.posts.find(
                post => post.slug === "bath"
            );

            if (!bathPage) {
                console.warn("Bath FAQ WordPress page not found.");
                return;
            }

            console.log("Bath FAQ WordPress page found.");

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = bathPage.content;

            const allElements = Array.from(
                tempDiv.querySelectorAll("p, h2, h3")
            );

            const faqStartIndex = allElements.findIndex(
                el => el.textContent.trim() === "HAVE QUESTIONS?"
            );

            if (faqStartIndex === -1) {
                console.warn(
                    "Bath FAQ content not found in WordPress."
                );
                return;
            }

            const faqContent = allElements.slice(faqStartIndex);

            console.log(
                "Bath FAQ WordPress content:",
                faqContent
            );


            /* ------------------------------------------
               FAQ SECTION HEADING
            ------------------------------------------ */

            const eyebrow = document.querySelector(
                ".wp-bath-faq-eyebrow"
            );

            const title = document.querySelector(
                ".wp-bath-faq-title"
            );

            const description = document.querySelector(
                ".wp-bath-faq-description"
            );


            if (eyebrow && faqContent[0]) {
                eyebrow.textContent =
                    faqContent[0].textContent.trim();
            }

            if (title && faqContent[1]) {
                title.textContent =
                    faqContent[1].textContent.trim()
                        .replace(/^Bath\s*/i, "");
            }

            if (description && faqContent[2]) {
                description.textContent =
                    faqContent[2].textContent.trim();
            }


            /* ------------------------------------------
               FAQ QUESTIONS & ANSWERS
            ------------------------------------------ */

            for (let i = 1; i <= 6; i++) {

                const questionIndex = 3 + ((i - 1) * 2);
                const answerIndex = questionIndex + 1;

                const question = document.querySelector(
                    `.wp-bath-faq-question-${i}`
                );

                const answer = document.querySelector(
                    `.wp-bath-faq-answer-${i}`
                );


                if (question && faqContent[questionIndex]) {
                    question.textContent =
                        faqContent[questionIndex]
                            .textContent.trim();
                }

                if (answer && faqContent[answerIndex]) {
                    answer.textContent =
                        faqContent[answerIndex]
                            .textContent.trim();
                }

            }


            console.log(
                "Bath FAQ content updated from WordPress."
            );

        })
        .catch(error => {

            console.error(
                "Bath FAQ WordPress error:",
                error
            );

        });

})();
/* ==========================================
   BATH FAQ - ACCORDION FIX
========================================== */

(function () {

    if (!document.querySelector(".bath-faq")) {
        return;
    }

    console.log("Bath FAQ accordion fix ready.");

    const faqItems = document.querySelectorAll(
        ".bath-faq .faq-item"
    );

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");

        if (!question) {
            return;
        }

        question.addEventListener("click", function () {

            // Close other FAQ items
            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {
                    otherItem.classList.remove("active");

                    const otherAnswer =
                        otherItem.querySelector(".faq-answer");

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }
                }

            });


            // Toggle current FAQ
            item.classList.toggle("active");

            const answer = item.querySelector(".faq-answer");

            if (!answer) {
                return;
            }

            if (item.classList.contains("active")) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            } else {

                answer.style.maxHeight = null;

            }

        });

    });

})();
/* ==========================================
   BATH FINAL CTA - WORDPRESS INTEGRATION
========================================== */

(function () {

    // Only run on Bath page
    if (!document.querySelector(".bath-hero")) {
        return;
    }

    console.log("Bath CTA integration started.");

    fetch("https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20")
        .then(response => response.json())
        .then(data => {

            const bathPage = data.posts.find(
                post => post.slug === "bath"
            );

            if (!bathPage) {
                console.warn("Bath CTA WordPress page not found.");
                return;
            }

            console.log("Bath CTA WordPress page found.");

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = bathPage.content;

            const allElements = Array.from(
                tempDiv.querySelectorAll("p, h2, h3")
            );

            /* ------------------------------------------
               FIND CTA START
            ------------------------------------------ */

            const ctaStartIndex = allElements.findIndex(
                el =>
                    el.textContent.trim() ===
                    "YOUR BATH ADVENTURE STARTS HERE"
            );

            if (ctaStartIndex === -1) {
                console.warn(
                    "Bath CTA content not found in WordPress."
                );
                return;
            }

            const ctaContent = allElements.slice(ctaStartIndex);

            console.log(
                "Bath CTA WordPress content:",
                ctaContent
            );


            /* ------------------------------------------
               CTA EYEBROW
            ------------------------------------------ */

            const eyebrow = document.querySelector(
                ".wp-bath-cta-eyebrow"
            );

            if (eyebrow && ctaContent[0]) {
                eyebrow.textContent =
                    ctaContent[0].textContent.trim();
            }


            /* ------------------------------------------
               CTA TITLE
            ------------------------------------------ */

            const title = document.querySelector(
                ".wp-bath-cta-title"
            );

            if (title && ctaContent[1]) {

                let titleText =
                    ctaContent[1].textContent.trim();

                titleText = titleText.replace(
                    /^Ready to\s*/i,
                    ""
                );

                title.textContent = titleText;
            }


            /* ------------------------------------------
               CTA DESCRIPTION
            ------------------------------------------ */

            const description = document.querySelector(
                ".wp-bath-cta-description"
            );

            if (description && ctaContent[2]) {
                description.textContent =
                    ctaContent[2].textContent.trim();
            }


            /* ------------------------------------------
               CTA BUTTON 1
            ------------------------------------------ */

            const button1 = document.querySelector(
                ".wp-bath-cta-button-1"
            );

            if (button1 && ctaContent[3]) {
                button1.textContent =
                    ctaContent[3].textContent.trim();
            }


            /* ------------------------------------------
               CTA BUTTON 2
            ------------------------------------------ */

            const button2 = document.querySelector(
                ".wp-bath-cta-button-2"
            );

            if (button2 && ctaContent[4]) {
                button2.textContent =
                    ctaContent[4].textContent.trim();
            }


            console.log(
                "Bath CTA content updated from WordPress."
            );

        })
        .catch(error => {

            console.error(
                "Bath CTA WordPress error:",
                error
            );

        });

})();

/* ==========================================
   YORK - HERO + INTRODUCTION WORDPRESS
========================================== */

(async function () {

    /* Run only on York page */

    if (!document.querySelector(".york-hero")) {
        return;
    }

    console.log("York WordPress integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        const data = await response.json();

        const yorkPage = data.posts.find(
            page => page.slug === "york"
        );

        if (!yorkPage) {

            console.warn(
                "York WordPress page not found."
            );

            return;
        }

        console.log(
            "York WordPress page found:",
            yorkPage
        );


        /* ==========================================
           GET WORDPRESS CONTENT
        ========================================== */

        const tempDiv = document.createElement("div");

        tempDiv.innerHTML = yorkPage.content;

        const allElements = Array.from(
            tempDiv.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, p, span, strong"
            )
        );

        const yorkItems = allElements
            .map(element => element.textContent.trim())
            .filter(text => text !== "");


        console.log(
            "York WordPress content:",
            yorkItems
        );


        /* ==========================================
           HERO
        ========================================== */

        const heroEyebrow =
            document.querySelector(
                ".wp-york-hero-eyebrow"
            );

        const heroTitle =
            document.querySelector(
                ".wp-york-hero-title"
            );

        const heroDescription =
            document.querySelector(
                ".wp-york-hero-description"
            );


        if (heroEyebrow && yorkItems[0]) {
            heroEyebrow.textContent =
                yorkItems[0];
        }

        if (heroTitle && yorkItems[1]) {
            heroTitle.textContent =
                yorkItems[1];
        }

        if (heroDescription && yorkItems[2]) {
            heroDescription.textContent =
                yorkItems[2];
        }


        /* ==========================================
           INTRODUCTION
        ========================================== */

        const introEyebrow =
            document.querySelector(
                ".wp-york-intro-eyebrow"
            );

        const introTitle =
            document.querySelector(
                ".wp-york-intro-title"
            );

        const introDescription1 =
            document.querySelector(
                ".wp-york-intro-description-1"
            );

        const introDescription2 =
            document.querySelector(
                ".wp-york-intro-description-2"
            );

        const introDescription3 =
            document.querySelector(
                ".wp-york-intro-description-3"
            );


        if (introEyebrow && yorkItems[3]) {
            introEyebrow.textContent =
                yorkItems[3];
        }

        if (introTitle && yorkItems[4]) {
            introTitle.textContent =
                yorkItems[4];
        }

        if (
            introDescription1 &&
            yorkItems[5]
        ) {
            introDescription1.textContent =
                yorkItems[5];
        }

        if (
            introDescription2 &&
            yorkItems[6]
        ) {
            introDescription2.textContent =
                yorkItems[6];
        }

        if (
            introDescription3 &&
            yorkItems[7]
        ) {
            introDescription3.textContent =
                yorkItems[7];
        }


        /* ==========================================
           QUICK FACTS
        ========================================== */

        const location =
            document.querySelector(
                ".wp-york-location"
            );

        const language =
            document.querySelector(
                ".wp-york-language"
            );

        const currency =
            document.querySelector(
                ".wp-york-currency"
            );

        const transport =
            document.querySelector(
                ".wp-york-transport"
            );


        if (location && yorkItems[9]) {
            location.textContent =
                yorkItems[9];
        }

        if (language && yorkItems[11]) {
            language.textContent =
                yorkItems[11];
        }

        if (currency && yorkItems[13]) {
            currency.textContent =
                yorkItems[13];
        }

        if (transport && yorkItems[15]) {
            transport.textContent =
                yorkItems[15];
        }


        console.log(
            "York Hero, Introduction & Quick Facts updated from WordPress."
        );


    } catch (error) {

        console.error(
            "York WordPress integration error:",
            error
        );

    }

})();
/* ==========================================
   YORK - TOP PLACES WORDPRESS
========================================== */

(async function () {

    /* Run only on York page */

    if (!document.querySelector(".york-places")) {
        return;
    }

    console.log("York Top Places integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        const data = await response.json();

        const yorkPage = data.posts.find(
            page => page.slug === "york"
        );

        if (!yorkPage) {

            console.warn(
                "York WordPress page not found."
            );

            return;
        }

        console.log(
            "York Top Places WordPress page found:",
            yorkPage
        );


        /* ==========================================
           GET WORDPRESS CONTENT
        ========================================== */

        const tempDiv = document.createElement("div");

        tempDiv.innerHTML = yorkPage.content;

        const allElements = Array.from(
            tempDiv.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, p, span, strong"
            )
        );

        const yorkItems = allElements
            .map(element => element.textContent.trim())
            .filter(text => text !== "");


        console.log(
            "York Top Places WordPress content:",
            yorkItems
        );


        /* ==========================================
           FIND TOP PLACES SECTION
        ========================================== */

        const startIndex = yorkItems.findIndex(
            text =>
                text.toUpperCase() ===
                "DISCOVER THE CITY"
        );

        if (startIndex === -1) {

            console.warn(
                "York Top Places content not found in WordPress."
            );

            return;
        }


        const topPlacesItems = yorkItems.slice(
            startIndex,
            startIndex + 21
        );


        console.log(
            "York Top Places section content:",
            topPlacesItems
        );


        /* ==========================================
           SECTION HEADING
        ========================================== */

        const eyebrow =
            document.querySelector(
                ".wp-york-places-eyebrow"
            );

        const title =
            document.querySelector(
                ".wp-york-places-title"
            );

        const description =
            document.querySelector(
                ".wp-york-places-description"
            );


        if (eyebrow && topPlacesItems[0]) {
            eyebrow.textContent =
                topPlacesItems[0];
        }

        if (title && topPlacesItems[1]) {

            const titleParts =
                topPlacesItems[1].split(" ");

            if (titleParts.length > 3) {

                title.textContent =
                    titleParts
                        .slice(3)
                        .join(" ");

            } else {

                title.textContent =
                    topPlacesItems[1];

            }

        }

        if (description && topPlacesItems[2]) {
            description.textContent =
                topPlacesItems[2];
        }


        /* ==========================================
           PLACE 1
        ========================================== */

        const category1 =
            document.querySelector(
                ".wp-york-place-category-1"
            );

        const title1 =
            document.querySelector(
                ".wp-york-place-title-1"
            );

        const description1 =
            document.querySelector(
                ".wp-york-place-description-1"
            );

        if (category1) category1.textContent = topPlacesItems[3];
        if (title1) title1.textContent = topPlacesItems[4];
        if (description1) description1.textContent = topPlacesItems[5];


        /* ==========================================
           PLACE 2
        ========================================== */

        const category2 =
            document.querySelector(
                ".wp-york-place-category-2"
            );

        const title2 =
            document.querySelector(
                ".wp-york-place-title-2"
            );

        const description2 =
            document.querySelector(
                ".wp-york-place-description-2"
            );

        if (category2) category2.textContent = topPlacesItems[6];
        if (title2) title2.textContent = topPlacesItems[7];
        if (description2) description2.textContent = topPlacesItems[8];


        /* ==========================================
           PLACE 3
        ========================================== */

        const category3 =
            document.querySelector(
                ".wp-york-place-category-3"
            );

        const title3 =
            document.querySelector(
                ".wp-york-place-title-3"
            );

        const description3 =
            document.querySelector(
                ".wp-york-place-description-3"
            );

        if (category3) category3.textContent = topPlacesItems[9];
        if (title3) title3.textContent = topPlacesItems[10];
        if (description3) description3.textContent = topPlacesItems[11];


        /* ==========================================
           PLACE 4
        ========================================== */

        const category4 =
            document.querySelector(
                ".wp-york-place-category-4"
            );

        const title4 =
            document.querySelector(
                ".wp-york-place-title-4"
            );

        const description4 =
            document.querySelector(
                ".wp-york-place-description-4"
            );

        if (category4) category4.textContent = topPlacesItems[12];
        if (title4) title4.textContent = topPlacesItems[13];
        if (description4) description4.textContent = topPlacesItems[14];


        /* ==========================================
           PLACE 5
        ========================================== */

        const category5 =
            document.querySelector(
                ".wp-york-place-category-5"
            );

        const title5 =
            document.querySelector(
                ".wp-york-place-title-5"
            );

        const description5 =
            document.querySelector(
                ".wp-york-place-description-5"
            );

        if (category5) category5.textContent = topPlacesItems[15];
        if (title5) title5.textContent = topPlacesItems[16];
        if (description5) description5.textContent = topPlacesItems[17];


        /* ==========================================
           PLACE 6
        ========================================== */

        const category6 =
            document.querySelector(
                ".wp-york-place-category-6"
            );

        const title6 =
            document.querySelector(
                ".wp-york-place-title-6"
            );

        const description6 =
            document.querySelector(
                ".wp-york-place-description-6"
            );

        if (category6) category6.textContent = topPlacesItems[18];
        if (title6) title6.textContent = topPlacesItems[19];
        if (description6) description6.textContent = topPlacesItems[20];


        console.log(
            "York Top Places updated from WordPress."
        );


    } catch (error) {

        console.error(
            "York Top Places WordPress integration error:",
            error
        );

    }

})();
/* ==========================================
   YORK - THINGS TO DO WORDPRESS
========================================== */

(async function () {

    /* Run only on York page */

    if (!document.querySelector(".york-things")) {
        return;
    }

    console.log("York Things To Do integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        if (!response.ok) {
            throw new Error("WordPress API request failed: " + response.status);
        }

        const data = await response.json();

        const yorkPage = (data.posts || []).find(
            page => page.slug === "york"
        );

        if (!yorkPage) {
            console.warn("York WordPress page not found.");
            return;
        }

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = yorkPage.content;

        const allElements = Array.from(
            tempDiv.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, p, span, strong"
            )
        );

        const yorkItems = allElements
            .map(element => element.textContent.trim())
            .filter(text => text !== "");

        console.log("York Things To Do: WordPress content loaded.", yorkItems);

        /* Find the Things To Do section in WordPress */

        const startIndex = yorkItems.findIndex(
            text => text.toUpperCase() === "EXPERIENCE YORK"
        );

        if (startIndex === -1) {
            console.warn(
                "York Things To Do section not found. Add EXPERIENCE YORK to the York WordPress page."
            );
            return;
        }

        const items = yorkItems.slice(startIndex, startIndex + 15);

        if (items.length < 15) {
            console.warn(
                "York Things To Do content is incomplete. Expected 15 items, received:",
                items.length
            );
            return;
        }

        /* Section heading */

        const eyebrow = document.querySelector(
            ".wp-york-things-eyebrow"
        );

        const sectionTitle = document.querySelector(
            ".wp-york-things-title"
        );

        const sectionDescription = document.querySelector(
            ".wp-york-things-description"
        );

        if (eyebrow) {
            eyebrow.textContent = items[0];
        }

        /*
          HTML already contains "Things To".
          WordPress title should be "Do".
        */

        if (sectionTitle) {
            sectionTitle.textContent = items[1];
        }

        if (sectionDescription) {
            sectionDescription.textContent = items[2];
        }

        /* Six experience cards */

        for (let i = 1; i <= 6; i++) {

            const itemIndex = 3 + ((i - 1) * 2);

            const title = document.querySelector(
                ".wp-york-thing-title-" + i
            );

            const description = document.querySelector(
                ".wp-york-thing-description-" + i
            );

            if (title) {
                title.textContent = items[itemIndex];
            }

            if (description) {
                description.textContent = items[itemIndex + 1];
            }
        }

        console.log(
            "York Things To Do updated from WordPress."
        );

    } catch (error) {

        console.error(
            "York Things To Do WordPress integration error:",
            error
        );

    }

})();
/* ==========================================
   YORK - GETTING AROUND WORDPRESS
========================================== */

(async function () {

    // Run only on York page
    if (!document.querySelector(".york-around")) {
        return;
    }

    console.log("York Getting Around integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        if (!response.ok) {
            throw new Error("WordPress API response error");
        }

        const data = await response.json();

        const yorkPage = data.posts.find(
            page => page.slug === "york"
        );

        if (!yorkPage) {
            console.warn("York WordPress page not found.");
            return;
        }

        // Read WordPress content
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = yorkPage.content;

        const allItems = Array.from(
            tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, strong")
        )
        .map(element => element.textContent.trim())
        .filter(text => text !== "");

        console.log("York Getting Around content loaded:", allItems);

        // Find unique section starting point
        const sectionStart = allItems.findIndex(
            item => item.toUpperCase() === "GETTING AROUND YORK"
        );

        if (sectionStart === -1) {
            console.warn(
                "GETTING AROUND YORK section not found in WordPress."
            );
            return;
        }

        // 14 content items for this section
        const sectionItems = allItems.slice(
            sectionStart,
            sectionStart + 14
        );

        console.log("York Getting Around section:", sectionItems);

        // Helper function
        function updateText(selector, value) {

            const element = document.querySelector(selector);

            if (element && value) {
                element.textContent = value;
            }

        }

        // Section heading
        updateText(
            ".wp-york-around-eyebrow",
            "GETTING AROUND"
        );

        updateText(
            ".wp-york-around-title",
            sectionItems[1]
        );

        // Main descriptions
        updateText(
            ".wp-york-around-description-1",
            sectionItems[2]
        );

        updateText(
            ".wp-york-around-description-2",
            sectionItems[3]
        );

        // Travel tip
        updateText(
            ".wp-york-around-tip-title",
            sectionItems[4]
        );

        updateText(
            ".wp-york-around-tip-description",
            sectionItems[5]
        );

        // Transport cards
        for (let i = 1; i <= 4; i++) {

            const titleIndex = 6 + ((i - 1) * 2);
            const descriptionIndex = titleIndex + 1;

            updateText(
                `.wp-york-transport-title-${i}`,
                sectionItems[titleIndex]
            );

            updateText(
                `.wp-york-transport-description-${i}`,
                sectionItems[descriptionIndex]
            );

        }

        console.log(
            "York Getting Around updated from WordPress."
        );

    } catch (error) {

        console.error(
            "York Getting Around integration error:",
            error
        );

    }

})();
/* ==========================================
   YORK - BEST TIME TO VISIT WORDPRESS
========================================== */

(async function () {

    // Run only on York page
    if (!document.querySelector(".york-best-time")) {
        return;
    }

    console.log("York Best Time integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        if (!response.ok) {
            throw new Error("WordPress API response error");
        }

        const data = await response.json();

        const yorkPage = data.posts.find(
            page => page.slug === "york"
        );

        if (!yorkPage) {
            console.warn("York WordPress page not found.");
            return;
        }

        // Read WordPress content
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = yorkPage.content;

        const allItems = Array.from(
            tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, strong")
        )
        .map(element => element.textContent.trim())
        .filter(text => text !== "");

        console.log("York Best Time content loaded:", allItems);

        // Find section starting point
        const sectionStart = allItems.findIndex(
            item => item.toUpperCase() === "PLAN YOUR VISIT"
        );

        if (sectionStart === -1) {
            console.warn(
                "PLAN YOUR VISIT section not found in WordPress."
            );
            return;
        }

        // 15 items: eyebrow, heading, description,
        // and 3 items for each of the 4 seasons
        const sectionItems = allItems.slice(
            sectionStart,
            sectionStart + 15
        );

        console.log("York Best Time section:", sectionItems);

        // Helper function
        function updateText(selector, value) {

            const element = document.querySelector(selector);

            if (element && value) {
                element.textContent = value;
            }

        }

        // Main section content
        updateText(
            ".wp-york-season-eyebrow",
            sectionItems[0]
        );

        updateText(
            ".wp-york-season-title",
            sectionItems[1]
        );

        updateText(
            ".wp-york-season-description",
            sectionItems[2]
        );

        // Four seasons
        for (let i = 1; i <= 4; i++) {

            const baseIndex = 3 + ((i - 1) * 3);

            updateText(
                `.wp-york-season-months-${i}`,
                sectionItems[baseIndex]
            );

            updateText(
                `.wp-york-season-name-${i}`,
                sectionItems[baseIndex + 1]
            );

            updateText(
                `.wp-york-season-text-${i}`,
                sectionItems[baseIndex + 2]
            );

        }

        console.log(
            "York Best Time updated from WordPress."
        );

    } catch (error) {

        console.error(
            "York Best Time integration error:",
            error
        );

    }

})();
/* ==========================================
   YORK - TRAVEL TIPS WORDPRESS INTEGRATION
========================================== */

(async function () {

    // Run only on York page

    if (!document.querySelector(".york-tips")) {
        return;
    }

    console.log("York Travel Tips integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        if (!response.ok) {
            throw new Error("WordPress API response failed.");
        }

        const data = await response.json();

        const yorkPage = data.posts.find(
            page => page.slug === "york"
        );

        if (!yorkPage) {
            console.error("York WordPress page not found.");
            return;
        }

        const tempDiv = document.createElement("div");

        tempDiv.innerHTML = yorkPage.content;

        const allItems = Array.from(
            tempDiv.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, p, span, strong"
            )
        )
        .map(element => element.textContent.trim())
        .filter(text => text !== "");

        const startIndex = allItems.indexOf("TRAVEL SMART");

        if (startIndex === -1) {
            console.error("York Travel Tips content not found in WordPress.");
            return;
        }

        const tipsItems = allItems.slice(startIndex, startIndex + 15);

        console.log("York Travel Tips section:", tipsItems);

        // Section heading and description

        const eyebrow = document.querySelector(
            ".wp-york-tips-eyebrow"
        );

        const description = document.querySelector(
            ".wp-york-tips-description"
        );

        if (eyebrow && tipsItems[0]) {
            eyebrow.textContent = tipsItems[0];
        }

        if (description && tipsItems[2]) {
            description.textContent = tipsItems[2];
        }

        // Six travel tips

        for (let i = 1; i <= 6; i++) {

            const title = document.querySelector(
                `.wp-york-tip-title-${i}`
            );

            const text = document.querySelector(
                `.wp-york-tip-description-${i}`
            );

            const titleIndex = 2 + (i * 2) - 1;
            const descriptionIndex = titleIndex + 1;

            if (title && tipsItems[titleIndex]) {
                title.textContent = tipsItems[titleIndex];
            }

            if (text && tipsItems[descriptionIndex]) {
                text.textContent = tipsItems[descriptionIndex];
            }

        }

        console.log("York Travel Tips updated from WordPress.");

    } catch (error) {

        console.error("York Travel Tips error:", error);

    }

})();
/* ==========================================
   YORK - FAQ WORDPRESS INTEGRATION
========================================== */

(async function () {

    // Run only on York page

    if (!document.querySelector(".york-faq")) {
        return;
    }

    console.log("York FAQ integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        if (!response.ok) {
            throw new Error("WordPress API response failed.");
        }

        const data = await response.json();

        const yorkPage = data.posts.find(
            page => page.slug === "york"
        );

        if (!yorkPage) {
            console.error("York WordPress page not found.");
            return;
        }

        const tempDiv = document.createElement("div");

        tempDiv.innerHTML = yorkPage.content;

        const allItems = Array.from(
            tempDiv.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, p, span, strong"
            )
        )
        .map(element =>
            element.textContent.replace(/\s+/g, " ").trim()
        )
        .filter(Boolean);

        // Correct WordPress FAQ marker

        const startIndex = allItems.indexOf("FAQs");

        if (startIndex === -1) {
            console.error("York FAQ content not found in WordPress.");
            return;
        }

        // 2 heading items + 12 question/answer items

        const faqItems = allItems.slice(startIndex, startIndex + 14);

        console.log("York FAQ section:", faqItems);

        // FAQ HTML elements

        const eyebrow = document.querySelector(
            ".wp-york-faq-eyebrow"
        );

        const title = document.querySelector(
            ".wp-york-faq-title"
        );

        const description = document.querySelector(
            ".wp-york-faq-description"
        );

        // Keep existing eyebrow and title design

        if (eyebrow) {
            eyebrow.textContent = "HAVE QUESTIONS?";
        }

        if (title) {
            title.textContent = "York FAQs";
        }

        // Update description from WordPress

        if (description && faqItems[1]) {
            description.textContent = faqItems[1];
        }

        // Update six FAQ questions and answers

        for (let i = 1; i <= 6; i++) {

            const question = document.querySelector(
                `.wp-york-faq-question-${i}`
            );

            const answer = document.querySelector(
                `.wp-york-faq-answer-${i}`
            );

            const questionIndex = 2 + ((i - 1) * 2);
            const answerIndex = questionIndex + 1;

            if (question && faqItems[questionIndex]) {
                question.textContent = faqItems[questionIndex];
            }

            if (answer && faqItems[answerIndex]) {
                answer.textContent = faqItems[answerIndex];
            }

        }

        console.log("York FAQ updated from WordPress.");

    } catch (error) {

        console.error("York FAQ integration error:", error);

    }

})();
/* ==========================================
   YORK - FAQ ACCORDION FUNCTIONALITY
========================================== */

(function () {

    // Run only on York page

    const faqSection = document.querySelector(".york-faq");

    if (!faqSection) {
        return;
    }

    console.log("York FAQ accordion ready.");

    const faqItems = faqSection.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = question?.querySelector("i");

        if (!question || !answer) {
            return;
        }

        // Initially close all answers

        item.classList.remove("active");
        answer.style.display = "none";

        if (icon) {
            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");
        }

        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("active");

            // Close all FAQ items

            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                const otherAnswer = otherItem.querySelector(".faq-answer");
                const otherIcon = otherItem.querySelector(".faq-question i");

                if (otherAnswer) {
                    otherAnswer.style.display = "none";
                }

                if (otherIcon) {
                    otherIcon.classList.remove("fa-minus");
                    otherIcon.classList.add("fa-plus");
                }

            });

            // Open clicked FAQ if it was closed

            if (!isOpen) {

                item.classList.add("active");
                answer.style.display = "block";

                if (icon) {
                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");
                }

            }

        });

    });

})();
/* ==========================================
   YORK - FINAL CTA WORDPRESS INTEGRATION
========================================== */

(async function () {

    // Run only on York page
    if (!document.querySelector(".york-cta")) {
        return;
    }

    console.log("York CTA integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?type=page&number=20"
        );

        if (!response.ok) {
            throw new Error("WordPress API response failed.");
        }

        const data = await response.json();

        // Find York WordPress page
        const yorkPage = data.posts.find(function (page) {
            return page.slug === "york";
        });

        if (!yorkPage) {
            console.error("York WordPress page not found.");
            return;
        }

        // Extract WordPress content
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = yorkPage.content;

        const allItems = Array.from(
            tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6, p")
        )
        .map(function (element) {
            return element.textContent.replace(/\s+/g, " ").trim();
        })
        .filter(Boolean);

        // Find CTA section
        const startIndex = allItems.indexOf(
            "YOUR YORK ADVENTURE STARTS HERE"
        );

        if (startIndex === -1) {
            console.error("York CTA content not found in WordPress.");
            return;
        }

        const ctaItems = allItems.slice(startIndex, startIndex + 3);

        console.log("York CTA content:", ctaItems);

        // Select HTML elements
        const eyebrow = document.querySelector(
            ".wp-york-cta-eyebrow"
        );

        const title = document.querySelector(
            ".wp-york-cta-title"
        );

        const description = document.querySelector(
            ".wp-york-cta-description"
        );

        // Update eyebrow
        if (eyebrow && ctaItems[0]) {
            eyebrow.textContent = ctaItems[0];
        }

        // Update title and preserve highlighted span
        if (title && ctaItems[1]) {

            const titleSpan = title.querySelector("span");

            if (titleSpan) {

                const highlightedText = "Explore York?";

                titleSpan.textContent = highlightedText;

                title.childNodes[0].textContent =
                    ctaItems[1]
                    .replace(highlightedText, "")
                    .trim() + " ";

            } else {
                title.textContent = ctaItems[1];
            }
        }

        // Update description
        if (description && ctaItems[2]) {
            description.textContent = ctaItems[2];
        }

        console.log("York CTA updated from WordPress.");

    } catch (error) {

        console.error("York CTA integration error:", error);

    }

})();


/* ==========================================
   EXPLOREUK - WORDPRESS BLOG POSTS
========================================== */

document.addEventListener("DOMContentLoaded", async function () {

    const blogGrid = document.getElementById("blogGrid");

    // Run only on Blog page
    if (!blogGrid) {
        return;
    }

    console.log("WordPress Blog integration started.");

    try {

        const response = await fetch(
            "https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/?number=20&pretty=true"
        );

        if (!response.ok) {
            throw new Error("WordPress API response failed.");
        }

        const data = await response.json();

        const posts = (data.posts || []).filter(function (post) {
            return post.status === "publish" &&
                   post.type === "post" &&
                   post.slug !== "hello-world";
        });

        if (!posts.length) {
            console.log("No published WordPress blogs found.");
            return;
        }

        // Create blog cards
        const cards = posts.map(function (post) {

            const card = document.createElement("article");
            card.className = "blog-card";

            const title = document.createElement("h3");
            title.textContent = post.title || "ExploreUK Blog";

            const excerpt = document.createElement("p");

            const temp = document.createElement("div");
            temp.innerHTML = post.excerpt || "";
            excerpt.textContent = temp.textContent.trim();

            const categoryNames = Object.keys(post.categories || {});
            const categoryName = categoryNames[0] || "Destinations";

            const categoryMap = {
                "destinations": "destinations",
                "travel tips": "travel-tips",
                "travel-tips": "travel-tips",
                "experiences": "experiences",
                "food & culture": "food",
                "food": "food"
            };

            const categorySlug =
                categoryMap[categoryName.toLowerCase()] || "destinations";

            card.dataset.category = categorySlug;
            card.dataset.name = title.textContent + " " + excerpt.textContent;

            const imageBox = document.createElement("div");
            imageBox.className = "blog-card-image";

            if (post.featured_image) {

                const image = document.createElement("img");
                image.src = post.featured_image;
                image.alt = post.featured_image_alt || title.textContent;
                image.loading = "lazy";

                imageBox.appendChild(image);

            }

            const content = document.createElement("div");
            content.className = "blog-card-content";

            const category = document.createElement("span");
            category.className = "blog-card-category";
            category.textContent = categoryName;

            const meta = document.createElement("div");
            meta.className = "blog-card-meta";

            if (post.date) {
                meta.textContent = new Date(post.date).toLocaleDateString(
                    "en-GB",
                    { day: "numeric", month: "short", year: "numeric" }
                );
            }

            const link = document.createElement("a");
            link.className = "blog-read-more";
            link.href = post.URL || post.url || "#";
            link.textContent = "Read More";

            content.appendChild(category);
            content.appendChild(meta);
            content.appendChild(title);
            content.appendChild(excerpt);
            content.appendChild(link);

            card.appendChild(imageBox);
            card.appendChild(content);

            return card;

        });

        // Replace static cards only after successful API response
        blogGrid.replaceChildren(...cards);

        // Refresh search, filters and results count
        document.dispatchEvent(
            new Event("exploreuk:blogs-loaded")
        );

        console.log("WordPress blogs loaded:", posts.length);

    } catch (error) {

        console.error("WordPress Blog integration error:", error);

    }

});













