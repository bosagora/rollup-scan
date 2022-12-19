import React, { ReactNode, useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import { AiOutlineSearch } from "react-icons/ai";
import "./GenericSearchBar.scss";
import {
  useTranslation,
  withTranslation,
  WithTranslation,
} from "react-i18next";
import endpoints from "../../global/config/urlconfigs";
import request from "../../global/api/request";
import { RouterPathEnum } from "global/routes/RouterPathEnum";

export interface GenericSearchBarProps extends WithTranslation {
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
  i18n,
  searchedDataGet,
  searchedData,
}) => {
  let btn: any;
  const { t } = useTranslation();
  const [search, setSearch] = useState(""),
    [error, setError] = useState("");

  // Method to validate hash and decide to redirect to block or transcation
  const validateHash = () => {
    return new Promise((resolve, reject) => {
      request("GET", `${endpoints.searchHash + search}`, {})
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((err: any) => {
          return err;
        });
    });
  };

  const showError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const searchSubmit = () => {
    if (search) {
      searchedDataGet(search).then((res: any) => {
        let reg = /^[0-9\b]+$/;
        let matchAddress = search.match("boa");
        let matchBlockHash = search.match("0x");
        if (matchAddress) {
        } else if (reg.test(search)) {
          history.push(`${RouterPathEnum.BLOCKS_DETAILS}/height:${search}`);
        } else if (matchBlockHash) {
          validateHash()
            .then((res: any) => {
              if (res.block || !res) {
                history.push(`${RouterPathEnum.BLOCKS_DETAILS}/hash:${search}`);
              } else {
                history.push(
                  `${RouterPathEnum.TRANSACTION_OVERVIEW}/${search}`
                );
              }
            })
            .catch(() => {
              showError("Invalid_Hash");
            });
        }
      });
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

export default withTranslation()(GenericSearchBar);
