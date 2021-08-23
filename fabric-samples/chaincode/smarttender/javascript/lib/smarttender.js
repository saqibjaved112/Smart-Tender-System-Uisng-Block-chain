/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class smarttender extends Contract {

    async initLedger(ctx) {


    }
    async writeData(ctx,key,value) { 
        await ctx.stub.putState(key,value)
        return value;
    }
    async readData(ctx,key) { 
      var response =  await ctx.stub.getState(key);
        return response.toString()
    }


    async querytender(ctx, tender_id) {
        const tenderAsBytes = await ctx.stub.getState(tender_id); // get the tender from chaincode state
        if (!tenderAsBytes || tenderAsBytes.length === 0) {
            throw new Error(`${tender_id} does not exist`);
        }
        console.log(tenderAsBytes.toString());
        return tenderAsBytes.toString();
    }

    async createtender(ctx, tenderNumber, tender_id, tender_type, tender_disc,tender_status,tender_cost, owner) {
        console.info('============= START : Create tender ===========');

        const tender = {
            tenderNumber,
            tender_id,
            docType: 'tender',
            tender_type,
            tender_disc,
            tender_status,
            tender_cost,
            owner,
        };
        await ctx.stub.putState(tender_id, Buffer.from(JSON.stringify(tender)));
        await ctx.stub.putState(tenderNumber, Buffer.from(JSON.stringify(tender)));
        console.info('============= END : Create tender ===========');
    }

    async queryAlltenders(ctx) {
        const startKey = 'tender0';
        const endKey = 'tender999';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }



   //========================================================================
   async querybidder(ctx, bidder_id) {
    const bidderAsBytes = await ctx.stub.getState(bidder_id); // get the bidder from chaincode state
    if (!bidderAsBytes || bidderAsBytes.length === 0) {
        throw new Error(`${bidder_id} does not exist`);
    }
    console.log(bidderAsBytes.toString());
    return bidderAsBytes.toString();
}

 async createbidder(ctx, bidderNumber, bidder_id,tid,b_name,b_number,b_cnic,b_status,b_experience,industry_name) {
    console.info('============= START : Create bidder ===========');

    const bidder = {
        bidderNumber,
       bidder_id,
        docType: 'bidder',
        //tid=tender
        tid,
       b_name,
        b_number,
        b_cnic,
        b_status,
       b_experience,
       industry_name,
    };

    await ctx.stub.putState(bidder_id, Buffer.from(JSON.stringify(bidder)));
    await ctx.stub.putState(bidderNumber, Buffer.from(JSON.stringify(bidder)));
    console.info('============= END : Create bidder ===========');
  }

 async queryAllbidders(ctx) {
    const startKey = 'bidder0';
    const endKey = 'bidder999';
    const allResults = [];
    for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
        const strValue = Buffer.from(value).toString('utf8');
        let record;
        try {
            record = JSON.parse(strValue);
        } catch (err) {
            console.log(err);
            record = strValue;
        }
        allResults.push({ Key: key, Record: record });
    }          
    console.info(allResults);
    return JSON.stringify(allResults);
 }





 async verify(ctx, bidder_id) {
    const tenderAsBytes = await ctx.stub.getState(bidder_id); // get the tender from chaincode state
    if (!tenderAsBytes || tenderAsBytes.length === 0) {
        throw new Error(`${bidder_id} does not exist`);
    }
    console.log(tenderAsBytes.toString());
    return tenderAsBytes.toString();
 }

 async vryrec(ctx, bidderNumber, bidder_id,tid,message) {
    console.info('============= START : Create verifyrecord ===========');

    const issuetender = {
        bidderNumber,
       bidder_id,
        docType: 'verifyrecord',
        //tid=tender
        tid,
       message,
    };
    await ctx.stub.putState(bidder_id, Buffer.from(JSON.stringify(issuetender)));
    await ctx.stub.putState(bidderNumber, Buffer.from(JSON.stringify(issuetender)));
}

}
//===================================================================================
//===================================================================================

class bidderprofile extends Contract {

    async initLedger(ctx) {
    
        await ctx.stub.putState("Welcome to the ledger","hello world")
        return "success"
    }
    async writeData(ctx,key,value) { 
        await ctx.stub.putState(key,value)
        return value;
    }
    async readData(ctx,key) { 
      var response =  await ctx.stub.getState(key);
        return response.toString()
    }


    async querybidder(ctx, bidder_id) {
        const bidderAsBytes = await ctx.stub.getState(bidder_id); // get the bidder from chaincode state
        if (!bidderAsBytes || bidderAsBytes.length === 0) {
            throw new Error(`${bidder_id} does not exist`);
        }
        console.log(bidderAsBytes.toString());
        return bidderAsBytes.toString();
    }

    async createbidder(ctx, bidderNumber, bidder_id,tid,b_name,b_number,b_cnic,b_status,b_experience,industry_name) {
        console.info('============= START : Create bidder ===========');
    
        const bidder = {
           bidder_id,
            docType: 'bidder',
            //tid=tender
            tid,
           b_name,
            b_number,
            b_cnic,
            b_status,
           b_experience,
           industry_name,
        };

        await ctx.stub.putState(bidderNumber, Buffer.from(JSON.stringify(bidder)));
        console.info('============= END : Create bidder ===========');
    }

    async queryAllbidders(ctx) {
        const startKey = 'bidder0';
        const endKey = 'bidder999';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }



}


class issuetender extends Contract {

    async initLedger(ctx) {

    }
    async writeData(ctx,key,value) { 
        await ctx.stub.putState(key,value)
        return value;
    }
    async readData(ctx,key) { 
      var response =  await ctx.stub.getState(key);
        return response.toString()
    }

async verify(ctx, bidder_id) {
    const tenderAsBytes = await ctx.stub.getState(bidder_id); // get the tender from chaincode state
    if (!tenderAsBytes || tenderAsBytes.length === 0) {
        throw new Error(`${bidder_id} does not exist`);
    }
    console.log(tenderAsBytes.toString());
    return tenderAsBytes.toString();
}

async vryrec(ctx, bidderNumber, bidder_id,tid,message) {
    console.info('============= START : Create verifyrecord ===========');

    const issuetender = {
        bidderNumber,
       bidder_id,
        docType: 'verifyrecord',
        //tid=tender
        tid,
       message,
    };
    await ctx.stub.putState(bidder_id, Buffer.from(JSON.stringify(issuetender)));
    await ctx.stub.putState(bidderNumber, Buffer.from(JSON.stringify(issuetender)));
}



}

module.exports = issuetender;

module.exports = bidderprofile;

module.exports = smarttender;
