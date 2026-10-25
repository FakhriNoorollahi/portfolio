import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppButton from "../../ui/AppButton";
import { useManageMenu } from "../../context/mangeMenu/useManageMenu";
import { WEB_PAGES } from "../../constants/constants";
import { useEffect, useState } from "react";
import { getAllPages } from "../../../server/pages";

function TopBar() {
  const navigate = useNavigate();
  const { menus, getMenus, webPages } = useManageMenu();

  const [publicPages, setPublicPages] = useState([]);

  useEffect(() => {
    async function loadPages() {
      try {
        const data = await getAllPages();
        setPublicPages(data);
      } catch (error) {
        console.error("خطا در دریافت صفحات:", error);
      }
    }

    loadPages();
  }, []);

  const menuPages = publicPages.map((page) => {
    const menuPage = webPages.find(
      (item) => String(item.id) === String(page.id),
    );

    return {
      ...page,
      type: WEB_PAGES,
      isActive: menuPage?.isActive ?? false,
      link: menuPage?.link ?? page.link,
      title: menuPage?.title ?? page.title,
    };
  });

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack spacing={3} direction="row">
        {menus?.map((item) => {
          const menuItems =
            item.type === WEB_PAGES ? menuPages : getMenus(item.type) || [];

          return menuItems.map((p) => {
            if (!p.isActive) return null;

            return (
              <AppButton
                key={p.id}
                handler={() => {
                  if (p.type === WEB_PAGES) {
                    window.location.assign(
                      `http://localhost:3000/pages/${p.slug}`,
                    );
                  } else {
                    navigate(`/${p.link}`);
                  }
                }}
              >
                {p.title}
              </AppButton>
            );
          });
        })}
      </Stack>

      <Stack direction="row" spacing={1}>
        <Typography variant="h6">My</Typography>
        <Typography variant="h6" color="primary">
          Portfolio
        </Typography>
      </Stack>
    </Stack>
  );
}

export default TopBar;

// function TopBar() {
//   const navigate = useNavigate();

//   const { menus, getMenus } = useManageMenu();
//   console.log("context menu :", menus, getMenus());
//   useEffect(() => {
//     async function getPages() {
//       const data = await getAllPages();
//       console.log("datbase :", data);
//     }

//     getPages();
//   }, []);

//   return (
//     <Stack
//       direction="row"
//       sx={{
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <Stack spacing={3} direction="row">
//         {menus?.map((item) => {
//           const menusItems = getMenus(item.type) || [];
//           if (!menusItems.length) return;
//           return menusItems?.map((p) => {
//             if (p?.isActive) {
//               return (
//                 <AppButton
//                   key={p.id}
//                   handler={() =>
//                     p.type === WEB_PAGES
//                       ? window.location.assign(
//                           `http://localhost:3000/pages/${p.slug}`,
//                         )
//                       : navigate(`/${p.link}`)
//                   }
//                 >
//                   {p.title}
//                 </AppButton>
//               );
//             }
//           });
//         })}
//       </Stack>
//       <Stack direction="row" spacing={1}>
//         <Typography variant="h6">My</Typography>
//         <Typography variant="h6" color="primary">
//           Portfolio
//         </Typography>
//       </Stack>
//     </Stack>
//   );
// }

// export default TopBar;
