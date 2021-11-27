const path = require('path');
const fs = require('fs');
const Forms = require('./forms.js');
const Tables = require('./tables.js');
const Func = require('./../function.js');

const ModuleName = 'filestorage';
const Description = 'Файловое хранилище';

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
    });
};

async function deleteDoc(formName, data) {
    //console.log('data=',data);
    for await (row of data.DocMovement) {
        //Удаляем файл
        const Doc = await getDoc(formName, row.id);
        //console.log('Doc=',Doc);
        if (!Doc) return;
        const dir = path.join('./uploads/', row.id);
        const filePath = path.join(dir, '/', Doc.DocMovement.Name);
        try {
            await fs.promises.stat(filePath);
            fs.promises.unlink(filePath);
        } catch (error) {
            console.log('error=', error);
        }
        try {
            await fs.promises.stat(dir);
            fs.promises.rmdir(dir);
        } catch (error) {
            console.log('error=', error);
        }

        //Сначала удаляем из основной таблицы формы
        const Module = require('./../' + Doc.DocMovement.ParentModuleName + '/module.js');
        const _Forms = Module.Forms;

        await Func.deleteDoc({
            moduleName: Doc.DocMovement.ParentModuleName,
            Forms: _Forms,
            formName: Doc.DocMovement.ParentFormName,
            data: {
                DocMovement: [{
                    id: Doc.DocMovement.ParentForm_id
                }]
            }
        });
    }

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