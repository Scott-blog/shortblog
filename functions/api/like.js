// 点赞 API：GET /api/like?path=/posts/xxx/ 读计数，POST /api/like {path} 加一
// 存储用 Cloudflare KV（绑定名 LIKES，需在 Pages 控制台配置）

async function getLikes(env, path) {
  const val = await env.LIKES.get("likes:" + path);
  return parseInt(val || "0", 10);
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") || "/";
  const likes = await getLikes(env, path);
  return Response.json({ likes });
}

export async function onRequestPost({ request, env }) {
  let path = "/";
  try {
    const body = await request.json();
    if (typeof body.path === "string") path = body.path.slice(0, 200);
  } catch (e) {}
  const next = (await getLikes(env, path)) + 1;
  await env.LIKES.put("likes:" + path, String(next));
  return Response.json({ likes: next });
}
