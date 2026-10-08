import Todo from "../models/todo.js"

export const retreive = async(req, res) => {
    try {
        const todos=await Todo.find().populate("createdBy","username")
        res.status(200).json({ message: "todos",todos })
    } catch (error) {
         console.log(error);
        res.status(500).json({ error: error.message })
    }
}

export const create = async(req, res) => {
    try {
        const { title,description } = req.body

        const todo=await Todo.create({title,description,createdBy:req.user.id})
        res.status(201).json({message:"Toto Stored", todo})

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

export const updation =async (req, res) => {
    try {
       const {id}= req.params;
       const {title,description}=req.body

      const todo= await Todo.findByIdAndUpdate(
        id,
        {title,description},
        {new:true}
       )
         res.status(201).json({message:"Toto Updated", todo})
    } catch (error) {
         console.log(error);
        res.status(500).json({ error: error.message })
    }
}

export const deletion = async(req, res) => {
    try {
         const {id}= req.params;
         const todo= await Todo.findByIdAndDelete(
        id
       )
        res.status(200).json({ message: "todo deleted" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}