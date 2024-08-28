import axios from "axios";
import config from "../../config";
type TPaymentInfo = {
  transactionId: string;
  payment: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};
export const initiatePayment = async ({
  transactionId,
  payment,
  name,
  email,
  phone,
  address,
}: TPaymentInfo) => {
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: transactionId,
    success_url: `http://localhost:5000/api/payment`,
    fail_url: "http://www.merchantdomain.com/faile dpage.html",
    cancel_url: "http://www.merchantdomain.com/can cellpage.html",
    amount: payment,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: name,
    cus_email: email,
    cus_add1: address,
    cus_add2: "N/A",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1206",
    cus_country: "Bangladesh",
    cus_phone: phone,
    type: "json",
  });

  return response.data;
};
