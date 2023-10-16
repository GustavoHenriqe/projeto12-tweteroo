import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const users = [
    {
        username: "bobesponja", 
        avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png" 
    }
]

const tweets = [
    {
        username: "bobesponja",
        tweet: "Eu amo hambúrguer de siri!"
    },
    {
        username: "bobesponja",
        tweet: "Eu amo hambúrguer de siri!"
    },
    {
        username: "bobesponja",
        tweet: "Eu amo hambúrguer de siri!"
    },
]

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body
    users.push({username, avatar})
    res.status(200).send("ok")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body

    const searchUser = users.find(u => u.username === username)

    if (!searchUser) {
        return res.status(401).send("UNAUTHORIZED")
    }

    tweets.push({username, tweet})
    res.status(200).send("ok")
})

app.get("/tweets", (req, res) => {

    if ( tweets.length == 0 ) {
        return res.status(200).send([])
    }

    const get = tweets.slice(-10)
    const newArray = get.map((t) => {
        const getAvatar = users.find(u => u.username === t.username)
        return {
            username: t.username,
            avatar: getAvatar.avatar,
            tweet: t.tweet
        }
    }) 

    res.status(200).send(newArray)
})

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})