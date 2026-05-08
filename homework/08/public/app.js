async function loadPosts() {

    const res = await fetch("/api/posts");

    const posts = await res.json();

    const postsDiv = document.getElementById("posts");

    postsDiv.innerHTML = "";

    posts.reverse().forEach(post => {

        postsDiv.innerHTML += `
            <div class="post">
                <h2>${post.title}</h2>
                <p>${post.content}</p>
            </div>
        `;
    });
}

async function addPost() {

    const title = document.getElementById("title").value;

    const content = document.getElementById("content").value;

    await fetch("/api/posts", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title,
            content
        })
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadPosts();
}

loadPosts();