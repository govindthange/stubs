docker build -t whoami .
docker images | head
echo "Application has been built. You are ready to push it as $1/whoami"
read -p "[Hit enter to continue]"

# $1 refers to your Docker Hub Account ID
# $2 refers to your Docker Hub Account Password
docker login --username=$1 --password=$2

tag=$(git log -1 --pretty=%h)
echo "Image will be pushed as $1/whoami:$tag"
read -p "[Hit enter to exit]"

docker tag whoami $1/whoami:$tag
docker push $1/whoami:$tag
echo "Application has been pushed to $1/whoami:$tag"
echo "Pulling $1/whoami:$tag..."
docker pull $1/whoami:latest

docker images | head
read -p "[Hit enter to exit]"