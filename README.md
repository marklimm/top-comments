# top-comments
A client-side knockoutJS application that pulls data from the disqus API.  The top "threads" for each news website are displayed, and within those the top comments are displayed

I was looking for a cool programming project to work on and I ended up searching for "cool APIs".  I found out about disqus - a commenting system used by blogs and news sources - and discovered that they had an API.  I went ahead and implemented a client-side interface for viewing the top comments associated with individual news articles from several different well-known news sources.

Looking back on it, this was one of the most fun projects that I worked on.  It provided me access to a new set of information that I didn't have, and I have been using this on a regular basis to keep up with the news for years now.

Some notable things:
- using JS prototypical inheritance to add methods to my custom "Thread" and "Post" JS objects
- determining whether to display a post/comment, and how to order a list of posts based on how many likes vs. dislikes that they have
- storing retrieved disqus API data in sessionStorage
- using knockoutJS to bind the list of threads and posts to the UI
- using requireJS to organize individual JS files into AMD modules

Tech stack: knockoutjs, requirejs, underscore, bootstrap
