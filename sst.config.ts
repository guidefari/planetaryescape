/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "webring",
			removal: input?.stage === "production" ? "retain" : "remove",
			home: "aws",
		};
	},
	async run() {
		const hono = new sst.aws.Function("Hono", {
			url: true,
			handler: "webring/index.handler",
		});

		return {
			api: hono.url,
		};
	},
});
