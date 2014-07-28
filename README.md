btcdb
=====

Preliminary implementation of mysql database querier for importing to leveldb.


Show tables
-----------

~~~~
node showTables
~~~~
OR
~~~~
node showTables dbname
~~~~

Show columns
------------

~~~~
node showColumns tablename
~~~~

Show rows
---------

~~~~
node showRows tablename
~~~~


Stream rows to level
--------------------

(Standard procedure not set yet)

See [epochBoardMap](./epochBoardMap.js), [epochPostMap](./epochPostMap.js), or
[epochTopicMap](./epochTopicMap.js).
