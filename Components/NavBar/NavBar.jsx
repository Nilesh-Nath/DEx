import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//Internal Imports
import Style from "./NavBar.module.css";
import images from "../../public";
import { Model, TokenList } from "../index";
import { SwapTokenContext } from "../../context/SwapContext";

const NavBar = () => {
  const {
    ether,
    account,
    networkConnect,
    connectWallet,
    tokenData,
    weth9,
    dai,
  } = useContext(SwapTokenContext);
  const menuItems = [
    {
      name: "Swap",
      link: "/",
    },
    {
      name: "Tokens",
      link: "/",
    },
    {
      name: "Pool",
      link: "/",
    },
  ];
  //Usestate
  const [openModel, setOpenModel] = useState(false);
  const [openTokenBox, setOpenTokenBox] = useState(false);

  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <div className={Style.NavBar_box_left_img}>
            <Image
              src={images.uniswapLogo}
              alt="logo"
              width={150}
              height={80}
            />
          </div>
          <div className={Style.NavBar_box_left_menu}>
            {menuItems.map((el, i) => (
              <Link key={i + 1} href={{ pathname: `${el.name}` }}>
                <p className={Style.NavBar_box_left_menu_item}>{el.name}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className={Style.NavBar_box_middle}>
          <div className={Style.NavBar_box_middle_search}>
            <div className={Style.NavBar_box_middle_search_img}>
              <Image src={images.search} alt="Search" width={25} height={20} />
            </div>
            <input type="text" placeholder="Search Tokens" />
          </div>
        </div>
        <div className={Style.NavBar_box_right}>
          <div className={Style.NavBar_box_right_box}>
            <div className={Style.NavBar_box_rightt_box_img}>
              <Image src={images.ether} alt="Network" height={25} width={25} />
            </div>
            <p>{networkConnect}</p>
          </div>
          {account ? (
            <button
              onClick={() => {
                setOpenTokenBox(true);
              }}
            >
              {account.slice(0, 16)}....
            </button>
          ) : (
            <button
              onClick={() => {
                setOpenModel(true);
              }}
            >
              Connect
            </button>
          )}

          {openModel && (
            <Model setOpenModel={setOpenModel} connectWallet={connectWallet} />
          )}
        </div>
      </div>

      {/* Tokenlist Component */}
      {openTokenBox && (
        <TokenList tokenData={tokenData} setOpenTokenBox={setOpenTokenBox} />
      )}
    </div>
  );
};

export default NavBar;
