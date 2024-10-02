async function getSelectBox() {
    try {
        let response = await fetch('/categories');
        console.log("response : ", response);

        let Parsed_response = await response.json();
        console.log("Parsed_response : ", Parsed_response);

        let Parsed_response_category = Parsed_response.data;
        console.log("Parsed_response_category : ", Parsed_response_category);

        let div = document.getElementById('category');
        let rows = '';
       
        for (let i = 0; i < Parsed_response_category.length; i++) {
            rows += `
            <option value="${Parsed_response_category[i].category}">${Parsed_response_category[i].category}</option>
            `;
        }
        rows += `<option value="none">none</option>`;

        div.innerHTML = rows;
    } catch (error) {
        console.error("Error fetching categories: ", error);
    }

    try {
        let response = await fetch('/languages');
        console.log("response : ", response);

        let Parsed_response = await response.json();
        console.log("Parsed_response : ", Parsed_response);

        let Parsed_response_language = Parsed_response.data;
        console.log("Parsed_response_language : ", Parsed_response_language);

        let div = document.getElementById('language');
        let rows = ''

        for (i = 0; i < Parsed_response_language.length; i++) {
            rows = rows + `
            <option value="${Parsed_response_language[i].language}">${Parsed_response_language[i].language}</option>
            `;
        }
        rows += `<option value="none">none</option>`;
        div.innerHTML = rows

    } catch (error) {

    }
}

async function AddMovie(event) {
    event.preventDefault();

    let image = document.getElementById('image');
    let file = image.files[0];
    console.log("file: ", file);

    let bgimage = document.getElementById('bgimage');
    let bgfile = bgimage.files[0];
    console.log("bgfile: ", bgfile);

    if (!file || !bgfile) {
        console.log("No File Selected");
        return; // Exit if no files are selected
    }

    // Function to read file and return a promise with the data URL
    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    try {
        // Read both files
        const dataUrl = await readFileAsDataURL(file);
        const dataUrl2 = await readFileAsDataURL(bgfile);

        // Submit data with both URLs
        await submitData(dataUrl, dataUrl2);
    } catch (error) {
        console.error("Error reading files: ", error);
    }
}

