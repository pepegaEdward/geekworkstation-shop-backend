create table products (
    id uuid primary key default uuid_generate_v4(),
    title text NOT NULL,
    description text,
    price int
);

create table stocks (
    product_id uuid,
    count int,
    foreign key ("product_id") references "products" ("id")
);

insert into products (title, description, price) values
('ZX Spectrum', 'The ZX Spectrum is an 8-bit personal home computer developed by Sinclair Research. It was first released in the United Kingdom on 23 April 1982 and went on to become best selling microcomputer.', 100),
('IBM PC', 'The IBM Personal Computer (model 5150, commonly known as the IBM PC) is the first computer released in the IBM PC model line and the basis for the IBM PC compatible de facto standard. Released on August 12, 1981, it was created by a team of engineers and designers directed by Don Estridge in Boca Raton, Florida.', 150),
('Commodore 64', 'The Commodore 64, also known as the C64 or the CBM 64, is an 8-bit home computer introduced in January 1982 by Commodore International (first shown at the Consumer Electronics Show, January 7–10, 1982, in Las Vegas). It has been listed in the Guinness World Records as the highest-selling single computer model of all time, with independent estimates placing the number sold between 12.5 and 17 million units.', 200),
('Apple II series', 'The Apple II series is a family of home computers, one of the first highly successful mass-produced microcomputer products, designed primarily by Steve Wozniak, manufactured by Apple Computer (now Apple Inc.), and launched in 1977 with the original Apple II.', 180),
('Coleco Adam', 'The Coleco Adam is a home computer and expansion device for the ColecoVision released in 1983 by American toy and video game manufacturer Coleco. It was an attempt to follow on the success of the ColecoVision video game console. The Adam was not very successful, partly because of early production problems, and was discontinued in early 1985.', 100),
('Osborne 1', 'The Osborne 1 is the first commercially successful portable computer, released on April 3, 1981 by Osborne Computer Corporation. It weighs 24.5 lb (11.1 kg), cost US$1,795, and runs the CP/M 2.2 operating system. It is powered from a wall socket, as it has no on-board battery, but it is still classed as a portable device since it can be hand-carried when the keyboard is closed.', 250),

insert into stock (product_id, count) values
('37ffe5d3-02b6-43b7-85b7-1dd4f029d768', 25),
('96ecb868-f176-4980-a25b-9856178fba64', 20),
('be2c23b8-d73f-4a37-b8a4-140f09c48648', 15),
('fc0d7422-e9da-468c-bf1a-de53d5cac0d2', 10),
('033b2be2-8801-4cc3-b0c5-5bd5f78c3704', 20),
('1f253da9-8664-4dc2-a7cb-b7cfccd806a8', 30),

create extension if not exists "uuid-ossp"