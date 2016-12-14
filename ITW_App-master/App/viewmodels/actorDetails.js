define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //----------------------------------------------------------------------------------------------------------
 var ctor = function(){

        var self = this;
        var url = location.hash;
        var id = url.split("/").pop();

        self.actor = ko.observableArray(null);
        var actorUri = 'http://192.168.160.39/api/Actors/';
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
        getactor = function () {
            console.log('CALL: getActor...')
            ajaxHelper(actorUri + id, 'GET').done(function (data) {
                if (data[0].photo === "/images/nophoto.png"){
                    data[0].photo = "http://br.seaicons.com/wp-content/uploads/2016/08/Users-User-Male-2-icon.png";
                }
                self.actor(data);

            });
        };
        //---- Chamada inicial
        getactor();

    };
 return ctor;
});
