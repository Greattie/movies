const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const mainInfo = document.getElementById("main-info");

async function getMovies() {
  try {
    const url = await fetch(
      `https://yts.mx/api/v2/list_movies.json?quality=3D`
    );
    const data = await url.json();
    //console.log(data);
    const movies = data.data.movies;
    movies.forEach((movie) => {
      const { title, large_cover_image, year, summary, id } = movie;

      const movieElem = document.createElement("div");
      movieElem.classList.add("movie");
      movieElem.innerHTML = `
<img src='${large_cover_image}' alt='${title}' onClick='showMovies(id)'  />
<div class='text'>
<p>${title}</p>
<p>${year}</p>
</div>
`;

      main.appendChild(movieElem);
    });
    return { newData: data };
  } catch (err) {
    console.log("Err", err);
    return { errMsg: err };
  }
}

getMovies();

async function showMovies(movieId) {
  try {
    const newApi = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`
    );
    const newApiData = await newApi.json();
    const movieData = newApiData.data.movie;
    console.log(movieData);
    //const large_cover_image = movieData
    const { large_cover_image, title, description_full, year, genres } =
      movieData;

    const movieDetails = document.createElement("section");
    movieDetails.innerHTML = `
<div class="movie-img">
  <img src='${large_cover_image}' alt='${title}'>
 </div>

 <div class="movie-details">
 <h1>${title}</h1>

 <div class="text">
     <p>${year}</p>
     <p>${genres}</p>
 </div>  
 <div class="summary">
     ${description_full}
 </div>
</div>
`;

    mainInfo.appendChild(movieDetails);
    // movieData.forEach((movie)=>{
    //   const {large_cover_image, title, description_full} = movie

    //   const movieDetails = document.createElement('section')

    //   mainInfo.appendChild(movieDetails)
    // })
  } catch (error) {
    console.log("Err", error);
    return { errMsg: error };
  }
}

showMovies(1);

//let searchValue = "Black";

// `form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const searchValue = search.value;
//   if (searchValue && searchValue !== "") {
//     getMovies(searchValue);
//     searchValue = "";
//   } else {
//     window.location.reload();
//   }
// });`
