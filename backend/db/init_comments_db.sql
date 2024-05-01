CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(120) NOT NULL,
    object_id VARCHAR(120) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    modifed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO
    comments (user_id, object_id, body)
VALUES
    ('USER1', 'CLOUD1', 'TEST BODY'),
    ('USER2', 'VIRTUAL MACHINE 3', 'GOOD BODY'),
    ('USER3', 'DASHBOARD2', 'tesstttt');