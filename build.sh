#!/bin/bash


docker build -t broker -f Dockerfilebroker .

docker build -t server1 -f Dockerfileserver1 .

docker build -t server2 -f Dockerfileserver2 .

docker build -t registry -f DockerfileRegistry .