const express = require('express');
const router = express.Router()
module.exports = router;
const modeloTarefa = require('../models/tarefa');
router.post('/post', async (req, res) => {
 const objetoTarefa = new modeloTarefa({
 descricao: req.body.descricao,
 statusRealizada: req.body.statusRealizada
 })
 try {
 const tarefaSalva = await objetoTarefa.save();
 res.status(200).json(tarefaSalva)
 }
 catch (error) {
 res.status(400).json({ message: error.message })
 }
})
router.get('/getAll', async (req, res) => {
  try {
  const resultados = await modeloTarefa.find();
  res.json(resultados)
  }
  catch (error) {
  res.status(500).json({ message: error.message })
  }
 }) 
router.delete('/delete/:id', async (req, res) => {
    try {
    const resultado = await modeloTarefa.findByIdAndDelete(req.params.id)
    res.json(resultado)
    }
    catch (error) {
    res.status(400).json({ message: error.message })
    }
})
router.patch('/update/:id', async (req, res) => {
  try {
  const id = req.params.id;
  const novaTarefa = req.body;
  const options = { new: true };
  const result = await modeloTarefa.findByIdAndUpdate(
  id, novaTarefa, options
  )
  res.json(result)
  }
  catch (error) {
  res.status(400).json({ message: error.message })
  }
 })
router.get('/getcompleta', async (req, res) => {
  try {
      const resultados = await modeloTarefa.find({ statusRealizada: true });
      res.json(resultados)
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
})
router.get('/getincompleta', async (req, res) => {
  try {
      const resultados = await modeloTarefa.find({ statusRealizada: false });
      res.json(resultados)
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
})
router.get('/search/:value', async (req, res) => {
  try {
    const searchString = req.params.value;
    const resultados = await modeloTarefa.find({
      descricao: { $regex: new RegExp(searchString, 'i') }
    });
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/get/:id', async (req, res) => {
  try {
    const tarefa = await modeloTarefa.findById(req.params.id);
    if (tarefa) {
      res.json(tarefa);
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});