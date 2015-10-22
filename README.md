Hugo Gulp Seed
=================

[Hugo](http://gohugo.io/) is a fantastic tool for generating a static web-site. It's great at what it does and for many use cases may be a far better fit than WordPress or Joomla.

Here's how Hugo is described in it's own [documentation](http://gohugo.io/overview/introduction/): 

>Hugo is a general-purpose website framework. Technically speaking, Hugo is a static site generator. This means that, unlike systems like WordPress, Ghost and Drupal, which run on your web server expensively building a page every time a visitor requests one, Hugo does the building when you create your content. Since websites are viewed far more often than they are edited, Hugo is optimized for website viewing while providing a great writing experience.

>Sites built with Hugo are extremely fast and very secure. Hugo sites can be hosted anywhere, including Heroku, GoDaddy, DreamHost, GitHub Pages, Google Cloud Storage, Amazon S3 and CloudFront, and work well with CDNs. Hugo sites run without dependencies on expensive runtimes like Ruby, Python or PHP and without dependencies on any databases.

>We think of Hugo as the ideal website creation tool. With nearly instant build times and the ability to rebuild whenever a change is made, Hugo provides a very fast feedback loop. This is essential when you are designing websites, but also very useful when creating content.

For the most part, that description is very apt, but, as a software developer that's had a lot of experience with JavaScript, SASS, and frameworks like AngularJS, I've become accustomed to being able to easily script my builds to handle minification, variable replacements, deployments and more. That's where [Gulp.js](http://gulpjs.com/) comes in.

[Gulp.js](http://gulpjs.com/) is the premiere build and automation tool for JavaScript. It is powerful beyond imagination. If you can complete a computing task manually by executing a series of commands or programs, you can automate that task with Gulp.

Hugo Gulp Seed Features
-----------------------

This *Hugo Gulp Seed* project provides a starting point for a Hugo-powered web site, using Gulp.js as a key tool in putting together the final site. The following is a list of features built into Hugo Gulp Seed:

 - Watching template, markdown and SASS files in src/hugo/**/* and automatically recompiling the site when there are local changes to the files
 - Substituting different Google Analytics IDs into the compiled HTML depending on whether the build is for development or production deployment
 - Compiling SASS files into a concatenated, minified & versioned CSS file and substituting the versioned file name into each HTML file
 - compiling SASS files into CSS and minifying them, minifying HTML, replacing references to .css and .js files with references to the compiled minifed
 - Ability to deploy the site to an Amazon S3 bucket by running 'gulp deploy:prod'
 - A sensible structure for adding additional Gulp tasks - see the hugo-gulp-seed/gulp-tasks directory.

This repository provides a fully-working example of a [Hugo](https://github.com/spf13/hugo)-powered blog. Many
Hugo-specific features are used as a way to see them in action, and hopefully ease the learning curve for creating your
very own site with Hugo.


Getting Started
---------------

To get started, you'll need to do the following: 

 - Fork or clone this repository! That's definitely an important first step.
 - [Install Hugo](http://gohugo.io/overview/installing) in a way that best suits your environment and comfort level.
 - [Install Node Package Manager](https://docs.npmjs.com/getting-started/installing-node)
 - Run 'npm install' from inside the 'hugo-gulp-seed' directory
 - Run gulp
 - Open your browser to [http://localhost:4000](http://localhost:4000]

If you'd like to change some of the options, such as the port the local server runs on, or the Google Analytics ID used in the build, or the credentials for deployment to Amazon S3, please copy gulp-config-default.json to gulp-config.json and change or add your values here. The values read from gulp-config.json will be used to extend and override the values in the buildProperties object declared in gulpfile.js

Thanks for Trying It Out
------------------------

