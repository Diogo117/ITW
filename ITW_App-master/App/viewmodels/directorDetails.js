define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //----------------------------------------------------------------------------------------------------------
 var ctor = function(){

        var self = this;
        var url = location.hash;
        var id = url.split("/").pop();

        self.director = ko.observableArray(null);
        var directorUri = 'http://192.168.160.39/api/Directors/';
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
        getdirector = function () {
            console.log('CALL: getdirector...')
            ajaxHelper(directorUri + id, 'GET').done(function (data) {
                if (data[0].photo === "/images/nophoto.png"){
                    data[0].photo = "http://br.seaicons.com/wp-content/uploads/2016/08/Users-User-Male-2-icon.png";
                };

                if(data[0].movies != undefined){
                    for(var i =0; i< data[0].movies.length; i++){
                         if(data[0].movies != undefined){
                               if (data[0].movies[i].poster === "/images/nophoto.png" || !data[0].movies.poster){
                                   data[0].movies[i].poster = "http://www.hercampus.com/sites/default/files/2016/02/01/movie.png";
                               }
                         }
                     }
                };

                self.director(data);

            });
        };
        //---- Chamada inicial
        getdirector();

    };
 return ctor;
});
