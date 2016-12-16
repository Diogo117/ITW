define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //----------------------------------------------------------------------------------------------------------
 var ctor = function(){

        var self = this;
        var url = location.hash;
        var id = url.split("/").pop();

        self.movie = ko.observableArray(null);
        var movieUri = 'http://192.168.160.39/api/Movies/';
        self.error = ko.observable();
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
        getmovie = function () {
            console.log('CALL: getActor...')
            ajaxHelper(movieUri + id, 'GET').done(function (data) {
                if (data[0].poster === "/images/noposter.png"){
                    data[0].poster = "http://www.hercampus.com/sites/default/files/2016/02/01/movie.png";
                }
                self.movie(data);

            });
        };
        //---- Chamada inicial
        getmovie();

    };
 return ctor;
});
