export function handledError(error: any) {
	return new Response(error.content ?? error, {
		status: error.status ?? 403,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
