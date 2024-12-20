DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS recipes_users;
DROP TABLE IF EXISTS courses;

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

CREATE TABLE recipes_users(
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
    cook_time TEXT NOT NULL,
    servings INTEGER,
    img_url TEXT,
    course INTEGER,
    instructions JSONB NOT NULL,
    ingredients JSONB NOT NULL,
    user_id INTEGER,
    FOREIGN KEY(course) REFERENCES courses(id),
    FOREIGN KEY(user_id) REFERENCES recipes_users(id) ON DELETE SET NULL
);

INSERT INTO recipes (
    name,
    description,
    cook_time,
    servings,
    img_url,
    course,
    instructions,
    ingredients,
    user_id
)
VALUES (
    'Bouillabaisse',
    'Bouillabaisse är en fransk fisksoppa från Provence, känd för sin rika smak och användning av färska fiskar, skaldjur och kryddor.',
    '45 min',
    4,
    'image1.jpg',
    7,
    '[
        "Förbered fisken och skaldjuren.",
        "Hacka grönsakerna.",
        "Fräs grönsakerna med kryddor.",
        "Tillsätt buljong och låt sjuda.",
        "Lägg i fisken och skaldjuren och låt sjuda tills allt är genomkokt."
    ]'::jsonb,
    '[
        "500 g Fisk",
        "200 g Tomat",
        "2 msk Olivolja",
        "1 tsk Salt",
        "1 st Lök"
    ]'::jsonb,
    NULL
);

INSERT INTO recipes (
    name,
    description,
    cook_time,
    servings,
    img_url,
    course,
    instructions,
    ingredients,
    user_id
)
VALUES (
    'Ärt och löksoppa',
    'En enkel och läcker soppa med gröna ärter och lök, perfekt för en snabb måltid.',
    '20 min',
    4,
    'image2.jpg',
    7,
    '[
        "Hacka löken fint.",
        "Fräs löken i en kastrull med lite olja tills den är mjuk.",
        "Tillsätt ärterna och häll på vatten eller buljong.",
        "Låt koka i 10 minuter.",
        "Mixa soppan slät och smaka av med salt och peppar."
    ]'::jsonb,
    '[
        "1 st Lök",
        "500 g Gröna ärter",
        "1 msk Olivolja",
        "7 dl Vatten eller buljong",
        "Efter smak Salt och peppar"
    ]'::jsonb,
    NULL
);

INSERT INTO recipes (
    name,
    description,
    cook_time,
    servings,
    img_url,
    course,
    instructions,
    ingredients,
    user_id
)
VALUES (
    'Borsjtj',
    'Borsjtj är en populär rödbetssoppa från Östeuropa, perfekt för kalla dagar.',
    '45 min',
    6,
    'image3.jpg',
    6,
    '[
        "Skala och riv rödbetor, morötter och potatis.",
        "Hacka löken och vitkålen fint.",
        "Fräs löken i en stor kastrull tills den är mjuk.",
        "Tillsätt rödbetor, morötter, potatis och vitkål i kastrullen.",
        "Häll på buljong och låt soppan sjuda i 30 minuter.",
        "Tillsätt vitlök, dill och vinäger, och smaka av med salt och peppar."
    ]'::jsonb,
    '[
       "3 st Rödbetor",
       "2 st Morötter",
       "2 st Potatis",
       "1 st Lök",
       "200 g Vitkål",
       "1 liter Grönsaksbuljong",
       "2 klyftor Vitlök",
       "2 msk Vitvinsvinäger",
       "1 msk Färsk dill, hackad",
       "Efter smak Salt och peppar"
    ]'::jsonb,
    NULL
);
