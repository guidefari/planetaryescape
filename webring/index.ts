import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { handle } from "hono/aws-lambda";
import { sites } from "./sites";

const app = new Hono();
app.use(prettyJSON());

app.get("/webring/list", (c) => {
	return c.json(sites);
});

// Endpoint to handle redirection based on search params
app.get("/webring", (c) => {
	const { id, action } = c.req.query();

	// If no id is provided, redirect to a random site
	if (!id) {
		const randomSite = sites[Math.floor(Math.random() * sites.length)];
		return c.redirect(randomSite.url);
	}

	// Find the index of the site with the given id
	const index = sites.findIndex((site) => site.id === id);

	if (index === -1) {
		return c.json({ message: "Site not found", ok: false }, 404);
	}

	let targetIndex = index;

	// Determine the action for redirection
	if (action === "next") {
		targetIndex = (index + 1) % sites.length; // Wrap around to the first site
	} else if (action === "prev") {
		targetIndex = (index - 1 + sites.length) % sites.length; // Wrap around to the last site
	} else if (action === "random") {
		targetIndex = Math.floor(Math.random() * sites.length);
	}

	const targetSite = sites[targetIndex];
	return c.redirect(targetSite.url);
});

app.get("/webring/list/html", (c) => {
	return c.html(
		`<ul style="font-family: monospace; padding: 20px;">
			${sites.map((site) => `<li><a href="${site.url}">${site.name}</a></li>`).join("")}
			</ul>`,
	);
});

export const handler = handle(app);
// export default app;

// export default {
// 	port: 3111,
// 	fetch: app.fetch,
// };
