import React, { useState } from "react";
import Image from "next/image";

// INTERNAL IMPORTS

import Style from "./SearchToken.module.css";
import images from "../../public";

const SearchToken = ({ openToken, tokens, tokenData }) => {
  // USESTATES
  const [active, setActive] = useState(1);

  // const coin = [
  //   {
  //     img: images.ether,
  //     name: "ETH",
  //   },
  //   {
  //     img: images.ether,
  //     name: "DAI",
  //   },
  //   {
  //     img: images.ether,
  //     name: "DOG",
  //   },
  //   {
  //     img: images.ether,
  //     name: "FUN",
  //   },
  //   {
  //     img: images.ether,
  //     name: "WETH",
  //   },
  //   {
  //     img: images.ether,
  //     name: "UNI",
  //   },
  //   {
  //     img: images.ether,
  //     name: "TIME",
  //   },
  //   {
  //     img: images.ether,
  //     name: "LOO",
  //   },
  //   {
  //     img: images.ether,
  //     name: "OOO",
  //   },
  //   {
  //     img: images.ether,
  //     name: "HEY",
  //   },
  // ];

  // Create a Set to track seen symbols

  const seenSymbols = new Set();

  return (
    <div className={Style.SearchToken}>
      <div className={Style.SearchToken_box}>
        <div className={Style.SearchToken_box_heading}>
          <h4>Select a token</h4>
          <Image
            src={images.cross}
            alt="close"
            width={28}
            height={20}
            onClick={() => openToken(false)}
          />
        </div>
        <div className={Style.SearchToken_box_search}>
          <div className={Style.SearchToken_box_search_img}>
            <Image src={images.search} alt="img" width={20} height={16} />
          </div>
          <input type="text" placeholder="Search name and paste the address" />
        </div>
        <div className={Style.SearchToken_box_tokens}>
          {tokenData
            .filter((elt) => {
              if (!seenSymbols.has(elt.symbol)) {
                seenSymbols.add(elt.symbol);
                return true;
              }
              return false;
            })
            .map((elt, i) => (
              <span
                key={i + 1}
                className={active == i + 1 ? `${Style.active}` : ""}
                onClick={() => {
                  setActive(i + 1);
                  tokens({
                    name: elt.name,
                    image: elt.img,
                    symbol: elt.symbol,
                    tokenBalance: elt.tokenBalance,
                    tokenAddress: elt,
                  });
                }}
              >
                <Image
                  src={elt.image || images.ether}
                  alt="image"
                  width={30}
                  height={30}
                />
                {elt.symbol}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchToken;
