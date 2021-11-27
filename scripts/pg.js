const {
    Pool
} = require('pg');
const config = require('.././config.js');
const Column = require('./../assistant_modules/column.js');
const pool = new Pool(config.dbConfig);

/**
 * pg module.
 * @module pg
 */

/**
 * Поиск записи в таблице по docID и/или id.
 * @param {BigInt} docID - id таблицы.
 * @param {BigInt} id - id таблицы.
 * @returns {Object.<string, string>} Возвращает строку таблицы в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function findByID({
    Schema,
    TableName,
    ColumnList,
    id
}) {
    let response = {};
    if (!Schema) return response.Error = 'Schema is null';
    if (!TableName) return response.Error = 'TableName is null';
    if (!id) return response.Error = 'id is null';

    let query = '';
    const columnList = ColumnList.map(col => '"' + col + '"').join(',');

    const client = await pool.connect();
    try {
        query = 'SELECT ' + columnList.toString() + ' FROM "' + Schema.toString() + '"."' + TableName.toString() + '" WHERE id = $1';
        //console.log('query=',query);
        const tableData = await client.query(query, [id]);
        response = tableData.rows[0];

        /*res = await client.query('SELECT * FROM document WHERE id = $1', [docID]);
        console.log('res=', res.rows[0]);
        const doc = res.rows[0];
        res = await client.query('SELECT * FROM ' + doc.tablename + ' WHERE id = $1', [id]);
        response = res.rows[0];*/
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Прямой доступ в бд для системных нужд при выполнении скриптов PG и для создания скриптов в БД.
 * @param {Text} pgScr - id таблицы document.
 * @returns {Object[]} Возвращает строки таблицы в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function pgExecScript({
    query
} = {}) {
    let response = {};

    if (!query) return response.Error = 'не передан скрипт для выполнения';

    const client = await pool.connect();
    try {
        //Если есть where - ищем по условию в таблице документа
        console.log('query=', query);
        const tableData = await client.query(query);
        response = tableData.rows || tableData;
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};


/**
 * Поиск записей в таблице по docID и/или условию where.
 * @param {BigInt} docID - id таблицы document.
 * @param {Object.<string, string>} where - условие поиска. Ключ - Наименование столбца, значение - Содержимое столбца.
 * @returns {Object[]} Возвращает строки таблицы в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function findAll({
    Schema,
    TableName,
    ColumnList,
    Where
} = {}) {
    let response = {};
    let query = '';
    let where = '';
    if (!Schema) return response.Error = 'Schema is null';
    if (!TableName) return response.Error = 'TableName is null';
    const columnList = ColumnList.map(col => '"' + col + '"').join(',');

    const client = await pool.connect();
    try {
        //Если есть where - ищем по условию в таблице документа
        if (Where) {
            Where.forEach((row) => {
                where = where == '' ? where : where + ' AND ';
                where = where + ' "' + row.Column_Name + '" ' + row.Operation + " '" + row.Column_Value + "' ";
            });
            query = 'SELECT ' + columnList.toString() + ' FROM "' + Schema.toString() + '"."' + TableName.toString() + '" WHERE ' + where + ' ORDER BY "id"';
            console.log('query=', query);
            const tableData = await client.query(query);
            response = tableData.rows;
        } else if (TableName) { //Если нет where - ищем все записи в таблице документа
            query = 'SELECT ' + columnList.toString() + ' FROM "' + Schema.toString() + '"."' + TableName.toString() + '" ORDER BY "id"';
            console.log('query=', query);
            const tableData = await client.query(query);
            response = tableData.rows;
        } else {
            /*let res = await client.query('SELECT * FROM document');
            const docModel = res.rows;
            res = await client.query('SELECT * FROM docColumn');
            const docColumnModel = res.rows;
            response = {
                docModel,
                docColumnModel
            };*/
        };
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Поиск записи в таблице по docID и id, также потск данных в дочерних таблицах.
 * @param {BigInt} docID - id таблицы document.
 * @param {BigInt} id - id таблицы docColumn.
 * @returns {Object[]} Возвращает строки таблиц в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function findWithChildren({
    docID,
    id
}) {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ДОДЕЛАТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let response = {};
    if (!docID) return response.Error = 'docID is null';

    const client = await pool.connect();
    try {
        const mainTableName = await client.query('SELECT * FROM document WHERE id = $1', [docID]);
        const mainTableData = await client.query('SELECT * FROM ' + mainTableName.rows[0].tablename + ' WHERE id = $1');
        response.mainTableData = mainTableData;

        const childrenTableNames = await client.query('SELECT * FROM document WHERE parent = $1', [docID]);
        //Асинхронный перебор массива
        for await (const childrenTableName of childrenTableNames) {
            response[tableName] = await client.query('SELECT * FROM ' + tableName + ' WHERE' + mainTableName.rows[0].tablename + 'ID = $1', [id]);
        };

    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Возвращает информацию о столбцах таблиц системы
 * @param {BigInt} TableID - id таблицы tableList.
 * @returns {Object[]} Возвращает строки таблицы в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function tableInfo({
    Schema,
    TableID,
    Type,
    TableName
} = {}) {
    let response = {};
    let res = {};
    let query = '';
    const client = await pool.connect();
    try { //query = 'ALTER TABLE "' + Schema.toString() + '"."' + Name.toString() + '" ADD COLUMN ' + _columnGet.column;
        if (TableID) {
            query = 'SELECT * FROM "' + Schema.toString() + '"."tableList" WHERE "id" = "' + TableID.toString() + '"';
            res = await client.query(query);
            response = res.rows[0];
        } else if (Type && TableName) {
            query = 'SELECT * FROM "' + Schema.toString() + '"."tableList" WHERE "Type" = ' + `'` + Type.toString() + `'`;
            query = query + ' AND "TableName" = ' + `'` + TableName.toString() + `'`;
            res = await client.query(query);
            response = res.rows;
        } else if (Type) {
            query = 'SELECT * FROM "' + Schema.toString() + '"."tableList" WHERE "Type" = ' + `'` + Type.toString() + `'`;
            res = await client.query(query);
            response = res.rows;
        } else if (TableName) {
            query = 'SELECT * FROM "' + Schema.toString() + '"."tableList" WHERE "TableName" = ' + `'` + TableName.toString() + `'`;
            res = await client.query(query);
            response = res.rows[0];
        } else {
            query = 'SELECT * FROM "' + Schema.toString() + '"."tableList"';
            res = await client.query(query);
            response = res.rows;
        };
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Поиск в таблице columnlist
 * @param {BigInt} TableID - id таблицы tableList.
 * @param {BigInt} id - id таблицы columnList.
 * @returns {Object[]} Возвращает строки таблицы в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function columnListInfo({
    Schema,
    TableID,
    id
} = {}) {
    let response = {};
    let res = {};
    let query = '';
    const client = await pool.connect();
    try {
        if (id) {
            query = 'SELECT * FROM "' + Schema.toString() + '"."columnList" WHERE "id" = ' + id.toString();
            res = await client.query(query);
            response = res.rows[0];
        } else if (TableID) {
            query = 'SELECT * FROM "' + Schema.toString() + '"."columnList" WHERE "TableID" = ' + TableID.toString();
            res = await client.query(query);
            response = res.rows;
        } else {
            query = 'SELECT * FROM "' + Schema.toString() + '"."columnList"';
            res = await client.query(query);
            response = res.rows;
        };
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Создаёт новую строку и возвращает её в в виде объекта
 * @param {Object.<string, string>} Schema - наименование схемы
 * @param {Object.<string, string>} TableName - наименование таблицы
 * @returns {Object.<string, string>}
 */
async function create({
    Schema,
    TableName
} = {}) {
    let response = {};
    let res = {};
    if (!Schema) return response.Error = 'Schema is null';
    if (!TableName) return response.Error = 'TableName is null';

    let query = '';

    const client = await pool.connect();
    try {
        query = 'INSERT INTO "' + Schema.toString() + '"."' + TableName.toString() + '" ("Name") VALUES ($1)';
        //console.log('query=',query);
        await client.query(query, ['newRow']);

        query = 'SELECT MAX(id) FROM "' + Schema.toString() + '"."' + TableName.toString() + '"';
        res = await client.query(query);
        const newId = res.rows[0].max;

        query = 'SELECT * FROM "' + Schema.toString() + '"."' + TableName.toString() + '" WHERE id = $1';
        const newDoc = await client.query(query, [newId]);
        response = newDoc.rows[0];

        //response = tableData.rows[0];
        //response = 'New data add';
        /*
        query = 'SELECT * FROM "' + Schema.toString() + '"."tableList" WHERE "id" = ' + TableID.toString();
        res = await client.query(query);
        const docModel = res.rows[0];
        //console.log('docModel=',docModel);

        query = 'SELECT * FROM "' + Schema.toString() + '"."columnList" WHERE "TableID" = ' + TableID.toString();
        res = await client.query(query);
        const docColumnModel = res.rows;
        console.log('docColumnModel=', docColumnModel);
*/
        //query = 'INSERT INTO "' + Schema.toString() + '"."'+docModel.TableName.toString()+'" ("Name", "ColumnName", "Description", "DataType", "TableID") VALUES (';
        //query = query + name + ',' + columnName + ',' + description + ',' + datatype + ',' + tableID + ')';
        /* res = await client.query('SELECT * FROM doccolumn WHERE docid = $1', [docID]);
         const docColumnModel = res.rows;

         docColumnModel.forEach((row) => {
             //Пребираем объект
             Object.entries(docColumn).forEach(([key, value]) => {
                 if (row.columnname == key) {
                     variable.push(value);
                     columns = columns == '' ? row.columnname : columns + ', ' + row.columnname;
                     values = values == '' ? '$' + id : values + ', ' + '$' + id;
                     id = id + 1;
                 };
             });
         });
         //console.log('columns=', columns);
         //console.log('values=', values);
         //console.log('variable=', variable);

         const query = 'INSERT INTO ' + docModel.tablename + ' (' + columns + ') VALUES (' + values + ')';
         console.log('query=', query);
         await client.query(query, variable);

         res = await client.query('SELECT MAX(id) FROM ' + docModel.tablename);
         const newId = res.rows[0].max;
         //console.log('res=',res);
         const newDoc = await client.query('SELECT * FROM ' + docModel.tablename + ' WHERE id = $1', [newId]);
         response = newDoc.rows[0];
         */
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Резервирование следующего значения поля id
 * @param {Object.<string, string>} Schema - наименование схемы
 * @param {Object.<string, string>} TableName - наименование таблицы
 * @returns {string}
 */
async function getNextID({
    Schema,
    TableName
} = {}) {
    let response = {};
    if (!Schema) return response.Error = 'Schema is null';
    if (!TableName) return response.Error = 'TableName is null';

    let query = '';
    const client = await pool.connect();
    try {
        query = `SELECT nextval('"` + Schema.toString() + `"."` + TableName.toString() + `_id_seq"');`;
        const newRow = await client.query(query);
        response = newRow.rows[0].nextval;

    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Создание новой строки в таблице tableList.
 * @param {Object.<string, string>} Schema_Name_TableName_Description_Parent_Type
 * @returns {Object.<string, string>} Возвращает новую строку таблицы tableList в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function createTable({
    Schema,
    Name,
    TableName,
    Description,
    Parent,
    Type
}) {
    let response = {};
    let query = '';
    const client = await pool.connect();
    try {
        const doc = await client.query('SELECT MAX(id) FROM tableList');
        const newId = doc.rows[0].max ? Number(doc.rows[0].max) + 1 : 1;
        //console.log('newId=', newId);
        let type;
        let name = `'` + Name.toString() + `'`;
        if (Type) { //Если явно указан тип таблицы: Документ(document), Справочник(dictionary)
            type = `'` + Type.toString() + `'`;
            if (Type == 'document') name = Name ? name : `'Новый_документ` + newId + `'`;
            if (Type == 'dictionary') name = Name ? name : `'Новый_справочник` + newId + `'`;
        } else {
            name = Name ? name : `'Новая_таблица` + newId + `'`;
        };
        const tableName = TableName ? `'` + TableName.toString() + `'` : `'newtable` + newId + `'`;
        const description = Description ? `'` + Description.toString() + `'` : `''`;
        const parent = Parent ? `'` + Parent.toString() + `'` : null;

        query = 'INSERT INTO "' + Schema.toString() + '"."tableList" ("Name", "TableName", "Description", "Parent", "Type") VALUES (';
        query = query + name + ',' + tableName + ',' + description + ',' + parent + ',' + type + ')';

        await client.query(query);

        query = 'SELECT * FROM "' + Schema.toString() + '"."tableList"  WHERE ';
        query = query + ' "Name" = ' + name + ' and "TableName" = ' + tableName;
        query = query + ' and "Description" = ' + description + ' and "Type" = ' + type;

        const newTable = await client.query(query);
        response = newTable.rows[0];

    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Создание новой строки в таблице columnList.
 * @param {BigInt} TableID - id таблицы document.
 * @param {Object.<string, string>} columnList - значения в новой строке. Ключ - Наименование столбца, значение - Содержимое столбца.
 * @returns {Object.<string, string>} Возвращает новую строку таблицы columnList в виде объекта, типа: Ключ - Наименование столбца, значение - Содержимое столбца.
 */
async function createColumn({
    Schema,
    Name,
    ColumnName,
    DataType,
    Description,
    TableID
} = {}) {
    let response = {};
    let query = '';
    const client = await pool.connect();
    if (!TableID) return response.Error = 'TableID is null';
    try {
        const doc = await client.query('SELECT MAX(id) FROM "' + Schema.toString() + '"."columnList"');
        const newId = doc.rows[0].max ? Number(doc.rows[0].max) + 1 : 1;
        //console.log('newId=', newId);
        const name = Name ? `'` + Name.toString() + `'` : `'Новый_столбец` + newId + `'`;
        const columnName = ColumnName ? `'` + ColumnName.toString() + `'` : `'newcolumn'` + newId + `'`;
        const datatype = DataType ? `'` + DataType.toString() + `'` : 'TEXT';
        const description = Description ? `'` + Description.toString() + `'` : `''`;
        const tableID = TableID.toString();

        query = 'INSERT INTO "' + Schema.toString() + '"."columnList" ("Name", "ColumnName", "Description", "DataType", "TableID") VALUES (';
        query = query + name + ',' + columnName + ',' + description + ',' + datatype + ',' + tableID + ')';

        //console.log('query=', query);
        await client.query(query);

        query = 'SELECT * FROM "' + Schema.toString() + '"."columnList"  WHERE ';
        query = query + ' "Name" = ' + name + ' and "ColumnName" = ' + columnName;
        query = query + ' and "Description" = ' + description + ' and "TableID" = ' + TableID;

        const newColumn = await client.query(query);
        response = newColumn.rows[0];

    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};



/**
 * Информация о таблице в БД
 * @param {Object.<string, string>} Content - Type: [table, view, schema], Schema, Name, tableID.
 * @returns {Object.<string, string>} dbInfo: response.Exists, response.columnList
 */
async function dbInfo({
    Type,
    Schema,
    Name
} = {}) {
    let response = {};
    if (!Type) return response.Error = 'Type is null';
    if (!Name) return response.Error = 'Name is null';

    //let variable = [];
    //if (Schema) variable = [ Schema.toString(), Name.toString()]
    //else variable = [Name.toString()];
    let query = '';
    let resp = {};
    let table_type = '';

    const client = await pool.connect();

    try {
        if (Type == 'table' || Type == 'view') {
            if (!Schema) return response.Error = 'Schema is null';
            if (Type == 'table') table_type = 'BASE TABLE';
            if (Type == 'view') table_type = 'VIEW';

            query = `SELECT EXISTS (
                SELECT 1
                FROM  information_schema.tables
                WHERE table_schema  = '` + Schema.toString() + `' 
                AND table_name = '` + Name.toString() + `'
                AND table_type = '` + table_type + `'
                )`;

            resp = await pool.query(query);
            //console.log('resp=', resp.rows[0]);

            //if(Schema=='Request')console.log('query=', Schema, Name,resp.rows[0].exists);

            response.Exists = resp.rows[0].exists;

            if (response.Exists) {
                query = `SELECT column_name, column_default, is_nullable, data_type
                    FROM  information_schema.columns 
                    WHERE table_schema = '` + Schema.toString() + `' 
                      AND table_name = '` + Name.toString() + `'`;
                resp = await pool.query(query);
                //console.log('resp=',resp.rows);
                response.columnList = resp ? resp.rows : [];
            };
        };

        if (Type == 'schema') {
            query = `SELECT EXISTS (
                        SELECT 1
                        FROM  information_schema.schemata
                        WHERE schema_name = '` + Name.toString() + `')`;
            //console.log('query=', query);
            resp = await pool.query(query);
            //console.log('resp=', resp.rows[0]);

            response.Exists = resp.rows[0].exists;

            if (response.Exists) {
                query = `SELECT schema_name, schema_owner
                    FROM  information_schema.schemata 
                    WHERE schema_name = '` + Name.toString() + `'`;
                resp = await pool.query(query);
                //console.log('resp=',resp.rows);
                response.columnList = resp.rows;
            };
        };
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Работа с объектами в БД
 * @param {string} Type - тип объекта: table, view.
 * @param {string} Name - наименование объекта.
 * @param {string} Method - метод изменения: create, alter, drop.
 * @param {Object[]} columnList - значения объекта. Ключ - Наименование, значение - Содержимое.
 * @returns {Object.<string, string>} - информация: Message или Error.
 */
async function entityChange({
    Type,
    Schema,
    Name,
    Method,
    columnList,
    TableModel
} = {}) {
    let response = {};
    let resp = [];
    let query = '';
    if (!Schema) return response.Error = 'Schema is null';
    if (!Name) return response.Error = 'Name is null';

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        if (Method == 'create') {
            if (Type == 'table') {
                query = 'CREATE TABLE "' + Schema.toString() + '"."' + Name.toString() + '"';
                query = query + ' ( id BIGSERIAL PRIMARY KEY ';
                query = query + ', rct TIMESTAMP NOT NULL DEFAULT NOW()'; //row create time
                query = query + ', rut TIMESTAMP NOT NULL DEFAULT NOW()'; //row update time
                query = query + ', rcu VARCHAR(100) NOT NULL DEFAULT USER'; //row create user
                query = query + ', ruu VARCHAR(100) NOT NULL DEFAULT USER'; //row update user
                query = query + ', rco VARCHAR(100) NOT NULL DEFAULT USER'; //row create organization
                query = query + ', ruo VARCHAR(100) NOT NULL DEFAULT USER'; //row update organization
                query = query + ')';
                //console.log('query=',query);
                await pool.query(query);
                response.Message = 'SUCCESSFULLY: ' + query;
            };
            if (Type == 'view') {
                query = 'CREATE VIEW "' + Schema.toString() + '"."' + Name.toString() + '" AS ';
                query = query + TableModel.ViewSelectScript.toString();
                //console.log('query=', query);
                await pool.query(query);
                response.Message = 'SUCCESSFULLY: ' + JSON.stringify(query);
            };
        };
        if (Method == 'alter') {
            if (Type == 'table') {
                //Если есть columnList
                if (columnList) {
                    for await (const column of columnList) {
                        const _columnGet = columnGet(column, TableModel);
                        if (_columnGet.Error) throw new UserException(_columnGet.Error);
                        query = 'ALTER TABLE "' + Schema.toString() + '"."' + Name.toString() + '" ADD COLUMN ' + _columnGet.column + ';';
                        console.log('query=', query);
                        await pool.query(query);
                        resp.push(query);
                    };
                    response.Message = 'SUCCESSFULLY: ' + resp;
                };
            };
        };

        await client.query('COMMIT');
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
        await client.query('ROLLBACK');
    } finally {
        client.release();
    };
    return response;
};

function UserException(message) {
    this.message = message;
    this.stack = message;
    this.name = "Исключение, определённое пользователем";
}

/**
 * Возвращает описание полей через запятую
 * @param {Object.<string, string>} columnList - массив объектов с описанием полей
 * @returns {Object.<string, string>} - response.Error или response.column
 */
function columnGet(column, TableModel) {
    //console.log('TableModel.column=',TableModel[column]);
    let response = {};
    const columnname = column;
    if (!columnname) return response.Error = 'ColumnName is null';

    const datatype = TableModel[column].DataType;
    if (!datatype) return response.Error = 'DataType is null';

    let allowNull = 'true'; // По умолчанию true
    if (TableModel[column].AllowNull == 'false') allowNull = ' NOT NULL '
    else allowNull = ' NULL ';

    let _default = TableModel[column].Default ? ` DEFAULT '` + TableModel[column].Default + `'` : '';

    let unique = 'false'; //По умолчанию false
    if (TableModel[column].Unique == 'true') unique = ' UNIQUE '
    else unique = '';

    unique = _default ? '' : unique; //Поля взаимоисключающие

    let references = ' ';
    if (TableModel[column].References != '') {
        references = ' REFERENCES ' + TableModel[column].References + ' ';
        allowNull = '';
        _default = '';
        unique = '';
    };

    const query = '"' + columnname + '" ' + datatype + references + allowNull + unique + _default;
    response.column = query;

    return response;
};

/**
 * Ищет данные в таблице docdictionary
 * @param {Bigint} docID id таблицы
 * @returns {Object.<string, string>} - response.Error или response.rows
 */
async function getDocDictionary({
    docID
} = {}) {
    let response = {};
    let res = {};
    const client = await pool.connect();
    try {
        if (docID) {
            res = await client.query('SELECT * FROM docdictionary WHERE id = $1', [docID]);
            response = res.rows[0];
        } else {
            res = await client.query('SELECT * FROM docdictionary');
            response = res.rows;
        };
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Создаёт строку в таблице docdictionary
 * @returns {Object.<string, string>} - response.Error или response.rows
 */
async function createDocDictionary({
    _name,
    _description
} = {}) {
    let response = {};
    let res = {};
    const client = await pool.connect();
    try {
        const doc = await client.query('SELECT MAX(id) FROM docdictionary');
        const newId = doc.rows[0].max ? Number(doc.rows[0].max) + 1 : 1;

        const name = _name ? _name : 'Новый_тип_докумена' + newId;
        const description = _description ? _description : '';
        const variable = [name, description];

        const query = `INSERT INTO docdictionary (name, description) VALUES ($1, $2)`;

        await client.query(query, variable);

        const newColumn = await client.query('SELECT * FROM docdictionary WHERE id = $1', [newId]);
        response = newColumn.rows[0];
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

/**
 * Создаёт строку в таблице docdictionary
 * @returns {Object.<string, string>} - response.Error или response.rows
 */
async function createSchema({
    Name
} = {}) {
    let response = {};
    if (!Name) return response.Error = 'Name is null';
    const client = await pool.connect();
    try {
        response = await client.query('CREATE SCHEMA "' + Name.toString() + '"');
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

async function deleteRow({
    Schema,
    TableName,
    ColumnList
} = {}) {
    let response = {};
    let res = {};
    if (!Schema) return response.Error = 'Schema is null';
    if (!TableName) return response.Error = 'TableName is null';
    if (!ColumnList) return response.Error = 'ColumnList is null';
    //console.log('ColumnList=',ColumnList);

    let query = '';

    const client = await pool.connect();
    try {
        const columnList = ColumnList.map(row => row.id).join(',');
        query = 'DELETE FROM "' + Schema.toString() + '"."' + TableName.toString() + '" WHERE id IN (' + columnList.toString() + ')';
        const tableData = await client.query(query);
        response = 'Rows DELETED';
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

async function updateRow({
    Schema,
    TableName,
    ColumnList
} = {}) {
    let response = {};
    let res = {};
    if (!Schema) return response.Error = 'Schema is null';
    if (!TableName) return response.Error = 'TableName is null';
    if (!ColumnList) return response.Error = 'ColumnList is null';
    const Form = ColumnList;
    let query = '';
    let columnNumber = 2;
    let value = '';
    const updateValueList = [Form.id.Value];

    const columnList = Form.ColumnList;
    //console.log('columnList=',columnList);
    columnList.forEach((columnName) => {
        if (columnName != 'id') {
            //console.log('columnName=', columnName, 'DataType=', Form[columnName].DataType);
            const Default = Form[columnName].Default ? Form[columnName].Default.toString() : '';
            if (Form[columnName].DataType == 'Boolean')
                value = Form[columnName].Value ? 'true' : 'false';
            else
                value = Form[columnName].Value ? Form[columnName].Value.toString() : Default;
            if (value != '') {
                updateValueList.push(value);
                query = query == '' ? query : query + ', ';
                query = query + '"' + columnName + '"=' + '$' + columnNumber.toString();
                columnNumber = columnNumber + 1;
            };
        };
    });
    const client = await pool.connect();
    try {
        query = 'UPDATE "' + Schema.toString() + '"."' + TableName.toString() + '" SET ' + query + ' WHERE "id" = $1';
        console.log('query=', query, updateValueList);
        await client.query(query, updateValueList);

        query = 'SELECT * FROM "' + Schema.toString() + '"."' + TableName.toString() + '" WHERE id = $1';
        //console.log('query=',query);
        const tableData = await client.query(query, [Form.id.Value]);
        response = tableData.rows[0];
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};


async function insertRow({
    Schema,
    TableName,
    Form,
    Options = ''
} = {}) {
    let response = {};
    let res = {};
    if (!Schema) return response.Error = 'Schema is null';
    if (!TableName) return response.Error = 'TableName is null';
    if (!Form) return response.Error = 'Form is null';
    let query = '';
    let columnNumber = 1;
    let columns = '';
    let insertValueList = [];
    let value = '';

    const columnList = Form.ColumnList;
    columnList.forEach((columnName) => {
        const Default = Form[columnName].Default ? Form[columnName].Default.toString() : '';
        if (Form[columnName].DataType == 'Boolean')
            value = Form[columnName].Value ? 'true' : 'false';
        else
            value = Form[columnName].Value ? Form[columnName].Value.toString() : Default;
        if (value != '') {
            columns = columns == '' ? columns : columns + ', ';
            columns = columns + '"' + columnName + '"';
            insertValueList.push(value);
            query = query == '' ? query : query + ', ';
            query = query + '$' + columnNumber.toString();
            columnNumber = columnNumber + 1;
        };
    });
    // console.log('Form.id.Value=',Form.id.Value);
    /* 
Реализована возможность встаки без указания ID. 
Вставленный ID вернется в response как и в случае с указанным id в Form.id.Value
*/
    if (Form.id.Value==''){
        Options=' returning id '+Options
    }
    const client = await pool.connect();
    try {
        query = 'INSERT INTO "' + Schema.toString() + '"."' + TableName.toString() + '" (' + columns + ') VALUES (' + query + ') ' + Options;
        console.log('query=', query, insertValueList);

        tableData = await client.query(query, insertValueList);

        let id = []
        if (Form.id.Value == '') {
            if (tableData.rows) {
                id.push(tableData.rows[0].id);
            }
        } else {
            id = Form.id.Value;
        }


        if (id != '') {
            query = 'SELECT * FROM "' + Schema.toString() + '"."' + TableName.toString() + '" WHERE id = $1';
            // console.log('query=',query);
            // console.log('id=',id);

            const tableData = await client.query(query, [id]);

            response = tableData.rows[0];
            // console.log('reponse=',response)
        }
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

async function conninfo() {
    let response = {};
    const client = await pool.connect();
    try {
        response = await client.query('SELECT * FROM pg_stat_activity;');
    } catch (error) {
        console.log(error.stack);
        response.Error = error.stack;
    } finally {
        client.release();
    };
    return response;
};

module.exports = {
    findByID,
    findAll,
    create,
    deleteRow,
    updateRow,
    getNextID,
    insertRow,
    dbInfo,
    entityChange,


    createTable,
    createColumn,
    tableInfo,
    columnListInfo,
    getDocDictionary,
    createDocDictionary,
    createSchema,
    conninfo,
    pgExecScript
};