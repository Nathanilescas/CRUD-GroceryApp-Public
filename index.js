import cookie from 'cookie';
import ejs from 'ejs';
import fs from 'fs'
import http from 'http';


const server = http.createServer( (req ,res) =>{
    
    if (req.method == 'GET') {
        if (req.url == '/') {
            const loginPage = fs.readFileSync('./CRUD-GroceryApp1.1/views/mainAccessShell.ejs')
            const renderEjs = ejs.render(loginPage, 'utf8')

            res.end(loginPage)
        }
    }
})

server.listen(3000, '127.0.0.1', () => console.log("Listening..."));