import { User } from "../model/user.model";
import { Card } from "../model/card.model";

export const initDatabase = async () => {
  const user = await User.create([
    {
      email: "regular@mail.com",
      image: {
        alt: "regular image",
        url: "https://picsum.photos/id/1/200/300",
      },
      isBusiness: false,
      isAdmin: false,
      name: { first: "Regular", middle: "Reg", last: "User" },
      password: "Bbb123!",
      phone: "050-3647852",
      address: {
        state: "IL",
        country: "Israel",
        city: "Tel Aviv",
        street: "Street Aaaa",
        houseNumber: "1",
      },
    },
    {
      email: "business@mail.com",
      image: {
        alt: "business image",
        url: "https://picsum.photos/id/1/200/300",
      },
      isBusiness: true,
      name: { first: "Business", middle: "Buss", last: "User" },
      password: "8965!Bb",
      phone: "050-1259866",
      address: {
        state: "IL",
        country: "Israel",
        city: "Tel Aviv",
        street: "Street Bbbb",
        houseNumber: "2",
      },
    },
    {
      email: "admin@mail.com",
      image: {
        alt: "admin image",
        url: "https://picsum.photos/id/1/200/300",
      },
      isBusiness: true,
      isAdmin: true,
      name: { first: "Admin", middle: "Adm", last: "User" },
      password: "B123!Aaaa",
      phone: "050-3569874",
      address: {
        state: "IL",
        country: "Israel",
        city: "Tel Aviv",
        street: "Street Cccc",
        houseNumber: "3",
      },
    },
  ]);

  const card = await Card.create([
    {
      title: "First Card",
      subtitle: "This is the first card",
      description: "This is the first card in the database",
      phone: "050-0000000",
      email: "firstCard@gmail.com",
      web: "https://www.test1.co.il",
      image: {
        url: "https://picsum.photos/id/1/200/300",
        alt: "first card",
      },
      address: {
        state: "IS",
        country: "Israel",
        city: "Tel Aviv",
        street: "Street",
        houseNumber: 3,
        zip: "0",
        user_id: user[0]._id,
      },
    },
    {
      title: "Second Card",
      subtitle: "This is the second card",
      description: "This is the second card in the database",
      phone: "050-1111111",
      email: "secondCard@gmail.com",
      web: "https://www.test2.co.il",
      image: {
        url: "https://picsum.photos/id/1/200/300",
        alt: "second card",
      },
      address: {
        state: "IS",
        country: "Israel",
        city: "Street",
        street: "Street",
        houseNumber: 3,
        zip: "0",
        user_id: user[1]._id,
      },
    },
    {
      title: "Third Card",
      subtitle: "This is the third card",
      description: "This is the third card in the database",
      phone: "050-2222222",
      email: "thirdCard@gmail.com",
      web: "https://www.test3.co.il",
      image: {
        url: "https://picsum.photos/id/1/200/300",
        alt: "third card",
      },
      address: {
        state: "IS",
        country: "Israel",
        city: "Holon",
        street: "Street",
        houseNumber: 3,
        zip: "0",
        user_id: user[2]._id,
      },
    },
  ]);

  const savedUsers = await Promise.all(user.map((u) => u.save()));
  const savedCards = await Promise.all(card.map((c) => c.save()));
  const saved = [...savedUsers, ...savedCards];

  return saved;
};
