DROP TABLE IF EXISTS my_object;
CREATE TABLE my_object(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  is_something TEXT
);
DROP TABLE IF EXISTS object_desire;
CREATE TABLE object_desire(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  my_object_id INTEGER NOT NULL,
  my_desire_id INTEGER NOT NULL,
  FOREIGN KEY(object_id) REFERENCES my_object(id),
  FOREIGN KEY(desire_id) REFERENCES my_desire(id)
);
DROP TABLE IF EXISTS my_desire;
CREATE TABLE my_desire(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wants_something TEXT
);
