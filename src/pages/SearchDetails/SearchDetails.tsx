import React, { useEffect } from "react";
import "./SearchDetails.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  headerClassUpdater,
  searchDataUpdater,
  searchDataCleaner,
} from "store/header/thunks";
import PageHelmet from "../../components/PageHelmet/PageHelmet";

const SearchDetails: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const searchedData = useSelector((state: any) => state.header.searchedData);
  const {
    // type,
    id,
  } = props.match.params;
  const { searchType, available, details } = searchedData;

  useEffect(() => {
    getData();

    //cleanup function
    return function cleanup() {
      dispatch(searchDataCleaner());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    dispatch(headerClassUpdater("newclass2", "layout-generic"));
    if (available) {
    } else {
      dispatch(searchDataUpdater(id));
    }
  };
  return (
    <div id="blocks">
      <PageHelmet
        title={props.title}
        meta={{ name: "Search Details", content: "Lorem Ipsum" }}
      />
      {available && (
        <>
          <p>{searchType}</p>
          <p>{JSON.stringify(details)}</p>
        </>
      )}
    </div>
  );
};

export default SearchDetails;
