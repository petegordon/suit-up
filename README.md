# Does not really work as of yet!  Coming soon.



## What you need
You need a SQLite CREATE sql script or an existing SQLite database from which you would like to create JavaScript Object sweetness.

[sqlite3](https://www.npmjs.com/package/sqlite3) for SQLite database connection to read metadata

		npm install sqlite3

[htmling](https://www.npmjs.com/package/htmling) Template Engine using Polymer syntax was used to create the JavaScript file templates.

		npm install htmling



## How to use?
  Start with a create tables SQL script or an existing SQLite3 database. Run one of these commands.

#### SQL create script
		$ node generateJS my.sql

#### SQLite database
		$ node generateJS -db my.db

## What do you get?
  You will get a Javascript Object File for each table.  Each object will use underscore (_) to create capital letters for Object name, Function (method) names, and variables in CamelCase/camelCase format.  Each object will also have related prototype functions and static functions to get[MyObject]s, and queryByPrimaryKey, queryByForeignKey.

Here's an example create sql script to start with...

```sql
CREATE TABLE my_object(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  is_something TEXT
);
CREATE TABLE object_desire(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  object_id INTEGER NOT NULL,
  desire_id INTEGER NOT NULL,
  FOREIGN KEY(object_id) REFERENCES my_object(id),
  FOREIGN KEY(desire_id) REFERENCES my_desire(id)
);
CREATE TABLE my_desire(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wants_something TEXT
);
```
See the complete [generated code](example/desire/)

## Why I did this?

* I love Fred Brooks idea of **conceptual integrity** in *The Mythical Man Month*.  Whether you call it **conceptual integrity**, **ubiquitious language** in domain driven design, or a **data dictionary**, I think it is a sorely missed, major component to developing software. I wanted to bring that conceptual integrity from SQL to Javascript.
* I had used code generation tools previously ([MyGeneration](http://mygeneration.sourceforge.net/) and [CodeSmith](http://www.codesmithtools.com/product/generator)) to generate the object/classes from a RDBMS.  And, I wanted one for Javascript.
* Planning on doing more with Javscript on the server (node.js) in addition to the client browsers.
* [Software takes TACT](http://www.softwaretakestact.com); and Communication is a huge part of TACT.
* Hoping others also find it useful.
