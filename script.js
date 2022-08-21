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
    console.log(data);
    const movies = data.data.movies;
    //console.log(move)
    movies.forEach((movie) => {
      const {
        title,
        large_cover_image,
        year,
        medium_cover_image,
        small_cover_image,
        summary,
        genres,
      } = movie;

      const movieElem = document.createElement("div");
      movieElem.classList.add("movie");
      const image = document.createElement("img");
      const text = document.createElement("h3");

      movieElem.innerHTML = `
<img src='${large_cover_image}' alt='${title}' />
<div class='text'>
<p>${title}</p>
<p>${year}</p>
</div>
`;

// const movieInfo = document.createElement('section')
// movieInfo.innerHTML =`
// <div class="movie-img">
// <img src='${large_cover_image}' alt='${title}' />
// </div>
// <div class="movie-details">
// <h1>${title}</h1>
// <div class="text">
// <p>${genres}</p>
// <p>${year}</p>
// </div>
// <div class="summary">
// ${summary}
// </div>
// </div>
// `

      main.appendChild(movieElem);
      //mainInfo.appendChild(movieInfo)
    });
    return { newData: data };
  } catch (err) {
    console.log("Err", err);
    return { errMsg: err };
  }
}

getMovies();

// form.addEventListener('submit', (e)=>{
//   e.preventDefault()
//   const searchValue = search.value
//   if(searchValue && searchValue !==''){
//     getMovies(searchValue)
//     searchValue = ''
//   }else{
//     window.location.reload()
//   }
// })
