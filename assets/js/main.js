function shwAllPosts() {
  let allPosts = document.getElementById("posts");
  let userId = localStorage.getItem("user");
  userId = JSON.parse(userId);
  loaderFn(true);
  axios
    .get("https://tarmeezacademy.com/api/v1/posts")
    .then((res) => {
      const posts = res.data.data;
      allPosts.innerText = "";
      loaderFn(false);
      posts.map((post) => {
        let contentPosts = `
        <!-- Card Post -->
      <div class="card shadow">
        <!-- Card Header -->
        <div class="card-header d-flex justify-content-between ">
        <diV  onclick="userProfile('${encodeURIComponent(
          JSON.stringify(post)
        )}')" >
          <img
            src="${
              typeof post.author.profile_image == "object"
                ? "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                : post.author.profile_image
            }"
            alt=""
            class="imgCardProfile rounded-circle border border-secondary-subtle border-3"
          />
          <bold>${post.author.name}</bold>
        </div>
            <div>
            ${
              post.author.id === userId.id
                ? `<div class="dropdown" onclick="idToEditeAndDelete('${encodeURIComponent(
                    JSON.stringify(post)
                  )}')">
            <button
              class="btn dropdown-toggle fs-5"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            </button>
            <ul class="dropdown-menu p-2">
              <li>
                <div
                  data-bs-toggle="modal"
                  data-bs-target="#updatePostModel"
                  class="text-light btn rounded bg-dark dropdown-item"
                  onclick="inputValuesPost()"
                >
                  Edit
                </div>
              </li>
              <li>
                <div
                  data-bs-toggle="modal"
                  data-bs-target="#deletePost"
                  class="mt-2 text-light btn rounded bg-danger dropdown-item"
                >
                  Delete
                </div>
              </li>
            </ul>
          </div>`
                : ""
            }
            </div>
        </div>
        <!-- Card Body -->
        <div class="card-body">
          <p class="card-text">
            ${post.body}
          </p>
          <img
            src="${typeof post.image == "object" ? "" : post.image}"
            class="w-100 rounded"
            alt=""
          />
          <h6 class="text-secondary fs-6 fw-normal mt-1">Since ${
            post.created_at
          }</h6>
          <!-- Card Footer -->
          <div class="card-footer" onclick="getPostId(${post.id})" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pen"
              viewBox="0 0 16 16"
            >
              <path
                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
              />
            </svg>
            <span> (${post.comments_count}) Comments </span>
          </div>
        </div>
      </div>
      <!-- end Card Post -->
        `;
        allPosts.innerHTML += contentPosts;
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

function autoLog() {
  const storageToken = localStorage.getItem("token");
  if (storageToken != null) {
    getres();
  } else {
    const loginBtn = document.getElementById("loginBtn");
    let userName = document.getElementById("username-in");
    let passWord = document.getElementById("pass-in");
    let createUp = document.getElementById("create-up");
    loginBtn.onclick = function () {
      let user = userName.value;
      let pass = passWord.value;
      login(user, pass);
    };
    createUp.onclick = function () {
      signUp();
    };
  }
}
autoLog();

function getres() {
  const loginBtnHead = document.getElementById("loginBtnHead");
  const loginModel = document.getElementById("loginModel");
  const navImgProfile = document.getElementById("navImgProfile");
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const navbarSupportedContentUl = document.getElementById(
    "navbarSupportedContent-ul"
  );
  loginModel.innerHTML = "";
  loginBtnHead.innerText = "";
  navbarSupportedContentUl.innerHTML = `
        <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="./home.html"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <span class="nav-link " onclick="userProfile(this)">Profile</span>
            </li>
        `;
  navImgProfile.innerHTML = `
        <span class="profileName">${userStorage.name}</span>
        <img class="imgProfile" src="${
          typeof userStorage.profile_image === "string"
            ? userStorage.profile_image
            : "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
        }" >
        `;
  navImgProfile.style.border = "none";
  loginBtnHead.innerHTML = `
    <span class="d-flex justify-content-center align-items-center gap-1">
    <img class="imgProfile" onclick="userProfile(this)"  src="${
      typeof userStorage.profile_image === "string"
        ? userStorage.profile_image
        : "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
    }" >
    <span class="profileName" onclick="userProfile(this)" >${
      userStorage.name
    }</span>
    </span>
  <button onclick="logout()" class="btn btn-outline-danger">Logout</button>
  `;
  shwAllPosts();

  document.getElementById("newPostHtml").innerHTML = `
  <button data-bs-toggle="modal" data-bs-target="#createPostModel" class="btn fixed-bottom rounded-5 p-2 btnNewPost text-light bg-primary">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
  </svg>
</button>
  `;
}
function login(user, pass) {
  const msgForm = document.getElementById("msgForm");
  const postData = {
    username: user,
    password: pass,
  };
  loaderFn(true);
  axios
    .post("https://tarmeezacademy.com/api/v1/login", postData)
    .then((res) => {
      loaderFn(false);
      msgForm.innerText = "";
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      getres();
    })
    .catch((rej) => {
      loaderFn(false)

      msgForm.style.color = "red";
      msgForm.innerText = rej.response.data.message;
    });
}
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  document.location.reload();
}

function signUp() {
  const msgUp = document.getElementById("msgUp");
  const nameUp = document.getElementById("name-up").value;
  const usernameUp = document.getElementById("username-up").value;
  // const imageUp = document.getElementById("image-up").value;
  const passwordUp = document.getElementById("password-up").value;
  const closeRegisterUp = document.getElementById("close-register-up");
  let formData = new FormData();
  formData.append("username", usernameUp);
  formData.append("password", passwordUp);
  formData.append("name", nameUp);
  // if (imageUp != "") {
  //   formData.append("image",imageUp)
  // }
  loaderFn(true);
  axios
    .post("https://tarmeezacademy.com/api/v1/register", formData)
    .then((res) => {
      closeRegisterUp.click();
      loaderFn(false);
      login(usernameUp, passwordUp);
    })
    .catch((rej) => {
      loaderFn(false)
      msgUp.style.color = "red";
      msgUp.innerText = rej.response.data.message;
    });
}

function creaatNewPostFn() {
  const postTextContent = document.getElementById("postTextContent").value;
  const imageNewPost = document.getElementById("imageNewPost").files[0];
  const creatPostClose = document.getElementById("creatPostClose");
  const msgCreatPost = document.getElementById("msgCreatPost");
  let token = localStorage.getItem("token");
  console.log(imageNewPost);
  let formData = new FormData();
  formData.append("body", postTextContent);
  if (imageNewPost !== undefined) {
    formData.append("image", imageNewPost);
  }
  const config = {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };
  loaderFn(true)
  axios
    .post("https://tarmeezacademy.com/api/v1/posts", formData, {
      headers: config,
    })
    .then((res) => {
      loaderFn(false)
      msgCreatPost.innerHTML = "";
      creatPostClose.click();
      shwAllPosts();
    })
    .catch((rej) => {
      loaderFn(false)
      msgCreatPost.style.color = "red";
      msgCreatPost.innerText = rej.response.data.message;
    });
}

let num = 2;
let lastPage = 10;
let mood = true;
function onScrollEnd() {
  let scrollTarget = false;
  // const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  const endOfPage =
    window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
  if (endOfPage) {
    scrollTarget = true;
    return scrollTarget;
  }
}

window.onscroll = function () {
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("user");
  userId = JSON.parse(userId);
  if (token != null && mood) {
    if (onScrollEnd() && num < lastPage) {
      let allPosts = document.getElementById("posts");
      loaderFn(true);
      axios
        .get(`https://tarmeezacademy.com/api/v1/posts?page=${num}`)
        .then((res) => {
          loaderFn(false);
          lastPage = res.data.meta.last_page;
          const posts = res.data.data;
          posts.map(async (post) => {
            allPosts.innerHTML += `
            <!-- Card Post -->
          <div class="card shadow">
            <!-- Card Header -->
            <div class="card-header d-flex justify-content-between ">
            <diV  onclick="userProfile('${encodeURIComponent(
              JSON.stringify(post)
            )}')" >
              <img
                src="${
                  typeof post.author.profile_image == "object"
                    ? "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                    : post.author.profile_image
                }"
                alt=""
                class="imgCardProfile rounded-circle border border-secondary-subtle border-3"
              />
              <bold>${post.author.name}</bold>
            </div>
                <div>
                ${
                  post.author.id === userId.id
                    ? `<div class="dropdown" onclick="idToEditeAndDelete('${encodeURIComponent(
                        JSON.stringify(post)
                      )}')">
                <button
                  class="btn dropdown-toggle fs-5"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                </button>
                <ul class="dropdown-menu p-2">
                  <li>
                    <div
                      data-bs-toggle="modal"
                      data-bs-target="#updatePostModel"
                      class="text-light btn rounded bg-dark dropdown-item"
                      onclick="inputValuesPost()"
                    >
                      Edit
                    </div>
                  </li>
                  <li>
                    <div
                      data-bs-toggle="modal"
                      data-bs-target="#deletePost"
                      class="mt-2 text-light btn rounded bg-danger dropdown-item"
                    >
                      Delete
                    </div>
                  </li>
                </ul>
              </div>`
                    : ""
                }
                </div>
            </div>
            <!-- Card Body -->
            <div class="card-body">
              <p class="card-text">
                ${post.body}
              </p>
              <img
                src="${typeof post.image == "object" ? "" : post.image}"
                class="w-100 rounded"
                alt=""
              />
              <h6 class="text-secondary fs-6 fw-normal mt-1">Since ${
                post.created_at
              }</h6>
              <!-- Card Footer -->
              <div class="card-footer" onclick="getPostId(${post.id})" >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pen"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
                  />
                </svg>
                <span> (${post.comments_count}) Comments </span>
              </div>
            </div>
          </div>
          <!-- end Card Post -->
            `;
          });
          num = num + 1;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
};

function getPostId(i) {
  const hiddenBtnShowComment = document.getElementById("hiddenBtnShowComment");
  const creatComment = document.getElementById("creatComment");
  const contentBodyComment = document.getElementById("contentBodyComment");
  hiddenBtnShowComment.click();
  function getComment() {
    contentBodyComment.innerText = "";
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${i}`).then((res) => {
      const commentArr = res.data.data.comments;
      if (commentArr.length > 0) {
        commentArr.map((e) => {
          contentBodyComment.innerHTML += `
          <div class=" d-flex gap-2">
          <div class="d-flex flex-column justify-content-between">
            <img class="imgCardProfile rounded-circle border border-secondary-subtle border-3"
            src="${
              typeof e.author.profile_image == "object"
                ? "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                : e.author.profile_image
            }"
            alt="" />
            <span></span>
          </div>
          <div class=" bg-dark bg-opacity-10 rounded p-2">
            <h6 class="text-dark" >${e.author.name}</h6>
            <p class="text-secondary">
              ${e.body}
            </p>
          </div>
        </div>
          `;
        });
      } else {
        contentBodyComment.innerText = "No Comments Found !";
        contentBodyComment.style.color = "gray";
      }
    });
  }
  getComment();

  creatComment.onclick = function () {
    const comentInput = document.getElementById("comentInput").value;
    const msgComment = document.getElementById("msgComment");
    let params = {
      body: comentInput,
    };
    let token = localStorage.getItem("token");
    axios
      .post(`https://tarmeezacademy.com/api/v1/posts/${i}/comments`, params, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        msgComment.innerText = "";
        getComment();
        contentBodyComment.scrollTo(0, 9999);
      })
      .catch((rej) => {
        msgComment.style.color = "red";
        msgComment.innerText = "You Must Write Somthing";
      });
  };
}

let updatePostid;
function idToEditeAndDelete(getPostTest) {
  let obj = JSON.parse(decodeURIComponent(getPostTest));
  updatePostid = obj;
}
function inputValuesPost() {
  const imageUpdatePost = document.getElementById("imageUpdatePost");
  document.getElementById("updateTextContent").value = updatePostid.body;
  // document.getElementById("imageUpdatePost").value = obj.image;
  const msgUpdatePost = document.getElementById("msgUpdatePost");
  msgUpdatePost.innerText = "";
  // imageUpdatePost.hidden
  // console.log(imageUpdatePost);
}

function updatePostFn() {
  const updateTextContent = document.getElementById("updateTextContent").value;
  const imageUpdatePost = document.getElementById("imageUpdatePost").value;
  const updatePostClose = document.getElementById("updatePostClose");
  const msgUpdatePost = document.getElementById("msgUpdatePost");
  const token = localStorage.getItem("token");
  console.log(imageUpdatePost);
  let formData = new FormData();
  formData.append("_method", "put");
  formData.append("body", updateTextContent);
  // if (imageUpdatePost !== "") { //-- Error
  //   formData.append("image", imageUpdatePost);
  // }
  const config = {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };
  loaderFn(true)
  axios
    .post(
      `https://tarmeezacademy.com/api/v1/posts/${updatePostid.id}`,
      formData,
      {
        headers: config,
      }
    )
    .then((res) => {
      loaderFn(false)
      msgUpdatePost.innerText = "";
      updatePostClose.click();
      shwAllPosts();
    })
    .catch((rej) => {
      loaderFn(false)
      msgUpdatePost.style.color = "red";
      msgUpdatePost.innerText = rej.response.data.message;
    });
}

function deletePostFinalBtn() {
  const deletePostClose = document.getElementById("deletePostClose");

  const token = localStorage.getItem("token");
  let formData = new FormData();
  formData.append("_method", "delete");
  const config = {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };
  axios
    .post(
      `https://tarmeezacademy.com/api/v1/posts/${updatePostid.id}`,
      formData,
      {
        headers: config,
      }
    )
    .then((res) => {
      deletePostClose.click();
      shwAllPosts();
    });
}

function userProfile(getId) {
  let userId = localStorage.getItem("user");
  userId = JSON.parse(userId);
  let idProfileUser = userId.id;
  let obj;
  if (typeof getId == "string") {
    obj = JSON.parse(decodeURIComponent(getId));
    idProfileUser = obj.author.id;
  }

  mood = false;
  let allPosts = document.getElementById("posts");

  const navImgProfile = document.getElementById("navImgProfile");
  navImgProfile.click();
  loaderFn(true)
  axios
    .get(`https://tarmeezacademy.com/api/v1/users/${idProfileUser}/posts`)
    .then((res) => {
      loaderFn(false)
      const posts = res.data.data;
      let contentProfile = `
    <div
    class="bg-light d-flex flex-column justify-content-between align-items-center rounded"
  >
    <div
      class="d-flex flex-column justify-content-center align-items-center gap-3 p-3"
    >
      <img
        ${
          obj == undefined
            ? `src="${
                typeof userId.profile_image == "object"
                  ? "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                  : userId.profile_image
              }"`
            : `src="${
                typeof obj.author.profile_image == "object"
                  ? "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                  : obj.author.profile_image
              }"`
        }
        alt=""
        class="profilePageImage rounded-circle border border-secondary-subtle border-3"
      />
      <h3 class="fw-600 fs-4">${
        obj == undefined ? userId.name : obj.author.name
      }</h3>
    </div>
    <div
      class="d-flex justify-content-center align-items-center gap-3 p-2 w-100"
    >
      <div class="d-flex flex-column align-items-center">
        <span class="fs-1 text-secondary text-center">${
          obj == undefined ? userId.posts_count : obj.author.posts_count || "22"
        }</span>
        <p class="fs-5 text-center text-center">Posts</p>
      </div>
      <div class="d-flex flex-column align-items-center">
        <span class="fs-1 text-secondary text-center">18</span>
        <p class="fs-5 text-center text-center">Followers</p>
      </div>
      <div class="d-flex flex-column align-items-center">
        <span class="fs-1 text-secondary text-center">600</span>
        <p class="fs-5 text-center text-center">Followed</p>
      </div>
    </div>
  </div>

  <div class="fs-1  ">
    Mahmoud'S Posts
  </div>
    `;
      allPosts.innerHTML = contentProfile;
      posts.map((post) => {
        allPosts.innerHTML += `
     <!-- Card Post -->
   <div class="card shadow">
     <!-- Card Header -->
     <div class="card-header d-flex justify-content-between ">
     <diV>
       <img
         src="${
           typeof post.author.profile_image == "object"
             ? "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
             : post.author.profile_image
         }"
         alt=""
         class="imgCardProfile rounded-circle border border-secondary-subtle border-3"
       />
       <bold>${post.author.name}</bold>
     </div>
         <div>
         ${
           post.author.id === userId.id
             ? `<div class="dropdown" onclick="idToEditeAndDelete('${encodeURIComponent(
                 JSON.stringify(post)
               )}')">
         <button
           class="btn dropdown-toggle fs-5"
           type="button"
           data-bs-toggle="dropdown"
           aria-expanded="false"
         >
         </button>
         <ul class="dropdown-menu p-2">
           <li>
             <div
               data-bs-toggle="modal"
               data-bs-target="#updatePostModel"
               class="text-light btn rounded bg-dark dropdown-item"
               onclick="inputValuesPost()"
             >
               Edit
             </div>
           </li>
           <li>
             <div
               data-bs-toggle="modal"
               data-bs-target="#deletePost"
               class="mt-2 text-light btn rounded bg-danger dropdown-item"
             >
               Delete
             </div>
           </li>
         </ul>
       </div>`
             : ""
         }
         </div>
     </div>
     <!-- Card Body -->
     <div class="card-body">
       <p class="card-text">
         ${post.body}
       </p>
       <img
         src="${typeof post.image == "object" ? "" : post.image}"
         class="w-100 rounded"
         alt=""
       />
       <h6 class="text-secondary fs-6 fw-normal mt-1">Since ${
         post.created_at
       }</h6>
       <!-- Card Footer -->
       <div class="card-footer" onclick="getPostId(${post.id})" >
         <svg
           xmlns="http://www.w3.org/2000/svg"
           width="16"
           height="16"
           fill="currentColor"
           class="bi bi-pen"
           viewBox="0 0 16 16"
         >
           <path
             d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
           />
         </svg>
         <span> (${post.comments_count}) Comments </span>
       </div>
     </div>
   </div>
   <!-- end Card Post -->
     `;
      });
      if (userId.posts_count == 0) {
        allPosts.innerHTML += "No Posts Found..!";
      }
      scroll({
        top: 0,
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

function loaderFn(show = true) {
  let loader = document.getElementById("loaderDiv");
  if (show) {
    loader.removeAttribute("hidden");
  } else {
    loader.setAttribute("hidden", "");
  }
}
