"use strict";

const uuid = require('uuid');

const HEADER = {
	DEFAULT: 'id-',
	PUSH_PULL: 'zmqpp-',
	PUB_SUB: 'zmqps-',
	REQ_RES: 'zmqrr-',
	TCP: 'tcp-'
};
exports.HEADER = HEADER;

/**
 * 获得唯一身份ID
 * 
 * @param  {String} type 身份ID类型
 * @return {String}      身份ID
 */
exports.getIdentityId = function(type){
	type = type? type : 'DEFAULT';
	let headerStr = HEADER[type] || HEADER['DEFAULT'];
	return headerStr + uuid.v4();
};

/**
 * 生成唯一消息ID
 * 
 * @return {String} 消息ID
 */
exports.getMsgId = function(){
	return 'msg-' + uuid.v4();
};