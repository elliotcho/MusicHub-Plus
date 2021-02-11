<h1>MusicHub-Plus</h1>

<hr>
Full stack music sharing application that allows users to share and download audio files across the browser. 
Created using TypeScript, Next.js, Redis, GraphQL, and PostgreSQL. Styled using Chakra UI. 

<h3>Synopsis</h3>
This application was my second attempt at a music sharing application. 
My first iteration was great learning experience, but it was far from perfect.
I decided to use a new tech stack to make sure I wouldn't make the same mistakes again.

<h3>Tech Stack</h3>
<p>I chose to use TypeScript for a better development experience over JavaScript.</p>

<p>
The next choice I had to make was between React.js and Next.js. However, Next.js
is a lot better for server side rendering and optimizing the application for the
search engine, and was my final choice. 
</p>

<p>
Even though the previous iteration used MongoDB,
I used PostgreSQL which is more performant.
</p>

<p>
I opted out of using REST API, and using GraphQL because it's a lot more flexible
in how it can query data.
</p>

<p>
As for persisting user data, I used redis, a server side cache, as opposed to a 
client side cache, which people can manipulate on the browser.
</p>

<h3>Screenshots </h3>
<details>
    <summary>Check out new music!</summary>
    <img src="./screenshots/home.png">
</details>
<details>
    <summary>Upload new songs!</summary>
    <img src="./screenshots/upload.png">
</details>