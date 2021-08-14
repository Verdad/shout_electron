## Shout Electron
This is the Shout electron repo.  It's a minimalist electron app that allows Shout users to access their shout accounts via a native desktop app.

### To Use
You can download the Shout Desktop app from the releases section of this repository (to the right if you are reading this on your computer).  The app is currently fully available for MAC computers. You are welcome to use the windows version as well, but it's not yet code signed, so you will need to dismiss the warnings on your windows machine and allow the app to be opened.  We anticipate a code signed windows version of the app soon.

### To Contribute
If you're a developer an looking to contribute, I highly recomment checking out this article:
https://slack.engineering/interops-labyrinth-sharing-code-between-web-electron-apps/

Here's the step by step instructions to setup a Shout Electron development environment: 
1. Set up the web development environment: To get that running chat with Cameron.  The repo is called "shout_rails".  Your development environment should run at http://localhost:3000

2. To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Verdad/shout_electron
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
