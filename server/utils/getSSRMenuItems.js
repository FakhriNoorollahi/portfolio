export async function getSSRMenuItems(db) {
  const menuRows = await db.all(`
    SELECT id, type, title, link, isActive, sort_order
    FROM menu_items
    WHERE isActive = 1
    ORDER BY sort_order ASC
  `);

  const menuItems = menuRows.map((item) => {
    const link = item.link?.trim() || "/";
    const href = /^https?:\/\//i.test(link)
      ? link
      : `/${link.replace(/^\/+/, "")}`;

    return { ...item, href };
  });

  const publicPages = await db.all(`
    SELECT id, slug, title, link, isActive
    FROM pages
    WHERE status = 'published' AND isActive = 1
    ORDER BY created_at DESC
  `);

  const pageMenuItems = publicPages.map((item) => ({
    id: item.id,
    type: "WEB_PAGES",
    title: item.title,
    href: `/pages/${item.slug}`,
    sort_order: 1000,
  }));

  return [...menuItems, ...pageMenuItems].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
}
