const express = require('express'); //Express 모듈을 불러옴(Express : Node.js에서 웹서버를 쉽게 만들 수 있도록 도와주는 프레임 워크)
const cors = require('cors'); //CORS(Cross-Origin Resource Sharing)를 허용하는 모듈을 불러옴
const app = express(); //Express 앱 객체 생성, 서버의 라우팅, 설정 등을 처리
//const port = 8080; //서버가 동작할 포트를 8080으로 설정
const models = require('./models');
const multer = require('multer');
const upload = multer({
	storage: multer.diskStorage({
		destination: function(req, file, cb){
			cb(null, 'uploads/') //cb 함수에서 upload/ 에 저장해 줄거야
		},
	    filename: function(req,file,cb){
			cb(null, file.originalname)
		}
	
	})
});

const detectProduct = require('./helpers/detectProduct');
const { where } = require('sequelize');
const port = process.env.PORT || 8080;


app.use(express.json()); //JSON 형태의 body를 요청해서 파싱 (예 : POST 요청에서 {"name": "축구공"} 이런 JSON 데이터를 읽을 수 있도록 함)
app.use(cors()); // 다른 도메인에서 들어오는 요청도 허용 (주로 FE와 BE 서버가 다른 포트나 주소일 때 사용)
app.use('/uploads', express.static('uploads'));

app.get('/banners', (req,res) => {
	models.Banner.findAll({
		limit: 2
	}).then((result) => {
		res.send({
			banners : result,
		});
	}).catch((error) => {
		console.error(error);
		res.status(500).send('에러가 발생했습니다');
	});
})


app.get('/products',(req,res) => {  //'/products' 경로로 get method 요청이 있을 때, 함수 내용이 실행됨
    models.Product.findAll({
		order : [['createdAt', 'DESC']], //생성일자 기준 + 내림차순
		attributes : ['id','name','price','createdAt','seller', 'imageUrl', 'soldout'],
	}).then((result)=>{
		console.log("PRODUCTS : ", result);
		res.send({
			products : result
		})
	}).catch((error)=>{
		console.error(error);
		res.send("에러 발생");
	})


});

app.post('/products',(req,res) => {
    const body = req.body;
	const {name, description, price, seller, imageUrl} = body;

	if(!name || !description || !price || !seller || !imageUrl){
		res.status(400).send("모든 필드를 입력해 주세요");
	}
	detectProduct(imageUrl, (type) => {
		models.Product.create({
		name : name,
		description,
		price,
		seller,
		imageUrl,
		type,
		}).then((result) => {
			console.log('상품 생성 결과 : ', result);
			res.send({
				result,
			})
		}).catch((error) => {
			console.log(error);
			res.status(400).send('상품 업로드에 문제가 발생했습니다');
		})
	})
});

app.post("/purchase/:id", (req, res) => {
	const {id} = req.params;
	models.Product.update(
		{
			soldout: 1,
		},
		{
			where: {
				id,
			},
		}
	).then((result) => {
		res.send({
			result : true,
		});
	}).catch((error) => {
		console.error(error);
		res.status(500).send("에러가 발생했습니다");
	})
});

app.get('/products/:id', (req,res) => {
    const params = req.params;
    const {id} = params;
	models.Product.findOne({
		where : {
			id : id
		}
	}).then((result) => {
		console.log('PRODUCT : ', result);
		res.send({
			product : result
		})
	}).catch((error) => {
		console.error(error);
		res.status(400).send('상품 조회에 문제가 발생했습니다');
	})
});

app.post('/image', upload.single('image'),(req, res) => {
	const file = req.file;
	console.log(file);
	res.send({
		imageUrl : file.path,
	})
});

app.get("/products/:id/recommendation", (req, res) => {
	const {id} = req.params;
	models.Product.findOne({
		where : {
			id
		}
	}).then((product) => {
		//console.log(product);
		const type = product.type;
		models.Product.findAll({
			where : {
				type,
				id : {
					[models.Sequelize.Op.not] : id //id가 아닌 것들만
				}
			}
		}).then((products) => {
			res.send({
				products
			});

		})
	}).catch((error) => {
		console.error(error);
		res.status(500).send('에러가 발생했습니다');
	})
});

app.listen(port, '0.0.0.0', () => {
	console.log(`그랩의 쇼핑몰 서버가 ${port} 포트에서 열렸습니다`);
    console.log('그랩의 쇼핑몰 서버가 돌아가고 있습니다');
	models.sequelize.sync().then(()=>{ //데이터 베이스 동기화
		console.log('DB 연결 성공');
	}).catch((err)=>{
		console.error(err);
		console.log('DB 연결 오류');
		process.exit();
	})
});