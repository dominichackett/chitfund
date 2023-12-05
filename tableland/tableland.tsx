import { Database } from "@tableland/sdk";
import { ethers } from "ethers";
export const chitFundTable ="mychitfund_80001_8389"
const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY)
const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/polygon_mumbai"
  );

const signer = wallet.connect(provider);

const db = new Database({signer})  


//Query chitfund
//Insert Chitfund

export const queryChitFund = async(id:string)=>{
    try {
    const { results } = await db.prepare(`SELECT * FROM ${chitFundTable} where id=${id} ;`).all();

   return results;
}
catch(error:any)
{
    return []
}

}


export const insertChitFund = async(id:number,owner:string,name:string,frequency:number,startdate:number,image:string,amount:number,cycletcount:number,participants:string)=>{
    const { meta: insert } = await db
    .prepare(`INSERT INTO ${chitFundTable} ( id,owner,name,frequency,startdate,image,amount,cyclecount,participants) VALUES ( ?,?,?,?,?,?,?,?,?);`)
    .bind(id,owner,name,frequency,startdate,image,amount,cycletcount,participants)
    .run();

    // Wait for transaction finality
    //await insert.txn?.wait();
}