
define(['thread', 'post', 'viewThread', 'knockout', 'underscore', 'jquery'], 
    function (Thread, Post, viewThread, ko) {
    
    return function viewModel() {

        var self = this;


        //  disqus public key removed
        
        
        self.threads = ko.observableArray();

        self.selectedThread = ko.observable(new viewThread());

        self.showThreadsLoading = ko.observable(false);
        self.showPostsLoading = ko.observable(false);


        self.threadHasNoTopComments = ko.computed(function(){

            //  this can't be answered with true if content is still loading
            if(self.showPostsLoading()){ return false; }

            return self.selectedThread().topPosts().length === 0;
        })
        
        self.retrieveTopThreads = function(disqusShortname){
            
            self.disqusShortname = disqusShortname;
            
            if(sessionStorage.getItem(disqusShortname)){

                //  read array from session storage
                var threadsArr = JSON.parse(sessionStorage.getItem(disqusShortname));
                
                bindThreadsToUI(threadsArr);  

                return ;
            }

            //  if execution reaches this point then the selected forum/disqusShortname's threads are not stored in sessionStorage, and we need to pull them from the disqus API


            $.ajax({
                type: 'GET',

				//  url removed
                data: { 
                    api_key: disqusPublicKey, 
                    forum : disqusShortname,
                    limit : 45
                },

                cache: false,
                dataType: 'jsonp',
                success: function (result) {

                    var threadsArr = [];

                    _.each(result.response, function(disqusThread){

                        var thread = new Thread(disqusThread.id, disqusThread.title, disqusThread.posts, disqusThread.link, disqusThread.createdAt);

                        if(thread.displayThread()){
                            threadsArr.push(thread);
                        }

                    });
                    
                    //  sort threads by date descending
                    threadsArr = _.sortBy(threadsArr, function(thread){

                        return -thread.createdAt;
                    });



                    //  write array to session storage
                    //sessionStorage.setItem(self.disqusShortname, JSON.stringify(threadsArr));
                    sessionStorage.setItem(self.disqusShortname, ko.toJSON(threadsArr));
                

                    bindThreadsToUI(threadsArr);
    
                },
                error: function(err){
    
                    console.log(err);
                }
            });
            
        }

        self.threadMousedOver = function(threadInstance){


            self.selectedThread(
                new viewThread(
                    threadInstance.threadID,
                    threadInstance.title, 
                    threadInstance.link,
                    threadInstance.createdAt)
                );


            $("#threadDetailsDiv").fadeOut(200, function(){ 

                //  read from cache ...
                if(sessionStorage.getItem(threadInstance.threadID)){

                    //  read array from session storage
                    var postsArr = JSON.parse(sessionStorage.getItem(threadInstance.threadID));
                    
                    bindPostsToUI(postsArr);

                    return;
                }


                //  loading gif/spinner START
                self.showPostsLoading(true);

                //  ... or retrieve from disqus API
                retrieveTopPostsForThread(threadInstance.threadID);

            });


        }



        function retrieveTopPostsForThread(threadID){


            $.ajax({
                type: 'GET',
                
                //  url removed
                data: { 
                    api_key: disqusPublicKey, 
                    forum : this.disqusShortname,
                    thread : threadID,
                    order : 'best',
                    limit : 15,
                    interval : '30d'
                },
                cache: false,
                dataType: 'jsonp',
                success: function (result) {
    
                    var postsArr = [];

                    _.each(result.response, function(topPost){
                       
                        var currPost = new Post(topPost.id, topPost.message, topPost.likes, topPost.dislikes, topPost.author.username, topPost.createdAt, topPost.media);

                        if(currPost.isAGoodPost()){

                            postsArr.push(currPost);
                        }
                        
                    });
                    
                                        
                    //  sort posts by total votes descending
                    postsArr = _.sortBy(postsArr, function(post){

                        return -post.score;
                    });



                    //  write array to session storage
                    sessionStorage.setItem(threadID, JSON.stringify(postsArr));
                

                    bindPostsToUI(postsArr);
                    

    
                },
                error: function(err){
    
                    console.log(err);
                }
            });

        }

        function bindThreadsToUI(threadsArr){

            self.showThreadsLoading(false);

            $("#divThreads").fadeIn(200);

            //  clear out any threads that were previously being displayed
            self.threads.removeAll();

            //  this will work, I guess because I don't reset self.threads to ko.observableArray()
            _.each(threadsArr, function(thread){
                self.threads.push(thread);
            });
        }

        function bindPostsToUI(postsArr){


            //  loading gif/spinner END
            self.showPostsLoading(false);

            $("#threadDetailsDiv").fadeIn(200);

            //  clear before populating with the current thread's top posts
            self.selectedThread().topPosts.removeAll();

            //  add top posts for the currently selected thread
            _.each(postsArr, function(post){
                self.selectedThread().topPosts.push(post);
            });

        }

    };

});