
define(['knockout'], function (ko) {

    return function viewThread(threadID, title, link, createdAt) {

        var self = this;

        self.threadID = threadID;
        self.title = ko.observable(title);
        self.link = ko.observable(link);

        //  convert the string date to a JS Date
        if(createdAt){
            self.createdAt = ko.observable(
                new Date(Date.parse(createdAt))
                );
        }
        else{
            self.createdAt = ko.observable('');
        }

        self.topPosts = ko.observableArray();

        //  a thread is only displayed if it has at least 1 top post
        self.isVisible = ko.computed(function(){
            return self.topPosts().length > 0;
        });

        

    };

});