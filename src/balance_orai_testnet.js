import _ from "https://deno.land/std@0.120.0/node/module.ts";

const httpGet = async (url) => {
    const data = await fetch(url).then(data => data.json());
    return data;
}

/* 
* @params {string} 'juno1e0m0tp2hxqj3rs2jv78p0dcswvjvf7pmrppsstxf6fk2llj5j47qj0h9rp'
*/

const main = async (userAddress) => {
    const responses = [];
    const url = `https://lcd.testnet.orai.io/cosmos/bank/v1beta1/balances/${userAddress}`;
    const result = await httpGet(url);
    for (let objectStruct of result.balances) {
        if(objectStruct.denom == "orai"){
            responses.push({
                account: userAddress,
                amounts: [objectStruct.amount]
            });
        }
    }
    console.log(JSON.stringify(responses))
};

main(...process.argv.slice(2))
