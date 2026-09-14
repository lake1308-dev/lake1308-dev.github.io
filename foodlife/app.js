const $=id=>document.getElementById(id);
let lang=(navigator.language||"en").toLowerCase().startsWith("ko")?"ko":"en";
let currentKey=null,currentDish=null,returnTarget="result";

const I={
 chicken:["Chicken","닭고기",165,31,0,3.6,["chicken","닭","닭고기","닭가슴살"]],
 egg:["Egg","달걀",143,13,1.1,9.5,["egg","eggs","달걀","계란"]],
 tofu:["Tofu","두부",76,8,1.9,4.8,["tofu","두부"]],
 rice:["Cooked rice","밥",130,2.7,28,0.3,["rice","밥","쌀밥","cooked rice"]],
 potato:["Potato","감자",77,2,17,0.1,["potato","potatoes","감자"]],
 sweetpotato:["Sweet potato","고구마",86,1.6,20,0.1,["sweet potato","고구마"]],
 beef:["Beef","소고기",250,26,0,15,["beef","소고기","쇠고기"]],
 pork:["Pork","돼지고기",242,27,0,14,["pork","돼지고기"]],
 salmon:["Salmon","연어",208,20,0,13,["salmon","연어"]],
 tuna:["Tuna","참치",132,29,0,1,["tuna","참치"]],
 shrimp:["Shrimp","새우",99,24,0.2,0.3,["shrimp","prawn","새우"]],
 onion:["Onion","양파",40,1.1,9.3,0.1,["onion","양파"]],
 garlic:["Garlic","마늘",149,6.4,33,0.5,["garlic","마늘"]],
 carrot:["Carrot","당근",41,0.9,10,0.2,["carrot","당근"]],
 tomato:["Tomato","토마토",18,0.9,3.9,0.2,["tomato","tomatoes","토마토"]],
 cabbage:["Cabbage","양배추",25,1.3,5.8,0.1,["cabbage","양배추"]],
 spinach:["Spinach","시금치",23,2.9,3.6,0.4,["spinach","시금치"]],
 broccoli:["Broccoli","브로콜리",34,2.8,6.6,0.4,["broccoli","브로콜리"]],
 mushroom:["Mushroom","버섯",22,3.1,3.3,0.3,["mushroom","mushrooms","버섯","양송이버섯"]],
 banana:["Banana","바나나",89,1.1,23,0.3,["banana","바나나"]],
 apple:["Apple","사과",52,0.3,14,0.2,["apple","사과"]],
 milk:["Milk","우유",61,3.2,4.8,3.3,["milk","우유"]],
 cheese:["Cheese","치즈",402,25,1.3,33,["cheese","치즈"]],
 yogurt:["Plain yogurt","플레인 요거트",61,3.5,4.7,3.3,["yogurt","yoghurt","요거트","요구르트"]],
 butter:["Butter","버터",717,0.9,0.1,81,["butter","버터"]],
 oats:["Oats","귀리",389,16.9,66,6.9,["oats","oat","귀리","오트밀"]],
 lentils:["Lentils","렌틸콩",116,9,20,0.4,["lentils","lentil","렌틸콩"]],
 chickpeas:["Chickpeas","병아리콩",164,8.9,27,2.6,["chickpeas","chickpea","병아리콩"]],
 noodles:["Noodles","면",138,4.5,25,2.1,["noodles","noodle","면","국수"]],
 flour:["Wheat flour","밀가루",364,10,76,1,["flour","wheat flour","밀가루"]],
 soy:["Soy sauce","간장",53,8.1,4.9,0.6,["soy sauce","간장"]],
 gochujang:["Gochujang","고추장",228,5,43,3,["gochujang","고추장"]],
 doenjang:["Doenjang","된장",198,12,27,6,["doenjang","된장"]]
};

