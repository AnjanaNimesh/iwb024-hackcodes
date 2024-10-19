declare global {
    interface Window {
        payhere: {
            startPayment: (payment: any) => void;
        };
    }
}

export {};
