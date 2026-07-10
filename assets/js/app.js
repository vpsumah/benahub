/* ==========================================================
   LUCIDE ICONS
   Transforme automatiquement les balises
   <i data-lucide="..."> en vrais SVG.
========================================================== */

lucide.createIcons();

/* ==========================================================
   LUCIDE ICONS
   Transforme les <i data-lucide="..."> en SVG.
========================================================== */

lucide.createIcons();


/* ==========================================================
   MENU BURGER
   Ouvre et ferme le menu principal.
========================================================== */

const menuButton = document.querySelector(".menu-button");
const siteMenu = document.querySelector(".site-menu");
/* Fond sombre derrière le menu. */
const menuOverlay = document.querySelector(".menu-overlay");

menuButton.addEventListener("click", function () {

    /* Ouvre ou ferme le panneau. */
    siteMenu.classList.toggle("is-open");

    /* Transforme le burger en X. */
    menuButton.classList.toggle("is-open");

    /* Affiche ou cache le fond sombre. */
    menuOverlay.classList.toggle("is-open");

});

/* ==========================================================
   MENU OVERLAY
   Ferme le menu lorsqu'on clique sur le fond sombre.
========================================================== */

menuOverlay.addEventListener("click", function () {

    /* Ferme le panneau. */
    siteMenu.classList.remove("is-open");

    /* Remet le burger à son état normal. */
    menuButton.classList.remove("is-open");

    /* Cache le fond sombre. */
    menuOverlay.classList.remove("is-open");

});

/* ==========================================================
   SERVICE MODAL
   Remplit et affiche une fenêtre selon le service choisi.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const serviceModal = document.getElementById("serviceModal");
    const closeModal = document.getElementById("closeModal");
    const serviceButtons = document.querySelectorAll(".service-more-button");

    const modalEyebrow = document.getElementById("modalEyebrow");
    const modalTitle = document.getElementById("modalTitle");
    const modalIntro = document.getElementById("modalIntro");
    const modalDuration = document.getElementById("modalDuration");
    const modalPrice = document.getElementById("modalPrice");
    const modalAge = document.getElementById("modalAge");
    const modalList = document.getElementById("modalList");
    const modalButton = document.getElementById("modalButton");

    if (!serviceModal || !closeModal || serviceButtons.length === 0) {
        return;
    }

    const services = {
        consultation: {
            eyebrow: "Consultation / Éducation",
            title: "Comprendre avant d'agir.",
            intro: "Un espace pour mieux comprendre un diagnostic, un neurotype ou une réalité psychologique, sans tomber dans les raccourcis ou les explications toutes faites.",
            duration: "50 minutes",
            price: "80 $",
            age: "13 ans et +",
            items: [
                "Tu viens de recevoir un diagnostic et tu veux mieux comprendre ce que ça signifie.",
                "Tu souhaites mieux comprendre le TDAH ou l'autisme.",
                "Tu veux accompagner quelqu'un avec plus de clarté, sans essayer de parler à sa place.",
                "Tu as besoin d'explications accessibles et adaptées à ta situation."
            ]
        },

        coaching: {
            eyebrow: "Soutien individuel & familial",
            title: "Construire un quotidien qui fonctionne mieux.",
            intro: "Un accompagnement pour réfléchir à des stratégies concrètes, améliorer certaines dynamiques et créer un quotidien plus adapté à la réalité de la personne ou de la famille.",
            duration: "50 minutes",
            price: "100 $",
            age: "13 ans et +",
            items: [
                "Tu veux améliorer l'organisation ou la structure du quotidien.",
                "Tu souhaites mieux communiquer dans ta famille ou dans une relation importante.",
                "Tu veux trouver des moyens concrets qui respectent les besoins de chacun.",
                "Tu cherches un accompagnement orienté vers des pistes pratiques."
            ]
        },

        intervention: {
            eyebrow: "Intervention psychosociale",
            title: "Traverser une période difficile avec un regard extérieur.",
            intro: "Un espace d'échange et de réflexion pour mieux comprendre ce que tu vis, mettre des mots sur certaines réactions et trouver des pistes adaptées à ta réalité.",
            duration: "50 minutes",
            price: "100 $",
            age: "16 ans et +",
            items: [
                "Tu traverses une période difficile ou confuse.",
                "Tu veux mieux comprendre certaines émotions, réactions ou comportements.",
                "Tu vis une difficulté relationnelle ou personnelle.",
                "Tu as besoin d'un espace pour réfléchir sans jugement."
            ]
        }
    };

    function openServiceModal(serviceKey) {
        const service = services[serviceKey];

        if (!service) {
            return;
        }

        modalEyebrow.textContent = service.eyebrow;
        modalTitle.textContent = service.title;
        modalIntro.textContent = service.intro;
        modalDuration.textContent = service.duration;
        modalPrice.textContent = service.price;
        modalAge.textContent = service.age;

        modalList.innerHTML = "";

        service.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            modalList.appendChild(li);
        });

        serviceModal.classList.add("active");
    }

    serviceButtons.forEach(button => {

        button.addEventListener("click", () => {

            const serviceKey = button.dataset.service;

            openServiceModal(serviceKey);

        });

    });

    closeModal.addEventListener("click", () => {
        serviceModal.classList.remove("active");
    });

    serviceModal.addEventListener("click", (event) => {

        if (event.target === serviceModal) {
            serviceModal.classList.remove("active");
        }

    });

});

/* ==========================================================
   BENA SEARCH
   Recherche simple dans les contenus du Hub.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchResultsInfo = document.getElementById("searchResultsInfo");
    const relatedResults = document.getElementById("relatedResults");

    if (!searchInput || !searchResults || !searchResultsInfo || !relatedResults) {
        return;
    }

    function normalize(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function getIcon(type) {
        const icons = {
            video: "tv-minimal-play",
            book: "book-open",
            tool: "wrench",
            article: "file-search-corner",
            deepdive: "layers",
            service: "heart-handshake",
            dossier: "folder",
            seriesp: "file-play"
        };

        return icons[type] || "search";
    }

    function renderResults(query) {
        const cleanQuery = normalize(query.trim());

        searchResults.innerHTML = "";
        relatedResults.innerHTML = "";

        if (cleanQuery.length === 0) {
            searchResultsInfo.textContent = "Écris un mot-clé pour commencer.";
            return;
        }

        const results = benaContent.filter(item => {
            const searchableText = normalize([
                item.title,
                item.formatLabel,
                item.category,
                item.description,
                item.keywords.join(" ")
            ].join(" "));

            return searchableText.includes(cleanQuery);
        });

        searchResultsInfo.textContent =
            `${results.length} résultat${results.length > 1 ? "s" : ""} trouvé${results.length > 1 ? "s" : ""}.`;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-result-card">
                    <div class="search-result-icon">
                        <i data-lucide="search-x"></i>
                    </div>

                    <div class="search-result-content">
                        <h3>Aucun résultat pour l'instant</h3>
                        <p>Le Hub continue de grandir. Essaie un autre mot-clé ou une idée proche.</p>
                    </div>
                </div>
            `;
        }

        results.forEach(item => {
            const card = document.createElement("a");
            card.href = item.url;
            card.className = "search-result-card";

            card.innerHTML = `
                <div class="search-result-icon">
                    <i data-lucide="${getIcon(item.type)}"></i>
                </div>

                <div class="search-result-content">
                    <h3>${item.title}</h3>
                    <p class="search-result-meta">${item.formatLabel} · ${item.category}</p>
                    <p>${item.description}</p>
                </div>
            `;

            searchResults.appendChild(card);
        });

        renderRelated(cleanQuery, results);

        lucide.createIcons();
    }

    
/* ----------------------------------------------------------
   Suggestions automatiques
   Regarde les keywords des résultats trouvés
   et propose les sujets qui reviennent le plus souvent.
---------------------------------------------------------- */

