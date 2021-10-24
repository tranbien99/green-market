import React from 'react'
import { PayPalButton } from "react-paypal-button-v2";

export default function PaypalButton() {
	return (
		<div>
			<PayPalButton
				options={{
					clientId: "Ab4nAstL7QcaRJJ3ugtHIl-IvZubDslS5kezGCCGTH1LA_phPKOhGqS9PTlw6jKz7yUPZmkzXtlK_Mnl",
					currency: "USD",
				}}
				amount={1}
				onSuccess={(details, data) => {
					alert("Transaction completed by " + details.payer.name.given_name);

					console.log({ details, data });
				}}
			/>
		</div>
	)
}
