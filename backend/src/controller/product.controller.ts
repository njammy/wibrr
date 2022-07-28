import axios from 'axios';
import cheerio from 'cheerio';
import Product from './../model/product.model';

async function getWebSiteData(url) {
  const { data, status } = await axios.get(url);
  return data;
}


export function getIziwayProduct(keyWord_arg: string) {
    let products_iziway : Product[] = [];
    let urlReq = 'https://iziway.cm/search?q=wibrrrword&pagesize=100';
    let str = keyWord_arg.replace(' ', '+');
        urlReq = urlReq.replace('wibrrrword', str)
    return getWebSiteData(urlReq).then((data)=>{
      let $ = cheerio.load(data);
      const productListTag = $('.product-grid-list').children();
      productListTag.each((index, element)=>{
        let product: Product= {
            name: $(element).find('.c-product-content > p > a').text(),
            price: $(element).find('.c-product-content > div > span ').first().text().replace('Fcfa', ''),
            oldprice: $(element).find('.c-product-content > div > span > del ').text().replace('Fcfa', ''),
            link: 'https://iziway.cm/'+ $(element).find('.c-product-img > a ').attr('href')
        }
        index%2==0 ? products_iziway.push(product) : null;
      })
      return products_iziway;
    })
}

export function getGloProduct(keyWord_arg: string) {
    let products_glo : Product[] = [];
    let urlReq = "https://glotelho.cm/fr/search/wibrrrword?product_list_limit=all";
    let str = keyWord_arg.replace(' ', '%20');
        urlReq = urlReq.replace('wibrrrword', str)
    return getWebSiteData(urlReq).then((data)=>{
        let $ = cheerio.load(data);
        const productListTag = $('.products-grid > ol').children();
        productListTag.each((index, element)=>{
          let product: Product= {
              name: $(element).find('.product-item-info > .item-inner > .product-item-details > .product-name > a').text(),
              price: $(element).find('.product-item-info > .item-inner > .product-item-details > .price-box > .special-price > .price-container > .price-wrapper  > .price > .currency > .currency-amount').text(),
              oldprice: $($(element).find('.product-item-info > .item-inner > .product-item-details > .price-box > .old-price > .price-container').last()).find('.price > .currency > .currency-amount').text(),
              link: ''+$(element).find('.product-item-info > .item-inner > .product-item-details > .product-name > a').attr('href')
          }
          products_glo.push(product);
        })
        return products_glo;
      });
}