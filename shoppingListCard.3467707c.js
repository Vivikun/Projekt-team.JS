function e(e){return e&&e.__esModule?e.default:e}var o=globalThis,t={},s={},n=o.parcelRequirec448;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in s){var o=s[e];delete s[e];var n={id:e,exports:{}};return t[e]=n,o.call(n.exports,n,n.exports),n.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){s[e]=o},o.parcelRequirec448=n);var i=n.register;i("ifJdc",function(e,o){Object.defineProperty(e.exports,"register",{get:()=>t,set:e=>t=e,enumerable:!0,configurable:!0});var t,s=new Map;t=function(e,o){for(var t=0;t<o.length-1;t+=2)s.set(o[t],{baseUrl:e,path:o[t+1]})}}),i("b5y5b",function(e,o){e.exports=new URL("amazon-shop-1x.caf0b3cb.png",import.meta.url).toString()}),i("3Bfnm",function(e,o){e.exports=new URL("amazon-shop-2x.c246ebc6.png",import.meta.url).toString()}),i("jcqIm",function(e,o){e.exports=new URL("apple-shop-1x.1a3f8a6b.png",import.meta.url).toString()}),i("9UbC2",function(e,o){e.exports=new URL("apple-shop-2x.495409a0.png",import.meta.url).toString()}),i("hFnGY",function(e,o){e.exports=new URL("bookshop-1x.6e21e8db.png",import.meta.url).toString()}),i("6SLhl",function(e,o){e.exports=new URL("bookshop-2x.14e7190a.png",import.meta.url).toString()}),n("ifJdc").register(new URL("",import.meta.url).toString(),JSON.parse('["cSTZi","shoppingListCard.3467707c.js","he8zy","amazon-shop-1x.caf0b3cb.png","9ukzY","amazon-shop-2x.c246ebc6.png","8hE8O","apple-shop-1x.1a3f8a6b.png","jtZF8","apple-shop-2x.495409a0.png","dKXC7","bookshop-1x.6e21e8db.png","iSWGx","bookshop-2x.14e7190a.png","1XyF0","trash.cb89cc86.svg","3ZcjA","index.7109c0c8.css","aeODi","shoppingListCard.ad6380b0.js","baecm","shoppingListCard.runtime.9c32bd40.js"]')),n("cT4Yw"),n("kM5jX"),n("5zVhE");var a=n("bvT6G"),r=n("b5y5b"),l=n("3Bfnm"),p=n("jcqIm"),c=n("9UbC2"),h=n("hFnGY"),_=n("6SLhl"),g=n("cT4Yw"),d={};d=new URL("trash.cb89cc86.svg",import.meta.url).toString();const f=document.querySelector(".shopping__cards"),u=document.querySelector(".shopping__storage"),m="selected-books",b=document.querySelectorAll(".navigation__link"),H=async()=>{let o=(0,a.default).load(m);console.log(o),o?.length>0&&(o.forEach(async o=>{let t=await (0,g.getBooksId)(o);(function(o){let{_id:t,book_image:s,author:n,book_image_width:i,book_image_height:a,title:g,list_name:m,description:b,buy_links:[H,S,,,,k]}=o,w=`<li class="shopping__card" id="${t}">
      <div class="shopping__block">
        <div>
          <div class="shopping__thumb">
            <img src="${s}" alt="${m}" class="shopping__book-img" width="${i}" height="${a}"/>
          </div>
          </div>
          <div class="shopping__wrap">
          <h2 class="shopping__title">${g}</h2>
          <p class="shopping__category">${m}</p>
          <p class="shopping__book-description">${b}</p>
          <p class="shopping__book-author">${n}</p>
          <ul class="shopping__shops">
            <li class="shopping__shop">
              <a href="${H.url}" class="shopping__shop-link" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Amazon-book site">
                <img srcset="${/*@__PURE__*/e(r)} 1x, ${/*@__PURE__*/e(l)} 2x" src="${/*@__PURE__*/e(r)}" alt="${H.name}" class="shopping__shop-img" width="48" height="15"/>
              </a>
            </li>
            <li class="shopping__shop">
              <a href="${S.url}" class="shopping__shop-link" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Apple-book site">
                <img srcset="${/*@__PURE__*/e(p)} 1x, ${/*@__PURE__*/e(c)} 2x" src="${/*@__PURE__*/e(p)}" alt="${S.name}" class="shopping__shop-img" width="28" height="27"/>
              </a>
            </li>
            <li class="shopping__shop">
              <a href="${k.url}" class="shopping__shop-link" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Book-shop site">
                <img srcset="${/*@__PURE__*/e(h)} 1x, ${/*@__PURE__*/e(_)} 2x" src="${/*@__PURE__*/e(h)}" alt="${k.name}" class="shopping__shop-img" width="32" height="30"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button type="button" class="shopping__btn" data-id="${t}" aria-label="Delete the book from shopping list"> 
   <img src="${/*@__PURE__*/e(d)}"/>
      </button>
    </li>`;f.innerHTML+=w,u.style.display="none"})(t)}),f.addEventListener("click",S))};function S(e){let o=e.target.closest(".shopping__btn");if(!o)return;let t=o.dataset.id,s=(0,a.default).load("selected-books"),n=s.indexOf(t);s.splice(n,1),(0,a.default).save(m,s);let i=(0,a.default).load("selected-books");(0,a.default).save("selected-books",s),0===i.length&&(u.style.display="block",f.style.display="none",f.classList.add("container_inactive"));let r=document.getElementById(t);r.remove()}H(),function(e){e.forEach((e,o)=>{let t=e.getAttribute("href").match(/\/[a-z-]*.html/g),s=window.location.href.match(/Projekt-team.JS\/$/g),n=window.location.href.match(/Projekt-team.JS\/#$/g),i=window.location.href.match(/1234\/#$/g);(window.location.href.includes(t)||window.location.href.includes(s)&&0===o||window.location.href.includes(n)&&0===o||window.location.href.includes(i)&&0===o)&&e.classList.add("is-activ")})}(b),n("avlWO"),n("3G0rq");//# sourceMappingURL=shoppingListCard.3467707c.js.map

//# sourceMappingURL=shoppingListCard.3467707c.js.map
