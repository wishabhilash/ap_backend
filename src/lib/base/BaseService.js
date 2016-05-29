'use strict';

class BaseService {
	* response(data, status) {
		return {
			'data': data,
			'status': status || 200,
			'timestamp': Math.floor(Date.now()/1000)
		}
	}
}

module.exports = BaseService;