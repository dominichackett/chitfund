export const chitFundTable ="chitfund_11155111_366"

//Query chitfund
//Insert Chitfund

export const queryChitFund = async(id:string,db:any)=>{
    try {
    const { results } = await db.prepare(`SELECT * FROM ${chitFundTable} where id=${id} ;`).all();

   return results;
}
catch(error:any)
{
    return []
}

}


export const insertChitFund = async(db:any,id:number,owner:string,frequency:number,startdate:number,image:string)=>{
    const { meta: insert } = await db
    .prepare(`INSERT INTO ${chitFundTable} ( id,owner,frequency,startdate,image) VALUES ( ?,?,?,?,?);`)
    .bind(id,owner,frequency,startdate,image)
    .run();

    // Wait for transaction finality
    //await insert.txn?.wait();
}