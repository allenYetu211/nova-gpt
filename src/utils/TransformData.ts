export function handlerError(msg: string) {
	return ['```json\n', JSON.stringify(msg, null, '  '), '\n```'].join('');
}
