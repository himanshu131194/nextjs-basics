export function Template() {
    return `<!doctype html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- Favicon -->
        <link rel="shortcut icon" href="https://landkit.goodthemes.co/assets/favicon/favicon.ico" type="image/x-icon" />
        <!-- Map CSS -->
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css" />
        <!-- Libs CSS -->
        <link rel="stylesheet" href="https://landkit.goodthemes.co/assets/css/libs.bundle.css" />
        <!-- Theme CSS -->
        <link rel="stylesheet" href="https://landkit.goodthemes.co/assets/css/theme.bundle.css" />
        <!-- Title -->
        <title>Landkit</title>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-156446909-2"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
                  function gtag() {
                    dataLayer.push(arguments);
                  }
                  gtag("js", new Date());
                  gtag("config", "UA-156446909-2");
        </script>
    </head>
    
    <body class="bg-light">
        <!-- MODALS -->
        <!-- Example -->
        <!-- Signup: Horizontal  -->
        <!-- Signup: Vertical  -->
        <!-- NAVBAR -->
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
            <div class="container">
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <!-- Toggler -->
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"> <i class="fe fe-x"></i>
                    </button>
                    <!-- Navigation -->
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item dropdown"> 
                            <a class="nav-link dropdown-toggle" id="navbarLandings" data-bs-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">
                                Page 1
                            </a>
                        </li>
                        <li class="nav-item dropdown"> 
                            <a class="nav-link dropdown-toggle" id="navbarLandings" data-bs-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">
                                Page 2
                            </a>
                        </li>
                        <li class="nav-item dropdown"> 
                            <a class="nav-link dropdown-toggle" id="navbarLandings" data-bs-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">
                                Page 3
                            </a>
                        </li>
                        <li class="nav-item dropdown"> 
                            <a class="nav-link dropdown-toggle" id="navbarLandings" data-bs-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">
                                Page 4
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- SEARCH -->
        <section class="py-6">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- Form -->
                        <form class="rounded shadow">
                            <div class="input-group input-group-lg">
                                <!-- Text --> <span class="input-group-text border-0 pe-1">
                            <i class="fe fe-search"></i>
                            </span>
                                <!-- Input -->
                                <input type="text" class="form-control border-0 px-1" id="search_keyword" aria-label="Search Movies..." placeholder="Search Movies...">
                                <!-- Text --> <span class="input-group-text border-0 py-0 ps-1 pe-3">
                                <!-- Text -->
                                <span class="h6 text-uppercase text-muted d-none d-md-block mb-0 me-5" id="total_results">
                                    123 results
                                </span>
                                <!-- Button -->
                                <button class="btn btn-sm btn-primary" id="search_movies">Search</button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- / .row -->
            </div>
        </section>
        <!-- ARTICLES -->
        <section>
            <div class="container">
                <div class="row" id="movies">

                </div>
                <!-- / .row -->
            </div>
            <!-- / .container -->
        </section>
        <!-- MORE -->
        <section class="py-7 py-md-10">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-9 col-lg-8 col-xl-7">
                        <!-- Button -->
                        <a href="#!" class="btn w-100 btn-outline-gray-300 d-flex align-items-center d-none" id="load_more"> <span class="mx-auto">Load more</span>  <i class="fe fe-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <!-- / .row -->
            </div>
            <!-- / .container -->
        </section>
        <!-- SHAPE -->
        <div class="position-relative">
            <div class="shape shape-bottom shape-fluid-x text-gray-200">
                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor" />
                </svg>
            </div>
        </div>
    </body>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        
        (function(){
            let page = 1;
            const loadMovies = async function(e){
                e.preventDefault();
                const eleId = e.target.id;
                if(eleId==="search_movies"){
                    $('#movies').html("");
                    page=1;
                }else{
                    ++page;
                }
                const searchedKeyword  = document.getElementById("search_keyword").value.trim(),
                    result = await fetch("/movies", {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ title : searchedKeyword, page: page})
                    }),
                    listOfMovies = await result.json();

                if(listOfMovies.Response){
                    listOfMovies.Search.forEach((movie)=>{
                        let movieBox = "<div class='col-12 col-md-6 col-lg-4 d-flex' id='movie_summary'>"+
                                            "<div class='card mb-6 shadow-light-lg lift lift-lg'>"+
                                                "<a class='card-img-top' href='#!'><img src="+movie.Poster+" alt='...' class='card-img-top'></a>"+
                                                "<a class='card-body' href='#!'>"+
                                                    "<h3>"+movie.Title+"</h3>"+
                                                    "<p class='mb-0 text-muted'></p>"+
                                                "</a>"+
                                            "</div>"+
                                        "</div>";  
                                        $('#movies').append(movieBox); 
                    });
                    document.getElementById("total_results").innerText = listOfMovies.totalResults + " RESULTS" || 0;
                    if(listOfMovies.totalResults>10){
                        document.getElementById("load_more").classList.remove("d-none");
                    }else{
                        document.getElementById("load_more").classList.add("d-none");
                    }
                }else{

                }
            }

            document.getElementById("search_movies").onclick = loadMovies;
            document.getElementById("load_more").onclick = loadMovies;


        }())
    </script>
    
    </html>`
}