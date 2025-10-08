import { SCHEMA_FIELD_TYPE } from "redis";


export const userSchema = {
    '$.username': {
        type: SCHEMA_FIELD_TYPE.TEXT,
        SORTABLE: true,
        AS: 'username'
    },
    '.password': {
        type: SCHEMA_FIELD_TYPE.TEXT,
        AS: 'password'
    }
}