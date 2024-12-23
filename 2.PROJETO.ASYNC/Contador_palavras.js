const fs = require('fs').promises;

async function contarPalavra(){
    try {
        var caracteres = await fs.readFile('teste.txt', 'utf-8');
        var palavras = caracteres
    
            .replace(/\s+/g, ' ')    
            .trim()                  
            .split(' ');             
    
        var numeroPalavras = palavras.length

        console.log(`O arquivo 'teste.txt' tem ${numeroPalavras} palavras.`)
    } catch(error) {
        console.log(error)
    };
    

};
contarPalavra();