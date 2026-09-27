const movies = [
    {
        title: "Shrek",
        year: 2001,
        format: "DVD",
        genre: "Animation",
        cover: "https://placehold.co/300x450?text=Shrek"
    },

    {
        title: "Coraline",
        year: 2009,
        format: "DVD",
        genre: "Animation",
        cover: "https://placehold.co/300x450?text=Coraline"
    },

    {
        title: "Twilight",
        year: 2008,
        format: "DVD",
        genre: "Romance",
        cover: "https://placehold.co/300x450?text=Twilight"
    },

    {
        title: "The Mummy",
        year: 1999,
        format: "DVD",
        genre: "Adventure",
        cover: "https://placehold.co/300x450?text=The+Mummy"
    }
];


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