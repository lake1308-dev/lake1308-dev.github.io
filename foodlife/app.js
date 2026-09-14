const DATA={
chicken:{name:{en:"Chicken",ko:"닭고기"},note:{en:"Lean protein and one of the world's most versatile ingredients.",ko:"고단백 식재료이자 세계적으로 활용도가 높은 재료예요."},kcal:165,protein:"31g",carbs:"0g",fat:"3.6g",dishes:[
{name:{en:"Dakbokkeumtang",ko:"닭볶음탕"},country:{en:"Korea",ko:"한국"},desc:{en:"Spicy braised chicken with potato and vegetables.",ko:"감자와 채소를 넣어 매콤하게 끓이는 한국식 닭요리."},time:"45 min",ingredients:{en:["Chicken 500g","Potato 2","Onion 1","Carrot 1","Gochujang 2 tbsp","Soy sauce 2 tbsp","Garlic 1 tbsp"],ko:["닭 500g","감자 2개","양파 1개","당근 1개","고추장 2큰술","간장 2큰술","다진 마늘 1큰술"]},steps:{en:["Cut the chicken and vegetables.","Mix gochujang, soy sauce and garlic with water.","Simmer chicken and sauce for 15 minutes.","Add vegetables and cook until tender."],ko:["닭과 채소를 먹기 좋게 썰어요.","고추장·간장·마늘에 물을 섞어 양념을 만들어요.","닭과 양념을 약 15분 끓여요.","채소를 넣고 익을 때까지 더 끓여요."]}},
{name:{en:"Butter Chicken",ko:"버터치킨"},country:{en:"India",ko:"인도"},desc:{en:"Creamy tomato curry with aromatic spices.",ko:"토마토와 향신료가 어우러진 부드러운 인도식 치킨커리."},time:"40 min",ingredients:{en:["Chicken 500g","Tomato puree 300g","Butter 30g","Cream 100ml","Garam masala 1 tbsp","Garlic","Ginger"],ko:["닭 500g","토마토 퓌레 300g","버터 30g","생크림 100ml","가람마살라 1큰술","마늘","생강"]},steps:{en:["Season and brown chicken.","Cook garlic, ginger and spices in butter.","Add tomato puree and simmer.","Return chicken, add cream and cook gently."],ko:["닭에 간을 하고 노릇하게 구워요.","버터에 마늘·생강·향신료를 볶아요.","토마토 퓌레를 넣고 끓여요.","닭과 생크림을 넣고 부드럽게 익혀요."]}},
{name:{en:"Chicken Fajitas",ko:"치킨 파히타"},country:{en:"Mexico / US",ko:"멕시코·미국"},desc:{en:"Sizzling chicken, peppers and onion for tortillas.",ko:"닭과 파프리카·양파를 볶아 또띠아와 먹는 요리."},time:"25 min",ingredients:{en:["Chicken breast 400g","Bell peppers 2","Onion 1","Lime 1","Cumin","Paprika","Tortillas"],ko:["닭가슴살 400g","파프리카 2개","양파 1개","라임 1개","큐민","파프리카가루","또띠아"]},steps:{en:["Slice chicken and vegetables.","Season chicken with cumin and paprika.","Sear chicken in a hot pan.","Add vegetables and finish with lime."],ko:["닭과 채소를 길게 썰어요.","닭에 큐민과 파프리카가루로 간해요.","센 불에서 닭을 볶아요.","채소를 넣어 볶고 라임즙으로 마무리해요."]}}
]},
tofu:{name:{en:"Tofu",ko:"두부"},note:{en:"Plant-based protein that works in soups, stir-fries and grills.",ko:"국·찌개·볶음·구이까지 활용할 수 있는 식물성 단백질 식품이에요."},kcal:76,protein:"8g",carbs:"1.9g",fat:"4.8g",dishes:[
{name:{en:"Sundubu-jjigae",ko:"순두부찌개"},country:{en:"Korea",ko:"한국"},desc:{en:"Soft tofu stew with a spicy savory broth.",ko:"부드러운 순두부를 얼큰한 국물에 끓이는 한국 찌개."},time:"25 min",ingredients:{en:["Soft tofu 350g","Gochugaru","Garlic","Onion","Egg 1","Stock"],ko:["순두부 350g","고춧가루","마늘","양파","달걀 1개","육수"]},steps:{en:["Sauté onion, garlic and chili flakes.","Add stock and bring to a boil.","Add tofu and simmer.","Crack in an egg and serve."],ko:["양파·마늘·고춧가루를 볶아요.","육수를 붓고 끓여요.","순두부를 넣어 보글보글 끓여요.","달걀을 넣고 마무리해요."]}},
{name:{en:"Mapo Tofu",ko:"마파두부"},country:{en:"China",ko:"중국"},desc:{en:"Silky tofu in a spicy, savory Sichuan-style sauce.",ko:"매콤하고 감칠맛 나는 사천식 소스의 두부요리."},time:"25 min",ingredients:{en:["Tofu 400g","Ground meat 150g","Doubanjiang 1 tbsp","Garlic","Ginger","Green onion"],ko:["두부 400g","다진 고기 150g","두반장 1큰술","마늘","생강","대파"]},steps:{en:["Brown the meat.","Add aromatics and doubanjiang.","Add a little water and tofu.","Simmer gently and finish with green onion."],ko:["다진 고기를 볶아요.","마늘·생강·두반장을 넣어요.","물과 두부를 넣어요.","약불로 끓이고 대파로 마무리해요."]}},
{name:{en:"Tofu Teriyaki",ko:"두부 데리야키"},country:{en:"Japan-inspired",ko:"일본풍"},desc:{en:"Crispy tofu glazed with a sweet-savory sauce.",ko:"노릇하게 구운 두부에 달콤짭짤한 소스를 입힌 요리."},time:"20 min",ingredients:{en:["Firm tofu 400g","Soy sauce 2 tbsp","Mirin 2 tbsp","Sugar 1 tbsp","Sesame"],ko:["단단한 두부 400g","간장 2큰술","미림 2큰술","설탕 1큰술","참깨"]},steps:{en:["Press and cube the tofu.","Pan-fry until golden.","Mix sauce ingredients and add to pan.","Reduce until glossy and sprinkle sesame."],ko:["두부의 물기를 빼고 썰어요.","팬에 노릇하게 구워요.","소스 재료를 섞어 팬에 넣어요.","윤기 나게 졸인 뒤 참깨를 뿌려요."]}}
]},
potato:{name:{en:"Potato",ko:"감자"},note:{en:"A filling staple used in comfort foods across many cuisines.",ko:"세계 여러 나라의 가정식에 폭넓게 쓰이는 든든한 식재료예요."},kcal:77,protein:"2g",carbs:"17g",fat:"0.1g",dishes:[
{name:{en:"Gamja-jeon",ko:"감자전"},country:{en:"Korea",ko:"한국"},desc:{en:"Crispy Korean potato pancake.",ko:"감자를 갈아 바삭하게 부치는 한국식 감자전."},time:"20 min",ingredients:{en:["Potato 3","Salt","Cooking oil"],ko:["감자 3개","소금","식용유"]},steps:{en:["Grate potatoes.","Season lightly with salt.","Pan-fry thin rounds until crisp on both sides."],ko:["감자를 곱게 갈아요.","소금으로 가볍게 간해요.","팬에 얇게 펴서 양면을 바삭하게 부쳐요."]}},
{name:{en:"Aloo Gobi",ko:"알루 고비"},country:{en:"India",ko:"인도"},desc:{en:"Potato and cauliflower cooked with warming spices.",ko:"감자와 콜리플라워를 향신료와 함께 볶아내는 인도요리."},time:"35 min",ingredients:{en:["Potato 3","Cauliflower 1/2","Tomato 1","Turmeric","Cumin","Garam masala"],ko:["감자 3개","콜리플라워 1/2개","토마토 1개","강황","큐민","가람마살라"]},steps:{en:["Toast cumin in oil.","Add potato and cauliflower.","Add tomato and spices.","Cover and cook until tender."],ko:["기름에 큐민을 볶아요.","감자와 콜리플라워를 넣어요.","토마토와 향신료를 넣어요.","뚜껑을 덮고 부드럽게 익혀요."]}},
{name:{en:"Spanish Tortilla",ko:"스페인식 또르띠야"},country:{en:"Spain",ko:"스페인"},desc:{en:"Thick potato and egg omelette.",ko:"감자와 달걀로 만드는 도톰한 스페인식 오믈렛."},time:"35 min",ingredients:{en:["Potato 3","Eggs 5","Onion 1","Olive oil","Salt"],ko:["감자 3개","달걀 5개","양파 1개","올리브오일","소금"]},steps:{en:["Slice potatoes and onion.","Cook gently in olive oil.","Mix with beaten eggs.","Cook as a thick omelette, flipping once."],ko:["감자와 양파를 얇게 썰어요.","올리브오일에 부드럽게 익혀요.","푼 달걀과 섞어요.","도톰하게 익히다가 한 번 뒤집어요."]}}
]}};

