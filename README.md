btcdb
=====

Preliminary implementation of mysql database querier for importing to leveldb.


epochMap Methods
----------------

<h3>remapObject (oldObject, map);</h3>

Creates an object by mapping values (by key) from an old object to new keys.

~~~~
var oldObject = {
  oldKey1 : 'oldValue1',
  oldKey2 : 'oldValue2'
}

var map = {
  oldKey1 : 'newKey1',
  oldKey2 : 'newKey2'
}

var newObject = epochMap.remapObject(oldObject, map);
// {
//   newKey1 : 'oldValue1',
//   newKey2 : 'oldValue2'
// }
~~~~

(Note:  Strangely, this is a fairly useful method that simplifies the API)


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

~~(Standard procedure not set yet)~~

(No standard procedure available)

~~See [epochBoardMap](./epochBoardMap.js), [epochPostMap](./epochPostMap.js), or
[epochTopicMap](./epochTopicMap.js).~~

See generic example [mappedImport](./mappedImport.js).

(Actually, this is not a very good example...)
