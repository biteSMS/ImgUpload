const mysql = require('mysql');

function insert(name) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'imgupload',
    });

    var addSql = 'INSERT INTO imginfo(name, path) VALUES(?,?)';
    var addSqlParams = [name, __dirname + '/uploads/' + name];

    if (name) {
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            //console.log('INSERT ID:',result.insertId);        
            console.log('INSERT ID:', result);
        });
    }
}

module.exports = insert;