CREATE TABLE IF NOT EXISTS students (
                                        id INTEGER PRIMARY KEY,
                                        name TEXT NOT NULL,
                                        score INTEGER
);

INSERT INTO students (id, name, score) VALUES (1, 'Lio', 100);
INSERT INTO students (id, name, score) VALUES (2, 'Cat', 90);
INSERT INTO students (id, name, score) VALUES (3, 'Dog', 85);

SELECT * FROM students;


CREATE TABLE IF NOT EXISTS likes (
    id INTEGER PRIMARY KEY,
    feature TEXT NOT NULL UNIQUE,
    count INTEGER DEFAULT 0
);

INSERT OR IGNORE INTO likes (feature, count) VALUES
('function_1', 0), ('function_2', 0), ('function_3', 0),
('function_4', 0), ('function_5', 0), ('function_6', 0),
('function_7', 0), ('function_8', 0), ('function_9', 0),
('function_10', 0), ('function_11', 0), ('function_12', 0),
('function_13', 0), ('function_14', 0), ('function_15', 0),
('function_16', 0), ('function_17', 0), ('function_18', 0),
('function_19', 0), ('function_20', 0), ('function_21', 0),
('function_22', 0), ('function_23', 0), ('function_24', 0),
('function_25', 0), ('function_26', 0);