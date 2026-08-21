// Smooth scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Manipulação do formulário de cadastro
document.getElementById('lockerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        turma: document.getElementById('turma').value,
        matricula: document.getElementById('matricula').value,
        tipoAcesso: document.getElementById('tipoAcesso').value,
        armario: document.getElementById('armario').value,
        observacoes: document.getElementById('observacoes').value,
        dataCadastro: new Date().toLocaleString('pt-BR')
    };
    
    // Salvar no localStorage
    let cadastros = JSON.parse(localStorage.getItem('cadastrosArmarios')) || [];
    cadastros.push(formData);
    localStorage.setItem('cadastrosArmarios', JSON.stringify(cadastros));
    
    // Mostrar mensagem de sucesso
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    // Limpar formulário
    this.reset();
    
    // Esconder mensagem após 5 segundos
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
    
    // Scroll para a mensagem de sucesso
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Animação de hover nos armários
document.querySelectorAll('.locker-frame').forEach(locker => {
    locker.addEventListener('mouseenter', function() {
        this.style.transform = 'rotateY(15deg) scale(1.05)';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
    });
    
    locker.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateY(0deg) scale(1)';
        this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
    });
});

// Efeito de digitação no título (opcional)
function typeWriter() {
    const title = document.querySelector('.hero-title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let charIndex = 0;
    
    function type() {
        if (charIndex < originalText.length) {
            title.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 50);
        }
    }
    
    type();
}

// Iniciar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    // Comentar a linha abaixo se não quiser o efeito de digitação
    // typeWriter();
    
    // Carregar dados existentes (se houver)
    const cadastros = JSON.parse(localStorage.getItem('cadastrosArmarios')) || [];
    console.log('Total de cadastros:', cadastros.length);
});

// Validação em tempo real
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#28a745';
        } else if (this.required) {
            this.style.borderColor = '#dc3545';
        }
    });
});

// Máscara para matrícula (apenas números)
document.getElementById('matricula').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// Contador de caracteres para observações
document.getElementById('observacoes').addEventListener('input', function() {
    const maxLength = 200;
    if (this.value.length > maxLength) {
        this.value = this.value.substring(0, maxLength);
    }
});