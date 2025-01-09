import { PrismaClient } from "@prisma/Client";
import express, {json, Request, Response} from 'express'
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/task", async(req:Request, res: Response) =>{
    try{
        const task = await prisma.task.findMany();
        res.json(task);
    }catch(error){
        res.status(500).json({error: "Erro ao listar task"})
    }
});
app.post("/task", async(req:Request, res: Response) =>{
    const {title}: { title: string } = req.body;
    
    try{
        const task = await prisma.task.create({
            data:{
                title: title,
            },
        });
        res.status(201).json(task);
    }catch(error){
        res.status(500).json({error: "Erro ao listar task"})
    }
});

app.put("/task/:id", async(req: Request, res: Response) =>{
    const {id} = req.params;
    const {title} = req.body;

   try{
    const task = await prisma.task.update({
        where: {id: Number(id)}, 
        data:{title} 
    })
    res.json(task)
   }catch(error){
    res.status(500).json({error: "Erro ao atualizar task"})
   }
});

app.delete("/task/:id", async(req: Request, res: Response) =>{
    const {id} = req.params;
    
    try{
        const task = await prisma.task.delete({
            where : {id: Number(id)}
        })
        res.status(201).json({message: 'Tarefa deletada com sucesso!'})
    }catch(error){
        res.status(500).json({error: "Erro ao deletar task"})
       }
});

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


