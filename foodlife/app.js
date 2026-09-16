const $=id=>document.getElementById(id);
let lang=(navigator.language||"en").toLowerCase().startsWith("ko")?"ko":"en";
let currentKey=null,currentDish=null,returnTarget="result",currentAmount=100;
let DB_INGREDIENTS=[],DB_ALIAS=new Map();
let DB_RECIPES=[];
const SMALL_SERVING_CATEGORIES=new Set(["spice","seasoning","sweetener","oil"]);

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

const EXTRA={
 chicken:{sat:1.0,sugar:0,sodium:74,chol:85,allergy:["none","Chicken is not one of the common major food allergens.","닭고기는 일반적인 주요 식품 알레르겐에 해당하지 않습니다."]},
 egg:{sat:3.1,sugar:0.4,sodium:142,chol:372,allergy:["major","Egg","달걀","Egg is a major food allergen.","달걀은 주요 식품 알레르겐입니다."]},
 tofu:{sat:0.7,sugar:0.6,sodium:7,chol:0,allergy:["major","Soy","대두","Tofu is made from soybeans.","두부는 대두로 만들어집니다."]},
 rice:{sat:0.1,sugar:0.1,sodium:1,chol:0,allergy:["none","Rice is not one of the common major food allergens.","쌀은 일반적인 주요 식품 알레르겐에 해당하지 않습니다."]},
 salmon:{sat:3.1,sugar:0,sodium:59,chol:55,allergy:["major","Fish","생선","Salmon is a fish allergen.","연어는 생선 알레르겐에 해당합니다."]},
 milk:{sat:1.9,sugar:5.1,sodium:43,chol:10,allergy:["major","Milk","우유","Milk is a major food allergen.","우유는 주요 식품 알레르겐입니다."]},
 cheese:{sat:21,sugar:0.5,sodium:621,chol:105,allergy:["major","Milk","우유","Cheese contains milk proteins.","치즈에는 우유 단백질이 포함됩니다."]},
 shrimp:{sat:0.1,sugar:0,sodium:111,chol:189,allergy:["major","Shellfish","갑각류","Shrimp is a crustacean shellfish allergen.","새우는 갑각류 알레르겐입니다."]},
 soy:{sat:0.1,sugar:0.4,sodium:5493,chol:0,allergy:["major","Soy","대두","Soy sauce contains soy and may also contain wheat depending on the product.","간장은 대두를 포함하며 제품에 따라 밀이 포함될 수 있습니다."]},
 flour:{sat:0.2,sugar:0.3,sodium:2,chol:0,allergy:["major","Wheat","밀","Wheat flour is a wheat allergen.","밀가루는 밀 알레르겐입니다."]}
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
function rebuildIngredientIndex(){
 DB_ALIAS=new Map();
 DB_INGREDIENTS.forEach(x=>{
  const terms=[x.names?.ko,x.names?.en,...(x.aliases?.ko||[]),...(x.aliases?.en||[])].filter(Boolean);
  terms.forEach(t=>DB_ALIAS.set(normalize(t),x.id));
 });
}
async function loadRecipeDB(){
 try{
  const res=await fetch("data/recipes.json?v=0.2.0",{cache:"no-store"});
  const data=await res.json(); DB_RECIPES=data.recipes||[];
 }catch(err){console.warn("Recipe DB unavailable; using prototype fallback.",err)}
}
async function loadIngredientDB(){
 try{
  const res=await fetch("data/ingredients.json?v=1.0.0",{cache:"no-store"});
  const data=await res.json(); DB_INGREDIENTS=data.ingredients||[]; rebuildIngredientIndex();
  const c=$("coverageCount"); if(c)c.textContent=DB_INGREDIENTS.length;
 }catch(err){console.warn("Ingredient DB unavailable; using prototype fallback.",err)}
}
function findIngredient(raw){
 const q=normalize(raw);
 const dbid=DB_ALIAS.get(q); if(dbid)return dbid;
 for(const [k,v] of Object.entries(I)) if(v[6].some(a=>normalize(a)===q)) return k;
 return null;
}
function getIngredient(id){return DB_INGREDIENTS.find(x=>x.id===id)||null}
function servingPresets(id){
 const x=getIngredient(id);
 if(x && SMALL_SERVING_CATEGORIES.has(x.category)) return [1,5,10,15,30];
 return [50,100,150,200];
}
function nutritionFor(id){
 if(I[id])return {kcal:I[id][2],protein_g:I[id][3],carbs_g:I[id][4],fat_g:I[id][5],legacy:true};
 const x=getIngredient(id);return x?.nutrition_per_100g||{};
}
function applyLang(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-en]").forEach(el=>el.textContent=el.dataset[lang]);
 $("langBtn").textContent=lang==="ko"?"English":"한국어";
 $("ingredientInput").placeholder=lang==="ko"?"닭, 계란, 토마토, 밥...":"Chicken, egg, tomato, rice...";
 $("recipeSearchInput").placeholder=lang==="ko"?"닭볶음탕, 한국요리, 매운 요리...":"Chicken curry, Korean, spicy...";
 $("countrySearchInput").placeholder=lang==="ko"?"베트남, 그리스, 브라질...":"Vietnam, Greece, Brazil...";
 renderExplorerFilters();
 if(currentKey) renderIngredient(currentKey,false);
 if(currentDish && !$("recipe").classList.contains("hidden")) renderRecipe(currentDish,false);
}
function round1(n){return Math.round(n*10)/10}
function updateNutrition(){
 if(!currentKey)return; const n=nutritionFor(currentKey); const factor=currentAmount/100;
 const val=(x,unit)=>x==null?"—":round1(x*factor)+unit;
 $("kcalValue").textContent=n.kcal==null?"—":Math.round(n.kcal*factor);
 $("kcalBasis").textContent="kcal / "+currentAmount+"g";
 $("protein").textContent=val(n.protein_g,"g");
 $("carbs").textContent=val(n.carbs_g,"g");
 $("fat").textContent=val(n.fat_g,"g");
 $("nutritionCalories").textContent=n.kcal==null?"—":Math.round(n.kcal*factor)+" kcal";
 const x=EXTRA[currentKey]||{}, db=getIngredient(currentKey), dn=db?.nutrition_per_100g||{};
 $("satfat").textContent=dn.sat_fat_g!=null?val(dn.sat_fat_g,"g"):(x.sat==null?"—":round1(x.sat*factor)+"g");
 $("sugars").textContent=dn.sugars_g!=null?val(dn.sugars_g,"g"):(x.sugar==null?"—":round1(x.sugar*factor)+"g");
 $("sodium").textContent=dn.sodium_mg!=null?Math.round(dn.sodium_mg*factor)+"mg":(x.sodium==null?"—":Math.round(x.sodium*factor)+"mg");
 $("cholesterol").textContent=dn.cholesterol_mg!=null?Math.round(dn.cholesterol_mg*factor)+"mg":(x.chol==null?"—":Math.round(x.chol*factor)+"mg");
 document.querySelectorAll(".amount-presets button").forEach(b=>b.classList.toggle("active",Number(b.dataset.grams)===currentAmount));
}
function renderAllergy(key){
 const host=$("allergyContent"),a=EXTRA[key]?.allergy;
 if(!a){host.innerHTML='<p class="allergy-status">'+tr("Information being verified","정보 확인 중")+'</p><p>'+tr("Verified allergy information for this ingredient is being added.","이 재료의 검증된 알레르기 정보를 추가하고 있습니다.")+'</p>';return}
 if(a[0]==="major")host.innerHTML='<p class="allergy-status">⚠ '+tr(a[1],a[2])+'</p><p>'+tr(a[3],a[4])+'</p>';
 else host.innerHTML='<p class="allergy-status">✓ '+tr("No common major allergen identified","일반적인 주요 알레르겐 해당 없음")+'</p><p>'+tr(a[1],a[2])+'</p>';
}
function renderIngredient(key,scroll=true){
 currentKey=key; const d=I[key], db=getIngredient(key);
 const presets=servingPresets(key); currentAmount=presets.includes(100)?100:(presets.includes(5)?5:presets[0]);
 document.querySelectorAll(".amount-chip").forEach((b,i)=>{if(presets[i]!=null){b.style.display="";b.dataset.g=presets[i];b.textContent=presets[i]+"g";b.classList.toggle("active",presets[i]===currentAmount)}else b.style.display="none"});
 $("amountInput").value=currentAmount;
 $("ingredientName").textContent=db?(lang==="ko"?db.names.ko:db.names.en):(lang==="ko"?d[1]:d[0]);
 $("ingredientNote").textContent=tr("Approximate nutrition per 100g. Choose a dish below or browse by country.","100g 기준 참고 영양정보입니다. 아래 요리를 고르거나 나라별로 둘러보세요.");
 $("amountInput").value=currentAmount; updateNutrition(); renderAllergy(key);
 $("result").classList.remove("hidden");
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
const COUNTRY_META={
 Korea:["🇰🇷","한국"],USA:["🇺🇸","미국"],China:["🇨🇳","중국"],Japan:["🇯🇵","일본"],India:["🇮🇳","인도"],Italy:["🇮🇹","이탈리아"],France:["🇫🇷","프랑스"],Mexico:["🇲🇽","멕시코"],Thailand:["🇹🇭","태국"],Spain:["🇪🇸","스페인"],
 Vietnam:["🇻🇳","베트남"],Turkey:["🇹🇷","튀르키예"],Greece:["🇬🇷","그리스"],Germany:["🇩🇪","독일"],Brazil:["🇧🇷","브라질"],Indonesia:["🇮🇩","인도네시아"],Malaysia:["🇲🇾","말레이시아"],Philippines:["🇵🇭","필리핀"],Portugal:["🇵🇹","포르투갈"],Morocco:["🇲🇦","모로코"]
};
const FEATURED_COUNTRIES=["Korea","USA","China","Japan","India","Italy","France","Mexico","Thailand","Spain","Vietnam","Greece"];
const REGION_META={
 Korea:[["Seoul/Gyeonggi","서울·경기"],["Gangwon","강원"],["Chungcheong","충청"],["Gyeongsang","경상"],["Jeolla","전라"],["Jeju","제주"]],
 USA:[["Northeast","북동부"],["South","남부"],["Midwest","중서부"],["Southwest","남서부"],["West Coast","서부해안"],["Hawaii","하와이"]],
 China:[["Sichuan","쓰촨"],["Cantonese","광둥"],["Shandong","산둥"],["Jiangsu/Zhejiang","장쑤·저장"],["Hunan","후난"],["Northeast","동북"]],
 Japan:[["Hokkaido","홋카이도"],["Kanto","간토"],["Kansai","간사이"],["Chubu","주부"],["Chugoku/Shikoku","주고쿠·시코쿠"],["Kyushu/Okinawa","규슈·오키나와"]],
 India:[["North India","북인도"],["South India","남인도"],["West India","서인도"],["East India","동인도"],["Northeast India","북동인도"]],
 Italy:[["North Italy","북부"],["Central Italy","중부"],["South Italy","남부"],["Sicily/Sardinia","시칠리아·사르데냐"]],
 France:[["North/Paris","북부·파리"],["West","서부"],["East","동부"],["Southwest","남서부"],["Provence/Mediterranean","프로방스·지중해"]],
 Mexico:[["North","북부"],["Central","중부"],["Pacific","태평양 연안"],["Gulf","멕시코만"],["Oaxaca","오악사카"],["Yucatan","유카탄"]],
 Thailand:[["North","북부"],["Northeast/Isan","북동부·이산"],["Central","중부"],["South","남부"]],
 Spain:[["North","북부"],["Catalonia","카탈루냐"],["Central","중부"],["Valencia","발렌시아"],["Andalusia","안달루시아"],["Islands","도서지역"]]
};
function uniq(arr){return [...new Set(arr)]}
function filterButton(text,val,kind,active){
 const b=document.createElement("button");b.textContent=text;b.className=active?"active":"";b.onclick=()=>{if(kind==="region")region=val;if(kind==="type")type=val;renderExplorerFilters()};return b
}
function countriesForCurrent(){return FEATURED_COUNTRIES}
function renderCountryCards(){
 const host=$("countryCards"); if(!host)return; host.innerHTML="";
 const available=countriesForCurrent();
 available.forEach(c=>{
  const meta=COUNTRY_META[c]||["🌍",c]; const all=DISHES.filter(d=>d.country===c && (!currentKey||d.main.includes(currentKey)));
  const regions=(REGION_META[c]||uniq(all.map(d=>d.region)).map(r=>[r,(all.find(x=>x.region===r)||{}).regionKo||r]));
  const card=document.createElement("article");card.className="country-card";
  const head=document.createElement("div");head.className="country-head";
  head.innerHTML='<span class="flag" role="img" aria-label="'+tr(c,meta[1])+'">'+meta[0]+'</span><div><h3>'+tr(c,meta[1])+'</h3><small>'+tr("See all dishes","전체 요리 보기")+'</small></div>';
  head.onclick=()=>openCountry(c,"All");card.appendChild(head);
  const links=document.createElement("div");links.className="region-links";
  regions.slice(0,6).forEach(pair=>{const r=Array.isArray(pair)?pair[0]:pair;const ko=Array.isArray(pair)?pair[1]:r;const b=document.createElement("button");b.textContent=tr(r,ko);b.onclick=()=>openCountry(c,r);links.appendChild(b)});card.appendChild(links);
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
 rf.appendChild(filterButton(tr("All regions","전체 지역"),"All","region",region==="All"));(REGION_META[country]||uniq(base.map(d=>d.region)).map(r=>[r,(base.find(x=>x.region===r)||{}).regionKo||r])).forEach(pair=>{const r=pair[0],ko=pair[1];rf.appendChild(filterButton(tr(r,ko),r,"region",region===r))});
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
$("amountInput").addEventListener("input",e=>{const v=Math.max(1,Math.min(5000,Number(e.target.value)||1));currentAmount=v;updateNutrition()});
document.querySelectorAll(".amount-presets button").forEach(b=>b.onclick=()=>{currentAmount=Number(b.dataset.grams);$("amountInput").value=currentAmount;updateNutrition()});
$("langBtn").onclick=()=>{lang=lang==="ko"?"en":"ko";applyLang()};
function countrySearch(q){
 const raw=normalize(q),host=$("countrySearchResults");host.innerHTML="";
 if(!raw)return;
 const matches=Object.entries(COUNTRY_META).filter(([en,m])=>normalize(en).includes(raw)||normalize(m[1]).includes(raw)).slice(0,8);
 if(!matches.length){host.innerHTML='<div class="recipe-no-result">'+tr("Country not found yet. We are expanding worldwide coverage.","아직 등록되지 않은 나라입니다. 전 세계 국가로 계속 확장하고 있습니다.")+'</div>';return}
 matches.forEach(([en,m])=>{const d=document.createElement("div");d.className="country-result";d.innerHTML='<span>'+m[0]+'</span><b>'+tr(en,m[1])+'</b><small>'+tr("Open →","보기 →")+'</small>';d.onclick=()=>openCountry(en,"All");host.appendChild(d)})
}
$("countrySearchForm").addEventListener("submit",e=>{e.preventDefault();countrySearch($("countrySearchInput").value)});
function dbIngredientName(id){
 const x=getIngredient(id); if(x)return lang==="ko"?x.names.ko:x.names.en;
 return id.replaceAll("_"," ");
}
function renderDBRecipeCard(r,host){
 const c=document.createElement("article");c.className="dish-card";
 const meta=[r.country,r.region].filter(Boolean).join(" · ");
 c.innerHTML='<span class="country">'+meta+'</span><h3>'+(lang==="ko"?r.names.ko:r.names.en)+'</h3><p>'+r.ingredients.slice(0,5).map(x=>dbIngredientName(x.ingredient_id)).join(" · ")+'</p><span class="open">'+tr("View editable recipe →","레시피·재료 보기 →")+'</span>';
 c.onclick=()=>renderDBRecipe(r);host.appendChild(c);
}
function renderDBRecipe(r){
 currentDish=r;$("recipe").classList.remove("hidden");
 $("recipeName").textContent=lang==="ko"?r.names.ko:r.names.en;
 $("recipeMeta").textContent=tr(r.country+" · "+r.region+" · "+r.servings+" servings",r.country+" · "+r.region+" · "+r.servings+"인분 · 표준 레시피 기준");
 $("recipeIngredients").innerHTML=r.ingredients.map((x,i)=>'<li data-ri="'+i+'"><span>'+dbIngredientName(x.ingredient_id)+'</span> <input class="recipe-amount" data-i="'+i+'" type="number" min="0" step="1" value="'+x.amount+'" style="width:78px"> '+x.unit+' <button type="button" class="recipe-remove" data-i="'+i+'">'+tr("Remove","빼기")+'</button></li>').join("");
 $("recipeSteps").innerHTML=(lang==="ko"?r.steps.ko:r.steps.en).map(x=>"<li>"+x+"</li>").join("");
 let note=document.getElementById("recipeNutritionNotice");
 if(!note){note=document.createElement("p");note.id="recipeNutritionNotice";note.className="data-note";$("recipeMeta").after(note)}
 note.textContent=tr("Estimated nutrition will recalculate from verified ingredient data. Ingredients without verified nutrition are not guessed.","검증된 재료 영양정보를 기준으로 재계산합니다. 아직 검증되지 않은 재료의 수치는 임의로 추정하지 않습니다.");
 document.querySelectorAll(".recipe-remove").forEach(b=>b.onclick=()=>{const li=b.closest("li");li.querySelector(".recipe-amount").value=0;li.style.opacity=".45"});
 $("recipe").scrollIntoView({behavior:"smooth",block:"start"});
}
function recipeSearch(q){
 const raw=normalize(q),tokens=raw.split(" ").filter(Boolean),host=$("recipeSearchResults");host.innerHTML="";
 let list=DB_RECIPES.filter(r=>{
  const ingredientNames=r.ingredients.flatMap(x=>{const z=getIngredient(x.ingredient_id);return z?[z.names.ko,z.names.en,...(z.aliases?.ko||[]),...(z.aliases?.en||[])]:[x.ingredient_id]});
  const hay=normalize([r.names.ko,r.names.en,r.country,r.region,r.category,...(r.tags||[]),...ingredientNames].join(" "));
  return tokens.every(t=>hay.includes(t));
 });
 if(!list.length){host.innerHTML='<div class="recipe-no-result">'+tr("No matching recipe yet. The recipe database is being expanded.","아직 일치하는 레시피가 없습니다. 레시피 데이터베이스를 계속 확장하고 있습니다.")+'</div>';return}
 list.forEach(r=>renderDBRecipeCard(r,host));
}
;