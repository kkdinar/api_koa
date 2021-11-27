const Koa = require('koa');
const app = new Koa();

const Router = require('@koa/router');
const router = new Router();

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const config = require('./config.js');
const routes = require('./scripts/routes.js');

//Загрузчик файлов
const multer = require('@koa/multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({
    storage: storage,
});

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
});

/**
 * Метод get для корневого элемента "/". Вызывается routes.get_api.
 * @function routes.get_api
 */
router.get("/", routes.get_api);

router.options("/api", async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    ctx.status = 204;
    await next();
});

router.get("/api", routes.get);

router.post("/api", routes.post);

router.delete("/api", routes.delete);

router.get("/migrateDB", routes.migrateDB);

// router.get("/btreeFromWeb", routes.btreeFromWeb);


router.get("/visualization", routes.visualization);

router.options("/download", async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    ctx.status = 204;
    await next();
});

router.get("/download", routes.download);

router.options("/upload", async (ctx, next) => {
    //console.log('ctx=',ctx);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, UserAuthID');
    ctx.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    ctx.status = 204;
    await next();
});

router.post('/upload', upload.single('file'), routes.post_upload); 

app.use(router.routes());

app.listen(config.main_port);

module.exports.app = app;