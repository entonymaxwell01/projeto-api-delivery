CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'cliente',
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'test@test.com') THEN
        INSERT INTO usuarios (nome, email, cpf, password, role)
        VALUES ('Admin', 'test@test.com', '00000000000', '$2b$10$Y/B8njSH2MCCTPhJcAS9MODTYg5XszeejXxTUvdvaz7/0LkIPnGkS', 'admin');
    END IF;
END
$$;