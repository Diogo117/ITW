define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: false, menu : '<i class="fa fa-home"></i>' },
                { route: 'directors', moduleId: 'viewmodels/directors', nav: true, menu : '<i class="fa fa-bullhorn"></i>' },
                { route: 'actors', moduleId: 'viewmodels/actors', nav: true, menu : '<i class="fa fa-users"></i>' },
                { route: 'countries', moduleId: 'viewmodels/countries', nav: true, menu : '<i class="fa fa-map"></i>' },
                { route: 'movies', moduleId: 'viewmodels/movies', nav: true, menu : '<i class="fa fa-film"></i>' },
                { route: 'genres', moduleId: 'viewmodels/genres', nav: true, menu : '<i class="fa fa-cc"></i>' },
                { route: 'languages', moduleId: 'viewmodels/languages', nav: true, menu : '<i class="fa fa-sort-alpha-asc"></i>' },
                { route: 'languageDetails(/:languageID)', moduleId: 'viewmodels/languageDetails', nav: false, menu : '<i class="fa fa-sort-alpha-asc"></i>' },
                { route: 'countryDetails(/:countryID)', moduleId: 'viewmodels/countryDetails', nav: false, menu : '<i class="fa fa-sort-alpha-asc"></i>' },
                { route: 'genreDetails(/:genreID)', moduleId: 'viewmodels/genreDetails', nav: false, menu : '<i class="fa fa-sort-alpha-asc"></i>' },
                { route: 'actorDetails(/:actorID)', moduleId: 'viewmodels/actorDetails', nav: false, menu : '<i class="fa fa-cc"></i>', hash: "#actorDetails"},
                { route: 'directorDetails(/:directorID)', moduleId: 'viewmodels/directorDetails', nav: false, menu : '<i class="fa fa-cc"></i>', hash: "#directorDetails"},
                { route: 'movieDetails(/:movieID)', moduleId: 'viewmodels/movieDetails', nav: false, menu : '<i class="fa fa-cc"></i>', hash: "#movieDetails"}
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});
