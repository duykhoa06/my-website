class Auth {
    constructor() {
        this.user = null;
        this.init();
    }

    init() {
        auth.onAuthStateChanged(user => {
            this.user = user;
            this.updateUI();
        });

        // Xử lý đăng nhập
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            this.login(email, password);
        });

        // Xử lý đăng ký
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            this.register(email, password);
        });
    }

    async login(email, password) {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            document.getElementById('login-modal').style.display = 'none';
        } catch (error) {
            alert('Đăng nhập thất bại: ' + error.message);
        }
    }

    async register(email, password) {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            document.getElementById('register-modal').style.display = 'none';
        } catch (error) {
            alert('Đăng ký thất bại: ' + error.message);
        }
    }

    updateUI() {
        const loginButton = document.getElementById('open-login');
        if (this.user) {
            loginButton.textContent = this.user.email;
            // Hiển thị menu user khi đã đăng nhập
        } else {
            loginButton.textContent = 'Đăng nhập';
        }
    }
}

const auth = new Auth();