const DISHES=[
 {id:"dak",country:"Korea",countryKo:"한국",region:"Gangwon",regionKo:"강원",type:"Stew",typeKo:"국·탕·찌개",name:"Dakbokkeumtang",nameKo:"닭볶음탕",main:["chicken","potato","onion"],desc:"Spicy braised chicken with potato and vegetables.",descKo:"닭과 감자를 매콤하게 끓이는 한국식 닭요리.",time:"45 min",ing:["Chicken 500g","Potato 2","Onion 1","Carrot 1","Gochujang 2 tbsp","Soy sauce 2 tbsp","Garlic 1 tbsp"],ingKo:["닭 500g","감자 2개","양파 1개","당근 1개","고추장 2큰술","간장 2큰술","다진 마늘 1큰술"],steps:["Cut chicken and vegetables.","Mix seasoning with water.","Simmer chicken for 15 minutes.","Add vegetables and cook until tender."],stepsKo:["닭과 채소를 썰어요.","양념에 물을 섞어요.","닭을 약 15분 끓여요.","채소를 넣고 익을 때까지 끓여요."]},
 {id:"butter",country:"India",countryKo:"인도",region:"North India",regionKo:"북인도",type:"Curry",typeKo:"커리",name:"Butter Chicken",nameKo:"버터치킨",main:["chicken","butter","tomato"],desc:"Creamy tomato curry with aromatic spices.",descKo:"토마토와 향신료가 어우러진 부드러운 치킨커리.",time:"40 min",ing:["Chicken 500g","Tomato puree 300g","Butter 30g","Cream 100ml","Garam masala","Garlic","Ginger"],ingKo:["닭 500g","토마토 퓌레 300g","버터 30g","생크림 100ml","가람마살라","마늘","생강"],steps:["Brown chicken.","Cook aromatics and spices in butter.","Add tomato and simmer.","Add chicken and cream."],stepsKo:["닭을 노릇하게 구워요.","버터에 향신료를 볶아요.","토마토를 넣고 끓여요.","닭과 생크림을 넣어요."]},
 {id:"fajita",country:"USA",countryKo:"미국",region:"Texas",regionKo:"텍사스",type:"Grill",typeKo:"구이·볶음",name:"Chicken Fajitas",nameKo:"치킨 파히타",main:["chicken","onion"],desc:"Sizzling chicken, peppers and onion for tortillas.",descKo:"닭과 파프리카·양파를 볶아 또띠아와 먹는 요리.",time:"25 min",ing:["Chicken breast 400g","Bell peppers 2","Onion 1","Lime","Cumin","Tortillas"],ingKo:["닭가슴살 400g","파프리카 2개","양파 1개","라임","큐민","또띠아"],steps:["Slice ingredients.","Season chicken.","Sear chicken.","Add vegetables and lime."],stepsKo:["재료를 썰어요.","닭에 간을 해요.","닭을 볶아요.","채소와 라임을 넣어요."]},
 {id:"mapo",country:"China",countryKo:"중국",region:"Sichuan",regionKo:"쓰촨",type:"Stir-fry",typeKo:"볶음",name:"Mapo Tofu",nameKo:"마파두부",main:["tofu"],desc:"Silky tofu in a spicy Sichuan-style sauce.",descKo:"매콤하고 감칠맛 나는 사천식 두부요리.",time:"25 min",ing:["Tofu 400g","Ground meat 150g","Doubanjiang","Garlic","Ginger"],ingKo:["두부 400g","다진 고기 150g","두반장","마늘","생강"],steps:["Brown meat.","Add aromatics and doubanjiang.","Add tofu and water.","Simmer gently."],stepsKo:["고기를 볶아요.","향신료와 두반장을 넣어요.","두부와 물을 넣어요.","부드럽게 끓여요."]},
 {id:"sundubu",country:"Korea",countryKo:"한국",region:"Seoul/Gyeonggi",regionKo:"서울·경기",type:"Stew",typeKo:"국·탕·찌개",name:"Sundubu-jjigae",nameKo:"순두부찌개",main:["tofu","egg"],desc:"Soft tofu stew with a spicy savory broth.",descKo:"순두부를 얼큰한 국물에 끓이는 한국 찌개.",time:"25 min",ing:["Soft tofu 350g","Gochugaru","Garlic","Onion","Egg 1","Stock"],ingKo:["순두부 350g","고춧가루","마늘","양파","달걀 1개","육수"],steps:["Sauté aromatics.","Add stock.","Add tofu.","Finish with egg."],stepsKo:["향신채를 볶아요.","육수를 부어요.","순두부를 넣어요.","달걀을 넣어 마무리해요."]},
 {id:"aloo",country:"India",countryKo:"인도",region:"North India",regionKo:"북인도",type:"Curry",typeKo:"커리",name:"Aloo Gobi",nameKo:"알루 고비",main:["potato"],desc:"Potato and cauliflower cooked with warming spices.",descKo:"감자와 콜리플라워를 향신료와 익히는 인도요리.",time:"35 min",ing:["Potato 3","Cauliflower","Tomato","Turmeric","Cumin"],ingKo:["감자 3개","콜리플라워","토마토","강황","큐민"],steps:["Toast spices.","Add vegetables.","Add tomato.","Cover and cook."],stepsKo:["향신료를 볶아요.","채소를 넣어요.","토마토를 넣어요.","뚜껑을 덮고 익혀요."]},
 {id:"tortilla",country:"Spain",countryKo:"스페인",region:"Nationwide",regionKo:"전국",type:"Pan-fry",typeKo:"부침·팬요리",name:"Spanish Tortilla",nameKo:"스페인식 또르띠야",main:["potato","egg","onion"],desc:"Thick potato and egg omelette.",descKo:"감자와 달걀로 만드는 도톰한 스페인식 오믈렛.",time:"35 min",ing:["Potato 3","Eggs 5","Onion 1","Olive oil","Salt"],ingKo:["감자 3개","달걀 5개","양파 1개","올리브오일","소금"],steps:["Slice potato and onion.","Cook in olive oil.","Mix with eggs.","Cook and flip."],stepsKo:["감자와 양파를 썰어요.","올리브오일에 익혀요.","달걀과 섞어요.","익히다가 뒤집어요."]},
 {id:"salmonteriyaki",country:"Japan",countryKo:"일본",region:"Nationwide",regionKo:"전국",type:"Grill",typeKo:"구이",name:"Salmon Teriyaki",nameKo:"연어 데리야키",main:["salmon","soy"],desc:"Glazed salmon with a sweet-savory soy sauce.",descKo:"달콤짭짤한 간장소스를 입힌 연어요리.",time:"20 min",ing:["Salmon 2 fillets","Soy sauce","Mirin","Sugar"],ingKo:["연어 2조각","간장","미림","설탕"],steps:["Mix sauce.","Sear salmon.","Add sauce.","Glaze until shiny."],stepsKo:["소스를 섞어요.","연어를 구워요.","소스를 넣어요.","윤기 나게 졸여요."]}
];

