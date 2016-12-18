define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //----------------------------------------------------------------------------------------------------------
 var ctor = function(){

        var self = this;
        var url = location.hash;
        var id = url.split("/").pop();

        self.country = ko.observableArray(null);
        var countryUri = 'http://192.168.160.39/api/Countries/';
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
        getcountry = function () {
            console.log('CALL: getcountry...')
            ajaxHelper(countryUri + id, 'GET').done(function (data) {
                for(var i =0; i< data[0].moviesCount; i++){
                    if(data[0].movies[i] != undefined){
                          if (data[0].movies[i].poster === "/images/nophoto.png" || !data[0].movies.poster){
                              data[0].movies[i].poster = "http://www.hercampus.com/sites/default/files/2016/02/01/movie.png";
                          }
                    }

                };
                self.country(data);

            });
        };
        //---- Chamada inicial
        getcountry();

    };
 return ctor;
});
