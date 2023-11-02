let e;function o(e){return e&&e.__esModule?e.default:e}var n=globalThis,t={},s={},i=n.parcelRequirec448;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in s){var o=s[e];delete s[e];var n={id:e,exports:{}};return t[e]=n,o.call(n.exports,n,n.exports),n.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){s[e]=o},n.parcelRequirec448=i);var a=i.register;a("ifJdc",function(e,o){Object.defineProperty(e.exports,"register",{get:()=>n,set:e=>n=e,enumerable:!0,configurable:!0});var n,t=new Map;n=function(e,o){for(var n=0;n<o.length-1;n+=2)t.set(o[n],{baseUrl:e,path:o[n+1]})}}),a("b5y5b",function(e,o){e.exports=new URL("amazon-shop-1x.caf0b3cb.png",import.meta.url).toString()}),a("3Bfnm",function(e,o){e.exports=new URL("amazon-shop-2x.c246ebc6.png",import.meta.url).toString()}),a("jcqIm",function(e,o){e.exports=new URL("apple-shop-1x.1a3f8a6b.png",import.meta.url).toString()}),a("9UbC2",function(e,o){e.exports=new URL("apple-shop-2x.495409a0.png",import.meta.url).toString()}),a("hFnGY",function(e,o){e.exports=new URL("bookshop-1x.6e21e8db.png",import.meta.url).toString()}),a("6SLhl",function(e,o){e.exports=new URL("bookshop-2x.14e7190a.png",import.meta.url).toString()}),i("ifJdc").register(new URL("",import.meta.url).toString(),JSON.parse('["cSTZi","shoppingListCard.633c69c1.js","he8zy","amazon-shop-1x.caf0b3cb.png","9ukzY","amazon-shop-2x.c246ebc6.png","8hE8O","apple-shop-1x.1a3f8a6b.png","jtZF8","apple-shop-2x.495409a0.png","dKXC7","bookshop-1x.6e21e8db.png","iSWGx","bookshop-2x.14e7190a.png","GcmPC","icons.9a6a557a.svg","3ZcjA","index.4fc928ea.css","aeODi","shoppingListCard.ad6380b0.js","baecm","shoppingListCard.runtime.9c32bd40.js"]')),i("cT4Yw"),i("kM5jX"),i("5zVhE");var r=i("bvT6G"),p=i("b5y5b"),l=i("3Bfnm"),c=i("jcqIm"),h=i("9UbC2"),_=i("hFnGY"),g=i("6SLhl");const d=document.querySelector(".shopping__cards"),u=document.querySelector(".shopping__storage");document.querySelector(".shopping__btn");const b="selected-books";var f={};f=new URL("icons.9a6a557a.svg",import.meta.url).toString();const m=new URL(f),S=document.querySelectorAll(".navigation__link");function H(e){let o=e.target.closest(".shopping__btn");if(!o)return;//*
let n=o.closest(".shopping__card"),t=n.dataset.id.trim(),s=(0,r.default).load("selected-books"),i=s.findIndex(e=>e===t);//* Remove the book from the array
s.splice(i,1),//*
(0,r.default).save(b,s),-1!==i?(// Save the updated array to local storage
(0,r.default).save("selected-books",s),// Remove the book element from the DOM
console.log(n),n.remove(),0===b.length&&(d.style.display="none",d.classList.add("container_inactive"))):console.error("Book ID not found in local storage.")}e=(0,r.default).load(b),e?.length>0&&function(e){let n=e.map(({_id:e,book_image:n,author:t,book_image_width:s,book_image_height:i,title:a,list_name:r,description:d,buy_links:[u,b,,,f]})=>`<li class="shopping__card" data-id="${e}">
      <div class="shopping__block">
        <div>
          <div class="shopping__thumb">
            <img src="${n}" alt="${r}" class="shopping__book-img" width="${s}" height="${i}"/>
          </div>
          </div>
          <div class="shopping__wrap">
          <h2 class="shopping__title">${a}</h2>
          <p class="shopping__category">${r}</p>
          <p class="shopping__book-description">${d}</p>
          <p class="shopping__book-author">${t}</p>
          <ul class="shopping__shops">
            <li class="shopping__shop">
              <a href="${u.url}" class="shopping__shop-link" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Amazon-book site">
                <img srcset="${/*@__PURE__*/o(p)} 1x, ${/*@__PURE__*/o(l)} 2x" src="${/*@__PURE__*/o(p)}" alt="${u.name}" class="shopping__shop-img" width="48" height="15"/>
              </a>
            </li>
            <li class="shopping__shop">
              <a href="${b.url}" class="shopping__shop-link" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Apple-book site">
                <img srcset="${/*@__PURE__*/o(c)} 1x, ${/*@__PURE__*/o(h)} 2x" src="${/*@__PURE__*/o(c)}" alt="${b.name}" class="shopping__shop-img" width="28" height="27"/>
              </a>
            </li>
            <li class="shopping__shop">
              <a href="${f.url}" class="shopping__shop-link" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Book-shop site">
                <img srcset="${/*@__PURE__*/o(_)} 1x, ${/*@__PURE__*/o(g)} 2x" src="${/*@__PURE__*/o(_)}" alt="${f.name}" class="shopping__shop-img" width="32" height="30"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button type="button" class="shopping__btn" aria-label="Delete the book from shopping list">
        <svg class="shopping__btn-icon" width="18" height="18">
        <use href="${m}#icon-trash"></use>
        </svg>
      </button>
    </li>`).join("");d.innerHTML=n;let t=document.querySelector(".shopping__btn");t.addEventListener("click",H),u.style.display="none"}(e),function(e){e.forEach((e,o)=>{let n=e.getAttribute("href").match(/\/[a-z-]*.html/g),t=window.location.href.match(/Projekt-team.JS\/$/g),s=window.location.href.match(/Projekt-team.JS\/#$/g),i=window.location.href.match(/1234\/#$/g);(window.location.href.includes(n)||window.location.href.includes(t)&&0===o||window.location.href.includes(s)&&0===o||window.location.href.includes(i)&&0===o)&&e.classList.add("is-activ")})}(S),i("avlWO"),i("3G0rq");// import './js/pop-up';
// import './js/local-storage';
//# sourceMappingURL=shoppingListCard.633c69c1.js.map

//# sourceMappingURL=shoppingListCard.633c69c1.js.map