function renderRelated(query, results) {

    relatedResults.innerHTML = "";

    const cleanQuery = normalize(query);

    const ignoredWords = [
        cleanQuery,
        "relation",
        "relations",
        "cerveau",
        "humain",
        "sujet",
        "contenu",
        "vidéo",
        "youtube",
        "patreon"
    ];

    const keywordCounts = {};

    results.slice(0, 8).forEach(item => {

        const uniqueKeywords = [...new Set(item.keywords)];

        uniqueKeywords.forEach(keyword => {

            const cleanKeyword = normalize(keyword);

            if (ignoredWords.includes(cleanKeyword)) {
                return;
            }

            if (!keywordCounts[keyword]) {
                keywordCounts[keyword] = 0;
            }

            keywordCounts[keyword]++;

        });

    });

    const suggestions = Object.entries(keywordCounts)
        .filter(([keyword, count]) => count >= 2)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([keyword]) => keyword);

    if (suggestions.length === 0) {
        return;
    }

    relatedResults.innerHTML = `
        <h3>Tu pourrais aussi explorer...</h3>

        <div class="related-tags">
            ${suggestions.map(topic => `
                <button type="button" data-topic="${topic}">
                    ${topic}
                </button>
            `).join("")}
        </div>
    `;

    relatedResults.querySelectorAll("button").forEach(button => {

        button.addEventListener("click", () => {

            searchInput.value = button.dataset.topic;

            renderResults(button.dataset.topic);

        });

    });

}




    searchInput.addEventListener("input", () => {
        renderResults(searchInput.value);
    });

    /* ==========================================================
   Recherche via l'URL
   Exemple : recherche.html?q=tdah
========================================================== */

const params = new URLSearchParams(window.location.search);
const query = params.get("q");

if (query) {
    searchInput.value = query;
    renderResults(query);
}

});

