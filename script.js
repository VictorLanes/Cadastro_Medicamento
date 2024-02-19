document.addEventListener("DOMContentLoaded", function() {
    const medForm = document.getElementById("medForm");
    const medList = document.getElementById("medList");
    let medicamentos = [];

    // Função para renderizar os medicamentos salvos no armazenamento local
    function renderizarMedicamentos() {
        medList.innerHTML = "";
        medicamentos.forEach(function(med, index) {
            const newItem = document.createElement("li");
            newItem.innerHTML = `<strong>${med.nome}</strong> - Horário: ${med.horario} - ${med.dias} dias 
                <button class="editBtn" data-index="${index}">Editar</button>
                <button class="deleteBtn" data-index="${index}">Excluir</button>`;
            medList.appendChild(newItem);
        });
    }

    // Verificar se há medicamentos salvos no armazenamento local
    if(localStorage.getItem('medicamentos')) {
        medicamentos = JSON.parse(localStorage.getItem('medicamentos'));
        renderizarMedicamentos();
    }

    // Adicionar evento de envio para o formulário de cadastro
    medForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const horario = document.getElementById("horario").value;
        const dias = document.getElementById("dias").value;

        // Criar objeto para o novo medicamento
        const novoMedicamento = {
            nome: nome,
            horario: horario,
            dias: dias
        };

        // Adicionar novo medicamento ao array
        medicamentos.push(novoMedicamento);

        // Salvar array atualizado no armazenamento local
        localStorage.setItem('medicamentos', JSON.stringify(medicamentos));

        // Renderizar novamente os medicamentos na lista
        renderizarMedicamentos();

        // Limpar o formulário
        medForm.reset();
    });

    // Adicionar evento de clique para editar e excluir medicamentos
    medList.addEventListener("click", function(event) {
        if(event.target.classList.contains("editBtn")) {
            const index = event.target.getAttribute("data-index");
            const medicamento = medicamentos[index];
            const novoNome = prompt("Digite o novo nome do medicamento:", medicamento.nome);
            if(novoNome !== null) {
                medicamento.nome = novoNome;
                localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
                renderizarMedicamentos();
            }
        } else if(event.target.classList.contains("deleteBtn")) {
            const index = event.target.getAttribute("data-index");
            medicamentos.splice(index, 1);
            localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
            renderizarMedicamentos();
        }
    });
});
