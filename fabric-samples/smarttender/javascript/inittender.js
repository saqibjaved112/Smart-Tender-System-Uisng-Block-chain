

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

        const contract = network.getContract('smarttender');

       // Submit the specified transaction.

        //8
        await contract.submitTransaction('createtender', 'tender0','abc123', 'Construction', 'Instl of Security Lights at Fmn Ammo Igloos 148 Ord, Elect Connection Pts for Conveyer Belt and Instl of 3 Motor Pumps High Pressure for Washing Shed at 185 POL Dep Gwa Gar', 'valid and varified', '9.66M','Government');
        await contract.submitTransaction('createtender', 'tender1','abc124', 'Construction', 'Instl of Street Lihts at ISSB Rd, D-4 Area, Replacement of Complete Elec Svc Line of 11 Army Avn San Area & Instl of Street Its at E Type Flats, D-4 Area at Gwa Gar', 'valid and varified', '9.66M','Government');
        await contract.submitTransaction('createtender', 'tender2','abc125', 'Construction', 'Repl of Old Vintage Street Lights with LED Lights (60 Watts) in Red Zone Area of HQ 30 Corps, Instl of AC Gen 100 KVA, 3 Ph and Change over switch at Tech Cen-2 & Repair / Maint of Street Lights at Gwa Gar', 'valid and varified', '9.66M','Government');
        await contract.submitTransaction('createtender', 'tender3','abc126', 'Construction', 'TC for Repair/Repl of Bldg Works for Insti Bldgs and Ext Sewerage Lines etc (East Zone) under GE (Svcs) Gwa Cantt', 'valid and varified', '9.66M','Government');
        await contract.submitTransaction('createtender', 'tender4','abc127', 'Construction', 'Term Contract for External Sui Gas in E&M-11 Sub Divn under GE (Svcs) Gwa Cantt', 'valid and varified', '9.66M','Government');
        await contract.submitTransaction('createtender', 'tender5','abc128', 'Construction', 'Term Contract for External Water Supply in E&M-II Sub Divn under GE (Svcs) (South Zone) Gwa Cantt / Hafizabad', 'valid and varified', '9.66M','Government');
        await contract.submitTransaction('createtender', 'tender6','abc129', 'Construction', 'Term Contract for External Water Supply in E&M-Il Sub Divn under GE (Svcs) (East Zone) Gwa Cantt / Hafizabad', 'valid and varified', '9.66M','Government');
        await contract.submitTransaction('createtender', 'tender7','abc130', 'Construction', 'Term Contract for External Elect in E&M-I Sub Divn under GE (Svcs) Gwa Cantt Term Contract for South Zone External Elect in E&M-I Sub Divn under GE (Svcs) Gwa Cantt', 'valid and varified', '9.66M','Government');
        await contract.submitTransaction('createtender', 'tender8','abc131', 'Construction', 'Term Contract for Repair / Replacement / Overhauling of Water Filter Plants in Sub Divn E&M-II under GE (Svcs) Gwa Cantt', 'valid and varified', '9.66M','Government');
        await contract.submitTransaction('createtender', 'tender9','abc132', 'Construction', 'Const of Gen Room, MLRS Regt Arty at Gwa Gar', 'valid and varified', '9.66M','Government');
        await contract.submitTransaction('createtender', 'tender10','abc133', 'Construction', 'Repair / Maint of Road from Corps Main Gate to 6 CAV at HQ 30 Corps Gwa Gar', 'valid and varified', '9.66M','Government');

        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
