CREATE TABLE user_info ( 
  id int(11) NOT NULL AUTO_INCREMENT,
  user varchar(255) NOT NULL,
  bestScore int(11) NOT NULL DEFAULT 0,
  bestCat int(11) NOT NULL DEFAULT 0,
  lock_1 boolean NOT NULL DEFAULT 0,
  lock_2 boolean NOT NULL DEFAULT 0,
  lock_3 boolean NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=INNODB;