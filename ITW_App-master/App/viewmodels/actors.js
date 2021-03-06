define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //----------------------------------------------------------------------------------------------------------
 var ctor = function(){
        var self = this;
        var searchActorsUri = 'http://192.168.160.39/api/Actors/Search/';
        var actorsUri = 'http://192.168.160.39/api/Actors';
        var actorsCountUri = 'http://192.168.160.39/api/Actors/Count';
        var actorsLikesUri = 'http://192.168.160.39/api/Actors/Likes';
        self.searchText = ko.observable("");
        self.actors = ko.observableArray();
        self.actorsCount = ko.observable(null);
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
        getAllActors = function () {
            console.log('CALL: getAllActors...')
            ajaxHelper(actorsCountUri, 'GET').done(function (data) {
                self.actorsCount(data);
            });
            ajaxHelper(actorsUri, 'GET').done(function (data) {
                self.actors(data);
            });
        };
        clearActors = function () {
            getAllActors();
            self.searchText("");
        };

        getLikesActors = function () {
            console.log('CALL: searchActors/Likes...')
            ajaxHelper(actorsLikesUri, 'GET').done(function (data) {
                self.actors(data);
            });
        };

        searchActors = function () {
            console.log('CALL: searchActors...')
            ajaxHelper(searchActorsUri + self.searchText(), 'GET').done(function (data) {
                self.actors(data);
            });
        };
        //---- Chamada inicial
        getAllActors();
     document.body.style.backgroundImage = "url('http://netdna.copyblogger.com/images/improv-theatre.jpg')";
     document.body.style.backgroundPosition = "center";
     document.body.style.backgroundRepeat = "no-repeat";
     document.body.style.backgroundSize = "cover";



    };
 return ctor;
});
