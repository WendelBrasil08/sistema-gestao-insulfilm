import { ZodError } from "zod";
import { AppError } from "./App_errors";
import { FastifyReply, FastifyRequest } from "fastify";

export function errorHandler(err: unknown, req: FastifyRequest, res: FastifyReply) {
    if(err instanceof ZodError){
        return res.status(400).send({message: "Erro na validação dos dados", erros: err.issues.map( issue => ({
            campo: issue.path.join(", "),
            message: issue.message
        }))
        });
    }
    
    if(err instanceof AppError){
        return res.status(err.statusCode).send({message: err.message});
    }
    
    console.error("Erro Inesperado:", err)
    return res.status(500).send({message: "Erro interno do servidor"})
}

    