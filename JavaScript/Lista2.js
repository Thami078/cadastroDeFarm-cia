
document.addEventListener("DOMContentLoaded", function () {
    const clientForm = document.getElementById("client-form");
    const clientList = document.getElementById("client-list");
    let editingClient = null;

    clientForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const clientName = document.getElementById("name-client").value;
        const clientEnd = document.getElementById("end-client").value;
        const clientNumber = document.getElementById("tel-client").value;

        if (editingClient) {
            // Editar um cliente já cadastrado
            editingClient.firstChild.textContent = `${clientName} - Endereço: ${clientEnd} - Tel: ${clientNumber}`;
            editingClient.querySelector(".edit").textContent = "Editar";
            editingClient = null;
        } else if (clientName && clientEnd && clientNumber) {
            addClient(clientName, clientEnd, clientNumber); // Chama a função para adicionar o cliente
        }

        clientForm.reset();
    });

    clientList.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("delete")) {
            const listItem = e.target.parentElement;
            clientList.removeChild(listItem);

            if(confirm('Deseja realmente cancelar este cadastro?')){
                clientList.removeChild(listItem);

            }
        } else if (e.target && e.target.classList.contains("edit")) {
            const listItem = e.target.parentElement;
            const clientName = listItem.firstChild.textContent.split(" - Endereço: ")[0];
            const clientEnd = listItem.firstChild.textContent.split(" - Endereço: ")[1].split(" - Tel: ")[0];
            const clientNumber = listItem.firstChild.textContent.split(" - Tel: ")[1];

            document.getElementById("name-client").value = clientName;
            document.getElementById("end-client").value = clientEnd;
            document.getElementById("tel-client").value = clientNumber;
            editingClient = listItem;

            clientForm.querySelector("button[type='submit']").textContent = "Finalizar Operação";
        }
    });

    function addClient(name, end, number) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${name} - Endereço: ${end} - Tel: ${number} <button class="edit">Editar</button> <button class="delete">Cancelar cadastro</button>`;
        clientList.appendChild(listItem);
    }
});
