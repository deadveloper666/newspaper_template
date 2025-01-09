#!/bin/bash

#Control Action switch
ACTION=$1
if [ "$ACTION" = "" ] ; 
then
	ACTION="help"
fi

case $ACTION in
	"fetchRSS")
        echo "*************************************************"
		echo "* - Fetching RSS data..."
        echo "* "
        #cd ./rss_Reader/src
        #echo $PWD
        node ./rss_Reader/src/rssReader.js  $PWD/sourceFeedsConfig.json $PWD/build_tmp/data
        
        echo "* - SUCCESS"
		;;
    "generateMD")
        echo "*************************************************"
		echo "* - Generating MD from JSON data..."
        echo "* "
        node ./rss_Reader/src/jsonToMd.js $PWD/build_tmp/data $PWD/build_tmp/md
        echo "* - SUCCESS"
		;;
    "acceptMDtoMkdocs")
        echo "*************************************************"
		echo "* - Moving generated Md to mkdocs src..."
        echo "* "
        
        for dir in ./build_tmp/md/*/     # list directories in the form "/tmp/dirname/"
        do
            dir=${dir%*/}      # remove the trailing "/"
            sectionDirName="${dir##*/}"    # print everything after the final "/"
            echo $sectionDirName

            mv -f ./build_tmp/md/$sectionDirName/* mkdocs/docs/$sectionDirName

        done

        echo "* - SUCCESS"
		;;        
    "stop")
        echo 'Stoppping Local mkdocs server...'
        STATUS=$(curl -s http://localhost:$LOCAL_PORT)
        EXPECTED_STATUS='<html'
        if [[ $STATUS =~ $EXPECTED_STATUS ]] ; then
            echo "Detected MKDOCS Server at http://localhost:$LOCAL_PORT"
            CONTAINER_ID=$(docker ps --filter "label=$DOCKER_TOOL_LABELS" |grep $LOCAL_CONTAINER_NAME |awk '{print $1}')
            docker container stop $CONTAINER_ID  #Stop container
            docker container rm $CONTAINER_ID  #Remove container
        else
			echo "[WARN] Server not started or available at http://localhost:$LOCAL_PORT"			  
        fi
        echo 'Stoppping Local mkdocs...DONE'
		;;
    "assemble")
        echo ""
        docker run --rm -it -p $LOCAL_PORT:8000 -v $DOCUMENTS_ROOT_PATH:/docs --name $LOCAL_CONTAINER_NAME --label=$DOCKER_TOOL_LABELS $LOCAL_CONTAINER_IMAGE build
        # Reassign permissions to current user 
        sudo chown -R $CURRENT_USER:$CURRENT_USER $DOCUMENTS_ROOT_PATH/site
        echo "Build the local documentation at $DOCUMENTS_ROOT_PATH/site."
		;;
	"help")
        echo '*******************'
        echo '** Available Commands:'
		echo "1.[start] (Usage: '$ENTRYPOINT start')  => Start local Documentation server in current Machine."
		echo "2.[stop] (Usage: '$ENTRYPOINT stop')  => Stop local Documentation server in current Machine."
        echo "3.[assemble] (Usage: '$ENTRYPOINT assemble')  => Generated static html site on ./site folder"
        echo '*******************'
		;;
	* )
		echo "ERROR- Command not found [$ACTION] "
        echo "Execute - $ENTRYPOINT help -for available commands."
        echo "@dppware "

    ;;
esac