async function submitData(dataUrl, dataUrl2) {
    let name = document.getElementById('name').value;
    let category = document.getElementById('category').value;
    let language = document.getElementById('language').value;
    let duration = document.getElementById('duration').value;
    let release_date = document.getElementById('release_date').value;
    let cast = document.getElementById('cast').value;
    let crew = document.getElementById('crew').value;
    let description = document.getElementById('description').value;
    let rating = document.getElementById('rating').value;

    let AddData = {
        name,
        image: dataUrl,
        bgimage: dataUrl2,
        category,
        language,
        duration,
        release_date,
        cast,
        crew,
        description,
        rating
    };
    console.log("AddData: ", AddData);

    let str_AddData = JSON.stringify(AddData);
    console.log("str_AddData: ", str_AddData);

    try {
        let response = await fetch('/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: str_AddData,
        });

        let parsed_response = await response.text();
        console.log("parsed_response: ", parsed_response);

        window.location.href = `index.html`;

        if (parsed_response) {
            alert("Movie Added Successfully");
        } else {
            alert("Something went wrong");
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function getMovie() {
    try {
        let response = await fetch('/movies')
    console.log("response : ", response);

    let parsed_response = await response.json();
    console.log("parsed_response : ", parsed_response);

    let Parsed_response_data = parsed_response.data;
    console.log("parsed_response_data : ", Parsed_response_data);

    let datacontainer = document.getElementById("datacontainer");
    let datacontainer1 = document.getElementById("datacontainer1");

    let rows = ''
    let rows1 = ''

    for (i = 0; i < Parsed_response_data.length; i++) {
        let id = Parsed_response_data[i]._id;
        rows = rows + `
         <div class="container d-flex-row lh-lg pb-3 pt-3" onclick="handleClickUser('${id}')">
                  <div class = "bg-dark text-light imageratingdiv">
                  <div class ="text-center" ><img  src ="${Parsed_response_data[i].image} "class = "indexcontainerimg">
                  </div>
                   
                    <div class ="text-center datacontainertext1 d-flex"><div id="star">&#11088;</div>${Parsed_response_data[i].rating}/10 <div class="ms-2">48K Votes</div></div></div>
                    <div class =" mt-2  datacontainertext2 ">${Parsed_response_data[i].name}</div>
                    <div class =" datacontainertext3">${Parsed_response_data[i].category.category}</div>
                  </div>
        `
    }

    for (i = 0; i < Parsed_response_data.length; i++) {
        let id = Parsed_response_data[i]._id;
        rows1 = rows1 + `
         <div class=" d-flex-column pb-3 pt-3 shadow p-3 mb-5 bg-body rounded " onclick="handleClickUser('${id}')">
                    <div class =" mt-2  datacontainertext4  ">${Parsed_response_data[i].name}</div>
                    <div class="datacontainertext2">Movie</div>
                  </div>
        `
    }


    datacontainer.innerHTML = rows;
    datacontainer1.innerHTML = rows1;



    } catch (error) {
        console.log("error : ",error)
    }
}

function handleClickUser(id) {
    window.location.href = `userSingleView.html?id=${id}`
}

async function UserSingleData() {
    let location = window.location;
    console.log("location", location);

    let querystring = location.search;
    console.log("querystring", querystring);

    let urlParams = new URLSearchParams(querystring);
    console.log("url", urlParams);

    let id = urlParams.get("id");
    console.log("id ", id, typeof (id));

    try {
        let response = await fetch(`/movie/${id}`);
        console.log("response : ", response);

        let parsed_response = await response.json();
        console.log("parsed_response : ", parsed_response);

        let parsed_response_data = parsed_response.data;
        console.log("parsed_response_data : ", parsed_response_data);

        let rows = ''; // Initialize rows outside the loop

        for (let i = 0; i < parsed_response_data.length; i++) {
            console.log(parsed_response_data[i]);

            rows += `
                <div class="container-fluid pt-5 pb-5" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${parsed_response_data[i].bgimage}'); background-size: cover; background-repeat: no-repeat;">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-md-2 text-center">
                                <img src="${parsed_response_data[i].image}" class="singlecontainerimg" alt="Movie Image">
                            </div>
                            <div class="col-12 col-md-4 lh-lg">
                                <div class="mt-3 mb-1 fs-3 fw-bold text-white">${parsed_response_data[i].name}</div>
                                <div class="d-flex align-items-center p-2 mb-3 ratingdiv">
                                    <div class="me-5 fs-5 fw-bold text-white">&#11088; ${parsed_response_data[i].rating}</div>
                                    <div class="ms-5">
                                        <button class="bg-white text-dark rounded border-0 ps-1 pe-1 ms-5">Rate Now</button>
                                    </div>
                                </div>
                                <div class="d-flex mb-3">
                                    <div class="twoddiv me-3">2D</div>
                                    <div class="twoddiv">${parsed_response_data[i].language.language}</div>
                                </div>
                                <div>
                                    <ul class="d-flex lilist text-white">
                                        <li>${parsed_response_data[i].duration}</li>
                                        <li>${parsed_response_data[i].category.category}</li>
                                        <li>UA</li>
                                        <li>${parsed_response_data[i].release_date}</li>
                                    </ul>
                                </div>
                                <button class="adminbtn text-white">Book Tickets</button>
                            </div>
                            <div class="col-12 col-md-6">
                            <div class="d-flex gap-2 justify-content-end ">
    <div class="sharediv"><div class="div"><img src="./images/icons8-share-16.png" alt="" class = "shareimg"></div>
    <div class="div fs-6 fw-bold "><a href="" class="text-light text-decoration-none pe-1">Share</a></div></div>
 </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
    <div class="row mt-5 fs-5 fw-bold ms-1">About The Movie</div>
    <div class="row text-secondary"><div class="col-7">${parsed_response_data[i].description}</div>
    </div>
     <div class="row mt-4"><div class="col-7 border-top  pt-2"></div></div>
 </div>
            `;
        }
        
        // Append all rows at once
        document.getElementById('User_single_datacontainer').innerHTML = rows;

    } catch (error) {
        console.log("error : ", error);
    }
}

async function GetData() {
    try {
        let response = await fetch('/movies');
        console.log("response : ", response);

        let display = await response.json();
        console.log("display : ", display);

        let parsed_display = display.data;
        console.log("parsed_display : ", parsed_display);

        let adminDatacontainer = document.getElementById('adminDatacontainer');

        let rows = '';

        for (i = 0; i < parsed_display.length; i++) {
            let id = parsed_display[i]._id
            rows = rows + `
      <div class="container lh-lg pb-3  shadow-none p-3 mb-5 rounded-pill" style="background-color: rgb(248, 68, 100);"
    onclick="handleClick('${id}')">
    <div class="row d-flex justify-content-center align-items-center">
        <div class="col text-center"><img src="${parsed_display[i].image}" class="adminDatacontainerimg"></div>
        <div class="col text-center text-light" style="font-size: 18px; font-weight: 700;">
            ${parsed_display[i].name}
        </div>

        <div class="col fs-5 fw-bold text-center text-light" style="font-size: 18px; font-weight: 700;">
            ${parsed_display[i].category.category}
        </div>
        <div class="col text-center text-light" style="font-size: 18px; font-weight: 700;">
            ${parsed_display[i].language.language}
        </div>

        <div class="col "><button class="ps-2 pe-2 fs-5 editbtn" onclick="handleClickEdit('${id}')">Edit</button></div>
        <div class="col text-center"><img src="./images/icons8-delete-30.png" alt="deleteimg" id="deleteimg"
                onclick="handleClickDelete('${id}')"></div>
    </div>
</div>

            `
            adminDatacontainer.innerHTML = rows
        }
    } catch (error) {

    }
}

function handleClickEdit(id) {
    window.location.href = `update.html?id=${id}`;
    console.log("id : ", id)
}

async function Currentdata() {
    try {
        let response = await fetch('/categories');
        console.log("response : ", response);

        let Parsed_response = await response.json();
        console.log("Parsed_response : ", Parsed_response);

        let Parsed_response_category = Parsed_response.data;
        console.log("Parsed_response_category : ", Parsed_response_category);

        let div = document.getElementById('category');
        let rows = ''

        for (i = 0; i < Parsed_response_category.length; i++) {
            rows = rows + `
            <option value="${Parsed_response_category[i].category}">${Parsed_response_category[i].category}</option>
            `
        }
        div.innerHTML = rows

    } catch (error) {
        console.log("error : ", error);
    }

    try {
        let response = await fetch('/languages');
        console.log("response : ", response);

        let Parsed_response = await response.json();
        console.log("Parsed_response : ", Parsed_response);

        let Parsed_response_language = Parsed_response.data;
        console.log("Parsed_response_language : ", Parsed_response_language);

        let div = document.getElementById('language');
        let rows = ''

        for (i = 0; i < Parsed_response_language.length; i++) {
            rows = rows + `
            <option value="${Parsed_response_language[i].language}">${Parsed_response_language[i].language}</option>
            `
        }
        div.innerHTML = rows

    } catch (error) {

    }
    let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    let id = params.get('id')
    console.log("id from update data", id);


    let name = document.getElementById('name');
    // let image= document.getElementById('image');
    let category = document.getElementById('category');
    let language = document.getElementById('language');
    let duration = document.getElementById('duration');
    let release_date = document.getElementById('release_date');
    let cast = document.getElementById('cast');
    let crew = document.getElementById('crew');
    let description = document.getElementById('description');
    let rating = document.getElementById('rating');


    try {
        let form_response = await fetch(`/movie/${id}`);
        let form_parse_data = await form_response.json();
        let data = form_parse_data.data
        console.log("data : ", data)

        name.value = data[0].name
        category.value = data[0].category.category
        language.value = data[0].language.language
        duration.value = data[0].duration
        // image.value = data.image
        release_date.value = data[0].release_date
        description.value = data[0].description
        cast.value = data[0].cast
        crew.value = data[0].crew
        rating.value = data[0].rating
    } catch (error) {
        console.log("error : ", error)
    }
}

async function updateMovie(event) {
    event.preventDefault();

    let image = document.getElementById('image');
    let file = image.files[0];

    let bgimage = document.getElementById('bgimage');
    let bgfile = bgimage.files[0];

    // Ensure both files are selected
    if (!file || !bgfile) {
        alert("Please select both image and background image.");
        return;
    }

    try {
        let dataUrl1 = await readFileAsDataURL(file);
        let dataUrl3 = await readFileAsDataURL(bgfile);
        await updateData(dataUrl1, dataUrl3);
    } catch (error) {
        console.error("Error reading files:", error);
        alert("An error occurred while reading the files. Please try again.");
    }
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}

async function updateData(dataUrl1, dataUrl3) {
    let name = document.getElementById('name').value;
    let category = document.getElementById('category').value;
    let language = document.getElementById('language').value;
    let duration = document.getElementById('duration').value;
    let release_date = document.getElementById('release_date').value;
    let cast = document.getElementById('cast').value;
    let crew = document.getElementById('crew').value;
    let description = document.getElementById('description').value;
    let rating = document.getElementById('rating').value;

    let UpdateDatas = {
        name,
        image: dataUrl1,
        bgimage: dataUrl3,
        category,
        language,
        duration,
        release_date,
        cast,
        crew,
        description,
        rating,
    };
    console.log("UpdateData : ",UpdateDatas)
    let Str_UpdateData = JSON.stringify(UpdateDatas);
    console.log("Str_UpdateData : ",Str_UpdateData)

    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    try {
        let response = await fetch(`/movies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: Str_UpdateData
        });

        let parsed_Update_response = await response.json();
        console.log('parsed_Update_response', parsed_Update_response);

        alert("Data Updated Successfully");
        window.location.href = `index.html?id=${id}`;
    } catch (error) {
        console.error("Error:", error);
        alert("error");
    }
}


async function handleClickDelete(id) {

    let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    try {
        let Delete_response = await fetch(`/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json"
            },
        })
        let parsed_Delete_response = await Delete_response.json();
        console.log("parsed_response : ", parsed_Delete_response);

        window.location.href = `index.html?id=${id}`

        if (parsed_Delete_response) {
            alert("Book Deleted Successfully")
        } else {
            alert("Book Not Deleted")
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

async function getSelectBox1() {
    try {
        let response = await fetch('/categories');
        console.log("response : ", response);

        let Parsed_response = await response.json();
        console.log("Parsed_response : ", Parsed_response);

        let Parsed_response_category = Parsed_response.data;
        console.log("Parsed_response_category : ", Parsed_response_category);

        let div = document.getElementById('category');
        let rows = '';
       
        for (let i = 0; i < Parsed_response_category.length; i++) {
            rows += `
            <option value="${Parsed_response_category[i].category}">${Parsed_response_category[i].category}</option>
            `;
        }
        rows += `<option value="none">none</option>`;

        div.innerHTML = rows;
    } catch (error) {
        console.error("Error fetching categories: ", error);
    }

    try {
        let response = await fetch('/languages');
        console.log("response : ", response);

        let Parsed_response = await response.json();
        console.log("Parsed_response : ", Parsed_response);

        let Parsed_response_language = Parsed_response.data;
        console.log("Parsed_response_language : ", Parsed_response_language);

        let div = document.getElementById('language');
        let rows = ''

        for (i = 0; i < Parsed_response_language.length; i++) {
            rows = rows + `
            <option value="${Parsed_response_language[i].language}">${Parsed_response_language[i].language}</option>
            `;
        }
        rows += `<option value="none">none</option>`;
        div.innerHTML = rows

    } catch (error) {

    }
}

async function filter(event) {
    event.preventDefault();
    let category = document.getElementById('category').value;
    console.log("category : ", category);

    let language = document.getElementById('language').value;
    console.log("language : ", language);

    let category_id;
    if (category) {
        try {
            let response = await fetch('/categories');
            console.log("response : ", response);
    
            let parsedResponse = await response.json();
            console.log("Parsed_response : ", parsedResponse);
    
            let parsedResponseCategory = parsedResponse.data;
            console.log("Parsed_response_category : ", parsedResponseCategory);
            
            for (let i = 0; i < parsedResponseCategory.length; i++) {
                if (category === parsedResponseCategory[i].category) {
                    category_id = parsedResponseCategory[i]._id;
                    console.log("category_id : ", category_id);
                    break; 
                }
            }
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    }

    let language_id;
    if (language) {
        try {
            let response = await fetch('/languages');
            console.log("response : ", response);
    
            let parsedResponse = await response.json();
            console.log("Parsed_response : ", parsedResponse);
    
            let parsedResponselanguage = parsedResponse.data;
            console.log("Parsed_response_language : ", parsedResponselanguage);
            
            for (let i = 0; i < parsedResponselanguage.length; i++) {
                if (language === parsedResponselanguage[i].language) {
                    language_id = parsedResponselanguage[i]._id;
                    console.log("language_id : ", language_id);
                    break; 
                }
            }
        } catch (error) {
            console.error("Error fetching languages: ", error);
        }
    }

    try {
        let moviesResponse = await fetch(`/movies?${category_id ? 'category=' + category_id : ''}${language_id ? '&language=' + language_id : ''}`);
        console.log("response : ", moviesResponse);

        let display = await moviesResponse.json();
        console.log("display : ", display);

        let parsedDisplay = display.data;
        console.log("parsed_display : ", parsedDisplay);

        let filterContainer = document.getElementById('filtercontainer');
        let rows = '';

        for (let i = 0; i < parsedDisplay.length; i++) {
            let id = parsedDisplay[i]._id;
            rows += `
            <div class="container d-flex-row lh-lg pb-3 pt-3" onclick="handleClickUser('${id}')">
                <div class="bg-dark text-light imageratingdiv">
                    <div class="text-center"><img src="${parsedDisplay[i].image}" class="indexcontainerimg"></div>
                    <div class="text-center datacontainertext1 d-flex">
                        <div id="star">&#11088;</div>${parsedDisplay[i].rating}/10 <div class="ms-2">48K Votes</div>
                    </div>
                    <div class="mt-2 datacontainertext2">${parsedDisplay[i].name}</div>
                    <div class="datacontainertext3">${parsedDisplay[i].category.category}</div>
                </div>
            </div>
            `;
        }
        filterContainer.innerHTML = rows;
    } catch (error) {
        console.error("Error fetching movies: ", error);
    }
}