/* ==========================================================
   HOME SEARCH
   Recherche rapide affichée sur l'accueil.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const homeSearchInput = document.getElementById("homeSearchInput");
    const homeSearchResults = document.getElementById("homeSearchResults");

    if (!homeSearchInput || !homeSearchResults || typeof benaContent === "undefined") {
        return;
    }

    function normalize(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function getIcon(type) {
        const icons = {
            video: "play",
            book: "book-open",
            tool: "wrench",
            article: "file-text",
            deepdive: "layers",
            service: "heart-handshake"
        };

        return icons[type] || "search";
    }

    function renderHomeSearch(query) {
        const cleanQuery = normalize(query.trim());

        homeSearchResults.innerHTML = "";

        if (cleanQuery.length < 2) {
            return;
        }

        const results = benaContent.filter(item => {
            const searchableText = normalize([
                item.title,
                item.formatLabel,
                item.category,
                item.description,
                item.keywords.join(" ")
            ].join(" "));

            return searchableText.includes(cleanQuery);
        }).slice(0, 4);

        if (results.length === 0) {
            homeSearchResults.innerHTML = `
                <div class="home-search-result">
                    <div class="home-search-result-icon">
                        <i data-lucide="search-x"></i>
                    </div>

                    <div>
                        <h3>Aucun résultat pour l'instant. Du contenu s'ajoute régulièrement</h3>
                        <p>Essaie un mot proche?</p>
                    </div>
                </div>
            `;

            lucide.createIcons();
            return;
        }

        results.forEach(item => {
            const result = document.createElement("a");
            result.href = item.url;
            result.className = "home-search-result";

            result.innerHTML = `
                <div class="home-search-result-icon">
                    <i data-lucide="${getIcon(item.type)}"></i>
                </div>

                <div>
                    <h3>${item.title}</h3>
                    <p>${item.formatLabel} · ${item.category}</p>
                </div>
            `;

            homeSearchResults.appendChild(result);
        });

        const moreLink = document.createElement("a");
        moreLink.href = `recherche.html?q=${encodeURIComponent(query)}`;
        moreLink.className = "home-search-more";
        moreLink.textContent = "Voir tous les résultats →";

        homeSearchResults.appendChild(moreLink);

        lucide.createIcons();
    }

    homeSearchInput.addEventListener("input", () => {
        renderHomeSearch(homeSearchInput.value);
    });

    homeSearchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && homeSearchInput.value.trim() !== "") {
            window.location.href = `recherche.html?q=${encodeURIComponent(homeSearchInput.value.trim())}`;
        }
    });

/* ==========================================================
   Recherche via l'URL
   Exemple :
   recherche.html?q=tdah
========================================================== */

const params = new URLSearchParams(window.location.search);

const query = params.get("q");
console.log("Query URL :", query);

if (query) {

    searchInput.value = query;

    renderResults(query);

}



});

