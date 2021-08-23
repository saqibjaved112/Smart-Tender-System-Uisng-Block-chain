/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('bidderprofile');
       //10
    //async createbidder(ctx, bidderNumber, bidder_id,tid,b_name,b_number,b_cnic,b_status,b_experience,b_experience) {
         await contract.submitTransaction('createbidder', 'bidder0','xyz123', 'abc123','mahad','090078601','3120787982739821','green list','10 year','mahad and sons');
         await contract.submitTransaction('createbidder', 'bidder1','xyz124', 'abc123','irum','9873498324','3120787982745645','green list','12 year','irum and co');
         await contract.submitTransaction('createbidder', 'bidder2','xyz125', 'abc125','saqib','9873498324','3120787982745645','green list','20 year','test');
         await contract.submitTransaction('createbidder', 'bidder3','xyz126', 'abc126','Rehman','9873498434','31324787982745645','red list','10 year','test');
         await contract.submitTransaction('createbidder', 'bidder4','xyz127', 'abc127','aiman','03333498324','3120787982745432','green list','20 year','test');
         //await contract.submitTransaction('createbidder', 'bidder5','xyz127', 'abc128','aiman','03333498324','3120787982745432','green list','20 year','test');
       
         console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
