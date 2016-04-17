'use strict';

class BaseService {
	* response(data, status) {
		return {
			'data': data,
			'status': status || 200,
		}
	}
}

module.exports = BaseService;