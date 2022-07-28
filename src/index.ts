import { getGloProduct, getIziwayProduct } from "./controller/product.controller";

// getGloProduct("tecno camon").then((data)=>{
//   data.forEach((d)=>{
//     console.dir(d)
//   })
// })

getIziwayProduct("tecno camon").then((data)=>{
  data.forEach((d)=>{
    console.dir(d)
  })
})