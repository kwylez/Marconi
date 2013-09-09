# MongoDB + NODE.JS + EXPRESS on Heroku #

# Testing with curl #

Get all items:

	curl -i -X GET http://localhost:5000/items

Get item with _id value of 5069b47aa892630aae000007:

	curl -i -X GET http://localhost:5000/items/log/1234

Get log for items having sfid value of 1234:

	curl -i -X GET http://localhost:5000/items/log

Delete item with _id value of 5069b47aa892630aae000007:

	curl -i -X DELETE http://localhost:5000/items/5069b47aa892630aae000007

Add a new item:

	curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New Item", "year": "2009"}' http://localhost:5000/items

Modify item with _id value of 5069b47aa892630aae000007:

	curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "New item", "year": "2010"}' http://localhost:5000/items/5069b47aa892630aae000007



# Tools #


*Install node & npm*

http://nodejs.org/download/


*instal homebrew (to install mongodb locally)*

	ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"


	...

	brew update

	brew install mongodb

	brew update
	brew upgrade mongodb



*MongoDb*

 mongo db local setup

	 start mongod service

	 	mongod &

	 	mongo items

	 	db.save({'name':'steve'}))

	 	show dbs

	 		items

	 	show collections

	 	db.items.find()

	 	db.items.drop()

* After mongo is setup locally you can use localhost/items

*Heroku toolbelt*

https://toolbelt.heroku.com

	heroku login

	heroku create

	git init

	git commit -a -m "init"

	git push heroku master

	...

	heroku open

	heroku logs -n 3

	heroku logs -t  (leaves it open)






