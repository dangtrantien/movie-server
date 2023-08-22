## Link Deploy

This project was deploy here: [https://movie-server-xp1w.onrender.com](https://movie-server-xp1w.onrender.com)

### This project has following structures:

```
controllers
  └─ movie.js
data
  │─ genreList.json
  │─ mediaTypeList.json
  │─ movieList.json
  │─ userToken.json
  └─ videoList.json
middleware
  └─ authentication.js
models
  │─ Genre.js
  │─ Movie.js
  │─ User.js
  └─ Video.js
routes
  └─ movie.js
util
  └─ paging.js
.gitignore
app.js
package-lock.json
package.json
```

- controllers: Folder contains file to take action from folder routes and send data to Client.
- data: Folder contains DUMMY_DATA for the Website.
- authentication.js: File contains code to check authentication.
- models: Folder contains file to get data from folder data.
- routes: Folder contains file to create Rest API router path.
- paging.js: File contains code to split data into smaller data.
- .gitignore: File contains code to ignore some folder when pushing project on Github.
- app.js: File contains code to initialize the server.
- package.json & package-lock.json: File contains libraries code for building the Website.
