export const loadRazorpay = () => {

    return new Promise((resolve) => {

        // Check whether Razorpay is already loaded
        if (
            document.querySelector(
                'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
            )
        ) {
            resolve(true);
            return;
        }


        // Create Razorpay script
        const script =
            document.createElement("script");


        script.src =
            "https://checkout.razorpay.com/v1/checkout.js";


        script.onload = () => {

            resolve(true);

        };


        script.onerror = () => {

            resolve(false);

        };


        document.body.appendChild(script);

    });

};