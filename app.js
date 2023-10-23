// initialize the global map,array and boolean value so that sort button can access it..

let myMap = new Map();
let globalArr=[] ;
let ok=false;
let globalIdArr;



function fetchUrlByCategories(id){
    
    fetch('https://openapi.programming-hero.com/api/videos/categories')
    .then(res => res.json())
    .then(data => categoryIdPass(data.data[id].category_id));
}

function fetchUrlById(id){
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then(res => res.json())
    .then (data => displayData(data.data));
}

document.getElementById('all-btn').addEventListener('click',function(){
    ok=false;
    // if the button is clicked the color is permanent 
    document.getElementById('all-btn').classList.remove("btn-outline");
    document.getElementById('music-btn').classList.add("btn-outline");
    document.getElementById('comedy-btn').classList.add("btn-outline");
    document.getElementById('drawing-btn').classList.add("btn-outline");
    document.getElementById('sort-btn').classList.add("btn-outline");
    fetchUrlByCategories(0);
})

document.getElementById('music-btn').addEventListener('click',function(){
    ok=false;
    // if the button is clicked the color is permanent 
    document.getElementById('music-btn').classList.remove("btn-outline");
    document.getElementById('all-btn').classList.add("btn-outline");
    document.getElementById('comedy-btn').classList.add("btn-outline");
    document.getElementById('drawing-btn').classList.add("btn-outline");
    document.getElementById('sort-btn').classList.add("btn-outline");
    fetchUrlByCategories(1);
})

document.getElementById('comedy-btn').addEventListener('click',function(){
    ok=false;
    // if the button is clicked the color is permanent 
    document.getElementById('comedy-btn').classList.remove("btn-outline");
    document.getElementById('all-btn').classList.add("btn-outline");
    document.getElementById('music-btn').classList.add("btn-outline");
    document.getElementById('drawing-btn').classList.add("btn-outline");
    document.getElementById('sort-btn').classList.add("btn-outline");
    fetchUrlByCategories(2);
})

document.getElementById('drawing-btn').addEventListener('click',function(){
    ok=false;
    // if the button is clicked the color is permanent 
    document.getElementById('drawing-btn').classList.remove("btn-outline");
    document.getElementById('all-btn').classList.add("btn-outline");
    document.getElementById('music-btn').classList.add("btn-outline");
    document.getElementById('comedy-btn').classList.add("btn-outline");
    document.getElementById('sort-btn').classList.add("btn-outline");

    document.getElementById('display-data').innerHTML='';
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="images/Icon.png"></img>
    <p>Oops!!! Sorry there is no content here</p>
    `
    div.setAttribute("class","w-[18%]");
    document.getElementById('display-data').appendChild(div);
})

// sort btn section start
document.getElementById('sort-btn').addEventListener('click',function(){
    // if the button is clicked the color is permanent 
    document.getElementById('sort-btn').classList.remove("btn-outline");
    document.getElementById('all-btn').classList.add("btn-outline");
    document.getElementById('music-btn').classList.add("btn-outline");
    document.getElementById('comedy-btn').classList.add("btn-outline");
    document.getElementById('drawing-btn').classList.add("btn-outline");

    // map value descending order by value 
    const sortedNumDesc = new Map([...myMap].sort((a, b) => b[1] - a[1]));
    let i=0;
    // initializing the map index to the global array 
   for(let[key,value] of sortedNumDesc)
  globalArr[i++]=(key);
// console.log(globalArr);
    ok=true;
    displayData(globalIdArr);
    myMap.clear();
    // globalArr="";
})

// sort btn section end

function categoryIdPass(id){
    fetchUrlById(id);
}

// display function start

function displayData(ar){
    globalIdArr = ar;
 let displaySection = document.getElementById('display-data');
 displaySection.innerHTML = '';
 let div = document.createElement('div');
 let j;
 for(let i=0;i<ar.length;++i){
    
    if(ok===true) {
        j=globalArr[i];
        console.log(globalArr);
    }
    else j=i;
    const {thumbnail,title} = ar[j];
    let st = ar[j].others.views;
    st = st.slice(0,3);
    myMap.set(i,parseInt(st));
    
    // console.log(ar[i].others.views);
    const {profile_picture,profile_name} = ar[j].authors[0];
    div.innerHTML += `
    <div class="card bg-base-100 shadow-2xl">
    <div><figure><img class="h-40 rounded-lg" src="${thumbnail}" alt="Shoes" /></figure></div>
    <div class="grid grid-cols-3 mt-2">
    <div class=""><img class="rounded-full h-11  " src="${profile_picture}" > </div>
    <div class="col-span-2">
    <div class="text-sm">${title}</div>
    <div class="text-sm">${profile_name}</div>
    <div class="text-sm">${ar[j].others.views}</div>
    </div>
  </div>
</div>
    `;
 }
 div.classList.add("grid");
 div.classList.add("grid-cols-1");
 div.classList.add("md:grid-cols-3");
 div.classList.add("lg:grid-cols-4");
 div.classList.add("gap-3");
 displaySection.appendChild(div);
 ok=false;
//  console.log(myMap);
// myMap.clear();
}