/* ==========================================================
   CONCEPT TREE
   Arborescence simple sur commencer.html.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const treeButtons = document.querySelectorAll("[data-tree]");
    const treeBreadcrumb = document.getElementById("treeBreadcrumb");
    const treeContainer = document.getElementById("treeContainer");

    if (!treeButtons.length || !treeBreadcrumb || !treeContainer) {
        return;
    }

    const conceptTree = {

    tdah: {
        label: "TDAH",
        children: [
            { label: "Explorer le TDAH en général", search: "tdah" },
            {
                label: "Fonctions exécutives",
                children: [
                    { label: "Initiation de tâche", search: "initiation de tâche" },
                    { label: "Planification", search: "planification" },
                    { label: "Gestion du temps", search: "gestion du temps" },
                    { label: "Mémoire de travail", search: "mémoire de travail" }
                ]
            },
            { label: "Motivation", search: "motivation" },
            { label: "Procrastination", search: "procrastination" },
            { label: "Hyperfocus", search: "hyperfocus" },
            { label: "Dopamine", search: "dopamine" },
            { label: "Organisation", search: "organisation" },
            { label: "TDAH et autisme", search: "audhd" }
        ]
    },

    autisme: {
        label: "Autisme",
        children: [
            { label: "Explorer l'autisme en général", search: "autisme" },
            { label: "Diagnostic adulte", search: "diagnostic adulte" },
            { label: "Masking", search: "masking" },
            { label: "Communication", search: "communication" },
            { label: "Sensibilités sensorielles", search: "sensibilités sensorielles" },
            { label: "Routines", search: "routines" },
            { label: "Précarité financière", search: "précarité financière" },
            { label: "TDAH et autisme", search: "audhd" }
        ]
    },

    anxiete: {
        label: "Anxiété",
        children: [
            { label: "Explorer l'anxiété en général", search: "anxiété" },
            { label: "Rumination", search: "rumination" },
            { label: "Hypervigilance", search: "hypervigilance" },
            { label: "Besoin de contrôle", search: "besoin de contrôle" },
            { label: "Réassurance", search: "réassurance" },
            { label: "Stress", search: "stress" },
            { label: "Système nerveux", search: "système nerveux" }
        ]
    },

    relations: {
        label: "Relations humaines",
        children: [
            { label: "Explorer les relations en général", search: "relations" },
            { label: "Communication", search: "communication" },
            { label: "Attachement", search: "attachement" },
            { label: "Dépendance affective", search: "dépendance affective" },
            { label: "Réassurance", search: "réassurance" },
            { label: "Rejet", search: "rejet" },
            { label: "Limites", search: "limites" },
            { label: "Gentillesse", search: "gentillesse" }
        ]
    },

    motivation: {
    label: "Motivation",
    children: [
        { label: "Explorer la motivation", search: "motivation" },
        { label: "Procrastination", search: "procrastination" },
        { label: "Discipline", search: "discipline" },
        { label: "Effort", search: "effort" },
        { label: "Dopamine", search: "dopamine" },
        { label: "Fonctions exécutives", search: "fonctions exécutives" }
    ]
},

    communication: {
        label: "Communication",
        children: [
            { label: "Explorer la communication", search: "communication" },
            { label: "Validation", search: "validation" },
            { label: "Sous-entendus", search: "sous-entendu" },
            { label: "Non-dits", search: "non-dit" },
            { label: "Interprétation", search: "interprétation" },
            { label: "Conflits", search: "conflits" }
        ]
    },

    societe: {
        label: "Société",
        children: [
            { label: "Explorer les contenus société", search: "société" },
            { label: "Productivité", search: "productivité" },
            { label: "Phrases toxiques", search: "phrases toxiques" },
            { label: "Précarité", search: "précarité" },
            { label: "Travail", search: "travail" },
            { label: "Normalisation", search: "normalisation" }
        ]
    },

    rejet: {
        label: "J'ai peur du rejet",
        children: [
            { label: "Explorer le rejet", search: "rejet" },
            { label: "Douleur sociale", search: "douleur sociale" },
            { label: "Attachement", search: "attachement" },
            { label: "Réassurance", search: "réassurance" },
            { label: "Validation", search: "validation" },
            { label: "Estime de soi", search: "estime de soi" }
        ]
    },

    reassurance: {
        label: "J'ai besoin d'être rassuré",
        children: [
            { label: "Explorer la réassurance", search: "réassurance" },
            { label: "Validation émotionnelle", search: "validation émotionnelle" },
            { label: "Attachement anxieux", search: "attachement anxieux" },
            { label: "Dépendance affective", search: "dépendance affective" },
            { label: "Peur de l'abandon", search: "peur de l'abandon" },
            { label: "Anxiété", search: "anxiété" }
        ]
    },

    procrastination: {
        label: "Je procrastine souvent",
        children: [
            { label: "Explorer la procrastination", search: "procrastination" },
            { label: "Motivation", search: "motivation" },
            { label: "Fonctions exécutives", search: "fonctions exécutives" },
            { label: "Initiation de tâche", search: "initiation de tâche" },
            { label: "Perfectionnisme", search: "perfectionnisme" },
            { label: "Fatigue mentale", search: "fatigue mentale" }
        ]
    },

    culpabilite: {
        label: "Je me sens souvent coupable",
        children: [
            { label: "Explorer la culpabilité", search: "culpabilité" },
            { label: "Prendre soin de soi", search: "prendre soin de soi" },
            { label: "Limites", search: "limites" },
            { label: "Gentillesse", search: "gentillesse" },
            { label: "Estime de soi", search: "estime de soi" },
            { label: "Besoins", search: "besoins" }
        ]
    },

    limites: {
        label: "J'ai du mal à dire non",
        children: [
            { label: "Explorer les limites", search: "limites" },
            { label: "Dire non", search: "dire non" },
            { label: "Gentillesse", search: "gentillesse" },
            { label: "Faire plaisir", search: "faire plaisir" },
            { label: "Affirmation de soi", search: "affirmation de soi" },
            { label: "Respect", search: "respect" }
        ]
    },

    attachement: {
    label: "J'ai peur de perdre les autres",
    children: [
        { label: "Explorer l'attachement", search: "attachement" },
        { label: "Attachement anxieux", search: "attachement anxieux" },
        { label: "Dépendance affective", search: "dépendance affective" },
        { label: "Réassurance", search: "réassurance" },
        { label: "Peur de l'abandon", search: "peur de l'abandon" },
        { label: "Rejet", search: "rejet" }
    ]
},

    conflits: {
        label: "Je vis beaucoup de conflits",
        children: [
            { label: "Explorer les conflits", search: "conflits" },
            { label: "Communication", search: "communication" },
            { label: "Validation", search: "validation" },
            { label: "Écoute active", search: "écoute active" },
            { label: "Sous-entendus", search: "sous-entendu" },
            { label: "Relations", search: "relations" }
        ]
    },

    emotions: {
        label: "Comprendre mes émotions",
        children: [
            { label: "Explorer les émotions", search: "émotions" },
            { label: "Anxiété", search: "anxiété" },
            { label: "Culpabilité", search: "culpabilité" },
            { label: "Stress", search: "stress" },
            { label: "Roue des émotions", search: "roue des émotions" },
            { label: "Validation émotionnelle", search: "validation émotionnelle" }
        ]
    },

    besoins: {
        label: "Identifier mes besoins",
        children: [
            { label: "Explorer les besoins", search: "besoins" },
            { label: "Sécurité", search: "sécurité" },
            { label: "Repos", search: "repos" },
            { label: "Appartenance", search: "appartenance" },
            { label: "Limites", search: "limites" },
            { label: "Prendre soin de soi", search: "prendre soin de soi" }
        ]
    },

    valeurs: {
        label: "Découvrir mes valeurs",
        children: [
            { label: "Explorer les valeurs", search: "valeurs" },
            { label: "Choix", search: "choix" },
            { label: "Sens", search: "sens de la vie" },
            { label: "Identité", search: "identité" },
            { label: "Développement personnel", search: "développement personnel" }
        ]
    },

    estime: {
        label: "Développer mon estime de moi",
        children: [
            { label: "Explorer l'estime de soi", search: "estime de soi" },
            { label: "Confiance en soi", search: "confiance en soi" },
            { label: "Rejet", search: "rejet" },
            { label: "Validation", search: "validation" },
            { label: "Culpabilité", search: "culpabilité" }
        ]
    },

    identite: {
        label: "Réfléchir à mon identité",
        children: [
            { label: "Explorer l'identité", search: "identité" },
            { label: "Image de soi", search: "image de soi" },
            { label: "Diagnostic adulte", search: "diagnostic adulte" },
            { label: "Souffrance", search: "souffrance" },
            { label: "Acceptation", search: "acceptation" }
        ]
    },

    fonctionnement: {
        label: "Comprendre mon fonctionnement",
        children: [
            { label: "Explorer mon fonctionnement", search: "comprendre son fonctionnement" },
            { label: "TDAH", search: "tdah" },
            { label: "Autisme", search: "autisme" },
            { label: "Fonctions exécutives", search: "fonctions exécutives" },
            { label: "Émotions", search: "émotions" },
            { label: "Besoins", search: "besoins" }
        ]
    }

};

    function renderNode(node, path = []) {

    if (path.length <= 1) {
        treeBreadcrumb.innerHTML = "";
    } else {
        treeBreadcrumb.innerHTML = path.map((item, index) => `
            <button class="tree-breadcrumb-button" type="button" data-path-index="${index}">
                ${item.label}
            </button>
        `).join(" <span>›</span> ");
    }

    treeContainer.innerHTML = `
        <div class="tree-panel">

            <h2>${node.label}</h2>

            <div class="tree-options">
                ${node.children.map((child, index) => `
                    <button class="tree-option" type="button" data-index="${index}">
                        <span>${child.label}</span>
                        <i data-lucide="${child.children ? "chevron-right" : "search"}"></i>
                    </button>
                `).join("")}
            </div>

        </div>
    `;

    lucide.createIcons();

    treeBreadcrumb.querySelectorAll(".tree-breadcrumb-button").forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.pathIndex);
            const selectedPath = path.slice(0, index + 1);
            const selectedNode = selectedPath[selectedPath.length - 1].node;

            renderNode(selectedNode, selectedPath);
        });
    });

    treeContainer.querySelectorAll(".tree-option").forEach(button => {
        button.addEventListener("click", () => {
            const child = node.children[button.dataset.index];

            if (child.children) {
                renderNode(child, [...path, { label: child.label, node: child }]);
            } else {
                window.location.href = `recherche.html?q=${encodeURIComponent(child.search)}`;
            }
        });
    });
}

    treeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            const treeKey = button.dataset.tree;
            const node = conceptTree[treeKey];

            if (!node) {
                return;
            }

            renderNode(node, [{ label: node.label, node: node }]);

            treeContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

});

/* ==========================================================
   BOOK MODAL
   Ouvre une fiche détaillée pour chaque livre.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const bookModal = document.getElementById("bookModal");
    const closeBookModal = document.getElementById("closeBookModal");
    const bookModalContent = document.getElementById("bookModalContent");
    const bookButtons = document.querySelectorAll(".book-modal-button");

    if (!bookModal || !closeBookModal || !bookModalContent || bookButtons.length === 0) {
        return;
    }

    const books = {
        "365jours": {
            title: "365 jours qui font réfléchir",
            subtitle: "Une année d'introspection pour faire du ménage dans notre tête et dans notre vie.",
            cover: "assets/images/books/365jours.jpg",
            year: "2022",
            backCover: "13 thèmes, 365 questions différentes pour vous comprendre et avancer.",
            previewPages: [
                "assets/images/books/extraits/365jours-page1.jpg",
                "assets/images/books/extraits/365jours-page2.jpg",
                "assets/images/books/extraits/365jours-page3.jpg"
            ],
            links: {
                amazonEbook: "#",
                amazonPaper: "https://www.amazon.ca/365-jours-font-r%C3%A9fl%C3%A9chir-dintrospection/dp/298189742X/",
                chaptersPaper: "https://www.indigo.ca/products/365-jours-qui-font-reflechir?variant=46436100800722"
            }
        },

        "tldrcegep": {
            title: "Le TLDR du passage du Secondaire au CÉGEP",
            subtitle: "Ce qu'on ne nous dit pas sur le CÉGEP.",
            cover: "assets/images/books/tldrcegep.jpg",
            year: "2020",
            backCover: "Un livre pour aider à mieux comprendre la transition entre le secondaire et le CÉGEP.",
            previewPages: [
                "assets/images/books/extraits/tldrcegep-page1.jpg",
                "assets/images/books/extraits/tldrcegep-page2.jpg",
                "assets/images/books/extraits/tldrcegep-page3.jpg"
            ],
            links: {
                amazonEbook: "https://www.amazon.ca/TL-passage-secondaire-C%C3%89GEP-French-ebook/dp/B08HM9D7ZP/",
                amazonPaper: "https://www.amazon.ca/TL-DR-passage-secondaire-C%C3%89GEP/dp/2981897403/",
                chaptersPaper: "https://www.indigo.ca/products/le-tl-dr-du-passage-du-secondaire-au-cegep?variant=46571308843218"
            }
        }
    };

    function createBuyButton(url, label) {
        if (!url || url === "#") {
            return "";
        }

        return `
            <a href="${url}" class="button button-primary" target="_blank" rel="noopener">
                ${label}
            </a>
        `;
    }

    function openBookModal(bookKey) {
        const book = books[bookKey];

        if (!book) {
            return;
        }

        bookModalContent.innerHTML = `
            <div class="book-modal-layout">

                <div class="book-modal-cover">
                    <img src="${book.cover}" alt="Couverture du livre ${book.title}">
                </div>

                <div class="book-modal-main">

                    <p class="modal-eyebrow">Livre</p>

                    <h2>${book.title}</h2>

                    <p class="book-modal-subtitle">
                        ${book.subtitle}
                    </p>

                    <div class="modal-info-grid">
                        <div>
                            <strong>Publication</strong>
                            <span>${book.year}</span>
                        </div>

                        <div>
                            <strong>Formats</strong>
                            <span>Ebook / Papier</span>
                        </div>

                        <div>
                            <strong>Disponibilité</strong>
                            <span>Amazon / Chapters</span>
                        </div>
                    </div>

                    <h3>4e de couverture</h3>

                    <p class="modal-intro">
                        ${book.backCover}
                    </p>

                </div>

            </div>

            <h3>Feuilleter quelques pages</h3>

            <div class="book-preview-grid">
                ${book.previewPages.map((page, index) => `
                    <img src="${page}" alt="Extrait page ${index + 1} du livre ${book.title}">
                `).join("")}
            </div>

            <h3>Acheter le livre</h3>

            <div class="book-buy-grid">
    ${createBuyButton(book.links.amazonEbook, "Amazon - Ebook")}
    ${createBuyButton(book.links.amazonPaper, "Amazon - Papier")}
    ${createBuyButton(book.links.chaptersPaper, "Chapters - Papier")}
</div>

<div class="book-modal-footer">
    <p>
        Merci de soutenir mes livres. Chaque achat aide BENA à continuer de créer du contenu accessible, nuancé et humain.
    </p>
</div>
        `;

        activatePreviewImages(book.previewPages);
        bookModal.classList.add("active");

        lucide.createIcons();
    }


    function activatePreviewImages(pages) {
        const previewModal = document.getElementById("previewModal");
        const closePreviewModal = document.getElementById("closePreviewModal");
        const previewImage = document.getElementById("previewImage");
        const previewCounter = document.getElementById("previewCounter");
        const previewPrev = document.getElementById("previewPrev");
        const previewNext = document.getElementById("previewNext");

        const previewImages = bookModalContent.querySelectorAll(".book-preview-grid img");

        let currentIndex = 0;

        if (!previewModal || !closePreviewModal || !previewImage || !previewCounter || !previewPrev || !previewNext) {
            return;
        }

        function showPreview(index) {
            currentIndex = index;

            previewImage.src = pages[currentIndex];
            previewCounter.textContent = `Page ${currentIndex + 1} / ${pages.length}`;

            previewModal.classList.add("active");

            lucide.createIcons();
        }

        previewImages.forEach((image, index) => {
            image.addEventListener("click", () => {
                showPreview(index);
            });
        });

        previewPrev.onclick = () => {
            currentIndex = currentIndex === 0 ? pages.length - 1 : currentIndex - 1;
            showPreview(currentIndex);
        };

        previewNext.onclick = () => {
            currentIndex = currentIndex === pages.length - 1 ? 0 : currentIndex + 1;
            showPreview(currentIndex);
        };

        closePreviewModal.onclick = () => {
            previewModal.classList.remove("active");
        };

        previewModal.onclick = event => {
            if (event.target === previewModal) {
                previewModal.classList.remove("active");
            }
        };

        document.onkeydown = event => {
            if (!previewModal.classList.contains("active")) {
                return;
            }

            if (event.key === "Escape") {
                previewModal.classList.remove("active");
            }

            if (event.key === "ArrowLeft") {
                currentIndex = currentIndex === 0 ? pages.length - 1 : currentIndex - 1;
                showPreview(currentIndex);
            }

            if (event.key === "ArrowRight") {
                currentIndex = currentIndex === pages.length - 1 ? 0 : currentIndex + 1;
                showPreview(currentIndex);
            }
        };
    }




    bookButtons.forEach(button => {
        button.addEventListener("click", () => {
            openBookModal(button.dataset.book);
        });
    });

    closeBookModal.addEventListener("click", () => {
        bookModal.classList.remove("active");
    });

    bookModal.addEventListener("click", event => {
        if (event.target === bookModal) {
            bookModal.classList.remove("active");
        }
    });

});

/* ==========================================================
   DEEP DIVE / DOSSIER LIBRARY
   Génère et filtre la page dossiers.html.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const libraryGrid = document.getElementById("libraryGrid");
    const librarySearch = document.getElementById("librarySearch");
    const libraryCount = document.getElementById("libraryCount");
    const libraryFilters = document.querySelectorAll(".library-filter");

    if (!libraryGrid || !librarySearch || !libraryCount || libraryFilters.length === 0) {
        return;
    }

    const libraryItems = [
        {
            title: "La procrastination",
            description: "Ça vient de où? Pourquoi on le vit? Et quoi faire?",
            type: "Deep Dive",
            filterType: "deepdive",
            category: "tdah",
            image: "assets/images/read/fusee.png",
            url: "https://www.patreon.com/BENA_explique/posts/deep-dive-la-160425512",
            keywords: "procrastination tdah motivation fonctions exécutives initiation tâche"
        },
        {
            title: "L'anxiété",
            description: "Ça vient de où? Pourquoi on le vit? Et quoi faire?",
            type: "Deep Dive",
            filterType: "deepdive",
            category: "anxiete",
            image: "assets/images/read/pissenlit.png",
            url: "https://www.patreon.com/BENA_explique/posts/deep-dive-161444748",
            keywords: "anxiété stress rumination hypervigilance système nerveux"
        },
        {
            title: "Quand la douleur devient ton identité",
            description: "Quand la douleur n'est plus seulement quelque chose qu'on vit, mais qui devient qui nous sommes.",
            type: "Dossier",
            filterType: "dossier",
            category: "identite",
            image: "assets/images/read/shards.png",
            url: "https://www.patreon.com/BENA_explique/posts/dossier-quand-la-162244974",
            keywords: "douleur identité souffrance trauma estime soi"
        },
        {
            title: "La dépendance affective",
            description: "Quand on peine à vivre sans l'autre.",
            type: "Deep Dive",
            filterType: "deepdive",
            category: "relations",
            image: "assets/images/read/relation-chaine.png",
            url: "https://www.patreon.com/BENA_explique/posts/deep-dive-la-162429063",
            keywords: "dépendance affective relations attachement peur abandon réassurance"
        }
    ];

    let activeFilter = "all";

    function normalize(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function renderLibrary() {
        const query = normalize(librarySearch.value.trim());

        const filteredItems = libraryItems.filter(item => {
            const matchesFilter =
                activeFilter === "all" ||
                item.filterType === activeFilter ||
                item.category === activeFilter;

            const searchableText = normalize(`
                ${item.title}
                ${item.description}
                ${item.type}
                ${item.category}
                ${item.keywords}
            `);

            const matchesSearch = searchableText.includes(query);

            return matchesFilter && matchesSearch;
        });

        libraryGrid.innerHTML = "";

        libraryCount.textContent =
            `${filteredItems.length} contenu${filteredItems.length > 1 ? "s" : ""} trouvé${filteredItems.length > 1 ? "s" : ""}.`;

        if (filteredItems.length === 0) {
            libraryGrid.innerHTML = `
                <div class="search-result-card">
                    <div class="search-result-icon">
                        <i data-lucide="search-x"></i>
                    </div>

                    <div class="search-result-content">
                        <h3>Aucun contenu trouvé</h3>
                        <p>Essaie un autre mot-clé ou retire un filtre.</p>
                    </div>
                </div>
            `;

            lucide.createIcons();
            return;
        }

        filteredItems.forEach(item => {
            const card = document.createElement("a");

            card.href = item.url;
            card.className = "library-card-link";
            card.target = "_blank";
            card.rel = "noopener";

            card.innerHTML = `
                <article class="reading-card">

                    <div class="reading-image">
                        <img src="${item.image}" alt="Illustration pour ${item.title}">
                        <span class="reading-badge">${item.type}</span>
                    </div>

                    <div class="reading-content">
                        <h3>${item.title}</h3>

                        <p>${item.description}</p>

                        <div class="reading-meta">
                            <span><i data-lucide="circle"></i> Patreon</span>
                            <i data-lucide="lock"></i>
                        </div>
                    </div>

                </article>
            `;

            libraryGrid.appendChild(card);
        });

        lucide.createIcons();
    }

    librarySearch.addEventListener("input", renderLibrary);

    libraryFilters.forEach(button => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.filter;

            libraryFilters.forEach(filter => {
                filter.classList.remove("is-active");
            });

            button.classList.add("is-active");

            renderLibrary();
        });
    });

    renderLibrary();

});

/* ==========================================================
   LATEST YOUTUBE VIDEO
   Affiche automatiquement la dernière vidéo YouTube.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const latestVideoCard = document.getElementById("latestVideoCard");
    const latestVideoEmbed = document.getElementById("latestVideoEmbed");
    const latestVideoTitle = document.getElementById("latestVideoTitle");
    const latestVideoDate = document.getElementById("latestVideoDate");
    const latestVideoLink = document.getElementById("latestVideoLink");

   if (!latestVideoCard || !latestVideoEmbed || !latestVideoTitle || !latestVideoDate || !latestVideoLink) {
    return;
}

    fetch("/youtube")
        .then(response => response.json())
        .then(videos => {

            const latestVideo = videos[0];

            if (!latestVideo) {
                return;
            }

            latestVideoEmbed.src = latestVideo.embed;
latestVideoEmbed.title = latestVideo.title;

            latestVideoTitle.textContent = latestVideo.title;

            latestVideoLink.href = latestVideo.url;
            latestVideoLink.target = "_blank";
            latestVideoLink.rel = "noopener";

            const publishedDate = new Date(latestVideo.published);

            latestVideoDate.textContent = `Publiée le ${publishedDate.toLocaleDateString("fr-CA", {
                year: "numeric",
                month: "long",
                day: "numeric"
            })}.`;

        })
        .catch(error => {
            console.error("Erreur YouTube :", error);

            latestVideoTitle.textContent = "Impossible de charger la dernière vidéo.";
            latestVideoDate.textContent = "Tu peux quand même visiter la chaîne YouTube de BENA.";
            latestVideoLink.href = "https://www.youtube.com/@BENA.explique";
        });

});

/* ==========================================================
   WATCH PAGE YOUTUBE VIDEOS
   Remplit automatiquement la page Regarder.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const youtubeVideoGrid = document.getElementById("youtubeVideoGrid");

    if (!youtubeVideoGrid) {
        return;
    }

    fetch("/youtube")
        .then(response => response.json())
        .then(videos => {

            const normalVideos = videos.filter(video => !video.isShort).slice(0, 4);

            youtubeVideoGrid.innerHTML = "";

            normalVideos.forEach(video => {

                const card = document.createElement("article");
                card.className = "video-card";

                card.innerHTML = `
                    <a href="${video.url}" class="video-card-link" target="_blank" rel="noopener">

                        <div class="video-thumbnail">
                            <img src="${video.thumbnail}" alt="Miniature de la vidéo ${video.title}">
                        </div>

                        <div class="video-info">
                            <h3>${video.title}</h3>
                            <p>Vidéo publiée sur la chaîne YouTube BENA.</p>
                        </div>

                    </a>
                `;

                youtubeVideoGrid.appendChild(card);

            });

        })
        .catch(error => {
            console.error("Erreur YouTube page Regarder :", error);

            youtubeVideoGrid.innerHTML = `
                <div class="search-result-card">
                    <div class="search-result-icon">
                        <i data-lucide="search-x"></i>
                    </div>

                    <div class="search-result-content">
                        <h3>Impossible de charger les vidéos.</h3>
                        <p>Tu peux quand même visiter la chaîne YouTube de BENA.</p>
                    </div>
                </div>
            `;

            lucide.createIcons();
        });

});

/* ==========================================================
   WATCH PAGE YOUTUBE PLAYLISTS
   Met à jour les cartes de playlists automatiquement.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const playlistCards = document.querySelectorAll(".playlist-card[data-playlist]");

    if (playlistCards.length === 0) {
        return;
    }

    const playlistMap = {
        tdah: ["tdah"],
        autisme: ["autisme"],
        relations: ["relation"],
        sante: ["santé", "sante", "mental"]
    };

    function normalize(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function findPlaylist(playlists, key) {
        const keywords = playlistMap[key];

        return playlists.find(playlist => {
            const title = normalize(playlist.title);

            return keywords.some(keyword => title.includes(normalize(keyword)));
        });
    }

    fetch("/playlists")

fetch("/playlists")
    .then(response => response.json())
    .then(playlists => {

        console.log("Playlists reçues :", playlists);

            playlistCards.forEach(card => {
                const key = card.dataset.playlist;
                const playlist = findPlaylist(playlists, key);

                if (!playlist) {
                    return;
                }

                const countText = `${playlist.count} vidéo${playlist.count > 1 ? "s" : ""}`;

                const badge = card.querySelector(".playlist-badge span");
                const contentText = card.querySelector(".playlist-content p");

                if (badge) {
                    badge.textContent = countText;
                }

                if (contentText) {
                    contentText.textContent = countText;
                }

                card.addEventListener("click", () => {
                    window.open(playlist.url, "_blank", "noopener");
                });

                card.setAttribute("role", "link");
                card.setAttribute("tabindex", "0");

                card.addEventListener("keydown", event => {
                    if (event.key === "Enter") {
                        window.open(playlist.url, "_blank", "noopener");
                    }
                });
            });

        })
        .catch(error => {
            console.error("Erreur playlists YouTube :", error);
        });

});

/* ==========================================================
   WATCH PAGE REELS
========================================================== */

