'use strict';

function * userAddValidator(ctx) {
	ctx.checkParams('name').len(2, 100, 'no way your name is this long.');
}

module.exports = {
	userAddValidator: userAddValidator
}