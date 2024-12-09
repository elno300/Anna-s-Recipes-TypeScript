 CREATE TABLE courses (
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL);

INSERT INTO courses (name) VALUES
    ('Bakverk'),
    ('Dessert'),
    ('Gryta'),
    ('Gratäng'),
    ('Pasta'),
    ('Sallad'),
    ('Soppa'),
    ('Matbröd'),
    ('Mackor');

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    mail TEXT NOT NULL UNIQUE,
    password_hash VARCHAR(225),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL,
    cook_time VARCHAR(6) NOT NULL,
    servings INTEGER NOT NULL,
    img_url TEXT,
    course INTEGER,
    FOREIGN KEY(course) REFERENCES courses(id)
 );

 CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
 );

 CREATE TABLE measurement (
    id SERIAL PRIMARY KEY,
    units VARCGAR(10) NOT NULL
 );

CREATE TABLE recipe_ingredient (
    recipe_id INTEGER INT NOT NULL,
    ingredient_id INTEGER INT NOT NULL,
    measurement_id INTEGER NOT NULL,
    amount NUMERIC NOT NULL,
    PRIMARY KEY (recipe_id, ingredients_id)
    FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id) ON DELETE CASCADE,
    FOREIGN KEY (measurements_id) REFERENCES measurment (id) ON DELETE CASCADE,
);

INSERT INTO recipes (name, description, cook_time, servings, img_url, course)
VALUES, (
    'Bouillabaisse',
    'Bouillabaisse är en fransk fisksoppa från Provence, känd för sin rika smak och användning av färska fiskar, skaldjur och kryddor.',
    '45 min',
    4,
    'image1',
    6
);

INSERT INTO recipes (name, description, cook_time, servings, img_url, course)
VALUES, (
    'Ärt- och löksoppa',
    'En enkel och läcker soppa med gröna ärter och lök, perfekt för en snabb måltid.',
    '20 min',
    4,
    'image2',
    6
);

INSERT INTO recipes (name, description, cook_time, servings, img_url, course)
VALUES, (
    'Borsjtj',
    'Borsjtj är en populär rödbetssoppa från Östeuropa, perfekt för kalla dagar.',
    '45 min',
    6,
    'image3',
    6
);
