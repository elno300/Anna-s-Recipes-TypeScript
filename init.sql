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
    cook_time VARCHAR(6),
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
        { "measurement": "500 g", "ingredient": "Fisk" },
        { "measurement": "200 g", "ingredient": "Tomat" },
        { "measurement": "2 msk", "ingredient": "Olivolja" },
        { "measurement": "1 tsk", "ingredient": "Salt" },
        { "measurement": "1 st", "ingredient": "Lök" }
    ]'::jsonb,
    NULL -- Ingen användare kopplad till detta recept
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
    'Ärt- och löksoppa',
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
        { "measurement": "1 st", "ingredient": "Lök" },
        { "measurement": "500 g", "ingredient": "Gröna ärter" },
        { "measurement": "1 msk", "ingredient": "Olivolja" },
        { "measurement": "7 dl", "ingredient": "Vatten eller buljong" },
        { "measurement": "Efter smak", "ingredient": "Salt och peppar" }
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
        { "measurement": "3 st", "ingredient": "Rödbetor" },
        { "measurement": "2 st", "ingredient": "Morötter" },
        { "measurement": "2 st", "ingredient": "Potatis" },
        { "measurement": "1 st", "ingredient": "Lök" },
        { "measurement": "200 g", "ingredient": "Vitkål" },
        { "measurement": "1 liter", "ingredient": "Grönsaksbuljong" },
        { "measurement": "2 klyftor", "ingredient": "Vitlök" },
        { "measurement": "2 msk", "ingredient": "Vitvinsvinäger" },
        { "measurement": "1 msk", "ingredient": "Färsk dill, hackad" },
        { "measurement": "Efter smak", "ingredient": "Salt och peppar" }
    ]'::jsonb,
    NULL
);
