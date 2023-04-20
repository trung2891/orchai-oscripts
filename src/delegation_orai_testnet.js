import _ from "https://deno.land/std@0.120.0/node/module.ts";

const httpGet = async (url) => {
    const data = await fetch(url).then(data => data.json());
    return data;
}

/* 
* @params {string} '["[\"orai1u0vfsjqh0uztlmlwv9cswggn5xkvrt4sayaxme\"]"]'
*/


const main = async (input) => {
    const responses = [];
    let userAddress = JSON.parse(input)[0];
    const url = `https://lcd.testnet.orai.io/cosmos/staking/v1beta1/delegations/${userAddress}`;
    const result = await httpGet(url);
    for (let objectStruct of result.delegation_responses) {
        responses.push({
            account: objectStruct.delegation.validator_address,
            amounts: [objectStruct.balance.amount]
        });
    }
    console.log(JSON.stringify(responses))
};

main(...process.argv.slice(2))
