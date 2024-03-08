document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

// Seleciona o link "Usuários" na barra lateral
var usuariosLink = document.querySelector('.side-item:nth-child(2) a');

// Adiciona um evento de clique ao link "Usuários"
usuariosLink.addEventListener('click', function(event) {
    // Impede o comportamento padrão do link (navegar para outra página)
    event.preventDefault();
    // Redireciona para a página de cadastro de usuários
    window.location.href = "/assets/public/page.html";
});
