const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

operation();

function operation() {
    inquirer.default.prompt([ 
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair',
            ],
        },
    ])
    .then((answer) => {
        const action = answer['action'];

        if (action === 'Criar conta') {
            createAccount();
        } else if(action === 'Depositar') {
            deposit();

        } else if (action === 'Consultar saldo'){
            getAccountData();

        } else if (action === 'Sacar') {
            withdraw();

        } else if (action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
            process.exit()
        }
    })
    .catch((error) => {
        console.log(error); 
    });
};

// Criando uma conta
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!')); 
    console.log(chalk.green('Defina as opções da sua conta a seguir:'));
    buildAccount();
};

function buildAccount() {
    inquirer.default.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta:',
        },
    ])
    .then((answer) => {
        const accountName = answer['accountName'];

        console.info(accountName);  
    
        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts');  
        };

        // Verifica se o arquivo da conta já existe
        const accountFilePath = `accounts/${accountName}.json`;

        if (fs.existsSync(accountFilePath)) {
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'));
            buildAccount();  
            return;  
        };

        // Cria um arquivo JSON com o saldo inicial
        const accountData = {balance: 0};
        fs.writeFileSync(accountFilePath, JSON.stringify(accountData, null, 2), 'utf-8');
        console.log(chalk.green('Parabéns, a sua conta foi criada!'));

        operation(); 
    })
    .catch((error) => console.log(error));
};

// Depositar

function deposit() {
    inquirer.default.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if(!checkaccount(accountName)){
            return deposit()
        }
        inquirer.default.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            },
        ]).then((answer)=>{
            const amount = answer['amount']
            
            addAmount(accountName,amount)
            operation()
        }).catch(error => console.log(error))
    })
    .catch((error) => console.log(error))
};


// checar nome na hora de depositar
function checkaccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }
    return true
};

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName); 

    
    if (!amount) {
        console.log(chalk.yellow(`Ocorreu um erro, tente novamente mais tarde`));
        
    }; 
    console.log(chalk.yellow(`Saldo atual: R$${accountData.balance}`));


    
    accountData.balance = parseFloat(accountData.balance) + parseFloat(amount);

    
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData, null, 2), 
        'utf-8'
    );

    
    console.log(chalk.green(`Foi depositado R$${amount} na conta ${accountName}!`));
    console.log(chalk.yellow(`Novo saldo: R$${accountData.balance}`));

    
};



function getAccount(accountName){
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding: 'utf8',
        flag: 'r'
    })
    return JSON.parse(accountJson) 
};

//Consultar saldo

function getAccountData() {
    inquirer.default.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        },
    ]).then((answer) =>{
        const accountName = answer['accountName']

        if(!checkaccount(accountName)){
            return deposit()
        }
        const accountData = getAccount(accountName)
        console.log(chalk.bgBlue.black(`O saldo da sua conta é: ${accountData.balance}`)
        
    )
    operation();


    }).catch((error => console.log(error)))
};

//Sacar

function withdraw() {
    inquirer.default.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        if(!checkaccount(accountName)){
            return withdraw()
        }

        inquirer.default.prompt([
            {
                name:'amount',
                message: 'Qual valor você deseja sacar?'
            }
        ]).then((answer)=>{
            const amount = answer ['amount']

            removeAmount(accountName, amount)
            
        })
        .catch((error => console.log(error)))
    

    }).catch((error => console.log(error)))
    
};

function removeAmount(accountName,amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'),
    ) 
    return withdraw()
    };
    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Valor de saldo insuficiente.'))
        return withdraw();


    };

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData, null, 2), 
        'utf-8',
        function (error) {
            console.log(error)
        },
        console.log(chalk.green(`Foi realizado um saque no valor de ${amount} da sua conta`),
    ),
    operation()
    );

};
        


