import { RouterPathEnum } from "./RouterPathEnum";
import transactions from "../../pages/Transactions/Transactions";
import BlockDetails from "../../pages/Blocks/BlockDetails/BlockDetails";
import Dashboard from "../../pages/Dashboard/Dashboard";
import dashboard from "../../pages/Dashboard/Dashboard";
import SearchDetails from "../../pages/SearchDetails/SearchDetails";
import Blocks from "../../pages/Blocks/Blocks";
import blocks from "../../pages/Blocks/Blocks";

const menuDefine = [
  {
    component: Dashboard,
    path: RouterPathEnum.HOME,
    title: "Dashboard",
    name: "Dashboard",
    type: "public",
    menubar: true,
    icon: dashboard,
  },
  {
    component: Blocks,
    path: RouterPathEnum.BLOCKS,
    title: "Blocks",
    name: "Blocks",
    type: "private",
    menubar: true,
    icon: blocks,
  },
  {
    component: BlockDetails,
    path: RouterPathEnum.BLOCKS_DETAILS,
    title: "Block Details",
    name: "Block Details",
    type: "private",
    menubar: true,
    icon: transactions,
  },
  {
    component: SearchDetails,
    path: RouterPathEnum.SEARCH_DETAILS,
    title: "Search Details",
    name: "Search Details",
    type: "private",
    menubar: false,
  },
];

export default menuDefine;
