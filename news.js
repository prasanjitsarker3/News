let fetchData=[];
const categoriesDataFetch=()=>{
   const url=`https://openapi.programming-hero.com/api/news/categories`
   fetch(url)
   .then(res => res.json())
   .then(data => showCategoriesData(data.data))
}

const showCategoriesData=(categories)=>{
    // console.log(categories)
    const divContainer=document.getElementById("categories-container");
    categories.news_category.forEach(category=> {

        divContainer.innerHTML+=` <p onclick="categoryNewsFetch('${category.category_id}', '${category.category_name}')">${category?.category_name}</p>`
    })
}
const categoryNewsFetch=(category_id, categoryName)=>{
   const url=`https://openapi.programming-hero.com/api/news/category/${category_id}`
   fetch(url)
   .then(res => res.json())
   .then(data =>{
        fetchData=data.data;
        showAllNews(data.data, categoryName)
   });
}
const showAllNews=(data, categoryName)=>{
    // console.log(data, categoryName);
    document.getElementById("category-count").innerText=data.length;
    document.getElementById("category-name").innerText=categoryName;
    const divContainer=document.getElementById("all-news");
    divContainer.innerHTML=" ";
    data.forEach(showNews=>{
        const {image_url, title,details,author,total_view,_id}=showNews;
        const div=document.createElement("div");
        div.classList.add('card', 'mb-3');
        div.innerHTML=`
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.slice(0,250)}...</p>
            </div>
            <div class="d-flex justify-content-between align-items-center px-4">
                <div class="d-flex gap-3 px-2">
                   <img class="rounded-circle" src="${author.img}" height="40" width="40">
                   <div class="">
                       <p class="m-0 p-0">${author.name}</p>
                       <p class="m-0 p-0">${author.published_date ? author.published_date : "2022-08-24 23:15:00"}</p>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-2 px-2">
                    <i class="fa-solid fa-eye"></i>
                    <p class="m-0 p-0">${total_view}</p>
                </div>
                <div class="d-flex justify-content-center align-items-center gap-2">
                   <i class="fa-regular fa-star"></i>
                   <i class="fa-regular fa-star"></i>
                   <i class="fa-regular fa-star"></i>
                   <i class="fa-regular fa-star"></i>
                   <i class="fa-regular fa-star"></i>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showNewsDetails('${_id}')"></i>
                </div>
            </div>
        </div>
    </div>
        `
        divContainer.appendChild(div);
    })
}
const showNewsDetails=(newsId)=>{
    const url=`https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
    .then(res => res.json())
    .then(data => newsDetailsShow(data.data[0]))
}
const newsDetailsShow=(newDetails)=>{
    const {image_url, title,details,author,total_view,_id}=newDetails;
    document.getElementById("modal-body").innerHTML=`
    <div class="card mb-3">
    <div class="row g-0">
    <div class="col-md-12">
        <img src="${image_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-12">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${details.slice(0,250)}...</p>
        </div>
        <div class="d-flex justify-content-between align-items-center px-4">
            <div class="d-flex gap-3 px-2">
               <img class="rounded-circle" src="${author.img}" height="40" width="40">
               <div class="">
                   <p class="m-0 p-0">${author.name}</p>
                   <p class="m-0 p-0">${author.published_date ? author.published_date : "2022-08-24 23:15:00"}</p>
                </div>
            </div>
            <div class="d-flex align-items-center gap-2 px-2">
                <i class="fa-solid fa-eye"></i>
                <p class="m-0 p-0">${total_view}</p>
            </div>
            <div class="d-flex justify-content-center align-items-center gap-2">
               <i class="fa-regular fa-star"></i>
               <i class="fa-regular fa-star"></i>
               <i class="fa-regular fa-star"></i>
               <i class="fa-regular fa-star"></i>
               <i class="fa-regular fa-star"></i>
            </div>
           
        </div>
    </div>
    </div>
    </div>
    `
}

const trendingNews=()=>{
    console.log(fetchData)
    const trendingNews=fetchData.filter(singleData=> singleData.others_info.is_trending === true);
    const categoryNews=document.getElementById("category-name").innerText;
    showAllNews(trendingNews, categoryNews);
}