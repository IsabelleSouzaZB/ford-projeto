document.addEventListener('DOMContentLoaded', () => {

    // Armazena a lista de emails de forma persistente no LocalStorage
    function salvarNoStorage(email) {
        let emailsCadastrados = JSON.parse(localStorage.getItem('lista_emails_ford')) || [];
        
        if (!emailsCadastrados.includes(email)) {
            emailsCadastrados.push(email);
            localStorage.setItem('lista_emails_ford', JSON.stringify(emailsCadastrados));
            console.log('E-mail armazenado no LocalStorage:', email);
        } else {
            console.log('E-mail já cadastrado anteriormente.');
        }
    }

    // FORMULÁRIO EXCLUSIVO DO FOOTER
    const footerForm = document.getElementById('footerNewsletterForm');
    const footerEmailInput = document.getElementById('footerEmailInput');
    const footerResponseMessage = document.getElementById('footerFormMessage');

    if (footerForm) {
        footerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const emailValue = footerEmailInput.value.trim();

            if (!validateEmail(emailValue)) {
                showMessage(footerResponseMessage, 'Por favor, insira um e-mail válido.', 'error');
                return;
            }

            const submitBtn = footerForm.querySelector('button');
            submitBtn.textContent = '...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Executa a função para persistir os dados localmente
                salvarNoStorage(emailValue);

                showMessage(footerResponseMessage, 'Inscrição realizada!', 'success');
                footerForm.reset();
                submitBtn.textContent = 'Enviar';
                submitBtn.disabled = false;
            }, 1000);
        });
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = `form-message ${type}`;
    }
});