/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

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

        async vryrec(ctx, bidderNumber, bidder_id,tid,message) {
            console.info('============= START : Create verifyrecord ===========');
        
            const issuetender = {
                bidderNumber,
               bidder_id,
                docType: 'record',
                //tid=tender
                tid,
               message,
            };
            await ctx.stub.putState(bidder_id, Buffer.from(JSON.stringify(issuetender)));
            await ctx.stub.putState(bidderNumber, Buffer.from(JSON.stringify(issuetender)));
            console.info('============= END : Create verifyrecord ===========');
        }
    

    async verify(ctx, bidder_id) {
        const tenderAsBytes = await ctx.stub.getState(bidder_id); // get the tender from chaincode state
        if (!tenderAsBytes || tenderAsBytes.length === 0) {
            throw new Error(`${bidder_id} does not exist`);
        }
        console.log(tenderAsBytes.toString());
        return tenderAsBytes.toString();
    }


 
}

module.exports = issuetender;
