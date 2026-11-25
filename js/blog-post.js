
/* ==========================================
   EXPLOREUK - WORDPRESS SINGLE BLOG POST
========================================== */

(async function () {

    const blogPostContent = document.getElementById("blogPostContent");

    if (!blogPostContent) return;

    try {
const currentURL = new URL(window.location.href);

const postId = currentURL.searchParams.get("id");
const postSlug = currentURL.searchParams.get("slug");

console.log("CURRENT PAGE URL:", currentURL.href);
console.log("WORDPRESS POST ID:", postId);
console.log("WORDPRESS POST SLUG:", postSlug);

if (!postId && !postSlug) {
    throw new Error("Blog article ID or slug is missing.");
}

        const API_URL = postId
    ? `https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/${encodeURIComponent(postId)}`
    : `https://public-api.wordpress.com/rest/v1.1/sites/257049527/posts/slug:${encodeURIComponent(postSlug)}`;
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("WordPress article could not be fetched.");
        }

        const post = await response.json();

        if (!post.ID || !post.content) {
            throw new Error("WordPress article content is missing.");
        }

        const article = document.createElement("article");
        article.className = "blog-post-article";

        const title = document.createElement("h1");
        title.className = "blog-post-title";
        title.textContent = post.title;

        const meta = document.createElement("div");
        meta.className = "blog-post-meta";

        meta.textContent = new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        article.append(title, meta);

        if (post.featured_image) {

            const image = document.createElement("img");

            image.className = "blog-post-featured-image";
            image.src = post.featured_image;
            image.alt = post.title;
            image.loading = "lazy";

            article.appendChild(image);
        }

        const body = document.createElement("div");
        body.className = "blog-post-body";
        body.innerHTML = post.content;

        article.appendChild(body);

        blogPostContent.replaceChildren(article);

        document.title = post.title + " | ExploreUK";

    } catch (error) {

        console.error("Blog post loading error:", error);

        blogPostContent.innerHTML = `
            <div class="blog-post-error">
                <h2>Article Not Found</h2>
                <p>Sorry, this travel story could not be loaded.</p>
                <a href="blog.html">Back to Blog</a>
            </div>
        `;

    }

})();

