# Youtube-like

### Required tools :

1. [Make](https://www.gnu.org/software/make/)
1. [Docker](https://www.docker.com/)
1. [Docker-compose](https://docs.docker.com/compose/)

# Development

```bash
cp .env.sample .env
make serve
```

## Deployment

The deployment process needs an activated Docker Swarm cluster.
To export .env variables, run this following command :

```bash
export $(cat .env | sed -e /^$/d -e /^#/d | xargs)
```

The _*stack.yml*_ file is used to deploy or update swarm like this :

```bash
docker stack deploy -c stack.yml youtube-like
```
