const express = require('express');
const algoliasearch = require('algoliasearch')
const app = express()
const path = require('path')
const fs = require('fs')

const ALGOLIA_APPLICATION_ID="WG28FHOY6M"
const ALGOLIA_ADMIN_ID ="0e476883001da3d97523a0cb6bc0dcc6"
const ALGOLIA_INDEX_NAME="users-index"

app.get('/',(req,res)=>{
  const data = fs.readFileSync(path.resolve('data.json'), 'utf-8')

  const client = algoliasearch( ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_ID)
  const index = client.initIndex(ALGOLIA_INDEX_NAME)

  const post =  JSON.parse(data).map(item => ({ ...item, objectID:item.id } ))

  index.saveObjects(post)
   .then((objectID)=>console.log({objectID}))
   .catch(err=>console.log(err))
  return res.json(JSON.parse(post))

})

app.listen(process.env.PORT || 3000,()=>{
  console.log('sever on port 3000')
}) 

