![pantry-pro](https://socialify.git.ci/Suraj-kumar00/pantry-pro/image?description=1&descriptionEditable=PantryPro%3A%20Keeping%20Your%20Kitchen%20Stocked%20and%20Sorted.%0A&font=Raleway&forks=1&issues=1&language=1&name=1&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Dark)



## Demo Video of the Project:
[![PantryPro Project Demo Video]()

## Tech Stack Needed for this Project:

### Frontend:
- Next.js
- React
- Material UI

### Backend:
- Firebase
- GCP
- OpenAI

### Hosting and Deployment:
- Vercel

### DevOps:
- CI/CD
- Docker


## Run the Project with Docker:

#### You must have to install Docker Desktop for this step:

1. First of all pull the image into your local machine:

```docker
docker pull surajkumar00/pantry-app
```
2. Run the `Dcoker Container` using `pulled Docker Image` :
```docker
docker run -it -p 3000:3000 surajkumar00/pantry-app
```

## Features of Pantry Pro:

- [x] A form to add, delete, and update pantry items

- [x] A search or filter functionality to easily find items

- [x] A presentable frontend design to display all pantry items

- [x] Deployed to Vercel and use CI/CD 

- [x] Can add inventry items via uploading an images

## Set Up Guide:

```bash
npx create-next-app@latest
```

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Implement a Firebase Backend for data Storage
##### First install `firebase`

```bash
npm install firebase
```

**Go to the firebase official website and create new project**


##### Copy pase this code in `firebase.js` which should be in you project's root directory
```bash
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web apps Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

```

#### And now you are ready to work with project

---

## License 📝

This repo is licensed under the terms of the MIT License. check out [LICENSE](https://github.com/Suraj-kumar00/pantry-pro/blob/main/LICENSE) for details.

---

## Support 🌱

_We would love to have you, feel free to open issues and pull requests, and Don't forget to leave a star ⭐_