# aidrone-mobile
---

![alt text](https://static.temblor.net/wp-content/uploads/2017/01/drone.jpg)

---

**An App which facilitates communication with the drone.**

---
## Installation guide
---

### Prerequisites
---

**Install NodeJS** [Node Package Manager]
`https://nodejs.org/en/download/`

**Install Ionic Framework** [Mobile UI Framework]
`npm install -g ionic`

**Install cordova** [For transpiling Typescript into Native Javascript code]
`npm install -g cordova`

**Install Android Studio**
`https://developer.android.com/studio`

### Clone & Spin up the App
---

**Clone the repository**
`https://github.com/CajetanRodrigues/aidrone-mobile.git`

**Install the dependencies using node package manager in the root of the app**
`npm i`

**Serve the app**
`ionic serve`


### Testing
---

**Generate a build apk and test on mobile device  (Optional)**
`ionic cordova build android --prod`

The App will automatically trigger the default browser and spin up the app.

### Deployment

**Build a Cordova Native Project**
`ionic cordova prepare android`

**Make a Production Build**
`ionic cordova build android --prod`

**After this, Android Studio can handle the rest**

`Go to Build -> Generate Signed Bundle/ APK -> Fill in the required details -> Generate`


### Modules Integrated with App
---

**Ionic Icons Library**
`https://ionicons.com/`

**Google Fonts**
`https://fonts.google.com`

**Ionic Components**
`https://ionicframework.com/docs/components`

### Screen Shots

![1](https://user-images.githubusercontent.com/37682760/64069541-f9bba480-cc68-11e9-903e-bc5ad1123183.jpeg)
![2](https://user-images.githubusercontent.com/37682760/64069542-f9bba480-cc68-11e9-96fe-85249ce04e59.jpeg)













