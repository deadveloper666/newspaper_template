#!/bin/bash

node ../rss_Reader/src/newsCollector.js  $PWD/newspaper.config $PWD/../build_tmp/data $PWD/build_tmp

node ../rss_Reader/src/templateBuilder.js  $PWD $PWD/build_tmp

node ../rss_Reader/src/publisher.js  $PWD 