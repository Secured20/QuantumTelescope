// Node Sever 
import cors from 'cors'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import ViteExpress from "vite-express";
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RESULT_MIN_FILE = 'admin/catalogs/quantum_data_min.json';
// Add file type validation
import fileUpload from 'express-fileupload';
// Server Config
const port = process.env.PORT || 30057;
const host = "localhost";    
function quantum(keysFile,keyS) {
  // Check each key line
  const key = '0101001010101010101010100101010101010010101010100101010101010100101010101010010101010101';
  if(keysFile){
    //Parse key file
    if(keysFile.data != undefined){
      var buffer = keysFile.data.toString();
      if(buffer){
        if (buffer.includes(key)) {
          return key
        } else {
          return false
        }
      }else{
        return false
      }
    }else{
      return false
    }
  }else if(keyS){
    // Set session
    var buffer2 = keyS.toString()
    if (buffer2.includes(key)) {
      return key
    } else {
      return false
    }
  }else{
    return false
  }
}
async function createServer() {
  const app = express()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  // When the server restarts (for example after the user modifies
  // vite.config.js), `vite.middlewares` is still going to be the same
  // reference (with a new internal stack of Vite and plugin-injected
  // middlewares). The following is valid even after restarts.
  app.use(vite.middlewares)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload());
  app.post('/auth', (req, res) => {
          if(req.files.quantum){
            const qlogin = quantum(req.files.quantum,false);
            if(qlogin){
              res.redirect(`/admin?i=${qlogin}`);
            }else{
              res.redirect('/');
            }
          }else{
            res.redirect('/');
          }
  });
  app.use('/admin', async (req, res, next) => {
      // Everything went fine.
        try {
          const url = req.originalUrl
          const key = url
          const qlogin = quantum(false,key);
          if(qlogin){
            let template = fs.readFileSync(
              path.resolve(__dirname, 'admin/space.html'),
              'utf-8',
            )
            const html = await vite.transformIndexHtml(url, template)
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
          }else{
            let template = fs.readFileSync(
              path.resolve(__dirname, 'index.html'),
              'utf-8',
            )
            const html = await vite.transformIndexHtml(url, template)
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
          }
        } catch (e) {
          // If an error is caught, let Vite fix the stack trace so it maps back
          // to your actual source code.
          vite.ssrFixStacktrace(e)
          next(e)
        }
  })
  /*
  app.use('*', async (req, res, next) => {
      const url = req.originalUrl

      try {
        let template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8',
        )
        const html = await vite.transformIndexHtml(url, template)
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        // If an error is caught, let Vite fix the stack trace so it maps back
        // to your actual source code.
        vite.ssrFixStacktrace(e)
        next(e)
      }
    })
    */
  app.use("/video1", express.static(__dirname + "/video/mb.mp4"))
  //app.use("/create", express.static(__dirname + RESULT_MIN_FILE))
  app.use('/video', async (req, res) => {
    try {
      // Dynamic data blob
      // فذهخذضثقعوخحضث
      // Static File
      const filePath = path.join(__dirname, 'mb.mp4');
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const headers = {
          'Content-Type': 'video/mp4',
          'Content-Length': chunkSize,
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
        };
        res.status(206).set(headers);
        file.pipe(res);
      } else {
        const headers = {
          'Content-Type': 'video/mp4',
          'Content-Length': fileSize,
          'Accept-Ranges': 'bytes',
        };
        res.status(200).set(headers);
        fs.createReadStream(filePath).pipe(res);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });
  async function files(filepath){
    try {
      const packageObj = await fs.readJson(filepath);
      return packageObj;
    } catch (err) {
        console.error(err);
    }
  }
  //Vite Server Side (Detected life)
  app.post('/api/create', async (req, res) => {
        const headers = {
          'Content-Type': 'application/json'
        };

        const url = req.originalUrl
        try {
          var filePath = path.resolve(__dirname, RESULT_MIN_FILE);
          var json = await fs.readJson(RESULT_MIN_FILE);
          // Get data from request and parse int
          var newObj = req.body;
          var dataObj = json;
          const size = parseInt(Object.keys(json).length);
          console.log(size);
          console.log(newObj);
          if(size > 0){//update
           await Object.keys(json).map(item => {
                if(item.galaxy == newObj.galaxy){
                    //Update data where quantum tunneling protocol
                    //item = newObj;
               }else{
                    //item = newObj;
                }
                dataObj.push(item);
            });
          }else{//Create new json
                  // Create new
                  dataObj = [{
                    m: newObj.m,
                    r: newObj.r,
                    d: newObj.d,
                    p: newObj.p,
                    N: newObj.N,
                    K: newObj.K,
                    E: newObj.E,
                  }];
          }
          var strNotes = JSON.stringify(dataObj);
          if(strNotes){
            //Write file
            await fs.writeFile(RESULT_MIN_FILE,strNotes,'utf8', function(e){
                if(e){
                  vite.ssrFixStacktrace(e)
                  //next(e)
                }else{
                  res.status(200).set(headers).end(strNotes)
                }
            });
          }else{
            console.log(strNotes)
          }
        } catch (e) {
          // If an error is caught, let Vite fix the stack trace so it maps back
          // to your actual source code.
          vite.ssrFixStacktrace(e)
          //next(e)
        }
    /*
    try {
      var filePath = './catalogs/quantum_data_min.json';//path.join(__dirname, RESULT_MIN_FILE);
      fs.readFile(filePath,'utf8', function(e,data){
          if(e){
            vite.ssrFixStacktrace(e)
            next(e)
          }
          var newObj = req.body;
          var obj = data;
          // Update
          //const pd = planetsData.find(t => t.userData.name === selectedExoplanet);
           obj.forEach(item => {
              if(item.i == newObj.i){
                  item = newObj
             }else{
                // Create new
                obj.push({
                  i: obj.length+1,
                  n: newObj.n,
                  r: newObj.r,
                  d: newObj.d,
                  p: newObj.p,
                  N: newObj.n,
                  K: newObj.rgb,
                });
              }
          });
          var strNotes = JSON.stringify(obj);
          fs.writeFile(filePath,strNotes, function(e){
              if(e){
                vite.ssrFixStacktrace(e)
                next(e)
              }
          });

      })
    } catch (err) {
        vite.ssrFixStacktrace(e)
        next(e)
    }*/
  });
  const server = app.listen(port, host);
  const options = {
    origin: `http://${host}:${port}`,
  }
  app.use(cors(options))
  ViteExpress.bind(app, server, async () => {
    const { root, base } = await ViteExpress.getViteConfig();
    console.log(`Serving app from root ${root}`);
    console.log(`Server is listening at http://${host}:${port}${base}`);
  });
}

createServer()