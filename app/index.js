/* globals __dirname */
const async = require('async');
const _ = require('lodash');
const path = require('path');
const childProcess = require('child_process');
const phantomjs = require('phantomjs-prebuilt');

const binPath = phantomjs.path;
const flags = [
    '--ssl-protocol=any',
    '--ignore-ssl-errors=true',
];
const scriptFilePath = path.resolve(__dirname, './../scripts/checkHomeShowcases.js');
const publishersURLs = [
    // 'https://www.americanas.com.br',
    // 'http://www.barateiro.com.br',
    // 'https://www.carrefour.com.br',
    // 'https://www.casasbahia.com.br',
    // 'https://www.centauro.com.br',
    // 'https://www.efacil.com.br',
    // 'https://www.epocacosmeticos.com.br',
    // 'https://www.extra.com.br',
    // 'https://www.pontofrio.com.br',
    'http://www.ricardoeletro.com.br',
    // 'https://www.submarino.com.br',
    // 'https://www.shoptime.com.br',
];
const arr = [
    'Americanas',
    'Barateiro',
    'Carrefour',
    'Casas Bahia',
    'Centauro',
    'Efacil',
    'Epoca Cosmeticos',
    'Exito',
    'Extra',
    'Falabella',
    'Fastsohp',
    'Magazine Luiza',
    'Panvel',
    'Ponto Frio',
    'Ricardo Eletro',
    'Saraiva',
    'Shoptime',
    'Submarino',
    'Walmart',
];

// const tasks = _.map(publishersURLs, (url) =>
//         callback => childProcess.execFile(
//             binPath,
//             ['--ssl-protocol=tlsv1', '--ignore-ssl-errors=true', scriptFilePath, url],
//             (err, stdout, stderr) => {
//                 console.log(stdout);
//
//                 callback();
//             }));
//
// async.parallel(tasks, () => console.log('Finish'));

async.each(publishersURLs,
    (url, asyncCallback) => {
        childProcess.execFile(binPath, [
            '--ssl-protocol=tlsv1',
            '--ignore-ssl-errors=true',
            scriptFilePath,
            url
        ], (err, stdout, stderr) => {
            console.log(stdout);

            asyncCallback();
        });
    },
    (asyncErr) => {
        if (asyncErr) {
            console.log(asyncErr);
        } else {
            // ...
        }
    }
);
