#!/bin/bash
# -----------------------------------------------------------------------------
# Cobertura Code Tools
ENTRYPOINT="./documentationServer.sh"
TOOL_EXEC_ALIAS_NAME=myDocumentationServer
DOCKER_TOOL_LABELS="sdkid=$TOOL_EXEC_ALIAS_NAME"

LOCAL_PORT=9999
LOCAL_CONTAINER_NAME=$TOOL_EXEC_ALIAS_NAME-mkdocs-local
LOCAL_CONTAINER_IMAGE=danipenaperez/mkdocs
#Where is found mkdocs.yml file
DOCUMENTS_ROOT_PATH=$PWD

CURRENT_USER=$(whoami)

#Control Action switch
ACTION=$1
if [ "$ACTION" = "" ] ; 
then
	ACTION="help"
fi

case $ACTION in
	"start")
        echo "*************************************************"
		echo "* - [[ Starting Local Documentation Server at http://localhost:$LOCAL_PORT  from sources o $DOCUMENTS_ROOT_PATH ]]"
        echo "* "
        docker run --rm -it -p $LOCAL_PORT:8000 -v $DOCUMENTS_ROOT_PATH:/docs --name $LOCAL_CONTAINER_NAME --label=$DOCKER_TOOL_LABELS $LOCAL_CONTAINER_IMAGE
        #Wait for startup
        sleep 5s
        STATUS=$(curl -s http://localhost:$LOCAL_PORT)
        EXPECTED_STATUS='<html'
        if [[ $STATUS =~ $EXPECTED_STATUS ]] ; then
            echo "Detected MKDOCS Server at http://localhost:$LOCAL_PORT"
            sensible-browser "http://localhost:$LOCAL_PORT"
        else
			echo "[WARN] Something went worng. Server not started or available at http://localhost:$LOCAL_PORT"			  
        fi
        
        echo "Use '$ENTRYPOINT stop' to Stop server"
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



