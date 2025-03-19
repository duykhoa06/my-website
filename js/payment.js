class Payment {
    constructor() {
        this.init();
    }

    init() {
        // Khởi tạo PayPal
        paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: cart.total.toString()
                        }
                    }]
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                this.saveOrder(order);
                cart.items = [];
                cart.saveToLocalStorage();
                cart.updateCartUI();
                alert('Thanh toán thành công!');
            }
        }).render('#paypal-button-container');

        // Thêm các phương thức thanh toán khác ở đây
    }

    async saveOrder(order) {
        if (auth.user) {
            await db.collection('users').doc(auth.user.uid)
                .collection('orders').add({
                    items: cart.items,
                    total: cart.total,
                    paymentId: order.id,
                    status: order.status,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
        }
    }
}

const payment = new Payment();
