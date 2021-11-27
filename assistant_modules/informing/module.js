const Forms = require('./forms.js');
const Tables = require('./tables.js');
const Func = require('./../function.js');

const ModuleName = 'informing';
const Description = 'Модуль информирования';

function getFormList() {
    return Object.keys(Forms);
};

async function getFormsReestr() {
    const formList = getFormList();
    return Func.getFormsReestr({
        Forms,
        formList
    });
};

async function getDocReestr(formName) {
    return await Func.getDocReestr({
        moduleName: ModuleName,
        Forms,
        formName
    });
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
    })
};

async function deleteDoc(formName, data) {
    return await Func.deleteDoc({
        moduleName: ModuleName,
        Forms,
        formName,
        data
    })
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