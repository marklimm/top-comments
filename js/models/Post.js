
define(['knockout', 'underscore'], function (ko) {

    //return function Post(postId, message, likes, dislikes, username, createdAt, mediaArr) {
    var postClass = function(postId, message, likes, dislikes, username, createdAt, mediaArr) {

        var self = this;

        self.postID = postId;
        self.message = message;
        self.likes = likes;
        self.dislikes = dislikes;
        
        //self.author = username;
        self.author = (username === undefined ? "" : username);
        
        var totalVotes = self.likes + self.dislikes;
        self.likePercentage = self.likes / totalVotes;

        self.score = self.likes - self.dislikes;

        //  convert the string date to a JS Date
        self.createdAt = new Date(Date.parse(createdAt));

        self.imageUrls = self.retrieveImageUrls(mediaArr);


        /*
        self.isAGoodPost = function(){

            //  I define a good post as one that has at least 85% of voters liked and with at least 8 likes

            var goodPercentage = self.likePercentage > 0.80;

            
            var meetsMinimumScore = self.score > 9;

            return goodPercentage && meetsMinimumScore;
        };

        function retrieveImageUrls(mediaArr){
            
            return _.map(mediaArr, function(mediaObj){

                if(mediaObj.url.indexOf("youtube.com") !== -1 || 
                    mediaObj.url.indexOf("youtu.be/") !== -1 ){ return null; }

                return mediaObj.url.replace(/^\/\//, 'http://'); 
            });

        }*/

    };

    postClass.prototype.isAGoodPost = function(){

        //  I define a good post as one that has at least 85% of voters liked and with at least 8 likes

        var goodPercentage = this.likePercentage > 0.80;

        
        var meetsMinimumScore = this.score > 9;

        return goodPercentage && meetsMinimumScore;
    }

    postClass.prototype.retrieveImageUrls = function(mediaArr){
        
        return _.map(mediaArr, function(mediaObj){

            if(mediaObj.url.indexOf("youtube.com") !== -1 || 
                mediaObj.url.indexOf("youtu.be/") !== -1 ){ return null; }

            return mediaObj.url.replace(/^\/\//, 'http://'); 
        });

    }

    return postClass;

});