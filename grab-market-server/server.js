const express = require('express'); //Express 모듈을 불러옴(Express : Node.js에서 웹서버를 쉽게 만들 수 있도록 도와주는 프레임 워크)
const cors = require('cors'); //CORS(Cross-Origin Resource Sharing)를 허용하는 모듈을 불러옴
const app = express(); //Express 앱 객체 생성, 서버의 라우팅, 설정 등을 처리
const port = 8080; //서버가 동작할 포트를 8080으로 설정


app.use(express.json()); //JSON 형태의 body를 요청해서 파싱 (예 : POST 요청에서 {"name": "축구공"} 이런 JSON 데이터를 읽을 수 있도록 함)
app.use(cors()); // 다른 도메인에서 들어오는 요청도 허용 (주로 FE와 BE 서버가 다른 포트나 주소일 때 사용)


app.get('/products',(req,res) => {  //'/products' 경로로 get method 요청이 있을 때, 함수 내용이 실행됨
    const query = req.query;
    console.log('QUERY : ', query);

    res.send({  //res.send() 는 클라이언트에 데이터를 응답하는 함수
        "products" : [
		      {
		        "id" : 1,
		        "name": "농구공",
		        "price": 100000,
		        "seller": "조던",
		        "imageUrl": "images/products/basketball1.jpeg"
		      },
		      {
		          "id": 2,
		        "name": "축구공",
		        "price": 50000,
		        "seller": "메시",
		        "imageUrl": "images/products/soccerball1.jpg"
		      },
		      {
		          "id" : 3,
		        "name": "키보드",
		        "price": 10000,
		        "seller": "그랩",
		        "imageUrl": "images/products/keyboard1.jpg"
		      }
	    ]
    });
});

app.post('/products',(req,res) => {
    const body = req.body;
    res.send({
        body
    });


});

app.get('/products/:id/events/:eventId', (req,res) => {
    const params = req.params;
    const {id, eventId} = params;
    res.send(`id는 ${id}와 ${eventId} 입니다.`);
})

app.listen(port, () => {
    console.log('그랩의 쇼핑몰 서버가 돌아가고 있습니다');
});