const {model} =require('../Mongo/mongo')

const create = async(req,res)=>{

    try{
        const items = await model.create(req.body)
        res.status(200).json({items})
}
catch(err){
    res.status(500).send(err)
}
    }

const findall = async(req,res)=>{

    try{
        const items = await model.find({})
        res.status(200).send({items})
}
catch(err){
    res.status(500).send(err)
}
    }

    const removeall = async(req,res)=>{

        try{
            const items = await model.deleteMany({})
            res.status(200).send({items})
    }
    catch(err){
        res.status(500).send(err)
    }
        }

    const findone = async(req,res)=>{
        const taskid = req.params.id;
        try{
            const items = await model.findOne({_id:taskid})
            if(items){
                res.status(200).json({items})
            }
            else{
              
                res.status(404).send(`No such taskid with value ${taskid} exists`)
            }
           
    }
    catch(err){
        console.log('There was an error')
        res.status(500).json({err})
    }
        }

        const remove = async(req,res)=>{
            const taskid = req.params.id;
            try{
                const items = await model.findOneAndDelete({_id:taskid})
                if(items){
                    res.status(200).json({items})
                }
                else{
                    res.status(404).send(`No such taskid with value ${taskid} exists`)
                }
        }
        catch(err){
            console.log('There was an error')
            res.status(500).json({err})
        }
            }

            const update = async(req,res)=>{
                const taskid = req.params.id;
                try{
                    const items = await model.findOneAndUpdate({_id:taskid},req.body,{
                        new:true, runValidators:true
                    })
                    if(items){
                        res.status(200).json({items})
                    }
                    else{
                        res.status(404).send(`No such taskid with value ${taskid} exists`)
                    }
            }
            catch(err){
                console.log('There was an error')
                res.status(500).json({err})
            }
                }

            
module.exports ={update,findone,remove,findall,create,removeall}
  