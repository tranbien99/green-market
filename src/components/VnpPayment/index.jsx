import "./style.css";
import { Button, TextareaAutosize } from "@material-ui/core";
import publicIp from "public-ip";
import { useState } from "react";
import queryString from "query-string";
import dateFormat from "dateformat";
import sha256 from "sha256";

const HASH_SECRET = "YOYZOREKINDWKDXKDFDASDQINNCVFAII";
const TMNCODE = " 93N8YFGW";
const VNP_URL = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const VNP_RETURN = "http://localhost:3000";

function sortObject(o) {
  const sorted = {};
  const onlyKey = [];
  for (const key in o) {
    if (o.hasOwnProperty(key)) {
      onlyKey.push(key);
    }
  }
  onlyKey.sort();
  Array.from({ length: onlyKey.length }, (elm, idx) => {
    sorted[onlyKey[idx]] = o[onlyKey[idx]];
    return null;
  });
  return sorted;
}

function VnpPayment() {
  const [url, setUrl] = useState("");

  const onSubmit = async () => {
    const tmnCode = TMNCODE;
    const secretKey = HASH_SECRET;
    const returnUrl = VNP_RETURN;

    const date = new Date();

    const createDate = dateFormat(date, "yyyymmddHHmmss");
    const orderId = dateFormat(date, "HHmmss");
    const amount = "2155000";
    const bankCode = "NCB";

    const orderInfo = "Nap tien cho thue bao 0123456789. So tien 100,000";
    const orderType = "topup";
    const locale = "vn";
    const currCode = "VND";
    const set_vnp_Params = {};

    set_vnp_Params["vnp_Version"] = "2";
    set_vnp_Params["vnp_Command"] = "pay";
    set_vnp_Params["vnp_TmnCode"] = tmnCode;
    set_vnp_Params["vnp_Locale"] = locale;
    set_vnp_Params["vnp_CurrCode"] = currCode;
    set_vnp_Params["vnp_TxnRef"] = orderId;
    set_vnp_Params["vnp_OrderInfo"] = orderInfo;
    set_vnp_Params["vnp_OrderType"] = orderType;
    set_vnp_Params["vnp_Amount"] = amount * 100;
    set_vnp_Params["vnp_ReturnUrl"] = returnUrl;
    set_vnp_Params["vnp_IpAddr"] = await publicIp.v4();
    set_vnp_Params["vnp_CreateDate"] = createDate;
    set_vnp_Params["vnp_BankCode"] = bankCode;

    const vnp_Params = sortObject(set_vnp_Params);

    const signData =
      secretKey + queryString.stringify(vnp_Params, { encode: false });

    // var sha256 = require('sha256');

    const secureHash = sha256(signData);

    vnp_Params["vnp_SecureHashType"] = "SHA256";
    vnp_Params["vnp_SecureHash"] = secureHash;
    const vnpUrl =
      VNP_URL + "?" + queryString.stringify(vnp_Params, { encode: true });
    setUrl(vnpUrl);
  };

  const sumQuery = queryString.parse(window.location.search);
  if (JSON.stringify(sumQuery) !== JSON.stringify({})) {
    console.log("get result params", sumQuery);
    const returnSecretHash = sumQuery["vnp_SecureHash"].toString();
    delete sumQuery["vnp_SecureHash"];
    delete sumQuery["vnp_SecureHashType"];
    const returnSignData =
      HASH_SECRET + queryString.stringify(sumQuery, { encode: false });
    const enc256 = sha256(returnSignData);
    if (enc256 === returnSecretHash) {
      console.log("bang nhau");
    } else console.log("fail checksum");
  }

  return (
    <div className="App">
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={onSubmit}
      >
        Submit
      </Button>
      <br />
      <TextareaAutosize
        maxRows={10}
        aria-label="maximum height"
        placeholder="Maximum 4 rows"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <h6>
        <a href={url}>
          <h3>GO</h3>
        </a>
      </h6>
    </div>
  );
}

export default VnpPayment;
