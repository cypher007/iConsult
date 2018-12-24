build:
	cd static/web-client/ && yarn install && yarn build
	hugo
	rm -rf public/web-client
	cd public && cp -r app/css/ app/img/ app/js/ ./

run:
	hugo serve & cd static/web-client && yarn serve