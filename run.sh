docker network create icvad

docker run  --network=icvad -e PORT=8000  -e ADDRESS=http://server1 --name server1 -d server1
docker run  --network=icvad -e PORT=8001  -e ADDRESS=http://server2 --name server2 -d server2

#docker run --network=icvad -e PORT=1111 -e REGISTRY=http://registry:8080 -e ADDRESS=http://broker --name broker -d icvad/broker
#docker run --network=icvad -e PORT=8080 --name registry -d icvad/registry
#docker run --network=icvad -e PORT=4567 -e REGISTRY=http://registry:8080 -e ADDRESS=http://s0 --name s0 -d icvad/s0
#docker run --network=icvad -e PORT=5372 -e REGISTRY=http://registry:8080 -e ADDRESS=http://s1 --name s1 -d icvad/s1