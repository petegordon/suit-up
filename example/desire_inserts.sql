INSERT into my_object(is_something) VALUES('family');
INSERT into my_object(is_something) VALUES('home');
INSERT into my_object(is_something) VALUES('wisdom');
INSERT into my_object(is_something) VALUES('love');
INSERT into my_object(is_something) VALUES('hope');
INSERT into my_desire(wants_something) VALUES('more of');
INSERT into my_desire(wants_something) VALUES('time with');
INSERT into my_desire(wants_something) VALUES('time at');

INSERT INTO object_desire(object_id, desire_id)
  SELECT my_object.id, my_desire.id FROM my_object, my_desire WHERE is_something='family' and wants_something='time with';
INSERT INTO object_desire(object_id, desire_id)
  SELECT my_object.id, my_desire.id FROM my_object, my_desire WHERE is_something='home' and wants_something='time at';
INSERT INTO object_desire(object_id, desire_id)
  SELECT my_object.id, my_desire.id FROM my_object, my_desire WHERE is_something='wisdom' and wants_something='more of';
INSERT INTO object_desire(object_id, desire_id)
  SELECT my_object.id, my_desire.id FROM my_object, my_desire WHERE is_something='wisdom' and wants_something='time with';
INSERT INTO object_desire(object_id, desire_id)
  SELECT my_object.id, my_desire.id FROM my_object, my_desire WHERE is_something='love' and wants_something='more of';
INSERT INTO object_desire(object_id, desire_id)
  SELECT my_object.id, my_desire.id FROM my_object, my_desire WHERE is_something='love' and wants_something='time with';
INSERT INTO object_desire(object_id, desire_id)
  SELECT my_object.id, my_desire.id FROM my_object, my_desire WHERE is_something='hope' and wants_something='more of';
