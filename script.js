(() => {
    'use strict';

    const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ================= DADOS ================= */

    // Número inteiro uniforme entre 1 e `lados` (usa crypto quando disponível)
    function sortear(lados) {
        if (window.crypto && window.crypto.getRandomValues) {
            const buffer = new Uint32Array(1);
            const limite = Math.floor(0x100000000 / lados) * lados;
            let x;
            do {
                window.crypto.getRandomValues(buffer);
                x = buffer[0];
            } while (x >= limite);
            return (x % lados) + 1;
        }
        return Math.floor(Math.random() * lados) + 1;
    }

    function rolar(botao, anunciador) {
        const lados = Number(botao.dataset.dado);
        const valor = botao.querySelector('.dado-valor');
        const resultado = sortear(lados);

        clearInterval(botao._animacao);
        botao.classList.remove('critico', 'falha');

        const finalizar = () => {
            botao.classList.remove('rolando');
            valor.textContent = resultado;
            if (lados === 20 && resultado === 20) botao.classList.add('critico');
            if (lados === 20 && resultado === 1) botao.classList.add('falha');

            let mensagem = `D${lados}: ${resultado}`;
            if (botao.classList.contains('critico')) mensagem += ' — crítico!';
            if (botao.classList.contains('falha')) mensagem += ' — falha crítica!';
            botao.title = mensagem;
            if (anunciador) anunciador.textContent = mensagem;
        };

        if (reduzMovimento) {
            finalizar();
            return;
        }

        // Pequena "rolagem" antes de mostrar o resultado
        botao.classList.add('rolando');
        let passos = 0;
        botao._animacao = setInterval(() => {
            valor.textContent = sortear(lados);
            if (++passos >= 8) {
                clearInterval(botao._animacao);
                finalizar();
            }
        }, 45);
    }

    function iniciarDados() {
        const botoes = document.querySelectorAll('.rolada[data-dado]');
        if (!botoes.length) return;

        // Região lida por leitores de tela só com o resultado final
        const anunciador = document.createElement('p');
        anunciador.className = 'sr-only';
        anunciador.setAttribute('aria-live', 'polite');
        botoes[0].closest('footer, body').appendChild(anunciador);

        botoes.forEach(botao => botao.addEventListener('click', () => rolar(botao, anunciador)));
    }

    /* ================= VOLTAR AO TOPO ================= */

    function criarVoltarTopo() {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'voltar-topo';
        botao.setAttribute('aria-label', 'Voltar ao topo');
        botao.textContent = '▲';
        botao.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reduzMovimento ? 'auto' : 'smooth' });
        });
        document.body.appendChild(botao);

        const atualizar = () => botao.classList.toggle('visivel', window.scrollY > 600);
        window.addEventListener('scroll', atualizar, { passive: true });
        atualizar();
    }

    iniciarDados();
    criarVoltarTopo();
})();
