


require.config({
    baseUrl: 'js/',
    paths: {

        //  third-party libraries
        'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
        //'knockout.deprecated': 'lib/knockout/knockout-doesnt-exist',
        'knockout': 'lib/knockout/knockout-3.0.0',

        'underscore': 'lib/underscore/underscore-min',
        //'parse': 'http://www.parsecdn.com/js/parse-1.1.15.min',

        //  bringing in bootstrap JS via the CDN
        'bootstrap': 'http://netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min',
        


        //  model objects
        'thread': 'models/Thread',
        'post': 'models/Post',
        
        'viewModel': 'pages/index/viewModel',
        'viewThread': 'pages/index/viewThread'

    },

    shim: {
        'bootstrap': ['jquery']
    },
    
    urlArgs: "run 02/8/14"
});




require(['viewModel', 'knockout', 'thread', 'jquery', 'bootstrap'], function (Viewmodel, ko, Thread) {

    var vm = new Viewmodel();
    
    $(function () {

        //  clear session storage (so the user gets the latest data from the API)
        sessionStorage.clear();

        ko.applyBindings(vm);

        defineTabSelectEventHandler();

        //  display the first tab's contents on page load
        $('#myTab a:first').tab('show');

    });


    function defineTabSelectEventHandler(){


        //  event handler when selecting tabs
        $('#tabSection').on( 'shown.bs.tab', '#myTab a[data-toggle="tab"]', function (e) {
            //console.log(e.target); // activated tab

            var disqusShortName = e.target.hash.replace('#', '');

            $("#divThreads").fadeOut(200, function(){ 

                vm.showThreadsLoading(true);
                vm.retrieveTopThreads(disqusShortName);
            });


            

            //  fade in the list of threads
            //$("#divThreads").fadeIn(1000, function(){ alert('did it');});

            


        })

    }
});