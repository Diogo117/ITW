define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true, menu : '<i class="fa fa-home"></i>' },
                { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true, menu : '<i class="fa fa-flickr"></i>' },
                { route: 'directors', moduleId: 'viewmodels/directors', nav: true, menu : '<i class="fa fa-film"></i>' },
                { route: 'actors', moduleId: 'viewmodels/actors', nav: true, menu : '<i class="fa fa-users"></i>' }
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});
