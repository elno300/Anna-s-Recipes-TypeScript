-- import { format } from 'sql-formatter';

 CREATE TABLE courses (
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL);

INSERT INTO courses (name) VALUES
    ('Dessert'),
    ('Gryta'),
    ('Gratäng'),
    ('Pasta'),
    ('Sallad'),
    ('Soppa');

-- lägg till matbröd också


CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    cook_time TEXT NOT NULL,
    servings INTEGER NOT NULL,
    img_url TEXT,
    course INTEGER,
    FOREIGN KEY(course) REFERENCES courses(id)
 );

INSERT INTO recipes (name, description, cook_time, servings, img_url, course)
VALUES (
    'Bouillabaisse',
    'Bouillabaisse är en fransk fisksoppa från Provence, känd för sin rika smak och användning av färska fiskar, skaldjur och kryddor.',
    '45 min',
    4,
    'image1',
    6
);

INSERT INTO recipes (name, description, cook_time, servings, img_url, course)
VALUES (
    'Ärt- och löksoppa',
    'En enkel och läcker soppa med gröna ärter och lök, perfekt för en snabb måltid.',
    '20 min',
    4,
    'image2',
    6
);

INSERT INTO recipes (name, description, cook_time, servings, img_url, course)
VALUES (
    'Borsjtj',
    'Borsjtj är en populär rödbetssoppa från Östeuropa, perfekt för kalla dagar.',
    '45 min',
    6,
    'image3',
    6
);
