/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const smarttender = require('./lib/smarttender');
const bidderprofile= require('./lib/bidderprofile');
const issuetender= require('./lib/issuetender');
module.exports.smarttender = smarttender;
module.exports.bidderprofile= bidderprofile;
module.exports.issuetender= issuetender;
module.exports.contracts = [ smarttender,bidderprofile,issuetender];
