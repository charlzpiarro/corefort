import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "IT Support",
    path: "/contact",
    newTab: false,
  },
  {
    id: 4,
    title: "Hosting Prices",
    path: "/pricing",
    newTab: false,
  },
  {
    id: 5,
    title: "Pages",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "About Us",
        path: "/about",
        newTab: false,
      },
      {
        id: 42,
        title: "IT Support",
        path: "/contact",
        newTab: false,
      },
      {
        id: 48,
        title: "Error Page",
        path: "/error",
        newTab: false,
      },
    ],
  },
];
export default menuData;
