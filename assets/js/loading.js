document.addEventListener('DOMContentLoaded', () => {
    class CompactLoading {
        constructor() {
            this.screen = document.getElementById('loading-screen');
            this.fill = document.getElementById('progress-fill');
            this.percent = document.getElementById('loading-percentage');
            this.message = document.getElementById('loading-message');
            this.status = document.getElementById('status-value');
            this.time = document.getElementById('loading-time');

            if (!this.screen) return;

            this.startTime = Date.now();
            this.duration = 3000;
            this.timer = 0;

            this.messages = [
                "Starting metalcore engine...",
                "Loading core modules...",
                "Initializing interface...",
                "Compiling shaders...",
                "Rendering components...",
                "Optimizing performance...",
                "Finalizing system...",
                "READY"
            ];

            this.run();
        }

        run() {
            this.clock = setInterval(() => {
                this.timer++;
                this.time.textContent = `00:${String(this.timer).padStart(2,'0')}`;
            }, 1000);

            requestAnimationFrame(() => this.animate());
        }

        animate() {
            const progress = Math.min(
                ((Date.now() - this.startTime) / this.duration) * 100,
                100
            );

            this.fill.style.width = `${progress}%`;
            this.percent.textContent = `${Math.round(progress)}%`;

            const i = Math.floor(progress / (100 / this.messages.length));
            if (this.messages[i]) {
                this.message.hidden = false;
                this.message.textContent = this.messages[i];
                this.status.textContent = this.messages[i];
            
                // 🔥 READY → hijau (untuk loading-message)
                if (this.messages[i] === 'READY') {
                    this.message.classList.add('loading-ready');
                } else {
                    this.message.classList.remove('loading-ready');
                }
            }

            if (progress < 100) {
                requestAnimationFrame(() => this.animate());
            } else {
                this.finish();
            }
        }

        finish() {
            clearInterval(this.clock);
            this.screen.classList.add('fade-out');

            setTimeout(() => {
                this.screen.remove();
                document.dispatchEvent(new Event('loadingComplete'));
            }, 600);
        }
    }

    window.loading = new CompactLoading();
});
