const inputMovie = document.getElementById("inputMovie")
const btnInputMovie = document.getElementById("btnInputMovie")
const poster = document.getElementById("poster")
const movieData = document.getElementById("movieData")
btnInputMovie.addEventListener("click", searchMovie);

let title, year, runtime, genre, director, imdbRating;

function searchMovie(){
axios.get("https://www.omdbapi.com/?t=" +  encodeURI(inputMovie.value)   + "&apikey=608f663f")
    .then(res => renderData(res))
}

function renderData(res){
    while(movieData.firstChild){
        movieData.removeChild(movieData.firstChild)
    }



    title = res.data["Title"];
    year = res.data["Year"];
    runtime = res.data["Runtime"];
    genre = res.data["Genre"];
    director = res.data["Director"];
    imdbRating = res.data["imdbRating"];
    poster.setAttribute("src", res.data["Poster"])

    const titleRender = document.createElement("ul");
    titleRender.setAttribute("id", "titleRender")
    titleRender.innerHTML = title;
    const yearRender = document.createElement("li");
    yearRender.innerHTML = "Year: " + year;
    const runtimeRender = document.createElement("li");
    runtimeRender.innerHTML = "Runtime: " + runtime;
    const genreRender = document.createElement("li");
    genreRender.innerHTML = "Genre: " + genre;
    const directorRender = document.createElement("li");
    directorRender.innerHTML = "Director: " + director;
    const imdbRatingRender = document.createElement("li");
    imdbRatingRender.innerHTML = "imdbRating: " + imdbRating;

    movieData.appendChild(titleRender);
    titleRender.appendChild(yearRender);
    titleRender.appendChild(runtimeRender);
    titleRender.appendChild(genreRender);
    titleRender.appendChild(directorRender);
    titleRender.appendChild(imdbRatingRender);
}