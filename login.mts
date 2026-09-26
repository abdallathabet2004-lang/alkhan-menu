export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    // ignore
  }
  const real = Netlify.env.get("ADMIN_PASSWORD") || "";
  const ok = !!real && body.password === real;
  return new Response(JSON.stringify({ ok }), {
    status: ok ? 200 : 401,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
};

export const config = {
  path: "/api/login",
};
