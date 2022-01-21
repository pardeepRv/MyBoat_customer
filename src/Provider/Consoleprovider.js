import React from 'react';
class Consoleprovider {
    consolelog(key,message)
    {
        return console.log(key,message)
    }
}
export const consolepro =new Consoleprovider();