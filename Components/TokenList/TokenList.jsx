import React from "react";
import Image from "next/image";

import Style from "./TokenList.module.css";
import images from "../../public";

const TokenList = ({ tokenData, setOpenTokenBox }) => {
  const seenSymbols = new Set();

  return (
    <div className={Style.TokenList}>
      <p
        className={Style.TokenList_close}
        onClick={() => setOpenTokenBox(false)}
      >
        <Image src={images.cross} alt="close" width={25} height={18} />
      </p>
      <div className={Style.TokenList_title}>
        <h2>Your Token List</h2>
      </div>

      {tokenData
        .filter((elt) => {
          if (!seenSymbols.has(elt.symbol)) {
            seenSymbols.add(elt.symbol);
            return true;
          }
          return false;
        })
        .map((el, i) => (
          <div key={i + 1} className={Style.TokenList_box}>
            <div className={Style.TokenList_box_info}>
              <p className={Style.TokenList_box_info_symbol}>{el.symbol}</p>
              <p>
                <span>{el.tokenBalance}</span>
                {el.name}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TokenList;
TokenList;
