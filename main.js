const http = require('http')
const fs = require('fs')

let base_path = './views/', path = ''
let count = 0;

const server = http.createServer((req, res) => {
    console.log('Request Incoming ', req.url)
    res.setHeader('Content-Type', 'text/html')

    switch (req.url) {
        case '/':
        case '/home':
        case '/products':
        case '/contacts':
            count++
            path = base_path + 'index.html'
            break
        case '/style.css':
            res.setHeader('Content-Type', 'text/css')
            path = base_path + 'style.css'
            break
        default:
            path = base_path + 'index.html'
            break
    }

    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            console.log(err.message)
            res.end()
        }
        let updateHeader = data.replace('{{header}}', req.url.split('/').pop())
        let updateCounter = updateHeader.replace('{{counter}}', count)
        res.write(updateCounter)
        res.end()
    })
})

server.on('error', (err) => {
    console.log('Error Occured: ', err.message)
})
server.on('close', () => {
    console.log('SERVER is shutting down')
})

const PORT = 8000
server.listen(PORT, () => {
    console.log("SERVER is running on http:localhost:" + PORT)
})
