import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  app.get("/filteredimage", async (req,res)=>{

   // res.status(200).send("you made it")

    //    1. validate the image_url query

    if(req.query.image_url){

      // 2. call filterImageFromURL(image_url) to filter the image
      const image_url = req.query.image_url
      console.log(image_url)
      const file = await filterImageFromURL(image_url)


      // 3. send the resulting file in the response
      res.status(200).sendFile(file) //might have to change ot sendFile

      // 4. deletes any files on the server on finish of the response
      //todo: figure this out
    }else{
      res.status(404).send("Image URL does not exist")
    }
  })

  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
