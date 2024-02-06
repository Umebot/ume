include .env

set:
	sudo chmod 0755 ~
	sudo chmod -R a+w ~/data/
	sudo chmod 0700 ~/.ssh
	sudo chmod -R 0600 ~/.ssh/*
	export EXTERNAL_HOST=${EXTERNAL_HOST}; \
	envsubst '$${EXTERNAL_HOST}' < configs/nginx.prod.conf > /etc/nginx/sites-enabled/${PROJECT_NAME}.conf
	sudo systemctl restart nginx
	sudo certbot --nginx
