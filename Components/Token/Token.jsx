import React, { useState, useEffect } from "react";
import Image from "next/image";

import Style from "./Token.module.css";
import images from "../../public";
import { Toggle } from "../index";

const Token = ({ setOpenSetting }) => {
  return (
    <div className={Style.Token}>
      <div className={Style.Token_box}>
        <div className={Style.Token_box_heading}>
          <h4>Setting</h4>
          <Image
            src={images.cross}
            alt="close"
            width={25}
            height={18}
            onClick={() => setOpenSetting(false)}
          />
        </div>
        <p className={Style.Token_box_para}>
          Slippage tolerance
          <Image src={images.lock} alt="img" width={25} height={18} />
        </p>

        <div className={Style.Token_box_input}>
          <input type="text" placeholder="0.10%" />
          <button>Auto</button>
        </div>

        <p className={Style.Token_box_para}>
          Slippage tolerance
          <Image src={images.lock} alt="img" width={25} height={18} />
        </p>

        <div className={Style.Token_box_input}>
          <input type="text" placeholder="30" />
          <button>minutes</button>
        </div>

        <h2>Interface Settings</h2>

        <div className={Style.Token_box_toggle}>
          <p className={Style.Token_box_para}>Transaction deadline</p>
          <Toggle label="No" />
        </div>
      </div>
    </div>
  );
};

export default Token;
