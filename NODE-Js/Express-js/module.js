
const userRequestHandler=(req,res)=>{
     res.setHeader('Content-Type', 'text/html');

 if(req.url === '/') {
    res.write('<html>');
    res.write('<head><title>pratik giri</title></head>');
    res.write('<body><h1>welcome to home page</h1>');
    res.write('<a href="/calculater"> goto calculater</a>');
    res.write('</body></html>');
    return res.end();
 } else if (req.url === '/calculater' && req.method === 'GET') {
    res.write('<html>');
    res.write('<head><title>Calculater</title></head>');
    res.write('<body><h1>Calculater</h1>');
    res.write('<form action="/calculater" method="POST">');
    res.write('<input type="number" name="num1" placeholder="Enter first number" required>');
    res.write('<input type="number" name="num2" placeholder="Enter second number" required>');
    res.write('<button type="submit">Calculate</button>');
    res.write('</form>');
    res.write('</body></html>');
    return res.end();
 } else if (req.url === '/calculater' && req.method === 'POST') {
    const body = [];
    req.on('data', chunk => {
        body.push(chunk);
    });
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        // const num1 = parseFloat(parsedBody.split('&')[0].split('=')[1]);
        // const num2 = parseFloat(parsedBody.split('&')[1].split('=')[1]);
        const params = new URLSearchParams(parsedBody);
        const jsonobj= Object.fromEntries(params);
        console.log(jsonobj);
        const num1=Number(jsonobj.num1);
        const num2=Number(jsonobj.num2);

        const result = num1 + num2;
        res.write('<html>');
        res.write('<head><title>Calculater</title></head>');
        res.write('<body>');
        res.write(`<h1>Result: ${result}</h1>`);
        res.write('<a href="/calculater">Back to Calculater</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    });
 } else {
    res.write('<html>');
    res.write('<head><title>404 Not Found</title></head>');
    res.write('<body><h1>Page Not Found</h1></body>');
    res.write('</html>');
    return res.end();
 }
};

module.exports=userRequestHandler