const reelCards = document.querySelectorAll(".reel-card");
console.log("Reel cards trouvées :", reelCards.length);

if (reelCards.length > 0) {

    fetch("/reels")
        .then(response => response.json())
        .then(reels => {

            console.log("Reels reçus :", reels);

            reelCards.forEach((card, index) => {

                const reel = reels[index];

                if (!reel) return;

                card.querySelector("a").href = reel.url;
                card.querySelector("a").target = "_blank";
                card.querySelector("a").rel = "noopener";

                card.querySelector("img").src = reel.thumbnail;
                card.querySelector("img").alt = reel.title;

                card.querySelector("h3").textContent = reel.title;

            });

        })
        .catch(error => {
            console.error("Erreur Reels :", error);
        });

}

/* ==========================================================
   WATCH PAGE REELS
   Remplit automatiquement les Shorts / Reels.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const reelCards = document.querySelectorAll(".reel-card");

    if (reelCards.length === 0) {
        return;
    }

    fetch("/reels")
        .then(response => response.json())
        .then(reels => {

            reelCards.forEach((card, index) => {

                const reel = reels[index];

                if (!reel) {
                    return;
                }

                const link = card.querySelector(".reel-link");
                const image = card.querySelector(".reel-thumbnail img");
                const title = card.querySelector("h3");
                const duration = card.querySelector(".reel-duration");

                if (link) {
                    link.href = reel.url;
                    link.target = "_blank";
                    link.rel = "noopener";
                }

                if (image) {
                    image.src = reel.thumbnail;
                    image.alt = `Miniature du short ${reel.title}`;
                }

                if (title) {
                    title.textContent = reel.title;
                }

                if (duration) {
                    duration.textContent = "Short";
                }

            });

        })
        .catch(error => {
            console.error("Erreur Reels :", error);
        });

});