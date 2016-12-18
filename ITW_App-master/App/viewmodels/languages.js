define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    //----------------------------------------------------------------------------------------------------------
 var ctor = function(){
        var self = this;
        var searchLanguagesUri = 'http://192.168.160.39/api/Languages/Search/';
        var languagesUri = 'http://192.168.160.39/api/Languages';
        var languagesCountUri = 'http://192.168.160.39/api/Languages/Count';
        self.searchText = ko.observable("");
        self.languages = ko.observableArray();
        self.languagesCount = ko.observable(null);
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
        getAllLanguages = function () {
            console.log('CALL: getAllLanguages...')
            ajaxHelper(languagesCountUri, 'GET').done(function (data) {
                self.languagesCount(data);
            });
            ajaxHelper(languagesUri, 'GET').done(function (data) {
                self.languages(data);
            });
        };
        clearLanguage = function () {
            getAllLanguages();
            self.searchText("");
        };
        searchLanguage = function () {
            console.log('CALL: searchLanguages...')
            ajaxHelper(searchLanguagesUri + self.searchText(), 'GET').done(function (data) {
                self.languages(data);
            });
        };
        //---- Chamada inicial
        getAllLanguages();
     document.body.style.backgroundImage = "url('https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/1/9/1420814719448/9272a86a-55b1-45b3-a84e-b8247ba98db4-1020x612.jpeg?w=300&q=55&auto=format&usm=12&fit=max&s=cbc2aa5a87a5418d46c16d4586a7f6e2')";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";

    };
 return ctor;
});
