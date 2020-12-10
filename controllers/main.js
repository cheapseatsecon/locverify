const getTableData = (req, res, db) => {
    console.log(req.params.id)
    db.select('*').from('locations').where({ username: req.params.id })
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: err}))
  }
  
  const postTableData = (req, res, db) => {
    const { id, username, building, remote, workingRemote } = req.body
    const added = new Date()
    db('locations').insert({ username, building, remote, workingRemote })
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({ dbError: err.stack }))
  }
  
  const putTableData = (req, res, db) => {
    const { id, username, building, remote, workingRemote } = req.body
    db('locations').where({username:username}).update({ building, remote, workingRemote })
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({ dbError: err.stack }))
  }
  
  const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('locations').where({id}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData
  }