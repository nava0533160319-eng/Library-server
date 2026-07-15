const books = [
	{
		code: "B001",
		name: "The Hobbit",
		category: "Fantasy",
		price: 29.99,
		borrowed: false,
		Lendings: []
	},
	{
		code: "B002",
		name: "1984",
		category: "Dystopian",
		price: 19.5,
		borrowed: false,
		Lendings: []
	},
	{
		code: "B003",
		name: "To Kill a Mockingbird",
		category: "Fiction",
		borrowed: true,
		Lendings: [
			{ loanDate: "2026-07-01", customerCode: "C100" }
		]
	},
	{
		code: "B004",
		name: "Pride and Prejudice",
		category: "Romance",
		price: 14.75,
		borrowed: false,
		Lendings: []
	},
	{
		code: "B005",
		name: "The Catcher in the Rye",
		category: "Fiction",
		price: 18.0,
		borrowed: false,
		Lendings: []
	}
];

const users = [
	{
		id: 1,
		username: "alice",
		email: "alice@example.com",
		password: "123456",
		borrowedBooks: ["B003"]
	},
	{
		id: 2,
		username: "bob",
		email: "bob@example.com",
		password: "abcdef",
		borrowedBooks: []
	},
	{
		id: 3,
		username: "carol",
		email: "carol@example.com",
		password: "password123",
		borrowedBooks: ["B001"]
	},
	{
		id: 4,
		username: "david",
		email: "david@example.com",
		password: "qwerty",
		borrowedBooks: []
	},
	{
		id: 5,
		username: "emma",
		email: "emma@example.com",
		password: "sunshine",
		borrowedBooks: ["B002", "B004"]
	},
	{
		id: 6,
		username: "frank",
		email: "frank@example.com",
		password: "letmein",
		borrowedBooks: []
	},
	{
		id: 7,
		username: "grace",
		email: "grace@example.com",
		password: "hello2024",
		borrowedBooks: ["B005"]
	},
	{
		id: 8,
		username: "henry",
		email: "henry@example.com",
		password: "welcome",
		borrowedBooks: []
	},
	{
		id: 9,
		username: "ivy",
		email: "ivy@example.com",
		password: "iloveyou",
		borrowedBooks: ["B001", "B003"]
	},
	{
		id: 10,
		username: "jack",
		email: "jack@example.com",
		password: "library123",
		borrowedBooks: []
	}
];

	module.exports = { books, users };
