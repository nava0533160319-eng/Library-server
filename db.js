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

module.exports = books;
    
