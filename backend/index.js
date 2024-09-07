const express = require("express")
const cors = require("cors")
const fs = require('fs')
const { title } = require("process")
const port = 3000

const app = express()
const corsOptions = {
    origin: ['http://localhost:5173', 'https://api-g.vercel.app'],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json())
// app.use(cors(options))


fs.readFile('booksApi.json', (err, data) => {
	if(err) throw err
	jsonData = JSON.parse(data)
})

const generateBookName = () => {
	const adjectives = ["Mysterious", "Adventurous", "Epic", "Haunting", "Enchanted"]
    const noun = ["Journey", "Legacy", "Secret", "Saga", "Quest"]

	const ranDomAdj = adjectives[Math.floor(Math.random() * adjectives.length)]
	const ranDomNoun = adjectives[Math.floor(Math.random() * noun.length)]

	return `${ranDomAdj} ${ranDomNoun}`
}
// console.log(generateBookName());

const generateName = (length) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	let result = ''

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length ))
		
	}
	return result
}

// console.log(generateName(5));

const capitals = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// console.log(capitals(generateName(5)));

const generateAuthorName = () => {
	const firstName = generateName(5)
	const lastName = generateName(5)

	return `${capitals(firstName)} ${capitals(lastName)}`
}

// console.log(generateAuthorName());

const generateUserId = () => {
	return Math.floor(Math.random() * 100)
}
// console.log(generateUserId());



app.get('/books', (req, res) => {
	res.send(jsonData)
})


app.post('/generateApi', (req, res) => {
	// const {customNameOne , customNameTwo, limit} = req.body
	const limit = 30
	// console.log(limit);
	
	const newBooks = []
// here => 30 / 40 bla bla 
	for (let i = 0; i < limit ; i++) {
		const books = {
			id: jsonData.length + 1 + i,
			title : generateBookName(),
			author: generateAuthorName()
		}

		newBooks.push(books)
	}
	jsonData.push(...newBooks)

	fs.writeFile('booksApi.json', JSON.stringify(jsonData), (err) => {
		if(err) throw err

		res.status(200).json({message: "api is generated"})
	})
})

app.delete('/delete', (req, res) => {
	jsonData = []

	fs.writeFile('booksApi.json', JSON.stringify(jsonData), (err) => {
		if(err) throw err

		res.status(200).json({message : "api is cleared"})
	})
})

app.listen(port, () => console.log(`The app is running at http://localhost:${port}`))



// {
// 	customForm && (
// 	  <div className='dark:bg-[#1A3E5A] bg-[#9DBDFF] sm:right-[38%] inline-block sm:p-3 p-2 text-sm sm:text-lg mt-6 rounded-xl absolute'>
// 		 {/* have to work on mobile thing white spacing width things  */}
// 	  <form onSubmit={formSubmit}>
// 		<label htmlFor="text" className='inline-block sm:w-[180px]'>Custom Name : </label>
// 		<input className='my-1 text-black rounded-l sm:w-[200px] ' value={customNameOne}  onChange={(e) => setcustomNameOne(e.target.value)} name="customNameOne" /> <br />
// 		<label htmlFor="text" className='inline-block sm:w-[180px]'>Custom Name  : </label>
// 		<input className='my-1 text-black rounded-l sm:w-[200px] '  value={customNameTwo} onChange={e => setcustomNameTwo(e.target.value)} name="customNameTwo" /> <br />
// 		<label htmlFor="text" className='inline-block sm:w-[180px]'>limit for API :  </label>
// 		<input className='my-1 text-black rounded-l sm:w-[200px]' value={limit} onChange={e => setlimit(e.target.value)} name="limit" /> <br />
// 		<button type="submit" className='mx-[60%] mt-2 dark:bg-gray-600 bg-[#0f172a] text-[#ffffff]  p-1 rounded-lg'>Submit</button>
// 	  </form>
// 	</div>
// 	)
//   }