import * as React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { RouterPathEnum } from "./RouterPathEnum";
import TransactionOverview from "../../pages/Transactions/TransactionOverview/TransactionOverview";
import Transactions from "../../pages/Transactions/Transactions";
import BlockDetails from "../../pages/Blocks/BlockDetails/BlockDetails";
import Blocks from "../../pages/Blocks/Blocks";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import { useDispatch } from "react-redux";
import { blockHeightUpdate } from "../../store/header/action";
import { useLastHeight } from "../../hooks/useRollup";
import { useEffect } from "react";

const RoutesPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path={RouterPathEnum.TRANSACTIONS} element={<Transactions />} />
        <Route
          path={RouterPathEnum.TRANSACTION_OVERVIEW}
          element={<TransactionOverview />}
        />
        <Route path={RouterPathEnum.BLOCKS} element={<Blocks />} />
        <Route
          path={RouterPathEnum.BLOCKS_DETAILS}
          element={<BlockDetails />}
        />
        <Route
          path={RouterPathEnum.BLOCKS_DETAILS + "/:height"}
          element={<BlockDetails />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default RoutesPage;

const Layout = () => {
  const dispatch = useDispatch();
  const { height } = useLastHeight();

  useEffect(() => {
    dispatch(blockHeightUpdate(height));
  }, [height]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
