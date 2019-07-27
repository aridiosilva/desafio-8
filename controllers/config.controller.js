require('dotenv').config();
const request = require('request');
json_controller = require('../controllers/json.controller');
js_controller = require('../controllers/js.controller');
const fs = require('fs');
const AdmZip = require('adm-zip');
const zip = new AdmZip();

exports.validad2 = (req, res) => {
    // const content = [json_controller.fileVariable, js_controller.fileVariable];
    // zip.addFile('./' + process.env.MARATONA_ID + '.js', './' + process.env.MARATONA_ID + '.json', Buffer.alloc(content.length, content), "");
    // zip.addLocalFile('./' + process.env.MARATONA_ID + '.js');
    // zip.addLocalFile('./' + process.env.MARATONA_ID + '.json');
    // zip.writeZip(process.env.MARATONA_ID + '.zip');
    // const length = fs.readFileSync('./' + process.env.MARATONA_ID + '.zip').length;
    const cpf = (req.body.cpf != undefined) ? req.body.cpf : null;

    if (cpf) {
        const body = {
            id: process.env.MARATONA_ID,
            desafio: process.env.DESAFIO,
            cpf: cpf,
            bucket: process.env.BUCKET,
            serviceInstanteId: process.env.IAM_SERVICEID_CRN,
            apikey: process.env.APIKEY
        };
        // fs.unlinkSync(process.env.MARATONA_ID + '.js');
        // fs.unlinkSync(process.env.MARATONA_ID + '.json');
        // fs.unlinkSync(process.env.MARATONA_ID + '.zip');
        if (!body) {
            res.status(404).json({
                msg: 'Something is missing'
            });
        } else {
            request({
                uri: 'https://8d829621.us-south.apiconnect.appdomain.cloud/desafios/desafio8',
                body: body,
                json: true,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            }, function (err, response) {
                if (err || response.body.error) {
                    console.log(err);
                    res.status(500).json({
                        msg: 'Something is wrong, contact support.'
                    });
                } else {
                    res.status(201).json({
                        msg: response.body
                    });
                }
            });
        }
    }
    else res.status(404).json({
        msg: 'CPF is missing!'
    });
}
