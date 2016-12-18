define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //----------------------------------------------------------------------------------------------------------
 var ctor = function(){
        var self = this;
        var searchGenresUri = 'http://192.168.160.39/api/Genres/Search/';
        var genresUri = 'http://192.168.160.39/api/Genres';
        var genresCountUri = 'http://192.168.160.39/api/Genres/Count';
        self.searchText = ko.observable("");
        self.genres = ko.observableArray();
        self.genresCount = ko.observable(null);
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
        getAllGenres = function () {
            console.log('CALL: getAllGenres...')
            ajaxHelper(genresCountUri, 'GET').done(function (data) {
                self.genresCount(data);
            });
            ajaxHelper(genresUri, 'GET').done(function (data) {
                self.genres(data);
            });
        };
        clearGenres = function () {
            getAllGenres();
            self.searchText("");
        };
        searchGenres = function () {
            console.log('CALL: searchGenres...')
            ajaxHelper(searchGenresUri + self.searchText(), 'GET').done(function (data) {
                self.genres(data);
            });
        };
        //---- Chamada inicial
        getAllGenres();
     document.body.style.backgroundImage = "url('http://previews.123rf.com/images/kentoh/kentoh1006/kentoh100600672/7207407-Movie-Poster-of-Film-Genres-Vintage-Background-Stock-Photo-movie-cinema-movies.jpg')";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";

    };
 return ctor;
});
