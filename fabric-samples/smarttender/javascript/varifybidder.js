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
        const contract = network.getContract('issuetender');

  
        await contract.submitTransaction('vryrec', 'verifyrecord1','xyz123', 'abc123',  'you are not eligible for this tender');
        await contract.submitTransaction('vryrec', 'verifyrecord2','xyz124', 'abc123',  'congratulation you win the tender abc123 for more details check tender vryrec');
        await contract.submitTransaction('vryrec', 'verifyrecord3','xyz125', 'abc125',  'congratulation you win the tender abc125 for more details check tender vryrec');
        await contract.submitTransaction('vryrec', 'verifyrecord4','xyz126', 'abc126',  'you are not eligible for this tender');
        await contract.submitTransaction('vryrec', 'verifyrecord5','xyz127', 'abc127',  'congratulation you win the tender abc127 for more details check tender vryrec');
        await contract.submitTransaction('vryrec', 'verifyrecord6','xyz127', 'abc128',  'congratulation you win the tender abc127 for more details check tender vryrec');
        
    
        console.log('Transaction has been submitted');
        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
