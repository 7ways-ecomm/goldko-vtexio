export default {
    revendedor: {
        name: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "Nome"
        },
        email: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "Email"
        },
        phone: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "Telefone"
        },
        cnpj: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "CNPJ"
        },
        storeAddress: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "Endereço da Loja"
        },
        storeName: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "Nome da Loja"
        },
    },
    franqueado: { 
        name: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "Nome"
        },
        email: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "Email"
        },
        cellphone: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "Celular (com DDD)"
        },
        phone: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "Telefone Fixo"
        },
        state: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "Estado"
        },
        city: {
            width: "100",
            type: "input",
            required: true,
            placeholder: "Cidade"
        },
        franqueado: {
            width: "100",
            type: "radio",
            required: true,
            placeholder: "Você já opera alguma franquia?",
            options:["Não", "Sim"],
            hasTextArea: true,
        },
        investment: {
            width: "100",
            type: "radio",
            required: true,
            placeholder: "Capital para investimento",
            options:["Entre R$ 200.000 e R$ 250.000", "Entre R$ 250.000 e R$ 300.000", "Acima de R$ 300.000"],
        }
    }
};