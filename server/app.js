const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const multer = require('multer')
const ImageModel = require('./models/imagedata.model')
const { log } = require('console')
require('./models/conn')
const app = express()
const fs = require('fs')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('multiple'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, __dirname + '/multiple')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log(file);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
const upload = multer({ storage })

app.post('/up', upload.any(), async (req, res) => {
    // console.log(req.body);

    const files = []
    for (let i = 0; i < req.files.length; i++)
        files.push(`${req.files[i].filename}, ${req.files[i].originalname}`)

    // console.log(files);
    try {
        const info = await ImageModel.create({ names: files, ...req.body })
        console.log(info);
        res.send('ok')
    } catch (e) {
        console.log(e);
    }
});

app.post('/images', async (req, res) => {

    try {
        const filter = req.body.filter
        var info
        var regex = new RegExp('.*' + req.body.search + '.*')
        switch (filter) {
            case 'tags':
                console.log();
                info = await ImageModel.find({ tags: { $regex: regex } })
                break;
            case 'people':
                info = await ImageModel.find({ people: { $regex: regex } })
                break;
            case 'locations':
                info = await ImageModel.find({ locations: { $regex: regex } })
                break;
            case 'desc':
                info = await ImageModel.find({ desc: { $regex: regex } })
                break;
            case 'date':
                info = await ImageModel.find({ desc: { $regex: regex } })
                break;
            default:
            case 'desc':
                info = await ImageModel.find({})
                break;
        }

        var images = []
        // filter = filter || 'tags'
        for (let i = 0; i < info.length; i++) {
            obj = info[i]
            arr = obj.names
            arr.forEach(image => {
                images.push({ tags: obj.tags, name: image, groupId: obj.createdAt })
            });
        }
        res.json(images)
    } catch (e) {
        console.log(e);
        res.send('Error')
    }

});

app.delete('/images', async (req, res) => {
    files = req.body.files;
    gIds = [...new Set(req.body.files.map(file => file.groupId))]
    names = req.body.files.map(file => file.name)
    try {
        info = await ImageModel.updateMany({ createdAt: { $in: gIds } }, { $pullAll: { names: names } })
        del = await ImageModel.deleteOne({ names: { $exists: true, $size: 0 } });
    } catch (error) {
        console.log(error);
    }
    try {
        deleteFiles(names.map(name => `${__dirname}/multiple/${name.split(',')[0]}`), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('all files removed');
            }
        });
    } catch (error) {
        console.log(error);
    }
    res.json({ message: 'ok' })

    function deleteFiles(files, callback) {
        var i = files.length;
        files.forEach(function (filepath) {
            fs.unlink(filepath, function (err) {
                i--;
                if (err) {
                    callback(err);
                    return;
                } else if (i <= 0) {
                    callback(null);
                }
            });
        });
    }

})

app.listen(8000, () => console.log('Listening'))