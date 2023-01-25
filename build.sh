#!/bin/bash

cd broker/
docker build -t broker -f DockerFile .

cd ../exo1/server1/
docker build -t server1 -f DockerFile_server .

cd ../server2/
docker build -t server2 -f DockerFile_client .




