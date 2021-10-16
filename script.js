  

 const API_KEY = 'api_key=3b770c66093ef966e815eb7bd011c41e';
 const BASE_URL = 'https://api.themoviedb.org/3';
 const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' +API_KEY;
 const IMG_URL = 'https://image.tmdb.org/t/p/w500';
 const searchURL = BASE_URL + '/search/movie?' +API_KEY;

 const main = document.getElementById('main');
 const form = document.getElementById('form');
 const search = document.getElementById('search');
 //PASSING API KEY AS A PARAMETER

 //when the function load we want to call a function getmovies
getMovies(API_URL);

 function getMovies(url){
     fetch(url).then(res=> res.json()).then(data=>{
         console.log(data.results);
        //console.log(data);
    
        showMovies(data.results);
     })

 }

 function showMovies(data){
     main.innerHTML = '';
  data.forEach(movie =>{
    const{title,poster_path,vote_average,overview} = movie
    const movieE1 = document.createElement('div');
    movieE1.classList.add('movie');
    movieE1.innerHTML = `<img src="${IMG_URL+poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                </div>
                <div class ="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>`



                main.appendChild(movieE1);
  })
}

function getColor(vote){
    if(vote >=8)
    {
        return 'green'
    }else if(vote >=5)
    {
        return 'orange'
    }else
    {
       return 'red' 
    }
}

//when form is submited listen to the event

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else
    {
        getMovies(API_URL)
    }
})