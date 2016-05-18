
define(['knockout'], function (ko) {

    var threadClass = function(threadId, title, posts, link, createdAt) {

        var self = this;

        self.threadID = threadId;
        self.title = self.swapOutSpecialCharacters(title);
        
        self.posts= posts;
        
        

        self.link = link;


        //  convert the string date to a JS Date
        self.createdAt = new Date(Date.parse(createdAt));
        

        self.displayThread = function(){
            //  I don't display threads with fewer than 40 posts
            return self.posts > 40;
            
        }

/*
maybe I can "make a guess" based on the # of posts?

        //  a thread is only displayed if it has at least 1 top post
        self.isVisible = ko.computed(function(){
            return self.topPosts().length > 0;
        });
*/





    };

    threadClass.prototype.swapOutSpecialCharacters = function(text){

        return text
        .replace(/&amp;#039;/g, '\'')
        .replace(/&amp;quot;/g, '"');
    }

    return threadClass;

});