define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //----------------------------------------------------------------------------------------------------------
 var ctor = function(){
        var self = this;
        var searchDirectorsUri = 'http://192.168.160.39/api/Directors/Search/';
        var directorsUri = 'http://192.168.160.39/api/Directors';
        var directorsLikesUri = 'http://192.168.160.39/api/Directors/Likes';
        var directorsCountUri = 'http://192.168.160.39/api/Directors/Count';
        self.searchText = ko.observable("");
        self.directors = ko.observableArray();
        self.directorsCount = ko.observable(null);
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
        getAllDirectors = function () {
            console.log('CALL: getAllDirectors...')
            ajaxHelper(directorsCountUri, 'GET').done(function (data) {
                self.directorsCount(data);
            });
            ajaxHelper(directorsUri, 'GET').done(function (data) {
                self.directors(data);
            });
        };
        clearDirectors = function () {
            getAllDirectors();
            self.searchText("");
        };

        getLikesDirectors = function () {
            console.log('CALL: searchDirectors/Likes...')
            ajaxHelper(directorsLikesUri, 'GET').done(function (data) {
                self.directors(data);
            });
        };

        searchDirectors = function () {
            console.log('CALL: searchDirectors...')
            ajaxHelper(searchDirectorsUri + self.searchText(), 'GET').done(function (data) {
                self.directors(data);
            });
        };
        //---- Chamada inicial
        getAllDirectors();
     document.body.style.backgroundImage = "url('http://orig13.deviantart.net/ee13/f/2015/032/7/3/director_s_chair_by_jeorgebgeorge-d8gdf8h.jpg')";
     document.body.style.backgroundPosition = "center";
     document.body.style.backgroundSize = "cover";
     document.body.style.backgroundRepeat = "no-repeat";
    };
 return ctor;
});