let lang="en",current=null;
const $=id=>document.getElementById(id);
function t(v){return typeof v==="string"?v:v[lang]}
function applyLang(){
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-en]").forEach(el=>el.textContent=el.dataset[lang]);
  $("langBtn").textContent=lang==="en"?"한국어":"English";
  $("ingredientInput").placeholder=lang==="en"?"Try: chicken, tofu, potato":"예: 닭, 두부, 감자";
  if(current) renderIngredient(current);
}
function keyFor(raw){
  const q=raw.trim().toLowerCase();
  if(["chicken","닭","닭고기"].includes(q))return"chicken";
  if(["tofu","두부"].includes(q))return"tofu";
  if(["potato","감자"].includes(q))return"potato";
  return null;
}
function renderIngredient(key){
  current=key; const d=DATA[key];
  $("recipe").classList.add("hidden");
  $("result").classList.remove("hidden");
  $("ingredientName").textContent=t(d.name);
  $("ingredientNote").textContent=t(d.note);
  $("kcalValue").textContent=d.kcal;
  $("protein").textContent=d.protein;
  $("carbs").textContent=d.carbs;
  $("fat").textContent=d.fat;
  $("dishGrid").innerHTML="";
  d.dishes.forEach((dish,i)=>{
    const card=document.createElement("article"); card.className="dish-card";
    card.innerHTML=`<span class="country">${t(dish.country)}</span><h3>${t(dish.name)}</h3><p>${t(dish.desc)}</p><span class="open">${lang==="en"?"View recipe →":"레시피 보기 →"}</span>`;
    card.onclick=()=>renderRecipe(dish);
    $("dishGrid").appendChild(card);
  });
  $("result").scrollIntoView({behavior:"smooth",block:"start"});
}
function renderRecipe(dish){
  $("recipe").classList.remove("hidden");
  $("recipeName").textContent=t(dish.name);
  $("recipeMeta").textContent=(lang==="en"?"Approx. ":"약 ")+dish.time;
  $("recipeIngredients").innerHTML=t(dish.ingredients).map(x=>`<li>${x}</li>`).join("");
  $("recipeSteps").innerHTML=t(dish.steps).map(x=>`<li>${x}</li>`).join("");
  $("recipe").scrollIntoView({behavior:"smooth",block:"start"});
}
$("searchForm").addEventListener("submit",e=>{e.preventDefault();const k=keyFor($("ingredientInput").value);if(k)renderIngredient(k);else alert(lang==="en"?"Prototype search: try chicken, tofu or potato.":"현재 프로토타입에서는 닭, 두부, 감자를 검색해보세요.");});
document.querySelectorAll(".quick button").forEach(b=>b.onclick=()=>{ $("ingredientInput").value=b.dataset.query; renderIngredient(b.dataset.query); });
$("langBtn").onclick=()=>{lang=lang==="en"?"ko":"en";applyLang();};
$("recipeBack").onclick=()=>{$("recipe").classList.add("hidden");$("result").scrollIntoView({behavior:"smooth"});};
applyLang();