const Forms = require('./forms.js');
const Tables = require('./tables.js');
const pg = require('./../../scripts/pg.js');
const Func = require('./../function.js');

const ModuleName = 'request';
const Description = 'Заявочная система';

function getFormList() {
    return Object.keys(Forms);
};

async function getFormsReestr() {
    const formList = getFormList();
    //console.log('formList=',formList);
    return Func.getFormsReestr({
        Forms,
        formList
    });
    /*
    const formList = getFormList();
    //console.log('formList=',formList);

    let response = [];
    let id = 1;
    //Собираем информацию о формах модуля
    formList.forEach((formName) => {
        const Form = new Forms[formName]({
            id: 1
        });
        //console.log('Form=',Form);
        //console.log('Form.Name.Value=', formName, Form.FormDescription);
        const obj = {
            id: id,
            Name: Form.FormDescription,
            form: formName
        };
        response.push(obj);
        id = id + 1;
    });
    //console.log('dictionary.getFormsReestr.response=',response);

    return response;
    */
};

async function getDocReestr(formName) {
    return await Func.getDocReestr({
        moduleName: ModuleName,
        Forms,
        formName
    });
    /*const Form = new Forms[form]({
        id: 1
    });
    const response = await pg.findAll({
        Schema: ModuleName,
        TableName: Form.TableName,
        ColumnList: Form.ColumnList
    });

    return response;*/
};

async function getDoc(formName, id) {
    return await Func.getDoc({
        moduleName: ModuleName,
        Forms,
        formName,
        id
    });
}

function getTableList() {
    return Object.keys(Tables);
};

async function setDoc(formName, data, UserInfo) {
    return await Func.setDoc({
        moduleName: ModuleName,
        Forms,
        formName,
        data,
        UserInfo
    });
};

async function deleteDoc(formName, data) {
    return await Func.deleteDoc({
        moduleName: ModuleName,
        Forms,
        formName,
        data
    });
};

module.exports = {
    ModuleName,
    Description,
    getFormList, //Получить список форм модуля в виде массива 
    getFormsReestr, //Получить id, Name, form форм в виде массива 
    getDocReestr, //Получить реестр данных из таблицы по form
    getDoc, //Получить документ по id и form в виде DocMovement, Entity
    getTableList, //Таблицы модуля
    setDoc, //Записать документ в БД
    deleteDoc, //Удалить документ
    Forms
};