function tr(en,ko){return lang==="ko"?ko:en}
function normalize(s){return s.trim().toLowerCase().replace(/\s+/g," ")}
function findIngredient(raw){
 const q=normalize(raw);
 for(const [k,v] of Object.entries(I)) if(v[6].some(a=>normalize(a)===q)) return k;
 return null;
}
function applyLang(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-en]").forEach(el=>el.textContent=el.dataset[lang]);
 $("langBtn").textContent=lang==="ko"?"English":"한국어";
 $("ingredientInput").placeholder=lang==="ko"?"닭, 계란, 토마토, 밥...":"Chicken, egg, tomato, rice...";
 renderExplorerFilters();
 if(currentKey) renderIngredient(currentKey,false);
 if(currentDish && !$("recipe").classList.contains("hidden")) renderRecipe(currentDish,false);
}
function renderIngredient(key,scroll=true){
 currentKey=key; const d=I[key];
 $("ingredientName").textContent=tr(d[1],d[0])===d[0]?d[0]:d[1];
 $("ingredientName").textContent=lang==="ko"?d[1]:d[0];
 $("ingredientNote").textContent=tr("Approximate nutrition per 100g. Choose a dish below or browse by country.","100g 기준 참고 영양정보입니다. 아래 요리를 고르거나 나라별로 둘러보세요.");
 $("kcalValue").textContent=d[2]; $("protein").textContent=d[3]+"g"; $("carbs").textContent=d[4]+"g"; $("fat").textContent=d[5]+"g";
 $("result").classList.remove("hidden");
 renderDishCards(DISHES.filter(x=>x.main.includes(key)),$("dishGrid"));
 renderCountryCards();
 if(scroll) $("result").scrollIntoView({behavior:"smooth",block:"start"});
}
function renderDishCards(list,target){
 target.innerHTML="";
 if(!list.length){target.innerHTML='<div class="empty">'+tr("Nutrition found. Recipe links for this ingredient are being expanded now.","영양정보는 찾았습니다. 이 재료의 요리 연결은 계속 확장 중입니다.")+"</div>";return}
 list.forEach(d=>{
  const c=document.createElement("article"); c.className="dish-card";
  c.innerHTML='<span class="country">'+tr(d.country,d.countryKo)+" · "+tr(d.region,d.regionKo)+'</span><h3>'+tr(d.name,d.nameKo)+'</h3><p>'+tr(d.desc,d.descKo)+'</p><span class="open">'+tr("View recipe →","레시피 보기 →")+"</span>";
  c.onclick=()=>{returnTarget=target.id==="exploreGrid"?"explorer":"result";renderRecipe(d)};
  target.appendChild(c);
 });
}
function renderRecipe(d,scroll=true){
 currentDish=d;$("recipe").classList.remove("hidden");$("recipeName").textContent=tr(d.name,d.nameKo);$("recipeMeta").textContent=tr("Approx. ","약 ")+d.time;
 $("recipeIngredients").innerHTML=(lang==="ko"?d.ingKo:d.ing).map(x=>"<li>"+x+"</li>").join("");
 $("recipeSteps").innerHTML=(lang==="ko"?d.stepsKo:d.steps).map(x=>"<li>"+x+"</li>").join("");
 if(scroll)$("recipe").scrollIntoView({behavior:"smooth",block:"start"});
}
let country="Korea",region="All",type="All";
const COUNTRY_META={Korea:["🇰🇷","한국"],India:["🇮🇳","인도"],USA:["🇺🇸","미국"],China:["🇨🇳","중국"],Spain:["🇪🇸","스페인"],Japan:["🇯🇵","일본"]};
function uniq(arr){return [...new Set(arr)]}
function filterButton(text,val,kind,active){
 const b=document.createElement("button");b.textContent=text;b.className=active?"active":"";b.onclick=()=>{if(kind==="region")region=val;if(kind==="type")type=val;renderExplorerFilters()};return b
}
function countriesForCurrent(){
 const list=currentKey?DISHES.filter(d=>d.main.includes(currentKey)):DISHES;
 return uniq(list.map(d=>d.country));
}
function renderCountryCards(){
 const host=$("countryCards"); if(!host)return; host.innerHTML="";
 const available=countriesForCurrent();
 available.forEach(c=>{
  const meta=COUNTRY_META[c]||["🌍",c]; const all=DISHES.filter(d=>d.country===c && (!currentKey||d.main.includes(currentKey)));
  const regions=uniq(all.map(d=>d.region));
  const card=document.createElement("article");card.className="country-card";
  const head=document.createElement("div");head.className="country-head";
  head.innerHTML='<span class="flag">'+meta[0]+'</span><div><h3>'+tr(c,meta[1])+'</h3><small>'+tr("See all dishes","전체 요리 보기")+'</small></div>';
  head.onclick=()=>openCountry(c,"All");card.appendChild(head);
  const links=document.createElement("div");links.className="region-links";
  regions.slice(0,6).forEach(r=>{const d=all.find(x=>x.region===r);const b=document.createElement("button");b.textContent=tr(r,d.regionKo);b.onclick=()=>openCountry(c,r);links.appendChild(b)});card.appendChild(links);
  const allLink=document.createElement("span");allLink.className="country-all";allLink.textContent=tr("All "+c+" dishes →",meta[1]+" 전체 요리 →");allLink.onclick=()=>openCountry(c,"All");card.appendChild(allLink);
  host.appendChild(card);
 });
}
function openCountry(c,r="All"){
 country=c;region=r;type="All";$("explorer").classList.remove("hidden");renderExplorerFilters();$("explorer").scrollIntoView({behavior:"smooth",block:"start"});
}
function renderExplorerFilters(){
 const rf=$("regionFilters"),tf=$("typeFilters");rf.innerHTML=tf.innerHTML="";
 const meta=COUNTRY_META[country]||["🌍",country];$("explorerFlag").textContent=meta[0];$("explorerTitle").textContent=tr(country,meta[1]);$("explorerSubtitle").textContent=tr("Choose a region or cooking style.","지역 또는 요리방식을 선택하세요.");
 let base=DISHES.filter(d=>d.country===country && (!currentKey||d.main.includes(currentKey)));
 rf.appendChild(filterButton(tr("All regions","전체 지역"),"All","region",region==="All"));uniq(base.map(d=>d.region)).forEach(r=>{const d=base.find(x=>x.region===r);rf.appendChild(filterButton(tr(r,d.regionKo),r,"region",region===r))});
 const regionBase=region==="All"?base:base.filter(d=>d.region===region);
 tf.appendChild(filterButton(tr("All styles","전체 방식"),"All","type",type==="All"));uniq(regionBase.map(d=>d.type)).forEach(tp=>{const d=regionBase.find(x=>x.type===tp);tf.appendChild(filterButton(tr(tp,d.typeKo),tp,"type",type===tp))});
 let list=regionBase;if(type!=="All")list=list.filter(d=>d.type===type);renderDishCards(list,$("exploreGrid"));
}
$("searchForm").addEventListener("submit",e=>{
 e.preventDefault();const raw=$("ingredientInput").value;const k=findIngredient(raw);
 if(k)renderIngredient(k);
 else {
   $("result").classList.add("hidden");
   alert(tr("This prototype does not have detailed nutrition for “"+raw+"” yet. The production version will use a much larger multilingual ingredient database instead of stopping here.","현재 프로토타입에는 ‘"+raw+"’의 상세 영양정보가 아직 없습니다. 실제 버전은 여기서 멈추지 않고 훨씬 큰 다국어 재료 데이터베이스와 연결할 예정입니다."));
 }
});
document.querySelectorAll(".quick button").forEach(b=>b.onclick=()=>{$("ingredientInput").value=b.dataset.query;renderIngredient(findIngredient(b.dataset.query))});
$("langBtn").onclick=()=>{lang=lang==="ko"?"en":"ko";applyLang()};
function showExplorer(){ $("explorer").classList.remove("hidden");renderExplorerFilters();$("explorer").scrollIntoView({behavior:"smooth"})}
$("exploreBtn").onclick=showExplorer;
$("recipeBack").onclick=()=>{$("recipe").classList.add("hidden");$(returnTarget).scrollIntoView({behavior:"smooth"})};
applyLang();