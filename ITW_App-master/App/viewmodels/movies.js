define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //----------------------------------------------------------------------------------------------------------
 var ctor = function(){
        var self = this;
        var searchMoviesUri = 'http://192.168.160.39/api/Movies/Search/';
        var moviesUri = 'http://192.168.160.39/api/Movies';
        var moviesCountUri = 'http://192.168.160.39/api/Movies/Count';
        var moviesBudgetUri = 'http://192.168.160.39/api/Movies/Budget';
        var moviesGrossUri = 'http://192.168.160.39/api/Movies/Gross';
        self.searchText = ko.observable("");
        self.movies = ko.observableArray();
        self.moviesCount = ko.observable(null);
        self.error = ko.observable();
        self.searchTextGood = ko.computed(function () {
            return (self.searchText().length < 3)
        }, self);
        //--- Funções internas
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            })
        };

        //--- Funções visíveis do exterior
        getAllMovies = function () {
            console.log('CALL: getAllMovies...')
            ajaxHelper(moviesCountUri, 'GET').done(function (data) {
                self.moviesCount(data);
            });
            ajaxHelper(moviesUri, 'GET').done(function (data) {
                self.movies(data);
            });
        };
        clearMovies = function () {
            getAllMovies();
            self.searchText("");
        };

        getBudget = function () {
            console.log('CALL: searchMovies/Budget...')
            ajaxHelper(moviesBudgetUri, 'GET').done(function (data) {
                self.movies(data);
            });
        };

        getGross = function () {
            console.log('CALL: searchMovies/Gross...')
            ajaxHelper(moviesGrossUri, 'GET').done(function (data) {
                self.movies(data);
            });
        };
        searchMovies = function () {
            console.log('CALL: searchMovies...')
            ajaxHelper(searchMoviesUri + self.searchText(), 'GET').done(function (data) {
                self.movies(data);
            });
        };
        //---- Chamada inicial
        getAllMovies();
     document.body.style.backgroundImage = "url('http://wallpaper-gallery.net/images/wallpaper-movie/wallpaper-movie-21.jpg')";
     document.body.style.backgroundPosition = "center";
     document.body.style.backgroundSize = "cover";
     document.body.style.backgroundRepeat = "no-repeat";

    };
 return ctor;
});
