const BaseTable = require('./../basetable.js');

module.exports = class RequestReestrView extends BaseTable{
    constructor(...args) {
        super(...args);
    }
    get ColumnList() {
        return ['id', 'form', 'Name', 'Nomer', 'Date', 'Description',  'RequestStatus_id', 'RequestStatus_Name'];
    }
    get TableName() {
        return 'RequestReestrView';
    }
    get TableType(){
        return 'view';
    }
    get ViewSelectScript(){
        const script = `
        SELECT 
          d."id"
        , d."Name"
        , d."Nomer"
        , d."Date"
        , d."Description"
        , d."Contractor_id"
        , ee."RequestStatus_id"
        , ee."RequestStatus_Name"
        , 'Request' as "form"
        FROM "request"."DocMovement" AS d
        LEFT JOIN LATERAL (
            SELECT e."RequestStatus_id", e."RequestStatus_Name", e."Parent"
            FROM "request"."Entity" AS e 
            WHERE e."Parent" = d."id"
            ORDER BY e."DateBegin" DESC
            LIMIT 1) AS ee ON ee."Parent" = d."id"
        `;

        return script;
    }
}