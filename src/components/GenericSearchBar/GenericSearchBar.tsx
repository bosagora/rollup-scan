import React, { ReactNode, useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import { AiOutlineSearch } from "react-icons/ai";
import "./GenericSearchBar.scss";
import { useTranslation } from "react-i18next";
import { RouterPathEnum } from "global/routes/RouterPathEnum";
import { useNavigate } from "react-router-dom";

export interface GenericSearchBarProps {
  children?: ReactNode;
  onClick?: () => void;
  history?: any;
  searchedDataGet: Function;
  searchedData: {
    searchType: "";
    available: false;
    details: {};
  };
}
const GenericSearchBar: React.FC<GenericSearchBarProps> = ({
  children,
  onClick,
  history,
  searchedDataGet,
  searchedData,
}) => {
  let btn: any;
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const showError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const searchSubmit = () => {
    console.log("Search", search);
    if (search) {
      let reg = /^[0-9\b]+$/;
      let matchBlockHash = search.match("0x");
      if (reg.test(search)) {
        navigate(`${RouterPathEnum.BLOCKS_DETAILS}/${search}`);
      } else if (matchBlockHash) {
      } else {
        showError(t("searchMsg"));
      }
    }
  };

  const handleKeypress = (e: any) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      btn.onClick();
    }
  };
  return (
    <div onClick={onClick} id="generic-search-bar">
      <InputGroup>
        <Input
          placeholder={t("searchMsg")}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeypress}
        />
        <Button
          onClick={searchSubmit}
          ref={(node) => (btn = node)}
          type="submit"
        >
          <AiOutlineSearch />
        </Button>
      </InputGroup>
      <div className="errorBox">{error && <p>{t(error)}</p>}</div>
    </div>
  );
};

export default React.memo(GenericSearchBar);
