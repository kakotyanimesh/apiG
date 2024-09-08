const express = require("express")
const cors = require("cors")
const fs = require('fs')
const jwt = require('jsonwebtoken')
const { title } = require("process")
const port = 3000


const jwt_secret = 'animesh_kakoty'
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

fs.readFile('users.json', (err, data) => {
	if(err) throw err
	userJson = JSON.parse(data)
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


// authentication middleware 

const auth = (req, res, next) => {
	const token = req.headers.authorization

	if(token){
		jwt.verify(token, jwt_secret, (err, decode) => {
			if(err){
				res.status(404).json({
					message : "unauthorized !!"
				})
			} else {
				res.status(200).json({
					message : "authorized to visit "
				})
				next()
			}
		})
	}
}



app.get('/books', auth, (req, res) => {
	res.send(jsonData)
})


app.post('/generateApi', (req, res) => {
	const {customNameOne , customNameTwo, limit = 10} = req.body
	// const limit = 30
	// console.log(limit);
	
	const newBooks = []
// here => 30 / 40 bla bla 
	for (let i = 0; i < limit ; i++) {
		const books = {
			id: jsonData.length + 1 + i,
			[customNameOne || 'title']  : generateBookName(),
			[customNameTwo || 'author']: generateAuthorName()
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

app.post('/signUp', (req, res) => {
	const {username, password} = req.body

	

	userJson.push({
		username,
		password
	})


	fs.writeFile('users.json', JSON.stringify(userJson), (err) => {
		if(err) throw err
	})
	res.status(200).json({
		message : "user created !! "
	})

})


app.post('/signIn', (req, res) => {
	const {username, password } = req.body

	const user = userJson.find(user => user.username === username && user.password === password)

	if(user) {
		const token = jwt.sign({
			username: user.username,

		}, jwt_secret)

		user.token = token

		res.send({
			token
		})
		console.log(userJson);
		
	} else {
		res.status(403).json({
			message : "user not found !!"
		})
	}

})




app.listen(port, () => console.log(`The app is running at http://localhost:${port}`))


