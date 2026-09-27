let movies = [];


// -------------------------------------
// GOOGLE SHEET SETTINGS
// -------------------------------------

const sheetId = "1Z_T1C-Cg2ktjbohfpnIJ0Vxhgt3PKr6DQVqDiTxfNN8";
const sheetName = "movies";


// -------------------------------------
// PAGE ELEMENTS
// -------------------------------------

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const movieCount = document.getElementById("movieCount");

const coverButton = document.getElementById("coverButton");
const listButton = document.getElementById("listButton");


// -------------------------------------
// LOAD GOOGLE SHEET
// -------------------------------------

google.charts.load("current");

google.charts.setOnLoadCallback(loadMovies);


function loadMovies() {

    const sheetURL =
        `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${encodeURIComponent(sheetName)}&headers=1`;

    const query = new google.visualization.Query(sheetURL);

    query.send(handleQueryResponse);
}


// -------------------------------------
// HANDLE GOOGLE SHEET DATA
// -------------------------------------

function handleQueryResponse(response) {

    if (response.isError()) {

        console.error(
            "Google Sheets error:",
            response.getMessage(),
            response.getDetailedMessage()
        );

        movieContainer.innerHTML =
            "<p>Could not load the movie collection.</p>";

        return;
    }


    const data = response.getDataTable();

    movies = [];


    for (let row = 0; row < data.getNumberOfRows(); row++) {

        const title = data.getValue(row, 0);

        // Ignore completely blank rows
        if (!title) {
            continue;
        }


        const movie = {

            title:
                String(title).trim(),

            year:
                data.getFormattedValue(row, 1),

            format:
                data.getFormattedValue(row, 2),

            genre:
                data.getFormattedValue(row, 3),

            cover:
                data.getFormattedValue(row, 4),

            favorite:
                data.getFormattedValue(row, 5),

            watched:
                data.getFormattedValue(row, 6),

            notes:
                data.getFormattedValue(row, 7)

        };


        movies.push(movie);
    }


    // Automatically alphabetize
    movies.sort((a, b) =>
        a.title.localeCompare(
            b.title,
            undefined,
            {
                ignorePunctuation: true
            }
        )
    );


    displayMovies(movies);
}


// -------------------------------------
// DISPLAY MOVIES
// -------------------------------------

function displayMovies(movieList) {

    movieContainer.innerHTML = "";


    movieCount.textContent =
        `${movieList.length} movie${movieList.length === 1 ? "" : "s"}`;


    movieList.forEach(movie => {

        const card =
            document.createElement("div");

        card.classList.add("movie-card");


        // If you have not added a cover yet,
        // use a temporary blank image.

        const coverImage =
            movie.cover ||
            "https://placehold.co/300x450?text=No+Cover";


        card.innerHTML = `

            <img
                src="${coverImage}"
                alt="${movie.title} cover"
            >

            <div class="movie-info">

                <h2 class="movie-title">
                    ${movie.title}
                </h2>

                <div class="movie-details">

                    ${movie.year || ""}
                    ${movie.year && movie.format ? " • " : ""}
                    ${movie.format || ""}
                    ${movie.genre ? " • " + movie.genre : ""}

                </div>

            </div>
        `;


        movieContainer.appendChild(card);
    });
}


// -------------------------------------
// SEARCH
// -------------------------------------

searchInput.addEventListener("input", () => {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredMovies =
        movies.filter(movie =>

            movie.title
                .toLowerCase()
                .includes(searchTerm)

        );


    displayMovies(filteredMovies);
});


// -------------------------------------
// COVER VIEW
// -------------------------------------

coverButton.addEventListener("click", () => {

    movieContainer.classList.remove("list-view");

});


// -------------------------------------
// LIST VIEW
// -------------------------------------

listButton.addEventListener("click", () => {

    movieContainer.classList.add("list-view");

});

// Automatically alphabetize the movies
movies.sort((a, b) =>
    a.title.localeCompare(b.title, undefined, {
        ignorePunctuation: true
    })
);


const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const movieCount = document.getElementById("movieCount");

const coverButton = document.getElementById("coverButton");
const listButton = document.getElementById("listButton");


// Display the movies
function displayMovies(movieList) {

    movieContainer.innerHTML = "";

    movieCount.textContent =
        `${movieList.length} movie${movieList.length === 1 ? "" : "s"}`;

    movieList.forEach(movie => {

        const card = document.createElement("div");

        card.classList.add("movie-card");

        card.innerHTML = `
            <img
                src="${movie.cover}"
                alt="${movie.title} cover"
            >

            <div class="movie-info">

                <h2 class="movie-title">
                    ${movie.title}
                </h2>

                <div class="movie-details">
                    ${movie.year} • ${movie.format} • ${movie.genre}
                </div>

            </div>
        `;

        movieContainer.appendChild(card);
    });
}


// Search
searchInput.addEventListener("input", () => {

    const searchTerm =
        searchInput.value.toLowerCase().trim();

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
    );

    displayMovies(filteredMovies);
});


// Cover view
coverButton.addEventListener("click", () => {

    movieContainer.classList.remove("list-view");

});


// List view
listButton.addEventListener("click", () => {

    movieContainer.classList.add("list-view");

});


// Initial display
displayMovies(movies);
