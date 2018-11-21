import {Router,Request,Response} from "express";

const router = Router();

router.get('/mensajes',(req:Request,resp:Response)=>{
    resp.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });
});

router.post('/mensajes',(req:Request,resp:Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    console.log(`Cuerpo: ${cuerpo} De: ${de}`);
    

    resp.json({
        ok: true,
        mensaje: 'Post listo',
        cuerpo,
        de
    });
});

router.post('/mensajes/:id',(req:Request,resp:Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    console.log(`Cuerpo: ${cuerpo} De: ${de} Id: ${id}`);
    

    resp.json({
        ok: true,
        mensaje: 'Post listo',
        cuerpo,
        de,
        id
    });
});

export default router;