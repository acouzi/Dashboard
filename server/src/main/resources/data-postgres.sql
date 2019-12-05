INSERT INTO users (first_name, last_name, mail, password, services) VALUES (
  'John',
  'Doe',
  'johndoe@mail.com',
  crypt('johnspassword', gen_salt('bf')),
  'Profile;'
);

INSERT INTO users (first_name, last_name, mail, password, services) VALUES (
  'Ole',
  'Ola',
  'oleola@mail.com',
  crypt('oleolapassword', gen_salt('bf')),
  'Profile;'
);