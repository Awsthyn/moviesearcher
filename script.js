const inputMovie = document.getElementById("inputMovie");
const btnInputMovie = document.getElementById("btnInputMovie");
const poster = document.getElementById("poster");
const movieData = document.getElementById("movieData");
const favoritesDisplay = document.getElementById("favoritesDisplay");
btnInputMovie.addEventListener("click", searchMovie);
const favorites = [];

let title, year, runtime, genre, director, imdbRating;

function searchMovie() {
  axios
    .get(
      "https://www.omdbapi.com/?t=" +
        encodeURI(inputMovie.value) +
        "&apikey=608f663f"
    )
    .then((res) => renderData(res));
}

function renderData(res) {
  while (movieData.firstChild) {
    movieData.removeChild(movieData.firstChild);
  }

  function addFav() {
    favorites.push({ title: title, img: poster.getAttribute("src") });
  }

  function renderFavs() {
      while(favoritesDisplay.firstChild){
          favoritesDisplay.removeChild(favoritesDisplay.firstChild);
      };
      favorites.map(movie => {
          const box = document.createElement('div');
          const img = document.createElement('img');
          box.classList.add("box");
          img.setAttribute("src", movie.img);
          img.classList.add("favImg")
          const p = document.createElement("p")
          p.innerHTML = movie.title;
          favoritesDisplay.appendChild(box);
          box.appendChild(img);
          box.appendChild(p);  
      })
  }

  title = res.data["Title"];
  year = res.data["Year"];
  runtime = res.data["Runtime"];
  genre = res.data["Genre"];
  director = res.data["Director"];
  imdbRating = res.data["imdbRating"];
  poster.setAttribute("src", res.data["Poster"]);

  const titleRender = document.createElement("ul");
  titleRender.setAttribute("id", "titleRender");
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

  btnFav = document.createElement("button");
  btnFav.setAttribute("id", "btnFav");
  btnFav.classList.add("plusBtn");
  btnFav.setAttribute("title", "Add to favorites")
  btnFav.innerHTML = "+";

  movieData.appendChild(btnFav);
  movieData.appendChild(titleRender);
  titleRender.appendChild(yearRender);
  titleRender.appendChild(runtimeRender);
  titleRender.appendChild(genreRender);
  titleRender.appendChild(directorRender);
  titleRender.appendChild(imdbRatingRender);
  

  btnFav.addEventListener("click", function(){
      addFav();
      renderFavs();
  });
}
